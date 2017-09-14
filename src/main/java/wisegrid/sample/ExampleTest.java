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
 * Created by BONG on 2015-10월-27일 /027.
 */
public class ExampleTest extends HttpServlet {

    protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {


        GridData gdReq = null;
        GridData gdRes = null;

        res.setContentType("text/html; charset=UTF-8");
        req.setCharacterEncoding("UTF-8");
        PrintWriter out = res.getWriter();
        try {

            String rawData = req.getParameter("WISEGRID_DATA");
            gdReq = OperateGridData.parse(rawData);

            String mode = gdReq.getParam("mode");
            if("MTP_save".equals(mode)) {
                gdRes = doSave(gdReq);
            } else {
                gdRes = doQuery(gdReq);
            }

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
            SampleData sd = new SampleData();
            rowCount = sd.getRowcount();


            // 데이터가 없을 경우
            if (rowCount == 0) {
                gdRes.addParam("mode", "search");
                gdRes.setMessage("조회결과가 없습니다.");
                gdRes.setStatus("true");
                return gdRes;
            }


            for (int i = 0; i < 20; i++) {

                gdRes.getHeader("TEXT").addValue(sd.getValue(0, 1), "");
                gdRes.getHeader("DATE").addValue(sd.getValue(0, 8), "");
                gdRes.getHeader("NUMBER").addValue(sd.getValue(0, 6), "");
                gdRes.getHeader("CHECK").addValue("0", "");
                gdRes.getHeader("COMBO").addSelectedHiddenValue(sd.getValue(i, 0));

            }
            gdRes.addParam("mode", "search");
            gdRes.setMessage("성공적으로 작업하였습니다.");
            gdRes.setStatus("true");
        } catch (Exception e) {
            throw e;
        }
        return gdRes;
    }


    public GridData doSave(GridData gdReq) throws Exception {

        GridData gdRes = null;
        System.out.println(gdReq);


        return gdRes;

    }

}
