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

/*
* 기본예제
* @author iCOMPIA CORP.
*/


public class ExampleSelectCopy extends HttpServlet {
    private static final long serialVersionUID = -419201700278107216L;

    public void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException, ServletException {

        GridData[] gdReq = new GridData[2];
        GridData[] gdRes = new GridData[2];

        String[] strReqKey = {"WISEGRID_DATA", "WISEGRID_DATA1"};
        String[] strResKey = {"WISEGRIDDATA_MASTER", "WISEGRID_DATA1"};


        //req.setCharacterEncoding("utf-8");
        res.setContentType("text/html;charset=utf-8");
        PrintWriter out = res.getWriter();
        try {

            String[] rawData = new String[2];

            for (int i = 0; i < strReqKey.length; i++) {
                // 각 그리드의 RawData를 가져온다.
                rawData[i] = req.getParameter(strReqKey[i]);
                // 올라온 전문을 Parsing하여 자료구조 형태로 반환해준다.
                gdReq[i] = OperateGridData.parse(rawData[i]);
            }

            String mode = gdReq[0].getParam("mode");

            for (int i = 0; i < gdReq.length; i++) {

                if (mode.equals("search"))
                    gdRes[i] = doQuery(gdReq[i]);
                else if (mode.equals("insert"))
                    gdRes[i] = doInsert(gdReq[i]);
                else if (mode.equals("update"))
                    gdRes[i] = doUpdata(gdReq[i]);
                else if (mode.equals("delete"))
                    gdRes[i] = doDelete(gdReq[i]);
            }
        } catch (Exception e) {
            for (int i = 0; i < gdRes.length; i++) {
                gdRes[i] = new GridData();
            }
            gdRes[0].setMessage("Error: " + e.getMessage());
            gdRes[0].setStatus("false");
            e.printStackTrace();
        } finally {
            try {
                if (gdReq[0].getParam("mode").equals("error")) {
                    out.print("<script></script>");
                } else {
                    OperateGridData.write(strResKey, gdRes, out);
                }
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


            String[] strParams2 = {"ITEM_", "0|0|255"};
            gdRes.addDynamicAPI("SetColCellFgColor", strParams2);
            // 데이터가 없을 경우
            if (rowCount == 0) {
                gdRes.addParam("mode", "search");
                gdRes.setMessage("조회결과가 없습니다.");
                gdRes.setStatus("true");
                return gdRes;
            }

            String[] img = {"/images/bt_search.gif"};
            gdRes.getHeader("ITEM_CODE").setImageURLs(img);

            for (int i = 0; i < rowCount; i++) {
//				gdRes.getHeader("ALLSELECTED").addValue("0", "");
                gdRes.getHeader("SELECTED").addValue("0", "");
                gdRes.getHeader("SEQ_NO").addValue(String.valueOf(i), "");
                gdRes.getHeader("ITEM_FLAG").addSelectedHiddenValue(sd.getValue(i, 0));
                gdRes.getHeader("VENDOR_NAME").addValue(sd.getValue(i, 1), "");
                gdRes.getHeader("ITEM_CODE").addValue(sd.getValue(i, 2), "", 0);
                gdRes.getHeader("ITEM_NAME").addValue(sd.getValue(i, 3), "");
                gdRes.getHeader("SPECIFICATION").addValue(sd.getValue(i, 4), "");
                gdRes.getHeader("UNIT").addSelectedHiddenValue(sd.getValue(i, 5));
//                gdRes.getHeader("PRICE").addValue(sd.getValue(i, 6), "");

                gdRes.getHeader("PRICE").addValue("", "");

                gdRes.getHeader("STOCK").addValue(sd.getValue(i, 7), "");
                gdRes.getHeader("ADD_DATE").addValue(sd.getValue(i, 8), "");
                gdRes.getHeader("CHANGE_DATE").addValue(sd.getValue(i, 9), "");
            }
            gdRes.addParam("mode", "search");
            gdRes.setMessage("성공적으로 작업하였습니다.");
            gdRes.setStatus("true");
        } catch (Exception e) {
            throw e;
        }
        return gdRes;
    }

    /* 등록 */
    private GridData doInsert(GridData gdReq) throws Exception {

        GridData gdRes = new GridData();
        int rowCount = 0;

        // append한 StringBuffer를 insert_data에 넘긴다.
        String insertData = "";

        try {
            // 화면에서 전달받은 "SEQ_NO"의 Count를 가져온다.
            rowCount = gdReq.getHeader("SEQ_NO").getRowCount();

            // 등록시 입력할 데이터를 정해진 형태로 만들어 놓는다.
            String inData[][] = new String[rowCount][];

            // 데이터 셋팅
            for (int i = 0; i < rowCount; i++) {
                String Data[] = {
                        gdReq.getHeader("ITEM_FLAG").getComboHiddenValues()[gdReq.getHeader("ITEM_FLAG").getSelectedIndex(i)],
                        gdReq.getHeader("VENDOR_NAME").getValue(i),
                        gdReq.getHeader("ITEM_CODE").getValue(i),
                        gdReq.getHeader("ITEM_NAME").getValue(i),
                        gdReq.getHeader("SPECIFICATION").getValue(i),
                        gdReq.getHeader("UNIT").getComboHiddenValues()[gdReq.getHeader("UNIT").getSelectedIndex(i)],
                        gdReq.getHeader("PRICE").getValue(i),
                        gdReq.getHeader("STOCK").getValue(i)};
                inData[i] = Data;
            }

			/*
             * 생성된 자료구조를 DataBase에 넘겨 처리한다.
			 */

            // 이 예제는 동적헤더의 동작을 확인하기 위한 샘플이므로
            // 만들어진 데이터를 화면의 fieldset으로  보내 정상적으로 통신이 이루어졌는지 확인한다.
            insertData = getSendData(inData, "C");

			/* 화면에 전달할  파라미터를 설정한다.
			 * 메세지를 셋팅한다.
			 * Status를 설정한다
			 */
            gdRes.addParam("mode", "insert");
            gdRes.addParam("insert_data", insertData);
            gdRes.setMessage("성공적으로 작업하였습니다.");
            gdRes.setStatus("true");

        } catch (Exception e) {
            throw e;
        }

        return gdRes;
    }

    /* 수정 */
    private GridData doUpdata(GridData gdReq) throws Exception {

        GridData gdRes = new GridData();
        int rowCount = 0;

        // append한 StringBuffer를 update_data에 넘긴다.
        String updatedata = "";

        try {
            // 화면에서 전달받은 "SEQ_NO"의 Count를 가져온다.
            rowCount = gdReq.getHeader("SEQ_NO").getRowCount();

            // 수정시 입력할 데이터를 정해진 형태로 만들어 놓는다.
            String inData[][] = new String[rowCount][];

            for (int i = 0; i < rowCount; i++) {
                String Data[] = {
                        gdReq.getHeader("ITEM_FLAG").getComboHiddenValues()[gdReq.getHeader("ITEM_FLAG").getSelectedIndex(i)],
                        gdReq.getHeader("VENDOR_NAME").getValue(i),
                        gdReq.getHeader("ITEM_CODE").getValue(i),
                        gdReq.getHeader("ITEM_NAME").getValue(i),
                        gdReq.getHeader("SPECIFICATION").getValue(i),
                        gdReq.getHeader("UNIT").getComboHiddenValues()[gdReq.getHeader("UNIT").getSelectedIndex(i)],
                        gdReq.getHeader("PRICE").getValue(i),
                        gdReq.getHeader("STOCK").getValue(i)};
                inData[i] = Data;
            }

            updatedata = getSendData(inData, "U");

            gdRes.addParam("mode", "update");
            gdRes.addParam("update_data", updatedata);
            gdRes.setMessage("성공적으로 작업하였습니다.");
            gdRes.setStatus("true");

        } catch (Exception e) {
            throw e;
        }

        return gdRes;
    }

    /* 삭제 */
    private GridData doDelete(GridData gdReq) throws Exception {

        GridData gdRes = new GridData();
        int rowCount = 0;

        String deleteData = "";

        try {
            rowCount = gdReq.getHeader("SEQ_NO").getRowCount();
            String inData[] = new String[rowCount];

            /* 데이터 */
            deleteData = getSendData2(inData);

			/* 화면에 전달할 파라미터를 설정한다.
			 * 메세지를 셋팅한다.
			 * Status를 설정한다
			 */
            gdRes.addParam("mode", "delete");
            gdRes.addParam("delete_data", deleteData);
            gdRes.setMessage("성공적으로 작업하였습니다.");
            gdRes.setStatus("true");

        } catch (Exception e) {
            throw e;
        }

        return gdRes;
    }

    private String getSendData(String[][] sendData, String flag) {

        StringBuffer sbData = new StringBuffer();

        for (int i = 0; i < sendData.length; i++) {
            String[] rowData = sendData[i];
            for (int j = 0; j < rowData.length; j++)
                sbData.append("[" + rowData[j] + "]");
            sbData.append("\n");
        }

        if (flag.equals("C"))
            sbData.append(sendData.length + " 건의 데이터가 등록되었습니다.\n");
        else if (flag.equals("U"))
            sbData.append(sendData.length + " 건의 데이터가 수정되었습니다.\n");

        return sbData.toString();
    }

    private String getSendData2(String[] sendData) {

        StringBuffer sbData = new StringBuffer();

        sbData.append(sendData.length + " 건의 데이터가 삭제되었습니다.\n");

        return sbData.toString();
    }
}



























