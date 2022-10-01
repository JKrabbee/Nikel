const myModal = new bootstrap.Modal('#register-modal')
let logged = sessionStorage.getItem('logged');
const session = localStorage.getItem('session');

checkLogged();

//CRIAR LOGIN
const createform = document.getElementById('create-form');

createform.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email-create-input').value;
    const password = document.getElementById('password-create-input').value;

    if (email.length < 5) {
        alert('Preencha o campo com um e-mail válido!');
        return;
    }

    if (!(password.length === 4)) {
        alert('A senha deve conter 4 digitos!');
        return;
    }

    saveAccount({
        login: email,
        password: password,
        transaction: []
    })

    myModal.hide();

    setTimeout(() => {
        alert('Conta criada com sucesso!');
    }, 1);

});

function saveAccount(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
};

//LOGAR
const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email-input').value;
    const password = document.getElementById('password-input').value;
    const checkSession = document.getElementById('session-check').checked;

    const account = getAccont(email);

    if (!account) {
        setTimeout(() => {
            alert('Opps! Verifique o usuário ou a senha.')
        }, 1);
        return
    }

    if (account) {
        if (account.password !== password) {
            setTimeout(() => {
                alert('Opps! Verifique o usuário ou a senha.')
            }, 1);
            return
        }

        saveSession(email, checkSession);

        window.location.href = 'home.html';
    }

})

function checkLogged() {
    if (session) {
        sessionStorage.setItem('logged', session);
        logged = session;
    }

    if (logged) {
        saveSession(logged, session)

        window.location.href = 'index.html'
    }
}

function getAccont(key) {
    const account = localStorage.getItem(key);

    if (account) {
        return JSON.parse(account);
    }

    return '';
}

function saveSession(data, saveSession) {
    if (saveSession) {
        localStorage.setItem('session', data)
    }

    sessionStorage.setItem('logged', data);
}