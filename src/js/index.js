import helper from "./helper";
import guessFactory from "./guessFactory";
import user from './user';

var lives = 5;
let wonGames = 0;
let lostGames = 0;
let gamesCount = 0;
let wholeWordGuess = 0;
let currentWord;
let currentCategory;
let currentWordIndex;
let currentCategoryIndex;
let counter = 0;
let guesses = [];
let guessedLetters = [];
let $guess = $('.guess');
let $description = $('#desc');
let $won = $('#won');
let $lost = $('#lost');
let $displayLives = $('#lives');


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
    guesses=[];
    lives = 5;
    $displayLives.html(`Lives: ${lives}`);
    $('#game-count').html('Games: ' + gamesCount);
    $('#guess-count').html('Guesses: ' + guessedLetters.length);
    $('#whole-words').html('Whole word: '+ wholeWordGuess);

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

    let wordToSearch = currentWord.slice(1, -1);
    let wordIndex = helper.allIndexOf(guess, currentWord);
    console.log(wordIndex);

    if (wordIndex[0] > -1) {
        guessFactory.completeGuess(wordIndex, guess);
        guesses.push(guess);
        console.log('guesses', guesses);
        if (guesses.length === wordToSearch.length && lives === 5) {
            wholeWordGuess += 1;
        }
        counter += 1;
    } else {
        lives -= 1;
        $displayLives.html(`Lives ${lives}`);

        if (lives <= 0) {
            lostGame();
            restart();
        }
    }
    if (counter == currentWord.length - 2) {
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
    user.register($userName);
    $('#loged-in').html('User: ' +$userName);
    
    $('#user-form').addClass('hidden');
    $('.container').removeClass('hidden');
});
$('#login').on('click', function() {
    let $userName = $('#username').val();
    console.log($userName);

    let loginUserName = user.login($userName);
    if (!loginUserName) {
        alert('Invalid username. Try again or register.');
        return;
    } else {
        alert('Welcome, ' + loginUserName);
        $('#loged-in').html('User: ' +loginUserName);
        $('#user-form').addClass('hidden');
        $('.container').removeClass('hidden');
    }



});

function lostGame() {
    lives = 0;
    lostGames += 1;
    gamesCount += 1;
    $lost.html(`Lost: ${lostGames}`);
    $description.html('GAME OVER');
    counter = 0;
}

function winGame() {
    wonGames += 1;
    gamesCount += 1;
    $won.html(`Won: ${wonGames}`);
    $description.html('You win!');
    counter = 0;
}