package wisegrid.sample;

import xlib.cmc.GridData;
import xlib.cmc.OperateGridData;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class ExampleFomular extends HttpServlet
{
	/**
	 *
	 */
	private static final long serialVersionUID = 6808659505697013720L;
	public void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException, ServletException
	{
		GridData gdReq = new GridData();
		GridData gdRes = new GridData();

		res.setCharacterEncoding("UTF-8");
		req.setCharacterEncoding("UTF-8");

		PrintWriter out = res.getWriter();

		try
		{
			String rawData = req.getParameter("WISEGRID_DATA");
			gdReq = OperateGridData.parse(rawData);

			gdRes = BasicSelectQry(gdReq);
		}
		catch(Exception e)
		{
			gdRes.setMessage("Error: " + e.getMessage());
			gdRes.setStatus("false");

			e.printStackTrace();
		}
		finally
		{
			try
			{
				OperateGridData.write(gdRes, out);
			}
			catch(Exception e)
			{
				e.printStackTrace();
			}
		}

	}

	public GridData BasicSelectQry(GridData gdReq) throws Exception{
		GridData gdRes = new GridData();
		int rowCount = 0;

		try
		{



			gdRes = OperateGridData.cloneResponseGridData(gdReq);

			gdRes.getHeader("SELECTED").addValue("0", "");
			gdRes.getHeader("PRODUCT_CODE").addValue("OS00001", "");
			gdRes.getHeader("PRODUCT_NAME").addValue("Windows 98","");
			gdRes.getHeader("REG_DATE").addValue("20011207", "");
			gdRes.getHeader("STOCK_TYPE").addValue("", getStockTypeFunc(1));
			gdRes.getHeader("STOCK_QTY").addValue("315","");
			gdRes.getHeader("STOCK_PRICE").addValue("20000", "");
			gdRes.getHeader("TOT_STOCK_PRICE").addValue("",getTotalStockPriceFunc(1));
			gdRes.getHeader("SALE_QTY").addValue("250", "");
			gdRes.getHeader("SALE_PRICE").addValue("38000", "");
			gdRes.getHeader("DC_PRICE").addValue("", getDcPriceFunc(1));
			gdRes.getHeader("TOT_SALE_PRICE").addValue("", getTotalSalePriceFunc(1));
			gdRes.getHeader("SELLER").addValue("이상일", "");
			gdRes.getHeader("PRODUCT_TYPE").addValue("", prodoutTypeFunc(1));
			gdRes.getHeader("SALE_AVG_FLAG").addValue("", getSaleAvgFlag(8,1),0);

			gdRes.getHeader("SELECTED").addValue("0", "");
			gdRes.getHeader("PRODUCT_CODE").addValue("OS00002", "");
			gdRes.getHeader("PRODUCT_NAME").addValue("Windows 2000","");
			gdRes.getHeader("REG_DATE").addValue("20030117", "");
			gdRes.getHeader("STOCK_TYPE").addValue("", getStockTypeFunc(2));
			gdRes.getHeader("STOCK_QTY").addValue("470","");
			gdRes.getHeader("STOCK_PRICE").addValue("40000", "");
			gdRes.getHeader("TOT_STOCK_PRICE").addValue("",getTotalStockPriceFunc(2));
			gdRes.getHeader("SALE_QTY").addValue("415", "");
			gdRes.getHeader("SALE_PRICE").addValue("45000", "");
			gdRes.getHeader("DC_PRICE").addValue("", getDcPriceFunc(2));
			gdRes.getHeader("TOT_SALE_PRICE").addValue("", getTotalSalePriceFunc(2));
			gdRes.getHeader("SELLER").addValue("김민준", "");
			gdRes.getHeader("PRODUCT_TYPE").addValue("", prodoutTypeFunc(2));
			gdRes.getHeader("SALE_AVG_FLAG").addValue("", getSaleAvgFlag(8,2),0);

			gdRes.getHeader("SELECTED").addValue("0", "");
			gdRes.getHeader("PRODUCT_CODE").addValue("OS00003", "");
			gdRes.getHeader("PRODUCT_NAME").addValue("Windows XP","");
			gdRes.getHeader("REG_DATE").addValue("20040527", "");
			gdRes.getHeader("STOCK_TYPE").addValue("", getStockTypeFunc(3));
			gdRes.getHeader("STOCK_QTY").addValue("1200","");
			gdRes.getHeader("STOCK_PRICE").addValue("48000", "");
			gdRes.getHeader("TOT_STOCK_PRICE").addValue("",getTotalStockPriceFunc(3));
			gdRes.getHeader("SALE_QTY").addValue("920", "");
			gdRes.getHeader("SALE_PRICE").addValue("55000", "");
			gdRes.getHeader("DC_PRICE").addValue("", getDcPriceFunc(3));
			gdRes.getHeader("TOT_SALE_PRICE").addValue("", getTotalSalePriceFunc(3));
			gdRes.getHeader("SELLER").addValue("이상일", "");
			gdRes.getHeader("PRODUCT_TYPE").addValue("", prodoutTypeFunc(3));
			gdRes.getHeader("SALE_AVG_FLAG").addValue("", getSaleAvgFlag(8,3),0);

			gdRes.getHeader("SELECTED").addValue("0", "");
			gdRes.getHeader("PRODUCT_CODE").addValue("CM00001", "");
			gdRes.getHeader("PRODUCT_NAME").addValue("WiseGrid4.6","");
			gdRes.getHeader("REG_DATE").addValue("20060101", "");
			gdRes.getHeader("STOCK_TYPE").addValue("", getStockTypeFunc(4));
			gdRes.getHeader("STOCK_QTY").addValue("5200","");
			gdRes.getHeader("STOCK_PRICE").addValue("30000", "");
			gdRes.getHeader("TOT_STOCK_PRICE").addValue("",getTotalStockPriceFunc(4));
			gdRes.getHeader("SALE_QTY").addValue("820", "");
			gdRes.getHeader("SALE_PRICE").addValue("72000", "");
			gdRes.getHeader("DC_PRICE").addValue("", getDcPriceFunc(4));
			gdRes.getHeader("TOT_SALE_PRICE").addValue("", getTotalSalePriceFunc(4));
			gdRes.getHeader("SELLER").addValue("이상일", "");
			gdRes.getHeader("PRODUCT_TYPE").addValue("", prodoutTypeFunc(4));
			gdRes.getHeader("SALE_AVG_FLAG").addValue("", getSaleAvgFlag(8,4),0);

			gdRes.getHeader("SELECTED").addValue("0", "");
			gdRes.getHeader("PRODUCT_CODE").addValue("CM00002", "");
			gdRes.getHeader("PRODUCT_NAME").addValue("WiseGrid5.0","");
			gdRes.getHeader("REG_DATE").addValue("20090927", "");
			gdRes.getHeader("STOCK_TYPE").addValue("", getStockTypeFunc(5));
			gdRes.getHeader("STOCK_QTY").addValue("6000","");
			gdRes.getHeader("STOCK_PRICE").addValue("40000", "");
			gdRes.getHeader("TOT_STOCK_PRICE").addValue("",getTotalStockPriceFunc(5));
			gdRes.getHeader("SALE_QTY").addValue("1220", "");
			gdRes.getHeader("SALE_PRICE").addValue("80000", "");
			gdRes.getHeader("DC_PRICE").addValue("", getDcPriceFunc(5));
			gdRes.getHeader("TOT_SALE_PRICE").addValue("", getTotalSalePriceFunc(5));
			gdRes.getHeader("SELLER").addValue("이상일", "");
			gdRes.getHeader("PRODUCT_TYPE").addValue("", prodoutTypeFunc(5));
			gdRes.getHeader("SALE_AVG_FLAG").addValue("", getSaleAvgFlag(8,5),0);

			gdRes.getHeader("SELECTED").addValue("0", "");
			gdRes.getHeader("PRODUCT_CODE").addValue("CM00003", "");
			gdRes.getHeader("PRODUCT_NAME").addValue("FusionCharts","");
			gdRes.getHeader("REG_DATE").addValue("20090512", "");
			gdRes.getHeader("STOCK_TYPE").addValue("", getStockTypeFunc(6));
			gdRes.getHeader("STOCK_QTY").addValue("310","");
			gdRes.getHeader("STOCK_PRICE").addValue("22000", "");
			gdRes.getHeader("TOT_STOCK_PRICE").addValue("",getTotalStockPriceFunc(6));
			gdRes.getHeader("SALE_QTY").addValue("305", "");
			gdRes.getHeader("SALE_PRICE").addValue("32000", "");
			gdRes.getHeader("DC_PRICE").addValue("", getDcPriceFunc(6));
			gdRes.getHeader("TOT_SALE_PRICE").addValue("", getTotalSalePriceFunc(6));
			gdRes.getHeader("SELLER").addValue("김민준", "");
			gdRes.getHeader("PRODUCT_TYPE").addValue("", prodoutTypeFunc(6));
			gdRes.getHeader("SALE_AVG_FLAG").addValue("", getSaleAvgFlag(8,6),0);

			gdRes.getHeader("SELECTED").addValue("0", "");
			gdRes.getHeader("PRODUCT_CODE").addValue("OF00001", "");
			gdRes.getHeader("PRODUCT_NAME").addValue("Office 2003","");
			gdRes.getHeader("REG_DATE").addValue("20090622", "");
			gdRes.getHeader("STOCK_TYPE").addValue("", getStockTypeFunc(7));
			gdRes.getHeader("STOCK_QTY").addValue("541","");
			gdRes.getHeader("STOCK_PRICE").addValue("22000", "");
			gdRes.getHeader("TOT_STOCK_PRICE").addValue("",getTotalStockPriceFunc(7));
			gdRes.getHeader("SALE_QTY").addValue("245", "");
			gdRes.getHeader("SALE_PRICE").addValue("50000", "");
			gdRes.getHeader("DC_PRICE").addValue("", getDcPriceFunc(7));
			gdRes.getHeader("TOT_SALE_PRICE").addValue("", getTotalSalePriceFunc(7));
			gdRes.getHeader("SELLER").addValue("김대환", "");
			gdRes.getHeader("PRODUCT_TYPE").addValue("", prodoutTypeFunc(7));
			gdRes.getHeader("SALE_AVG_FLAG").addValue("", getSaleAvgFlag(8,7),0);

			gdRes.getHeader("SELECTED").addValue("0", "");
			gdRes.getHeader("PRODUCT_CODE").addValue("OF00002", "");
			gdRes.getHeader("PRODUCT_NAME").addValue("Office 2007","");
			gdRes.getHeader("REG_DATE").addValue("20090827", "");
			gdRes.getHeader("STOCK_TYPE").addValue("", getStockTypeFunc(8));
			gdRes.getHeader("STOCK_QTY").addValue("765","");
			gdRes.getHeader("STOCK_PRICE").addValue("50000", "");
			gdRes.getHeader("TOT_STOCK_PRICE").addValue("",getTotalStockPriceFunc(8));
			gdRes.getHeader("SALE_QTY").addValue("681", "");
			gdRes.getHeader("SALE_PRICE").addValue("54000", "");
			gdRes.getHeader("DC_PRICE").addValue("", getDcPriceFunc(8));
			gdRes.getHeader("TOT_SALE_PRICE").addValue("", getTotalSalePriceFunc(8));
			gdRes.getHeader("SELLER").addValue("김대환", "");
			gdRes.getHeader("PRODUCT_TYPE").addValue("", prodoutTypeFunc(8));
			gdRes.getHeader("SALE_AVG_FLAG").addValue("", getSaleAvgFlag(8,8),0);

		}
		catch(Exception e)
		{
			throw e;
		}

		if(rowCount==0)
			gdRes.setMessage("조회된 데이터가 없습니다.");
		else
			gdRes.setMessage("성공적으로 작업하였습니다.");

		gdRes.addParam("MODE", "S");
		gdRes.setStatus("true");

		return gdRes;
	}

	private String getStockTypeFunc(int currentRow){
		return "=if(F"+currentRow+">500;\"대량\";\"소량\")";
	}
	private String getTotalStockPriceFunc(int currentRow){
		return "=(F"+currentRow+"*G"+currentRow+")";
	}
	private String getDcPriceFunc(int currentRow){
		return "=round(J"+currentRow+"*75%;0)";
	}
	private String getTotalSalePriceFunc(int currentRow){
		return "=(I"+currentRow+"*K"+currentRow+")";
	}
	private String prodoutTypeFunc(int currentRow){
		String productTypeIndex = "if(left(B"+currentRow+";2)=\"OS\";1;if(left(B"+currentRow+";2)=\"CM\";2;if(left(B"+currentRow+";2)=\"OF\";3)))";
		return "=choose("+productTypeIndex+";\"운영체제\";\"컴포넌트\";\"오피스\")";
	}
	private String getSaleAvgFlag(int totalRowCount,int currentRow){
		return "=if(average(L1:L"+totalRowCount+")<=L"+currentRow+";\"평균이상\";\"평균이하\")";
	}
}
