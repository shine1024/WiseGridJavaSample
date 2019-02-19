<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="xlib.cmc.GridData" %>
<%@ page import="xlib.cmc.OperateGridData" %>
<%response.setCharacterEncoding("UTF-8");
    response.setContentType("text/html;charset=UTF-8");

    String rawData = request.getParameter("WISEGRID_DATA");
    GridData gdReq = OperateGridData.parse(rawData);
    String columnType2 = gdReq.getParam("columnType2");
    GridData gdRes = new GridData();
    try {
        // columnType2 에 따라 헤더를 생성한다
        if (columnType2.equals("C")) {
            gdRes.addDynamicHeader("TEXT1", "텍스트1", OperateGridData.t_text, "100", "120", "true");
            gdRes.addDynamicHeader("TEXT2", "텍스트2", OperateGridData.t_text, "100", "120", "true");
            gdRes.addDynamicHeader("TEXT3", "텍스트3", OperateGridData.t_text, "100", "120", "true");
            gdRes.addDynamicHeader("TEXT4", "텍스트4", OperateGridData.t_text, "100", "120", "true");
            gdRes.addDynamicHeader("TEXT5", "텍스트5", OperateGridData.t_text, "100", "120", "true");
            gdRes.addDynamicHeader("TEXT6", "텍스트6", OperateGridData.t_text, "100", "120", "true");
        } else if (columnType2.equals("D")) {
            gdRes.addDynamicHeader("NUMBER1", "숫자1", OperateGridData.t_number, "100", "120", "true");
            gdRes.addDynamicHeader("NUMBER2", "숫자2", OperateGridData.t_number, "100", "120", "true");
            gdRes.addDynamicHeader("NUMBER3", "숫자3", OperateGridData.t_number, "100", "120", "true");
            gdRes.addDynamicHeader("NUMBER4", "숫자4", OperateGridData.t_number, "100", "120", "true");
            gdRes.addDynamicHeader("NUMBER5", "숫자5", OperateGridData.t_number, "100", "120", "true");
            gdRes.addDynamicHeader("NUMBER6", "숫자6", OperateGridData.t_number, "100", "120", "true");
        }
    } catch (Exception e) {
        gdRes = new GridData();
        gdRes.setMessage("Error: " + e.getMessage());
        gdRes.setStatus("false");
        e.printStackTrace();
    } finally {
        try {
            OperateGridData.write(gdRes, response.getWriter());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }%>