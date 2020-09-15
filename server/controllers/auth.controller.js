require('dotenv').config();
const axios = require('axios');
const qs = require('qs');

async function sendPostRequest(code) {
    const url = 'https://accounts.spotify.com/api/token';
    var data = {
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': 'https://spotify-server-api.herokuapp.com/auth',
    }
    var headers = {
        'Authorization': `Basic ${process.env.BASE64STR}`,
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
    }

    return axios.post(url, qs.stringify(data), {
        headers: headers
    })
    .then((response) => {
        return new Promise((resolve, reject) => {
            if (response.data.access_token !== undefined){
                resolve(response.data.access_token);
            }else{
                reject('No Access Token!');
            }
        })
    })
    .catch((e) => {
        console.log(e);
        return new Promise.reject('No Access Token!');
    });
}

const getUserToken = async (req, res) => {
    const code = req.body.code;
    var response = await sendPostRequest(code);
    res.status(200).send({
        'access_token': response
    });
}

const showCodeToUser = async (req, res) => {
    res.send(`<h1>Hello User!</h1><p>Your requested Access Token is: ${req.query['code']}</p><p>Please paste the token in the code dialog box!</p><p><i>Have fun!</i></p>`);
}

module.exports = { getUserToken, showCodeToUser };