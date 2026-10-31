let stage = 1;
let points = 0;
let selectedChoice = null;
let previousChoices = [];

const story = document.getElementById("story");
const stageTitle = document.getElementById("stage-title");
const choices = document.getElementById("choices");
const feedback = document.getElementById("feedback");

const stages = [
    {
        title: "Stage 1: Development",
        text: "You're a young aspiring basketball player who wants to become a professional. How will you develop your skills?",
        options: [
            { text: "Practice every day (at the gym, at home, or the park)", points: 2 },
            { text: "Join your school's youth team", points: 1 },
            { text: "Enter a professional youth basketball tournament", points: 3 }
        ]
    },
    {
        title: "Stage 2: Scouting Report",
        text: "A recruiter has noticed your talents and is interested in your potential. How will your improve your skills?",
        options: [
            { text: "Play for a university/college team", points: 3 },
            { text: "Go abroad to play professionally", points: 2 },
            { text: "Play another season locally", points: 1 }
        ]
    },
    {
        title: "Stage 3: Take your talents to...",
        text: "You have more experience now. Which basketball career do you want to pursue?",
        options: [
            { text: "NBA", points: 0, route: "NBA" },
            { text: "EuroLeague", points: 0, route: "EuroLeague" },
            { text: "Keep developing", points: 0, route: "Development" }
        ]
    }
];

function showStage() {
    let current = stages[stage - 1];

    stageTitle.textContent = current.title;
    story.textContent = current.text;

    choices.innerHTML = "";
    selectedChoice = null;
    feedback.textContent = "";

    current.options.forEach(function(option) {
        let button = document.createElement("button");

        button.textContent = option.text;
        button.className = "choice";

        button.addEventListener("click", function() {
            selectedChoice = option;

            document.querySelectorAll(".choice").forEach(function(item) {
                item.classList.remove("active");
            });

            button.classList.add("active");
            feedback.textContent = "You selected: " + option.text;
        });

        choices.appendChild(button);
    });

    document.getElementById("stage-number").textContent = stage;
    document.getElementById("points").textContent = points;

    document.getElementById("history").textContent =
        previousChoices.length > 0
            ? previousChoices.join(", ")
            : "None";
}

document.getElementById("next-button").addEventListener("click", function() {
    if (selectedChoice === null) {
        feedback.textContent = "Select an option";
        return;
    }

    previousChoices.push(selectedChoice.text);
    points += selectedChoice.points;

    if (stage < 3) {
        stage++;
        showStage();
    } else {
        showResult(selectedChoice.route);
    }
});

function showResult(route) {
    document.getElementById("journey").classList.add("hidden");
    document.getElementById("result").classList.remove("hidden");

    let title = "";
    let text = "";

    if (route === "NBA" && points >= 5) {
        title = "The NBA";
        text = "Your choices demonstrates a strong passion for basketball. Now, you get your chance at living your NBA dream!";
    } else if (route === "EuroLeague" && points >= 4) {
        title = "EuroLeague";
        text = "You have chosen to pursue professional basketball in Europe! Hone your skills further to compete and dominate against the best in the league";
    } else if (route === "Development" && points <= 5) {
        title = "Keep Training!";
        text = " Keep refining your skills! Enough to be confident and comfortable in your abilities. You have the potential to become a great basketball player!";
    } else if (route === "NBA" && points < 5) {
        title = "Keep Training!";
        text = " Keep refining your skills! Enough to be confident and comfortable in your abilities. You have the potential to become a great basketball player!";
    } else if (route === "EuroLeague" && points < 4) {
        title = "Keep Training!";
        text = " Keep refining your skills! Enough to be confident and comfortable in your abilities. You have the potential to become a great basketball player!";
    }

    document.getElementById("result-title").textContent = title;
    document.getElementById("result-text").textContent = text;
}

document.getElementById("restart-button").addEventListener("click", function() {
    stage = 1;
    points = 0;
    previousChoices = [];

    document.getElementById("journey").classList.remove("hidden");
    document.getElementById("result").classList.add("hidden");

    showStage();
});

showStage();
