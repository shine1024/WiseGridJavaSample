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
 * Created by BONG on 2014-12-22.
 */
public class ExampleEmailProcess extends HttpServlet {
    private static final long serialVersionUID = -419201700278107216L;
    public void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException, ServletException {
        GridData gdReq = null;
        GridData gdRes = null;

        req.setCharacterEncoding("UTF-8");
        res.setContentType("text/html;charset=UTF-8");
        PrintWriter out = res.getWriter();
        try {
            String rawData = req.getParameter("WISEGRID_DATA");
            gdReq = OperateGridData.parse(rawData);
            String mode = gdReq.getParam("mode");
            if (mode.equals("search"))
                gdRes = doQuery(gdReq);
        } catch (Exception e) {
            e.printStackTrace();
            gdRes = new GridData();
            try {
                gdRes.addParam("mode", "error");
            } catch (Exception e1) {
                e1.printStackTrace();
            }
            gdRes.setMessage("Error: " + e.getMessage());
            e.printStackTrace();
        } finally {
            try {
                OperateGridData.write(gdRes, out);
            } catch (Exception e) {
                gdRes.setStatus("false");
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

            if (rowCount == 0) {
                gdRes.addParam("mode", "search");
                gdRes.setMessage("조회결과가 없습니다.");
                gdRes.setStatus("true");
                return gdRes;
            }

            for (int i = 0; i < rowCount; i++) {
                gdRes.getHeader("EMAIL").addValue(sd.getValue(i, 9), "");
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
