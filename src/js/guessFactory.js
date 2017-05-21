export default{
    createAlphabet: function() {
        let alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
            'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
            't', 'u', 'v', 'w', 'x', 'y', 'z'
        ];

        let alphabetDiv = document.getElementsByClassName('letter-buttons')[0];
        let alphabetUl = document.createElement('ul');
        let li = document.createElement('li');
        let listOfLetters;

        for (let i = 0; i < alphabet.length; i += 1) {
            alphabetUl['id'] = 'alphabet';

            listOfLetters = li.cloneNode(true);

            listOfLetters.classList += 'letter';
            listOfLetters.innerHTML = alphabet[i];

            alphabetUl.appendChild(listOfLetters);
        }
        alphabetDiv.appendChild(alphabetUl);
    },
    completeGuess: function(wordIndex, guess) {
        for (let j = 0; j < wordIndex.length; j += 1) {
            let indexToLook = wordIndex[j] + 1;
            let $li = $(`#${indexToLook}`);
            $li.html(guess);
        }
    },
    createGuess: function(currentWord) {
        let $li = $(`<li class="guess-letter"></li>`);
        let result = [];
        for (let i = 0; i < currentWord.length; i += 1) {
            let $resultLi = $li.clone();
            $resultLi.attr('id', i);

            this.fillGuess(i, currentWord, $resultLi);
            result.push($resultLi);
        }
        return result;
    },
    fillGuess: function(id, currentWord, el) {
        if (id === 0) {
            el.html(`${currentWord[0]}`);
        } else if (id === currentWord.length - 1) {
            el.html(`${currentWord[currentWord.length-1]}`);
        } else {
            el.html('_');
        }
    }
}