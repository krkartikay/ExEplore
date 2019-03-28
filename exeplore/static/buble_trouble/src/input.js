class InputHandler {
  constructor(paddle, ctx) {
    document.addEventListener("keydown", event => {
      switch (event.keyCode) {
        case 32: //SPACE
          if ( !rope_class.rope_enabled ) {
                rope_class.rope_enabled = true;
                rope_class.rope.x = paddle.position.x/1200 + 38/1200;
                rope_class.rope.y = 100/500;
                //rope_class.rope.y = 0;
                paddle.drawRope();
        }
          break;
        case 37: //LEFT
          paddle.moveLeft();
          break;
        case 39: //RIGHT
          paddle.moveRight();
          break;
      }

      //alert(event.keyCode);
    });
    document.addEventListener("keyup", event => {
      switch (event.keyCode) {
        case 32: //SPACE
          break;
        case 37: //LEFT
          if (paddle.speed < 0) paddle.stop();
          break;
        case 39: //RIGHT
          if (paddle.speed > 0) paddle.stop();
          break;
      }

      //alert(event.keyCode);
    });
  }
}
