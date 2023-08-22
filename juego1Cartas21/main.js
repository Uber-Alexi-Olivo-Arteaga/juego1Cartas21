var sumajugador = 0;
var sumamaquina = 0;
var oculta;
var baraja=[];
var resultado;
var puedespedir = true;

window.onload = function juego(){
  hacerbaraja();
  barajar();
  juega();
}

function hacerbaraja(){
  let valores = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "d", "J", "Q", "K"];
  let tipos = ["T", "D", "C", "P"];
  for (let i = 0; i < tipos.length; i++) {
    for (let j = 0; j < valores.length; j++){
        baraja.push(valores[j]+tipos[i])
    }
  }    
}

function barajar(){
  for (let i = 0; i < baraja.length; i++) {
    let j = Math.floor(Math.random()* baraja.length) // (0-1) 52 => (0-51.9999)
    let temp=baraja[i];
    baraja[i] = baraja[j];
    baraja[j] = temp;
  }

  console.log(baraja);
}

function juega(){
  oculta = baraja.pop()
  sumamaquina= sumamaquina + valorcarta(oculta)
  console.log(`oculta:  ${oculta}  ${sumamaquina}`)  //presenta en la consola la carta q esta volteada

  for (let i = 0;i<1;i++){
    //<img src="./cards/4-C.png'
    let cartaImg = document.createElement("img");
    let carta = baraja.pop();
    cartaImg.src = "./imgs/cartas/" + carta + ".png";
    sumamaquina += valorcarta(carta);
    document.getElementById("cartasMaquina").append(cartaImg);
  }

  for (let i = 0;i<2;i++){
  let cartaImg = document.createElement("img");
  let carta = baraja.pop();
  cartaImg.src = "./imgs/cartas/" + carta + ".png";
  sumajugador = sumajugador+valorcarta(carta);
  document.getElementById("cartasJugador").append(cartaImg);
}
  //esto ya no es necesario pero lo dejo por si las moscas
  // console.log(`suma maquina: ${sumamaquina}`)
  //console.log(`suma jugador jugador: ${sumajugador}`)
}

function pedir(){
  if(!puedespedir){
    return
  }

  let cartaImg = document.createElement("img");
  let carta = baraja.pop();

  cartaImg.src = "./imgs/cartas/" + carta + ".png";
  sumajugador = sumajugador+valorcarta(carta);
  document.getElementById("cartasJugador").append(cartaImg);
  if (sumajugador>21){
    puedespedir=false;
  }
}

function quedarse(){
  while (sumamaquina<17){
    let cartaImg = document.createElement("img");
    let carta = baraja.pop();
    cartaImg.src = "./imgs/cartas/" + carta + ".png";
    sumamaquina = sumamaquina + valorcarta(carta);
    document.getElementById("cartasMaquina").append(cartaImg);
  }

  document.getElementById("oculta").src = "./imgs/cartas/" + oculta + ".png";
  puedespedir=false;
  console.log(`jugador: ${sumajugador}`);   
  console.log(`maquina: ${sumamaquina}`);

  if (sumajugador <= 21 && (sumajugador > sumamaquina || sumamaquina > 21)) {
    resultado = "Gana el jugador";
  } else if (sumamaquina <= 21 && (sumamaquina > sumajugador || sumajugador > 21)) {
      resultado = "Gana la máquina";
    } else {
      resultado = "Empate";
    }

  console.log(resultado)
  document.getElementById("mostrarCartas").innerHTML= resultado+ " jugador: "+sumajugador + " maquina: " + sumamaquina;
}

function valorcarta(carta){
  let p = carta;
  let valor = p[0];

  if(isNaN(valor)){
    if(valor=="A" ){
      return 1;
    }
  if(valor=="d" ){
    return 10;
  }
  return 10;
  }

return parseInt(valor);
}