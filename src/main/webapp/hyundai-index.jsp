<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%--<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>--%>
<%--<tiles:insertAttribute name="header" />--%>
<script type="text/javascript">
    $(function() {
        $("#layout_div_left").resizable({
            handles: "e",
            resize: function( event, ui ) {
                var ss = ui.size.width - 20;
                if(ss > 0) {
                    document.WG_LEFT_MENU.SetColWidth("MENUNAME", ss);
                }
            }
        });
    });
</script>
<body scroll="no" style="overflow:hidden; margin: 0px;">
<table width="100%" height="100%" border="0" cellspacing="0" cellpadding="0" style="table-layout:fixed;">
    <tr>
        <%--<td valign="top" height="59"><tiles:insertAttribute name="top" /></td>--%>
        <td valign="top" height="59"><iframe src="html/layout/top.htm"/></td>
    </tr>
    <tr>
        <td valign="top">
            <div id="layout_div" class="content" style="overflow:hidden; padding-right:5px;">
                <%--<div id="layout_div_left" class="left"  style="overflow-x:hidden; background-color:#eff1f2; border-right:4px solid #15bdbd; padding: 8px 5px 0px 5px;"><tiles:insertAttribute name="left" /></div>--%>
                <div id="layout_div_left" class="left"  style="overflow-x:hidden; background-color:#eff1f2; border-right:4px solid #15bdbd; padding: 8px 5px 0px 5px;">
                    <iframe src="html/layout/left_menu.htm"/>
                </div>
                <%--<div id="layout_div_body" class="right" style="overflow-x:hidden;"><tiles:insertAttribute name="body" /></div>--%>
                <div id="layout_div_body" class="right" style="overflow-x:hidden;">
                    <iframe src="html/sample/example_select.htm"/>
                </div>
            </div>
        </td>
    </tr>
    <tr>
        <%--<td height="30"><tiles:insertAttribute name="footer" /></td>--%>
        <td height="30">
            <iframe src="html/layout/bottom.htm"/>
        </td>
    </tr>
</table>
</body>
</html>