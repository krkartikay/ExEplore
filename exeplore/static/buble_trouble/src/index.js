var paddle = new Paddle(GAME_HEIGHT, GAME_WIDTH);
var input = new InputHandler(paddle, ctx);

var lastTime = 0;
var temp = 0;

function gameLoop(timestamp) {

if (!game_continue)
  return game_continue;
//############################### TIME $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

ctx_score.clearRect(0,0,1500,90);
score.life_line();
var d = new Date();
var current = d.getTime()/1000;
//var previous =Math.ceil(current-score.start_time());
score.time = (current-score.start_time());
if(Math.floor(current-score.start_time())==temp)
{
  score.death_line(); 
  temp++;
}
if((current-score.start_time()) >= score.original_time)
{
  message("Time Over");
  score.death();
}
//###########################################################################
  var dt = timestamp - lastTime;
  lastTime = timestamp;
  ctx.clearRect(0, 0, 1200, 620);
  render(dt);
  paddle.update(dt);
  requestAnimationFrame(gameLoop);
}
gameLoop(0);


function render(dt)
{
  paddle.draw(ctx, character);
  integrateRope(dt);
  integrateBubbles( dt );
  paddle.drawRope();
  drawBubbles();
  score.show();
}

function drawBubble( bubble, bubble_size ) {
    ctx.beginPath();
    switch (bubble_size) {
      case 1:
        ctx.fillStyle = '#EFF3CC';
        break;
      case 2:
        ctx.fillStyle = '#FF5733';
        break;
      case 3:
        ctx.fillStyle = '#FF1700';
        break;
      case 4:
        ctx.fillStyle = '#00FFAC';
        break;
      case 5:
        ctx.fillStyle = '#FF00AD';
      default:
        ctx.fillStyle = 'blue';
        break;
    }
    
    ctx.arc( bubble.particle.location.x * W, bubble.particle.location.y * ( H - GROUND_H ),
             bubble.size * W * 0.01, 0, 2 * Math.PI );
    //bubble.particle.location.x += 0.001;
    //bubble.particle.location.y += 0.003;
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = "black";
    ctx.stroke();
}

function drawBubbles() {
    for ( var i = 0; i < bubbles.length; ++i ) {
        if ( bubbles[i].size > 0 ) {
            drawBubble( bubbles[ i ] , bubbles[i].size);
        }
    }
}


function integrateRope(dt ) {
    var bubble_hit = false;
    if ( rope_class.rope_enabled ) {
        rope_class.rope.y += ROPE_SPEED/1.5 ;
        var l = bubbles.length;
        for ( var i = 0; i < l; ++i ) {
            if ( bubbles[ i ].particle.location.y > 1 - ( rope_class.rope.y - bubbles[ i ].radius )
              && bubbles[ i ].particle.location.x > rope_class.rope.x - bubbles[ i ].radius
              && bubbles[ i ].particle.location.x < rope_class.rope.x + bubbles[ i ].radius
              && bubbles[ i ].size > 0
            ) {
                // a bubble was hit by the rope
                if ( bubbles[ i ].size > 1 ) {
                    // create two new, smaller, bubbles in its place
                    for ( var j = -1; j <= 1; j += 2 ) {
                        bubbles.push(
                            new Bubble(
                                new Particle(
                                    new Vector(
                                        rope_class.rope.x + j * bubbles[ i ].radius,
                                        bubbles[ i ].particle.location.y
                                    ),
                                    new Vector(
                                        j * Math.abs( bubbles[ i ].particle.velocity.x ),
                                        -Math.abs( bubbles[ i ].particle.velocity.y )
                                    )
                                ),
                                bubbles[ i ].size - 1
                            )

                        );

                    }
                    
                }
                // remove old big bubble which was hit
                score.temp = score.temp + Math.trunc(2*score.original_time - 2*score.time);

                bubbles[ i ].size = 0;
                bubble_hit = true;
            }
        }
        if ( rope_class.rope.y > 1 ) {
            rope_class.rope_enabled = false;
        }
    }
    if ( bubble_hit ) {
        rope_class.rope_enabled = false;
    }
}

function integrateBubbles( dt ) {
    var ended = true;
    for ( var i = 0; i < bubbles.length; ++i ) {
        if ( bubbles[ i ].size > 0 ) {
            bubbles[ i ].integrate( dt );
            ended = false;
        }
    }
    if ( ended ) {
        next_level();
    }
}


function next_level()
{
  if(score.level > 5)
  {
      message("You Won");
      game_continue = false;
    }
    else
    {
      score.score_level[score.level] = Math.max(score.temp,score.score_level[score.level])*score.level;
      var t = (timing() - score.start);
      score.coins+=score.score_level[score.level];
      score.level++;
      message("Get Ready For Next Level");
      sleep(1000);
      switch (score.level) {
        case 2:
          bg_1.src = "/static/buble_trouble/src/images/bg_2.jpg"
          bubble_level2();
          score.original_time = 70;
          score.coins = score.coins + Math.trunc(10*(score.original_time - t));
          break;
        case 3:
          bg_1.src = "/static/buble_trouble/src/images/bg_3.jpg"
          score.original_time = 30;
          score.coins = score.coins + Math.trunc(10*(score.original_time - t));
          bubble_level3();
          break;
        case 4:
          bg_1.src = "/static/buble_trouble/src/images/bg_4.jpg"
          score.original_time = 80;
          score.coins = score.coins + Math.trunc(10*(score.original_time - t));
          bubble_level4();
          break;
        case 5:
          bg_1.src = "/static/buble_trouble/src/images/bg_5.jpg"
          score.original_time = 120;
          score.coins = score.coins + Math.trunc(10*(score.original_time - t));
          bubble_level5();
          break;
        default:
          gameOver();
          break;
      }
      game_continue = true;
      setTimeout(message_remove,2000);
      score.x = score.original_x;
      paddle.position = { x: GAME_WIDTH / 2 - 80 / 2,y: GAME_HEIGHT - 100};
      input = new InputHandler(paddle, ctx);
      temp = 0;
      score.temp = 0;
      score.time = score.original_time;
      score.start = timing();
    }
}