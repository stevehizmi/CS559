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
        
        function moveToTx(x,y,Tx){
            var res=vec2.create(); 
            vec2.transformMat3(res,[x,y],Tx);
            context.moveTo(res[0],res[1]);
        }

        function lineToTx(x,y,Tx){
            var res = vec2.create();
            vec2.transformMat3(res,[x,y],Tx);
            context.lineTo(res[0],res[1]);
        }

		// draws arm
		function arm(color, Tx) {

			context.beginPath();
            context.fillStyle = color;
            moveToTx(0,0,Tx);
            lineToTx(10,5,Tx);
            lineToTx(90,5,Tx);
            lineToTx(100,0,Tx);
            lineToTx(90,-5,Tx);
            lineToTx(10,-5,Tx);
            context.closePath();
            context.fill();

		}
        
        var Tblue_to_canvas = mat3.create();
        mat3.fromTranslation(Tblue_to_canvas,[50,150]);
        arm("blue",Tblue_to_canvas);
        
        var Tgreen_to_blue = mat3.create();
        mat3.fromTranslation(Tgreen_to_blue,[100,0]);
        mat3.rotate(Tgreen_to_blue,Tgreen_to_blue,theta0);
        var Tgreen_to_canvas = mat3.create();
        mat3.multiply(Tgreen_to_canvas, Tblue_to_canvas, Tgreen_to_blue);
        arm("green",Tgreen_to_canvas);

        var Tred_to_green = mat3.create();
        mat3.fromTranslation(Tred_to_green,[100,0]);
        mat3.rotate(Tred_to_green,Tred_to_green,theta1);
        mat3.scale(Tred_to_green,Tred_to_green,[0.5,1]);
        var Tred_to_canvas = mat3.create();
        mat3.multiply(Tred_to_canvas,Tgreen_to_canvas,Tred_to_green);
        arm("red",Tred_to_canvas);

        var Torange_to_green = mat3.create();
        mat3.fromTranslation(Torange_to_green,[100,0]);
        mat3.rotate(Torange_to_green,Torange_to_green,theta2);
        mat3.scale(Torange_to_green,Torange_to_green,[0.5,1]);
        var Torange_to_canvas = mat3.create();
        mat3.multiply(Torange_to_canvas,Tgreen_to_canvas,Torange_to_green);
        arm("orange",Torange_to_canvas);

		window.requestAnimationFrame(draw);
	}

	window.requestAnimationFrame(draw);
}
window.onload = setup;