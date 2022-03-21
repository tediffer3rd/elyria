let dayNums = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32"];
let months = ["Solaris", "Seprensdor", "Fonsoc", "Ganrehm", "Calidum", "Somnercrest", "Aesoc", "Jehmri", "Lunaris", "Autunsveil", "Cadoc", "Nehnma", "Frigus", "Wevnercrest", "Hemoc", "Duhmret"];
let weekdays = ["Nehrdas", "Jahdas", "Gahldas", "Dehrdas", "Elimdas", "Iadas", "Zepdas", "Makda", "Nehrdas", "Jahdas", "Gahldas", "Dehrdas", "Elimdas", "Iadas", "Zepdas", "Makda", "Nehrdas", "Jahdas", "Gahldas", "Dehrdas", "Elimdas", "Iadas", "Zepdas", "Makda", "Nehrdas", "Jahdas", "Gahldas", "Dehrdas", "Elimdas", "Iadas", "Zepdas", "Makda"];
let seasons = ["Sepren", "Somner", "Autun", "Wevner"];
let easyDays = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelfth', 'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth', 'seventeenth', 'eighteenth', 'nineteenth', 'twnetieth', 'twenty-first', 'twenty-second', 'twenty-third', 'twenty-fourth', 'twenty-fifth', 'twenty-sixth', 'twenty-seventh', 'twenty-eighth', 'twenty-ninth','thitieth', 'thirty-first', 'thirty-second'];

function stringifyNumber(n) {
  if (n < 20) return special[n];
  if (n%10 === 0) return deca[Math.floor(n/10)-2] + 'ieth';
  return deca[Math.floor(n/10)-2] + 'y-' + special[n%10];
}

let data =  [
	Array.from(dayNums).map(String),
//	Array.from(weekdays).map(String),
	Array.from(months).map(String),
	Array.from(seasons).map(String),
	Array.from(Array(1).keys()).map(String),
	//Array.from(Array(1).keys()).map(String),
	//Array.from(Array(4).keys()).map(String),
	//Array.from(Array(16).keys()).map(String),
]

function getRandomHTMLColor() {
	var r = 255*Math.random()|0;
		g = 255*Math.random()|0;
		b = 255*Math.random()|0;
	return 'rgb(' + r + ',' + g + ',' + b + ')';
}

function createPieMenu() {
	let pieMenu = document.createElement("div");
	pieMenu.id = "pie-menu"
	pieMenu.classList.add("pie-outer");

	let widthDelta = 100/data.length;
	let widthPercentage = 125;

	for (let i = 0; i < data.length; i ++) {
		let dataItem = data[i];
		let numSegments = dataItem.length;
		let segmentAngle = (Math.PI * 2)/numSegments;
		let skewAngle = (Math.PI/2) - segmentAngle;

		let pie = document.createElement("div");
//		let pieRotateAngle = (Math.PI/2) - segmentAngle/2;
		let pieRotateAngle = 90*Math.PI/180;
		pie.classList.add("pie");
		console.log(widthPercentage);

		pie.style.width = `${widthPercentage}%`;
//	  pie.style.background = getRandomHTMLColor();
		pie.style.background = "conic-gradient(from 337.5deg, #ff0000, #ffaa00, #0000ff, #00cc00, #ff0000)";
//		pie.style.background = "conic-gradient(from 45deg, blue, red)";


		pie.style.transform = `translate(-50%,-50%) rotate(${pieRotateAngle}rad)`;

		let pieList = document.createElement("ul");

		for (let j = 0; j < dataItem.length; j ++) {
			let rotationAngle = segmentAngle * j;
			let dataContent = dataItem[j];
			//let dataContent = "";
			//let dataContent = Number(dataItem[j])+1;

			let pieListItem = document.createElement('li'); // create a new list item
			let pieItemAnchor = document.createElement('a'); // create a new list item

			pieListItem.style.transform = `rotate(${rotationAngle}rad) skew(${skewAngle}rad)`;

			pieItemAnchor.appendChild(document.createTextNode(dataContent)); // append the text to the li
			let anchorRotate = segmentAngle/2 - Math.PI/2;
			let anchorSkew = segmentAngle - Math.PI/2;
			pieItemAnchor.style.transform = `skew(${anchorSkew}rad) rotate(${anchorRotate}rad)`;

			pieListItem.appendChild(pieItemAnchor);
			pieList.appendChild(pieListItem)
		}
		pie.appendChild(pieList);
		pieMenu.appendChild(pie);
		widthPercentage -= widthDelta;
	}

	document.body.appendChild(pieMenu);
}

 createPieMenu();

function setDate() {
	var currentDate = document.getElementById('input_id').value;
	var month = Number(currentDate.slice(0,2))
	var season = Number(Math.ceil(month/4))
	var day = Number(currentDate.slice(-2))
    var weekday = weekdays[day-1]
	document.getElementById('alert1').innerHTML = 'The current date is: ' + weekday + ' the ' + easyDays[day-1] + ' day of ' + months[month-1] + ' the season of ' + seasons[season-1];
//    document.getElementById('alert1').innerHTML = 'The current date is: ' + ("0" + month).slice(-2) + " - " + ("0" + day).slice(-2);
    hour_rotation = (360/4 * season)-((360/4)/2);
	min_rotation = (360/16 * month)-((360/16)/2);
	sec_rotation = (360/32 * day)-((360/32)/2);
    hour.style.transform = `rotate(${hour_rotation}deg)`;
	minute.style.transform = `rotate(${min_rotation}deg)`;
    second.style.transform = `rotate(${sec_rotation}deg)`;
	
}

function addDay() {
	var currentDate = document.getElementById('input_id').value;
	var month = Number(currentDate.slice(0,2))
	var day = Number(currentDate.slice(-2))
	var nextDay = day + 1;
		if(nextDay == 33) {month += 1, nextDay = 1 ;}
		if(month == 17) {month = 1 , nextDay = 1 ;}
	var season = Number(Math.ceil(month/4))
    hour_rotation = (360/4 * season)-((360/4)/2);
    min_rotation = (360/16 * month)-((360/16)/2);
	sec_rotation = (360/32 * nextDay)-((360/32)/2);
	hour.style.transform = `rotate(${hour_rotation}deg)`;
    minute.style.transform = `rotate(${min_rotation}deg)`;
    second.style.transform = `rotate(${sec_rotation}deg)`;
	var day = nextDay
//	var monthName = 
	document.getElementById('input_id').value=("0" + month).slice(-2) + ("0" + day).slice(-2);
//    document.getElementById('alert1').innerHTML = 'The current date is: ' + ("0" + month).slice(-2) + " - " + ("0" + day).slice(-2);
    var weekday = weekdays[day-1]
	document.getElementById('alert1').innerHTML = 'The current date is: ' + weekday + ' the ' + easyDays[day-1] + ' day of ' + months[month-1] + ' the season of ' + seasons[season-1];

}	

const input = document.querySelector('input_id')
input.onkeydown = (e) => {
  if (e.keyCode === 13) {
    e.preventDefault()
    console.log('submit')
  }
};