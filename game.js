var seq = [];
var userseq = [];
var btnclrs = ["red","blue","green","yellow"];
var gamestarted = false;
var level = 0;

function rndgen(){
  var randomnumber = Math.floor(Math.random()*4);
  return randomnumber;
}

function playsound(name){
  var aud = new Audio("sounds/"+name+".mp3");
  aud.play();
}

function addpressanimation(color){
  $("."+color).addClass("pressed");
  setTimeout(function () {
    $("."+color).removeClass("pressed");
  }, 100);
}

function addseq(){
  level++;
  userseq = [];

  $("h1").text("Level "+level);
  var n = rndgen();

  seq.push(btnclrs[n]);
  $("."+btnclrs[n]).fadeIn(100).fadeOut(100).fadeIn(100);
  playsound(btnclrs[n]);
  console.log("seq: ");
  console.log(seq);
}

function game(currentlevel){
  if(seq[currentlevel-1]===userseq[currentlevel-1]){
    if(userseq.length===seq.length){
      console.log("success"+currentlevel);

      setTimeout(function () {
        addseq();

      }, 1000);
    }
  }else{
    playsound("wrong");
    $("body").addClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    gamestarted = false;
    level =0;
    seq = [];

    console.log("fail");
  }
}

$(document).keypress(function(){
  if(!gamestarted){
    $("h1").text("Level "+level);
    addseq();
    gamestarted = true;
  }

});

$(".btn").click(function(event){

if(gamestarted){
  userseq.push(event.target.id);
  playsound(event.target.id);
  addpressanimation(event.target.id);
  game(userseq.length);

  console.log("userseq: ");
  console.log(userseq);
}

});
