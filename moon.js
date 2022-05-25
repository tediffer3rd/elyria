var fontLink = document.createElement('link');
	fontLink.setAttribute("rel", "stylesheet");
	fontLink.setAttribute("href", "https://fonts.googleapis.com/css?family=Sofia");
	document.head.appendChild(fontLink);
var font = "font-family: Sofia; font-size: 23px;"

//create svg container to hold celestial bodies
var svg1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svg1.setAttribute("id", "svg1")
	svg1.setAttribute("height", 1000);
	svg1.setAttribute("width", 1000);
	svg1.setAttribute("viewBox", "-10 -10  2100 2100");
	document.body.appendChild(svg1);

// create 1000 x 1000 dotted coorcidante plane with dots at 100 x 100 larger 
for (var x = 0; x <= 2000 ; x = x + 10) {
	for (var y = 0; y <= 2000 ; y = y + 10) {
		var r = 1
		if (x % 100 == 0 && y % 100 == 0) {r = 2.5}
		var dotX = document.createElementNS("http://www.w3.org/2000/svg", "circle");
		dotX.setAttribute("cx", x);
		dotX.setAttribute("cy", y);
		dotX.setAttribute("r", r);
		dotX.setAttribute("fill","#000000");
//	svg1.appendChild(dotX);
	}
}

// Create Eid - the large sun
	var Eid = document.createElementNS("http://www.w3.org/2000/svg", "circle");
	Eid.setAttribute("id", "Eid");
	Eid.setAttribute("cx", 1000);
	Eid.setAttribute("cy", 1000);
	Eid.setAttribute("r", 150);
	Eid.setAttribute("stroke", "#000000");
	Eid.setAttribute("stroke-width", 1);
	Eid.setAttribute("fill", "#fefebe");
	svg1.appendChild(Eid);

// Create Io - the small sun
	var io = document.createElementNS("http://www.w3.org/2000/svg", "circle");
	io.setAttribute("id", "io");
	io.setAttribute("cx", 1000);
	io.setAttribute("cy", 0);
	io.setAttribute("r", 50);
	io.setAttribute("stroke", "#000000");
	io.setAttribute("stroke-width", 1);
	io.setAttribute("fill", "#FFA500");
	svg1.appendChild(io);


// Io's path
	var ioPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
	ioPath.setAttribute("id", "ioPath");
	ioPath.setAttribute("d", "m 1000 0, a 1000 1000, 0 0 1, 0 2000, a 1000 1000, 0 0 1, 0 -2000");
	ioPath.setAttribute("stroke", "#000000");
	ioPath.setAttribute("stroke-width", 5);
	ioPath.setAttribute("fill", "none");
	svg1.appendChild(ioPath);

//animate Io along it's path
	var ioAnim = document.createElementNS("http://www.w3.org/2000/svg", "animateMotion");
	ioAnim.setAttribute("path", "m 0 0, a 1000 1000, 0 0 1, 0 2000, a 1000 1000, 0 0 1, 0 -2000");
	ioAnim.setAttribute("dur", "15s");
	ioAnim.setAttribute("repeatCount", "indefinite");
	io.appendChild(ioAnim);

//create Elyria
	var Elyria = document.createElementNS("http://www.w3.org/2000/svg", "circle");
	Elyria.setAttribute("id", "Elyria");
	Elyria.setAttribute("cx", 1000);
	Elyria.setAttribute("cy", 500);
	Elyria.setAttribute("r", 75);
	Elyria.setAttribute("stroke", "#000000");
	Elyria.setAttribute("stroke-width", 1);
	Elyria.setAttribute("fill", "#0000aa");
	svg1.appendChild(Elyria);

// create Elyria's path
	var elyriaPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
	elyriaPath.setAttribute("id", "elyriaPath");
	elyriaPath.setAttribute("d", "m 1000 500, a 500 500, 0 0 1, 0 1000, a 500 500, 0 0 1, 0 -1000");
	elyriaPath.setAttribute("stroke", "#000000");
	elyriaPath.setAttribute("stroke-width", 5);
	elyriaPath.setAttribute("fill", "none");
	svg1.appendChild(elyriaPath);

//animate Elyria along it's path
	var ElyriaAnim = document.createElementNS("http://www.w3.org/2000/svg", "animateMotion");
	ElyriaAnim.setAttribute("path", "m 0 0, a 500 500, 0 0 1, 0 1000, a 500 500, 0 0 1, 0 -1000");
	ElyriaAnim.setAttribute("dur", "15s");
	ElyriaAnim.setAttribute("repeatCount", "indefinite");
	Elyria.appendChild(ElyriaAnim);

//create Luna
	var luna = document.createElementNS("http://www.w3.org/2000/svg", "circle");
	luna.setAttribute("id", "luna");
	luna.setAttribute("cx", 1100);
	luna.setAttribute("cy", 350);
	luna.setAttribute("r", 25);
	luna.setAttribute("stroke", "#000000");
	luna.setAttribute("stroke-width", 1);
	luna.setAttribute("fill", "#660000");
	svg1.appendChild(luna);

// create Luna's path
	var lunaPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
	lunaPath.setAttribute("id", "lunaPath");
	lunaPath.setAttribute("d", "m 850 500, a 250 150, 0 0 1, 500 0, a 250 150, 0 0 1, -500 0");
	lunaPath.setAttribute("stroke", "#000000");
	lunaPath.setAttribute("stroke-width", 5);
	lunaPath.setAttribute("fill", "none");
	svg1.appendChild(lunaPath);

//animate Luna along it's path
	var lunaAnim = document.createElementNS("http://www.w3.org/2000/svg", "animateMotion");
	lunaAnim.setAttribute("path", "m 0 0 a 360 310 0 0 1 0 1300 a 360 310 0 0 1 0 -1300");
	lunaAnim.setAttribute("dur", "15s");
	lunaAnim.setAttribute("repeatCount", "indefinite");
	luna.appendChild(lunaAnim);

// animate Luna's path so it stays with Elyria
	var lunaPathAnim = document.createElementNS("http://www.w3.org/2000/svg", "animateMotion");
	lunaPathAnim.setAttribute("path", "m 0 0, a 500 500, 0 0 1, 0 1000, a 500 500, 0 0 1, 0 -1000");
	lunaPathAnim.setAttribute("dur", "15s");
	lunaPathAnim.setAttribute("repeatCount", "indefinite");
	lunaPath.appendChild(lunaPathAnim);

