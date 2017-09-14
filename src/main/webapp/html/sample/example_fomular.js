var config ={
	calcMode:false,
	toggleOpen:false
}

function setConditionProperty(_GridObj){
	_GridObj.bHDMoving = false;
	_GridObj.bHDSwapping = false;
	_GridObj.strRowBorderStyle = "none";
	_GridObj.nRowSpacing = 0;
	_GridObj.strHDClickAction = "select";

	_GridObj.bFormulaModeHDVisible = false;
	_GridObj.strFormulaModeHDFgColor = '230|230|230';
	_GridObj.strFormulaModeHDBgColor = '150|150|100';
	_GridObj.bFormulaModeAutoRecalc = true;
}
function setDefaultProperty(_GridObj){
	_GridObj.strHDFontName = "돋움";
	_GridObj.strCellFontName = "굴림";
	// Cell Font Setting
	_GridObj.nCellFontSize = 8;

	// Header Font Setting
	_GridObj.nHDFontSize = 10;
	_GridObj.bHDFontBold = true;

	_GridObj.bMultiRowMenuVisible = true;

	// Header Color
	_GridObj.strHDBgColor="115|150|215";
	_GridObj.strHDFgColor="255|255|255";

	// Cell Color
	_GridObj.strGridBgColor="255|255|255";
	_GridObj.strCellBgColor="255|255|255";
	_GridObj.strCellFgColor="51|51|51";

	// Border Style
	_GridObj.strGridBorderColor = "189|209|223";
	_GridObj.strGridBorderStyle = "solidline";
	_GridObj.strHDBorderStyle = "solidline";
	_GridObj.strCellBorderStyle = "solidline";

	// ETC Color
	_GridObj.strCellFgColor ="111|111|111";
	_GridObj.strSelectedCellBgColor = "241|231|221";
	_GridObj.strSelectedCellFgColor = "51|51|51";
	_GridObj.strStatusbarBgColor = "243|243|243";
	_GridObj.strStatusbarFgColor = "101|101|101";
	_GridObj.strProgressbarColor = "0|126|174";
	_GridObj.strSelectedCellFgColor	= '244|87|12';
	_GridObj.strActiveRowBgColor  = '231|237|249';
	_GridObj.strRowSelectorBgColor = '207|222|243';

	// ETC
	_GridObj.strHDAlign  = 'center';
	_GridObj.nRowHeight  = 25;
	_GridObj.nHDLines = 2;
	_GridObj.nHDLineSize = 17;
	_GridObj.bRowSelectorVisible = true;
	_GridObj.bHDSwapping = false;
	_GridObj.nAlphaLevel = 0;
	_GridObj.bAbortQueryVisible = true;
	_GridObj.bNullValueNumberFormat  = false;
}

function setHeader(_GridObj){
	_GridObj.AddHeader('SELECTED',		"구분",					"t_checkbox",	1,		20,   	true);
	_GridObj.AddHeader('PRODUCT_CODE',	"상품\n코드",				"t_text",		50,		60,   	false);
	_GridObj.AddHeader('PRODUCT_NAME',	"상품명",				"t_text",		100,	100,   	false);
	_GridObj.AddHeader('REG_DATE',		"입고\n일자",				"t_date",		70,		60,   	false);
	_GridObj.AddHeader('STOCK_TYPE',	"입고\n구분"	,				"t_text",		0,		40,   	true);
	_GridObj.AddHeader('STOCK_QTY',		"입고\n수량",				"t_number",		60,	60,   	true);
	_GridObj.AddHeader('STOCK_PRICE',	"입고\n가격",				"t_number",		70,	60,   	false);
	_GridObj.AddHeader('TOT_STOCK_PRICE',"총입고가",				"t_number",		90,	70,   	false);

	_GridObj.AddHeader('SALE_QTY',		"판매\n수량",				"t_number",		70,	60,   	false);
	_GridObj.AddHeader('SALE_PRICE',	"판매\n가격",				"t_number",		80,	80,   	false);
	_GridObj.AddHeader('DC_PRICE',		"할인가\n(25% DC)",		"t_number",		80,		80,   	false);
	_GridObj.AddHeader('TOT_SALE_PRICE',"총판매가",				"t_number",		80,	80,   	false);

	_GridObj.AddHeader('SELLER',		"판매\n담당자",			"t_text",		60,	60,   	false);

	_GridObj.AddHeader('PRODUCT_TYPE',	"품목\n분류",				"t_text",		10,		60,   	false);
	_GridObj.AddHeader('SALE_AVG_FLAG',	"판매평균\n미달여부",		"t_imagetext",		90,	90,   	false);
	_GridObj.BoundHeader();
	_GridObj.AddImageList('SALE_AVG_FLAG', '/images/arrowUp.gif');
	_GridObj.AddImageList('SALE_AVG_FLAG', '/images/arrowDown.gif');
	_GridObj.SetNumberFormat('STOCK_QTY','#,##0EA');
	_GridObj.SetNumberFormat('SALE_QTY','#,##0EA');
	_GridObj.SetNumberFormat('STOCK_PRICE','#,##0원');
	_GridObj.SetNumberFormat('SALE_PRICE','#,##0원');
	_GridObj.SetNumberFormat('DC_PRICE','#,##0원');
	_GridObj.SetNumberFormat('TOT_STOCK_PRICE','#,##0원');
	_GridObj.SetNumberFormat('TOT_SALE_PRICE','#,##0원');
	_GridObj.SetColCellAlign('STOCK_TYPE','center');
	_GridObj.SetColCellAlign('SELLER','center');
	_GridObj.SetColCellAlign('PRODUCT_TYPE','center');
	_GridObj.SetColCellAlign('SALE_AVG_FLAG','center');
	_GridObj.SetFormulaMode();
}

function doQuery(_GridObj){
	var servletUrl ="/servlet/wisegrid.sample.ExampleFomular"
	_GridObj.DoQuery(servletUrl);
}

function endQuery(_GridObj){
	var startRowCount = 1;
	var totalRowCount = _GridObj.GetRowCount();


	_GridObj.AddRow();
	currentRowIdx = _GridObj.GetRowCount() -1;
	currentRow = _GridObj.GetRowCount();
	_GridObj.SetCellValue('PRODUCT_CODE',currentRowIdx,'총 입고수량 / 총입고금액 : ');
	_GridObj.AddAreaMerge('TOT_SOTCK_TXT','PRODUCT_CODE',currentRowIdx,'STOCK_TYPE',currentRowIdx);
	_GridObj.SetAreaMergeHAlign ('TOT_SOTCK_TXT','right');
	_GridObj.SetCellHiddenValue ("STOCK_QTY", currentRowIdx, '=sum(F1:F'+currentRow+')');
	_GridObj.SetCellHiddenValue ("STOCK_PRICE", currentRowIdx, '=sum(G1:G'+currentRow+')');


	_GridObj.AddRow();
	currentRowIdx = _GridObj.GetRowCount() -1;
	currentRow = _GridObj.GetRowCount();
	_GridObj.SetCellValue('PRODUCT_CODE',currentRowIdx,'평균 판매금액 이하 건수');
	_GridObj.AddAreaMerge('RESULT_TXT','PRODUCT_CODE',currentRowIdx,'STOCK_TYPE',currentRowIdx);
	_GridObj.SetCellHiddenValue ("STOCK_QTY", currentRowIdx, '=COUNTIF(O1:O'+currentRow+';"평균이하")');
	_GridObj.SetAreaMergeHAlign ('RESULT_TXT','right');

	_GridObj.SetFormulaCellFgColor('12|54|112');
	_GridObj.SetFormulaCellBgColor('240|246|255');
	_GridObj.SetFormulaCellFont('돋움',10,false,false,true,false);
	_GridObj.SetColCellFgColor('SALE_AVG_FLAG','255|10|10');

	for(var i=0; i<totalRowCount; i++){
		if (_GridObj.GetCellValue('SALE_AVG_FLAG', i) == '평균이상') {
			_GridObj.SetCellImage('SALE_AVG_FLAG', i, 0);
		}else{
			_GridObj.SetCellImage('SALE_AVG_FLAG', i, 1);
		}
		if(_GridObj.GetCellValue('SALE_AVG_FLAG',i) == '평균이하'){
			_GridObj.SetCellFgColor('SALE_AVG_FLAG',i,'255|10|10');
		}
	}
	_GridObj.SetCellFgColor('STOCK_QTY',currentRowIdx,'255|10|10');
	_GridObj.CalculateFormulas();

}

function toggleCalcMode(_GridObj){
	if(config.calcMode){
		config.calcMode = false;
		_GridObj.bFormulaModeHDVisible = false;
	}else{
		config.calcMode = true;
		_GridObj.bFormulaModeHDVisible = true;
	}
}

function activeCellHiddenValue(_GridObj, _colKey, _row){
	var colKey = _colKey;
	var row = _row;
	var cellHiddenValue = _GridObj.GetCellHiddenValue(colKey,row);

	if(cellHiddenValue.indexOf('=') > -1){
		document.getElementById('out').style.display = 'block';
		document.getElementById('outTxt').innerHTML='<span style="color:#DB5C2A">'+cellHiddenValue+'</span>';
	}else{
		document.getElementById('out').style.display = 'none';
		document.getElementById('outTxt').innerHTML='';
	}

}
function textClose(){
	document.getElementById('out').style.display = 'none';
}
function toggleSupportList(){
	if(config.toggleOpen){
		config.toggleOpen= false;
		document.getElementById('supportList').style.display = 'none';
	}else{
		config.toggleOpen= true;
		document.getElementById('supportList').style.display = 'block';
	}
}
