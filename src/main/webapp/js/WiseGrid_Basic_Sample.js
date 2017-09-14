function init(GridObj)
{
	setHeader(GridObj);
	addData(GridObj);
}

function init2(GridObj)
{
	setHeader2(GridObj);
	addData(GridObj);
}

function init3(GridObj)
{
	setHeader3(GridObj);
	addData(GridObj);
}

function initForGroup(GridObj)
{
	GridObj.bMultiRowMenuVisible = false;
 	GridObj.bHDSwapping = false;
 	GridObj.bHDMoving = false;
 	GridObj.nHDLines = 3;
 	
	setHeaderForGroup(GridObj);
	addData(GridObj);
}

function initForGroup2(GridObj)
{
	GridObj.bMultiRowMenuVisible = false;
 	GridObj.bHDSwapping = false;
 	GridObj.bHDMoving = false;
 	GridObj.nHDLines = 4;
 	
	setHeaderForGroup2(GridObj);
	addData(GridObj);
}

function setHeader(GridObj) 
{    
	GridObj.AddHeader("SELECTED", 		"선택",			"t_checkbox", 		2, 		30,		true);	
	GridObj.AddHeader("ITEM_FLAG", 		"자재구분",		"t_combo", 			10, 	90,		true);	
	GridObj.AddHeader("VENDOR_NAME", 	"제조회사",		"t_text", 			50, 	80,	true);
	GridObj.AddHeader("ITEM_CODE", 		"제품코드",		"t_imagetext", 		20, 	100,	false);
	GridObj.AddHeader("ITEM_NAME", 		"제품명", 		"t_text", 			500, 	150,	true);	
	GridObj.AddHeader("SPECIFICATION", 	"규격", 		"t_text", 			2000, 	200,	true);	
	GridObj.AddHeader("UNIT", 			"단위",			"t_combo",			10, 	50,		true);
	GridObj.AddHeader("PRICE", 			"출고가", 		"t_number", 		22.3, 	80,		true);	
	GridObj.AddHeader("STOCK",			"재고량", 		"t_number", 		22.3,		60,		true);
	GridObj.AddHeader("ADD_DATE",		"등록일", 		"t_date", 			8,		85,		true);	
	GridObj.AddHeader("CHANGE_DATE",	"수정일", 		"t_date", 			8,		85,		true);	
	GridObj.BoundHeader();
	
	GridObj.AddComboListValue("ITEM_FLAG", "프로세서", "CPU"); 
	GridObj.AddComboListValue("ITEM_FLAG", "메모리", "MEM"); 
	GridObj.AddComboListValue("ITEM_FLAG", "메인보드", "MAB"); 
	GridObj.AddComboListValue("ITEM_FLAG", "그래픽카드", "VID"); 
	GridObj.AddComboListValue("ITEM_FLAG", "모니터", "MOR");
	GridObj.AddComboListValue("ITEM_FLAG", "하드디스크", "HDD");
	GridObj.AddComboListValue("ITEM_FLAG", "CDROM", "CDR");
	GridObj.AddComboListValue("ITEM_FLAG", "키보드", "KEY");
	GridObj.AddComboListValue("ITEM_FLAG", "마우스", "MOU");
	
	GridObj.AddImageList("ITEM_CODE", "/images/bt_search.gif");
	GridObj.SetColCellFgColor("ITEM_CODE", "0|0|255");
	
	GridObj.AddComboListValue("UNIT", "EA", "EA");

 	GridObj.SetNumberFormat("PRICE", "0,##0.00"); 
 	GridObj.SetNumberFormat("STOCK", "0,##0.00"); 
 	
 	GridObj.SetDateFormat("ADD_DATE", "yyyy/MM/dd");
 	GridObj.SetDateFormat("CHANGE_DATE", "yyyy/MM/dd");
}

function setHeader2(GridObj) {
	GridObj.AddHeader("SELECTED", 		"선택",			"t_checkbox", 		2, 		30,		true);	
	GridObj.AddHeader("ITEM_FLAG", 		"자재구분",		"t_combo", 			10, 	90,		true);	
	GridObj.AddHeader("VENDOR_NAME", 	"제조회사",		"t_text", 			50, 	80,	true);
	GridObj.AddHeader("ITEM_CODE", 		"제품코드",		"t_imagetext", 		20, 	100,	false);
	GridObj.AddHeader("ITEM_NAME", 		"제품명", 		"t_text", 			500, 	150,	true);	
	GridObj.AddHeader("SPECIFICATION", 	"규격", 		"t_text", 			2000, 	200,	true);	
	GridObj.AddHeader("UNIT", 			"단위",			"t_combo",			10, 	50,		true);
	GridObj.AddHeader("PRICE", 			"출고가", 		"t_number", 		22.3, 	80,		true);	
	GridObj.AddHeader("STOCK",			"재고량", 		"t_number", 		22.3,		60,		true);
	GridObj.AddHeader("ADD_DATE",		"등록일", 		"t_date", 			8,		85,		true);	
	GridObj.AddHeader("CHANGE_DATE",	"수정일", 		"t_date", 			8,		85,		true);	
	GridObj.BoundHeader();
	
	GridObj.AddComboListValue("ITEM_FLAG", "프로세서", "CPU"); 
	GridObj.AddComboListValue("ITEM_FLAG", "메모리", "MEM"); 
	GridObj.AddComboListValue("ITEM_FLAG", "메인보드", "MAB"); 
	GridObj.AddComboListValue("ITEM_FLAG", "그래픽카드", "VID"); 
	GridObj.AddComboListValue("ITEM_FLAG", "모니터", "MOR");
	GridObj.AddComboListValue("ITEM_FLAG", "하드디스크", "HDD");
	GridObj.AddComboListValue("ITEM_FLAG", "CDROM", "CDR");
	GridObj.AddComboListValue("ITEM_FLAG", "키보드", "KEY");
	GridObj.AddComboListValue("ITEM_FLAG", "마우스", "MOU");
	
	GridObj.AddImageList("ITEM_CODE","/images/bt_search.gif");
	
	GridObj.SetColCellFgColor("ITEM_CODE", "0|0|255");
	
	GridObj.AddComboListValue("UNIT", "EA", "EA");

 	GridObj.SetNumberFormat("PRICE", "0,##0.00"); 
 	GridObj.SetNumberFormat("STOCK", "0,##0.00"); 
 	
 	GridObj.SetDateFormat("ADD_DATE", "yyyy/MM/dd");
 	GridObj.SetDateFormat("CHANGE_DATE", "yyyy/MM/dd");
}

function setHeader3(GridObj) 
{    
	GridObj.AddHeader("SELECTED", 		"선택",			"t_checkbox", 		2, 		30,		true);	
	GridObj.AddHeader("ITEM_FLAG", 		"자재구분",		"t_combo", 			10, 	90,		true);	
	GridObj.AddHeader("VENDOR_NAME", 	"제조회사",		"t_text", 			50, 	80,	true);
	GridObj.AddHeader("ITEM_CODE", 		"제품코드",		"t_imagetext", 		20, 	100,	false);
	GridObj.AddHeader("ITEM_NAME", 		"제품명", 		"t_text", 			500, 	150,	true);	
	GridObj.AddHeader("SPECIFICATION", 	"규격", 		"t_text", 			2000, 	200,	true);	
	GridObj.AddHeader("UNIT", 			"단위",			"t_combo",			10, 	50,		true);
	GridObj.AddHeader("PRICE", 			"출고가", 		"t_number", 		22.3, 	80,		true);	
	GridObj.AddHeader("STOCK",			"재고량", 		"t_number", 		22.3,		60,		true);
	GridObj.AddHeader("ADD_DATE",		"등록일", 		"t_date", 			8,		85,		true);	
	GridObj.AddHeader("CHANGE_DATE",	"수정일", 		"t_date", 			8,		85,		true);	
	GridObj.BoundHeader();
	
	GridObj.AddComboListValue("ITEM_FLAG", "프로세서", "CPU"); 
	GridObj.AddComboListValue("ITEM_FLAG", "메모리", "MEM"); 
	GridObj.AddComboListValue("ITEM_FLAG", "메인보드", "MAB"); 
	GridObj.AddComboListValue("ITEM_FLAG", "그래픽카드", "VID"); 
	GridObj.AddComboListValue("ITEM_FLAG", "모니터", "MOR");
	GridObj.AddComboListValue("ITEM_FLAG", "하드디스크", "HDD");
	GridObj.AddComboListValue("ITEM_FLAG", "CDROM", "CDR");
	GridObj.AddComboListValue("ITEM_FLAG", "키보드", "KEY");
	GridObj.AddComboListValue("ITEM_FLAG", "마우스", "MOU");
	
	GridObj.AddImageList("ITEM_CODE", "../images/bt_search.gif");
	GridObj.SetColCellFgColor("ITEM_CODE", "0|0|255");
	
	GridObj.AddComboListValue("UNIT", "EA", "EA");

 	GridObj.SetNumberFormat("PRICE", "0,##0.00"); 
 	GridObj.SetNumberFormat("STOCK", "0,##0.00"); 
 	
 	GridObj.SetDateFormat("ADD_DATE", "yyyy/MM/dd");
 	GridObj.SetDateFormat("CHANGE_DATE", "yyyy/MM/dd");
}

function setHeaderForGroup(GridObj) 
{    
	GridObj.AddHeader("SELECTED", 		"선택",			"t_checkbox", 		2, 		30,		true);	
	GridObj.AddHeader("ITEM_FLAG", 		"자재구분",		"t_combo", 			10, 	90,		true);	
	GridObj.AddHeader("VENDOR_NAME", 	"제조회사",		"t_text", 			50, 	80,	true);
	GridObj.AddHeader("ITEM_CODE", 		"제품코드",		"t_imagetext", 		20, 	100,	false);
	GridObj.AddHeader("ITEM_NAME", 		"제품명", 		"t_text", 			500, 	150,	true);	
	GridObj.AddHeader("SPECIFICATION", 	"규격", 		"t_text", 			2000, 	200,	true);	
	GridObj.AddHeader("UNIT", 			"단위",			"t_combo",			10, 	50,		true);
	GridObj.AddHeader("PRICE", 			"출고가", 		"t_number", 		22.3, 	80,		true);	
	GridObj.AddHeader("STOCK",			"재고량", 		"t_number", 		22.3,		60,		true);
	GridObj.AddHeader("ADD_DATE",		"등록일", 		"t_date", 			8,		85,		true);	
	GridObj.AddHeader("CHANGE_DATE",	"수정일", 		"t_date", 			8,		85,		true);
	
	GridObj.AddGroup("GROUP1", "그룹1");
	GridObj.AppendHeader("GROUP1", "ITEM_FLAG");
	GridObj.AppendHeader("GROUP1", "VENDOR_NAME");
	
	GridObj.AddGroup("GROUP2", "그룹2");
	GridObj.AppendHeader("GROUP2", "ITEM_CODE");
	GridObj.AppendHeader("GROUP2", "ITEM_NAME");
		
	GridObj.BoundHeader();
	
	GridObj.AddComboListValue("ITEM_FLAG", "프로세서", "CPU"); 
	GridObj.AddComboListValue("ITEM_FLAG", "메모리", "MEM"); 
	GridObj.AddComboListValue("ITEM_FLAG", "메인보드", "MAB"); 
	GridObj.AddComboListValue("ITEM_FLAG", "그래픽카드", "VID"); 
	GridObj.AddComboListValue("ITEM_FLAG", "모니터", "MOR");
	GridObj.AddComboListValue("ITEM_FLAG", "하드디스크", "HDD");
	GridObj.AddComboListValue("ITEM_FLAG", "CDROM", "CDR");
	GridObj.AddComboListValue("ITEM_FLAG", "키보드", "KEY");
	GridObj.AddComboListValue("ITEM_FLAG", "마우스", "MOU");
	
	GridObj.AddImageList("ITEM_CODE", "../images/bt_search.gif");
	GridObj.SetColCellFgColor("ITEM_CODE", "0|0|255");
	
	GridObj.AddComboListValue("UNIT", "EA", "EA");

 	GridObj.SetNumberFormat("PRICE", "#,##0"); 
 	GridObj.SetNumberFormat("STOCK", "#,##0"); 
 	
 	GridObj.SetDateFormat("ADD_DATE", "yyyy/MM/dd");
 	GridObj.SetDateFormat("CHANGE_DATE", "yyyy/MM/dd");
}

function setHeaderForGroup2(GridObj) 
{    
	GridObj.AddHeader("SELECTED", 		"선택",			"t_checkbox", 		2, 		30,		true);	
	GridObj.AddHeader("ITEM_FLAG", 		"자재구분",		"t_combo", 			10, 	90,		true);	
	GridObj.AddHeader("VENDOR_NAME", 	"제조회사",		"t_text", 			50, 	80,	true);
	GridObj.AddHeader("ITEM_CODE", 		"제품코드",		"t_imagetext", 		20, 	100,	false);
	GridObj.AddHeader("ITEM_NAME", 		"제품명", 		"t_text", 			500, 	150,	true);	
	GridObj.AddHeader("SPECIFICATION", 	"규격", 		"t_text", 			2000, 	200,	true);	
	GridObj.AddHeader("UNIT", 			"단위",			"t_combo",			10, 	50,		true);
	GridObj.AddHeader("PRICE", 			"출고가", 		"t_number", 		22.3, 	80,		true);	
	GridObj.AddHeader("STOCK",			"재고량", 		"t_number", 		22.3,		60,		true);
	GridObj.AddHeader("ADD_DATE",		"등록일", 		"t_date", 			8,		85,		true);	
	GridObj.AddHeader("CHANGE_DATE",	"수정일", 		"t_date", 			8,		85,		true);
	
	GridObj.AddGroup("GROUP1", "그룹1");
	GridObj.AddGroup("GROUP2", "그룹2");
	GridObj.AddGroup("GROUP3", "그룹3");
	
	GridObj.AppendGroup("GROUP1", "GROUP2");
	GridObj.AppendGroup("GROUP1", "GROUP3");
	
	GridObj.AppendHeader("GROUP2", "ITEM_FLAG");
	GridObj.AppendHeader("GROUP2", "VENDOR_NAME");
	
	GridObj.AppendHeader("GROUP3", "ITEM_CODE");
	GridObj.AppendHeader("GROUP3", "ITEM_NAME");
		
	GridObj.BoundHeader();
	
	GridObj.AddComboListValue("ITEM_FLAG", "프로세서", "CPU"); 
	GridObj.AddComboListValue("ITEM_FLAG", "메모리", "MEM"); 
	GridObj.AddComboListValue("ITEM_FLAG", "메인보드", "MAB"); 
	GridObj.AddComboListValue("ITEM_FLAG", "그래픽카드", "VID"); 
	GridObj.AddComboListValue("ITEM_FLAG", "모니터", "MOR");
	GridObj.AddComboListValue("ITEM_FLAG", "하드디스크", "HDD");
	GridObj.AddComboListValue("ITEM_FLAG", "CDROM", "CDR");
	GridObj.AddComboListValue("ITEM_FLAG", "키보드", "KEY");
	GridObj.AddComboListValue("ITEM_FLAG", "마우스", "MOU");
	
	GridObj.AddImageList("ITEM_CODE", "../images/bt_search.gif");
	GridObj.SetColCellFgColor("ITEM_CODE", "0|0|255");
	
	GridObj.AddComboListValue("UNIT", "EA", "EA");

 	GridObj.SetNumberFormat("PRICE", "#,##0"); 
 	GridObj.SetNumberFormat("STOCK", "#,##0"); 
 	
 	GridObj.SetDateFormat("ADD_DATE", "yyyy/MM/dd");
 	GridObj.SetDateFormat("CHANGE_DATE", "yyyy/MM/dd");

}

function GridCellClick(strColumnKey, nRow){
	var GridObj = document.WiseGrid;

	if(strColumnKey == "SELECTED"){
		if(GridObj.GetCellValue("SELECTED", nRow)=="1");
		//GridObj.SetCellActivation("SELECTED",nRow, 'disable');
	}


	if(strColumnKey == "ITEM_CODE"){
		if(GridObj.GetCellValue("ITEM_CODE", nRow) != "")
			popUpOpen("../html/popup/prod_detail_pop.htm", "prod_detail_pop", 330, 250);
	}
}

/* //일반팝업을 중앙에 위치도록 할때  */
function popUpOpen(url, title, width, height) 
{
	if (title == '') title = 'Popup_Open';
    if (width == '') width = 540;
    if (height == '') height = 500;
	var left = "";
	var top = "";

    //화면 가운데로 배치
    var dim = new Array(2);

	dim = CenterWindow(height,width);
	top = dim[0];
	left = dim[1];

    var toolbar = 'no';
    var menubar = 'no';
    var status = 'no';
    var scrollbars = 'no';
    var resizable = 'no';
    var code_search = window.open(url, title, 'left='+left+', top='+top+',width='+width+',height='+height+', toolbar='+toolbar+', menubar='+menubar+', status='+status+', scrollbars='+scrollbars+', resizable='+resizable);
    code_search.focus();
    return code_search;
}

/* //일반팝업을 중앙에 위치도록 할때  */
function popUpOpenScroll(url, title, width, height) 
{
	if (title == '') title = 'Popup_Open';
    if (width == '') width = 540;
    if (height == '') height = 500;
	var left = "";
	var top = "";

    //화면 가운데로 배치
    var dim = new Array(2);

	dim = CenterWindow(height,width);
	top = dim[0];
	left = dim[1];

    var toolbar = 'no';
    var menubar = 'no';
    var status = 'no';
    var scrollbars = 'yes';
    var resizable = 'no';
    var code_search = window.open(url, title, 'left='+left+', top='+top+',width='+width+',height='+height+', toolbar='+toolbar+', menubar='+menubar+', status='+status+', scrollbars='+scrollbars+', resizable='+resizable);
    code_search.focus();
    return code_search;
}

/* //JavaScript로 새창을 띄울때 사용  */
function winOpen(url, title)
{
	if (title == '') title = 'Popup_Open';
    var width = 1024;
    var height = 768;
	var left = "";
	var top = "";

    //화면 가운데로 배치
    var dim = new Array(2);

	dim = CenterWindow(height,width);
	top = dim[0];
	left = dim[1];

    var toolbar = 'yes';
    var menubar = 'yes';
    var status = 'yes';
    var scrollbars = 'yes';
    var resizable = 'yes';
    var directories = 'yes';
    var code_search = window.open(url, title, 'left='+left+', top='+top+',width='+width+',height='+height+', toolbar='+toolbar+', menubar='+menubar+', status='+status+', scrollbars='+scrollbars+', resizable='+resizable+', directories='+directories);
    code_search.focus();
    return code_search;
}

function CenterWindow(height,width)
{
	var outx = screen.height;
	var outy = screen.width;
	var x = (outx - height)/2;
	var y = (outy - width)/2;
	dim = new Array(2);
	dim[0] = x;
	dim[1] = y;
	
	return  dim;
}

function addData(GridObj)
{
	// 1
	GridObj.AddRow();
	GridObj.SetComboSelectedHiddenValue("ITEM_FLAG", GridObj.GetRowCount() - 1, "CPU");
	GridObj.SetCellValue("VENDOR_NAME", GridObj.GetRowCount() - 1, "Intel Core 2 Extreme");
	GridObj.SetCellValue("ITEM_CODE", GridObj.GetRowCount() - 1, "IT20061207001");
	GridObj.SetCellImage ("ITEM_CODE", GridObj.GetRowCount() - 1, 0);
	GridObj.SetCellValue("ITEM_NAME", GridObj.GetRowCount() - 1, "EE X6800");
	GridObj.SetCellHiddenValue("ITEM_NAME", GridObj.GetRowCount() - 1, "IT20061207001");
	GridObj.SetCellValue("SPECIFICATION", GridObj.GetRowCount() - 1, "2.93GHz/FSB 1066/4MB L2");
	GridObj.SetComboSelectedHiddenValue("UNIT", GridObj.GetRowCount() - 1, "EA");
	GridObj.SetCellValue("PRICE", GridObj.GetRowCount() - 1, "1219000");
	GridObj.SetCellValue("STOCK", GridObj.GetRowCount() - 1, "155");
	GridObj.SetCellValue("ADD_DATE", GridObj.GetRowCount() - 1, "20061207");
	GridObj.SetCellValue("CHANGE_DATE", GridObj.GetRowCount() - 1, "20061208");
	
	// 2
	GridObj.AddRow();
	GridObj.SetComboSelectedHiddenValue("ITEM_FLAG", GridObj.GetRowCount() - 1, "CPU");
	GridObj.SetCellValue("VENDOR_NAME", GridObj.GetRowCount() - 1, "Intel Core 2 Extreme");
	GridObj.SetCellValue("ITEM_CODE", GridObj.GetRowCount() - 1, "IT20061207002");
	GridObj.SetCellImage ("ITEM_CODE", GridObj.GetRowCount() - 1, 0);
	GridObj.SetCellValue("ITEM_NAME", GridObj.GetRowCount() - 1, "E6700");
	GridObj.SetCellHiddenValue("ITEM_NAME", GridObj.GetRowCount() - 1, "IT20061207002");
	GridObj.SetCellValue("SPECIFICATION", GridObj.GetRowCount() - 1, "2.66GHz/FSB 1066/4MB L2");
	GridObj.SetComboSelectedHiddenValue("UNIT", GridObj.GetRowCount() - 1, "EA");
	GridObj.SetCellValue("PRICE", GridObj.GetRowCount() - 1, "580700");
	GridObj.SetCellValue("STOCK", GridObj.GetRowCount() - 1, "237");
	GridObj.SetCellValue("ADD_DATE", GridObj.GetRowCount() - 1, "20061207");
	GridObj.SetCellValue("CHANGE_DATE", GridObj.GetRowCount() - 1, "20061208");
	
	// 3
	GridObj.AddRow();
	GridObj.SetComboSelectedHiddenValue("ITEM_FLAG", GridObj.GetRowCount() - 1, "CPU");
	GridObj.SetCellValue("VENDOR_NAME", GridObj.GetRowCount() - 1, "Intel");
	GridObj.SetCellValue("ITEM_CODE", GridObj.GetRowCount() - 1, "IT20061207003");
	GridObj.SetCellImage ("ITEM_CODE", GridObj.GetRowCount() - 1, 0);
	GridObj.SetCellValue("ITEM_NAME", GridObj.GetRowCount() - 1, "Pentium D 960");
	GridObj.SetCellHiddenValue("ITEM_NAME", GridObj.GetRowCount() - 1, "IT20061207003");
	GridObj.SetCellValue("SPECIFICATION", GridObj.GetRowCount() - 1, "3.6GHz/4MB/Dual Core");
	GridObj.SetComboSelectedHiddenValue("UNIT", GridObj.GetRowCount() - 1, "EA");
	GridObj.SetCellValue("PRICE", GridObj.GetRowCount() - 1, "379100");
	GridObj.SetCellValue("STOCK", GridObj.GetRowCount() - 1, "125");
	GridObj.SetCellValue("ADD_DATE", GridObj.GetRowCount() - 1, "20061207");
	GridObj.SetCellValue("CHANGE_DATE", GridObj.GetRowCount() - 1, "20061208");
	
	// 4
	GridObj.AddRow();
	GridObj.SetComboSelectedHiddenValue("ITEM_FLAG", GridObj.GetRowCount() - 1, "CPU");
	GridObj.SetCellValue("VENDOR_NAME", GridObj.GetRowCount() - 1, "Intel");
	GridObj.SetCellValue("ITEM_CODE", GridObj.GetRowCount() - 1, "IT20061207004");
	GridObj.SetCellImage ("ITEM_CODE", GridObj.GetRowCount() - 1, 0);
	GridObj.SetCellValue("ITEM_NAME", GridObj.GetRowCount() - 1, "Pentium D 950");
	GridObj.SetCellHiddenValue("ITEM_NAME", GridObj.GetRowCount() - 1, "IT20061207004");
	GridObj.SetCellValue("SPECIFICATION", GridObj.GetRowCount() - 1, "3.4GHz/4MB/Dual Core");
	GridObj.SetComboSelectedHiddenValue("UNIT", GridObj.GetRowCount() - 1, "EA");
	GridObj.SetCellValue("PRICE", GridObj.GetRowCount() - 1, "262400");
	GridObj.SetCellValue("STOCK", GridObj.GetRowCount() - 1, "324");
	GridObj.SetCellValue("ADD_DATE", GridObj.GetRowCount() - 1, "20061207");
	GridObj.SetCellValue("CHANGE_DATE", GridObj.GetRowCount() - 1, "20061208");
	
	// 5
	GridObj.AddRow();
	GridObj.SetComboSelectedHiddenValue("ITEM_FLAG", GridObj.GetRowCount() - 1, "CPU");
	GridObj.SetCellValue("VENDOR_NAME", GridObj.GetRowCount() - 1, "Intel");
	GridObj.SetCellValue("ITEM_CODE", GridObj.GetRowCount() - 1, "IT20061207005");
	GridObj.SetCellImage ("ITEM_CODE", GridObj.GetRowCount() - 1, 0);
	GridObj.SetCellValue("ITEM_NAME", GridObj.GetRowCount() - 1, "Pentium 4 661 시더밀");
	GridObj.SetCellHiddenValue("ITEM_NAME", GridObj.GetRowCount() - 1, "IT20061207005");
	GridObj.SetCellValue("SPECIFICATION", GridObj.GetRowCount() - 1, "3.6GHz/2MB/64BIT");
	GridObj.SetComboSelectedHiddenValue("UNIT", GridObj.GetRowCount() - 1, "EA");
	GridObj.SetCellValue("PRICE", GridObj.GetRowCount() - 1, "434900");
	GridObj.SetCellValue("STOCK", GridObj.GetRowCount() - 1, "651");
	GridObj.SetCellValue("ADD_DATE", GridObj.GetRowCount() - 1, "20061207");
	GridObj.SetCellValue("CHANGE_DATE", GridObj.GetRowCount() - 1, "20061208");
	
	// 6
	GridObj.AddRow();
	GridObj.SetComboSelectedHiddenValue("ITEM_FLAG", GridObj.GetRowCount() - 1, "CPU");
	GridObj.SetCellValue("VENDOR_NAME", GridObj.GetRowCount() - 1, "Intel");
	GridObj.SetCellValue("ITEM_CODE", GridObj.GetRowCount() - 1, "IT20061207006");
	GridObj.SetCellImage ("ITEM_CODE", GridObj.GetRowCount() - 1, 0);
	GridObj.SetCellValue("ITEM_NAME", GridObj.GetRowCount() - 1, "Pentium 4 630");
	GridObj.SetCellHiddenValue("ITEM_NAME", GridObj.GetRowCount() - 1, "IT20061207006");
	GridObj.SetCellValue("SPECIFICATION", GridObj.GetRowCount() - 1, "3.0GHz/2MB/64BIT");
	GridObj.SetComboSelectedHiddenValue("UNIT", GridObj.GetRowCount() - 1, "EA");
	GridObj.SetCellValue("PRICE", GridObj.GetRowCount() - 1, "147000");
	GridObj.SetCellValue("STOCK", GridObj.GetRowCount() - 1, "642");
	GridObj.SetCellValue("ADD_DATE", GridObj.GetRowCount() - 1, "20061207");
	GridObj.SetCellValue("CHANGE_DATE", GridObj.GetRowCount() - 1, "20061208");
	
	// 7
	GridObj.AddRow();
	GridObj.SetComboSelectedHiddenValue("ITEM_FLAG", GridObj.GetRowCount() - 1, "CPU");
	GridObj.SetCellValue("VENDOR_NAME", GridObj.GetRowCount() - 1, "Intel");
	GridObj.SetCellValue("ITEM_CODE", GridObj.GetRowCount() - 1, "IT20061207007");
	GridObj.SetCellImage ("ITEM_CODE", GridObj.GetRowCount() - 1, 0);
	GridObj.SetCellValue("ITEM_NAME", GridObj.GetRowCount() - 1, "Celeron D 356 시더밀");
	GridObj.SetCellHiddenValue("ITEM_NAME", GridObj.GetRowCount() - 1, "IT20061207007");
	GridObj.SetCellValue("SPECIFICATION", GridObj.GetRowCount() - 1, "3.33GHz/512KB/64BIT/LGA775");
	GridObj.SetComboSelectedHiddenValue("UNIT", GridObj.GetRowCount() - 1, "EA");
	GridObj.SetCellValue("PRICE", GridObj.GetRowCount() - 1, "70000");
	GridObj.SetCellValue("STOCK", GridObj.GetRowCount() - 1, "1231");
	GridObj.SetCellValue("ADD_DATE", GridObj.GetRowCount() - 1, "20061207");
	GridObj.SetCellValue("CHANGE_DATE", GridObj.GetRowCount() - 1, "20061208");
	
	// 8
	GridObj.AddRow();
	GridObj.SetComboSelectedHiddenValue("ITEM_FLAG", GridObj.GetRowCount() - 1, "CPU");
	GridObj.SetCellValue("VENDOR_NAME", GridObj.GetRowCount() - 1, "Intel");
	GridObj.SetCellValue("ITEM_CODE", GridObj.GetRowCount() - 1, "IT20061207008");
	GridObj.SetCellImage ("ITEM_CODE", GridObj.GetRowCount() - 1, 0);
	GridObj.SetCellValue("ITEM_NAME", GridObj.GetRowCount() - 1, "Celeron D 346");
	GridObj.SetCellHiddenValue("ITEM_NAME", GridObj.GetRowCount() - 1, "IT20061207008");
	GridObj.SetCellValue("SPECIFICATION", GridObj.GetRowCount() - 1, "3.06GHz/64BIT/LGA775");
	GridObj.SetComboSelectedHiddenValue("UNIT", GridObj.GetRowCount() - 1, "EA");
	GridObj.SetCellValue("PRICE", GridObj.GetRowCount() - 1, "58200");
	GridObj.SetCellValue("STOCK", GridObj.GetRowCount() - 1, "4216");
	GridObj.SetCellValue("ADD_DATE", GridObj.GetRowCount() - 1, "20061207");
	GridObj.SetCellValue("CHANGE_DATE", GridObj.GetRowCount() - 1, "20061208");
	
	// 9
	GridObj.AddRow();
	GridObj.SetComboSelectedHiddenValue("ITEM_FLAG", GridObj.GetRowCount() - 1, "CPU");
	GridObj.SetCellValue("VENDOR_NAME", GridObj.GetRowCount() - 1, "Athlon");
	GridObj.SetCellValue("ITEM_CODE", GridObj.GetRowCount() - 1, "IT20061207009");
	GridObj.SetCellImage ("ITEM_CODE", GridObj.GetRowCount() - 1, 0);
	GridObj.SetCellValue("ITEM_NAME", GridObj.GetRowCount() - 1, "Athlon 64 X2 5200+");
	GridObj.SetCellHiddenValue("ITEM_NAME", GridObj.GetRowCount() - 1, "IT20061207009");
	GridObj.SetCellValue("SPECIFICATION", GridObj.GetRowCount() - 1, "2.6GHz/1MB+1MB/Socket AM2");
	GridObj.SetComboSelectedHiddenValue("UNIT", GridObj.GetRowCount() - 1, "EA");
	GridObj.SetCellValue("PRICE", GridObj.GetRowCount() - 1, "359600");
	GridObj.SetCellValue("STOCK", GridObj.GetRowCount() - 1, "872");
	GridObj.SetCellValue("ADD_DATE", GridObj.GetRowCount() - 1, "20061207");
	GridObj.SetCellValue("CHANGE_DATE", GridObj.GetRowCount() - 1, "20061208");
	
	// 10
	GridObj.AddRow();
	GridObj.SetComboSelectedHiddenValue("ITEM_FLAG", GridObj.GetRowCount() - 1, "CPU");
	GridObj.SetCellValue("VENDOR_NAME", GridObj.GetRowCount() - 1, "Athlon");
	GridObj.SetCellValue("ITEM_CODE", GridObj.GetRowCount() - 1, "IT20061207010");
	GridObj.SetCellImage ("ITEM_CODE", GridObj.GetRowCount() - 1, 0);
	GridObj.SetCellValue("ITEM_NAME", GridObj.GetRowCount() - 1, "Athlon 64 3800+");
	GridObj.SetCellHiddenValue("ITEM_NAME", GridObj.GetRowCount() - 1, "IT20061207010");
	GridObj.SetCellValue("SPECIFICATION", GridObj.GetRowCount() - 1, "2.4GHz/512KB/Socket AM2");
	GridObj.SetComboSelectedHiddenValue("UNIT", GridObj.GetRowCount() - 1, "EA");
	GridObj.SetCellValue("PRICE", GridObj.GetRowCount() - 1, "107100");
	GridObj.SetCellValue("STOCK", GridObj.GetRowCount() - 1, "852");
	GridObj.SetCellValue("ADD_DATE", GridObj.GetRowCount() - 1, "20061207");
	GridObj.SetCellValue("CHANGE_DATE", GridObj.GetRowCount() - 1, "20061208");
	
	// 11
	GridObj.AddRow();
	GridObj.SetComboSelectedHiddenValue("ITEM_FLAG", GridObj.GetRowCount() - 1, "CPU");
	GridObj.SetCellValue("VENDOR_NAME", GridObj.GetRowCount() - 1, "Athlon");
	GridObj.SetCellValue("ITEM_CODE", GridObj.GetRowCount() - 1, "IT20061207011");
	GridObj.SetCellImage ("ITEM_CODE", GridObj.GetRowCount() - 1, 0);
	GridObj.SetCellValue("ITEM_NAME", GridObj.GetRowCount() - 1, "Sempron 3600+");
	GridObj.SetCellHiddenValue("ITEM_NAME", GridObj.GetRowCount() - 1, "IT20061207011");
	GridObj.SetCellValue("SPECIFICATION", GridObj.GetRowCount() - 1, "2.0GHz/256KB/Socket AM2");
	GridObj.SetComboSelectedHiddenValue("UNIT", GridObj.GetRowCount() - 1, "EA");
	GridObj.SetCellValue("PRICE", GridObj.GetRowCount() - 1, "109200");
	GridObj.SetCellValue("STOCK", GridObj.GetRowCount() - 1, "541");
	GridObj.SetCellValue("ADD_DATE", GridObj.GetRowCount() - 1, "20061207");
	GridObj.SetCellValue("CHANGE_DATE", GridObj.GetRowCount() - 1, "20061208");
	
	// 12
	GridObj.AddRow();
	GridObj.SetComboSelectedHiddenValue("ITEM_FLAG", GridObj.GetRowCount() - 1, "MEM");
	GridObj.SetCellValue("VENDOR_NAME", GridObj.GetRowCount() - 1, "Samsung");
	GridObj.SetCellValue("ITEM_CODE", GridObj.GetRowCount() - 1, "IT20061207012");
	GridObj.SetCellImage ("ITEM_CODE", GridObj.GetRowCount() - 1, 0);
	GridObj.SetCellValue("ITEM_NAME", GridObj.GetRowCount() - 1, "2GB DDR2 PC2-5300 (667MHz)");
	GridObj.SetCellHiddenValue("ITEM_NAME", GridObj.GetRowCount() - 1, "IT20061207012");
	GridObj.SetCellValue("SPECIFICATION", GridObj.GetRowCount() - 1, "2GB DDR2 PC2-5300 (667MHz)");
	GridObj.SetComboSelectedHiddenValue("UNIT", GridObj.GetRowCount() - 1, "EA");
	GridObj.SetCellValue("PRICE", GridObj.GetRowCount() - 1, "258000");
	GridObj.SetCellValue("STOCK", GridObj.GetRowCount() - 1, "0");
	GridObj.SetCellValue("ADD_DATE", GridObj.GetRowCount() - 1, "20061207");
	GridObj.SetCellValue("CHANGE_DATE", GridObj.GetRowCount() - 1, "20061208");
	
	// 13
	GridObj.AddRow();
	GridObj.SetComboSelectedHiddenValue("ITEM_FLAG", GridObj.GetRowCount() - 1, "MEM");
	GridObj.SetCellValue("VENDOR_NAME", GridObj.GetRowCount() - 1, "Samsung");
	GridObj.SetCellValue("ITEM_CODE", GridObj.GetRowCount() - 1, "IT20061207013");
	GridObj.SetCellImage ("ITEM_CODE", GridObj.GetRowCount() - 1, 0);
	GridObj.SetCellValue("ITEM_NAME", GridObj.GetRowCount() - 1, "2GB DDR2 PC2-4200 (533MHz)");
	GridObj.SetCellHiddenValue("ITEM_NAME", GridObj.GetRowCount() - 1, "IT20061207013");
	GridObj.SetCellValue("SPECIFICATION", GridObj.GetRowCount() - 1, "2GB DDR2 PC2-4200 (533MHz)");
	GridObj.SetComboSelectedHiddenValue("UNIT", GridObj.GetRowCount() - 1, "EA");
	GridObj.SetCellValue("PRICE", GridObj.GetRowCount() - 1, "206300");
	GridObj.SetCellValue("STOCK", GridObj.GetRowCount() - 1, "7263");
	GridObj.SetCellValue("ADD_DATE", GridObj.GetRowCount() - 1, "20061207");
	GridObj.SetCellValue("CHANGE_DATE", GridObj.GetRowCount() - 1, "20061208");
	
	// 14
	GridObj.AddRow();
	GridObj.SetComboSelectedHiddenValue("ITEM_FLAG", GridObj.GetRowCount() - 1, "MEM");
	GridObj.SetCellValue("VENDOR_NAME", GridObj.GetRowCount() - 1, "디지웍스");
	GridObj.SetCellValue("ITEM_CODE", GridObj.GetRowCount() - 1, "IT20061207014");
	GridObj.SetCellImage ("ITEM_CODE", GridObj.GetRowCount() - 1, 0);
	GridObj.SetCellValue("ITEM_NAME", GridObj.GetRowCount() - 1, "2GB (1GBx2개) 듀얼채널 킷 DDR2 PC2-6400 (800Mhz) 골드");
	GridObj.SetCellHiddenValue("ITEM_NAME", GridObj.GetRowCount() - 1, "IT20061207014");
	GridObj.SetCellValue("SPECIFICATION", GridObj.GetRowCount() - 1, "2GB (1GBx2개) 듀얼채널 킷 DDR2 PC2-6400 (800Mhz) 골드");
	GridObj.SetComboSelectedHiddenValue("UNIT", GridObj.GetRowCount() - 1, "EA");
	GridObj.SetCellValue("PRICE", GridObj.GetRowCount() - 1, "245700");
	GridObj.SetCellValue("STOCK", GridObj.GetRowCount() - 1, "5243");
	GridObj.SetCellValue("ADD_DATE", GridObj.GetRowCount() - 1, "20061207");
	GridObj.SetCellValue("CHANGE_DATE", GridObj.GetRowCount() - 1, "20061208");
	
	// 15
	GridObj.AddRow();
	GridObj.SetComboSelectedHiddenValue("ITEM_FLAG", GridObj.GetRowCount() - 1, "MEM");
	GridObj.SetCellValue("VENDOR_NAME", GridObj.GetRowCount() - 1, "디지웍스");
	GridObj.SetCellValue("ITEM_CODE", GridObj.GetRowCount() - 1, "IT20061207015");
	GridObj.SetCellImage ("ITEM_CODE", GridObj.GetRowCount() - 1, 0);
	GridObj.SetCellValue("ITEM_NAME", GridObj.GetRowCount() - 1, "1GB (512MBx2개) 듀얼채널 킷 DDR2 PC2-6400 (800Mhz)");
	GridObj.SetCellHiddenValue("ITEM_NAME", GridObj.GetRowCount() - 1, "IT20061207015");
	GridObj.SetCellValue("SPECIFICATION", GridObj.GetRowCount() - 1, "1GB (512MBx2개) 듀얼채널 킷 DDR2 PC2-6400 (800Mhz)");
	GridObj.SetComboSelectedHiddenValue("UNIT", GridObj.GetRowCount() - 1, "EA");
	GridObj.SetCellValue("PRICE", GridObj.GetRowCount() - 1, "123900");
	GridObj.SetCellValue("STOCK", GridObj.GetRowCount() - 1, "3574");
	GridObj.SetCellValue("ADD_DATE", GridObj.GetRowCount() - 1, "20061207");
	GridObj.SetCellValue("CHANGE_DATE", GridObj.GetRowCount() - 1, "20061208");
	
	// 16
	GridObj.AddRow();
	GridObj.SetComboSelectedHiddenValue("ITEM_FLAG", GridObj.GetRowCount() - 1, "MAB");
	GridObj.SetCellValue("VENDOR_NAME", GridObj.GetRowCount() - 1, "ASUS");
	GridObj.SetCellValue("ITEM_CODE", GridObj.GetRowCount() - 1, "IT20061207016");
	GridObj.SetCellImage ("ITEM_CODE", GridObj.GetRowCount() - 1, 0);
	GridObj.SetCellValue("ITEM_NAME", GridObj.GetRowCount() - 1, "P5N32-SLI PREMIUM WiFi-AP Edition");
	GridObj.SetCellHiddenValue("ITEM_NAME", GridObj.GetRowCount() - 1, "IT20061207016");
	GridObj.SetCellValue("SPECIFICATION", GridObj.GetRowCount() - 1, "590 SLi/LGA775/코어2듀오 콘로 지원");
	GridObj.SetComboSelectedHiddenValue("UNIT", GridObj.GetRowCount() - 1, "EA");
	GridObj.SetCellValue("PRICE", GridObj.GetRowCount() - 1, "280800");
	GridObj.SetCellValue("STOCK", GridObj.GetRowCount() - 1, "2457");
	GridObj.SetCellValue("ADD_DATE", GridObj.GetRowCount() - 1, "20061207");
	GridObj.SetCellValue("CHANGE_DATE", GridObj.GetRowCount() - 1, "20061208");

	// 17
	GridObj.AddRow();
	GridObj.SetComboSelectedHiddenValue("ITEM_FLAG", GridObj.GetRowCount() - 1, "MAB");
	GridObj.SetCellValue("VENDOR_NAME", GridObj.GetRowCount() - 1, "ASUS");
	GridObj.SetCellValue("ITEM_CODE", GridObj.GetRowCount() - 1, "IT20061207017");
	GridObj.SetCellImage ("ITEM_CODE", GridObj.GetRowCount() - 1, 0);
	GridObj.SetCellValue("ITEM_NAME", GridObj.GetRowCount() - 1, "P5B-E");
	GridObj.SetCellHiddenValue("ITEM_NAME", GridObj.GetRowCount() - 1, "IT20061207017");
	GridObj.SetCellValue("SPECIFICATION", GridObj.GetRowCount() - 1, "P965/LGA775/코어2듀오 콘로 지원");
	GridObj.SetComboSelectedHiddenValue("UNIT", GridObj.GetRowCount() - 1, "EA");
	GridObj.SetCellValue("PRICE", GridObj.GetRowCount() - 1, "148700");
	GridObj.SetCellValue("STOCK", GridObj.GetRowCount() - 1, "4357");
	GridObj.SetCellValue("ADD_DATE", GridObj.GetRowCount() - 1, "20061207");
	GridObj.SetCellValue("CHANGE_DATE", GridObj.GetRowCount() - 1, "20061208");
	
	// 18
	GridObj.AddRow();
	GridObj.SetComboSelectedHiddenValue("ITEM_FLAG", GridObj.GetRowCount() - 1, "MAB");
	GridObj.SetCellValue("VENDOR_NAME", GridObj.GetRowCount() - 1, "GIGABYTE");
	GridObj.SetCellValue("ITEM_CODE", GridObj.GetRowCount() - 1, "IT20061207018");
	GridObj.SetCellImage ("ITEM_CODE", GridObj.GetRowCount() - 1, 0);
	GridObj.SetCellValue("ITEM_NAME", GridObj.GetRowCount() - 1, "GA-965P-DS3");
	GridObj.SetCellHiddenValue("ITEM_NAME", GridObj.GetRowCount() - 1, "IT20061207018");
	GridObj.SetCellValue("SPECIFICATION", GridObj.GetRowCount() - 1, "P965/LGA775/코어2듀오 콘로 지원");
	GridObj.SetComboSelectedHiddenValue("UNIT", GridObj.GetRowCount() - 1, "EA");
	GridObj.SetCellValue("PRICE", GridObj.GetRowCount() - 1, "145600");
	GridObj.SetCellValue("STOCK", GridObj.GetRowCount() - 1, "1278");
	GridObj.SetCellValue("ADD_DATE", GridObj.GetRowCount() - 1, "20061207");
	GridObj.SetCellValue("CHANGE_DATE", GridObj.GetRowCount() - 1, "20061208");
	
	// 19
	GridObj.AddRow();
	GridObj.SetComboSelectedHiddenValue("ITEM_FLAG", GridObj.GetRowCount() - 1, "MAB");
	GridObj.SetCellValue("VENDOR_NAME", GridObj.GetRowCount() - 1, "Intel");
	GridObj.SetCellValue("ITEM_CODE", GridObj.GetRowCount() - 1, "IT20061207019");
	GridObj.SetCellImage ("ITEM_CODE", GridObj.GetRowCount() - 1, 0);
	GridObj.SetCellValue("ITEM_NAME", GridObj.GetRowCount() - 1, "S975XBX2");
	GridObj.SetCellHiddenValue("ITEM_NAME", GridObj.GetRowCount() - 1, "IT20061207019");
	GridObj.SetCellValue("SPECIFICATION", GridObj.GetRowCount() - 1, "i975X/LGA775/코어2듀오 콘로 지원");
	GridObj.SetComboSelectedHiddenValue("UNIT", GridObj.GetRowCount() - 1, "EA");
	GridObj.SetCellValue("PRICE", GridObj.GetRowCount() - 1, "275600");
	GridObj.SetCellValue("STOCK", GridObj.GetRowCount() - 1, "6547");
	GridObj.SetCellValue("ADD_DATE", GridObj.GetRowCount() - 1, "20061207");
	GridObj.SetCellValue("CHANGE_DATE", GridObj.GetRowCount() - 1, "20061208");
	
	// 20
	GridObj.AddRow();
	GridObj.SetComboSelectedHiddenValue("ITEM_FLAG", GridObj.GetRowCount() - 1, "MAB");
	GridObj.SetCellValue("VENDOR_NAME", GridObj.GetRowCount() - 1, "Intel");
	GridObj.SetCellValue("ITEM_CODE", GridObj.GetRowCount() - 1, "IT20061207020");
	GridObj.SetCellImage ("ITEM_CODE", GridObj.GetRowCount() - 1, 0);
	GridObj.SetCellValue("ITEM_NAME", GridObj.GetRowCount() - 1, "DP965LT");
	GridObj.SetCellHiddenValue("ITEM_NAME", GridObj.GetRowCount() - 1, "IT20061207020");
	GridObj.SetCellValue("SPECIFICATION", GridObj.GetRowCount() - 1, "P965/LGA775/코어2듀오 콘로 지원");
	GridObj.SetComboSelectedHiddenValue("UNIT", GridObj.GetRowCount() - 1, "EA");
	GridObj.SetCellValue("PRICE", GridObj.GetRowCount() - 1, "125800");
	GridObj.SetCellValue("STOCK", GridObj.GetRowCount() - 1, "3247");
	GridObj.SetCellValue("ADD_DATE", GridObj.GetRowCount() - 1, "20061207");
	GridObj.SetCellValue("CHANGE_DATE", GridObj.GetRowCount() - 1, "20061208");
	
	
	GridObj.MoveRow(0);
	
}


function tagCopy(s)
{
     var copiedtext="";
     var tempstore="";
     tempstore=copiedtext;
     var doc = document.body.createTextRange();
     doc.moveToElementText(document.all(s));

     doc.execCommand('copy');
     copiedtext=window.clipboardData.getData("Text");
     
     doc.select();
     
     alert('선택하신 내용이 클립보드에 복사되었습니다.');
}


