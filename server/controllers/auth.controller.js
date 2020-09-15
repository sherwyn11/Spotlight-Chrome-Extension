require('dotenv').config();
const axios = require('axios');
const qs = require('qs');

async function sendPostRequest(code) {
    const url = 'https://accounts.spotify.com/api/token';
    var data = {
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': 'https://spotify-server-api.herokuapp.com/auth/',
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
        throw new Error(e);
    })
}

const getUserToken = async (req, res) => {
    const code = req.body.code;
    var response = await sendPostRequest(code);
    res.status(200).send({
        'access_token': response
    });
}

const showCodeToUser = async (req, res) => {
    console.log(req.query['code']);
    res.send(req.query['code']);
}

module.exports = { getUserToken, showCodeToUser };