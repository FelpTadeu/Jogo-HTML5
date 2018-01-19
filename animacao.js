function Animacao(context){
  this.context = context;
  this.sprites = [];
  this.ligado = false;
  this.processamentos = [];
  this.spritesExcluir = [];
  this.processamentosExcluir = [];
  this.ultimoCiclo = 0;
  this.decorrido = 0;
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
    // Retirado, pois a partir deste ponto estarei trabalhando sempre com o fundo rolando, então não é preciso limpar animação, apenas desenhá-la por cima, isto salvará algum processamento.
    // this.limparTela();

    var agora = new Date().getTime();
    if(this.ultimoCiclo == 0) this.ultimoCiclo = agora;
    this.decorrido = agora - this.ultimoCiclo;

    for(var i in this.sprites){
      this.sprites[i].atualizar();
    }

    for(var i in this.sprites){
      this.sprites[i].desenhar();
    }

    for(var i in this.processamentos){
      this.processamentos[i].processar();
    }

    this.processarExclusoes();

    // Atualizar o instante do último ciclo
    this.ultimoCiclo = agora;

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
  },
  excluirSprite: function(sprite){
    this.spritesExcluir.push(sprite);
  },
  excluirProcessamento: function(processamento){
    this.processamentosExcluir.push(processamento);
  },
  processarExclusoes: function(){
    var novoSprites = [];
    var novoProcessamentos = [];

    for(var i in this.sprites){
      if(this.spritesExcluir.indexOf(this.sprites[i]) == -1){
        novoSprites.push(this.sprites[i]);
      }
    }

    for(var i in this.processamentos){
      if(this.processamentosExcluir.indexOf(this.processamentos[i]) == -1){
        novoProcessamentos.push(this.processamentos[i]);
      }
    }

    this.spritesExcluir = [];
    this.processamentosExcluir = [];

    this.sprites = novoSprites;
    this.processamentos = novoProcessamentos;
  }
}