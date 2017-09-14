// BasicSelect.java
package wisegrid.sample;

import xlib.cmc.GridData;
import xlib.cmc.OperateGridData;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class ExampleHopage extends HttpServlet{
    public void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException, ServletException{
        GridData gdReq = null;
        GridData gdRes = null;

        req.setCharacterEncoding("UTF-8");
        res.setContentType("text/html; charset=utf-8");
        PrintWriter out = res.getWriter();

        try{
            String rawData = req.getParameter("WISEGRID_DATA");
            gdReq = OperateGridData.parse(rawData);
            String mode = gdReq.getParam("mode");
            if(mode.equals("select")){
                gdRes = BasicSelectQry(gdReq);
            }
            else if(mode.equals("addRow")){
                gdRes = addRow(gdReq);
            }
        }
        catch(Exception e){
            gdRes = new GridData();
            gdRes.setMessage("Error: " + e.getMessage());
            gdRes.setStatus("false");

            e.printStackTrace();
        }
        finally{
            try{
                OperateGridData.write(gdRes, out);
            }
            catch(Exception e){
                e.printStackTrace();
            }
        }
    }

    public GridData addRow(GridData gdReq) throws Exception {
        GridData gdRes = new GridData();
        OperateGridData.cloneResponseGridData(gdReq);

        String[] imageUrls = {"/images/arrow_left.gif", "/images/arrow_right.gif"};
        gdRes.getHeader("IMAGETEXT").setImageURLs(imageUrls);

        String[] comboValue = {"콤보1", "콤보2", "콤보3"};
        String[] comboHiddenValue = {"C1", "C2", "C3"};

        gdRes.getHeader("COMBO1").setComboValues(comboValue, comboHiddenValue);
        gdRes.getHeader("COMBO2").setComboValues(comboValue, comboHiddenValue);
        gdRes.getHeader("CHECK").addValue("0", "");
        gdRes.getHeader("TEXT").addValue("", "");
        gdRes.getHeader("NUMBER").addValue("", "");
        gdRes.getHeader("DATE").addValue("", "");
        gdRes.getHeader("COMBO1").addSelectedHiddenValue("C1");
        gdRes.getHeader("COMBO2").addSelectedHiddenValue("C1");
        //gdRes.getHeader("IMAGETEXT").addValue("", 0);
        return gdRes;
    }


    public GridData BasicSelectQry(GridData gdReq) throws Exception{
        GridData gdRes = null;
        int rowCount = 0;
        try{
            gdRes = OperateGridData.cloneResponseGridData(gdReq);

            String from_date = gdReq.getParam("FROM_DATE");
            String to_date = gdReq.getParam("TO_DATE");

            rowCount = 100;

            if(rowCount == 0){
                gdRes.setMessage("조회된 데이터가 없습니다.");
                gdRes.setStatus("true");
                return gdRes;
            }

            String[] comboValue = {"콤보1", "콤보2", "콤보3"};
            String[] comboHiddenValue = {"C1", "C2", "C3"};
            gdRes.getHeader("COMBO1").setComboValues(comboValue, comboHiddenValue);
            gdRes.getHeader("COMBO2").setComboValues(comboValue, comboHiddenValue);

            String[] imageUrls = {"/images/arrow_left.gif", "/images/arrow_right.gif"};
            gdRes.getHeader("IMAGETEXT").setImageURLs(imageUrls);

            for(int i = 0; i < rowCount; i++){
                gdRes.getHeader("CHECK").addValue("0", "");
                gdRes.getHeader("TEXT").addValue("TEXT : " + String.valueOf(i), "");
                gdRes.getHeader("NUMBER").addValue(String.valueOf(i), "");
                gdRes.getHeader("DATE").addValue("20080301", "");
                gdRes.getHeader("COMBO1").addSelectedHiddenValue("C1");
                gdRes.getHeader("COMBO2").addSelectedHiddenValue("C1");
                gdRes.getHeader("IMAGETEXT").addValue("IMAGETEXT : " + String.valueOf(i), "", 0);
            }
        }
        catch(Exception e)
        {
            throw e;
        }

        // 메세지와 상태값을 셋팅합니다.
        gdRes.setMessage("성공적으로 작업하였습니다.");
        gdRes.setStatus("true");

        return gdRes;
    }

}


