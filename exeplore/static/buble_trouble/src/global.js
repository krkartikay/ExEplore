//#################################GAME CANVAS $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
const GAME_WIDTH = 1200*0.6;
const GAME_HEIGHT = 620*0.6;
var canvas = document.getElementById("gameScreen");
var ctx = canvas.getContext("2d");
var game_continue = true;

//#####################################GAME VARIABLE $$$$$$$$$$$$$$$$$$$$$$$$$$
var GROUND_H = 0,
    PLAYER_W = 30, PLAYER_H = 90;
var W = 1200*0.6, H = 620*0.6;
var PLAYER_SIZE_H = PLAYER_H / (H - GROUND_H),
    PLAYER_SIZE_W = PLAYER_W / W,
    PLAYER_SPEED = 0.005,
    ROPE_SPEED = 0.02;
var GAME_SPEED = 1;
//#####################################VECTOR CLASS $$$$$$$$$$$$$$$$$$$$$$$$$$$
class Vector
{
	constructor( x, y ) {
    this.x = x;
    this.y = y;
}
fromPolar( angle, length ) {
    return new Vector(
        length * Math.cos( angle ),
        -length * Math.sin( angle )
    );
}
}



//#####################################BUBBLE VARIABLE $$$$$$$$$$$$$$$$$$$$$$$
var bubble1 = new Vector(0.75, 0.45);
var bubble2 = new Vector(0.75, 0.75);
var bubble3 = new Vector(0.75, 0.58);
var bubble4;
var bubble5;
var bubbles = [
    new Bubble(
        new Particle( bubble1, bubble1.fromPolar( 0, 0.005 ) ), 3
    ),
    new Bubble(
        new Particle( bubble2, bubble2.fromPolar( -Math.PI, 0.005 ) ), 1
    ),
    new Bubble(
        new Particle( bubble3, bubble3.fromPolar( -Math.PI, 0.005 ) ), 2
    )
];



function bubble_level1()
{
    bubble1 = new Vector(0.75, 0.58);
    bubble2 = new Vector(0.75, 0.8);
    bubble3 = new Vector(0.75, 0.65);
            bubbles.length = 0;
    bubbles.push(
    new Bubble(
        new Particle( bubble1, bubble1.fromPolar( 0, 0.005 ) ), 3
    ),
    new Bubble(
        new Particle( bubble2, bubble2.fromPolar( -Math.PI, 0.005 ) ), 1
    ),
    new Bubble(
        new Particle( bubble3, bubble3.fromPolar( -Math.PI, 0.005 ) ), 2
    )
);
}

function bubble_level2()
{
    
    bubble2 = new Vector(0.25, 0.58);
    bubble3 = new Vector(0.75, 0.58);
    bubble4 = new Vector(0.75, 0.35);
    bubbles.length = 0;
    bubbles.push(
    new Bubble(
        new Particle( bubble2, bubble2.fromPolar( -Math.PI, 0.005 ) ), 3
    ),
    new Bubble(
        new Particle( bubble3, bubble3.fromPolar( -Math.PI, -0.005 ) ), 3
    )
);
}

function bubble_level3()
{
    
    bubble1 = new Vector(0.85, 0.8);
    bubbles.length = 0;
    bubbles.push(
    new Bubble(
        new Particle( bubble1, bubble1.fromPolar( -Math.PI, 0.005 ) ), 1
    ),
    new Bubble(
        new Particle( new Vector(0.70, 0.8), bubble1.fromPolar( -Math.PI, 0.005 ) ), 1
    ),
    new Bubble(
        new Particle( new Vector(0.95, 0.8), bubble1.fromPolar( -Math.PI, -0.005 ) ), 1
    ),
    new Bubble(
        new Particle( new Vector(0.85, 0.8), bubble1.fromPolar( -Math.PI, -0.005 ) ), 1
    ),
    new Bubble(
        new Particle( new Vector(0.35, 0.8), bubble1.fromPolar( -Math.PI, 0.005 ) ), 1
    ),
    new Bubble(
        new Particle( new Vector(0.25, 0.8), bubble1.fromPolar( -Math.PI, 0.005 ) ), 1
    ),
    new Bubble(
        new Particle( new Vector(0.10, 0.8), bubble1.fromPolar( -Math.PI, -0.005 ) ), 1
    )
);
}

function bubble_level4()
{
    bubble2 = new Vector(0.25, 0.58);
    bubble3 = new Vector(0.95, 0.58);
    bubble4 = new Vector(0.35, 0.35);
    bubbles.length = 0;
    bubbles.push(
    new Bubble(
        new Particle( bubble2, bubble2.fromPolar( -Math.PI, 0.005 ) ), 3
    ),
    new Bubble(
        new Particle( bubble3, bubble3.fromPolar( -Math.PI, -0.005 ) ), 3
    ),
    new Bubble(
        new Particle( bubble4, bubble4.fromPolar( -Math.PI, 0.005 ) ), 3
    ),
    new Bubble(
        new Particle( new Vector(0.15, 0.35), bubble4.fromPolar( -Math.PI, 0.005 ) ), 4
    )
);
}

function bubble_level5()
{
    bubble2 = new Vector(0.25, 0.38);
    bubble3 = new Vector(0.95, 0.38);
    bubbles.length = 0;
    bubbles.push(
    new Bubble(
        new Particle( bubble2, bubble2.fromPolar( -Math.PI, 0.005 ) ), 5
    ),
    new Bubble(
        new Particle( bubble3, bubble3.fromPolar( -Math.PI, -0.005 ) ), 5
    ),
);
}
// ####################################ROPE CLASS $$$$$$$$$$$$$$$$$$$$$$$$$$$
class rope_var
{
	constructor()
	{
		this.rope = new Vector(0, 0);
		this.rope_enabled = false;
	}
}

var rope_class = new rope_var();




//################################# SCORE CANVAS $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

var score_canvas =  document.getElementById("scoreScreen");
var ctx_score = score_canvas.getContext("2d");


//#####################################IMAGE VARIABLE $$$$$$$$$$$$$$$$$$$$$$$$
var character = new Image();
var bg_1 = new Image();
character.src = "/static/buble_trouble/src/images/char1.png";
bg_1.src = "/static/buble_trouble/src/images/bg_1.jpg"




//############################

function message( text ) {
    var popup = document.getElementById( 'popup' );
    popup.style.visibility = 'visible';
    popup.style.top = ( H) / 2;
    popup.innerHTML = text;
    popup.style.display = 'block';
}


function message_remove()
{
    var popup = document.getElementById( 'popup' );
    popup.style.visibility = 'collapse';
}
//##################################### SCORE CLASS $$$$$$$$$$$$$$$$$$$$$$$$$$
function timing()
{
    var d = new Date();
    var start = d.getTime();
    return start/1000;
}

function gameOver() {
    // alert( 'Game over!'+score.coins );
    console.log(score.coins);
    var data = { 'score': score.coins, 'tokens': token };
    // data['score']=score;
    $.ajax({
        type: "POST",
        url: "/api/newscore",
        data: JSON.stringify(data),
        contentType: 'application/json;charset=UTF-8',
        success: function (result) {
            console.log(result);
            window.location.href = "/leaderboard";
        }
    });
}

function victory() {
    message( 'Victory!' );
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

class score_class{
    constructor()
    {
        this.original_time = 60.0;
        this.coins = 0;
        this.time = 60.0;
        this.life = 4;
        this.level=1;
        this.original_x = 1400;
        this.original_y = 20;
        this.x = 1400;
        this.y = 20;
        this.start = timing();
        this.step = 1350/this.time;
        this.temp=0;
        this.score_level = new Array(10).fill(0);;
    }
    death()
    {
        game_continue = false;
        this.life--;
        if(this.life<=0)
            {
                gameOver();
            }
        else
        {
            message("Get Ready.  \nLife = " + this.life);
            sleep(1000);
            switch (this.level) {
                case 1:
                    this.score_level[this.level] = Math.max(this.temp,this.score_level[this.level]);
                    bubble_level1();
                    break;
                case 2:
                    this.score_level[this.level] = Math.max(this.temp,this.score_level[this.level]);
                    bubble_level2();
                    break;
                case 3:
                    this.score_level[this.level] = Math.max(this.temp,this.score_level[this.level]);
                    bubble_level3();
                    break;
                case 4:
                    this.score_level[this.level] = Math.max(this.temp,this.score_level[this.level]);
                    bubble_level4();
                    break;
                case 5:
                    this.score_level[this.level] = Math.max(this.temp,this.score_level[this.level]);
                    bubble_level5();
                    break;
                default:
                    gameOver();
                    break;
            }
            game_continue = true;
            setTimeout(message_remove,2000);
            this.x = this.original_x;
            paddle.position = { x: GAME_WIDTH / 2 - 80 / 2,y: GAME_HEIGHT - 100};
            input = new InputHandler(paddle, ctx);
            temp = 0;
            this.time = this.original_time;
            this.start = timing();
            this.temp = 0;
            
        }
        
    }
    show()
    {
        //ctx_score.moveTo(0,0);
        //console.log(this.life);
        var c = this.coins + this.temp;
        ctx_score.font = "30px Comic Sans MS";
        ctx_score.fillText('LIFE = ' + this.life, 100, 70);
        ctx_score.fillText('LEVEL = ' + this.level, 650, 70);
        ctx_score.fillText('Score = ' + c, 1200, 70);

    }
    life_line()
    {
        ctx_score.strokeStyle = "#ff0000";
        ctx_score.beginPath();
        ctx_score.moveTo(50, 20);
        ctx_score.lineWidth = 20;
        ctx_score.lineTo(this.x,this.y);
        ctx_score.stroke();
    
    }
    death_line()
    {
        /*
        ctx_score.strokeStyle = "#a45b26";
        ctx_score.beginPath();
        ctx_score.moveTo(this.x,this.y);
        ctx_score.lineWidth = 20;
        ctx_score.lineTo(this.x-this.step,this.y);
        ctx_score.stroke();*/
        this.step = 1350/this.original_time;
        this.x-=this.step;

    }
    start_time()
    {
        return this.start;
    }
    
}


var score = new score_class();