console.log('Background!');

const pid = localStorage.getItem('pid');
const token = localStorage.getItem('token');

console.log(pid);

async function getData(query) {
    console.log(query)
    const url = 'https://api.spotify.com/v1/search?q=' + query + '&type=track&limit=1';
    const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
    });
    return response.json();
}


async function storeInUserPlaylist(pid, uri, token){
    const url = "https://api.spotify.com/v1/playlists/" + pid + "/tracks?uris=" + uri;
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token 
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
    });
    return response.json();
}


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        var query = request.selectedText;
        console.log(query)
        getData(query)
        .then(data => {
            var uri = data.tracks.items[0].uri;
            storeInUserPlaylist(pid, uri, token);
        })
    }
);