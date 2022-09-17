class Inimigo {
  constructor(position, veloci, sprite, width, height, config, ctx) {
    this.position = position;
    this.veloci = veloci;
    this.sprite = sprite;
    this.dirX = "d";
    this.ctx = ctx;
    this.config = config;
    this.width = width;
    this.height = height;
    this.vida = 100;
    this.image = new Image();
    this.image.src =
      "./img/inimigos/inimigo" + this.dirX + this.sprite + ".png";
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

  droparVida(locVidas) {
    locVidas.push({
      x: this.position.x + this.width / 2,
      y: 435,
      width: 25,
      height: 25
    });
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

  gravi(max, removerInimigo, locVidas) {
    if (this.vida == 0) {
      removerInimigo(this);
      this.droparVida(locVidas)
      return;
    }

    if (
      max.position.x + max.width >= this.position.x &&
      max.position.x <= this.position.x + this.width
    ) {
      this.veloci.x = 0;

      if (
        max.position.y + max.height >= this.position.y &&
        max.position.y <= this.position.y + this.height
      )
        max.vida -= 0.1;
    } else {
      this.veloci.x = max.position.x < this.position.x ? -4 : 4;
      // muda a direção da imagem
      this.dirX = this.veloci.x > 0 ? "d" : "e";

      this.position.x += this.veloci.x;
    }

    this.image.src =
      "./img/inimigos/inimigo" + this.dirX + this.sprite + ".png";

    this.position.y += this.veloci.y;
    this.veloci.y += this.config.gravidade;

    if (this.position.y + this.height + 65 >= this.ctx.canvas.height) {
      this.veloci.y = 0;
      if (this.position.y + this.height > this.ctx.canvas.height)
        this.position.y = this.ctx.canvas.height - this.height;
    }

    this.exibirVida(this.vida)
    this.draw();
  }
}
