function randomGenerate() {
  var num = Math.floor(Math.random() * 4);
  return num;
}

function gameOver() {

  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 100);
  var aud = new Audio("sounds/wrong.mp3");
  aud.play();
  startGame();
}

function animateClick(key) {
  $("#" + key).addClass("pressed");
  setTimeout(function() {
    $("#" + key).removeClass("pressed");
  }, 100);
}

function playsound(path) {
  var aud = new Audio(path);
  aud.play();
}

function sequence() {
  userClickedPattern = [];
  level++;
  $("h1").html("Level " + level);
  randomChosenColor = buttonColors[randomGenerate()];
  gamePattern.push(randomChosenColor);

  var x = "#" + randomChosenColor;
  $(x).fadeOut(100).fadeIn(100);
  console.log(`sounds/${randomChosenColor}.mp3`);
  playsound(`sounds/${randomChosenColor}.mp3`);
}

function checkSimilar(currentlevel) {
  if (userClickedPattern[currentlevel] == gamePattern[currentlevel]) {
    if (userClickedPattern.length == gamePattern.length) {
      setTimeout(sequence, 800);
    }
  }
  else
  {
    $("h1").html("GameOver , Press any button to restart!")
    gameOver();

  }

}

function startGame() {
  gamePattern = [];
  started = false;
  level = 0;
}

function game() {
  $(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playsound(`sounds/${userChosenColor}.mp3`)
    animateClick(userChosenColor);
    checkSimilar(userClickedPattern.length - 1);
  });
}

var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
$("h1").html("Press any Key to Start");


$(document).keypress(function() {
  if (started == false) {
    started = true;
    sequence();
  }
});
game();
// }
