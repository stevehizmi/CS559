function setup() {
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    var slider1 = document.getElementById('slider1');
    slider1.value = -25;

    function draw() {
        canvas.width = canvas.width;
        // use the sliders to get the angles
        var tParam = slider1.value * 0.01;

        function moveToTx(loc, Tx) { var res = vec2.create(); vec2.transformMat3(res, loc, Tx); context.moveTo(res[0], res[1]); }

        function lineToTx(loc, Tx) { var res = vec2.create(); vec2.transformMat3(res, loc, Tx); context.lineTo(res[0], res[1]); }

        function drawObject(color, Tx) {
            context.beginPath();
            context.fillStyle = color;
            moveToTx([-.05, -.05], Tx);
            lineToTx([-.05, .05], Tx);
            lineToTx([.05, .05], Tx);
            lineToTx([.05, -.05], Tx);
            context.closePath();
            context.fill();
        }

        var Hermite = function (t) {
            return [
                2 * t * t * t - 3 * t * t + 1,
                t * t * t - 2 * t * t + t,
                -2 * t * t * t + 3 * t * t,
                t * t * t - t * t
            ];
        }

        function Cubic(basis, P, t) {
            var b = basis(t);
            var result = vec2.create();
            vec2.scale(result, P[0], b[0]);
            vec2.scaleAndAdd(result, result, P[1], b[1]);
            vec2.scaleAndAdd(result, result, P[2], b[2]);
            vec2.scaleAndAdd(result, result, P[3], b[3]);
            return result;
        }

        var p0 = [0, 0];
        var d0 = [10, 1];
        var p1 = [1, 1];
        var d1 = [-1, 3];
        var p2 = [2, 2];
        var d2 = [0, 2];
        var p3 = [1, 2];
        var d3 = [0, 1];
        var p4 = [0, 0];
        var d4 = [-1, 0];

        var P0 = [p0, d0, p1, d1]; // First two points and tangents
        var P1 = [p1, d1, p2, d2];
        var P2 = [p2, d2, p3, d3];
        var P3 = [p3, d3, p4, d4]; // Last two points and tangents

        var C0 = function (t_) { return Cubic(Hermite, P0, t_); };
        var C1 = function (t_) { return Cubic(Hermite, P1, t_); };
        var C2 = function (t_) { return Cubic(Hermite, P2, t_); };
        var C3 = function (t_) { return Cubic(Hermite, P3, t_); };

        var Ccomp = function (t) {
            if (t < 1) {
                var u = t;
                return C0(u);
            } else {
                var u = t - 1.0;
                return C1(u);
            }
        }

        function drawTrajectory(t_begin, t_end, intervals, C, Tx, color) {
            context.strokeStyle = color;
            context.beginPath();
            moveToTx(C(t_begin), Tx);
            for (var i = 1; i <= intervals; i++) {
                var t = ((intervals - i) / intervals) * t_begin + (i / intervals) * t_end;
                lineToTx(C(t), Tx);
            }
            context.stroke();
        }



        var Tblue_to_canvas = mat3.create();
        mat3.fromTranslation(Tblue_to_canvas, [50, 350]);
        mat3.scale(Tblue_to_canvas, Tblue_to_canvas, [150, -150]); // Flip the Y-axis

        drawTrajectory(0.0, 1.0, 100, C0, Tblue_to_canvas, "red");
        drawTrajectory(0.0, 1.0, 100, C1, Tblue_to_canvas, "blue");
        drawTrajectory(0.0, 1.0, 100, C2, Tblue_to_canvas, "green");
        drawTrajectory(0.0, 1.0, 100, C3, Tblue_to_canvas, "purple");

        var Tgreen_to_blue = mat3.create();
        mat3.fromTranslation(Tgreen_to_blue, Ccomp(tParam));

        var Tgreen_to_canvas = mat3.create();
        mat3.multiply(Tgreen_to_canvas, Tblue_to_canvas, Tgreen_to_blue);

        drawObject("green", Tgreen_to_canvas);
    }


    slider1.addEventListener("input", draw);
    draw();
}
window.onload = setup;