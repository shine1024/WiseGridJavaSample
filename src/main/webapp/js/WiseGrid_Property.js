function setProperty(GridObj)
{
	GridObj.strHDFontName = "돋움";
	GridObj.strCellFontName = "돋움";
	// Cell Font Setting
	GridObj.nCellFontSize = 10;

	// Header Font Setting
	GridObj.nHDFontSize = 10;
	GridObj.bHDFontBold = true;

	GridObj.bMultiRowMenuVisible = true;

	// Header Color
	GridObj.strHDBgColor="95|177|206";
	GridObj.strHDFgColor="255|255|255";

	// Cell Color
	GridObj.strGridBgColor="255|255|255";
	GridObj.strCellBgColor="255|255|255";
	GridObj.strCellFgColor="51|51|51";

	// Border Style
	GridObj.strGridBorderColor = "204|204|204";
	GridObj.strGridBorderStyle = "solidline";
	GridObj.strHDBorderStyle = "solidline";
	GridObj.strCellBorderStyle = "solidline";

	// ETC Color
	GridObj.strActiveRowBgColor="214|228|236";
	GridObj.strSelectedCellBgColor = "241|231|221";
	GridObj.strSelectedCellFgColor = "51|51|51";
	GridObj.strStatusbarBgColor = "243|243|243";
	GridObj.strStatusbarFgColor = "101|101|101";
	GridObj.strProgressbarColor = "0|126|174"; 

	// ETC
	GridObj.bRowSelectorVisible = true;
	GridObj.bHDSwapping = true;
	GridObj.nAlphaLevel = 0;
	GridObj.nRowHeight = 14;
	GridObj.SetHelpInfo();
	GridObj.bAbortQueryVisible = true;
	GridObj.strRowScrollDragAction='syncscreen';
}

function btn(a,b){
	document.write ("<table cellpadding=0 cellspacing=0 border=0 height=23 onClick="+a+" style=cursor:hand><tr><td width=15 class=btn_left>");
	document.write ("<img src=../images/blank.gif width=15 height=1></td>");
	document.write ("<td class=btn_txt valign=middle>"+b+"</td><td width=4 class=btn_right><img src=../images/blank.gif width=4></td></tr></table>");
}