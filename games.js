var buttonColors=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];

var started=false;
var level=0;

$(document).keypress(function(){
	if (!started){
		$("level-title").text("Level "+level);
		nextSequence();
		started=true;
	}
});

$(".btn").click(function(){
		var userChosenColor=$(this).attr("id");
		userClickedPattern.push(userChosenColor);

		playSound(userChosenColor);
		animatePress(userChosenColor);

		checkAnswer(userClickedPattern.length-1);
	});

function nextSequence(){
	userClickedPattern=[];
	level++;
	$("#level-title").text("Level "+level);

	var randomNumber=Math.floor(Math.random()*3);
	var randomColorChoose=buttonColors[randomNumber];
	gamePattern.push(randomColorChoose);
	
	$("#"+randomColorChoose).fadeIn(100).fadeOut(100).fadeIn(100);
	playSound(randomColorChoose);
}

function playSound(name){
	var audio= new Audio("sounds/"+name+".mp3");
	audio.play();
}

function animatePress(currentColor){
	$("#"+currentColor).addClass("pressed");
	setTimeout(function(){
		$("#"+currentColor).removeClass("pressed");
	},100);
}

function checkAnswer(currentLevel){
	if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
		if (userClickedPattern.length === gamePattern.length){
			setTimeout(function(){
				nextSequence();
			},1000);
		}
	}
	else{
		$("body").addClass("game-over");
		playSound("wrong");
		setTimeout(function(){
			$("body").removeClass("game-over");
		},300);
		$("#level-title").text("Game over, Press Any Key to Restart");
		startOver();
	}
}
function startOver(){
	level=0;
	gamePattern=[];
	started=false;
}