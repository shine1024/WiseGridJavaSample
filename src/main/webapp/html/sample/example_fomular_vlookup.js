var config ={
	calcMode:false,
	toggleOpen:false
};

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
	/**
	 * Property Setting
	 */
	_GridObj.strHDAlign  = 'center';
	_GridObj.nRowHeight  = 25;
	_GridObj.nHDLines = 2;
	_GridObj.nHDLineSize = 17;
	_GridObj.bRowSelectorVisible = true;
	_GridObj.bHDSwapping = false;
	_GridObj.nAlphaLevel = 0;
	_GridObj.bAbortQueryVisible = true;
	_GridObj.bNullValueNumberFormat  = false;
	setConditionProperty(_GridObj);
	
	/**
	 * Header Setting
	 */
	_GridObj.AddHeader('order','order','t_text',-1,100,false);
	_GridObj.AddHeader('orderCar','orderCar','t_text',-1,100,false);
	_GridObj.AddHeader('color','color','t_text',-1,100,false);
	_GridObj.AddHeader('horsePower','horsePower','t_text',-1,100,false);
	_GridObj.AddHeader('carId','carId','t_text',-1,0,false);
	_GridObj.AddHeader('carNameRef','carNameRef','t_text',-1,0,false);
	_GridObj.AddHeader('carName','carName','t_text',-1,100,false);
	_GridObj.BoundHeader();
}

function doQuery(_GridObj){
	_GridObj.AddRow();
	var lastIndex = _GridObj.GetRowCount()-1;
	_GridObj.SetCellValue('order',lastIndex,'John');
	_GridObj.SetCellValue('orderCar',lastIndex,'2');
	_GridObj.SetCellValue('color',lastIndex,'Blue');
	_GridObj.SetCellValue('horsePower',lastIndex,'100');
	_GridObj.SetCellValue('carId',lastIndex,'1');
	_GridObj.SetCellValue('carNameRef',lastIndex,'Toytoa Camry');
	_GridObj.SetCellHiddenValue('carName',lastIndex,'=vlookup(B1;E1:F4;2;false)');
	
	_GridObj.AddRow();
	lastIndex = _GridObj.GetRowCount()-1;
	_GridObj.SetCellValue('order',lastIndex,'Mary');
	_GridObj.SetCellValue('orderCar',lastIndex,'1');
	_GridObj.SetCellValue('color',lastIndex,'Black');
	_GridObj.SetCellValue('horsePower',lastIndex,'200');
	_GridObj.SetCellValue('carId',lastIndex,'2');
	_GridObj.SetCellValue('carNameRef',lastIndex,'Honda Accord');
	_GridObj.SetCellHiddenValue('carName',lastIndex,'=vlookup(B2;E1:F4;2;false)');
	
	_GridObj.AddRow();
	lastIndex = _GridObj.GetRowCount()-1;
	_GridObj.SetCellValue('order',lastIndex,'Kate');
	_GridObj.SetCellValue('orderCar',lastIndex,'3');
	_GridObj.SetCellValue('color',lastIndex,'Green');
	_GridObj.SetCellValue('horsePower',lastIndex,'300');
	_GridObj.SetCellValue('carId',lastIndex,'3');
	_GridObj.SetCellValue('carNameRef',lastIndex,'Nissan Altima');
	_GridObj.SetCellHiddenValue('carName',lastIndex,'=vlookup(B3;E1:F4;2;false)');
	
	_GridObj.AddRow();
	lastIndex = _GridObj.GetRowCount()-1;
	_GridObj.SetCellValue('order',lastIndex,'Dan');
	_GridObj.SetCellValue('orderCar',lastIndex,'4');
	_GridObj.SetCellValue('color',lastIndex,'Red');
	_GridObj.SetCellValue('horsePower',lastIndex,'250');
	_GridObj.SetCellValue('carId',lastIndex,'4');
	_GridObj.SetCellValue('carNameRef',lastIndex,'BMW Z3');
	_GridObj.SetCellHiddenValue('carName',lastIndex,'=vlookup(B4;E1:F4;2;false)');
	
	_GridObj.AddRow();
	lastIndex = _GridObj.GetRowCount()-1;
	_GridObj.SetCellValue('order',lastIndex,'Fred');
	_GridObj.SetCellValue('orderCar',lastIndex,'2');
	_GridObj.SetCellValue('color',lastIndex,'Orange');
	_GridObj.SetCellValue('horsePower',lastIndex,'182');
	_GridObj.SetCellValue('carId',lastIndex,'');
	_GridObj.SetCellValue('carNameRef',lastIndex,'');
	_GridObj.SetCellHiddenValue('carName',lastIndex,'=vlookup(B5;E1:F4;2;false)');

	_GridObj.SetFormulaMode();	
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
