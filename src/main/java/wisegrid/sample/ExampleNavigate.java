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

/**
 * 넥스트 모드 예제
 * @author iCOMPIA CORP.
 */
public class ExampleNavigate extends HttpServlet {

	private static final long serialVersionUID = -4518026995800145193L;

	public void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException, ServletException {

		GridData gdReq = null;
		GridData gdRes = null;

		// Encode Type을 UTF-8로 변환한다.
		res.setContentType("text/html; charset=UTF-8");
		req.setCharacterEncoding("UTF-8");

		PrintWriter out = res.getWriter();

		try {
			// WISEGRID_DATA 라는 Param으로 WiseGrid의 전문이 올라온다.
			String rawData = req.getParameter("WISEGRID_DATA");

			// 올라온 전문을 Parsing하여 자료구조 형태로 반환해준다.
			gdReq = OperateGridData.parse(rawData);

			// 기본 조회
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

		int viewCount = 5; 		// 보여질 데이터의 수
		long startPoint = 0L; 	// 시작포인트
		long endPoint = 0L; 	// 마지막포인트
		long rowCount = 0L;		// 전체 데이터 수

		try {
			/* WiseGrid에서 올라온 컬럼정보를 gdRes에 복사한다.
			 * Header 정보와 ComboList, ImageList 를 복사하여 새로운 GridData객체를 생성한다.
			 */
			gdRes = OperateGridData.cloneResponseGridData(gdReq);
			/* 본 예제는 DB Connection은 하지 않고 별도의 샘플 데이터를 사용해 조회한다.	 */
			SampleData sd = new SampleData();

			if (gdReq.getTotalCount() == -1L) {

				/* 임시로 만든 데이터의 rowCount를 전체 Count로 셋팅한다.
				 * WiseGrid가 전체 데이터가 모두 받아졌는지 판단하는 데이터로 사용된다.
				 */
				rowCount = sd.getRowcount();
				gdRes.setTotalCount(rowCount);

			} else {
				// 임시로 만든 데이터의 rowCount를 전체 Count로 셋팅한다.
				rowCount = gdReq.getTotalCount();
				gdRes.setTotalCount(rowCount);
			}

			int navigateValue;

			// NavigateValue가 있을경우(맨처음) 값을 0으로 셋팅한다.
			if (gdReq.getNavigateValue().equals(""))
				navigateValue = 0;
			else // 아닌경우 이전의 값에 1을 증가시킨다.
				navigateValue = Integer.parseInt(gdReq.getNavigateValue()) + 1;

			// 변경된 navigateValue를 객체에 입력한다
			gdRes.setNavigateValue(String.valueOf(navigateValue));

			// startPoint와 endPoint를 계산한다.
			startPoint = navigateValue * viewCount + 1;
			endPoint = startPoint + (long) (viewCount - 1);

			/* 전체카운트보다 endPoint가 더 클경우
			 * 조회가 완료된 경우이므로 endPoint에 전체 카운트를 대입한다.
			 */
			if (endPoint >= rowCount)
				endPoint = rowCount;

			// startPoint와 endPoint를 int 값으로 변환한다.
			int start = Integer.parseInt(String.valueOf(startPoint));
			int end = Integer.parseInt(String.valueOf(endPoint));

			// startPoint에서 endPoint까지의 데이터를 가져와서 데이터를 셋팅한다.
			for (int i = start - 1; i < end; i++) {
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

			if(rowCount == 0)
				gdRes.setMessage("조회결과가 없습니다.");
			else if (endPoint == rowCount) // 전체카운트와 endPoint가 같을 경우
				gdRes.setMessage("조회가 완료되었습니다");
			else
				gdRes.setMessage(String.valueOf(startPoint) + " - " + String.valueOf(endPoint)
						+ " 까지 조회되었습니다.");

			// 화면에 전달할 Status를 설정한다
			gdRes.setStatus("true");

		} catch (Exception e) {
			throw e;
		}

		return gdRes;
	}
}
