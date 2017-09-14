package wisegrid.sample;

import wisegrid.data.ChartData;
import xlib.cmc.GridData;
import xlib.cmc.OperateGridData;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * FusionCharts 예제
 * @author UNIPOST
 */
public class ExampleChart extends HttpServlet {

	private static final long serialVersionUID = 2150580223202246828L;

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
			
			ChartData wcd = new ChartData();
			rowCount = wcd.getRowcount();
			
			if (rowCount == 0) {
				gdRes.addParam("mode", "S");	
				gdRes.setMessage("조회결과가 없습니다.");
				gdRes.setStatus("true");
				
				return gdRes;
			}
			
			for (int i = 0; i < rowCount; i++) {	
				
				 gdRes.getHeader("SEQ_NO").addValue(wcd.GetValue(i, 0), "");
                 gdRes.getHeader("OPER_NAME").addValue(wcd.GetValue(i, 4), wcd.GetValue(i, 2) + "," + wcd.GetValue(i, 1), Integer.parseInt(wcd.GetValue(i, 3)));
                 gdRes.getHeader("SAWON").addValue(wcd.GetValue(i, 5), "");
                 gdRes.getHeader("DAERI").addValue(wcd.GetValue(i, 6), "");
                 gdRes.getHeader("KWAJANG").addValue(wcd.GetValue(i, 7), "");
                 gdRes.getHeader("BUJANG").addValue(wcd.GetValue(i, 8), "");
                 gdRes.getHeader("SILJUCK1").addValue(wcd.GetValue(i, 9), "");
                 gdRes.getHeader("SILJUCK2").addValue(wcd.GetValue(i, 10), "");
                 gdRes.getHeader("SILJUCK3").addValue(wcd.GetValue(i, 11), "");
				
			}
			
			gdRes.addParam("mode", "S");
			gdRes.setMessage("성공적으로 작업하였습니다.");
			gdRes.setStatus("true");
			
		} catch (Exception e) { 
			throw e;
		}
		
		return gdRes;
	}
}
