/*
 * Source : advanced_example_drilldown.java
 * Description :  �帱�ٿ� ����
 */

package wisegrid.sample;

import wisegrid.data.DrilldownData;
import xlib.cmc.GridData;
import xlib.cmc.OperateGridData;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * 드릴다운 예제
 * @author UNIPOST
 */
public class ExampleDrilldown extends HttpServlet {

	private static final long serialVersionUID = -1138200209119677891L;

	public void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException, ServletException {
		
		GridData gdReq = null;
		GridData gdRes = null;

		res.setContentType("text/html; charset=UTF-8");
		req.setCharacterEncoding("UTF-8");

		PrintWriter out = res.getWriter();

		try {
			String rawData = req.getParameter("WISEGRID_DATA");
			
			gdReq = OperateGridData.parse(rawData);
			    gdRes = doQuery(gdReq);

		} catch (Exception e) {
			gdRes = new GridData();
			gdRes.setMessage("Error: " + e.getMessage());
			gdRes.setStatus("false");
			e.printStackTrace();
		} finally {
			try {
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
			gdRes = OperateGridData.cloneResponseGridData(gdReq);
			DrilldownData dd = new DrilldownData();
			rowCount = dd.getRowcount();
			
			if (rowCount == 0) {
				gdRes.addParam("mode", "search");	
				gdRes.setMessage("조회결과가 없습니다.");
				gdRes.setStatus("true");
				return gdRes;
			}
			
			/*
			 *  데이터 셋팅
			 *  부모노드와 자식노드의 데이터의 값이 다르므로 셋팅값이 다르다.
			 */
			for (int i = 0; i < rowCount; i++) {
				gdRes.getHeader("SEQ_NO").addValue(String.valueOf(i), "");
				gdRes.getHeader("ITEM_FLAG").addValue(dd.GetValue(i, 2), dd.GetValue(i, 0)+","+ dd.GetValue(i, 1), Integer.parseInt(dd.GetValue(i, 10)));
				gdRes.getHeader("SPECIFICATION").addValue(dd.GetValue(i, 4), "");
				gdRes.getHeader("UNIT").addSelectedHiddenValue(dd.GetValue(i, 5));
				gdRes.getHeader("PRICE").addValue(dd.GetValue(i, 6), "");
				gdRes.getHeader("STOCK").addValue(dd.GetValue(i, 7), "");					
				
				// 부모노드
				if(dd.GetValue(i, 3).equals("")){
					gdRes.getHeader("ITEM_CODE").addValue("", "", -1);
					gdRes.getHeader("ADD_DATE").addValue("", "");
					gdRes.getHeader("CHANGE_DATE").addValue("", "");
				} 
				// 자식노드
				else { 
					gdRes.getHeader("ITEM_CODE").addValue(dd.GetValue(i, 3), "", 0);
					gdRes.getHeader("ADD_DATE").addValue(dd.GetValue(i, 8), "");
					gdRes.getHeader("CHANGE_DATE").addValue(dd.GetValue(i, 9), "");	
				}
			}
			gdRes.addParam("mode", "search");
			gdRes.setMessage("성공적으로 작업하였습니다.");
			gdRes.setStatus("true");

		} catch (Exception e) {
			throw e;
		}
				
		return gdRes;
	}
}
