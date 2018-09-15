

$(document).ready(function() {
    //Creating variable to track the questions
    var questionCounter = 0;
    
    // timeout 
    var ansTimeout = 2000;
    
    //Creating score variables
    var correct = 0;
    var incorrect = 0;
    var missed = 0;
    
    //Creating array of user's answers
    var userAns = [];
    
    //Creating an array of objects with the questions, answer options, and correct answer
    var questions = [
    {
        question: "What year was Villanova founded?",
        choices: ["1878", "1902", "1811", "1908", "1842"],
        choicesAnswer: 4
    },
    {
        question: "Villanova was founded by what Catholic order?",
        choices: ["Holy Cross", "Jesuits", "Mormons", "Augustinians", "Scientologists"],
        choicesAnswer: 3
    },
    {
        question: "The head coacch of Villanova when they won their first national title in NCAA Basketball was?",
        choices: ["Jay Wright", "Rollie Massimino", "Billy Lange", "Jack Kraft", "Baker Dunleavy"],
        choicesAnswer: 1
    },
    {
        question: "Alltime Nova Mens basketball leading scorer?",
        choices: ["Keith Herron","Randy Foye","Kerry Kittles","Scottie Reynolds","Josh Hart"],
        choicesAnswer: 2
    },
    {
        question: "How many Final Four appearances has Nova had?",
        choices: ["8", "6", "9", "12", "4"],
        choicesAnswer: 1
    },
    {
        question: "Jay Wright's alma mater?",
        choices: ["Georgetown","Hofstra","St. Joseph's","Bucknell","Lehigh"],
        choicesAnswer: 3
    }];
    
    //Function to submit answers
    function submitAns() {
        $("#submit").on("click", function(event) {
            event.preventDefault();
            userAns.length = 0;
                
            //Record user answer to question
            var userSelection = $("#responses input:radio[name=optionsRadios]:checked").val();
            userAns.push(userSelection);
            console.log(userAns);
           // console.log(correctAnswer);
            
            nextQ();
        });
    };
        
    //Creating  timer variables & functions
    var timeLeft = 8;
    var increment;
    
    function runTimer() {
        increment = setInterval(decrement, 1000);
    };
    
    function decrement() {
        timeLeft--;
        $("#time-left").html("Time remaining: " + timeLeft + " seconds");
        if (timeLeft === 0) {
            stopTimer();
            userAns.length = 0;		
            //Record user answer to question
            var userSelection = $("#responses input:radio[name=optionsRadios]:checked").val();
            userAns.push(userSelection);
            console.log(userAns);
            nextQ();
        };
    };
    
    function resetTimer() {
        timeLeft = 8;
        $("#time-left").html("Time remaining: " + timeLeft + " seconds");
    };
    
    function displayTimer() {
        $("#time-left").html("Answer Review");
    };
    
    function stopTimer() {
        clearInterval(increment);
    };
    
    //Function to display the given response options
    function createRadios() {
        var responseOptions = $("#responses");
        //Empty array for user answer
        responseOptions.empty();
            
        for (var i = 0; i < questions[questionCounter].choices.length; i++) {
            responseOptions.append('<label><input type="radio" name="optionsRadios" id="optionsRadios2" value="' + [i] +'"><div class="twd-opt">' + questions[questionCounter].choices[i] + '</div></input><br></label>');
        };
    };
    
    //Function to display the given question
    function displayQ() {
        clearQ();
        resetTimer();
        $(".questionX").html(questions[questionCounter].question);
        //Calling the function to display the response options
        createRadios();
        //Creating submit button
        $("#submit-div").append('<button type="submit" class="btn btn-default" id="submit">' + "Get Wild, Wildcat" + '</button>');
        runTimer()
        submitAns();
    };
    
    //Display start page
    function displayStart() {
        $("#content").append('<a href="#" class="btn btn-primary btn-lg" id="start-button">' + "LETS GO NOVA!!!" + '</a>');
        //Start game
        $("#start-button").on("click", function(event) {
            event.preventDefault();
            //Displays the first question
            firstQ();
            resetTimer();
        });
    };
    
    //Reset for end of game
    function reset() {
        questionCounter = 0;
        correct = 0;
        incorrect = 0;
        missed = 0;
        userAns = [];
        resetTimer();
    };
    
    //Display end page
    function displayEnd() {
        clearQ();
        $("#content").append('<h3>' + "Correct answers: " + correct + '</h3><br><h3>' + "Incorrect answers: " + incorrect + '</h3><br><h3>' + "Skipped questions: " + missed + '</h3><br><br><a href="#" class="btn btn-primary btn-lg" id="restart-button">' + "Restart Game" + '</a>');
        //Restart game
        $("#restart-button").on("click", function(event) {
            event.preventDefault();
            //Displays the first question
            reset();
            clearQ();
            displayStart();
        });
    };
    
    //Function to clear the question
    function clearQ() {
        var questionDiv = $(".questionX");
        questionDiv.empty();
    
        var responsesDiv = $("#responses");
        responsesDiv.empty();
    
        var submitDiv = $("#submit-div");
        submitDiv.empty();
    
        var contentDiv = $("#content");
        contentDiv.empty();
    
        stopTimer();
    };
    
    //Showing whether answer was right/wrong
    function checkQ() {
        clearQ();
        var correctAnswer = questions[questionCounter].choicesAnswer;
        if (userAns[0] == questions[questionCounter].choicesAnswer) {
            $("#content").append('<h1>'+"LETS GO NOVA!" + '</h1>');
            correct++;
            displayTimer();
        }
        else if (userAns[0] === undefined) {
            $("#content").append('<h1>'+"Time's up!" + '</h1><br><br><h1>' + "The correct answer was: " + questions[questionCounter].choices[correctAnswer] + '</h1>');
            missed++;
            displayTimer();
        }
        else {
            $("#content").append('<h1 color:"red">'+"You went to Georgetown" + '</h1><br><br><h1>' + "The correct answer was: " + questions[questionCounter].choices[correctAnswer] + '</h1>');
            incorrect++;
            displayTimer();
        };
    };
    
    //Function to change the question 
    function nextQ() {
        checkQ();
        //Incrementing the count by 1
        questionCounter++;
        //If the count is the same as the length of the question array, the counts reset to 0
        if (questionCounter === questions.length) {
            setTimeout(displayEnd, ansTimeout);
        } 
        else {
            setTimeout(displayQ, ansTimeout);
        };
    };
    
    //Function to call the first question
    function firstQ() {
        var startContent = $("#content");
        startContent.empty(); 
        displayQ();
    };
    
    //Displays the start page
    displayStart();
    
    });