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
            gridObj.AddHeader("NUMBER",		"숫자타입",			"t_number", 	"12.6", 		200,		false);
            gridObj.BoundHeader();
        }

        function setProperty(gridObj) {
            gridObj.setNumberFormat('NUMBER', '#,###.######');
        }

        function addRow() {
            var gridObj = document.WiseGrid;
            gridObj.addRow();
        }

        function doQueryFromClient() {
            var gridObj = document.WiseGrid;
            var number_text_type = "6.682283"
//            var number_number_type = 6.682283;
            gridObj.RemoveAllData();
            for(var n=0; n<10; n++) {
                addRow();
                gridObj.SetCellValue('NUMBER', n, number_text_type);
            }
        }

        function doQueryFromServer() {
            var gridObj = document.WiseGrid;
            gridObj.DoQuery("test_grid_server.jsp");
        }

        function initWiseGrid(objName, width, height) {
            var WISEGRID_TAG = "<OBJECT ID='" + objName + "' codebase='/WiseGrid/WiseGrid_v_5_3_1_100.cab#version=5,3,1,100'";
            WISEGRID_TAG = WISEGRID_TAG + " NAME='" + objName + "' WIDTH=" + width + " HEIGHT=" + height + " border=0";
            WISEGRID_TAG = WISEGRID_TAG + " CLASSID='CLSID:E8AA1760-8BE5-4891-B433-C53F7333710F'>";
            WISEGRID_TAG = WISEGRID_TAG + " <PARAM NAME = 'strLicenseKeyList' VALUE='122670CA8BD07EF9CD21AC63B6EB6E08'>";
            WISEGRID_TAG = WISEGRID_TAG + "</OBJECT>"
            document.write(WISEGRID_TAG);
        }
    </script>
</head>
<body>
<input type="button" onclick="doQueryFromClient();" value="클라이언트단처리 조회"/>
<input type="button" onclick="doQueryFromServer();" value="서버단처리 조회"/>
<script>initWiseGrid("WiseGrid", "100%", "350");</script>
</body>
</html>