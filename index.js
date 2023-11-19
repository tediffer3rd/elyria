
//set arrays
var seasons = ["Sepren (equinox)", "Somner (solstice)", "Autun (equinox)", "Wevner (sostice)"];
var sunPhase = ["equinox", "solstice", "equinox", "solstice"];
var months = ["Solaris", "Seprensdor", "Fonsoc", "Ganrehm", "Calidum", "Somnercrest", "Aesoc", "Jehmri", "Lunaris", "Autunsveil", "Cadoc", "Nehnma", "Frigus", "Wevnercrest", "Hemoc", "Duhmret"];
var time = ["Noon", "1 pm", "2 pm", "3 pm", "4 pm", "5 pm", "6 pm", "7 pm", "8 pm", "9 pm", "10 pm", "11 pm", "Midnight", "1 am", "2 am", "3 am", "4 am", "5 am", "6 am", "7 am", "8 am", "9 am", "10 am", "11 am" ];
var timeOfDay = ["Noon", "early afternoon", "afternoon", "late afternoon", "early evening", "evening", "late evening", "early night", "late night", "midnight", "early morning", "morning", "late monrning"];
var dayNums = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32"];
var weekdays = ["Nehrdas", "Jahdas", "Gahldas", "Dehrdas", "Elimdas", "Iadas", "Zepdas", "Makdas", "Nehrdas", "Jahdas", "Gahldas", "Dehrdas", "Elimdas", "Iadas", "Zepdas", "Makdas", "Nehrdas", "Jahdas", "Gahldas", "Dehrdas", "Elimdas", "Iadas", "Zepdas", "Makdas", "Nehrdas", "Jahdas", "Gahldas", "Dehrdas", "Elimdas", "Iadas", "Zepdas", "Makdas"];
var easyDays = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelfth', 'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth', 'seventeenth', 'eighteenth', 'nineteenth', 'twnetieth', 'twenty-first', 'twenty-second', 'twenty-third', 'twenty-fourth', 'twenty-fifth', 'twenty-sixth', 'twenty-seventh', 'twenty-eighth', 'twenty-ninth','thitieth', 'thirty-first', 'thirty-second'];
var blankArray = []

var data =  [
	Array.from(timeOfDay).map(String),
	Array.from(dayNums).map(String),
	Array.from(months).map(String),
	Array.from(seasons).map(String),
	]

//set variables for calendar
var xOrigin = 450;
var yOrigin = 450;
var numPaths = (data.length+1); // data.length = number of arrays
var yoffset = yOrigin / numPaths;
var circleYoffset = yoffset;
var textYoffset = yoffset/2;
var yEnd = yOrigin - (yOrigin / numPaths);
var circleNum = 1;
var compassLineRotateAngle = 45;
var compassLineRotate = 0;
var r = document.querySelector(':root');
var rs = getComputedStyle(r);

// create div element to hold clock
var clock = document.createElement('div');
	clock.setAttribute("id", "clock");
	document.body.appendChild(clock);

// create circular div element to hold svg
var calendar = document.createElement('div');
	calendar.setAttribute("id", "calendar");
	document.body.appendChild(calendar);

//create svg container
var svg1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svg1.setAttribute("id", "svg1");
	svg1.setAttribute("height", (yOrigin * 2));
	svg1.setAttribute("width" , (xOrigin * 2.125));
	calendar.appendChild(svg1);

// create big red circle
var bigRedCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
	bigRedCircle.setAttribute("id", "bigRedCircle");
	bigRedCircle.setAttribute("cx",xOrigin);
	bigRedCircle.setAttribute("cy",yOrigin);
	bigRedCircle.setAttribute("r",xOrigin);
//	svg1.appendChild(bigRedCircle);

// create large dot in middle of big circle
var littleBlackDot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
	littleBlackDot.setAttribute("id", "littleBlackDot");
	littleBlackDot.setAttribute("cx", xOrigin);
	littleBlackDot.setAttribute("cy", yOrigin);
	littleBlackDot.setAttribute("r", circleYoffset);
	littleBlackDot.setAttribute("fill", "#000000");
	svg1.appendChild(littleBlackDot);

// create small dot in middle of large dot
var centerCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
	centerCircle.setAttribute("id", "centerCircle");
	centerCircle.setAttribute("cx", xOrigin);
	centerCircle.setAttribute("cy", yOrigin);
	centerCircle.setAttribute("r", "30");
	centerCircle.setAttribute("fill", "#000000");
	svg1.appendChild(centerCircle);

// create 8 cardinal compass lines
for (var i = 1; i <= 4; i ++) {
	var compassLines = document.createElementNS("http://www.w3.org/2000/svg", "line");
	compassLines.setAttribute("id", "line" + (i+1));
	compassLines.setAttribute("x1", "400");
	compassLines.setAttribute("y1", "0");
	compassLines.setAttribute("x2", "400");
	compassLines.setAttribute("y2", "800");
//	svg1.appendChild(compassLines);
	compassLines.setAttribute("transform", "rotate(" + compassLineRotate + ", 400, 400)");
	compassLineRotate += compassLineRotateAngle;
}

// begin iterating through arrays
for (var i = 0; i < data.length; i ++) {
	var dataItem = data[i];

// set variables for segments & rotation
		var numSegments = dataItem.length;
		var rotateAngle = 360/numSegments;
		var textRotate = rotateAngle/2;
		var textLineRotate = rotateAngle;
		var rad1 = xOrigin - circleYoffset;
		var circum1 = rad1 * 2 * 3.14;
		var pointerBottom = circum1 / numSegments;
		var rad2 = xOrigin - circleYoffset + yoffset;
		var circum2 = rad2 * 2 * 3.14;
		var pointerTop = circum2 / numSegments;
		
//set id n ames bases on itteration
	if (i == 0) {
		var ID = "time";
		var pointerLinePath = "M " + xOrigin + " " + (circleYoffset) + ",a " + rad1 + " " + rad1 + " 0 0 1 " + (pointerBottom) + " " + (12) + ", l " + (22) + " -" + (yoffset-2) + ", a " + rad2 + " " + rad2 + " 0 0 0 " + (-pointerTop) + " " + (-15) + ", l 0 " + (yoffset) + " Z";  
		} else if (i == 1) {
		var ID = "days";
		var pointerLinePath = "M " + xOrigin + " " + (circleYoffset) + ",a " + rad1 + " " + rad1 + " 0 0 1 " + (pointerBottom) + " " + (5)  + ", l " + (17) + " -" + (yoffset-3)   + ", a " + rad2 + " " + rad2 + " 0 0 0 " + (-pointerTop) + " " + (-7) + ", l 0 " + " " + (yoffset) + " Z";
		} else if (i == 2) {
		var ID = "months";
		var pointerLinePath = "M " + xOrigin + " " + (circleYoffset) + ",a " + rad1 + " " + rad1 + " 0 0 1 " + (pointerBottom-1) + " " + (15) + ", l " + (33) + " -" + (yoffset-7) + ", a " + rad2 + " " + rad2 + " 0 0 0 " + (-pointerTop+3) + " " + (-20) + ", l 0 " + " " + (yoffset) + " Z"; 
		} else if (i == 3) {
		var ID = "seasons";
		var pointerLinePath = "M " + xOrigin + " " + (circleYoffset) + ",a " + rad1 + " " + rad1 + " 0 0 1 " + (yoffset) + " " + (yoffset)  + ", l " + (yoffset-1) + " -" + (0)    + ", a " + rad2 + " " + rad2 + " 0 0 0 " + (-yoffset*2) + " " + (-yoffset*2) + ", l 0 " + " " + (yoffset) + " Z"; 
		} else {
	}

// create path dividing circles
	var dividingCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
		dividingCircle.setAttribute("id", ID + "circle" + i);
		dividingCircle.setAttribute("cx",xOrigin);
		dividingCircle.setAttribute("cy",yOrigin);
		dividingCircle.setAttribute("r", (yOrigin - circleYoffset));
		svg1.appendChild(dividingCircle);

	// create pointer lines
	var pointerLine = document.createElementNS("http://www.w3.org/2000/svg", "path");
		pointerLine.setAttribute("id", "pointerLine" + ID);
		pointerLine.setAttribute("class", "pointerLine");
		pointerLine.setAttribute("d", pointerLinePath);
	svg1.appendChild(pointerLine);

// itterate through the contents of the array
		for (var j = 0; j < dataItem.length; j ++) {
			var textDataContent = dataItem[j];

// create lines between text elements			
			var textLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
			textLine.setAttribute("id", ID + "textLine" + j);
			textLine.setAttribute("x1", xOrigin);
			textLine.setAttribute("y1", circleYoffset);
			textLine.setAttribute("x2", xOrigin);
			textLine.setAttribute("y2", (circleYoffset - yoffset));
			textLine.setAttribute("transform", "rotate(" + textLineRotate + " " + xOrigin + ", " + yOrigin + ")");
			svg1.appendChild(textLine);
			
//create text elements
			var textJG = document.createElementNS("http://www.w3.org/2000/svg", "g");
			textJG.setAttribute("transform", "rotate(" + textRotate + " " + xOrigin + ", " + yOrigin + ")");
			svg1.appendChild(textJG);
			
			var textJ = document.createElementNS("http://www.w3.org/2000/svg", "text");
			textJ.setAttribute("id", ID + "textJ0" + (j+1));
			textJ.setAttribute("class", "textJ");
			textJ.setAttribute("x", xOrigin);
			textJ.setAttribute("y", textYoffset);
			textJ.setAttribute("fill", "#ffffff");
			textJ.setAttribute("text-anchor", "middle");
			textJ.setAttribute("alignment-baseline", "middle");
			textJ.setAttribute("onclick", "clickData(this.id)");
			textJ.appendChild(document.createTextNode(textDataContent));
			textJG.appendChild(textJ);

			var textJBBox = textJ.getBBox();
			textJ.setAttribute("transform", "rotate(" + (-textRotate) + " " + (textJBBox.x+(textJBBox.width/2)) + " " + (textJBBox.y+(textJBBox.height/2)) + ")");
			textLineRotate += rotateAngle
			textRotate += rotateAngle
		}
		textYoffset += yoffset;
		circleYoffset += yoffset;
}

// check whether the 'saveDate' data item is stored in web Storage
if(localStorage.getItem('saveDate')) {
	var savedDate = localStorage.getItem('saveDate');
	document.getElementById('inputDate').value=savedDate;
}

// check whether the 'status' data item is stored in web Storage
if(localStorage.getItem('saveStatus')) {
	var status = localStorage.getItem('saveStatus');
	document.getElementById('displayStatus').value=status;
}

// set date to what is shown in the input window
function setDate() {
	var currentDate = document.getElementById('inputDate').value;
	var month = Number(currentDate.slice(0,2));
	var day = Number(currentDate.slice(-2));
	var season = Number(Math.ceil(month/4));
	var weekday = weekdays[day-1];
	var currentTime = localStorage.getItem('saveTime');
	var tod = 0
	if (currentTime == 1) {var tod = "Noon"} else if (currentTime < 13) {var tod = currentTime-1 + " pm"} else if (currentTime == 13) {var tod = "Midnight"} else if (currentTime > 12) {var tod = (currentTime-13) + " am"};
	document.getElementById('displayDate').innerHTML = 'Today is: ' + weekday + ', the ' + easyDays[day-1] + ' of ' + months[month-1] + ',<br> in the season of ' + seasons[season-1];
	document.getElementById('displayTime').innerHTML = 'The time of day is approximately ' + tod;
//	document.getElementById('displayStatus').innerHTML = 'Current status: <br>' + status;
	seasonsRotation = (360/4 * season)-((360/4));
	monthsRotation = (360/16 * month)-((360/16));
	daysRotation = (360/32 * day)-((360/32));
	timeRotation = (360/24 * currentTime)-((360/24));
	pointerLineseasons.setAttribute("transform", "rotate(" + seasonsRotation + " 450 450)");
	pointerLinemonths.setAttribute("transform", "rotate(" + monthsRotation + " 450 450)");
	pointerLinedays.setAttribute("transform", "rotate(" + daysRotation + " 450 450)");
	pointerLinetime.setAttribute("transform", "rotate(" + timeRotation + " 450 450)");
	localStorage.setItem('saveDate', currentDate);
	// change backgroundColor based on month
	if (month == 1) {r.style.setProperty("--gradColor1", "#00A62644"); r.style.setProperty("--gradColor3", "#00A626"); r.style.setProperty("--gradColor2", "#CC180044"); r.style.setProperty("--gradColor4", "#CC1800")} else
	if (month == 2) {r.style.setProperty("--gradColor1", "#26CC0044"); r.style.setProperty("--gradColor3", "#26CC00"); r.style.setProperty("--gradColor2", "#BA001244"); r.style.setProperty("--gradColor4", "#BA0012")} else
	if (month == 3) {r.style.setProperty("--gradColor1", "#73CC0044"); r.style.setProperty("--gradColor3", "#73CC00"); r.style.setProperty("--gradColor2", "#93003844"); r.style.setProperty("--gradColor4", "#930038")} else
	if (month == 4) {r.style.setProperty("--gradColor1", "#BFCC0044"); r.style.setProperty("--gradColor3", "#BFCC00"); r.style.setProperty("--gradColor2", "#6D005E44"); r.style.setProperty("--gradColor4", "#6D005E")} else
	if (month == 5) {r.style.setProperty("--gradColor1", "#CCB60044"); r.style.setProperty("--gradColor3", "#CCB600"); r.style.setProperty("--gradColor2", "#46008544"); r.style.setProperty("--gradColor4", "#460085")} else
	if (month == 6) {r.style.setProperty("--gradColor1", "#CC9A0044"); r.style.setProperty("--gradColor3", "#CC9A00"); r.style.setProperty("--gradColor2", "#1F00AD44"); r.style.setProperty("--gradColor4", "#1F00AD")} else
	if (month == 7) {r.style.setProperty("--gradColor1", "#CC7B0044"); r.style.setProperty("--gradColor3", "#CC7B00"); r.style.setProperty("--gradColor2", "#000DBF44"); r.style.setProperty("--gradColor4", "#000DBF")} else
	if (month == 8) {r.style.setProperty("--gradColor1", "#CC4A0044"); r.style.setProperty("--gradColor3", "#CC4A00"); r.style.setProperty("--gradColor2", "#00597444"); r.style.setProperty("--gradColor4", "#005974")} else
	if (month == 9) {r.style.setProperty("--gradColor1", "#CC180044"); r.style.setProperty("--gradColor3", "#CC1800"); r.style.setProperty("--gradColor2", "#00A62644"); r.style.setProperty("--gradColor4", "#00A626")} else
	if (month ==10) {r.style.setProperty("--gradColor1", "#BA001244"); r.style.setProperty("--gradColor3", "#BA0012"); r.style.setProperty("--gradColor2", "#26CC0044"); r.style.setProperty("--gradColor4", "#26CC00")} else
	if (month ==11) {r.style.setProperty("--gradColor1", "#93003844"); r.style.setProperty("--gradColor3", "#930038"); r.style.setProperty("--gradColor2", "#73CC0044"); r.style.setProperty("--gradColor4", "#73CC00")} else
	if (month ==12) {r.style.setProperty("--gradColor1", "#6D005E44"); r.style.setProperty("--gradColor3", "#6D005E"); r.style.setProperty("--gradColor2", "#BFCC0044"); r.style.setProperty("--gradColor4", "#BFCC00")} else
	if (month ==13) {r.style.setProperty("--gradColor1", "#46008544"); r.style.setProperty("--gradColor3", "#460085"); r.style.setProperty("--gradColor2", "#CCB60044"); r.style.setProperty("--gradColor4", "#CCB600")} else
	if (month ==14) {r.style.setProperty("--gradColor1", "#1F00AD44"); r.style.setProperty("--gradColor3", "#1F00AD"); r.style.setProperty("--gradColor2", "#CC9A0044"); r.style.setProperty("--gradColor4", "#CC9A00")} else
	if (month ==15) {r.style.setProperty("--gradColor1", "#000DBF44"); r.style.setProperty("--gradColor3", "#000DBF"); r.style.setProperty("--gradColor2", "#CC7B0044"); r.style.setProperty("--gradColor4", "#CC7B00")}
	if (month ==16) {r.style.setProperty("--gradColor1", "#00597444"); r.style.setProperty("--gradColor3", "#005974"); r.style.setProperty("--gradColor2", "#CC4A0044"); r.style.setProperty("--gradColor4", "#CC4A00")}
	}

//add a day to the date
function addDay() {
	var currentDate = document.getElementById('inputDate').value;
	var month = Number(currentDate.slice(0,2));
	var day = Number(currentDate.slice(-2));
	var day = day + 1;
		if(day == 33) {month += 1, day = 1};
		if(month == 17) {month = 1 , day = 1};
	var season = Number(Math.ceil(month/4));
	var weekday = weekdays[day-1];
	var newDate = ("0" + month).slice(-2) + ("0" + day).slice(-2);
	document.getElementById('inputDate').value = newDate;
	var weekday = weekdays[day-1];
	newSeasonsRotation = (360/4 * season)-((360/4)/2);
	newMonthsRotation = (360/16 * month)-((360/16)/2);
	newDaysRotation = (360/32 * day)-((360/32)/2);
	localStorage.setItem('saveDate', newDate);
	location.reload()
	}	

//reset to 0101
function resetDate() {
	localStorage.setItem('saveDate', "0101");
	document.getElementById('inputDate').value = "0101";
	localStorage.setItem('saveDate', "0101");
	location.reload(); 
}

//set date by ckicking day or month
function clickData (clicked_id) {
	var currentDate = document.getElementById('inputDate').value;
	if (clicked_id.startsWith("days")) {
		var month = Number(currentDate.slice(0,2));
		var day = Number(clicked_id.slice(-2));
		var clickedDate = ("0" + month).slice(-2) + ("0" + day).slice(-2);
//		alert("you are setting the date to: " + clickedDate);
		document.getElementById('inputDate').value = clickedDate;
	localStorage.setItem('saveDate', clickedDate);
	} else
	if (clicked_id.startsWith("months")) {
		var month = Number(clicked_id.slice(-2));
		var day = Number(currentDate.slice(-2));
		var clickedDate = ("0" + month).slice(-2) + ("0" + day).slice(-2);
//		alert("you are setting the date to: " + clickedDate);
		document.getElementById('inputDate').value = clickedDate;
	localStorage.setItem('saveDate', clickedDate);
	} else
	if (clicked_id.startsWith("time")) {
		var time = Number(clicked_id.slice(-2));
	localStorage.setItem('saveTime', time);
	}
location.reload();
}

function updateStatus() {
	var status = document.getElementById('statusInput').value;
	document.getElementById('displayStatus').value = status;
	localStorage.setItem('saveStatus', status);
}
	
// MOON
// create div to hold moon
var moonDiv = document.createElement('div');
	moonDiv.setAttribute("id", "moonDiv");
	document.body.appendChild(moonDiv);

// create svg to show moon
var svgMoon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svgMoon.setAttribute("id", "svgMoon");
	svgMoon.setAttribute("height", "200");
	svgMoon.setAttribute("width" , "200");
	moonDiv.appendChild(svgMoon);

// create mask to hide part of the moon
var moonMask = document.createElementNS("http://www.w3.org/2000/svg", "mask");
	moonMask.setAttribute("id", "moonMask");
	svgMoon.appendChild(moonMask);

// create circle to hide moon
var moonMaskCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
	moonMaskCircle.setAttribute("id", "moonMaskCircle");
	moonMaskCircle.setAttribute("cx", "100");
	moonMaskCircle.setAttribute("cy", "100");
	moonMaskCircle.setAttribute("r", "99");
	moonMask.appendChild(moonMaskCircle)

//create path to show moon
var moonMaskPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
	moonMaskPath.setAttribute("id", "moonMaskPath");
	var currentDate = document.getElementById('inputDate').value;
	var day = Number(currentDate.slice(-2));
//if statements to set mask path
	if (day <=08) {var sweep1 = " 0 0 0," ; var sweep2 = " 0 0 0,"} else
	if (day <=16) {var sweep1 = " 0 0 0," ; var sweep2 = " 0 0 1,"} else
	if (day <=24) {var sweep1 = " 0 0 1," ; var sweep2 = " 0 0 0,"} else
	if (day <=32) {var sweep1 = " 0 0 1," ; var sweep2 = " 0 0 1,"};

// set the arc of moonMask
	if (day == 01 || day == 16 || day == 17 || day == 32) {var rad = " 100 100,"} else
	if (day == 02 || day == 15 || day == 18 || day == 31) {var rad = " 101 101,"} else
	if (day == 03 || day == 14 || day == 19 || day == 30) {var rad = " 105 105,"} else
	if (day == 04 || day == 13 || day == 20 || day == 29) {var rad = " 113 113,"} else
	if (day == 05 || day == 12 || day == 21 || day == 28) {var rad = " 130 130,"} else
	if (day == 06 || day == 11 || day == 22 || day == 27) {var rad = " 167 167,"} else
	if (day == 07 || day == 10 || day == 23 || day == 26) {var rad = " 260 260,"} else
	if (day == 08 || day == 09 || day == 24 || day == 25) {var rad = " 753 753,"};
	moonMaskPath.setAttribute("d", "M 100 0, a 100 100, " + sweep1 + " 0 200, " + rad + sweep2 + " 0 -200  z");
	moonMask.appendChild(moonMaskPath);


// create image element to hold moon image file
var moonImage = document.createElementNS("http://www.w3.org/2000/svg", "image");
	moonImage.setAttribute("id", "moonImage");
	moonImage.setAttribute("href", "venus.jpg");
	moonImage.setAttribute("height", "200");
	moonImage.setAttribute("width", "200");
	moonImage.setAttribute("mask", "url(#moonMask)");
	svgMoon.appendChild(moonImage);

setDate()
