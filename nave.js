function Nave(context, teclado, imagem, imgExplosao){
  this.context = context;
  this.teclado = teclado;
  this.imagem = imagem;
  this.x = 0;
  this.y = 0;
  this.velocidade = 0;
  this.imgExplosao = imgExplosao;
  this.acabaramVidas = null;
  this.vidasExtras = 3;

  // Criado para a animação da nave
  this.spritesheet = new Spritesheet(context, imagem, 3, 2);
  this.spritesheet.linha = 0;
  this.spritesheet.intervalo = 100;
}

Nave.prototype = {
  atualizar: function(){
    var incremento = this.velocidade * this.animacao.decorrido / 1000;

    if(this.teclado.pressionada(SETA_ESQUERDA) && this.x > 5){
      this.x -= incremento;
    }

    // Antes de alterar a nave para spritesheet
    // if(this.teclado.pressionada(SETA_DIREITA) && this.x < this.context.canvas.width - this.imagem.width - 5){
    //   this.x += incremento;
    // }
    if(this.teclado.pressionada(SETA_DIREITA) && this.x < this.context.canvas.width - 36 - 5){
      this.x += incremento;
    }

    if(this.teclado.pressionada(SETA_CIMA) && this.y > 5){
      this.y -= incremento;
    }

    // Antes de alterar a nave para spritesheet
    // if(this.teclado.pressionada(SETA_BAIXO) && this.y < this.context.canvas.height - this.imagem.height){
    //   this.y += this.velocidade;
    // }
    if(this.teclado.pressionada(SETA_BAIXO) && this.y < this.context.canvas.height - 48){
      this.y += incremento;
    }
  },
  desenhar: function(){
    // Antes de utilizar spritesheet para a nave
    // this.context.drawImage(this.imagem, this.x, this.y, this.imagem.width, this.imagem.height);
    // this.context.strokeRect(this.x, this.y, this.imagem.width, this.imagem.height);

    if(this.teclado.pressionada(SETA_ESQUERDA)){
      this.spritesheet.linha = 1;
    }else if(this.teclado.pressionada(SETA_DIREITA)){
      this.spritesheet.linha = 2;
    }else{
      this.spritesheet.linha = 0;
    }

    this.spritesheet.desenhar(this.x, this.y);
    this.spritesheet.proximoQuadro();
  },
  atirar: function(){
    var t = new Tiro(this.context, this);
    this.animacao.novoSprite(t);
    this.colisor.novoSprite(t);
  },
  retangulosColisao: function(){
    var rets = [
                {x:this.x + 2, y:this.y + 19, largura: 9, altura: 13},
                {x:this.x + 13, y:this.y + 3, largura: 10, altura: 33},
                {x:this.x + 25, y:this.y + 19, largura: 9, altura: 13}
              ];

    // Desenhando os retângulos para visualização
    var ctx = this.context;

    for(var i in rets){
      ctx.save();
      // === Debugging ==========
      // ctx.strokeStyle = "yellow";
      // ctx.strokeRect(rets[i].x, rets[i].y, rets[i].largura, rets[i].altura);
      // === Debugging ==========
      ctx.restore();
    }
    return rets;
  },
  colidiuCom: function(outro){
    // Se colidiu com um Ovni
    if(outro instanceof Ovni){
      // Fim de jogo
      this.animacao.excluirSprite(this);
      this.animacao.excluirSprite(outro);
      this.colisor.excluirSprite(this);
      this.colisor.excluirSprite(outro);

      var exp1 = new Explosao(this.context, this.imgExplosao, this.x, this.y);
      var exp2 = new Explosao(this.context, this.imgExplosao, outro.x, outro.y);

      this.animacao.novoSprite(exp1);
      this.animacao.novoSprite(exp2);

      var nave = this;
      exp1.fimDaExplosao = function(){
        nave.vidasExtras--;

        if(nave.vidasExtras < 0){
          if(nave.acabaramVidas) nave.acabaramVidas();
        }else{
          nave.colisor.novoSprite(nave);
          nave.animacao.novoSprite(nave);

          nave.posicionar();
        }
      }
    }
  },
  posicionar: function(){
    var canvas = this.context.canvas;
    this.x = canvas.width/2 - 18;
    this.y = canvas.height - 48;
  }
}