class Paddle {
  constructor(gameHeight, gameWidth) {
    this.gameHeight = gameHeight;
    this.gameWidth = gameWidth;
    this.width = 80;
    this.height = 100;
    this.maxSpeed = 5;
    this.speed = 0;


    this.position = {
      x: gameWidth / 2 - this.width / 2,
      y: gameHeight - this.height
    };
  }
  draw(ctx, character) {
    ctx.drawImage(bg_1,0,0,1200,620);
    ctx.drawImage(
      character,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
      
  }
  update(dt) {
    if (!dt) return;
    if (this.position.x < -25) this.position.x = -25;
    if (this.position.x + this.width > this.gameWidth + 25)
      this.position.x = this.gameWidth - this.width + 25;
    this.position.x += this.speed;
  }
  moveLeft() {
    this.speed = -this.maxSpeed;
  }
  moveRight() {
    this.speed = this.maxSpeed;
  }
  stop() {
    this.speed = 0;
  }

  drawRope() {
    if (!rope_class.rope_enabled) return;
    ctx.strokeStyle = "#330000";
    ctx.beginPath();
    ctx.moveTo(rope_class.rope.x * W, H);
    ctx.lineWidth = 4;
    for (var t = 0; t < rope_class.rope.y; t += 0.005) {
      ctx.lineTo(rope_class.rope.x * W + 3 * Math.sin(150 * t),H - t * H);
    }
    ctx.stroke();
    
  }

}
