console.log('Chrome Extension up!');

window.addEventListener('mouseup', () => {
    let text = window.getSelection().toString();
    console.log(text);

    let songName = {
        'selectedText': text
    } 

    if (text.length > 0){
        chrome.runtime.sendMessage(songName);
    }
});