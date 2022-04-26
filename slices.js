var fontLink = document.createElement('link');
	fontLink.setAttribute("rel", "stylesheet");
	fontLink.setAttribute("href", "https://fonts.googleapis.com/css?family=Sofia");
	document.head.appendChild(fontLink);
var font = "font-family: Sofia; font-size: 23px;"

var seasons = ["Sepren", "Somner", "Autun", "Wevner"];
var months = ["Solaris", "Seprensdor", "Fonsoc", "Ganrehm", "Calidum", "Somnercrest", "Aesoc", "Jehmri", "Lunaris", "Autunsveil", "Cadoc", "Nehnma", "Frigus", "Wevnercrest", "Hemoc", "Duhmret"];
var dayNums = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32"];
var weekdays = ["Nehrdas", "Jahdas", "Gahldas", "Dehrdas", "Elimdas", "Iadas", "Zepdas", "Makda", "Nehrdas", "Jahdas", "Gahldas", "Dehrdas", "Elimdas", "Iadas", "Zepdas", "Makda", "Nehrdas", "Jahdas", "Gahldas", "Dehrdas", "Elimdas", "Iadas", "Zepdas", "Makda", "Nehrdas", "Jahdas", "Gahldas", "Dehrdas", "Elimdas", "Iadas", "Zepdas", "Makda"];
var easyDays = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelfth', 'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth', 'seventeenth', 'eighteenth', 'nineteenth', 'twnetieth', 'twenty-first', 'twenty-second', 'twenty-third', 'twenty-fourth', 'twenty-fifth', 'twenty-sixth', 'twenty-seventh', 'twenty-eighth', 'twenty-ninth','thitieth', 'thirty-first', 'thirty-second'];
var blankArray = []

var data =  [
	Array.from(dayNums).map(String),
	Array.from(months).map(String),
	Array.from(seasons).map(String),
//	Array.from(blankArray).map(String),
//	Array.from(blankArray).map(String),
	]

// add background to page
var background = document.createElement('style');
	var backgroundimage = "linear-gradient(rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0.75)),url('forrest.webp')";
	var backgroundContent = 'body { background-image: linear-gradient(rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0.75)),url("forrest.webp"); background-size: cover; }';
	background.appendChild(document.createTextNode(backgroundContent));
	document.head.appendChild(background);

// create form to input and add date
var inputForm = document.createElement('form');
	inputForm.setAttribute("onSubmit", "return false");

// create input date text box
var inputDate = document.createElement('input');
	inputDate.setAttribute("id", "inputDate");
	inputDate.setAttribute("type", "int");
	inputDate.setAttribute("value", "0101");
	inputDate.setAttribute("method", "post");
	inputDate.setAttribute("autofocus" , "");
	inputForm.appendChild(inputDate);

//create set date buttom
var setDateButton = document.createElement('input');
	setDateButton.setAttribute("id", "setDateButton");
	setDateButton.setAttribute("type", "submit");
	setDateButton.setAttribute("value", "Set Date");
	setDateButton.setAttribute("onclick", "setDate()");
	inputForm.appendChild(setDateButton);

//creat add day button
var addDayButton = document.createElement('input');
	addDayButton.setAttribute("id", "addDayButton");
	addDayButton.setAttribute("type", "button");
	addDayButton.setAttribute("value", "Add Day");
	addDayButton.setAttribute("onclick", "addDay()");
	inputForm.appendChild(addDayButton);
	document.body.appendChild(inputForm);

// create div to display current date
var displayDateDiv = document.createElement('div');
	displayDateDiv.setAttribute("id", "displayDate");
	displayDateDiv.setAttribute("style", font);
	displayDateDivDataContent = 'Enter the current date in the box above and press "ENTER" or click the "Set date" button';
	displayDateDiv.appendChild(document.createTextNode(displayDateDivDataContent));
	document.body.appendChild(displayDateDiv);


//set variables for calendar
var xOrigin = 400;
var yOrigin = 400;
var numPaths = (data.length+2); // data.length = number of arrays
var yoffset = yOrigin / numPaths;
var circleYoffset = yoffset;
var textYoffset = yoffset/2;
var yEnd = yOrigin - (yOrigin / numPaths);
var circleNum = 1;
var pointerLineWidth = 10;
var pointerLineWidthAdjust = 5
var compassLineRotateAngle = 45;
var compassLineRotate = 0;

// create div element to hold svg
var calendar = document.createElement('div');
	calendar.setAttribute("id", "calendar");
	calendar.setAttribute("style", "height: 800px; width: 800px; border: 3px solid black; border-radius:50%; background: conic-gradient(from 17deg, #009900, #cc0000, #cc0000, #ff8000, #ff8000, #0000ff, #0000ff, #009900, #009900);");
	document.body.appendChild(calendar);

//create svg container
var svg1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svg1.setAttribute("id", "svg1");
	svg1.setAttribute("height",yOrigin*2);
	svg1.setAttribute("width",xOrigin*2);
	calendar.appendChild(svg1);


// create big red circle
var bigRedCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
	bigRedCircle.setAttribute("id", "bigRedCircle");
	bigRedCircle.setAttribute("cx",xOrigin);
	bigRedCircle.setAttribute("cy",yOrigin);
	bigRedCircle.setAttribute("r",xOrigin);
	bigRedCircle.setAttribute("fill","#ff0000");
//	svg1.appendChild(bigRedCircle);

// create little black dot in middle of big red circle
var littleBlackDot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
	littleBlackDot.setAttribute("id", "littleBlackDot");
	littleBlackDot.setAttribute("cx", xOrigin);
	littleBlackDot.setAttribute("cy", yOrigin);
	littleBlackDot.setAttribute("r", "2");
	littleBlackDot.setAttribute("fill", "#000000");
	svg1.appendChild(littleBlackDot);

// create 8 cardinal compass lines
for (var i = 0; i < 4; i ++) {
	var compassLines = document.createElementNS("http://www.w3.org/2000/svg", "line");
	compassLines.setAttribute("id", "line" + (i+1));
	compassLines.setAttribute("x1", "400");
	compassLines.setAttribute("y1", "0");
	compassLines.setAttribute("x2", "400");
	compassLines.setAttribute("y2", "800");
	compassLines.setAttribute("style", "stroke:#000000; stroke-width:2");
//	svg1.appendChild(compassLines);
	compassLines.setAttribute("transform", "rotate(" + compassLineRotate + ", 400, 400)");
	compassLineRotate += compassLineRotateAngle;
}

// begin iterating through arrays
for (var i = 0; i < data.length; i ++) {
	var dataItem = data[i];

//set id names bases on itteration
	if (i == 0) {
		var ID = "days"
	} else if (i == 1) {
		var ID = "months"
	} else if (i == 2) {
		var ID = "seasons"
	} else {}
	
// create path dividing circles
	var dividingCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
		dividingCircle.setAttribute("id", ID + "circle" + i);
		dividingCircle.setAttribute("cx",xOrigin);
		dividingCircle.setAttribute("cy",yOrigin);
		dividingCircle.setAttribute("r", (yOrigin - circleYoffset));
		dividingCircle.setAttribute("stroke","black");
		dividingCircle.setAttribute("stroke-width","3");
		dividingCircle.setAttribute("fill","none");
		svg1.appendChild(dividingCircle);

// create pointer lines
	var pointerLine = document.createElementNS("http://www.w3.org/2000/svg", "path");
		pointerLine.setAttribute("id", "pointerLine" + ID);
		pointerLine.setAttribute("class", "pointerLine" + ID);
		pointerLine.setAttribute("d", "M " + xOrigin + " " + yOrigin + " L " + xOrigin + " " + (circleYoffset-15) + " , a 50 25 0 1 1 1 0");
		pointerLine.setAttribute("style", 'stroke: #000000; stroke-width:' + pointerLineWidth + 'px; stroke-linecap: round; ');
	svg1.appendChild(pointerLine);
		pointerLineWidth += pointerLineWidthAdjust

// set variables for segments & rotation
		var numSegments = dataItem.length;
		var textxOrigin = xOrigin-(xOrigin/numSegments);
		var rotateAngle = 360/numSegments;
		var textRotate = rotateAngle/2;
		var textLineRotate = rotateAngle;

// itterate through the contents of the array
		for (var j = 0; j < dataItem.length; j ++) {
			var dataContent = dataItem[j];
//			var dataContent = dataItem.length;

// create lines between text elements			
			var textLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
			textLine.setAttribute("id", ID + "textLine" + j);
			textLine.setAttribute("x1", xOrigin);
			textLine.setAttribute("y1", (circleYoffset));
			textLine.setAttribute("x2", xOrigin);
			textLine.setAttribute("y2", (circleYoffset - yoffset));
			textLine.setAttribute("style", "stroke:#000000; stroke-width:3px;");
			textLine.setAttribute("transform", "rotate(" + textLineRotate + " " + xOrigin + ", " + yOrigin + ")");
			svg1.appendChild(textLine);
			
//create text elements
			var textJ = document.createElementNS("http://www.w3.org/2000/svg", "text");
			textJ.setAttribute("id", ID + "textJ" + j);
			textJ.setAttribute("x", xOrigin);
			textJ.setAttribute("y", textYoffset);
			textJ.setAttribute("fill", "#ffffff");
			textJ.setAttribute("text-anchor", "middle");
			textJ.setAttribute("alignment-baseline", "middle");
			textJ.setAttribute("style", font);
			textJ.setAttribute("transform", "rotate(" + textRotate + " " + xOrigin + ", " + yOrigin + ")");
			textJ.appendChild(document.createTextNode(dataContent));
			svg1.appendChild(textJ);
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
	var currentDate = document.getElementById('inputDate').value;
	var month = Number(currentDate.slice(0,2));
	var day = Number(currentDate.slice(-2));
	var season = Number(Math.ceil(month/4));
	var weekday = weekdays[day-1];
	document.getElementById('displayDate').innerHTML = 'Press "ENTER" or click "Set date" to set the dial hands';
  }

// set date to what is shown in the input window
function setDate() {
	var currentDate = document.getElementById('inputDate').value;
	var month = Number(currentDate.slice(0,2));
	var day = Number(currentDate.slice(-2));
	var season = Number(Math.ceil(month/4));
	var weekday = weekdays[day-1];
	document.getElementById('displayDate').innerHTML = 'The current date is: ' + weekday + ' the ' + easyDays[day-1] + ' day of ' + months[month-1] + ' the season of ' + seasons[season-1];
//    document.getElementById('displayDate').innerHTML = 'The current date is: ' + ("0" + season).slice(-2) + " - " + ("0" + month).slice(-2) + " - " + ("0" + day).slice(-2);
    seasonsRotation = (360/4 * season)-((360/4)/2);
	monthsRotation = (360/16 * month)-((360/16)/2);
	daysRotation = (360/32 * day)-((360/32)/2);
	pointerLineseasons.setAttribute("transform", "rotate(" + seasonsRotation + " 400, 400)");
	pointerLinemonths.setAttribute("transform", "rotate(" + monthsRotation + " 400, 400)");
	pointerLinedays.setAttribute("transform", "rotate(" + daysRotation + " 400, 400)");

	localStorage.setItem('saveDate', currentDate);
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
	document.getElementById('displayDate').innerHTML = 'The current date is: ' + weekday + ' the ' + easyDays[day-1] + ' day of ' + months[month-1] + ' the season of ' + seasons[season-1];
//    document.getElementById('displayDate').innerHTML = 'The current date is: ' + ("0" + season).slice(-2) + " - " + ("0" + month).slice(-2) + " - " + ("0" + day).slice(-2);
    seasonsRotation = (360/4 * season)-((360/4)/2);
	monthsRotation = (360/16 * month)-((360/16)/2);
	daysRotation = (360/32 * day)-((360/32)/2);
	pointerLineseasons.setAttribute("transform", "rotate(" + seasonsRotation + " 400, 400)");
	pointerLinemonths.setAttribute("transform", "rotate(" + monthsRotation + " 400, 400)");
	pointerLinedays.setAttribute("transform", "rotate(" + daysRotation + " 400, 400)");

	localStorage.setItem('saveDate', newDate);
}	

setDate()