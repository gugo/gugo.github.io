window.onload = function() {
	var canvas = document.getElementById("myCanvas"),
		context = canvas.getContext("2d"),
		width = canvas.width,
		height = canvas.height,
		// dataURL = 0,

		centerX = width / 2,
		centerY = height / 2,
		radius = 180,
		angle = 0,
		numObjects = 12,
		slice = Math.PI * 2 / numObjects,
		grd = 0,

		x = [];
		y = [];
		keyz = [];

		colorsArray = [
		    
		    "#A7D48E",
		    "#00AC5B",
		    "#7598CF",
		    "#405DAA",
		    "#6153A3",
		    "#643B81",
		    "#8E3193",
		    "#B43393",
		    "#D92231",
		    "#F68B1F",
		    "#FFEB69",
		    "#E0E66D", ];



	Array.prototype.clean = function(deleteValue) {
	  for (var i = 0; i < this.length; i++) {
	    if (this[i] == deleteValue) {         
	      this.splice(i, 1);
	      i--;
	    }
	  }
	  return this;
	};	

	context.translate(width / 2, height / 2);
	// context.beginPath();
	for(var i = 0; i < numObjects; i += 1) {
		angle = i * slice;
		x[i] = Math.cos(angle) * radius;
		y[i] = Math.sin(angle) * radius;
		console.log(x[i] + " " + y[i]);
		
		// context.moveTo(x[0],y[0]);
		// context.lineTo(x[i],y[i]);
	}


	function download() {
	    var dt = canvas.toDataURL('image/png');
		this.href = dt;
	};			
	document.getElementById('download').addEventListener('click', download, false);


	// context.closePath();
	// context.stroke();

	// document.getElementById("createImage").onclick = function() {
 //    //Get the svg
 //    var svg = document.getElementById("test").innerHTML;

 //    //Create the canvas element
 //    var canvas = document.createElement('MyCanvas');
 //    canvas.id = "MyCanvas";
 //    document.body.appendChild(canvas);

 //    //Load the canvas element with our svg
 //    canvg(document.getElementById('MyCanvas'), svg);

 //    //Save the svg to png
 //    Canvas2Image.saveAsPNG(canvas);

 //    //Clear the canvas
 //    canvas.width = canvas.width;
	// };



	update();


	


	document.body.addEventListener("keydown", function(event) {
		// console.log(event.keyCode);
		switch(event.keyCode) {
			case 65: // 2C
				keyz[0] = true;
				break;
				
			case 87: // 2Cs
				keyz[1] = true;
				break;
				
			case 83: // 2D
				keyz[2] = true;
				break;

			case 69: // 2Ds
				keyz[3] = true;
				break;

			case 68: // 2E
				keyz[4] = true;
				break;

			case 70: // 2F
				keyz[5] = true;
				break;

			case 84: // 2Fs
				keyz[6] = true;
				break;

			case 71: // 2G
				keyz[7] = true;
				break;

			case 89: // 2Gs
				keyz[8] = true;
				break;

			case 72: // 3A
				keyz[9] = true;
				break;

			case 85: // 3As
				keyz[10] = true;
				break;

			case 74: // 3B
				keyz[11] = true;
				break;

			case 32: // refresh
				context.clearRect(-width / 2, -height / 2, width, height);
				break;

			case 13: // refresh
				//document.getElementById('download').click();
    			break;

			default:
				break;
				
		}
	});

	document.body.addEventListener("keyup", function(event) {
		// console.log(event.keyCode);
		switch(event.keyCode) {
			case 65: // 2C
				keyz[0] = false;
				break;
				
			case 87: // 2Cs
				keyz[1] = false;
				break;
				
			case 83: // 2D
				keyz[2] = false;
				break;

			case 69: // 2Ds
				keyz[3] = false;
				break;

			case 68: // 2E
				keyz[4] = false;
				break;

			case 70: // 2F
				keyz[5] = false;
				break;

			case 84: // 2Fs
				keyz[6] = false;
				break;

			case 71: // 2G
				keyz[7] = false;
				break;

			case 89: // 2Gs
				keyz[8] = false;
				break;

			case 72: // 3A
				keyz[9] = false;
				break;

			case 85: // 3As
				keyz[10] = false;
				break;

			case 74: // 3B
				keyz[11] = false;
				break;

			case 32: // refresh
				context.clearRect(-width / 2, -height / 2, width, height);
				break;

			case 13: // refresh
				document.getElementById('download').click();

    			break;


			default:
				break;
				
		}
	});

	function update() {

		context.globalAlpha = 0.1;

		
		var index = [];

		for(var i = 0; i < numObjects; i += 1) {

			if (keyz[i]) {

				index[i] = i;

				// context.beginPath();
				// context.arc(x[i], y[i], 10, 0, Math.PI * 2, false);

			}
		};

		// index.sort(function(a, b){return b-a});
		// index.reverse();
		index.clean(undefined);

		for (var j = 0; j < index.length; j++) {

			context.beginPath();

			grd = context.createLinearGradient(x[index[j]], y[index[j]], -x[index[j]], -y[index[j]]);

			for (var i = 0; i < index.length; i++) {

				context.lineTo(x[index[i]],y[index[i]]);	

			};

			grd.addColorStop( 0 , colorsArray[index[j]]);
			grd.addColorStop( 1 , 'rgba(255,255,255,0)');

			context.fillStyle = grd;

			context.closePath();

			context.fill();

			context.save();	

		};

		requestAnimationFrame(update);
	}


	


};


