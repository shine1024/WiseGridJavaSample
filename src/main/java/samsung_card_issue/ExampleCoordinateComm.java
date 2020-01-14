package samsung_card_issue;

import xlib.cmc.GridData;
import xlib.cmc.OperateGridData;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;

/**
 * 통합통신 예제
 * @author UNIPOST
 */
public class ExampleCoordinateComm extends HttpServlet {

	private static final long serialVersionUID = 2699552896301657596L;

	public void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException, ServletException {
		
		GridData[] gdReq = new GridData[4];		
		GridData[] gdRes = new GridData[4];
		
		String[] strReqKey = {"WISEGRID_DATA", "WISEGRID_SUB1", "WISEGRID_SUB2", "WISEGRID_SUB3"};
		String[] strResKey = {"WISEGRIDDATA_MASTER", "WISEGRID_SUB1", "WISEGRID_SUB2", "WISEGRID_SUB3"};
		
		String mode = null;
		

		res.setContentType("text/html; charset=UTF-8");
		req.setCharacterEncoding("UTF-8");

		try {

			String[] rawData = new String[4]; 
			
			/*  JSP 페이지에서 통신시에 같이 보낸
			    각 그리드의 데이터를 key 값을 가지고 RawData를 가져온다.
			* */
			for(int i = 0; i < strReqKey.length; i++) {
				rawData[i] = req.getParameter(strReqKey[i]);
				gdReq[i] = OperateGridData.parse(rawData[i]);
			}

			mode = gdReq[0].getParam("MODE");	
		
			for(int i = 0; i < gdReq.length; i++) {
				if(mode.equals("S"))
					gdRes[i] = doSearch(gdReq[i]);
				else if(mode.equals("SAVE"))
					gdRes[i] = doSave(gdReq[i]);
				else {
					// 압축 조회 예제는 보여질 데이터의  RowCount를 화면에서 받아준다.
					int rowCount = Integer.parseInt(gdReq[0].getParam("ROWCOUNT"));
					gdRes[i] = doZip(gdReq[i], rowCount);
				}
			}
		} catch (Exception e) {
			for(int i = 0; i < gdRes.length; i++) {
				gdRes[i] = new GridData();
				
				// Exception 발생시 CRUD 플래그를 초기화 하지 않도록 함.
				try {
					gdRes[i].addParam("DOQUERY_SAVESTATUS_ROLLBACK","false");
				} catch (Exception e1) {
					e1.printStackTrace();
				}
			}
				
			gdRes[0].setMessage("Error: " + e.getMessage());
			gdRes[0].setStatus("false");
			e.printStackTrace();
		} finally {
			try {
				if(mode.equals("S") || mode.equals("SAVE"))
					OperateGridData.write(strResKey, gdRes, res.getWriter());
				else if(mode.equals("ZIP"))
					OperateGridData.write(strResKey, gdRes, res.getOutputStream());					
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}

	public GridData doSearch(GridData gdReq) throws Exception {
		GridData gdRes = new GridData();
		int rowCount = 0;
		
		try {

			gdRes = OperateGridData.cloneResponseGridData(gdReq);
			TestData sd = new TestData();
			rowCount = sd.getRowcount();
			

			if (rowCount == 0) {
				gdRes.addParam("MODE", "S");		
				gdRes.setMessage("조회결과가 업습니다.");
				gdRes.setStatus("true");
				
				return gdRes;				
			}			
			

			for (int i = 0; i < rowCount; i++) {				
				gdRes.getHeader("CRUD").addValue("", "");
				gdRes.getHeader("SEQ_NO").addValue(String.valueOf(i), "");
				gdRes.getHeader("ITEM_FLAG").addSelectedHiddenValue(sd.getValue(i, 0));				
				gdRes.getHeader("VENDOR_NAME").addValue(sd.getValue(i, 1), "");
				gdRes.getHeader("ITEM_CODE").addValue(sd.getValue(i, 2), "", 0);
				gdRes.getHeader("ITEM_NAME").addValue(sd.getValue(i, 3), "");
				gdRes.getHeader("SPECIFICATION").addValue(sd.getValue(i, 4), "");
				gdRes.getHeader("UNIT").addSelectedHiddenValue(sd.getValue(i, 5));
				gdRes.getHeader("PRICE").addValue(sd.getValue(i, 6), "");
				gdRes.getHeader("STOCK").addValue(sd.getValue(i, 7), "");
				gdRes.getHeader("ADD_DATE").addValue(sd.getValue(i, 8), "");
				gdRes.getHeader("CHANGE_DATE").addValue(sd.getValue(i, 9), "");
			}	
			

			gdRes.addParam("MODE", "S");	
			gdRes.setMessage("성공적으로 작업하였습니다.");
			gdRes.setStatus("true");
			
		} catch (Exception e) { 
			throw e;
		}
						
		return gdRes;
	}
	
	public GridData doSave(GridData gdReq) throws Exception {
		
		GridData gdRes = new GridData();
		ArrayList createDataList = new ArrayList();
		ArrayList updateDataList = new ArrayList();
		ArrayList deleteDataList = new ArrayList();
		
		int rowCount = 0;
		
		try {
			// 화면에서 전달받은 "CRUD" 의 row수를 가져온다.
			rowCount = gdReq.getHeader("CRUD").getRowCount();		
			
			// 삭제시 입력할 데이터를 정해진 형태로 만들어 놓는다.
			int headerCount = gdReq.getHeaderCount();
			String[] createData = new String[headerCount];
			String[] updateData = new String[headerCount];
			String[] deleteData = new String[headerCount];
			
			// CRUD 의 hiddenValue 값을 가지고
			// 각 C, U, D 별로 데이터 구조를 만든다.
			for (int i = 0; i < rowCount; i++) {

				String crud = gdReq.getHeader("CRUD").getHiddenValue(i);
				
				if (crud.equals("C")) {
					createData[0] = gdReq.getHeader("ITEM_FLAG").getComboHiddenValues()[gdReq.getHeader("ITEM_FLAG").getSelectedIndex(i)];
					createData[1] = gdReq.getHeader("VENDOR_NAME").getValue(i);
					createData[2] = gdReq.getHeader("ITEM_CODE").getValue(i);
					createData[3] = gdReq.getHeader("ITEM_NAME").getValue(i);
					createData[4] = gdReq.getHeader("SPECIFICATION").getValue(i);
					createData[5] = gdReq.getHeader("UNIT").getComboHiddenValues()[gdReq.getHeader("UNIT").getSelectedIndex(i)];
					createData[6] = gdReq.getHeader("PRICE").getValue(i); 
					createData[7] = gdReq.getHeader("STOCK").getValue(i);
					createData[8] = gdReq.getHeader("ADD_DATE").getValue(i);
					createData[9] = gdReq.getHeader("CHANGE_DATE").getValue(i); 			
					createDataList.add(createData);
				} else if (crud.equals("U")) {
					updateData[0] = gdReq.getHeader("ITEM_FLAG").getComboHiddenValues()[gdReq.getHeader("ITEM_FLAG").getSelectedIndex(i)];
					updateData[1] = gdReq.getHeader("VENDOR_NAME").getValue(i);
					updateData[2] = gdReq.getHeader("ITEM_CODE").getValue(i);
					updateData[3] = gdReq.getHeader("ITEM_NAME").getValue(i);
					updateData[4] = gdReq.getHeader("SPECIFICATION").getValue(i);
					updateData[5] = gdReq.getHeader("UNIT").getComboHiddenValues()[gdReq.getHeader("UNIT").getSelectedIndex(i)];
					updateData[6] = gdReq.getHeader("PRICE").getValue(i); 
					updateData[7] = gdReq.getHeader("STOCK").getValue(i);
					updateData[8] = gdReq.getHeader("ADD_DATE").getValue(i);
					updateData[9] = gdReq.getHeader("CHANGE_DATE").getValue(i); 			
					updateDataList.add(updateData);				
				} else if (crud.equals("D")) {
					deleteData[0] = gdReq.getHeader("ITEM_FLAG").getComboHiddenValues()[gdReq.getHeader("ITEM_FLAG").getSelectedIndex(i)];
					deleteData[1] = gdReq.getHeader("VENDOR_NAME").getValue(i);
					deleteData[2] = gdReq.getHeader("ITEM_CODE").getValue(i);
					deleteData[3] = gdReq.getHeader("ITEM_NAME").getValue(i);
					deleteData[4] = gdReq.getHeader("SPECIFICATION").getValue(i);
					deleteData[5] = gdReq.getHeader("UNIT").getComboHiddenValues()[gdReq.getHeader("UNIT").getSelectedIndex(i)];
					deleteData[6] = gdReq.getHeader("PRICE").getValue(i); 
					deleteData[7] = gdReq.getHeader("STOCK").getValue(i);
					deleteData[8] = gdReq.getHeader("ADD_DATE").getValue(i);
					deleteData[9] = gdReq.getHeader("CHANGE_DATE").getValue(i); 			
					deleteDataList.add(deleteData);
				}
			}
			
			/*
			 * 생성된 3개의 자료구조를 DataBase에 넘겨 처리한다.
			 */

			// 이 예제는 통합통신의 동작을 확인하기 위한 샘플이므로
			// 만들어진 데이터를 화면의 fieldset 으로 보내 정상적으로 통신이 이루어졌는지 확인한다.
			String returnData = getSendData(createDataList, "C");
			returnData += getSendData(updateDataList, "U");
			returnData += getSendData(deleteDataList, "D");
			
			/*
			*  화면에 전달한ㄹ 파라미터를 설정한다.
			* */
			gdRes.addParam("MODE", "SAVE");		
			gdRes.addParam("saveData", returnData.toString());
			gdRes.setMessage("성공적으로 작업하였습니다.");
			gdRes.setStatus("true");
			
		} catch (Exception e) {
			throw e;
		}
		
		return gdRes;
	}

	private String getSendData(ArrayList sendData, String CRUDFlag) {
		
		StringBuffer sbData = new StringBuffer();
					
		for(int i = 0; i < sendData.size(); i++) {
			String[] rowData = (String[])sendData.get(i);
			for(int j = 0; j < rowData.length; j++)
				sbData.append("[" + rowData[j] + "]");
			sbData.append("<br>");
		}
			
		if (CRUDFlag.equals("C"))		
			sbData.append(sendData.size() + " 건의 데이터가 등록되었습니다..<br>");
		else if (CRUDFlag.equals("U"))	
			sbData.append(sendData.size() + " 건의 데이터가 수정되었습니다.. <br>");
		else if (CRUDFlag.equals("D"))
			sbData.append(sendData.size() + " 건의 데이터가 삭제되었습니다.. <br>");
			
		return sbData.toString();
	}
	
	public GridData doZip(GridData gdReq, int rowCount) throws Exception {
		
		GridData gdRes = new GridData();		
		
		try {	
			gdRes = OperateGridData.cloneResponseGridData(gdReq);
			TestData sd = new TestData();
			for (int i = 0; i < rowCount; i++) {
				gdRes.getHeader("CRUD").addValue("", "");
				gdRes.getHeader("SEQ_NO").addValue(String.valueOf(i), "");
				gdRes.getHeader("ITEM_FLAG").addSelectedHiddenValue(sd.getValue(0, 0));				
				gdRes.getHeader("VENDOR_NAME").addValue(sd.getValue(0, 1), "");
				gdRes.getHeader("ITEM_CODE").addValue(sd.getValue(0, 2), "", 0);
				gdRes.getHeader("ITEM_NAME").addValue(sd.getValue(0, 3), "");
				gdRes.getHeader("SPECIFICATION").addValue(sd.getValue(0, 4), "");
				gdRes.getHeader("UNIT").addSelectedHiddenValue(sd.getValue(0, 5));
				gdRes.getHeader("PRICE").addValue(sd.getValue(0, 6), "");
				gdRes.getHeader("STOCK").addValue(sd.getValue(0, 7), "");
				gdRes.getHeader("ADD_DATE").addValue(sd.getValue(0, 8), "");
				gdRes.getHeader("CHANGE_DATE").addValue(sd.getValue(0, 9), "");
			}						
			
			gdRes.setMessage("성공적으로 작업하였습니다.");
			gdRes.setStatus("true");
			gdRes.addParam("MODE", "ZIP");
			
		} catch (Exception e) {
			throw e;
		}

		return gdRes;
	}
}

