class Perri {
  constructor(position, veloci, config, ctx) {
    this.position = position;
    this.veloci = veloci;
    this.width = 75;
    this.height = 180;
    this.ctx = ctx;
    this.config = config;
    this.dirX = "e";
    this.vida = 100;
    this.image = new Image();
    this.image.src =
      "./img/pérri/perriparado" + this.dirX + ".png";
  }

  draw() {
    this.ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  exibirVida(vida) {
    const life = new Image();
    life.src = "./img/info/vidainimigo.png";
    ctx.beginPath();
    var degrade = ctx.createLinearGradient(0, 0, 200, 0);
    degrade.addColorStop(0, "DarkRed");
    degrade.addColorStop(1, "red");
    ctx.fillStyle = degrade;
    ctx.fillRect(
      this.position.x - 10,
      this.position.y - 15,
      Math.max(0, (75 * vida) / 100),
      10
    );
    ctx.closePath();

    ctx.drawImage(life, this.position.x - 10, this.position.y - 15, 75, 10);
  }

  upd() {
    this.position.x += this.veloci.x;
    this.position.y += this.veloci.y;
    this.veloci.y += this.config.gravidade;

    /* adicionar sprites diferentes 
    if(this.config.gameframe % 10 == 0){

    } */


    if (this.position.y + this.height + 65 >= this.ctx.canvas.height) {
      this.veloci.y = 0;
      if (this.position.y + this.height > this.ctx.canvas.height)
        this.position.y = this.ctx.canvas.height - this.height;
    }

    this.draw();
  }
}
