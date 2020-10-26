console.log('Background!');


async function getData(query) {
    const pid = localStorage.getItem('pid');
    const token = localStorage.getItem('token');

    console.log(query);
    const url = 'https://api.spotify.com/v1/search?q=' + query + '&type=track&limit=1';
    console.log('Token ' + token);
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
        const pid = localStorage.getItem('pid');
        const token = localStorage.getItem('token');
        var query = request.selectedText;
        console.log(query)
        getData(query)
        .then(async(data) => {
            var uri = data.tracks.items[0].uri;
            await storeInUserPlaylist(pid, uri, token);
            alert('Saved in your playlist!')
        })
        .catch((e) => {
            alert('Some error occurred!')
        })
    }
);