class Jogador {
  constructor(position, veloci, frame, controle, config, ctx) {
    this.position = position;
    this.veloci = veloci;
    this.controle = controle;
    this.frame = frame;
    this.ctx = ctx;
    this.config = config;
    this.width = 120;
    this.height = 140;
    this.vida = 100;
    this.image = new Image();
    this.image.src =
      "./img/max/max" +
      this.frame.estado +
      this.controle.dirX +
      this.frame.value +
      ".png";
    //defini o width/height aqui pq tem alguns sprites com tamanho diferente, deixei
    //por precaução, porem não usei. talvez seja melhor depois colocar todos os sprites lado a lado
    //para arrumarmos
    this.spritew = 120;
    this.spriteh = 120;
    this.life = new Image();
    this.life.src = "./img/info/vida.png";
  }

  draw() {
    this.ctx.drawImage(
      this.image,
      0,
      0,
      this.spritew,
      this.spriteh,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  exibirVida(vida) {
    ctx.beginPath();
    var degrade = ctx.createLinearGradient(0, 0, 200, 0);
    degrade.addColorStop(0, "DarkRed");
    degrade.addColorStop(1, "red");
    ctx.fillStyle = degrade;
    ctx.fillRect(75, 29, Math.max(0, (180 * vida) / 100), 33);
    ctx.closePath();
    ctx.drawImage(this.life, 50, 22, 210, 50);
  }

  gravi(locVidas, removerVidaAnimada) {
    const vidasTocadas = locVidas.filter(
      (locVida) =>
      
        locVida.x + locVida.width >= this.position.x &&
        locVida.x <= this.position.x + this.width &&
        locVida.y <= this.position.y + this.height &&
        locVida.y + locVida.height >= this.position.y
    );
    if (vidasTocadas.length > 0) {
      vidasTocadas.forEach((locVida) => {
        removerVidaAnimada(locVida);
        this.vida = Math.min(100, this.vida + 5);
      });
    }

    this.exibirVida(this.vida);
    this.position.x += this.veloci.x;

    if (this.position.x + this.width >= canvas.width || this.position.x <= 0) {
      this.position.x = this.position.x <= 0 ? 0 : canvas.width - this.width;
    }
    this.position.y += this.veloci.y;

    this.veloci.y += this.config.gravidade;

    if (this.position.y + this.height + 65 >= this.ctx.canvas.height) {
      this.veloci.y = 0;
      if (this.position.y + this.height > this.ctx.canvas.height)
        this.position.y = this.ctx.canvas.height - this.height;
    }

    this.draw();
  }

  upd(locVidas, removerVidaAnimada) {
    this.gravi(locVidas, removerVidaAnimada);
    this.veloci.x = 0;
    if (this.vida > 0) {
      if (this.controle.a) {
        this.frame.changeEstado("andando");
        this.veloci.x = -7;
      } else if (this.controle.d) {
        this.frame.changeEstado("andando");
        this.veloci.x = 7;
      } else if (this.frame.estado != "atirando") {
        this.frame.changeEstado("parado");
      }
      //pulo único
      if (this.controle.w && this.veloci.y == 0) {
        this.veloci.y = -15;
      }

      if (this.veloci.y != 0) {
        this.frame.changeEstado("pulando");
      }
    } else {
      if (this.vida == 0) this.veloci.y = -10;
      this.vida--;
      this.frame.changeEstado("morrendo");
    }

    /* if (this.position.x <= 10) Cenario.cenarioatual = 2; */

    //anima os sprites
    this.frame.update(this);
  }
}
