//init
const canvEl = document.querySelector("#ballZone");
const c = canvEl.getContext("2d");
const cWidth = canvEl.width;
const cHeight = canvEl.height;
const gravity = 1;

//starting point for bouncy ball
let ball = {
    radius: 20, //ball size
    x: canvEl.width / 2, //ball starting position X
    y: canvEl.height / 10, // ball starting position Y
    dx: 10, //direction in x axis
    dy: 10, //direction in y axis
    bounce: 0.9,
};

function update() {
    //ball hits wall on the left or right
    if (ball.x <= ball.radius || ball.x >= cWidth - ball.radius) {
        ball.dx = -(ball.dx * ball.bounce);
    }
    //ball hits the wall on the top or bottom
    if (ball.y <= ball.radius || ball.y >= cHeight - ball.radius) {
        ball.dy = -ball.dy * ball.bounce;
    }
    //add gravity
    ball.dy += gravity;
    //add new trajectory
    ball.y += ball.dy;
    ball.x += ball.dx;
    if (ball.y > cHeight - ball.radius) {
        ball.y = cHeight - ball.radius;
    }
    console.log(cHeight);
    document.querySelector("#dx").innerText = "dx: " + ball.dx;
    document.querySelector("#dy").innerText = "dy: " + ball.dy;
    document.querySelector("#x").innerText = "x: " + ball.x;
    document.querySelector("#y").innerText = "y: " + ball.y;
    draw();
}

function draw() {
    c.beginPath();
    c.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2, false);
    c.strokeStyle = "blue";
    c.stroke();
    c.fill();
}

animate(); 

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, cWidth, cHeight);
    update();
}
