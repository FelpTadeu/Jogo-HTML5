// Este arquivo foi criado primeiramente para o arquivo '12.teclado-teste-2', mas está sendo usado por outros arquivos, então cada trecho do código terá indicado a qual arquivo pertence

var SETA_ESQUERDA = 37;
var SETA_DIREITA = 39;
var SETA_CIMA = 38;
var SETA_BAIXO = 40;
// 14
var ESPACO = 32;
// --

function Teclado(elemento){
  this.elemento = elemento;
  
  this.pressionadas = [];
  // 14
  this.disparadas = [];
  this.funcoesDisparo = [];
  // --
  
  var teclado = this;
  
  elemento.addEventListener("keydown", function(evento){
    // 14
    var tecla = evento.keyCode;
    teclado.pressionadas[tecla] = true;
    // --

    // 14
    if(teclado.funcoesDisparo[tecla] && !teclado.disparadas[tecla]){

      teclado.disparadas[tecla] = true;
      teclado.funcoesDisparo[tecla] ();
    }
    // --
  });

  elemento.addEventListener("keyup", function(evento){
    teclado.pressionadas[evento.keyCode] = false;
    // 14
    teclado.disparadas[evento.keyCode] = false;
    // --
  });
}

Teclado.prototype = {
  pressionada: function(tecla){
    return this.pressionadas[tecla];
  },
  // 14
  disparou: function(tecla, callback){
    this.funcoesDisparo[tecla] = callback;
  }
  // --
}