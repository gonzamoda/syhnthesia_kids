//Constructor clase rectangle------

class Rectangle {
  constructor(x, y, height, color) {
    this.x = x + 10;
    this.y = y;
    this.height = height;
    this.weight = 42;
    this.color = color;
    this.vfactor = 1;

    this.dy = +6;

    this.draw = function () {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.roundRect(this.x, this.y, this.weight, this.height, 5);
      ctx.fill();
      ctx.strokeStyle = "white";
      ctx.stroke();
      ctx.lineWidth = "2";
    };

    this.animate = function () {
      this.y += this.dy * this.vfactor;

      this.draw();
    };
  }
}

//Fin Constructor clase rectangle------
