days = ["SUN","MON","TUE","WED","THU","FRI","SAT"];
months=["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
months_length=new Array("31","28","31","30","31","30","31","31","30","31","30","31");
var d = new Date();
var mon = d.getMonth();
var year = d.getYear()+1900;

function printMonth(){
	document.write(months[4]);
}
function fill_table(){
	document.write("<div id='main'>");
	document.write("<TABLE BORDER='1'><TR>");
	document.write("<TD><button type='button' onClick='prev_action();'>Prev</button</TD>");
	document.write("<TD id='td_mon' colspan='2'></TD>");
	document.write("<TD id='td_year' colspan='3'></TD>");
	document.write("<TD><button type='button' onClick='next_action();'>Next</button</TD>");
	document.write("</TR>");
	print_week_day();
	create_date_table();
	document.write("</TABLE>");
	document.write("</div>")
	set_date_content(mon,year);
}

// function make_month_selector(){
// 	document.write("<SELECT id='ddl_month' onChange='setMonth();'>");
// 	for(i=0;i<months.length;i++){
// 		if(i==mon)
// 			document.write("<OPTION SELECTED='selected' value="+i+">"+months[i]+"</OPTION>");
// 		else
// 			document.write("<OPTION value="+i+">"+months[i]+"</OPTION>");
// 	}
// 	document.write("</SELECT>")
// }

function build_month_list(){
	var res = "<SELECT id='ddl_month' onChange='setMonth();'>";
	for(i=0;i<months.length;i++){
		if(i==mon)
			res+="<OPTION SELECTED='selected' value="+i+">"+months[i]+"</OPTION>";
		else
			res+="<OPTION value="+i+">"+months[i]+"</OPTION>";
	}
	res+="</SELECT>"
	return res;
}
function build_year_list(){
	var res="<SELECT id='ddl_year' onChange='setYear();'>";
	for(i=1950;i<=2015;i++){
		if(year==i)
			res+="<OPTION SELECTED='selected' value="+i+">"+i+"</OPTION>";
		else
			res+="<OPTION value="+i+">"+i+"</OPTION>";
	}
	res+="</SELECT>";
	return res;
}
// function make_year_selector(){
// 	document.write("<SELECT id='ddl_year' onChange='setYear();'>");
// 	for(i=1950;i<=2015;i++){
// 		if(year==i)
// 			document.write("<OPTION SELECTED='selected' value="+i+">"+i+"</OPTION>");
// 		else
// 			document.write("<OPTION value="+i+">"+i+"</OPTION>");
// 	}
// 	document.write("</SELECT>");
// }
function print_week_day(){
	document.write("<TR>");
	for(i =0;i<days.length;i++){
		document.write("<TD class='day'>");
		document.write(days[i]);
		document.write("</TD>");
	}
	document.write("</TR>");
}

function create_date_table(){
	var count=0;
	for(i=0;i<6;i++){
		document.write("<TR>");
		for(j=0;j<7;j++){
			document.write("<TD id='cell"+count+"'></TD>");
			count++;
		}
		document.write("</TR>")
	}
}

function set_date_content(mon, year){
	
	//-----------REFRESH DROPDOWNLIST

	document.getElementById("td_mon").innerHTML = build_month_list();
	document.getElementById("td_year").innerHTML = build_year_list();
	
	//----------------------------------------------
	

	var first_date = new Date(year,mon,1);
	var of_day = first_date.getDay();
	console.log("Start Day: "+days[of_day]);
	var mon_length = months_length[mon];
	var check = false;
	console.log("MONTH LENGHT OF "+months[mon]+": "+months_length[mon]);
	var start =1;

	//--------------------------------------------------------
	var today = new Date();
	var td = today.getDate();
	var ty = today.getYear()+1900;
	var tm = today.getMonth();
	

	//-----------------------------------
	for(i =0;i<42;i++){
		if(i==of_day) 
			check=true;
		if(check==true&&start<=mon_length){
			if(td==start&&tm==mon&&ty==year){
				document.getElementById("cell"+i).innerHTML=start;
				document.getElementById("cell"+i).style.background = "#62B0DF";
			}
			else{
				document.getElementById("cell"+i).style.background = "#FFFFFF";
				document.getElementById("cell"+i).innerHTML=start;
			}
			start++;
		}
		else
			document.getElementById("cell"+i).innerHTML="";
	}
}
function setYear(){
	var e = document.getElementById("ddl_year");
	year = e.options[e.selectedIndex].value;
	console.log("SELECTED YEAR: "+year);
	set_date_content(mon,year);
}
function setMonth(){
	var e = document.getElementById("ddl_month");
	mon = e.options[e.selectedIndex].value;
	console.log("SELECTED MON: "+months[mon]);
	set_date_content(mon,year);
}
function next_action(){
	if(mon>=0&&mon<11)
		mon++;
	else
		mon=0;
	set_date_content(mon,year);
}
function prev_action(){
	if(mon<=11&&mon>0)
		mon--;
	else
		mon=11;
	set_date_content(mon,year);
}
