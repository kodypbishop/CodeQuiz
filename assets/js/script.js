
let i = 0
let time = 60
let timer = document.getElementById("time")
window.onload = function () {
    let main = this.document.getElementById("main");
    document.getElementById("start").addEventListener("click", function (event) {
        event.preventDefault();
        main.innerHTML = ""
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
        timer.textContent = time
        time--
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
        choices.setAttribute("class", "btn");
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
                console.log(choices.textContent)
                time -= 10
            }
            console.log(i)
            i++;
            main.innerHTML = "";
            qu();
        } else {
            if (choices.textContent == questions[i].answer) {
                console.log("correct");
            } else {
                console.log("wrong");
                console.log(choices.textContent)
                time -= 10
                
            }
            let score = time
            time =0
            console.log(score)
            console.log(i)
            main.innerHTML = "";
            let scoreDisplay = document.createElement("h1");
            scoreDisplay.textContent = "Your score is:  " + score;
            main.append(scoreDisplay);
        }
    }


}
