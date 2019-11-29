
let i = 0
let time = 60
let timer = document.getElementById("time")

window.onload = function () {
    let main = this.document.getElementById("main");
    let form = this.document.getElementById("form");
    let everything = this.document.getElementById("everything");

    document.getElementById("start").addEventListener("click", function (event) {
        event.preventDefault();
        main.innerHTML = "";
        qu();
        let int = setInterval(timeNow, 1000)
        event.stopPropagation();
        main.addEventListener("click", function (event) {
            event.preventDefault();
            next();
        })
    })

}

function timeNow() {

    let timer = document.getElementById("time")
    if (time > 0) {
        timer.textContent = time;
        time--;
    } else {
        clearInterval();
    }
}

function qu() {
    let question = document.createElement("p");
    question.textContent = questions[i].title;
    main.append(question);
    for (let j = 0; j < questions[i].choices.length; j++) {
        let choices = document.createElement("button");
        choices.setAttribute("class", "btn btn-primary btn-large col-sm-5 m-1");
        choices.textContent = questions[i].choices[j];
        main.append(choices);
    }
}

function next() {
    if (event.target.matches("button")) {
        let choices = event.target
        if (i < questions.length - 1) {

            if (choices.textContent == questions[i].answer) {
                console.log("correct");
            } else {
                console.log("wrong");
                console.log(choices.textContent);
                time -= 15;
            }
            console.log(i)
            i++;
            main.innerHTML = "";
            qu();
        } else {
            if (choices.textContent !== questions[i].answer) {
                time -= 10;

            }
            let finalScore = time
            main.innerHTML = "";
            let timer = document.getElementById("time")
            let scoreDisplay = document.createElement("h1");
            scoreDisplay.textContent = "Your score is:  " + time;
            main.append(scoreDisplay);

            let askForInitals = document.createElement("h3");
            askForInitals.textContent = "Please enter your initals";
            main.append(askForInitals);

            let enteredInitals = document.createElement("input");
            enteredInitals.setAttribute("id", "initals");
            form.append(enteredInitals);

            let submitScore = document.createElement("button");
            submitScore.setAttribute("id", "submit");
            submitScore.textContent = "Submit";
            form.append(submitScore);

            let submit = document.getElementById("submit")

            submit.addEventListener("click", function () {
                event.preventDefault();
                let name = document.getElementById("initals")
                if (localStorage.getItem("score") === null) {
                    let highScores = {
                        "score": [finalScore],
                        "name": [name.value]
                    };
                    console.log(highScores)
                    localStorage.setItem("score", JSON.stringify(highScores));

                } else {
                    let highScores = JSON.parse(localStorage.getItem('score'));
                    console.log(highScores);
                    highScores.score.push(finalScore);
                    highScores.name.push(name.value);
                    console.log(highScores)
                    localStorage.setItem("score", JSON.stringify(highScores));
                }
                return highscores();
            });
            timer.textContent = time
            return time = 0
        }
    }
}
function highscores() {
    everything.innerHTML = "";
    let highScore = document.createElement("h1");
    highScore.textContent = "High scores";
    everything.append(highScore);
    let currentHighScores = JSON.parse(localStorage.getItem('score'));
    console.log(localStorage.getItem("score"));
    if (localStorage.getItem("score") !== null) {
        for (i = 0; i < currentHighScores.score.length; i++) {
            let highName = document.createElement("p");
            highName.textContent = i + 1 + ": " + currentHighScores.name[i] + " - " + currentHighScores.score[i];
            everything.append(highName);
        }
    }
    let reset = document.createElement("button");
    reset.textContent = "Go Back"
    reset.setAttribute("onClick", "window.location.reload();");

    reset.setAttribute("class", "btn btn-primary btn-large col-sm-5 m-1");
    everything.append(reset);

    let clear = document.createElement("button");
    clear.textContent = "Clear Scores"
    clear.setAttribute("onClick", "localStorage.clear(); highscores();");
    clear.setAttribute("class", "btn btn-danger btn-large col-sm-5 m-1");
    everything.append(clear);
}
