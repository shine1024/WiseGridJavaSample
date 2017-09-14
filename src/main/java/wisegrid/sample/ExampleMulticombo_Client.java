package wisegrid.sample;

import wisegrid.data.MulticomboData;
import xlib.cmc.GridData;
import xlib.cmc.OperateGridData;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * 클라이언트영역에서 MultiCombo를 구현하는 예제입니다.
 * 멀티콤보구현은 html(jsp..)영역에서 하고 Servlet에서 특정값에 따라 Select합니다.
 * @author iCOMPIA CORP.
 *
 */
public class ExampleMulticombo_Client extends HttpServlet {

	private static final long serialVersionUID = 2782087038910661380L;

	public void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException, ServletException {

		GridData gdReq = null;
		GridData gdRes = null;

		// Encode Type을 UTF-8로 변환한다.
		req.setCharacterEncoding("UTF-8");
		res.setContentType("text/html;charset=UTF-8");

		PrintWriter out = res.getWriter();

		try {
			// WISEGRID_DATA 라는 Param으로 WiseGrid의 전문이 올라온다.
			String rawData = req.getParameter("WISEGRID_DATA");

			// 올라온 전문을 Parsing하여 자료구조 형태로 반환해준다.
			gdReq = OperateGridData.parse(rawData);

			// 전달받은 파라미터값을 가져온다.
			String mode = gdReq.getParam("mode");

			// 조회시
			if (mode.equals("search"))
				gdRes = doQuery(gdReq);
			else if(mode.equals("update"))
				gdRes = doUpdate(gdReq);

		} catch (Exception e) {
			gdRes = new GridData();
			gdRes.setMessage("Error: " + e.getMessage());
			gdRes.setStatus("false");
			e.printStackTrace();
		} finally {
			try {
				// 자료구조를 전문으로 변경해 Write한다.
				OperateGridData.write(gdRes, out);

			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}

	public GridData doQuery(GridData gdReq) throws Exception {

		GridData gdRes = new GridData();
		int rowCount = 0;

		try {
			/* WiseGrid에서 올라온 컬럼정보를 gdRes에 복사한다.
			 * Header 정보와 ComboList, ImageList 를 복사하여 새로운 GridData객체를 생성한다.
			 */
			gdRes = OperateGridData.cloneResponseGridData(gdReq);

			/* 본 예제는 DB Connection은 하지 않고 별도의 샘플 데이터를 사용해 조회한다.	 */
			MulticomboData md = new MulticomboData();
			rowCount = md.getRowcount();

			// 데이터가 없을 경우
			if (rowCount == 0) {
				gdRes.addParam("mode", "search");
				gdRes.setMessage("조회결과가 없습니다.");
				gdRes.setStatus("true");
				return gdRes;
			}

			// 데이터 셋팅
			for (int i = 0; i < rowCount; i++) {
				gdRes.getHeader("SEQ_NO").addValue(String.valueOf(i), "");
				gdRes.getHeader("SELECTED").addValue("0", "");
				gdRes.getHeader("B_CATE").addSelectedHiddenValue("B", md.GetValue(i, 0));

				/*	addSelectedHiddenValue(ComboListKey , hiddenValue)
				 *  ComboListKey 를 가지는 ComboList에서 hiddenValue의 값을 선택한다.
				 */
				gdRes.getHeader("M_CATE").addSelectedHiddenValue(md.GetValue(i, 0),md.GetValue(i, 1));
				gdRes.getHeader("S_CATE").addSelectedHiddenValue(md.GetValue(i, 1),md.GetValue(i, 2));
				gdRes.getHeader("GOODS").addValue(md.GetValue(i, 3), "");
				gdRes.getHeader("COMPANY").addValue(md.GetValue(i, 4), "");
				gdRes.getHeader("SELLER").addValue(md.GetValue(i, 5), "");
				gdRes.getHeader("PRICE").addValue(md.GetValue(i, 6), "");

			}

			/* 화면에 전달할 파라미터를 설정한다.
			 * 메세지를 셋팅한다.
			 * Status를 설정한다
			 */
			gdRes.addParam("mode", "search");
			gdRes.setMessage("성공적으로 작업하였습니다.");
			gdRes.setStatus("true");

		} catch (Exception e) {
			throw e;
		}

		return gdRes;
	}

	public GridData doUpdate(GridData gdReq) throws Exception {

		GridData gdRes = new GridData();
		int rowCount = 0;

		// append한 StringBuffer를 update_data에 넘긴다.
		String updateData = "";

		try {
			// 화면에서 전달받은 "SEQ_NO"의 Count를 가져온다.
			rowCount = gdReq.getHeader("SEQ_NO").getRowCount();

			// 수정시 입력할 데이터를 정해진 형태로 만들어 놓는다.
			String inData[][] = new String[rowCount][];

			for (int i = 0; i < rowCount; i++) {
				String Data[] = {
						gdReq.getHeader("B_CATE").getComboValues(gdReq.getHeader("B_CATE").getSelectedComboListKey(i))[gdReq.getHeader("B_CATE").getSelectedIndex(i)],
						gdReq.getHeader("M_CATE").getComboValues(gdReq.getHeader("M_CATE").getSelectedComboListKey(i))[gdReq.getHeader("M_CATE").getSelectedIndex(i)],
						gdReq.getHeader("S_CATE").getComboValues(gdReq.getHeader("S_CATE").getSelectedComboListKey(i))[gdReq.getHeader("S_CATE").getSelectedIndex(i)],
						gdReq.getHeader("GOODS").getValue(i),
						gdReq.getHeader("COMPANY").getValue(i),
						gdReq.getHeader("SELLER").getValue(i),
						gdReq.getHeader("PRICE").getValue(i)};
				inData[i] = Data;
			}

			/*
			 * 생성된 자료구조를 DataBase에 넘겨 처리한다.
			 */

			// 이 예제는 동적헤더의 동작을 확인하기 위한 샘플이므로
			// 만들어진 데이터를 화면의 fieldset으로  보내 정상적으로 통신이 이루어졌는지 확인한다.
			updateData = getSendData(inData);

			/* 화면에 전달할  파라미터를 설정한다.
			 * 메세지를 셋팅한다.
			 * Status를 설정한다
			 */
			gdRes.addParam("mode", "update");
			gdRes.addParam("update_data", updateData);
			gdRes.setMessage("성공적으로 작업하였습니다.");
			gdRes.setStatus("true");

		} catch (Exception e) {
			throw e;
		}

		return gdRes;
	}

	private String getSendData(String[][] sendData) {

		StringBuffer sbData = new StringBuffer();

		for(int i = 0; i < sendData.length; i++) {
			String[] rowData = sendData[i];
			for(int j = 0; j < rowData.length; j++)
				sbData.append("[" + rowData[j] + "]");
			sbData.append("\n");
		}
		sbData.append(sendData.length + " 건의 데이터가 수정되었습니다.\n");

		return sbData.toString();
	}
}
