export default {
    getRandom: function(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    },
    allIndexOf: function(substring, str) {
        let result = [],
            i = -1;
        while ((i = str.indexOf(substring, i + 1)) >= 0) {
            result.push(i);
        }
        return result;
    },
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
    showCategory: function(categoryIndex) {
        if (categoryIndex == 0) {
            return "The Chosen Category is Animals";
        } else if (categoryIndex == 1) {
            return "The Chosen Category Is Films";
        } else {
            return "The Chosen Category Is Cities";
        }
    }
}