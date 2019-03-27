var player;
var pipes = [];
var score = 0; 

function Player() {
    this.y = 500;
    this.x = 900;

    this.show = function () {
        fill(255);
        ellipse(this.x, this.y, 32, 32);
    }

    this.update = function () {
        this.x = mouseX;
        this.y = mouseY;
    }
}


function setup() {
    createCanvas(innerWidth, innerHeight);
    player= new Player();
    pipes.push(new Pipe());
    frameRate(60)
}

var running = true;

function draw() {
    if(!running) return;
    background(0);
    fill(0, 102, 153);
    text(score, 10, 60);
    for (var i = pipes.length - 1; i >= 0; i--) {
        pipes[i].show();
        pipes[i].update();

        if (pipes[i].hits(player)) {
            console.log(score);
            var data={'score' : score, 'tokens':token};
            // data['score']=score;
            $.ajax({
                type: "POST",
                url: "/api/newscore",
                data: JSON.stringify(data),
                contentType: 'application/json;charset=UTF-8',
                success: function (result) {
                    console.log(result);
                    window.location.href = "http://127.0.0.1:5000/leaderboard";
                }
            });
            running = false;
        };

        if (pipes[i].offscreen()) {
            pipes.splice(i, 1);
        }
        score++;
        if (score % 1000 == 0) {
            speed += 1;
            console.log(speed);
        }
    }
    player.show();

    if (frameCount % 60 == 0) {
        pipes.push(new Pipe());
    }
}
 
function mouseMoved() {
    player.update()    
}
