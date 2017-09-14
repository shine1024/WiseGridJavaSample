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

public class ExampleImage extends HttpServlet {
	private static final long serialVersionUID = 5025391263022685527L;
	public void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException, ServletException {

		GridData gdReq = new GridData();
		GridData gdRes = new GridData();

		req.setCharacterEncoding("UTF-8");
		res.setContentType("text/html; charset=utf-8");


		PrintWriter out = res.getWriter();

		try {
			String rawData = req.getParameter("WISEGRID_DATA");

			gdReq = OperateGridData.parse(rawData);
			gdRes = selectItemCategory(gdReq);
		} catch(Exception e) {
			gdRes = new GridData();
			gdRes.setMessage("Error: " + e.getMessage());
			gdRes.setStatus("false");
			e.printStackTrace();
		} finally {
			try {
				OperateGridData.write(gdRes, out);
			} catch(Exception e) {
				e.printStackTrace();
			}
		}

	}

	public GridData selectItemCategory(GridData gdReq) throws Exception {
		GridData gdRes = new GridData();
		int rowCount=0;

		try {
			gdRes = OperateGridData.cloneResponseGridData(gdReq);

			SampleData sQry = new SampleData();

			rowCount = sQry.getRowcount();

			for(int i = 0; i < rowCount; i++) {
				String  i_no = Integer.toString(i %2);
				// 제품코드
				gdRes.getHeader("IMAGE").addValue("", "","../../images/prod/"+sQry.getValue(i,2)+".jpg");
				gdRes.getHeader("COLUMN_NAME").addValue("제품코드", "");
				gdRes.getHeader("VALUE").addValue(sQry.getValue(i, 2),"");
				gdRes.getHeader("I_NO").addValue(i_no,"");

				// 제품명
				gdRes.getHeader("IMAGE").addValue("", "",-1);
				gdRes.getHeader("COLUMN_NAME").addValue("제품명", "");
				gdRes.getHeader("VALUE").addValue(sQry.getValue(i, 3),"");
				gdRes.getHeader("I_NO").addValue(i_no,"");

				// 제조회사
				gdRes.getHeader("IMAGE").addValue("", "",-1);
				gdRes.getHeader("COLUMN_NAME").addValue("제조회사", "");
				gdRes.getHeader("VALUE").addValue(sQry.getValue(i, 1),"");
				gdRes.getHeader("I_NO").addValue(i_no,"");

				// 자재구분
				gdRes.getHeader("IMAGE").addValue("", "",-1);
				gdRes.getHeader("COLUMN_NAME").addValue("자재구분", "");
				gdRes.getHeader("VALUE").addValue(sQry.getValue(i, 0),"");
				gdRes.getHeader("I_NO").addValue(i_no,"");

				// 규격
				gdRes.getHeader("IMAGE").addValue("", "",-1);
				gdRes.getHeader("COLUMN_NAME").addValue("규격", "");
				gdRes.getHeader("VALUE").addValue(sQry.getValue(i, 4),"");
				gdRes.getHeader("I_NO").addValue(i_no,"");

				// 단가
				gdRes.getHeader("IMAGE").addValue("", "",-1);
				gdRes.getHeader("COLUMN_NAME").addValue("단가", "");
				gdRes.getHeader("VALUE").addValue(sQry.getValue(i, 6),"");
				gdRes.getHeader("I_NO").addValue(i_no,"");

				// 재고량
				gdRes.getHeader("IMAGE").addValue("", "",-1);
				gdRes.getHeader("COLUMN_NAME").addValue("재고량", "");
				gdRes.getHeader("VALUE").addValue(sQry.getValue(i, 7),"");
				gdRes.getHeader("I_NO").addValue(i_no,"");

				// 등록일
				gdRes.getHeader("IMAGE").addValue("", "",-1);
				gdRes.getHeader("COLUMN_NAME").addValue("등록일", "");
				gdRes.getHeader("VALUE").addValue(sQry.getValue(i, 8),"");
				gdRes.getHeader("I_NO").addValue(i_no,"");

				// 수정일
				gdRes.getHeader("IMAGE").addValue("", "",-1);
				gdRes.getHeader("COLUMN_NAME").addValue("수정일", "");
				gdRes.getHeader("VALUE").addValue(sQry.getValue(i, 9),"");
				gdRes.getHeader("I_NO").addValue(i_no,"");

			}
			// 메세지와 status 값을 셋팅해서 client 로 보낸다.
			gdRes.setMessage("성공적으로 조회되었습니다.");
			gdRes.setStatus("true");

		} catch (Exception e) {
			throw e;
		}

		return gdRes;
	}
}
