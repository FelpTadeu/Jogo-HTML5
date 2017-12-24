function Nave(context, teclado, imagem){
  this.context = context;
  this.teclado = teclado;
  this.imagem = imagem;
  this.x = 0;
  this.y = 0;
  this.velocidade = 0;
}

Nave.prototype = {
  atualizar: function(){
    if(this.teclado.pressionada(SETA_ESQUERDA) && this.x > 5){
      this.x -= this.velocidade;
    }

    if(this.teclado.pressionada(SETA_DIREITA) && this.x < this.context.canvas.width - this.imagem.width - 5){
      this.x += this.velocidade;
    }

    if(this.teclado.pressionada(SETA_CIMA) && this.y > 5){
      this.y -= this.velocidade;
    }

    if(this.teclado.pressionada(SETA_BAIXO) && this.y < this.context.canvas.height - this.imagem.height){
      this.y += this.velocidade;
    }
  },
  desenhar: function(){
    this.context.drawImage(this.imagem, this.x, this.y, this.imagem.width, this.imagem.height);
    this.context.strokeRect(this.x, this.y, this.imagem.width, this.imagem.height);
  },
  atirar: function(){
    /*
      Repare que posso mudar, e não passar mais a nave pelo construtor para o tiro(segundo parâmetro, this), e posso fazer direto como no exemplo abaixo(Essa maneira foi utilizada no capítulo 3, no teclao-teste-3)
      t.x = this.x + this.imagem.width/2 - t.largura/2;
      t.y = this.y - t.altura;
    */
    var t = new Tiro(this.context, this);
    this.animacao.novoSprite(t);
  }
}