function setHeader(GridObj) {
    GridObj.AddHeader("ITEM_FLAG", 			"자재구분",		"t_imagetext", 		100, 	200,	false);
    GridObj.AddHeader("ITEM_CODE", 			"제품코드",		"t_imagetext", 		20, 	100,	false);
    GridObj.AddHeader("SPECIFICATION", 		"규격", 			"t_text", 			2000, 	200,	true);
    GridObj.AddHeader("UNIT", 				"단위",			"t_combo",			10, 	50,		true);
    GridObj.AddHeader("PRICE", 				"출고가", 		"t_number", 		22.2, 	100,	true);
    GridObj.AddHeader("STOCK",				"재고량", 		"t_number", 		22,		60,		true);
    GridObj.AddHeader("ADD_DATE",			"등록일", 		"t_date", 			8,		85,		true);
    GridObj.AddHeader("CHANGE_DATE",		"수정일", 		"t_date", 			8,		85,		true);
    GridObj.AddHeader("SEQ_NO",				"SEQ_NO", 		"t_text", 			8,		85,		true);

    GridObj.BoundHeader();

    GridObj.SetTreeMode("ITEM_FLAG", "*", ",");

    GridObj.AddImageList("ITEM_FLAG", "/images/drildown01.gif");
    GridObj.AddImageList("ITEM_FLAG", "/images/drildown03.gif");
    GridObj.AddImageList("ITEM_FLAG", "/images/drildown02.gif");

    GridObj.SetColHide("SEQ_NO", true);

    GridObj.AddImageList("ITEM_CODE", "/images/bt_search.gif");

    GridObj.SetColCellFgColor("ITEM_CODE", "0|0|255");

    GridObj.AddComboListValue("UNIT", "EA", "EA");

    GridObj.SetNumberFormat("PRICE", "#,##0.00");
    GridObj.SetNumberFormat("STOCK", "#,##0");

    GridObj.SetDateFormat("ADD_DATE", "yyyy/MM/dd");
    GridObj.SetDateFormat("CHANGE_DATE", "yyyy/MM/dd");
}
function getData() {
    var GridObj = document.WiseGrid;
    var servlet_url = "/servlet/wisegrid.sample.ExampleDrilldown";
    GridObj.SetParam("mode", "search");
    GridObj.DoQuery(servlet_url);
}

function treeNodeHandler(strMenuKey, strMenuItemKey, strColumnKey, nRow){
    var treeKeyName = 'wTree'+Math.random()*4+''+nRow;
    var GridObj = document.WiseGrid;
    var treeKey = GridObj.GetTreeKeyFromRowIndex(nRow);
    var parentNodeKey = GridObj.GetTreeParentNodeKey(treeKey);

    if(strMenuItemKey == 'myMenuAddRow'){
        GridObj.InsertTreeNode(treeKey, treeKeyName, ' ');
    }else if(strMenuItemKey == 'myMenuDelRow'){
        GridObj.DeleteTreeNode(treeKey);
    }else if(strMenuItemKey == 'myMenuAddRowFirst'){
        GridObj.InsertTreeNode(treeKey, treeKeyName, ' ','first');
    }else if(strMenuItemKey == 'myMenuAddRowNext'){
        GridObj.InsertTreeNode(parentNodeKey, treeKeyName, '',treeKey);
    }
}

function setContextMenu(){
    var GridObj = document.WiseGrid;
    GridObj.bUseDefaultContextMenu = false
    GridObj.bUserContextMenu = true
    GridObj.AddUserContextMenuItem('MENU_CELL','myMenuAddRowFirst','자식노드 추가[첫번째]');
    GridObj.AddUserContextMenuItem('MENU_CELL','myMenuAddRowNext','노드 추가[현재노드 다음]');
    GridObj.AddUserContextMenuItem('MENU_CELL','myMenuAddRow','자식노드 추가[마지막]');
    GridObj.AddUserContextMenuItem('MENU_CELL','myMenuDelRow','노드 삭제');

    GridObj.AddContextMenuSeparator('MENU_CELL');
    GridObj.AddDefaultContextMenuItem('MENUITEM_CELL_COPY');
    GridObj.AddDefaultContextMenuItem('MENUITEM_CELL_PASTE');
    GridObj.AddDefaultContextMenuItem('MENUITEM_CELL_EXCELEXPORT');
    GridObj.AddDefaultContextMenuItem('MENUITEM_CELL_FIND');

    GridObj.AddDefaultContextMenuItem('MENUITEM_HD_ADDLEVEL');
    GridObj.AddDefaultContextMenuItem('MENUITEM_HD_DELETELEVEL');
    GridObj.AddDefaultContextMenuItem('MENUITEM_HD_SAVELAYOUT');
    GridObj.AddDefaultContextMenuItem('MENUITEM_HD_RESETLAYOUT');
    GridObj.AddDefaultContextMenuItem('MENUITEM_HD_HIDEHEADER');
    GridObj.AddDefaultContextMenuItem('MENUITEM_HD_CANCELHIDEHEADER');
    GridObj.AddDefaultContextMenuItem('MENUITEM_HD_FIXHEADER');
    GridObj.AddDefaultContextMenuItem('MENUITEM_HD_CANCELFIXHEADER');
    GridObj.AddDefaultContextMenuItem('MENUITEM_ROW_COPY');
}


function GridEndQuery() {
    var GridObj = document.WiseGrid;

    if(GridObj.GetStatus() == "true") {
        var mode = GridObj.GetParam("mode");

        if(mode == "search") {
            GridObj.SetCellFocus("ITEM_FLAG", GridObj.GetRowIndexFromTreeKey(GridObj.GetTreeFirstNodeKey()), false);
            var first_node = GridObj.GetTreeKeyFromRowIndex(0);
            chkChildNode(first_node);
        }
    }
}

function openDrilDownNavigator() {
    var GridObj = document.WiseGrid;

    GridObj.ExpandTreeAll();

    GridObj.SetCellFocus("ITEM_FLAG", GridObj.GetRowIndexFromTreeKey(GridObj.GetTreeFirstNodeKey()), false);

    popUpOpen("example_drilldown_navigate_pop.htm", "drildown_navigator", 540, 600);
}

function chkSum() {
    var GridObj = document.WiseGrid;

    var first_node = GridObj.GetTreeKeyFromRowIndex(0);
    chkChildNode(first_node);
}

function chkChildNode(node_key) {
    var GridObj = document.WiseGrid;

    if(GridObj.HasTreeChildNode(node_key)) {
        chkChildNode(GridObj.GetTreeChildNodeKey(node_key));

        if(GridObj.HasTreeParentNode(node_key)) {
            var parent_node_key = GridObj.GetTreeParentNodeKey(node_key);
            setTreeSummary(parent_node_key);

            if(GridObj.HasTreeNextNode(parent_node_key)) {
                chkChildNode(GridObj.GetTreeNextNodeKey(parent_node_key));
            }
        }
    } else {
        var parent_node_key = GridObj.GetTreeParentNodeKey(node_key);
        setTreeSummary(parent_node_key);

        if(GridObj.HasTreeNextNode(parent_node_key)) {
            chkChildNode(GridObj.GetTreeNextNodeKey(parent_node_key));
        }
    }
}

function setTreeSummary(node_key) {
    var GridObj = document.WiseGrid;

    var sum_value = GridObj.GetTreeSummaryValue(node_key, "PRICE", "sum", false);
    var stock_value = GridObj.GetTreeSummaryValue(node_key, "STOCK", "sum", false);

    var row_index = GridObj.GetRowIndexFromTreeKey(node_key);

    GridObj.SetCellValue("PRICE", row_index, sum_value);
    GridObj.SetCellValue("STOCK", row_index, stock_value);
}