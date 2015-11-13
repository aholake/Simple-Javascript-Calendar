days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]; 
months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]; 
months_length = new Array("31", "28", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31"); 
var d = new Date(); 
var mon = d.getMonth(); 
var year = d.getYear() + 1900; 

function printMonth() {
	document.write(months[4]); 
}
function fillTable() {
	document.write("<div id = 'main' style = 'display:none; '>"); 
	document.write("<TABLE BORDER = '1'><TR>"); 
	document.write("<TD><button type = 'button' onClick = 'prevAction(); '>Prev</button</TD>"); 
	document.write("<TD id = 'td_mon' colspan = '2'></TD>"); 
	document.write("<TD id = 'td_year' colspan = '3'></TD>"); 
	document.write("<TD><button type = 'button' onClick = 'nextAction(); '>Next</button</TD>"); 
	document.write("</TR>"); 
	printWeekDay(); 
	createDateTable(); 
	document.write("</TABLE>"); 
	document.write("</div>")
	setDateContent(mon, year); 
}

function buildMonthList() {
	var res ="<SELECT id = 'ddl_month' onChange = 'setMonth(); '>"; 
	for(i = 0;  i < months.length;  i++) {
		if(i == mon)
			res  +="<OPTION SELECTED = 'selected' value =" + i +">" + months[i] +"</OPTION>"; 
		else
			res  +="<OPTION value =" + i +">" + months[i] +"</OPTION>"; 
	}
	res +="</SELECT>"
	return res; 
}
function buildYearList() {
	var res ="<SELECT id = 'ddl_year' onChange = 'setYear(); '>"; 
	for(i = 1950; i <=  2015; i++) {
		if(year == i)
			res  +="<OPTION SELECTED = 'selected' value =" + i  +">" + i +"</OPTION>"; 
		else
			res  +="<OPTION value =" + i +">" + i +"</OPTION>"; 
	}
	res +="</SELECT>"; 
	return res; 
}

function printWeekDay() {
	document.write("<TR>"); 
	for(i = 0; i<days.length; i++) {
		document.write("<TD class = 'day'>"); 
		document.write(days[i]); 
		document.write("</TD>"); 
	}
	document.write("</TR>"); 
}

function createDateTable() {
	var count = 0; 
	for(i = 0; i < 6; i++) {
		document.write("<TR>"); 
		for(j = 0; j < 7; j++) {
			document.write("<TD><a href = '#' id = 'cell" + count +"' onClick = 'onClickDate(this)'></a></TD>"); 
			count++; 
		}
		document.write("</TR>")
	}
}
/*
* 
*/
function setDateContent(mon,  year) {
	
	//-----------REFRESH DROPDOWNLIST

	document.getElementById("td_mon").innerHTML = buildMonthList(); 
	document.getElementById("td_year").innerHTML = buildYearList(); 
	
	var first_date = new Date(year, mon, 1); 
	var of_day = first_date.getDay(); 
	console.log("Start Day:" + days[of_day]); 
	var mon_length = months_length[mon]; 
	var check = false; 
	console.log("MONTH LENGHT OF" + months[mon] + ":" + months_length[mon]); 
	var start = 1; 

	var today = new Date(); 
	var td = today.getDate(); 
	var ty = today.getYear() + 1900; 
	var tm = today.getMonth(); 
	

	for(i = 0; i < 42; i++) {
		if(i == of_day) 
			check = true; 
		if(check == true && start <=  mon_length) {
			if(td == start && tm == mon && ty == year) {
				document.getElementById("cell" + i).innerHTML = start; 
				document.getElementById("cell" + i).style.color = "red"; 
			}
			else {
				document.getElementById("cell" + i).style.color = "#2582BE"; 
				document.getElementById("cell" + i).innerHTML = start; 
			}
			start++; 
		}
		else
			document.getElementById("cell" + i).innerHTML = ""; 
	}
}
function setYear() {
	var e = document.getElementById("ddl_year"); 
	year = e.options[e.selectedIndex].value; 
	console.log("SELECTED YEAR:" + year); 
	setDateContent(mon, year); 
}
function setMonth() {
	var e = document.getElementById("ddl_month"); 
	mon = e.options[e.selectedIndex].value; 
	console.log("SELECTED MON:" + months[mon]); 
	setDateContent(mon, year); 
}
function nextAction() {
	if(mon >= 0 && mon < 11)
		mon++; 
	else
		mon = 0; 
	setDateContent(mon, year); 
}
function prevAction() {
	if(mon <=  11 && mon > 0) {
		mon--; 
	}
	else{
		mon = 11; 
	}
	setDateContent(mon, year); 
}
function onClickDate(a) {
	var str = a.innerHTML  + "/" + (parseInt(mon) + 1) + "/" + year; 
	document.getElementById("date-input-text").value = str; 
	document.getElementById("main").style.display = "none"; 
}
function onClickCal() {
	document.getElementById("main").style.display = "block"; 
}
