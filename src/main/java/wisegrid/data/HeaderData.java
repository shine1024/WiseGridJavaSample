package wisegrid.data;

import xlib.cmc.OperateGridData;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Random;

public class HeaderData {
	private List list = null;
	private HashMap map = null;
	public HeaderData() {
	//  동적으로 헤더를 생성 
		list = new ArrayList();
		list.add(makeMap("SELECTED", "선택", OperateGridData.t_checkbox, "2", "40", "true"));
		list.add(makeMap("ITEM_FLAG", "자재구분", OperateGridData.t_combo, "10", "90", "true"));
		list.add(makeMap("VENDOR_NAME", "제조회사", OperateGridData.t_text, "20", "120", "true"));
		list.add(makeMap("ITEM_CODE", "제품코드", OperateGridData.t_imagetext, "20", "100", "true"));
		list.add(makeMap("ITEM_NAME", "제품명", OperateGridData.t_text, "50", "100", "true"));
		list.add(makeMap("SPECIFICATION", "규격", OperateGridData.t_text, "-1", "200", "true"));
		list.add(makeMap("UNIT", "단위", OperateGridData.t_combo, "10", "50", "true"));
		list.add(makeMap("PRICE", "출고가", OperateGridData.t_number, "22", "80", "true"));
		list.add(makeMap("STOCK", "재고량", OperateGridData.t_number, "22", "80", "true"));
		list.add(makeMap("ADD_DATE", "등록일", OperateGridData.t_date, "8", "85", "true"));
		list.add(makeMap("CHANGE_DATE", "수정일", OperateGridData.t_date, "8", "85", "true"));
	}
	
	public List getHeaderList(){
		return list;
	}
	
	public List getDynamicHeaderList(){
		List randList = new ArrayList();
		Random rnd = new Random();
		int headerCount = rnd.nextInt(11)+3;
		
		for (int i = 0; i < headerCount; i++) {
			HashMap header = (HashMap)list.get(i);
			randList.add(header);
		}
		System.out.println(headerCount);
		return randList;
	}
	
	
	public HashMap makeMap(String key, String text, String type, String maxLength, String width, String edit){
		map = new HashMap();
		map.put("key", key);
		map.put("text", text);
		map.put("type", type);
		map.put("maxLength", maxLength);
		map.put("width", width);
		map.put("edit", edit);
		return map;
	}
	
}
