// Empty array for pushing colors onto
var gamePattern = [];

// Colors of the game's buttons
var buttonColors = ["red", "blue", "green", "yellow"];

// Pattern of Users' Clicks
var userClickedPattern = [];

// Levels
var level = 0;

// Computer Generated Behavior i.e. random colors being stored in the gamePattern etc.
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * buttonColors.length);
  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  buttonFlash(randomChosenColor);
  makeSound(randomChosenColor);

  level++; // Increase level everytime nextSequence() is called

  $("#level-title").text("Level " + level); // Changing h1 for each level

}

// User Generated Behavior i.e. storing button clicks in userClickedPattern etc.
$(".btn").click(function() {
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);

  makeSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length-1);
});

// Initial Keypress Detection
$(document).one("keypress", function() {
  nextSequence();
});

// Button Flash 1
function buttonFlash(input) {
  var colorToButton = $("#" + input);
  colorToButton.fadeOut(100).fadeIn(100);
}

// Button Flash 2
function animatePress(currentColor) {
  var colorClicked = $("#" + currentColor);
  colorClicked.addClass("pressed");
  setTimeout(function() {
    colorClicked.removeClass("pressed");
  }, 100);
}

// Button Make Sound
function makeSound(color) {
  switch (color) {
    case "blue":
      var blueSound = new Audio("sounds/blue.mp3");
      blueSound.play();
      break;

    case "green":
      var greenSound = new Audio("sounds/green.mp3");
      greenSound.play();
      break;

    case "red":
      var redSound = new Audio("sounds/red.mp3");
      redSound.play();
      break;

    case "yellow":
      var yellowSound = new Audio("sounds/yellow.mp3");
      yellowSound.play();
  }
}

// GAME LOGIC
function checkAnswer(currentLevel) {
  // Check if the answer is right or wrong
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");

    // Check for turn to be finished
    if (userClickedPattern.length === gamePattern.length) {
      console.log("next level");
      setTimeout(function() {
        userClickedPattern = [];
        nextSequence();
      },1000);
    }
  }
  else {
    console.log("Wrong Start Over");
    var gameOverSound = new Audio("sounds/wrong.mp3");
    gameOverSound.play();

    // turn backgroun red for 300ms
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    },300);

    // change h1
    // $("h1").text("GAME OVER! \n You Made it to Level " + level + " \n Press Any Key to Restart");
    $("h1").html("GAME OVER!<br>You made it to level " + level + "<br>Press Any Key to Restart");

    // start over
    $(document).one("keypress", function() {
      gamePattern = [];
      userClickedPattern = [];
      level = 0;
      nextSequence();
    });
  }

}






























// hello
