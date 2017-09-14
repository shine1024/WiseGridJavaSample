package wisegrid.sample;

import xlib.cmc.GridData;
import xlib.cmc.OperateGridData;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 대용량 압축조회 예제
 * @author iCOMPIA CORP.
 */
public class ExampleSelect_Compress extends HttpServlet {

	private static final long serialVersionUID = -4250619371788968683L;

	public void doPost(HttpServletRequest req, HttpServletResponse res)throws IOException, ServletException {

		GridData gdReq = null;
		GridData gdRes = null;

		// Encode Type을 UTF-8로 변환한다.
		res.setContentType("text/html; charset=UTF-8");
		req.setCharacterEncoding("UTF-8");

		try {
			// WISEGRID_DATA 라는 Param으로 WiseGrid의 전문이 올라온다.
			String rawData = req.getParameter("WISEGRID_DATA");

			// 올라온 전문을 Parsing하여 자료구조 형태로 반환해준다.
			gdReq = OperateGridData.parse(rawData);

			// 일반, 압축조회
			gdRes = doQuery(gdReq);

		} catch (Exception e) {
			gdRes = new GridData();
			gdRes.setMessage("Error: " + e.getMessage());
			gdRes.setStatus("false");
			e.printStackTrace();
		} finally {
			try {
				// 전달받은 파라미터값을 가져온다.
				String method = gdRes.getParam("METHOD");

				// 일반조회시
				if (method.equals("N")) {
					// 자료구조를 전문으로 변경해 Write한다.
					OperateGridData.write(gdRes, res.getWriter());
				}
				// 압축조회시
				else {
					// 자료구조를 전문으로 변경해 OutputStream한다.
					OperateGridData.write(gdRes, res.getOutputStream());
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}

	public GridData doQuery(GridData gdReq) throws Exception {

		GridData gdRes = new GridData();
		int rowCount = 0;
		String method = null;

		try {
			/* WiseGrid에서 올라온 컬럼정보를 gdRes에 복사한다.
			 * Header 정보와 ComboList, ImageList 를 복사하여 새로운 GridData객체를 생성한다.
			 */
			gdRes = OperateGridData.cloneResponseGridData(gdReq);

			// Data를 화면에서 지정한 RowCount만큼 Loop 시켜 생성하기 위해 Param을 가져온다.
			rowCount = Integer.parseInt(gdReq.getParam("ROWCOUNT"));

			// 전달받은 파라미터값을 가져온다.
			method = gdReq.getParam("METHOD");

			// 데이터가 없을 경우
			if (rowCount == 0) {
				gdRes.setMessage("조회결과가 없습니다.");
				gdRes.setStatus("true");
				return gdRes;
			}

			// 데이터 셋팅
			for (int i = 0; i < rowCount; i++) {
				gdRes.getHeader("SELECTED").addValue("0", "");
				gdRes.getHeader("SEQ_NO").addValue(String.valueOf(i + 1), "");
				gdRes.getHeader("ITEM_FLAG").addSelectedHiddenValue("CPU");
				gdRes.getHeader("VENDOR_NAME").addValue("Intel Core 2 Extreme",	"");
				gdRes.getHeader("ITEM_CODE").addValue("IT20061207001", "");
				gdRes.getHeader("ITEM_NAME").addValue("EE X6800", "");
				gdRes.getHeader("SPECIFICATION").addValue("2.93GHz/FSB 1066/4MB L2", "");
				gdRes.getHeader("UNIT").addSelectedHiddenValue("EA");
				gdRes.getHeader("PRICE").addValue("1219000", "");
				gdRes.getHeader("STOCK").addValue("155", "");
				gdRes.getHeader("ADD_DATE").addValue("20070420", "");
				gdRes.getHeader("CHANGE_DATE").addValue("20070420", "");
			}

			/* 화면에 전달할 파라미터를 설정한다.
			 * 메세지를 셋팅한다.
			 * Status를 설정한다
			 */
			gdRes.setMessage("성공적으로 작업하였습니다.");
			gdRes.addParam("METHOD", method);
			gdRes.setStatus("true");

		} catch (Exception e) {
			throw e;
		}

		return gdRes;
	}
}
