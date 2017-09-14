package test.combo;

import xlib.cmc.GridData;
import xlib.cmc.GridHeader;
import xlib.cmc.OperateGridData;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;


public class ExamComboDemo extends HttpServlet{

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)throws ServletException, IOException {
		
		GridData gdReq = null;
		GridData gdRes = null;
		
		request.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=utf-8");
		
		PrintWriter out = response.getWriter();

		try {
			String rawData = request.getParameter("WISEGRID_DATA");
			gdReq = OperateGridData.parse(rawData);			
			gdRes = OperateGridData.cloneResponseGridData(gdReq);
			String selectedParentValue = gdReq.getParam("selectedParentValue");
			
			GridHeader value = gdRes.getHeader("value");
			GridHeader hiddenValue = gdRes.getHeader("hiddenValue");
			if(selectedParentValue.equals("C1")) {
				value.addValue("A", ""); hiddenValue.addValue("AA", "");
				value.addValue("B", ""); hiddenValue.addValue("BB", "");
				value.addValue("C", ""); hiddenValue.addValue("CC", "");
			} else if(selectedParentValue.equals("C2")) {
				value.addValue("D", ""); hiddenValue.addValue("DD", "");
				value.addValue("E", ""); hiddenValue.addValue("EE", "");
				value.addValue("F", ""); hiddenValue.addValue("FF", "");
			} else if(selectedParentValue.equals("C3")) {
				value.addValue("G", ""); hiddenValue.addValue("GG", "");
				value.addValue("H", ""); hiddenValue.addValue("HH", "");
				value.addValue("I", ""); hiddenValue.addValue("II", "");
			}			

			OperateGridData.write(gdRes, out);			
		} catch (Exception e) {
			e.printStackTrace();
		}	
		
	} 

}
