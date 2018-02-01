<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>test</title>
    <script  for="WiseGrid" event="Initialize()">
        init();
    </script>
    <script>
        function init() {
            var gridObj = document.WiseGrid;
            setHeader(gridObj)
            setProperty(gridObj);
        }

        function setHeader(gridObj) {
            gridObj.AddHeader("TEXT_1",		"텍스트_1",			"t_text", 	"12.6", 		200,		false);
            gridObj.AddHeader("TEXT_2",		"텍스트_2",			"t_text", 	"12.6", 		200,		false);
            gridObj.BoundHeader();
        }

        function doQueryFromServer() {
            var gridObj = document.WiseGrid;
            gridObj.DoQuery("test_groupmerge_grid_server.jsp");
        }

        function initWiseGrid(objName, width, height) {
            var WISEGRID_TAG = "<OBJECT ID='" + objName + "' codebase='/WiseGrid/WiseGrid_v_5_3_1_100.cab#version=5,3,1,100'";
            WISEGRID_TAG = WISEGRID_TAG + " NAME='" + objName + "' WIDTH=" + width + " HEIGHT=" + height + " border=0";
            WISEGRID_TAG = WISEGRID_TAG + " CLASSID='CLSID:E8AA1760-8BE5-4891-B433-C53F7333710F'>";
//            WISEGRID_TAG = WISEGRID_TAG + " <PARAM NAME = 'strLicenseKeyList' VALUE='M+UMiwRSibpQ9Ynz4hRLqJByNH8oRVTD/eg3UO+UnHZ6OeGZ1C6Bs/vFE10aXa156tHON6D0iGvmRVc6hNqn+w=='>";
            WISEGRID_TAG = WISEGRID_TAG + " <PARAM NAME = 'strLicenseKeyList' VALUE='M+UMiwRSibpQ9Ynz4hRLqJByNH8oRVTD/eg3UO+UnHZ6OeGZ1C6Bs/vFE10aXa15nkL5fPv/P1o3dsh243gDeQ=='>";
            WISEGRID_TAG = WISEGRID_TAG + "</OBJECT>"
            document.write(WISEGRID_TAG);
        }
    </script>
</head>
<body>
<input type="button" onclick="doQueryFromServer();" value="서버단처리 조회"/>
<script>initWiseGrid("WiseGrid", "100%", "350");</script>
</body>
</html>