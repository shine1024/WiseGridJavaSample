/**
 * Created by BONG on 2015-4월-14일 /014.
 */


function setProperty(GridObj) {
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
    GridObj.strSelectedCellBgColor = "241|231|221";
    GridObj.strSelectedCellFgColor = "51|51|51";
    GridObj.strStatusbarBgColor = "243|243|243";
    GridObj.strStatusbarFgColor = "101|101|101";
    GridObj.strProgressbarColor = "0|126|174";

    // ETC
    GridObj.SetColCellBgColor('ITEM_FLAG','255|216|216');
    GridObj.SetColCellBgColor('VENDOR_NAME','255|216|216');
    GridObj.SetColCellBgColor('ITEM_CODE','255|216|216');
    GridObj.SetColCellBgColor('SPECIFICATION','255|216|216');
    GridObj.SetColCellBgColor('VENDOR_NAME','255|216|216');
    GridObj.SetColCellBgColor('UNIT','255|216|216');
    GridObj.SetColCellBgColor('STOCK','255|216|216');
    GridObj.SetColCellBgColor('ADD_DATE','255|216|216');

    GridObj.bRowSelectorVisible = true;
    GridObj.bHDSwapping = true;
    GridObj.nAlphaLevel = 0;
    GridObj.nRowHeight = 22;
    GridObj.SetHelpInfo();
    GridObj.bAbortQueryVisible = true;
    GridObj.strRowScrollDragAction='syncscreen';
    GridObj.bHDMoving = false;
    GridObj.bHDSwapping = false;
    GridObj.bRowSelectorVisible = false;
    GridObj.strRowBorderStyle = "none";
    GridObj.nRowSpacing = 0;
    GridObj.strHDClickAction = "select";
    GridObj.bUserContextMenu = true;
    GridObj.bQueryErrorMsgVisible = false;
}


function setHeader(GridObj) {

    GridObj.AddHeader("SEQ_NO",			"SEQ_NO", 		"t_text", 		8,		85,		false);
    GridObj.AddHeader("SELECTED",		"선택",			"t_checkbox", 	2, 		80,		true);
    GridObj.AddHeader("ITEM_FLAG", 		"자재구분",		"t_combo", 		10, 	90,		false);
    GridObj.AddHeader("VENDOR_NAME", 	"제조회사",		"t_text", 		60, 	80,		false);
    GridObj.AddHeader("ITEM_CODE", 		"제품코드",		"t_text", 	20, 	100,	false);
    GridObj.AddHeader("ITEM_NAME", 		"제품명", 		"t_text", 		500, 	150,	true);
    GridObj.AddHeader("SPECIFICATION", 	"규격", 			"t_text", 		2000, 	200,	false);
    GridObj.AddHeader("UNIT", 			"단위",			"t_combo",		10, 	50,		false);
    GridObj.AddHeader("PRICE", 			"출고가", 		"t_number", 	44, 	140,		true);
    GridObj.AddHeader("STOCK",			"재고량", 		"t_number", 	22,		60,		false);
    GridObj.AddHeader("ADD_DATE",		"등록일", 		"t_date", 		8,		85,		false);

    GridObj.BoundHeader();
    GridObj.SetColHDCheckBoxVisible("SELECTED", true, false);

    GridObj.SetColHide("SEQ_NO", true);
    GridObj.AddComboListValue("ITEM_FLAG", "프로세서", "CPU");
    GridObj.AddComboListValue("ITEM_FLAG", "메모리", "MEM");
    GridObj.AddComboListValue("ITEM_FLAG", "메인보드", "MAB");
    GridObj.AddComboListValue("ITEM_FLAG", "그래픽카드", "VID");
    GridObj.AddComboListValue("ITEM_FLAG", "모니터", "MOR");
    GridObj.AddComboListValue("ITEM_FLAG", "하드디스크", "HDD");
    GridObj.AddComboListValue("ITEM_FLAG", "CDROM", "CDR");
    GridObj.AddComboListValue("ITEM_FLAG", "키보드", "KEY");
    GridObj.AddComboListValue("ITEM_FLAG", "마우스", "MOU");

    GridObj.AddComboListValue("UNIT", "EA", "EA");
    GridObj.SetNumberFormat("PRICE", "#,##0");
    GridObj.SetNumberFormat("STOCK", "#,##0");
    GridObj.SetDateFormat("ADD_DATE", "yyyy/MM/dd");
    doQuery();
}

function btn(a,b){
    document.write ("<table cellpadding=0 cellspacing=0 border=0 height=23 onClick="+a+" style=cursor:hand><tr><td width=15 class=btn_left>");
    document.write ("<img src=../images/blank.gif width=15 height=1></td>");
    document.write ("<td class=btn_txt valign=middle>"+b+"</td><td width=4 class=btn_right><img src=../images/blank.gif width=4></td></tr></table>");
}