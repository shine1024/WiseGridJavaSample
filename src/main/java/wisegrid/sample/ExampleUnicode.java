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
 * 다국어 예제
 * @author iCOMPIA CORP.
 */
public class ExampleUnicode extends HttpServlet {

    private static final long serialVersionUID = -6909021320445449001L;

    public void doPost(HttpServletRequest req, HttpServletResponse res)throws IOException, ServletException {
		/*
		 * 이 소스는 반드시 UTF-8 형식으로 저장되어야 한다.
		 */
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

        try {
			/* WiseGrid에서 올라온 컬럼정보를 gdRes에 복사한다.
			 * Header 정보와 ComboList, ImageList 를 복사하여 새로운 GridData객체를 생성한다.
			 */
            gdRes = OperateGridData.cloneResponseGridData(gdReq);

            // 데이터 셋팅
            gdRes.getHeader("NATION").addValue("중국어", "");
            gdRes.getHeader("LANG").addValue("?好。", "");
            gdRes.getHeader("BIGO").addValue("안녕", "");

            gdRes.getHeader("NATION").addValue("중국어", "");
            gdRes.getHeader("LANG").addValue("早上 好。", "");
            gdRes.getHeader("BIGO").addValue("안녕하세요.(아침)", "");

            gdRes.getHeader("NATION").addValue("중국어", "");
            gdRes.getHeader("LANG").addValue("中午 好。", "");
            gdRes.getHeader("BIGO").addValue("안녕하세요.(점심)", "");

            gdRes.getHeader("NATION").addValue("중국어", "");
            gdRes.getHeader("LANG").addValue("?上 好。", "");
            gdRes.getHeader("BIGO").addValue("안녕하세요.(저녁)", "");

            gdRes.getHeader("NATION").addValue("중국어", "");
            gdRes.getHeader("LANG").addValue("?好??", "");
            gdRes.getHeader("BIGO").addValue("안녕하십니까?", "");

            gdRes.getHeader("NATION").addValue("중국어", "");
            gdRes.getHeader("LANG").addValue("?? 睡好", "");
            gdRes.getHeader("BIGO").addValue("안녕히 주무세요.", "");

            gdRes.getHeader("NATION").addValue("중국어", "");
            gdRes.getHeader("LANG").addValue("?到??高?", "");
            gdRes.getHeader("BIGO").addValue("만나서 반갑습니다.", "");

            gdRes.getHeader("NATION").addValue("중국어", "");
            gdRes.getHeader("LANG").addValue("我 回?了", "");
            gdRes.getHeader("BIGO").addValue("다녀왔습니다.", "");

            gdRes.getHeader("NATION").addValue("중국어", "");
            gdRes.getHeader("LANG").addValue("回?了?", "");
            gdRes.getHeader("BIGO").addValue("잘 다녀왔니.", "");

            gdRes.getHeader("NATION").addValue("일본어", "");
            gdRes.getHeader("LANG").addValue("おはよう(ございます)。", "");
            gdRes.getHeader("BIGO").addValue("안녕하세요.(아침)", "");

            gdRes.getHeader("NATION").addValue("일본어", "");
            gdRes.getHeader("LANG").addValue("こんにちは。", "");
            gdRes.getHeader("BIGO").addValue("안녕하세요.(점심)", "");

            gdRes.getHeader("NATION").addValue("일본어", "");
            gdRes.getHeader("LANG").addValue("こんばんは。", "");
            gdRes.getHeader("BIGO").addValue("안녕하세요.(저녁)", "");

            gdRes.getHeader("NATION").addValue("일본어", "");
            gdRes.getHeader("LANG").addValue("はじめまして。", "");
            gdRes.getHeader("BIGO").addValue("처음뵙겠습니다.", "");

            gdRes.getHeader("NATION").addValue("일본어", "");
            gdRes.getHeader("LANG").addValue("どうぞよろしく(おねがいします）。", "");
            gdRes.getHeader("BIGO").addValue("잘 부탁합니다.", "");

            gdRes.getHeader("NATION").addValue("일본어", "");
            gdRes.getHeader("LANG").addValue("おひさしぶりです。", "");
            gdRes.getHeader("BIGO").addValue("오랜만입니다.", "");

            gdRes.getHeader("NATION").addValue("일본어", "");
            gdRes.getHeader("LANG").addValue("すみません。", "");
            gdRes.getHeader("BIGO").addValue("미안합니다.", "");

            gdRes.getHeader("NATION").addValue("일본어", "");
            gdRes.getHeader("LANG").addValue("ありがとう(ございます）。", "");
            gdRes.getHeader("BIGO").addValue("고맙습니다.", "");

            gdRes.getHeader("NATION").addValue("러시아어", "");
            gdRes.getHeader("LANG").addValue("Доброе утро", "");
            gdRes.getHeader("BIGO").addValue("안녕하세요.(아침)", "");

            gdRes.getHeader("NATION").addValue("러시아어", "");
            gdRes.getHeader("LANG").addValue("Добрый день", "");
            gdRes.getHeader("BIGO").addValue("안녕하세요.(점심)", "");

            gdRes.getHeader("NATION").addValue("러시아어", "");
            gdRes.getHeader("LANG").addValue("Добрый вечер", "");
            gdRes.getHeader("BIGO").addValue("안녕하세요.(저녁)", "");

            gdRes.getHeader("NATION").addValue("러시아어", "");
            gdRes.getHeader("LANG").addValue("Здравствуйте", "");
            gdRes.getHeader("BIGO").addValue("안녕하십니까?", "");

            gdRes.getHeader("NATION").addValue("러시아어", "");
            gdRes.getHeader("LANG").addValue("Рад тебя видеть", "");
            gdRes.getHeader("BIGO").addValue("만나서 반가워요.", "");

            gdRes.getHeader("NATION").addValue("러시아어", "");
            gdRes.getHeader("LANG").addValue("Спасибо", "");
            gdRes.getHeader("BIGO").addValue("감사합니다.", "");

            gdRes.getHeader("NATION").addValue("러시아어", "");
            gdRes.getHeader("LANG").addValue("Неплохо", "");
            gdRes.getHeader("BIGO").addValue("괜찮아요.", "");

            gdRes.getHeader("NATION").addValue("아랍어", "");
            gdRes.getHeader("LANG").addValue("???? ?????", "");
            gdRes.getHeader("BIGO").addValue("인사시작할때", "");

            gdRes.getHeader("NATION").addValue("아랍어", "");
            gdRes.getHeader("LANG").addValue("???? ?????", "");
            gdRes.getHeader("BIGO").addValue("인사답할때", "");

            gdRes.getHeader("NATION").addValue("아랍어", "");
            gdRes.getHeader("LANG").addValue("?????????? ??????????", "");
            gdRes.getHeader("BIGO").addValue("당신에게 평화가 있기를", "");

			/* 화면에 전달할 파라미터를 설정한다.
			 * 메세지를 셋팅한다.
			 * Status를 설정한다
			 */
            gdRes.setMessage("성공적으로 작업하였습니다.");
            gdRes.addParam("mode", "search");
            gdRes.setStatus("true");

        } catch (Exception e) {
            throw e;
        }

        return gdRes;
    }
}
