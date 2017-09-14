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
import java.util.HashMap;
import java.util.Iterator;

/**
 * 기본예제
 * @author iCOMPIA CORP.
 */
public class ExampleSelect_ParamSetter extends HttpServlet {

	private static final long serialVersionUID = -419201700278107216L;

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

			gdRes = doQuery(gdReq);
			HashMap<String, String> paramMap = getGridParamMap(gdReq);
			System.out.println(paramMap);
			setGridParam(gdRes, paramMap);

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

			//String from_date = gdReq.getParam("from_date");
			//String to_date = gdReq.getParam("to_date");

			/* form_date와 to_date의 조회 조건을  가지고 DB에서 조회 할수 있다.
			 * 본 예제는 DB를 사용하지 않으므로 조회 조건을 가져오는 방법만 제시한다.
			 */

			/* 본 예제는 DB Connection은 하지 않고 별도의 샘플 데이터를 사용해 조회한다.	 */
			SampleData sd = new SampleData();
			rowCount = sd.getRowcount();

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


	private void setGridParam(GridData gdRes, HashMap<String,String> paramMap) throws Exception{
		Iterator<String> it = paramMap.keySet().iterator();
		while (it.hasNext()) {
			String name = it.next();
			gdRes.addParam(name, paramMap.get(name));

			System.out.println("name : " +name +",value : "+gdRes.getParam(name));
		}

	}
	private HashMap<String, String> getGridParamMap(GridData gdRes) throws Exception{
		String[] paramNames = gdRes.getParamNames();
		int count =paramNames.length;
		HashMap<String, String> paramMap = new HashMap<String, String>();
		for (int i=0; i<count; i++) {
			String name = paramNames[i];
			paramMap.put(name, gdRes.getParam(name));
		}
		return paramMap;

	}
}
