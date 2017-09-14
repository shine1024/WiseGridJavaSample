package wisegrid.test;

import xlib.cmc.GridData;
import xlib.cmc.OperateGridData;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * Created by shine on 2016-10-06.
 */
public class TreeMode extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        GridData gdReq;
        GridData gdRes = null;

        response.setContentType("text/html; charset=UTF-8");
        PrintWriter out = response.getWriter();
        String rawData = request.getParameter("WISEGRID_DATA");

        try {
            gdReq = OperateGridData.parse(rawData);
            gdRes = OperateGridData.cloneResponseGridData(gdReq);
            String[][] sampleData =
                    {
                            {"*", "G000000001", "MAIN_MENU"},
                            {"G000000001", "G000000002", "MENU_1"},
                            {"G000000002", "G000000003", "MENU_2"},
                            {"G000000002", "G000000004", "MENU_3"},
                            {"G000000001", "G000000005", "MENU_4"},
                            {"G000000005", "G000000006", "MENU_4"},
                            {"G000000005", "G000000007", "MENU_4"},
                            {"G000000005", "G000000008", "MENU_4"}
                    };
            int rowCount = sampleData.length;
            for(int n=0; n<rowCount; n++) {
                gdRes.getHeader("MENU").addValue(sampleData[n][2], sampleData[n][0] + "," + sampleData[n][1], 0);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try {
                OperateGridData.write(gdRes, out);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
