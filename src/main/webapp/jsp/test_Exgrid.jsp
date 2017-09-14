<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
<title>Extension Test</title>
<script type="text/javascript" src='/js/WiseGridConfig.js'></script>
<script type="text/javascript" src='/js/WiseGridExtension.js'></script>
<script>
W$.ready(function () {
    // WiseGrid 생성
    WiseGridEx.render({
        id: 'WiseGrid',
        width: '100%',
        height: 300,
        target: 'wiseGridDiv',
        initialize: function () {
            WiseGrid.header.add([
                 {key: 'TEXT', text: '문자타입', width: '200', maxLength: '200', type: 't_text', edit: true}
                ,{key: 'NUMBER', text: '숫자타입', width: '200', maxLength: '12.6', type: 't_number', edit: true}
            ]);
            WiseGrid.BoundHeader();
            WiseGrid.setNumberFormat('NUMBER', '#,###.######');
        }
    });
})
</script>
<script>
function doQueryFromClient() {
    var gridObj = document.WiseGrid;
    var number_text_type = "6.682283"
//            var number_number_type = 6.682283;
    gridObj.RemoveAllData();
    for (var n = 0; n < 10; n++) {
        gridObj.addRow();
        gridObj.SetCellValue('TEXT', n, number_text_type);
        gridObj.SetCellValue('NUMBER', n, number_text_type);
    }
}

function doQueryFromServer() {
    var gridObj = document.WiseGrid;
    gridObj.DoQuery("test_Exgrid_server.jsp");
}
</script>
</head>
<body>
<input type="button" onclick="doQueryFromClient();" value="클라이언트단처리 조회"/>
<input type="button" onclick="doQueryFromServer();" value="서버단처리 조회"/>
<div id="wiseGridDiv"></div>
</body>
</html>