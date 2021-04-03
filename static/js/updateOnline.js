function updateOnlineFunc() {
    _updateOnlineFunc();
    setInterval(() => _updateOnlineFunc(), 120000);
}

function _updateOnlineFunc() {
    var xhr2 = new XMLHttpRequest();
    var body = 'token=' + _getCookie('token');
    xhr2.open("POST", '/api/wasOnline', true);
    xhr2.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr2.onreadystatechange = function() {
        if (xhr2.readyState == 4 && xhr2.status == 200) {
            if (xhr2.responseText == "Error")
                console.log("Ошибка отправки online статуса")
        }
    }

    xhr2.send(body);
}

function _getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}