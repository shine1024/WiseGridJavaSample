<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="xlib.cmc.GridData" %>
<%@ page import="xlib.cmc.OperateGridData" %>
<%@ page import="xlib.cmc.GridHeader" %>
<%
    String rawData = request.getParameter("WISEGRID_DATA");
    GridData gdRes = OperateGridData.parse(rawData);
    response.setCharacterEncoding("UTF-8");
    response.setContentType("text/html;charset=UTF-8");

    try {
        GridHeader test_combo_1 = gdRes.getHeader("TEST_COMBO_1");
        GridHeader test_combo_2 = gdRes.getHeader("TEST_COMBO_2");

        test_combo_1.clearComboList();
        test_combo_2.clearComboList();

        test_combo_1.addComboListValues("T", new String[]{"영업팀", "개발팀", "인사팀"}, new String[]{"A", "B", "C"});

        test_combo_2.addComboListValues("A", new String[]{"김영업", "박영업",}, new String[]{"A1", "A2"});
        test_combo_2.addComboListValues("B", new String[]{"이개발", "노개발",}, new String[]{"B1", "B2"});
        test_combo_2.addComboListValues("C", new String[]{"박인사", "홍인사", "갑인사",}, new String[]{"C1", "C2", "C3"});

        String combo1_key = "A";
        for(int n=0; n<10; n++) {
            if(2 < n && 6 > n) combo1_key = "B";
            if(n > 6) combo1_key = "C";
            test_combo_1.addSelectedHiddenValue("T", combo1_key);
            test_combo_2.addSelectedHiddenValue(combo1_key, "");
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