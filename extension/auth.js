console.log('Auth file!');

const CLIENT_ID = '74dd0bc1759e40a291d2aacd457a33ea';
const button = document.createElement('button');
const button2 = document.createElement('button');
const div = document.getElementById('test');

button.innerHTML = 'Login';
button.addEventListener('click', (e) => {
    getAuth();
});
button2.innerHTML = 'Submit';
button2.addEventListener('click', (e) => {
    getToken();
});
const input = document.createElement('input');
input.type = 'text';
input.id = 'code';
input.placeholder = 'Code'
const input2 = document.createElement('input');
input2.type = 'text';
input2.id = 'pid';
input2.placeholder = 'Playlist ID'

div.append(input2);
div.append(button);
div.append(document.createElement('br'));
div.append(input);
div.append(button2);


async function getToken() {
    let code = document.getElementById('code').value;
    const url = 'http://localhost:3000/auth/get-token'
    fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: 'code=' + code
    })
        .then((response) => {
            response.json().then((data) => {
                localStorage.setItem('token', data.access_token);
                alert('Token stored!');
            })
                .catch((e) => {
                    alert(e);
                })
        })
        .catch((e) => {
            alert(e);
        })
}


async function getData() {
    localStorage.clear();
    localStorage.setItem('pid', input2.value);
    window.open('https://accounts.spotify.com/authorize?client_id=' + CLIENT_ID + '&response_type=code&redirect_uri=http://localhost:3000/auth/&scope=playlist-modify-public', '_blank');
}


function getAuth() {
    getData()
        .then((response) => {
            console.log(response);
        })
        .catch((e) => {
            console.log(e);
        })
}