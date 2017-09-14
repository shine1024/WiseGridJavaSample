package wisegrid.data;

/**
 * Multi Combo 예제용 데이터
 * @author iCOMPIA CORP.
 */
public class MulticomboData {
	
	String[][] multicombo_data = {{"C" , "C1" , "N1" , "삼성 노트북 sens R70A /w251 가방쿠폰/광마우스/패드 증정" , "삼성전자 " , "pcstaion" , "1804950"},
			{"C" , "C1" , "N9" , "MackBook MB403KH/A" , "Apple" , "노트북 프라자 " , "1321370"},
			{"C" , "C2" , "A1" , "울프데일 E8400  2G램 인텔 945 FX8600GT -512M 삼성 250G " , "Feel.N" , "Feel-N" , "489000"},
			{"C" , "C3" , "D2" , "DB-Z68/Z200" , "삼성전자 " , "noteprime" , "2000000"},
			{"M" , "M1" , "M4" , "e-zone 220WT [55.88cm(22)]" , "다비디스플레이" , "다비디스플레이" , "257200"},
			{"M" , "M1" , "M11" , "ZEUS7000 240MA-8FD(P) DELUXE" , "비티씨정보통신" , "icarus" , "619000"},
			{"M" , "M1" , "M11" , "LG 플래트론 W1952TQ-PF" , "LG" , "net-market" , "245000"},
			{"M" , "M1" , "M3" , "싱크마스터 2243BWX 22인치 와이드 LCD" , "삼성전자 " , "EROOM" , "325980"},
			{"P" , "P1" , "IC1" , "HP F2180 HP 복합기" , "HP" , "일반" , "49600"},
			{"P" , "P1" , "IC3" , "삼성 복합기 1455I" , "삼성전자 " , "강력추천상품" , "45000"},
			{"P" , "P2" , "IP1" , "HP K5300 비지니스젯 K5300" , "HP" , "주)라인몰" , "110300"},
			{"P" , "P4" , "LP2" , "캐논 CANON LBP5000 레이저 프린터" , "캐논코리아" , "사이버정보넷" , "238400"},
			{"P" , "P3" , "LC4" , "신도리코 DGWOX1020본체" , "신도리코" , "오피스천사" , "1390000"},
			{"P" , "P3" , "LC3" , "삼성 SCX-4210 흑백 레이저 복합기" , "삼성전자 " , "하드피아" , "146380"},
			{"C" , "C3" , "D4" , "LG XPON X270KN-A2MADE E2180/1G/250G" , "LG" , "PCSAZA" , "544890"},
			{"C" , "C3" , "D1" , "운수대통 E46M 본체 E4600/DDR2G/250G/GE8400/COMBO" , "JOOYON" , "컴퓨터특가팀" , "565780"},
			{"M" , "M1" , "M13" , "현대아이티 N200W 무결점 글레어 코팅 " , "현대아이티" , "letsgopc" , "209000"},
			{"M" , "M1" , "M11" , "FLATRON W2252TQ-PF  22인치 와이드 LCD 모니터" , "LG" , "EROOM" , "319000"},
			{"P" , "P4" , "LP4" , "후지제록스 DocuPrint 203A 흑백레이저프린터 " , "후지제록스" , "디지털LCD" , "87000"},
			{"C" , "C1" , "N4" , "Satelite A200-0V900H 산타로사RF/코어2듀오-2.5G/2G램/240G" , "도시바" , "노트북&컴퓨터" , "1397000"}};
    
   public MulticomboData() {	 
   }	
   
   /* 데이터의 row 수 */  
	public int getRowcount() {
		return multicombo_data.length;
	}
	
	/* 데이터의 값 */
	public String GetValue(int row, int col){
		return multicombo_data[row][col];	
	}

}
