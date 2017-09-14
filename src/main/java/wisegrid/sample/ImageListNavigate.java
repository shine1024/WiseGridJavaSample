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
 * Created by BONG on 2014-12-01.
 */

public class ImageListNavigate extends HttpServlet{
    public void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException, ServletException{
        GridData gdReq = null;
        GridData gdRes = null;
        req.setCharacterEncoding("UTF-8");
        res.setContentType("text/html; charset=utf-8");
        PrintWriter out = res.getWriter();
        try{
            String rawData = req.getParameter("WISEGRID_DATA");
            gdReq = OperateGridData.parse(rawData);
            gdRes = BasicSelectQry(gdReq);
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
            }catch(Exception e){
                e.printStackTrace();
            }
        }
    }


    public GridData BasicSelectQry(GridData gdReq) throws Exception {
        GridData gdRes = null;
        int rowCount = 0;

        try{
            gdRes = OperateGridData.cloneResponseGridData(gdReq);

            int viewCount = 5;
            int starPoint = 0;
            int endPoint = 0;
            int naviValue;
            rowCount = 20;


            if(gdReq.getTotalCount()== -1)
                gdRes.setTotalCount(rowCount);
            if(gdReq.getNavigateValue().equals("")){
                naviValue = 0;
            }else{
                naviValue = Integer.parseInt(gdReq.getNavigateValue())+1;
            }
            gdRes.setNavigateValue(String.valueOf(naviValue));
            if(rowCount == 0)
            {
                gdRes.setMessage("조회된 데이터가 없습니다.");
                gdRes.setStatus("true");
                return gdRes;
            }
            starPoint = naviValue * viewCount+1;
            endPoint = starPoint + (viewCount-1);

            if (endPoint >= rowCount) endPoint = rowCount;

            String[] imageUrls = {
                    "/images/prod/IT20061207001.jpg",
                    "/images/prod/IT20061207002.jpg",
                    "/images/prod/IT20061207003.jpg",
                    "/images/prod/IT20061207004.jpg",
                    "/images/prod/IT20061207005.jpg",
                    "/images/prod/IT20061207006.jpg",
                    "/images/prod/IT20061207007.jpg",
                    "/images/prod/IT20061207008.jpg",
                    "/images/prod/IT20061207009.jpg",
                    "/images/prod/IT20061207010.jpg",
                    "/images/prod/IT20061207011.jpg",
                    "/images/prod/IT20061207012.jpg",
                    "/images/prod/IT20061207013.jpg",
                    "/images/prod/IT20061207014.jpg",
                    "/images/prod/IT20061207015.jpg",
                    "/images/prod/IT20061207016.jpg",
                    "/images/prod/IT20061207017.jpg",
                    "/images/prod/IT20061207018.jpg",
                    "/images/prod/IT20061207019.jpg",
                    "/images/prod/IT20061207020.jpg"
            };
            // 이미지리스트 등록시 index로 적용시에만 한다.
            //gdRes.getHeader("IMAGE_TEXT").setImageURLs(imageUrls);
            for (int i = starPoint - 1; i < endPoint; i++) {
                gdRes.getHeader("NUMBER").addValue(String.valueOf(i+1), "");
                gdRes.getHeader("IMAGE_TEXT").addValue("IMAGE_TEXT" +(i+1),  "", imageUrls[i]);
                gdRes.getHeader("IMAGE_URL").addValue(imageUrls[i], "");
            }
        }catch(Exception e){
            throw e;
        }
        gdRes.setMessage("성공적으로 작업하였습니다.");
        gdRes.setStatus("true");
        return gdRes;
    }
}// class
