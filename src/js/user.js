import storage from './storage';

export default {
    register: function(userName) {
        if (userName === '' || userName.length < 2) {
            alert('reg invalid user');
            return undefined;
        } else {
            let user = {
                username: userName,
                lives: 5,
                score: 0,
                wonGames: 0,
                lostGames: 0,
                wholeWordGuess: 0,
                guesses: 0
            }
            storage.save('users', user);
            return user;
        }
    },
    login: function(userName) {
        if (userName === '') {
            alert('login empty user');
            return;
        }

        let users = storage.load('users');
        let currentUser = users.filter((x) => {
            return x.username === userName;
        });
        
        return currentUser[0];
    }
}