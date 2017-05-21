import helper from "./helper";
import guessFactory from "./guessFactory";
import user from './user';
import storage from './storage';
import draw from './draw';

let currentWord;
let currentCategory;
let currentWordIndex;
let currentCategoryIndex;
let currentUser;
let counter = 0;
let guesses = [];
let guessedLetters = [];
let $guess = $('.guess');
let $description = $('#desc');
let $won = $('#won');
let $lost = $('#lost');


const hints = [
    ["House animal", "Animal in africa", "African cat", "Fastest animal", "A man's best friend", "A mamal that climbs on trees"],
    ["Science-Fiction horror film", "Historical drama", "Giant great white shark", "Horror movie"],
    ["Northern city in the UK", "Capital of the Lombardy region in Italy", "Spanish capital", "Netherlands capital", "Czech Republic capital", "Bulgarian capital", "Bulgarian second largest city", "Bulgarian city in the Northwestern region", "German Capital", "USA capital"]
]
let categories = [
    ["cat", "elephant", "lion", "cheetah", "dog", "monkey"],
    ["alien", "gladiator", "jaws", "saw"],
    ["manchester", "milan", "madrid", "amsterdam", "prague", "sofia", "plovdiv", "vraca", "berlin", "washington"]
];
const clues = [
    ["Meow", "The biggest animal on earth", "King of the jungle", "It is a cat.", "Come on...", "And looks a lot like you"],
    ["Creatures out of Earth", "Slave in acient Rome", "And hunters", "Wanna play a game?"],
    ["They have a team that is very united", "Home of AC and Inter", "Really?", "I heard they smoke a lot of weed", "Really nice beers", "And biggest city", "Old name is Philippopolis", "They drink a lot", "It has L in its name.", "Where Barack Obama used to be?"],
];
$('.container').addClass('hidden');
guessFactory.createAlphabet();
$won.html('Won: 0');
$lost.html('Lost: 0');

function restart() {
    helper.cleanElements();
    guesses = [];
    guessedLetters = [];

    currentCategory = helper.getRandom(categories);
    currentWord = helper.getRandom(currentCategory);

    currentCategoryIndex = categories.indexOf(currentCategory);
    currentWordIndex = currentCategory.indexOf(currentWord);

    $('#category').html(helper.showCategory(currentCategoryIndex));

    console.log('current word', currentWord);

    let wordToGuess = guessFactory.createGuess(currentWord);
    $guess.append(wordToGuess);


    let desc = hints[currentCategoryIndex][currentWordIndex];
    $description.html(desc);
}
restart();


$('.letter').on('click', (ev) => {
    let $target = $(ev.target);
    $target.css('opacity', '0.6');
    let guess = $target.html();
    guessedLetters.push(guess);
    currentUser.guesses = guessedLetters.length;
    

    let wordToSearch = currentWord.slice(1, -1);
    let wordIndex = helper.allIndexOf(guess, currentWord);

    if (wordIndex[0] > -1) {
        guessFactory.completeGuess(wordIndex, guess);
        guesses.push(guess);
        if (guesses.length === wordToSearch.length && currentUser.lives === 5) {
            currentUser.wholeWordGuess += 1;
        }

        if (wordIndex.length === 1) {
            counter += 1;
        } else {
            counter += wordIndex.length;
        }
    } else {
        //draw.drawStickMan(currentUser.lives);        
        currentUser.lives -= 1;
        storage.update(currentUser);
        $('#lives').html(`Lives ${currentUser.lives}`);

        if (currentUser.lives === 0) {
            lostGame();
            restart();
        }
    }
    if (counter == currentWord.length - 2 && currentUser.lives > 0) {
        winGame();
        restart();
    }
});

$('#hint').on('click', function() {
    let clueElement = $('#clue');
    let clue = clues[currentCategoryIndex][currentWordIndex];
    clueElement.html(clue);
});

$('#play-again').on('click', function() {
    restart();
});
$('#register').on('click', function() {
    let $userName = $('#username').val();
    let userName = user.register($userName);
    if (!userName) {
        alert('Try again');
    } else {
        alert('Now log in.');
    }

});
$('#login').on('click', function() {
    let $userName = $('#username').val();
    currentUser = user.login($userName);

    if (!currentUser) {
        alert('Invalid username. Try again or register.');
        return;
    } else {
        alert('Welcome, ' + currentUser.username);
        $('#loged-in').html('User: ' + currentUser.username);
        $('#user-form').addClass('hidden');
        $('.container').removeClass('hidden');

        updateScores();
    }
});

function lostGame() {
    currentUser.lostGames += 1;
    currentUser.score += 1;
    //draw.clear();
    
    currentUser.lives = 5;

    storage.update(currentUser);

    updateScores();
    $description.html('GAME OVER');
    counter = 0;
}

function winGame() {
    currentUser.wonGames += 1;
    currentUser.score += 1;
    //draw.clear();
    currentUser.lives = 5;
    storage.update(currentUser);
    updateScores();
    $description.html('You win!');
    counter = 0;
}

function updateScores() {
    $('#lives').html(`Lives: ${currentUser.lives}`);
    $('#game-count').html(`Games: ${currentUser.score}`);
    $('#guess-count').html(`Guesses: ${currentUser.guesses}`);
    $('#whole-words').html(`Whole word: ${currentUser.wholeWordGuess}`);
    $('#won').html(`Won: ${currentUser.wonGames}`);
    $('#lost').html(`Lost: ${currentUser.lostGames}`);
}