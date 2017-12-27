function Animacao(context){
  this.context = context;
  this.sprites = [];
  this.ligado = false;
  this.processamentos = [];
}

Animacao.prototype = {
  novoSprite: function(sprite){
    this.sprites.push(sprite);
    sprite.animacao = this;
  },
  ligar: function(){
    this.ligado = true;
    this.proximoFrame();
  },
  desligar: function(){
    this.ligado = false;
  },
  proximoFrame: function(){
    if(!this.ligado) return;
    // Retirado, pois a partir deste ponto estarei trabalhando sempre com o fundo rolando, então não é preciso limpar animação, apenas desenhá-la por cima, isso salvará algum processamento.
    // this.limparTela();

    for(var i in this.sprites){
      this.sprites[i].atualizar();
    }

    for(var i in this.sprites){
      this.sprites[i].desenhar();
    }

    for(var i in this.processamentos){
      this.processamentos[i].processar();
    }

    var animacao = this;
    requestAnimationFrame(function(){
      animacao.proximoFrame();
    });
  },
  novoProcessamento: function(processamento){
    this.processamentos.push(processamento);
    processamento.animacao = this;
  },
  limparTela: function(){
    var ctx = this.context;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }
}