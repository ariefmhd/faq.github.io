$(document).ready(function(){
    let start = document.querySelector("#start");
    let guide = document.querySelector("#guide");
    let exit = document.querySelector("#exit");
    let continueBtn = document.querySelector("#continue");
    let quiz = document.querySelector("#quiz");
    let questionNo = document.querySelector("#questionNo");
    let questionText = document.querySelector("#questionText");
    let optionList = document.querySelectorAll(".choice_que");
    let total_correct = document.querySelector("#total_correct");
    let next_question = document.querySelector("#next_question");
    let result = document.querySelector("#result");
    let points = document.querySelector("#points");
    let quit = document.querySelector("#quit");
    let startAgain = document.querySelector("#startAgain");
    
    let index = 0;
    let correct = 0;

    let loadData = () => {
        questionNo.innerText = (index + 1) + ". ";
        questionText.innerText = MCQS[index].question;
        optionList.forEach((option, i) => {
            option.innerText = MCQS[index][`choice${i + 1}`];
            option.classList.remove("disabled");
            option.innerHTML = option.innerText; // Reset tanda centang/silang
        });
    };

    loadData();

    start.addEventListener("click", () => {
        start.style.display = "none";
        guide.style.display = "block";
    });

    exit.addEventListener("click", () => {
        start.style.display = "block";
        guide.style.display = "none";
    });

    continueBtn.addEventListener("click", () => {
        quiz.style.display = "block";
        guide.style.display = "none";
        correct = 0;
        total_correct.innerHTML = `${correct} Out Of ${MCQS.length} Questions`;
        loadData();
    });

    optionList.forEach((option, choiceNo) => {
        option.addEventListener("click", () => {
            if (!option.classList.contains("disabled")) {
                let isCorrect = choiceNo === MCQS[index].answer;
                option.innerHTML += isCorrect ? " ✅" : " ❌";
                if (isCorrect) correct++;
                total_correct.innerHTML = `${correct} Out Of ${MCQS.length} Questions`;
                optionList.forEach(opt => opt.classList.add("disabled"));
            }
        });
    });

    next_question.addEventListener("click", () => {
        if (index < MCQS.length - 1) {
            index++;
            loadData();
            total_correct.innerHTML = `${correct} Out Of ${MCQS.length} Questions`;
        } else {
            quiz.style.display = "none";
            points.innerHTML = `You Got ${correct} Out Of ${MCQS.length}`;
            result.style.display = "block";
        }
    });

    quit.addEventListener("click", () => {
        start.style.display = "block";
        result.style.display = "none";
    });

    startAgain.addEventListener("click", () => {
        guide.style.display = "block";
        result.style.display = "none";
        index = 0;
        correct = 0;
        loadData();
    });
});
