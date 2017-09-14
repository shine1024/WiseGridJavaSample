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
 * Created by BONG on 2016-3월-11일 /011.
 */
public class WiseGridSample extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {


        GridData gdReq = null;
        GridData gdRes = new GridData();

        response.setContentType("text/html; charset=UTF-8");
        request.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();

        String rawData = request.getParameter("WISEGRID_DATA");

        try {
            gdReq = OperateGridData.parse(rawData);
            gdRes = OperateGridData.cloneResponseGridData(gdReq);

            for (int n = 0; n < 10; n++) {
                gdRes.getHeader("SELECTED").addValue("0", "");
                gdRes.getHeader("NAME").addValue("이름" + n, "");
                gdRes.getHeader("AGE").addValue(String.valueOf(n + 10), "");
                gdRes.getHeader("ADDRESS").addValue("주소" + n, "");
            }
            OperateGridData.write(gdRes, out);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
