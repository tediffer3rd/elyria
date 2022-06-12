
// show coords
function showCoords(event) {
	var x = event.clientX;
	var y = event.clientY;
	var coords = "X coords: " + x + ", Y coords: " + y;
//	alert(coords)
	}

// create dotX grid
	var dotsvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		dotsvg.setAttribute("id", "dotsvg");
		dotsvg.setAttribute("width", "1000");
		dotsvg.setAttribute("height", "800");
		dotsvg.setAttribute("viewBox", "0 0 1000 1000");
//		document.body.appendChild(dotsvg);
	for (var x = 1; x <= 1000 ; x = x + 10) {
		for (var y = 1; y <= 1000 ; y = y + 10) {
			var r = 1;
			if (x % 100 == 0 && y % 100 == 0) {r = 2}
		var dotX = document.createElementNS("http://www.w3.org/2000/svg", "circle");
			dotX.setAttribute("id", "dotX" + x + y);
			dotX.setAttribute("cx", x);
			dotX.setAttribute("cy", y);
			dotX.setAttribute("r", r);
			dotX.setAttribute("fill", "#000000");
			dotsvg.appendChild(dotX);
		}
	}


// create random stars
	var starsvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		starsvg.setAttribute("id", "starsvg");
		starsvg.setAttribute("width", "1000");
		starsvg.setAttribute("height", "800");
		starsvg.setAttribute("viewBox", "0 0 1200 1000");
		document.body.appendChild(starsvg);
	for (var x = 0; x <= 3000 ; x = x + 1) {
		var a = Math.floor(Math.random() * 2000) + 1;
		var b = Math.floor(Math.random() * 1000) + 1;
		var c = Math.floor(Math.random() * 1);
		if (x < 100) {var c = Math.floor(Math.random() * 2) + 1};
		var d = Math.random();
		var star = document.createElementNS("http://www.w3.org/2000/svg", "circle");
			star.setAttribute("id", "star" + x);
			star.setAttribute("cx", a);
			star.setAttribute("cy", b);
			star.setAttribute("r", (c + d));
			star.setAttribute("fill", "#ffffff");
	starsvg.appendChild(star);
	}


