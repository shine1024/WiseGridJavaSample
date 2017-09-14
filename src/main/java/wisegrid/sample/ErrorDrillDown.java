/*
 * Source : advanced_example_drilldown.java
 * Description :  �帱�ٿ� ����
 */

package wisegrid.sample;

import xlib.cmc.GridData;
import xlib.cmc.OperateGridData;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class ErrorDrillDown extends HttpServlet {

    private static final long serialVersionUID = -1138200209119677891L;

    public void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException, ServletException {

        GridData gdReq = null;
        GridData gdRes = null;

        // Encode Type 인코딩 UTF8 설정
        res.setContentType("text/html; charset=UTF-8");
        req.setCharacterEncoding("UTF-8");

        PrintWriter out = res.getWriter();

        try {
            String rawData = req.getParameter("WISEGRID_DATA");


            gdReq = OperateGridData.parse(rawData);
            String mode = gdReq.getParam("mode");

            if(mode.equals("search")) {
                gdRes = doQuery(gdReq);
            } else if(mode.equals("error")) {
                gdRes = doErrorQuery(gdReq);
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

    public GridData doErrorQuery(GridData gdReq) throws Exception {
        GridData gdRes = new GridData();
        try {
            gdRes = OperateGridData.cloneResponseGridData(gdReq);

            String[][] data = {
                    {"*", "1", "류투", "0"},
                    {"1", "2", "1-1번", "0"},
                    {"2", "2", "2-1번", "0"},
                    {"2", "4", "2-2번", "0"},
                    {"1", "5", "1-2번", "0"},
                    {"1", "6", "1-3번", "0"},
                    {"1", "7", "1-4번", "0"}
            };
            for(int i=0; i<data.length;i++){
                gdRes.getHeader("SEQ_NO").addValue(String.valueOf(i), "");
                gdRes.getHeader("ITEM_FLAG").addValue(data[i][2], data[i][0]+","+ data[i][1],  Integer.parseInt(data[i][3]));
//                gdRes.getHeader("ITEM_FLAG").addValue(data[i][2], data[i][0]+","+ data[i][1]);

            }
        } catch (Exception e) {
            throw e;
        }
        return gdRes;
    }

    public GridData doQuery(GridData gdReq) throws Exception {
        GridData gdRes = new GridData();
        try {
            gdRes = OperateGridData.cloneResponseGridData(gdReq);
			
            String[][] data = {
                    {"*", "1", "루트", "0"},
                    {"1", "2", "1-1번", "0"},
                    {"2", "3", "2-1번", "0"},
                    {"2", "4", "2-2번", "0"},
                    {"3", "5", "3-1번", "0"},
                    {"3", "6", "3-2번", "0"},
                    {"4", "7", "4-1번", "0"},
                    {"1", "8", "1-2번", "0"}

            };
            for(int i=0; i<data.length;i++){
                gdRes.getHeader("SEQ_NO").addValue(String.valueOf(i), "");
                gdRes.getHeader("ITEM_FLAG").addValue(data[i][2], data[i][0]+","+ data[i][1],  Integer.parseInt(data[i][3]));
            }
        } catch (Exception e) {
            throw e;

        }
        return gdRes;
    }




}
