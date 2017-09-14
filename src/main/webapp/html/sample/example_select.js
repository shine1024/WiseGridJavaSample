W$.ready(function(){
	// WiseGrid 생성
	WiseGridEx.render({
		/**
		 * WiseGrid를 생성하기 위한 ID입니다.
		 * 생성이후 ID로 접근해서 내부 함수또는 속성을 사용합니다.
		 */
		id:'WiseGrid',
		/**
		 * WiseGrid의 가로 크기입니다.
		 */
		width:'100%',
		/**
		 * WiseGrid의 세로 크기입니다.
		 */
		height:350,
		/**
		 * target속성에 지정한 ID와 동일한 document의 ID에 그리드를 생성합니다.
		 */
		target:'wiseGridDiv',
		/**
		 * 그리드 초기화시 발생하는 이벤트 함수 입니다.
		 * 초기화시 지정한 ID로 전역 객체를 생성합니다.
		 * 초기화 내부 함수에서 WiseGrid와 같이 ID로 바로 접근 해서 사용합니다.
		 */
		initialize: function(){
			/**
			 * Property Setting
			 */

			/**
			 * Header Setting
			 */
			// Header 정보를 외부 파일 또는 서버에서 받아서 처리 할 수 있습니다.
			WiseGrid.header.add(example.data.commonHeader);
			
			// AddHeader를 완료한 후 헤더를 그리드에 바인딩한다
			WiseGrid.BoundHeader();

			// t_combo 타입의 컬럼에 Combo List 를 추가한다. 
			WiseGrid.combo.add('ITEM_FLAG', example.comboData.commonCombo);
		
			WiseGrid.combo.add('UNIT',[{text: "EA",hidden:"EA"}]);
		
			// 이미지리스트에 이미지 URL을 추가한다
			WiseGrid.imagelist.add('ITEM_CODE',["/images/bt_search.gif"]);
			
			// t_checkbox 타입의 컬럼에 체크를 전체적용한다.
			WiseGrid.SetColHDCheckBoxValue("SELECTED", true);
			
			// t_checkbox 타입의 컬럼 헤더에 체크박스를 보여준다.
			WiseGrid.SetColHDCheckBoxVisible("SELECTED", true);
		
			// 셀의 글자색을 적용한다.
			WiseGrid.SetColCellFgColor("ITEM_CODE", "0|0|255");
			// t_number 타입의 컬럼을 포맷타입으로  지정한다.
			WiseGrid.SetNumberFormat("PRICE", "#,##0.00"); 
			WiseGrid.SetNumberFormat("STOCK", "#,##0"); 
		
			// t_date 타입의 컬럼을 포맷타입으로  지정한다.
			WiseGrid.SetDateFormat("ADD_DATE", "yyyy/MM/dd");
			WiseGrid.SetDateFormat("CHANGE_DATE", "yyyy/MM/dd");
			
			/**
			 * Event Handler Setting
			 */
			// WiseGrid의 ChangeCell event handler 등록
			WiseGrid.event.attach('ChangeCell',change);
			
			// WiseGrid의 ChangeCombo event handler 등록
			WiseGrid.event.attach('ChangeCombo',change);
			
			/**
			 * Query
			 */
			
		}
	});
});

/**
 * change event handler
 * @param {Object} _colKey  
 * @param {Object} _row 
 * @param {Object} _old
 * @param {Object} _new
 */
function change(_colKey,_row,_old,_new){
	if(_colKey != "SELECTED") {
		WiseGrid.$V("SELECTED", _row, "1");
	}
}

/**
 * 조회
 */
function doQuery() {
	// WiseGrid가 서버에 전송할 param을 셋팅한다.
	WiseGrid.$P("mode", "search");
	
	// DoQuery와 동일하지만 마지막 인자로 Callback을 받습니다.
	WiseGrid.ajax.sendRequest("/servlet/wisegrid.sample.ExampleSelect",
		function(_status,_message){
			
			if(_status){
				print(_status);
			} else {
				alert (_message);
			}
		}
	);
}

/**
 * 등록
 */
function doInsert() {
	if(WiseGrid.$F('1','SELECTED').length == 0) {
		alert('선택된 건이 없습니다.');
		return;	
	}
	
	// WiseGrid가 서버에 전송할 mode를 셋팅한다.
	WiseGrid.$P("mode", "insert");
	// id form에 해당하는 모든 입력 객체들을 그리드 파리미터로 저장한다.
	WiseGrid.param.syncForm('frm');
	
	/**
	 * WiseGrid가 서버와 통신시에 데이터를 전달한다. 서버에서는 체크된 로우만 전송받게 됩니다.
	 * 마지막 인자 function은 전송후 발생하는 callback입니다.
	 */ 
	WiseGrid.ajax.sendRequest("/servlet/wisegrid.sample.ExampleSelect",
		'SELECTED',
		function(_status,_message){
			if(_status){
				// 체크를 해제하고 결과를 화면에 보여줍니다.
				checkCancel();
				print(WiseGrid.$P("insertData"));
			} else {
				alert(_message);
			}
		}
	);
}
/**
 * 수정
 */
function doUpdate() {
	if(WiseGrid.$F('1','SELECTED').length == 0) {
		alert('선택된 건이 없습니다.');
		return;	
	}
	// WiseGrid가 서버에 전송할 mode를 셋팅한다.
	WiseGrid.$P("mode", "update");

	/**
	 * WiseGrid가 서버와 통신시에 데이터를 전달한다. 서버에서는 체크된 로우만 전송받게 됩니다.
	 * 마지막 인자 function은 전송후 발생하는 callback입니다.
	 */
	WiseGrid.ajax.sendRequest("/servlet/wisegrid.sample.ExampleSelect",
		'SELECTED',
		function(_status,_message){
			// 서버의 로직이 성공 
			if(_status){
				// 체크를 해제하고 결과를 화면에 보여줍니다.
				checkCancel();
				print(WiseGrid.$P("updateData"));
			} else {
				alert(_message);
			}
		}
	);
}

/**
 * 삭제
 */
function doDelete() {
	if(WiseGrid.$F('1','SELECTED').length == 0) {
		alert('선택된 건이 없습니다.');
		return;
	}
	// WiseGrid가 서버에 전송할 mode를 셋팅한다.
	WiseGrid.$P("mode", "delete");

	/**
	 * WiseGrid가 서버와 통신시에 데이터를 전달한다. 서버에서는 체크된 로우만 전송받게 됩니다.
	 * 마지막 인자 function은 전송후 발생하는 callback입니다.
	 */
	WiseGrid.ajax.sendRequest("/servlet/wisegrid.sample.ExampleSelect",
		'SELECTED',
		function(_status,_message){
			if(_status){
				// 클라이언트의 체크 된 로우를 삭제 하고 결과를 화면에 출력합니다. 
				WiseGrid.row.del("SELECTED");
				print(WiseGrid.$P("deleteData"));
			} else {
				alert(_message);
			}
		}
	);
}

/**
 * 행 추가
 */
function doLineInsert(){
	// 그리드의 마지막 열에 빈 로우를 추가한다. 
	WiseGrid.AddRow();
	var activeRowIndex = WiseGrid.GetActiveRowIndex();

	// 이전 로우의 데이터를 셋팅한다.
	if (WiseGrid.row.count() > 1) {
		// 지정한 row의 데이터를 받아온다(JSON 타입)
		var prevRow = WiseGrid.row.toJsonObj(activeRowIndex - 1);
		// 지정한 row에 받아온 데이터를 넣는다.(JSON 타입)
		WiseGrid.row.setJson(activeRowIndex, prevRow);
	}
	// 지정한 셀 SELECTED에 Active 된 로우의 인덱스에 값을 넣는다.
	WiseGrid.$V("SELECTED", activeRowIndex, "1");
}

/**
 * check 된 값들을 초기화 시킨다.
 */
function checkCancel() {
	var checkedCell = WiseGrid.$F("1","SELECTED");
	for(var i = 0 ; i < checkedCell.length ; i++) {
		WiseGrid.$V("SELECTED",checkedCell[i].row,"0");
	}
}