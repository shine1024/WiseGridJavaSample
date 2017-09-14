package wisegrid.sample;

import wisegrid.data.SampleData;
import xlib.cmc.GridData;
import xlib.cmc.OperateGridData;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

/**
 * CRUD모드를 이용한 저장 & 저장 취소 예제
 * @author iCOMPIA CORP.
 */
public class ExampleSave extends HttpServlet {

	private static final long serialVersionUID = -6769648928176737604L;

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

			if (mode.equals("search"))
				gdRes = doQuery(gdReq);
			else if (mode.equals("save"))
				gdRes = doSave(gdReq);

		} catch (Exception e) {
			gdRes = new GridData();

			// Exception 발생시 CRUD 플래그를 초기화 하지 않도록 함
			try {
				gdRes.addParam("DOQUERY_SAVESTATUS_ROLLBACK","false");
			} catch (Exception e1) {
				e1.printStackTrace();
			}

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

	/* 조회 */
	public GridData doQuery(GridData gdReq) throws Exception {

		GridData gdRes = new GridData();
		int rowCount = 0;

		try {
			/* WiseGrid에서 올라온 컬럼정보를 gdRes에 복사한다.
			 * Header 정보와 ComboList, ImageList 를 복사하여 새로운 GridData객체를 생성한다.
			 */
			gdRes = OperateGridData.cloneResponseGridData(gdReq);

			//String from_date = gdReq.getParam("from_date");
			//String to_date = gdReq.getParam("to_date");

			/* form_date와 to_date의 조회 조건을  가지고 DB에서 조회 할수 있다.
			 * 본 예제는 DB를 사용하지 않으므로 조회 조건을 가져오는 방법만 제시한다.
			 */

			/* 본 예제는 DB Connection은 하지 않고 별도의 샘플 데이터를 사용해 조회한다.	 */
			SampleData sd = new SampleData();
			rowCount = sd.getRowcount();

			// 데이터가 없는 경우
			if (rowCount == 0) {
				gdRes.addParam("mode", "search");
				gdRes.setMessage("조회결과가 없습니다.");
				gdRes.setStatus("true");
				return gdRes;
			}

			// 데이터 셋팅
			for (int i = 0; i < rowCount; i++) {
				gdRes.getHeader("CRUD").addValue("", "");
				gdRes.getHeader("SEQ_NO").addValue(String.valueOf(i), "");
				gdRes.getHeader("ITEM_FLAG").addSelectedHiddenValue(sd.getValue(i, 0));
				gdRes.getHeader("VENDOR_NAME").addValue(sd.getValue(i, 1), "");
				gdRes.getHeader("ITEM_CODE").addValue(sd.getValue(i, 2), "", 0);
				gdRes.getHeader("ITEM_NAME").addValue(sd.getValue(i, 3), "");
				gdRes.getHeader("SPECIFICATION").addValue(sd.getValue(i, 4), "");
				gdRes.getHeader("UNIT").addSelectedHiddenValue(sd.getValue(i, 5));
				gdRes.getHeader("PRICE").addValue(sd.getValue(i, 6), "");
				gdRes.getHeader("STOCK").addValue(sd.getValue(i, 7), "");
				gdRes.getHeader("ADD_DATE").addValue(sd.getValue(i, 8), "");
				gdRes.getHeader("CHANGE_DATE").addValue(sd.getValue(i, 9), "");
			}

			/* 화면에 전달할  파라미터를 설정한다.
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

	/* 저장 */
	public GridData doSave(GridData gdReq) throws Exception {

		GridData gdRes = new GridData();

		int rowCount = 0;

		try {
			//화면에서 전달받은 "CRUD"의 row 수를 가져온다.
			rowCount = gdReq.getHeader("CRUD").getRowCount();
			ArrayList createDataList = new ArrayList(rowCount);
			ArrayList updateDataList = new ArrayList(rowCount);
			ArrayList deleteDataList = new ArrayList(rowCount);

			//데이터 셋팅
			for (int i = 0; i < rowCount; i++) {

				//화면에서 전달받은 "CRUD"의 HiddenValue를 가져온다.
				String crud = gdReq.getHeader("CRUD").getHiddenValue(i);

				if (crud.equals("C")) {
					String[] createData = new String[10];
					createData[0] = gdReq.getHeader("ITEM_FLAG").getComboHiddenValues()[gdReq.getHeader("ITEM_FLAG").getSelectedIndex(i)];
					createData[1] = gdReq.getHeader("VENDOR_NAME").getValue(i);
					createData[2] = gdReq.getHeader("ITEM_CODE").getValue(i);
					createData[3] = gdReq.getHeader("ITEM_NAME").getValue(i);
					createData[4] = gdReq.getHeader("SPECIFICATION").getValue(i);
					createData[5] = gdReq.getHeader("UNIT").getComboHiddenValues()[gdReq.getHeader("UNIT").getSelectedIndex(i)];
					createData[6] = gdReq.getHeader("PRICE").getValue(i);
					createData[7] = gdReq.getHeader("STOCK").getValue(i);
					createData[8] = gdReq.getHeader("ADD_DATE").getValue(i);
					createData[9] = gdReq.getHeader("CHANGE_DATE").getValue(i);
					createDataList.add(createData);
				} else if (crud.equals("U")) {
					String[] updateData = new String[10];
					updateData[0] = gdReq.getHeader("ITEM_FLAG").getComboHiddenValues()[gdReq.getHeader("ITEM_FLAG").getSelectedIndex(i)];
					updateData[1] = gdReq.getHeader("VENDOR_NAME").getValue(i);
					updateData[2] = gdReq.getHeader("ITEM_CODE").getValue(i);
					updateData[3] = gdReq.getHeader("ITEM_NAME").getValue(i);
					updateData[4] = gdReq.getHeader("SPECIFICATION").getValue(i);
					updateData[5] = gdReq.getHeader("UNIT").getComboHiddenValues()[gdReq.getHeader("UNIT").getSelectedIndex(i)];
					updateData[6] = gdReq.getHeader("PRICE").getValue(i);
					updateData[7] = gdReq.getHeader("STOCK").getValue(i);
					updateData[8] = gdReq.getHeader("ADD_DATE").getValue(i);
					updateData[9] = gdReq.getHeader("CHANGE_DATE").getValue(i);
					updateDataList.add(updateData);

				} else if (crud.equals("D")) {
					String[] deleteData = new String[10];
					deleteData[0] = gdReq.getHeader("ITEM_FLAG").getComboHiddenValues()[gdReq.getHeader("ITEM_FLAG").getSelectedIndex(i)];
					deleteData[1] = gdReq.getHeader("VENDOR_NAME").getValue(i);
					deleteData[2] = gdReq.getHeader("ITEM_CODE").getValue(i);
					deleteData[3] = gdReq.getHeader("ITEM_NAME").getValue(i);
					deleteData[4] = gdReq.getHeader("SPECIFICATION").getValue(i);
					deleteData[5] = gdReq.getHeader("UNIT").getComboHiddenValues()[gdReq.getHeader("UNIT").getSelectedIndex(i)];
					deleteData[6] = gdReq.getHeader("PRICE").getValue(i);
					deleteData[7] = gdReq.getHeader("STOCK").getValue(i);
					deleteData[8] = gdReq.getHeader("ADD_DATE").getValue(i);
					deleteData[9] = gdReq.getHeader("CHANGE_DATE").getValue(i);
					deleteDataList.add(deleteData);
				}
			}

			/*
			 * 생성된 3개의 자료구조를 DataBase에 넘겨 처리한다.
			 */

			// 이 예제는 통합통신의 동작을 확인하기 위한 샘플이므로
			// 만들어진 데이터를 화면의 fieldset으로  보내 정상적으로 통신이 이루어졌는지 확인한다.
			String returnData = getSendData(createDataList, "C");
			returnData += getSendData(updateDataList, "U");
			returnData += getSendData(deleteDataList, "D");

			/* 화면에 전달할  파라미터를 설정한다.
			 * 메세지를 셋팅한다.
			 * Status를 설정한다
			 */
			gdRes.addParam("mode", "save");
			gdRes.addParam("saveData", returnData);
			gdRes.setMessage("성공적으로 작업하였습니다.");
			gdRes.setStatus("true");

		} catch (Exception e) {
			throw e;
		}

		return gdRes;
	}

	private String getSendData(ArrayList sendData, String CRUDFlag) {

		StringBuffer sbData = new StringBuffer();

		for(int i = 0; i < sendData.size(); i++) {
			String[] rowData = (String[])sendData.get(i);


			for(int k = 0; k < rowData.length; k++){
				sbData.append("[" + rowData[k] + "]");
			}
			sbData.append("\n");

		}


		if (CRUDFlag.equals("C"))
			sbData.append(sendData.size() + " 건의 데이터가 등록되었습니다.\n\n");
		else if (CRUDFlag.equals("U"))
			sbData.append(sendData.size() + " 건의 데이터가 수정되었습니다.\n\n");
		else if (CRUDFlag.equals("D"))
			sbData.append(sendData.size() + " 건의 데이터가 삭제되었습니다.\n\n");

		return sbData.toString();
	}
}
