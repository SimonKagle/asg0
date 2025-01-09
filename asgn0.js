

var canvas;

/** @type {CanvasRenderingContext2D} */
var ctx;

var v1 = new Vector3([1, 0, 0]);
var v2 = new Vector3([0, 1, 0]);

/**
 * 
 * @param {Vector3} v 
 * @param {string} color 
 */
function drawVector(v, color){

    let centerX = canvas.width / 2;
    let centerY = canvas.height / 2;

    ctx.strokeStyle = color;

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + v.elements[0] * 20, 
               centerY - v.elements[1] * 20);
    ctx.stroke();
}

function clearCanvas(){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function main() {
    // Retrieve <canvas> element <- (1)
    canvas = document.getElementById('example');
    if (!canvas) {
        console.log('Failed to retrieve the <canvas> element');
        return;
    }

    // Get the rendering context for 2DCG <- (2)
    ctx = canvas.getContext('2d');
    clearCanvas();

}

/**
 * 
 * @param {MouseEvent} ev 
 */
function handleDrawEvent(ev) {
    var v1x = Number.parseFloat(document.getElementById("v1x").value);
    var v1y = Number.parseFloat(document.getElementById("v1y").value);
    var v2x = Number.parseFloat(document.getElementById("v2x").value);
    var v2y = Number.parseFloat(document.getElementById("v2y").value);

    v1.set(new Vector3([v1x, v1y, 0]));
    v2.set(new Vector3([v2x, v2y, 0]));

    clearCanvas();
    drawVector(v1, "red");
    drawVector(v2, "blue");
}

/**
 * 
 * @param {Vector3} v1 
 * @param {vector3} v2 
 */
function angleBetween(v1, v2){
    return Math.acos(Vector3.dot(v1.normalize(), v2.normalize())) / Math.PI * 180;
}

/**
 * 
 * @param {Vector3} v1 
 * @param {Vector3} v2 
 */
function areaTriangle(v1, v2){
    return 0.5 * Vector3.cross(v1, v2).magnitude();
}

function handleDrawOperationEvent(ev){
    handleDrawEvent(ev);
    var scalar = +document.getElementById("scalar").value;
    var opType = document.getElementById("operation").value;
    switch (opType){
        case "add":
            drawVector(v1.add(v2), "green");
            break;
        case "sub":
            drawVector(v1.sub(v2), "green");
            break;
        case "mul":
            drawVector(v1.mul(scalar), "green");
            drawVector(v2.mul(scalar), "green");
            break;
        case "div":
            drawVector(v1.div(scalar), "green");
            drawVector(v2.div(scalar), "green");
            break;
        case "nor":
            drawVector(v1.normalize(), "green");
            drawVector(v2.normalize(), "green");
            break;
        case "mag":
            console.log(`Magnitude v1: ${v1.magnitude()}`);
            console.log(`Magnitude v2: ${v2.magnitude()}`);
            break;
        case "ang":
            console.log(`Angle: ${angleBetween(v1, v2)}`);
            break;
        case "are":
            console.log(`Area of the triangle: ${areaTriangle(v1, v2)}`);
            break;
    }
}

document.getElementById("drawButton").onclick = handleDrawEvent;
document.getElementById("opButton").onclick = handleDrawOperationEvent;