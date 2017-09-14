<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="xlib.cmc.GridData" %>
<%@ page import="xlib.cmc.OperateGridData" %>
<%
    String rawData = request.getParameter("WISEGRID_DATA");
    GridData gdRes = OperateGridData.parse(rawData);
    response.setCharacterEncoding("UTF-8");
    response.setContentType("text/html;charset=UTF-8");
    try {
        double exRdata = 6.682283;
        for(int n=0; n<10; n++) {
            gdRes.getHeader("TEXT").addValue(String.valueOf(exRdata), "");
            gdRes.getHeader("NUMBER").addValue(String.valueOf(exRdata), "");
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
    }
%>