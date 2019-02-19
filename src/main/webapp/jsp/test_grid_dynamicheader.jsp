<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>test</title>
    <script  for="WiseGrid" event="Initialize()">
        changeColumnTypeHandler(WiseGrid);
    </script>
    <script  for="WiseGrid2" event="Initialize()">
        init()
    </script>
    <script>
        function init() {
            var gridObj2 = document.WiseGrid2;
            gridObj2.bDoQueryDynamic = true; // 서버단에서 동적헤더 생성을 위한 API
            gridObj2.AddHeader('HIDDEN', '숨김', 't_checkbox', '10', 0, false);
            gridObj2.BoundHeader();
        }

        function setHeaderWithData1(gridObj){
            gridObj.AddHeader("NUMBER1",	"숫자1",			"t_number", 	"80", 		200,		true);
            gridObj.AddHeader("NUMBER2",	"숫자2",			"t_number", 	"80", 		200,		true);
            gridObj.AddHeader("NUMBER3",	"숫자3",			"t_number", 	"80", 		200,		true);
            gridObj.AddHeader("NUMBER4",	"숫자4",			"t_number", 	"80", 		200,		true);
            gridObj.AddHeader("NUMBER5",	"숫자5",			"t_number", 	"80", 		200,		true);
            gridObj.AddHeader("NUMBER6",	"숫자6",			"t_number", 	"80", 		200,		true);
            gridObj.BoundHeader();
        }

        function setHeaderWithData2(gridObj){
            gridObj.AddHeader("TEXT1",		"텍스트1",			"t_text", 	"50", 		200,		true);
            gridObj.AddHeader("TEXT2",		"텍스트2",			"t_text", 	"50", 		200,		true);
            gridObj.AddHeader("TEXT3",		"텍스트3",			"t_text", 	"50", 		200,		true);
            gridObj.AddHeader("TEXT4",		"텍스트4",			"t_text", 	"50", 		200,		true);
            gridObj.AddHeader("TEXT5",		"텍스트5",			"t_text", 	"50", 		200,		true);
            gridObj.AddHeader("TEXT6",		"텍스트6",			"t_text", 	"50", 		200,		true);
            gridObj.BoundHeader();
        }

        function changeColumnTypeHandler(gridObj){
            var columnType = document.getElementById('columnType');
            columnType.addEventListener('change', function(){
                var column = columnType.value;
                gridObj.ClearGrid();    // 바운드된 그리드를 모두 지우는 API
                if(column === 'A') setHeaderWithData1(gridObj);
                else setHeaderWithData2(gridObj);
            });
        }

        function doQueryFromServer(){
            var gridObj2 = document.WiseGrid2;
            var columnType2Value = document.getElementById('columnType2').value;
            if(columnType2Value === '') return;
            gridObj2.SetParam('columnType2', columnType2Value);
            gridObj2.DoQuery("test_grid_dynamicheader_server.jsp");
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
클라이언트 동적헤더
-> 콤보박스 변경 시 헤더 생성
<select id="columnType">
    <option>--- 선택 ---</option>
    <option value="A">컬럼1</option>
    <option value="B">컬럼2</option>
</select>
<div style="height: 10px;"></div>
<script>initWiseGrid("WiseGrid", "100%", "350");</script>

<div style="height: 50px;"></div>
서버단 동적헤더
-> 버튼 클릭시 콤보박스 선택에 헤더 생성
<input type="button" onclick="doQueryFromServer();" value="헤더생성"/>
<select id="columnType2">
    <option>--- 선택 ---</option>
    <option value="C">컬럼3</option>
    <option value="D">컬럼4</option>
</select>
<div style="height: 10px;"></div>
<script>initWiseGrid("WiseGrid2", "100%", "350");</script>
</body>
</html>