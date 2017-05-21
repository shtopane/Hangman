export default {
    register: function(userName) {
        if(userName===''){
            console.log('reg empty user');
            return;
        }
        console.log(userName)
        localStorage.setItem('userName', JSON.stringify(userName));
    },
    login: function(userName) {
        console.log(userName);
        if(userName===''){
            console.log('login empty user');
            return;
        }
        let user = localStorage.getItem('userName');
        user = JSON.parse(user);
        if(user===userName){
            return user;
        }else{
            return undefined;
        }
    }
}