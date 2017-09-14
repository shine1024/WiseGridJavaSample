/**
 * 예제에서 사용하는 데이터입니다.
 *
 * example.left.header
 * example.left.image
 * 
 * 예제에서 사용하는 헤더데이터
 * 
 * - example.data.commonHeader
 * - example.data.percentHeader
 * - example.data.excelHeader
 * - example.data.multiComboHeader
 * - example.data.cursorHeader
 * - example.data.multilineHeader
 * - example.data.fomularHeader
 * - example.data.drilldownHeader
 * - example.data.mouseEventHeader
 * - example.data.saveHeader
 * - example.data.imageHeader
 * - example.data.chartHeader
 * - example.data.unicodeHeader
 * 
 * 예제에서 사용하는 이미지 데이터
 * - example.imageData.cursor
 * - example.imageData.drillDown
 * - example.imageData.fomular
 * 
 * 예제에서 사용하는 콤보 데이터
 * - example.comboData.commonCombo
 * - example.comboData.multiCate1
 * - example.comboData.multiCate2
 * - example.comboData.multiCate3
 * 
 * 예제에서 사용하는 이벤트 함수
 * - example.event.cellClick
 * 
 */


example = {
	leftMenu:{
		header : [
					{key: 'TREE_NODE', text: '트리 노드', width: '220', maxLength: '80', type: 't_imagetext', edit: false},	
					{key: 'MENU_URL', text: 'target', width: '400', maxLength: '100', type: 't_text', edit: false}	
				],
		image : [
					"../../images/menu/ftv2folderclosed.gif",
					"../../images/menu/ftv2folderopen.gif",
					"../../images/menu/ftv2doc.gif"
				]
	},
	data : {
		commonHeader : [
			{key: 'SELECTED', text: '선택', width: '50', maxLength: '2', type: 't_checkbox', edit: true},
			{key: 'ITEM_FLAG', text: '자재구분', width: '90', maxLength: '10', type: 't_combo', edit: true},
			{key: 'VENDOR_NAME', text: '제조회사', width: '100', maxLength: '80', type: 't_text', edit: false},
			{key: 'ITEM_CODE', text: '제품코드', width: '100', maxLength: '100', type: 't_imagetext', edit: true},
			{key: 'ITEM_NAME', text: '제품명', width: '200', maxLength: '150', type: 't_text', edit: true	},
			{key: 'SPECIFICATION', text: '규격', width: '200', maxLength: '500', type: 't_text', edit: true},
			{key: 'UNIT', text: '단위', width: '50', maxLength: '50', type: 't_combo', edit: true},
			{key: 'PRICE', text: '출고가', width: '80', maxLength: '22.3', type: 't_number', edit: true},
			{key: 'STOCK', text: '재고량', width: '80', maxLength: '22.3', type: 't_number', edit: true},
			{key: 'ADD_DATE', text: '등록일', width: '85', maxLength: '30', type: 't_date', edit: true},
			{key: 'CHANGE_DATE', text: '수정일', width: '85', maxLength: '30', type: 't_date', edit: true},
			{key: 'SEQ_NO', text: 'SEQ_NO'}
		],
		compressHeader : [
			{key: 'SELECTED', text: '선택', width: '50', maxLength: '2', type: 't_checkbox', edit: true},
			{key: 'ITEM_FLAG', text: '자재구분', width: '90', maxLength: '10', type: 't_combo', edit: true},
			{key: 'VENDOR_NAME', text: '제조회사', width: '100', maxLength: '80', type: 't_text', edit: true},
			{key: 'ITEM_CODE', text: '제품코드', width: '100', maxLength: '100', type: 't_text', edit: true},
			{key: 'ITEM_NAME', text: '제품명', width: '200', maxLength: '150', type: 't_text', edit: true	},
			{key: 'SPECIFICATION', text: '규격', width: '200', maxLength: '500', type: 't_text', edit: true},
			{key: 'UNIT', text: '단위', width: '50', maxLength: '50', type: 't_combo', edit: true},
			{key: 'PRICE', text: '출고가', width: '80', maxLength: '22.3', type: 't_number', edit: true},
			{key: 'STOCK', text: '재고량', width: '80', maxLength: '22.3', type: 't_number', edit: true},
			{key: 'ADD_DATE', text: '등록일', width: '85', maxLength: '30', type: 't_date', edit: true},
			{key: 'CHANGE_DATE', text: '수정일', width: '85', maxLength: '30', type: 't_date', edit: true},
			{key: 'SEQ_NO', text: 'SEQ_NO'}
		],
		percentHeader : [
		    {key: 'SELECTED', text: '선택', width: 50, maxLength: '2', type: 't_checkbox', edit: true},
		    {key: 'ITEM_FLAG', text: '자재구분', width: '10%', maxLength: '10', type: 't_combo', edit: true},
		    {key: 'VENDOR_NAME', text: '제조회사', width: '10%', maxLength: '80', type: 't_text', edit: true},
		    {key: 'ITEM_CODE', text: '제품코드', width: '10%', maxLength: '100', type: 't_imagetext', edit: true},
		    {key: 'ITEM_NAME', text: '제품명', width: '15', maxLength: '150', type: 't_text', edit: true	},
		    {key: 'SPECIFICATION', text: '규격', width: '21%', maxLength: '500', type: 't_text', edit: true},
		    {key: 'UNIT', text: '단위', width: 50, maxLength: '50', type: 't_combo', edit: true},
		    {key: 'PRICE', text: '출고가', width: '10%', maxLength: '22.3', type: 't_number', edit: true},
		    {key: 'STOCK', text: '재고량', width: '10%', maxLength: '22.3', type: 't_number', edit: true},
		    {key: 'ADD_DATE', text: '등록일', width: '7%', maxLength: '30', type: 't_date', edit: true},
		    {key: 'CHANGE_DATE', text: '수정일', width: '7%', maxLength: '30', type: 't_date', edit: true},
		    {key: 'SEQ_NO', text: 'SEQ_NO'}
		],
		excelHeader : [
			{key: 'ITEM_FLAG', text: '자재구분', width: '90', maxLength: '10', type: 't_combo', edit: true},
			{key: 'VENDOR_NAME', text: '제조회사', width: '100', maxLength: '80', type: 't_text', edit: true},
			{key: 'ITEM_CODE', text: '제품코드', width: '100', maxLength: '100', type: 't_imagetext', edit: true},
			{key: 'ITEM_NAME', text: '제품명', width: '200', maxLength: '150', type: 't_text', edit: true	},
			{key: 'SPECIFICATION', text: '규격', width: '200', maxLength: '500', type: 't_text', edit: true},
			{key: 'UNIT', text: '단위', width: '50', maxLength: '50', type: 't_combo', edit: true},
			{key: 'PRICE', text: '출고가', width: '80', maxLength: '22.3', type: 't_number', edit: true},
			{key: 'STOCK', text: '재고량', width: '80', maxLength: '22.3', type: 't_number', edit: true},
			{key: 'ADD_DATE', text: '등록일', width: '85', maxLength: '30', type: 't_date', edit: true},
			{key: 'CHANGE_DATE', text: '수정일', width: '85', maxLength: '30', type: 't_date', edit: true}
		],
		multiComboHeader: [
			{key:"SELECTED",text:	"선택",		type:"t_checkbox",maxLength:		2, 	width:50,	edit:true},	
			{key:"B_CATE", 	text:"대분류",	type:"t_combo", 	maxLength:	30, 	width:120,edit:true},	
			{key:"M_CATE",	text:	"중분류",	type:"t_combo", 	maxLength:	30, 	width:120,edit:true},
			{key:"S_CATE", 	text:"소분류",	type:"t_combo", 	maxLength:	30, 	width:120,edit:true},
			{key:"GOODS", 	text:	"상품명", type:	"t_text", 	maxLength:	100, 	width:200,edit:true},	
			{key:"COMPANY", text:	"제조사", type:	"t_text", 	maxLength:	50, 	width:100,edit:true},	
			{key:"SELLER", 	text:"판매자",	type:"t_text",		maxLength:10, 		width:100,edit:true},
			{key:"PRICE", 	text:	"가격", 	type:	"t_number", maxLength:	22.3, width:80,	edit:true},	
			{key:"SEQ_NO",	text:	"SEQ_NO", type:	"t_text", 	maxLength:	8,		width:85,	edit:true}
		],
		cursorHeader : [
			{key:"NAME",text:"커서",type:"t_imagetext", maxLength:100,width:200,edit:true},                   
			{key:"IMAGE",text:"커서확인(마우스를 올려주세요)",type:"t_text",maxLength:100,width:300,edit:true}
		],
		multilineHeader : [
   			{key: 'NAME', text: '용어', width: '200', maxLength: '100', type: 't_imagetext', edit: true},
   			{key: 'SUMMATION', text: '요약', width: '500', maxLength: '1000', type: 't_text', edit: true},
   			{key: 'DESCRIPTION', text: '본문', width: '200', maxLength: '4000', type: 't_text', edit: true}
   		],
		fomularHeader : [
			{key:'SELECTED',		text:"구분",				type:"t_checkbox",	maxLength:1,	width:20, edit:true},
			{key:'PRODUCT_CODE',	text:"상품\n코드",		type:"t_text",		maxLength:50,	width:60, edit:false},
			{key:'PRODUCT_NAME',	text:"상품명",			type:"t_text",		maxLength:100,	width:100,edit:false},
			{key:'REG_DATE',		text:"입고\n일자",		type:"t_date",		maxLength:70,	width:60, edit:false},
			{key:'STOCK_TYPE',		text:"입고\n구분"	,		type:"t_text",		maxLength:0,	width:40, edit:true},
			{key:'STOCK_QTY',		text:"입고\n수량",		type:"t_number",	maxLength:60,	width:60, edit:false},
			{key:'STOCK_PRICE',		text:"입고\n가격",		type:"t_number",	maxLength:70,	width:60, edit:false},
			{key:'TOT_STOCK_PRICE',	text:"총입고가",			type:"t_number",	maxLength:90,	width:70, edit:false},
			{key:'SALE_QTY',		text:"판매\n수량",		type:"t_number",	maxLength:70,	width:60, edit:false},
			{key:'SALE_PRICE',		text:"판매\n가격",		type:"t_number",	maxLength:80,	width:80, edit:false},
			{key:'DC_PRICE',		text:"할인가\n(25% DC)",	type:"t_number",	maxLength:80,	width:80, edit:false},
			{key:'TOT_SALE_PRICE',	text:"총판매가",			type:"t_number",	maxLength:80,	width:80, edit:false},
			{key:'SELLER',			text:"판매\n담당자",		type:"t_text",		maxLength:60,	width:60, edit:false},
			{key:'PRODUCT_TYPE',	text:"품목\n분류",		type:"t_text",		maxLength:10,	width:60, edit:false},
			{key:'SALE_AVG_FLAG',	text:"판매평균\n미달여부",	type:"t_imagetext",	maxLength:90,	width:90, edit:false}
		],
		drilldownHeader : [
			{key: 'ITEM_FLAG', text: '자재구분', width: '90', maxLength: '100', type: 't_imagetext', edit: true},
			{key: 'ITEM_CODE', text: '제품코드', width: '100', maxLength: '100', type: 't_imagetext', edit: true},
			{key: 'SPECIFICATION', text: '규격', width: '200', maxLength: '500', type: 't_text', edit: true},
			{key: 'UNIT', text: '단위', width: '50', maxLength: '50', type: 't_combo', edit: true},
			{key: 'PRICE', text: '출고가', width: '80', maxLength: '22.3', type: 't_number', edit: true},
			{key: 'STOCK', text: '재고량', width: '80', maxLength: '22.3', type: 't_number', edit: true},
			{key: 'ADD_DATE', text: '등록일', width: '85', maxLength: '30', type: 't_date', edit: true},
			{key: 'CHANGE_DATE', text: '수정일', width: '85', maxLength: '30', type: 't_date', edit: true},
			{key: 'SEQ_NO', text: 'SEQ_NO'}
		],
		mouseEventHeader : [
   			{key: 'EVENT', text: 'EVENT', width: '100', maxLength: '100', type: 't_text', edit: true},
   			{key: 'TYPE', text: 'TYPE', width: '100', maxLength: '100', type: 't_text', edit: true},
   			{key: 'COLUMN', text: 'COLUMN', width: '100', maxLength: '120', type: 't_text', edit: true},
   			{key: 'NROW', text: 'ROW', width: '100', maxLength: '100', type: 't_text', edit: true}
   		],
		saveHeader : [
			{key: 'CRUD', text: '구분', width: '50', maxLength: '8', type: 't_text', edit: true},
			{key: 'ITEM_FLAG', text: '자재구분', width: '90', maxLength: '10', type: 't_combo', edit: true},
			{key: 'VENDOR_NAME', text: '제조회사', width: '100', maxLength: '80', type: 't_text', edit: true},
			{key: 'ITEM_CODE', text: '제품코드', width: '100', maxLength: '100', type: 't_imagetext', edit: true},
			{key: 'ITEM_NAME', text: '제품명', width: '200', maxLength: '150', type: 't_text', edit: true	},
			{key: 'SPECIFICATION', text: '규격', width: '200', maxLength: '500', type: 't_text', edit: true},
			{key: 'UNIT', text: '단위', width: '50', maxLength: '50', type: 't_combo', edit: true},
			{key: 'PRICE', text: '출고가', width: '80', maxLength: '22.3', type: 't_number', edit: true},
			{key: 'STOCK', text: '재고량', width: '80', maxLength: '22.3', type: 't_number', edit: true},
			{key: 'ADD_DATE', text: '등록일', width: '85', maxLength: '30', type: 't_date', edit: true},
			{key: 'CHANGE_DATE', text: '수정일', width: '85', maxLength: '30', type: 't_date', edit: true},
			{key: 'SEQ_NO', text: 'SEQ_NO'}
		],
		imageHeader : [
  			{key: 'IMAGE', text: 'IMAGE', width: '300', maxLength: '200', type: 't_imagetext', edit: false},
  			{key: 'COLUMN_NAME', text: 'COLUMN_NAME', width: '120', maxLength: '10', type: 't_text', edit: false},
  			{key: 'VALUE', text: 'VALUE', width: '200', maxLength: '200', type: 't_text', edit: false},
  			{key: 'I_NO', text: 'I_NO', width: '200', maxLength: '200', type: 't_text', edit: false}
  		],
  		chartHeader : [
 			{key: 'OPER_NAME', text: '사업부', type: 't_imagetext', maxLength: '100', width: '150', edit: false},
 			{key: 'SAWON', text: '사원', type: 't_number', maxLength: '22.1', width: '50', edit: false},
 			{key: 'DAERI', text: '대리', type: 't_number', maxLength: '22.1', width: '50', edit: false},
 			{key: 'KWAJANG', text: '과장', type: 't_number', maxLength: '22.1', width: '50', edit: false},
 			{key: 'BUJANG', text: '부장', type: 't_number', maxLength: '22.1', width: '50', edit: false},
 			{key: 'SILJUCK1', text: '2005년', type: 't_number', maxLength: '22', width: '100', edit: false},
 			{key: 'SILJUCK2', text: '2006년', type: 't_number', maxLength: '22', width: '100', edit: false},
 			{key: 'SILJUCK3', text: '2007년', type: 't_number', maxLength: '22', width: '100', edit: false},
 			{key: 'SEQ_NO', text: 'SEQ_NO', type: 't_text', maxLength: '8', width: '100', edit: false}
 		],  		
		unicodeHeader : [
 			{key: 'NATION', text: '언어', width: '70', maxLength: '1000', type: 't_text', edit: false},
 			{key: 'LANG', text: '인사말', width: '450', maxLength: '1000', type: 't_text', edit: false},
 			{key: 'BIGO', text: '비고', width: '150', maxLength: '1000', type: 't_text', edit: false}
 		]  	
	},
	imageData : {
		cursor : [
			"../../images/cursor/default.gif",
			"../../images/cursor/arrow.gif",
			"../../images/cursor/cross.gif",
			"../../images/cursor/ibeam.gif",
			"../../images/cursor/size.gif",
			"../../images/cursor/sizenesw.gif",
			"../../images/cursor/sizens.gif",
			"../../images/cursor/sizenwse.gif",
			"../../images/cursor/sizeew.gif",
			"../../images/cursor/uparrow.gif",
			"../../images/cursor/hourglass.gif",
			"../../images/cursor/arrowquestion.gif",
			"../../images/cursor/sizeall.gif",
			"../../images/cursor/hand.gif",
			"../../images/cursor/nodrop.gif"
		],
		drillDown: [
			"../../images/drildown01.gif",
			"../../images/drildown03.gif",
			"../../images/drildown02.gif"
		],
		fomular : [
			'../../images/arrowUp.gif',
			'../../images/arrowDown.gif'
		]
	},
	comboData : {
		commonCombo : [
		               {text: "프로세서",		hidden: "CPU" },
		               {text: "메모리",		hidden: "MEM"},
		               {text: "메인보드",		hidden: "MAB"},
		               {text: "그래픽카드",	hidden: "VID"},
		               {text: "모니터",		hidden: "MOR"},
		               {text: "하드디스크",	hidden: "HDD"},
		               {text: "CDROM",		hidden: "CDR"},
		               {text: "키보드",		hidden: "KEY"},
		               {text: "마우스",		hidden: "MOU"}
		],
		multiCate1 :[
			{
				key:"B",
				items:[
					{text:"컴퓨터", hidden:"C"}, 
					{text:"모니터", hidden:"M"}, 
					{text:"프린터", hidden:"P"}
					]
			}
		],
		multiCate2 :[{key:"C",items:[{text:"노트북",hidden:"C1"},{text:"조립PC",hidden:"C2"},{text:"데스크탑",hidden:"C3"}]},{key:"M",items:[{text:"LCD모니터",hidden:"M1"}]},{key:"P",items:[{text:"잉크젯복합기",hidden:"P1"},{text:"잉크젯프린터",hidden:"P2"},{text:"레이저복합기",hidden:"P3"},{text:"레이저프린터",hidden:"P4"},{text:"기타",hidden:"P5"}]}],
		multiCate3 :[{key:"C1",items:[{text:"삼성 SENS",hidden:"N1"},{text:"HP 컴팩",hidden:"N2"},{text:"LG XNote",hidden:"N3"},{text:"도시바",hidden:"N4"},{text:"TG 삼보",hidden:"N5"},{text:"ASUS",hidden:"N6"},{text:"Lenovo[IBM]",hidden:"N7"},{text:"후지쯔",hidden:"N8"},{text:"애플",hidden:"N9"},{text:"소니",hidden:"N10"},{text:"기타",hidden:"N11"}]},{key:"C2",items:[{text:"Feel-N",hidden:"A1"},{text:"GT컴퓨터",hidden:"A2"},{text:"아이프로컴",hidden:"A3"},{text:"컴집",hidden:"A4"},{text:"이컴투유",hidden:"A5"},{text:"기타",hidden:"A6"}]},{key:"C3",items:[{text:"주연테크",hidden:"D1"},{text:"삼성 MasicStation",hidden:"D2"},{text:"TG삼보",hidden:"D3"},{text:"LG",hidden:"D4"},{text:"HP컴팩",hidden:"D5"},{text:"기타",hidden:"D6"}]},{key:"M1",items:[{text:"LG",hidden:"LM1"},{text:"메인디스플레이",hidden:"LM2"},{text:"삼성 Syncmaster",hidden:"LM3"},{text:"다비디스플레이",hidden:"LM4"},{text:"오리온 Topsync",hidden:"LM5"},{text:"데이시스템",hidden:"LM6"},{text:"알파스캔",hidden:"LM7"},{text:"애니프로",hidden:"LM8"},{text:"MOTV",hidden:"LM9"},{text:"BTC",hidden:"LM10"},{text:"루미온",hidden:"LM11"},{text:"디스플레이랜드",hidden:"LM12"},{text:"현대",hidden:"LM13"},{text:"PCBANK",hidden:"LM14"},{text:"뷰소닉",hidden:"LM15"},{text:"기타",hidden:"LM16"}]},{key:"P1",items:[{text:"HP",hidden:"IC1"},{text:"캐논",hidden:"IC2"},{text:"삼성",hidden:"IC3"},{text:"앱손",hidden:"IC4"}]},{key:"P2",items:[{text:"HP",hidden:"IP1"},{text:"캐논",hidden:"IP2"},{text:"삼성",hidden:"IP3"},{text:"앱손",hidden:"IP4"}]},{key:"P3",items:[{text:"HP",hidden:"LC1"},{text:"캐논",hidden:"LC2"},{text:"삼성",hidden:"LC3"},{text:"기타",hidden:"LC4"}]},{key:"P4",items:[{text:"HP",hidden:"LP1"},{text:"캐논",hidden:"LP2"},{text:"삼성",hidden:"LP3"},{text:"FUJI",hidden:"LP4"},{text:"기타",hidden:"LP5"}]},{key:"P5",items:[{text:"스캐너",hidden:"E1"},{text:"도트/라벨프린터",hidden:"E2"},{text:"포토프린터",hidden:"E3"},{text:"기타",hidden:"E4"}]}]
	},
	event:{
		cellClick:function(_colKey,_row){
			if(_colKey == "ITEM_CODE") {
				if(WiseGrid.$V("ITEM_CODE", _row) != "")
					popUpOpen("../../html/popup/prod_detail_pop.htm", "prod_detail_pop", 330, 250);						
			}
		}
	}
	       
};

/**
 * 일반팝업을 중앙에 위치도록 할때  
 */
function popUpOpen(url, title, width, height) 
{
	if (title == '') title = 'Popup_Open';
    if (width == '') width = 540;
    if (height == '') height = 500;
	var left = "";
	var top = "";

    //화면 가운데로 배치
    var dim = new Array(2);

	dim = centerWindow(height,width);
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

function centerWindow(height,width)
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


function print(_html){
	if(_html.length > 0){
		var id = 'WiseGridLog';
		var el = '';
		if(document.getElementById(id) == null){
			var el = document.createElement('div');
			var f = document.createElement('fieldset');
			var l = document.createElement('legend');
			var p = document.createElement('div');
			p.id = id;
			l.innerHTML = '결과 데이터';
			f.appendChild(l);
			f.appendChild(p);
			el.appendChild(f);
			document.body.appendChild(el);
			p.innerHTML = _html;
		}else{
			document.getElementById(id).innerHTML = _html;
		}
	} 	
}
function println(_html){
	if(_html.length > 0){
		var id = 'WiseGridLog';
		var el = '';
		if(document.getElementById(id) == null){
			var el = document.createElement('div');
			var f = document.createElement('fieldset');
			var l = document.createElement('legend');
			var p = document.createElement('div');
			p.id = id;
			l.innerHTML = '결과 데이터';
			f.appendChild(l);
			f.appendChild(p);
			el.appendChild(f);
			document.body.appendChild(el);
			p.innerHTML = _html;
		}else{
			document.getElementById(id).innerHTML += _html;
		}
	} 	
}

var timer ={
	fromTime:0,
	toTime:0,
	totalTime:0,
	start : function(){
		toDay = new Date();
		timer.fromTime = toDay.getTime();
	},
	end : function(){
		toDay = new Date();
		timer.toTime = toDay.getTime();
		timer.totalTime = (timer.toTime - timer.fromTime) / 1000;
		return timer.totalTime;
	}
};