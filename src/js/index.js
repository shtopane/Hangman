import helper from "./helper";

var lives = 5;
let hintCount = 3;
let wonGames = 0;
let lostGames = 0;
let currentWord;
let currentCategory;
let currentWordIndex;
let currentCategoryIndex;
let chosenCategory = $('#category');
let counter = 0;
let guesses = [];
let $guess = $('.guess');
let $description = $('#desc');
let won = $('#won');
let lost = $('#lost');
let displayLives = $('#lives');

won.html('Won: 0');
lost.html('Lost: 0');
const hints = [
    ["House animal", "Animal in africa", "African cat", "Fastest animal", "A man's best friend", "A mamal that climbs on trees"],
    ["Science-Fiction horror film", "American movie with Vin Disel", "Historical drama", "Animated Fish", "Giant great white shark", "Horror movie", "College movie"],
    ["Northern city in the UK", "Capital of the Lombardy region in Italy", "Spanish capital", "Netherlands capital", "Czech Republic capital", "Bulgarian capital", "Bulgarian second largest city", "Bulgarian city in the Northwestern region", "German Capital", "USA capital"]
]
let categories = [
    ["cat", "elephant", "lion", "cheetah", "dog", "monkey"],
    ["alien", "fast and furious", "gladiator", "finding-nemo", "jaws", "saw", "american pie"],
    ["manchester", "milan", "madrid", "amsterdam", "prague", "sofia", "plovdiv", "vraca", "berlin", "washington"]
];
const clues = [
    ["Meow", "The biggest animal on earth", "King of the jungle", "It is a cat.", "Come on...", "And looks a lot like you"],
    ["Creatures out of Earth", "With really nice cars", "Slave in acient Rome", "Which is lost", "And hunters", "Wanna play a game?", "American ...?"],
    ["They have a team that is very united", "Home of AC and Inter", "Really?", "I heard they smoke a lot of weed", "Really nice beers", "And biggest city", "Old name is Philippopolis", "They drink a lot", "It has L in its name.", "Where Barack Obama used to be?"],
];

helper.createAlphabet();

function restart() {
    $('.guess-letter').remove();
    $('.letter').css('opacity', '1');
    $('#clue').html('');
    $description.html('');
    lives = 5;

    displayLives.html(`Lives: ${lives}`);

    currentCategory = helper.getRandom(categories);
    currentWord = helper.getRandom(currentCategory);
    console.log('current word', currentWord);

    let $li = $(`<li class="guess-letter"></li>`);

    for (let i = 0; i < currentWord.length; i += 1) {
        let $resultLi = $li.clone();

        $resultLi.attr('id', i);
        let id = $resultLi.attr('id');

        if (id == 0) {
            $resultLi.html(`${currentWord[0]}`);
        } else if (id == currentWord.length - 1) {
            $resultLi.html(`${currentWord[currentWord.length-1]}`);
        } else {
            $resultLi.html('_');
        }

        $guess.append($resultLi);
    }

    currentCategoryIndex = categories.indexOf(currentCategory);
    currentWordIndex = currentCategory.indexOf(currentWord);

    chosenCategory.html(helper.showCategory(currentCategoryIndex));
    
    let desc = hints[currentCategoryIndex][currentWordIndex];
    $description.html(desc);
}
restart();


$('.letter').on('click', (ev) => {
    let $target = $(ev.target);
    $target.css('opacity', '0.6');
    let guess = $target.html();

    let wordIndex = helper.allIndexOf(guess, currentWord);

    if (wordIndex[0] > -1) {
        for (let j = 1; j <= wordIndex.length; j += 1) {
            let $li = $('#' + wordIndex[j - 1]);
            $li.html(guess);

            counter += 1;
        }

        if (counter == currentWord.length - 2) {
            wonGames += 1;
            won.html(`Won: ${wonGames}`);
            $description.html('You win!');
            counter = 0;
        }
    } else {
        lives -= 1;
        displayLives.html(`Lives ${lives}`);

        if (lives <= 0) {
            lostGames += 1;
            lost.html(`Lost: ${lostGames}`);
            $description.html('GAME OVER');
            counter = 0;
        }
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