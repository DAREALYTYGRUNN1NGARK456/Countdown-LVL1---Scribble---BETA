var code;
var hintone;
var hinttwo;
var hintthree;
var hintfour;
var lastfour = "9999";
function startCountdown(){
  var minutes = 15;
  var seconds = 0;
  var textcolor = "Black";
  setInterval(
    function(){
      if (seconds === 0){
        if (minutes === 0){
          window.location.replace("lose.html");
        } else {
          minutes --;
          seconds = 59;
        }
      } else {
        seconds --;
      }
      if (reverse(lastfour) === code){
        window.location.replace("win.html");
      }
      document.getElementById("countdown").innerHTML = minutes + ":" + seconds
      if (minutes === 0){
        if (textcolor === "Black"){
          document.getElementById("countdown").style.color = "#ff0000";
          textcolor = "Red";
        } else {
          document.getElementById("countdown").style.color = "#000000";
          textcolor = "Black";
        }
      }
    }, 1000);
}

var mouseDown = false;
document.body.onmousedown = function() { 
  mouseDown = true;
}
document.body.onmouseup = function() {
  mouseDown = false;
}

// Hint stuff

document.getElementById("button0").onmousedown = function(event) {
    if (event.which === 3) {
        document.getElementById("button0").innerHTML = hinttwo;
    }
}

document.getElementById("button1").onmousedown = function() {
    setTimeout(function(){
      if (mouseDown === true){
        document.getElementById("button1").innerHTML = hintthree;
      }
    }, 3000);
}

// Other stuff

function generateCode(){
  // Generate code
  var num1 = Math.floor(Math.random() * 10);
  var num2 = Math.floor(Math.random() * 10);
  var num3 = Math.floor(Math.random() * 10);
  var num4 = Math.floor(Math.random() * 10);
  code = "" + num1 + num2 + num3 + num4;
  if (code === "9999" || code === 9999){
    generateCode();
    return;
  }
  // Assign numbers to each hint
  hintone = num1;
  hinttwo = num2;
  hintthree = num3;
  hintfour = num4;
  console.log(code);
}

function generateFormula(correctnumber){
  var numberone = Math.floor(Math.random() * 10);
  var numbertwo = correctnumber - numberone
  var equation = "" + numberone + " + " + numbertwo + " = " + correctnumber;
  return equation;
}

function buttonPress(button){
  lastfour = "" + button + lastfour;
  lastfour = lastfour.slice(0, -1);
  console.log(lastfour);
}

function reverse(n)
{
	n = n + "";
	return n.split("").reverse().join("");
}

function start(){
  generateCode();
  document.getElementById("scribble").innerHTML = generateFormula(hintone);
  document.getElementById("hidden").innerHTML = hintfour;
  startCountdown();
}

start();
