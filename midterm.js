function setup() {
	var canvas = document.getElementById('myCanvas');
	var slider = document.getElementById('slider');
	slider.value = -25;

	// set default values for animation angle
	var theta1 = -25 * 0.005 * Math.PI;
	var theta2 = 25 * 0.005 * Math.PI;

	function draw() {

		var context = canvas.getContext('2d');
		canvas.width = canvas.width;

		// initialize angle value for slider
		var theta0 = slider.value * 0.005 * 2 * Math.PI;

		// update rotation angle of the two arms after each draw()
		theta1 = (theta1 + 0.05) % 360;
		theta2 = (theta2 - 0.065) % 360;

		// draws arm
		function arm(color) {

			context.beginPath();
			context.fillStyle = color;
			context.moveTo(0, 0);
			context.lineTo(10, 5);
			context.lineTo(90, 5);
			context.lineTo(100, 0);
			context.lineTo(90, -5);
			context.lineTo(10, -5);
			context.closePath();
			context.fill();

		}

		// move origin from 0,0 to 50,150
		context.translate(50, 150);
                      
		arm("blue");

		// top of stack is now the blue axes
		context.save();

		// translate blue axis by 100
		context.translate(100, 0);

		// rotate axes by theta0 (slider value)
		context.rotate(theta0);

		arm("purple");

		// top of stack is now purple axes
		context.save();

		// translate purple x axis by 100
		context.translate(100, 0);

		// scale x axis by 0.75 and leave y axis unchanged
		context.scale(0.75, 1);

		// rotate axes by theta1
		context.rotate(theta1);

		arm("green");

		// top of stack is now purple axes
		context.restore();

		// translate purple x axis by 100
		context.translate(100, 0);

		// rotate axes by theta2
		context.rotate(theta2);

		arm("yellow");

		// pop stack, now top is blue axes
		context.restore();

		window.requestAnimationFrame(draw);
	}

	window.requestAnimationFrame(draw);
}
window.onload = setup;