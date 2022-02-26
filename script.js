var circles = [];
var pCoords = document.getElementById("coords");
var canvas = document.getElementById("canvas");
var startBtn = document.getElementById("startBtn");
var stopBtn = document.getElementById("stopBtn");
var ctx = canvas.getContext("2d");
var GumBallFlag = false;
var GumBallArrowFlag = false;

var Area = {

    start: function() {
        this.interval = setInterval(updateArea, 20);
    },

    stop: function() {
        clearInterval(this.interval);
    },

    clear: function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

function StartGravity() {
    console.log("Start Gravity");
    startBtn.style.display = "none";
    stopBtn.style.display = "block";
    Area.start();
}

function StopGravity() {
    console.log("Stop Gravity");
    stopBtn.style.display = "none";
    startBtn.style.display = "block";
    Area.stop();
}


class circle {
    constructor(positionX, positionY, radius) {
        this.x = positionX;
        this.y = positionY;
        this.radius = radius;
        this.color = "red";
        this.speedX = 0;
        this.speedY = 0;

        this.gravity = 0.05;
        this.gravitySpeed = 0;
    }

    draw = function() {

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();

    }

    update = function() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;

        var rockbottom = canvas.height - this.radius;

        if (this.y > rockbottom) {
            this.y = rockbottom;
        }
    }

}

class GumBall extends circle {

    constructor(positionX, positionY, radius) {
        super(positionX, positionY, radius);
        this.speedX = Math.ceil(Math.random() * 2) * (Math.round(Math.random()) ? 1 : -1);
        this.speedY = Math.ceil(Math.random() * 2) * (Math.round(Math.random()) ? 1 : -1);
        this.color = "green";
        this.gravity = 0;
    }

    draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.beginPath();
        if (GumBallArrowFlag == true) {
            var angleTheta = Math.acos(this.speedX / (Math.sqrt((this.speedX * this.speedX) + (this.speedY * this.speedY))));
            ctx.moveTo(this.x, this.y);
            if (this.speedY < 0) {
                ctx.lineTo(this.x + this.radius * Math.cos(angleTheta), this.y + this.radius * Math.sin(angleTheta + Math.PI));
            } else {

                ctx.lineTo(this.x + this.radius * Math.cos(angleTheta), this.y + this.radius * Math.sin(angleTheta));
            }
            ctx.stroke();
        }

    }

    update = function() {
        this.x += this.speedX;
        this.y += this.speedY;

        var rockbottom = canvas.height - this.radius;

        var rightblock = canvas.width - this.radius;

        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.speedX = 0;
        }

        if (this.y < this.radius) {
            this.y = this.radius;
            this.speedX = 0;
        }

        if (this.x > rightblock) {
            this.x = rightblock;
            this.speedY = 0;
        }

        if (this.x < this.radius) {
            this.x = this.radius;
            this.speedY = 0;
        }
    }
}

function updateArea() {
    Area.clear();
    for (let index = 0; index < circles.length; index++) {
        circles[index].update();
        circles[index].draw();
    }


}


document.getElementById("canvas").addEventListener("click", CircleAppear);
document.getElementById("canvas").addEventListener("mousemove", UpdateCoords);

function CircleAppear(event) {
    var positionX = Math.floor(Math.random() * 1000);
    var positionY = Math.floor(Math.random() * 500);

    var x = event.clientX;
    var y = event.clientY;
    var coords = "X coords : " + x + ", Y coords : " + y;
    if (GumBallFlag == true) {
        var newCircle = new GumBall(x, y, 20);
        circles.push(newCircle);
        newCircle.draw();
    } else {
        var newCircle = new circle(x, y, 20);
        circles.push(newCircle);
        newCircle.draw();
    }

    pCoords.innerHTML = coords;


    var elementNumber = document.getElementById("number");

    var CircleNumber = circles.length;
    elementNumber.innerHTML = "Currently " + CircleNumber;
}

function UpdateCoords(event) {
    var x = event.clientX;
    var y = event.clientY;
    var coords = "X coords : " + x + ", Y coords : " + y;

    pCoords.innerHTML = coords;
}

function SwitchToGumBall() {
    var GumBallCheck = document.getElementById("GumBall");
    var showArrow = document.getElementById("showArrow");
    var GumBallArrow = document.getElementById("GumBallArrow");
    if (GumBallCheck.checked == true) {
        GumBallFlag = true;
        showArrow.style.display = "block";
        GumBallArrowFlag = true;
        GumBallArrow.checked = true;
    } else {
        GumBallFlag = false
        showArrow.style.display = "none";
        GumBallArrowFlag = false
    }

}

function ShowGumballArrows() {
    var GumBallArrow = document.getElementById("GumBallArrow");
    if (GumBallArrow.checked == true) {
        GumBallArrowFlag = true;
    } else {
        GumBallArrowFlag = false;
    }

}