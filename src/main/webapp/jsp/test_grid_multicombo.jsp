<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>test</title>
    <script  for="WiseGrid" event="Initialize()">
        init();
    </script>
    <script language=javascript for="WiseGrid" event="ChangeCombo(strColumnKey, nRow, nOldIndex, nNewIndex)">
        changeGridCombo(strColumnKey, nRow);
    </script>
    <script>
        function init(){
            var gridObj = document.WiseGrid;
            setHeader(gridObj);
        }

        function setHeader(gridObj) {
            gridObj.AddHeader("TEST_COMBO_1",		"TEST_COMBO_1",			"t_combo", 	"100", 		200,		true);
            gridObj.AddHeader("TEST_COMBO_2",		"TEST_COMBO_2",			"t_combo", 	"100", 		200,		true);
            gridObj.BoundHeader();
        }

        function changeGridCombo(strColumnKey, nRow) {
            var gridObj = document.WiseGrid;
            if(strColumnKey == "TEST_COMBO_1") {
                var combokey = gridObj.GetComboHiddenValue("TEST_COMBO_1",gridObj.GetComboSelectedIndex('TEST_COMBO_1',nRow),"T");
                gridObj.SetComboSelectedIndex("TEST_COMBO_2", nRow, -1, combokey);
            }
        }
        
        function doQueryFromServer() {
            var gridObj = document.WiseGrid;
            gridObj.DoQuery("test_grid_multicombo_server.jsp");
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
<input type="button" onclick="doQueryFromServer();" value="서버단처리 호출"/>
<script>initWiseGrid("WiseGrid", "100%", "350");</script>
</body>
</html>