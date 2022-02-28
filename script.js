var particles = [];
var pCoords = document.getElementById("coords");
var canvas = document.getElementById("canvas");
var startBtn = document.getElementById("startBtn");
var stopBtn = document.getElementById("stopBtn");
var elementNumber = document.getElementById("number");
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

function randomNumBetween(min, max) {
    return min + Math.random() * (max - min);
}

class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    static addition(vectorA, vectorB) {
        return new Vector(vectorA.x + vectorB.x, vectorA.y + vectorB.y);
    }

    static multiplication(vector, value) {
        return new Vector(vector.x * value, vector.y * value);
    }

    static division(vector, value) {
        return new Vector(vector.x / value, vector.y / value);
    }

    static substraction(vectorA, vectorB) {
        return new Vector(vectorA.x - vectorA.x, vectorB.x - vectorB.y);
    }

    //Produit scalaire
    dot(vector) {
        return this.x * vector.x + this.y * vector.y;
    }

    //Vecteur tangent
    getTangent() {
        return new Vector(-this.y, this.x);
    }

    //Norme
    mag() {
        return Math.sqrt((this.x * this.x) + (this.y * this.y));
    }

    static random(minX, maxX, minY, maxY) {
        return new Vector(randomNumBetween(minX, maxX), randomNumBetween(minY, maxY));
    }
}

class Particle {
    constructor(positionX, positionY) {
        this.position = new Vector(positionX, positionY);
        this.velocity = Vector.random(-1, 1, -1, 1);
        this.acceleration = new Vector(0, 0);
        this.radius = 20;
        this.color = "green";
    }
    update() {
        this.position = Vector.addition(this.position, this.velocity);
        this.velocity = Vector.addition(this.velocity, this.acceleration);
        this.acceleration = Vector.multiplication(this.acceleration, 0);
    }

    handleEdges(width, height) {
        if (this.position.x - this.radius <= 0 || this.position.x + this.radius >= width) {
            this.velocity.x = -this.velocity.x;
        } else if (this.position.y - this.radius <= 0 || this.position.y + this.radius >= height) {
            this.velocity.y = -this.velocity.y;
        }
    }


    draw() {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

}

function updateArea() {
    Area.clear();
    for (let index = 0; index < particles.length; index++) {
        particles[index].update();
        particles[index].handleEdges(canvas.width, canvas.height);
        particles[index].draw();
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
        var newCircle = new Particle(x, y);
        particles.push(newCircle);
        newCircle.draw();
    } else {
        var newCircle = new Particle(x, y);
        particles.push(newCircle);
        newCircle.draw();
    }

    pCoords.innerHTML = coords;


    var CircleNumber = particles.length;
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

function AddGumBalls(event) {
    var GumBallNbr = document.getElementById("AddGumBallNbr").value;
    if (GumBallNbr < 101) {
        var counter = 0;
        console.log(GumBallNbr);
        while (counter != GumBallNbr) {
            var positionX = Math.floor(Math.random() * 1000);
            var positionY = Math.floor(Math.random() * 500);

            var newCircle = new Particle(positionX, positionY);
            particles.push(newCircle);
            newCircle.draw();
            counter++;
            var CircleNumber = particles.length;
            elementNumber.innerHTML = "Currently " + CircleNumber;
        }
    }

}