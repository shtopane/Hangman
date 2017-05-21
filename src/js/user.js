export default {
    register: function(userName) {
        let users = JSON.parse(localStorage.getItem('users') || "[]");

        if (userName === '' || userName.length<2) {
            alert('reg invalid user');
            return;
        }
        let user = userName;
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));

    },
    login: function(userName) {
        if (userName === '') {
            alert('login empty user');
            return;
        }
        let users = JSON.parse(localStorage.getItem('users'));
        let indexOfUser=users.indexOf(userName);
        let user=users[indexOfUser];
        if (user === userName) {
            return user;
        } else {
            return undefined;
        }
    }
}