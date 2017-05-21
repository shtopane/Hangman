export default {
    save: function(key, value) {
        let users = JSON.parse(localStorage.getItem(key)) || [];
        users.push(value);
        localStorage.setItem(key, JSON.stringify(users));
    },
    load: function(key) {
        return JSON.parse(localStorage.getItem(key));
    },
    remove: function(key) {
        localStorage.removeItem(key);
    },
    update: function(user) {
        console.log('update user', user);
        let users = JSON.parse(localStorage.getItem('users')) || [];
        for (let i = 0; i < users.length; i += 1) {
            if (users[i].username === user.username) {
                console.log(users[i]);
                users[i] = user;
                break;
            }
        }
        localStorage.setItem('users', JSON.stringify(users));

    }
}