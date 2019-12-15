//init
const canvEl = document.querySelector("#ballZone");
const c = canvEl.getContext("2d");
const cWidth = canvEl.width;
const cHeight = canvEl.height;
const gravity = 1.1;

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
    //ball hits wall on the left
    if (ball.x <= ball.radius) {
        ball.dx = -(ball.dx * ball.bounce);
    }
    //ball hits the wall on the right
    if (ball.x >= cWidth - ball.radius) {
        ball.dx = -(ball.dx * ball.bounce);
    }
    //ball hits the wall on the top
    if (ball.y <= ball.radius) {
        ball.dy = -ball.dy * ball.bounce;
    }
    //ball hits the wall on the bottom
    if (ball.y >= cHeight - ball.radius) {
        if (ball.dy > 1) {
            ball.dy = -ball.dy * ball.bounce;
            ball.y = cHeight;
        } else {
            ball.dy = 0;
        }
    }
    //if ball is going down increase dy by gravity
    if (ball.dy > 0) {
        if (ball.dy < 1) {
            ball.dy = 1;
        }
        ball.dy = ball.dy * gravity;
    }
    //if ball is going up decrease dy
    if (ball.dy < 0) {
        //if dy is effectively 0 change direction
        if (ball.dy > -1) {
            ball.dy += 1;
        } else {
            ball.dy = ball.dy / gravity;
        }
    }
    //round ball velocity to avoid clipping through walls
    ball.dx = Math.round(ball.dx * 100) / 100;
    ball.dy = Math.round(ball.dy * 100) / 100;
    ball.y += ball.dy;
    ball.x += ball.dx;
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
