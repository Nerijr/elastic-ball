"use strict"

var gl;
const speed = document.getElementById("speed"); // Slider para controle de velocidade por interação

const radius = 0.2; // Raio da bola
const segments = 20; // Quantidade de pontos: quanto maior, mais redondo
var ball = getBall(radius, segments); // Geração dos pontos

var moveLoc;
var move = vec2(0.0, 0.0); // Posição da bola
var velocity = vec2(0.005, 0.0025); // Velocidade no eixo x e y

init();

function init() {
    var canvas = document.getElementById("gl-canvas");
    gl = canvas.getContext("webgl2");
    if (!gl) alert("WebGL 2.0 isn't available");

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.0, 0.5, 1.0, 1.0);

    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(ball), gl.STATIC_DRAW);

    var positionLoc = gl.getAttribLocation(program, "aPosition");
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionLoc);

    moveLoc = gl.getUniformLocation(program, "move");
    gl.uniform2fv(moveLoc, move);

    render();
}

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);

    move[0] += velocity[0] * speed.value; // Locomoção da bola em x
    move[1] += velocity[1] * speed.value; // Locomoção da bola em y

    // Se a bola tocar nas bordas verticais, inverte a direção em x
    if (move[0] + radius >= 1.0 || move[0] - radius <= -1.0) velocity[0] *= -1;

    // Se a bola tocar nas bordas horizontais, inverte a direção em y
    if (move[1] + radius >= 1.0 || move[1] - radius <= -1.0) velocity[1] *= -1;

    gl.uniform2fv(moveLoc, move)
    gl.drawArrays(gl.TRIANGLE_FAN, 0, ball.length);

    requestAnimationFrame(render);
}
