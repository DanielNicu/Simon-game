
var buttonColours = ["red", "blue", "green", "yellow"];
var ok = true;
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
$(".btn").click(function() {
  if ( ok == false){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
}});
$(document).keypress(function(){
  if(ok === true){
    ok=false;
    nextSequence();
  }
});
function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] == userClickedPattern[currentLevel]){
    console.log("succes");
    if(gamePattern.length == userClickedPattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  }
  else{
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 100);
    $('h1').text('Game Over, press any key to restart');
    startOver();
  }
}
function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $('#level-title').text("Level "+ level);
  level++;
  animatePress(randomChosenColour);
  playSound(randomChosenColour);

}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  }, 100);

}
function startOver(){
  level = 0;
  gamePattern=[];
  ok=true;
}
