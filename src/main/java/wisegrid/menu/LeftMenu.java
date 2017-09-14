package wisegrid.menu;

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
			/* 
			 * WiseGrid에서 올라온 컬럼정보를 gdRes로 복사

			 */
			gdRes = OperateGridData.cloneResponseGridData(gdReq);
			
			// 데이터 셋팅
			gdRes.getHeader("TREE_NODE").addValue("예제", "*,0", 1);
			gdRes.getHeader("MENU_URL").addValue("", "");
			
			// 기능별 예제


			gdRes.getHeader("TREE_NODE").addValue("기능별 예제", "0,1", 1);
			gdRes.getHeader("MENU_URL").addValue("", "");

			gdRes.getHeader("TREE_NODE").addValue("엑셀수식", "1,1."+iCount++, 2);
			gdRes.getHeader("MENU_URL").addValue("/html/sample/example_fomular.htm", "");
			
			gdRes.getHeader("TREE_NODE").addValue("붙여넣기", "1,1."+iCount++, 2);
			gdRes.getHeader("MENU_URL").addValue("/html/sample/example_blockPaste.htm", "");
			
			gdRes.getHeader("TREE_NODE").addValue("합계(api 추가)", "1,1."+iCount++, 2);
			gdRes.getHeader("MENU_URL").addValue("/html/sample/example_summaryExp.htm", "");
			
			gdRes.getHeader("TREE_NODE").addValue("기본", "1,1."+iCount++, 2);
			gdRes.getHeader("MENU_URL").addValue("/html/sample/example_select.htm", "");
			
			gdRes.getHeader("TREE_NODE").addValue("기본(헤더사이즈 %)", "1,1."+iCount++, 2);
			gdRes.getHeader("MENU_URL").addValue("/html/sample/example_select_per.htm", "");

			gdRes.getHeader("TREE_NODE").addValue("저장 & 저장취소소", "1,."+iCount++, 2);
			gdRes.getHeader("MENU_URL").addValue("/html/sample/example_save.htm", "");

			gdRes.getHeader("TREE_NODE").addValue("디자인", "1,1."+iCount++, 2);
			gdRes.getHeader("MENU_URL").addValue("/html/sample/example_design.htm", "");

			gdRes.getHeader("TREE_NODE").addValue("다국어", "1,1."+iCount++, 2);
			gdRes.getHeader("MENU_URL").addValue("/html/sample/example_unicode.htm", "");

			gdRes.getHeader("TREE_NODE").addValue("엑셀내보내기", "1,1."+iCount++, 2);
			gdRes.getHeader("MENU_URL").addValue("/html/sample/example_excel_export.htm", "");
			
			gdRes.getHeader("TREE_NODE").addValue("엑셀들여오기", "1,1."+iCount++, 2);
			gdRes.getHeader("MENU_URL").addValue("/html/sample/example_excel_import.htm", "");

			gdRes.getHeader("TREE_NODE").addValue("대용량 압축조회", "1,1."+iCount++, 2);
			gdRes.getHeader("MENU_URL").addValue("/html/sample/example_select_compress.htm", "");

			gdRes.getHeader("TREE_NODE").addValue("여러개 그리드", "1,1."+iCount++, 2);
			gdRes.getHeader("MENU_URL").addValue("/html/sample/example_multigrid.htm", "");
			
			gdRes.getHeader("TREE_NODE").addValue("통합통신예제", "1,1."+iCount++, 2);
			gdRes.getHeader("MENU_URL").addValue("/html/sample/example_coordinate_comm.htm", "");
			
			gdRes.getHeader("TREE_NODE").addValue("마우스이벤트", "1,1."+iCount++, 2);
			gdRes.getHeader("MENU_URL").addValue("/html/sample/example_mouse.htm", "");
			
			gdRes.getHeader("TREE_NODE").addValue("마우스 커서", "1,1."+iCount++, 2);
			gdRes.getHeader("MENU_URL").addValue("/html/sample/example_cursor.htm", "");
			
			gdRes.getHeader("TREE_NODE").addValue("멀티콤보 예제(client에서 생성)", "1,1."+iCount++, 2);
			gdRes.getHeader("MENU_URL").addValue("/html/sample/example_multicombo_client.htm", "");
			
			gdRes.getHeader("TREE_NODE").addValue("멀티콤보 예제(server에서 생성)", "1,1."+iCount++, 2);
			gdRes.getHeader("MENU_URL").addValue("/html/sample/example_multicombo_server.htm", "");
		
			gdRes.getHeader("TREE_NODE").addValue("영역머지", "1,1."+iCount++, 2);
			gdRes.getHeader("MENU_URL").addValue("/html/sample/example_areamerge.htm","");	
			
			gdRes.getHeader("TREE_NODE").addValue("제품카테고리예제", "1,1."+iCount++, 2);
			gdRes.getHeader("MENU_URL").addValue("/html/sample/example_image.htm","");
			
			gdRes.getHeader("TREE_NODE").addValue("동적헤더생성예제", "1,1."+iCount++, 2);
			gdRes.getHeader("MENU_URL").addValue("/html/sample/example_dynamic.htm","");

			gdRes.getHeader("TREE_NODE").addValue("드릴다운", "1,1."+iCount++, 2);
			gdRes.getHeader("MENU_URL").addValue("/html/sample/example_drilldown.htm", "");

			gdRes.getHeader("TREE_NODE").addValue("드릴다운+ContextMenu", "1,1."+iCount++, 2);
			gdRes.getHeader("MENU_URL").addValue("/html/sample/example_drilldown_contextMenu.htm", "");
			
			gdRes.getHeader("TREE_NODE").addValue("메뉴", "1,1."+iCount++, 2);
			gdRes.getHeader("MENU_URL").addValue("/html/sample/example_drilldown_menu.htm", "");

			gdRes.getHeader("TREE_NODE").addValue("헤더별그룹", "1,1."+iCount++, 2);
			gdRes.getHeader("MENU_URL").addValue("/html/sample/example_header_group.htm", "");

			gdRes.getHeader("TREE_NODE").addValue("컬럼별그룹", "1,1."+iCount++, 2);
			gdRes.getHeader("MENU_URL").addValue("/html/sample/example_column_group.htm", "");

			gdRes.getHeader("TREE_NODE").addValue("합계", "1,1."+iCount++, 2);
			gdRes.getHeader("MENU_URL").addValue("/html/sample/example_summary.htm", "");

			gdRes.getHeader("TREE_NODE").addValue("페이징모드", "1,1."+iCount++, 2);
			gdRes.getHeader("MENU_URL").addValue("/html/sample/example_paging.htm", "");

			gdRes.getHeader("TREE_NODE").addValue("넥스트모드", "1,1."+iCount++, 2);
			gdRes.getHeader("MENU_URL").addValue("/html/sample/example_navigate.htm", "");

			gdRes.getHeader("TREE_NODE").addValue("정규식", "1,1."+iCount++, 2);
			gdRes.getHeader("MENU_URL").addValue("/html/sample/example_regular.htm", "");

			gdRes.getHeader("TREE_NODE").addValue("다중열", "1,1."+iCount++, 2);
			gdRes.getHeader("MENU_URL").addValue("/html/sample/example_multirow.htm", "");

			gdRes.getHeader("TREE_NODE").addValue("틀고정", "1,1."+iCount++, 2);
			gdRes.getHeader("MENU_URL").addValue("/html/sample/example_colfix.htm", "");

			gdRes.getHeader("TREE_NODE").addValue("줄바꿈", "1,1."+iCount++, 2);
			gdRes.getHeader("MENU_URL").addValue("/html/sample/example_multiline.htm", "");				
			// 기능별 예제
			
			gdRes.getHeader("TREE_NODE").addValue("WiseGrid+FusionChart", "0,2", 1);
			gdRes.getHeader("MENU_URL").addValue("", "");
			
			gdRes.getHeader("TREE_NODE").addValue("WiseGrid 응용예제", "2,2."+jCount++, 2);
			gdRes.getHeader("MENU_URL").addValue("/html/sample/example_chart.htm", "");
			
			gdRes.getHeader("TREE_NODE").addValue("Combination", "2,2."+jCount++, 2);
			gdRes.getHeader("MENU_URL").addValue("/html/sample/example_chart_combi.htm", "");

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