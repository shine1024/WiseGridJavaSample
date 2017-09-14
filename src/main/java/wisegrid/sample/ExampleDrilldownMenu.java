package wisegrid.sample;

import xlib.cmc.GridData;
import xlib.cmc.OperateGridData;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * 드릴다운과 사용자 컨텍스트 메뉴를 이용한 메뉴 예제.
 * @author UNIPOST
 */
public class ExampleDrilldownMenu extends HttpServlet {

	private static final long serialVersionUID = -7214882583935437314L;

	public void doPost(HttpServletRequest req, HttpServletResponse res)throws IOException, ServletException {
		
		GridData gdReq = null;
		GridData gdRes = null;

		res.setContentType("text/html; charset=UTF-8");
		req.setCharacterEncoding("UTF-8");

		PrintWriter out = res.getWriter();

		try {
			// WISEGRID_DATA 라는 Param으로 WiseGrid 전문이 올라온다.
			String rawData = req.getParameter("WISEGRID_DATA");
			
			// 올라온 전문을 Parsing 하여 자료구조 형태로 변환해준다.
			gdReq = OperateGridData.parse(rawData);

			// 기존조회
			gdRes = doQuery(gdReq);
			
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
		
		try {
			/* WiseGrid에서 올라온 컬럼정보를 gdRes 에 복사한다.
			 * Header 정보와 ComboList, ImageList 을 복사하여 새로운 GridData 객체를 생성한다.
			 */
			gdRes = OperateGridData.cloneResponseGridData(gdReq);
			
			// 데이타 셋팅
			gdRes.getHeader("MENU_ID").addValue("즐겨찾기",	"*,M0001", 0);
			gdRes.getHeader("MENU_URL").addValue("", "");
			gdRes.getHeader("MENU_ID").addValue("검색엔진",	"M0001,M0011", 2);
			gdRes.getHeader("MENU_URL").addValue("", "");
			gdRes.getHeader("MENU_ID").addValue("Google", "M0011,M0111", 3);
			gdRes.getHeader("MENU_URL").addValue("http://www.google.co.kr", "");
			gdRes.getHeader("MENU_ID").addValue("Yahoo", "M0011,M0112", 3);
			gdRes.getHeader("MENU_URL").addValue("http://kr.yahoo.com", "");
			gdRes.getHeader("MENU_ID").addValue("Altavista", "M0011,M0113", 3);
			gdRes.getHeader("MENU_URL").addValue("http://kr.altavista.com/", "");
			gdRes.getHeader("MENU_ID").addValue("개발커뮤니티", "M0001,M0012", 2);
			gdRes.getHeader("MENU_URL").addValue("", "");
			gdRes.getHeader("MENU_ID").addValue("Devpia", "M0012,M0121", 3);
			gdRes.getHeader("MENU_URL").addValue("http://www.devpia.com", "");
			gdRes.getHeader("MENU_ID").addValue("CodeGuru", "M0012,M0122", 3);
			gdRes.getHeader("MENU_URL").addValue("http://www.codeguru.com", "");
			gdRes.getHeader("MENU_ID").addValue("JavaServiceNet","M0012,M0123", 3);
			gdRes.getHeader("MENU_URL").addValue("http://www.javaservice.net","");
			gdRes.getHeader("MENU_ID").addValue("SourceForge", "M0012,M0124", 3);
			gdRes.getHeader("MENU_URL").addValue("http://sourceforge.net", "");
		
			/*
			 * 화면에 전달할 파라미터를 설정한다.
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