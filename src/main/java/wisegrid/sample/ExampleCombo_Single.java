package wisegrid.sample;

import wisegrid.data.SampleData;
import xlib.cmc.GridData;
import xlib.cmc.OperateGridData;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class ExampleCombo_Single extends HttpServlet {

	private static final long serialVersionUID = -419201700278107216L;

	public void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException, ServletException {
		GridData gdReq = null;
		GridData gdRes = null;

		req.setCharacterEncoding("UTF-8");
		res.setContentType("text/html;charset=UTF-8");
		
		PrintWriter out = res.getWriter();

		try {
			String rawData = req.getParameter("WISEGRID_DATA");
			
			gdReq = OperateGridData.parse(rawData);

			String mode = gdReq.getParam("mode");

			if (mode.equals("search"))
				gdRes = doQuery(gdReq);
			else if (mode.equals("insert"))
				gdRes = doInsert(gdReq); 
			else if (mode.equals("update"))
				gdRes = doUpdata(gdReq);				
			else if (mode.equals("delete"))
				gdRes = doDelete(gdReq);

		} catch (Exception e) {
			gdRes = new GridData();
			gdRes.setMessage("Error: " + e.getMessage());
			gdRes.setStatus("false");
			e.printStackTrace();
		} finally {
			try {
				OperateGridData.write(gdRes, out);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}

	public GridData doQuery(GridData gdReq) throws Exception {
		
		GridData gdRes = new GridData();		
		int rowCount = 0;

		try {

			gdRes = OperateGridData.cloneResponseGridData(gdReq);
			SampleData sd = new SampleData();
			rowCount = sd.getRowcount();


			if (rowCount == 0) {						
				gdRes.addParam("mode", "search");
				gdRes.setMessage("조회결과가 없습니다.");
				gdRes.setStatus("true");
				return gdRes;
			}


			
//			String text[] = new String[]{"프로세서","메모리","메인보드","그래픽카드","모니터","하드디스크","CDROM","키보드","마우스"};
//			String text[] = new String[]{"프로세서","메모리","메인보드","그래픽카드","모니터","하드디스크","CDROM","키보드","마우스"};
			String text[] = new String[]{"CPU","MEM","MAB","VID","MOR","HDD","CDR","KEY","MOU"};
			String hidden[] = new String[]{"CPU","MEM","MAB","VID","MOR","HDD","CDR","KEY","MOU"};
			for (int i = 0; i < rowCount; i++) {
				gdRes.getHeader("SEQ_NO").addValue(String.valueOf(i), "");
				gdRes.getHeader("SELECTED").addValue("0", "");
				

				gdRes.getHeader("ITEM_FLAG").setComboValues(text, hidden);
				gdRes.getHeader("ITEM_FLAG").addSelectedIndex(0);
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
			
			gdRes.addParam("mode", "search");
			gdRes.setMessage("성공적으로 작업하였습니다.");
			gdRes.setStatus("true");

		} catch (Exception e) {
			throw e;
		}
				
		return gdRes;
	}

	private GridData doInsert(GridData gdReq) throws Exception {
		
		GridData gdRes = new GridData();
		int rowCount = 0;
		
		String insertData = "";

		try {
			rowCount = gdReq.getHeader("SEQ_NO").getRowCount();
			String inData[][] = new String[rowCount][];

			for (int i = 0; i < rowCount; i++) {
				String Data[] = {
						gdReq.getHeader("ITEM_FLAG").getComboHiddenValues()[gdReq.getHeader("ITEM_FLAG").getSelectedIndex(i)],
						gdReq.getHeader("VENDOR_NAME").getValue(i),
						gdReq.getHeader("ITEM_CODE").getValue(i),
						gdReq.getHeader("ITEM_NAME").getValue(i),
						gdReq.getHeader("SPECIFICATION").getValue(i),
						gdReq.getHeader("UNIT").getComboHiddenValues()[gdReq.getHeader("UNIT").getSelectedIndex(i)],
						gdReq.getHeader("PRICE").getValue(i),
						gdReq.getHeader("STOCK").getValue(i) };
				inData[i] = Data;
			}
			
			insertData = getSendData(inData, "C");
			
			gdRes.addParam("mode", "insert");
			gdRes.addParam("insert_data", insertData);
			gdRes.setMessage("성공적으로 작업하였습니다.");
			gdRes.setStatus("true");

		} catch (Exception e) {
			throw e;
		}
		
		return gdRes;
	}

	private GridData doUpdata(GridData gdReq) throws Exception {

		GridData gdRes = new GridData();
		int rowCount = 0;
				
		String updatedata = "";

		try {
			rowCount = gdReq.getHeader("SEQ_NO").getRowCount();

			String inData[][] = new String[rowCount][];

			for (int i = 0; i < rowCount; i++) {
				String Data[] = {
						gdReq.getHeader("ITEM_FLAG").getComboHiddenValues()[gdReq.getHeader("ITEM_FLAG").getSelectedIndex(i)],
						gdReq.getHeader("VENDOR_NAME").getValue(i),
						gdReq.getHeader("ITEM_CODE").getValue(i),
						gdReq.getHeader("ITEM_NAME").getValue(i),
						gdReq.getHeader("SPECIFICATION").getValue(i),
						gdReq.getHeader("UNIT").getComboHiddenValues()[gdReq.getHeader("UNIT").getSelectedIndex(i)],
						gdReq.getHeader("PRICE").getValue(i),
						gdReq.getHeader("STOCK").getValue(i) };
				inData[i] = Data;
			}


			updatedata = getSendData(inData, "U");
			
			gdRes.addParam("mode", "update");
			gdRes.addParam("update_data", updatedata);
			gdRes.setMessage("성공적으로 작업하였습니다.");
			gdRes.setStatus("true");
			
		} catch (Exception e) {
			throw e;
		}
		
		return gdRes;
	}

	private GridData doDelete(GridData gdReq) throws Exception {
		
		GridData gdRes = new GridData();
		int rowCount = 0;
		
		String deleteData = "";
		
		try {
			rowCount = gdReq.getHeader("SEQ_NO").getRowCount();
			String inData[] = new String[rowCount];
			
			deleteData = getSendData2(inData);
			
			gdRes.addParam("mode", "delete");
			gdRes.addParam("delete_data", deleteData);
			gdRes.setMessage("성공적으로 작업하였습니다.");
			gdRes.setStatus("true");

		} catch (Exception e) {
			throw e;
		}
				
		return gdRes;
	}
	
	private String getSendData(String[][] sendData, String flag) {
		
		StringBuffer sbData = new StringBuffer();
					
		for(int i = 0; i < sendData.length; i++) {
			String[] rowData = sendData[i];
			for(int j = 0; j < rowData.length; j++)
				sbData.append("[" + rowData[j] + "]");
			sbData.append("\n");
		}
		
		if(flag.equals("C"))
			sbData.append(sendData.length + " 건의 데이터가 등록되었습니다..\n");
		else if(flag.equals("U"))
			sbData.append(sendData.length + " 건의 데이터가 수정되었습니다..\n");
			
		return sbData.toString();
	}
	
	private String getSendData2(String[] sendData) {
		
		StringBuffer sbData = new StringBuffer();
		
		sbData.append(sendData.length + " 건의 데이터가 삭제되었습니다..\n");
			
		return sbData.toString();
	}
}