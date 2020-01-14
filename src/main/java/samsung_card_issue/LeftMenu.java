package samsung_card_issue;

import xlib.cmc.GridData;
import xlib.cmc.OperateGridData;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class LeftMenu extends HttpServlet {

	private static final long serialVersionUID = 3338739365893082898L;

	public LeftMenu() {
	}

	public void doPost(HttpServletRequest req, HttpServletResponse res)throws IOException, ServletException {
		GridData gdReq = null;
		GridData gdRes = null;

		// Encode Type UTF-8로 변환
		res.setContentType("text/html; charset=UTF-8");
		req.setCharacterEncoding("UTF-8");

		PrintWriter out = res.getWriter();

		try {
			// WISEGRID_DATA 라는 Param으로 WiseGrid 전문이 올라온다.
			String rawData = req.getParameter("WISEGRID_DATA");

			// 올라온 전문을 Parsing 하여 WiseGrid 자료구조로 형태로 반환
			gdReq = OperateGridData.parse(rawData);
			
			gdRes = doQuery(gdReq);
			
		} catch (Exception e) {
			gdRes = new GridData();
			gdRes.setMessage("Error: " + e.getMessage());
			gdRes.setStatus("false");
			e.printStackTrace();
		} finally {
			try {
				// WiseGrid 자료구조를 전문으로 변경하여 Client로 Write
				OperateGridData.write(gdRes, out);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}

	public GridData doQuery(GridData gdReq) throws Exception {
		
		GridData gdRes = new GridData();

		try {
			int iCount=0;
			int jCount=0;
			/* WiseGrid에서 올라온 컬럼정보를 gdRes로 복사 */
			gdRes = OperateGridData.cloneResponseGridData(gdReq);
			
			// 데이터 셋팅
			gdRes.getHeader("TREE_NODE").addValue("예제", "*,0", 1);
			gdRes.getHeader("MENU_URL").addValue("", "");
			
			// 기능별 예제


			gdRes.getHeader("TREE_NODE").addValue("기능별 예제", "0,1", 1);
			gdRes.getHeader("MENU_URL").addValue("", "");

			gdRes.getHeader("TREE_NODE").addValue("기본", "1,1."+iCount++, 2);
			gdRes.getHeader("MENU_URL").addValue("/samsung_card_issue/example_select.htm", "");

			gdRes.getHeader("TREE_NODE").addValue("여러개 그리드", "1,1."+iCount++, 2);
			gdRes.getHeader("MENU_URL").addValue("/samsung_card_issue/example_multigrid.htm", "");
			
			gdRes.getHeader("TREE_NODE").addValue("통합통신예제", "1,1."+iCount++, 2);
			gdRes.getHeader("MENU_URL").addValue("/samsung_card_issue/example_coordinate_comm.htm", "");

			gdRes.getHeader("TREE_NODE").addValue("드릴다운", "1,1."+iCount++, 2);
			gdRes.getHeader("MENU_URL").addValue("/samsung_card_issue/example_drilldown.htm", "");

			gdRes.getHeader("TREE_NODE").addValue("합계", "1,1."+iCount++, 2);
			gdRes.getHeader("MENU_URL").addValue("/samsung_card_issue/example_summary.htm", "");

			/* 화면에 전달된 파라미터를 설정
			 * 메시지 셋팅
			 * Status 셋팅
			 */	
			gdRes.addParam("mode", "index");	
			gdRes.setMessage("성공적으로 작업하였습니다.");
			gdRes.setStatus("true");
			
		} catch (Exception e) {
			throw e;
		}
		
		return gdRes;
	}
}