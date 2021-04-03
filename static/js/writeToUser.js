function writeToUserFunc(id) {
    var xhr2 = new XMLHttpRequest();
    var body = 'token=' + _getCookie('token') +
        '&id=' + id;
    xhr2.open("POST", '/api/writeToUser', true);
    xhr2.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr2.onreadystatechange = function() {
        if (xhr2.readyState == 4 && xhr2.status == 200) {
            if (xhr2.responseText == "Error")
                alert("Произошла ошибка! Попробуйте позже!");
            else
                document.location.href = '/messenger';
        }
    }

    xhr2.send(body);
}

function _getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}