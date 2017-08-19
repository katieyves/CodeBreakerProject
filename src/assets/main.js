let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess');
    //add functionality to guess function here
    if (answer.value == '' || attempt.value == '') {
    	setHiddenFields();
    }
    if (!validateInput(input.value)) {
    	return false;
    } else {
    	attempt.value++;
    }

    getResults(input.value);

    if (getResults(input.value)) {
    	setMessage("You Win! :)");
    	showAnswer(true);
    	showReplay();
    } else if (attempt.value >= 10) {
    	setMessage("You Lose! :(");
    	showAnswer(false);
    	showReplay();
    } else {
    	setMessage("Incorrect, try again.");
    }
}

//implement new functions here

function setHiddenFields() {
	answer.value = Math.floor(Math.random()*10000).toString();
	while (answer.value.length < 4) {
		answer.value = "0" + answer.value;
	};
	attempt.value = 0;
}

function setMessage(message) {
	let messageLabel = document.getElementById('message');
	messageLabel.innerHTML = message;
}

function validateInput(input) {
	if (input.length == 4) {
		return true;
	} else {
		setMessage("Guesses must be exactly 4 characters long.");
		return false;
	}
}

function getResults(input) {
	debugger;
	let results = document.getElementById('results');
	let correctGuesses = 0;
	var add = '<div class="row"><span class="col-md-6">' + input + '</span><div class="col-md-6">';
	for (i = 0; i < 4; i++) {
		if (input[i] == answer.value[i]) {
			add += '<span class="glyphicon glyphicon-ok"></span>';
			correctGuesses++;
		} else if (answer.value.indexOf(input[i]) >= 0) {
			add += '<span class="glyphicon glyphicon-transfer"></span>';
		} else {
			add += '<span class="glyphicon glyphicon-remove"></span>';
		}
	}

	add += '</div></div>';
	results.innerHTML = add;

	if (correctGuesses == 4) {
		return true;
	} else {
		return false;
	}
}

function showAnswer(param) {
	let code = document.getElementById('code');
	code.innerHTML = answer.value;
	if (param) {
		code.className += ' success';
	} else {
		code.className += ' failure';
	}
}

function showReplay() {
	let guessingDiv = document.getElementById('guessing-div');
	let replayDiv = document.getElementById('replay-div');
	guessingDiv.style.display = 'none';
	replayDiv.style.display = 'block';
}