

var started = false;
var level = 1;

var gamePattern = [];
userChosenColour = [];
var buttonColours = ['green', 'red', 'yellow', 'blue'];

$("html").on("keydown", function(){

    if(!started){
        started = true;
        nextSequence();
    }

})

function nextSequence(){  
     
    started = true;
    var randomNumber = Math.floor(4*(Math.random()));
    
    var randomChoosenColours = buttonColours[randomNumber];
    $("h1").html("Level " + level);
    gamePattern.push(randomChoosenColours);
    
    playSound(randomChoosenColours);
    $("#" + randomChoosenColours).fadeOut(100).fadeIn(100);

    level++;
    
    $(".btn").prop("disabled", false);
    
}




function playSound(colour){

    switch(colour){
        case "red" :
            var red = new Audio("sounds/red.mp3");
            red.play();
            break;
        case "yellow" :
            var yellow = new Audio("sounds/yellow.mp3");
            yellow.play();
            break;
        case "blue" :
            var blue = new Audio("sounds/blue.mp3");
            blue.play();
            break;
        case "green" :
            var green = new Audio("sounds/green.mp3");
            green.play();
            break;
            
        default: console.log(randomChoosenColours);
    }
    

}

function checkAnswer(currentLevel){

    if(userChosenColour[currentLevel] === gamePattern[currentLevel]){
        console.log("Correct!")
        if(userChosenColour.length === gamePattern.length){

            userChosenColour = [];

            setTimeout(nextSequence, 1000);

        }
    }else{
        console.log("Wrong!")
        restart();
    }
    
}

function restart(){

    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 200)
    var gameOver = new Audio("sounds/wrong.mp3")
    gameOver.play();

    started = false;
    gamePattern = [];
    userChosenColour = [];
    level = 1;

    $("h1").html("Game Over!, Press Any Key to Restart :3");
}

$(".btn").prop("disabled", true);

$(".btn").on("click", function(){
    if(started){
        var currentButton = this;
        var clickColour = $(currentButton).attr("id");

        
        $(currentButton).addClass("pressed");
        
        playSound(clickColour);
        userChosenColour.push(clickColour);

        
        setTimeout(function() {
            $(currentButton).removeClass("pressed")
        }, 100
        )

    checkAnswer(userChosenColour.length - 1);
}})

$(".btn").prop("disabled", false); 


