/* Our game's control variable */
var questionAsked = [];

//Game questions
const questions = [
    //Question 0
    {
        question: "Which of these languages is not considered a programming language?",
        answer: ["PHP", "JavaScript", "C++", "HTML"],
        correct: "ans3"
    },
    //Question 1
    {
        question: "What year was Brazil discovered?",
        answer: ["1498", "1500", "1800", "1590"],
        correct: "ans1"
    },
    //Question 2
    {
        question: "What does HTML mean?",
        answer: ["Hyper Toronto Mark Legal", "Hyper Text Markup Language", "Hey Trade More Language", "Hyper Text Mark Language"],
        correct: "ans1"
    },
    //Question 3
    {
        question: "Which of these languages is considered a markup language?",
        answer: ["HTML", "JavaScript", "C++", "PHP"],
        correct: "ans0"
    },
    //Question 4
    {
        question: "2 + 2 is...",
        answer: ["2", "4", "0", "22"],
        correct: "ans1"
    }
]

var qtQuestion = questions.length - 1;

generateQuestion(qtQuestion);

function generateQuestion(maxQuestions) {
    //Generate random number
    let randomQuestion = (Math.random() * maxQuestions).toFixed();
    //Convert to number
    randomQuestion = Number(randomQuestion);
    //Show result in console
    console.log('The question drawn was: ' + randomQuestion);

    //Check if the question has already been asked
    if (!questionAsked.includes(randomQuestion)) {
        //Put as a question asked
        questionAsked.push(randomQuestion);

        //Fill in the HTML with the data of the question drawn
        var p_selected = questions[randomQuestion].question;
        console.log(p_selected);

        //Feed question with drawn
        $('#question').html(p_selected);
        $('#question').attr('index-date', randomQuestion);

        //Put the answer
        for (var i = 0; i < 4; i++) {
            $('#ans' + i).html(questions[randomQuestion].answer[i]);
        }

        /*
        var ans0 = questions[randomQuestion].answer[0];
        var ans1 = questions[randomQuestion].answer[1];
        var ans2 = questions[randomQuestion].answer[2];
        var ans3 = questions[randomQuestion].answer[3];

        $('#ans0').html(ans0);
        $('#ans1').html(ans1);
        $('#ans2').html(ans2);
        $('#ans3').html(ans3);
        */

        //Randomize the positions of the answers
        var container = $('#answers');
        var buttons = container.children();

        for (var i = 1; i < buttons.length; i++) {
            container.append(buttons.eq(Math.floor(Math.random() * buttons.length)));
        }
    } else {
        //If the question has already been asked
        console.log('The question has already asked. Drawing lots again...')
        if (questionAsked.length < qtQuestion + 1) {
            return generateQuestion(maxQuestions);
        } else {
            console.log('No more question!');
            $('#quiz').addClass('ocult');
            $('#message').html('Congratulations you won!');
            $('#status').removeClass('ocult');
        }
    }
}

$('.answer').click(function () {
    if ($('#quiz').attr('index-date') !== 'locked') {
        resetButtons();

        //Added the class "selected"
        $(this).addClass('selected');
    };
});

$('#confirm').click(function () {
    //Get index question
    var index = $('#question').attr('index-date');

    //What's is a correct answer
    var answerCorrect = questions[index].correct;

    //Which answer the user selected
    $('.answer').each(function () {
        if ($(this).hasClass('selected')) {
            var answerSelected = $(this).attr('id');

            if (answerCorrect == answerSelected) {
                console.log('Youuu rightt!');
                nextQuestion();
            } else {
                //alert('You wrong :c');
                $('#quiz').attr('index-date', 'locked');
                $('#confirm').addClass('ocult');
                $('#' + answerCorrect).addClass('correct');
                $('#' + answerSelected).removeClass('selected')
                $('#' + answerSelected).addClass('wrong');

                //4 seconds to game over
                setTimeout(function () {
                    gameOver();
                }, 4000);
            }
        }
    })

});

function newGame() {
    $('#confirm').addClass('ocult');
    $('#quiz').attr('index-date', 'ok');
    resetButtons();
    questionAsked = [];
    generateQuestion(qtQuestion);
    $('#quiz').removeClass('ocult');
    $('#status').addClass('ocult');
}

function nextQuestion() {
    resetButtons();
    generateQuestion(qtQuestion);
}

function resetButtons() {
    //Answers will be deselected
    $('.answer').each(function () {
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
        }
        if ($(this).hasClass('correct')) {
            $(this).removeClass('correct');
        }
        if ($(this).hasClass('wrong')) {
            $(this).removeClass('wrong');
        }
    });
}

function gameOver() {
    $('#quiz').addClass('ocult');
    $('#message').html('Game Over!');
    $('#status').removeClass('ocult');
}

$('#tryAgain').click(function () {
    newGame();
})