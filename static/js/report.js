function report() {
    var id = parseInt(window.location.href.split('/')[(window.location.href.split('/')).length - 1]);
    var messageEl = document.getElementById("cause");
    var message = messageEl.value.trim();
    if (message.length == 0) {
        alert("Введите текст вашей жалобы");
        return;
    }
    var xhr2 = new XMLHttpRequest();
    var body = 'token=' + _getCookie('token') +
        '&id=' + id +
        '&message=' + encodeURIComponent(message)
    xhr2.open("POST", '/api/sendReport', true);
    xhr2.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr2.onreadystatechange = function() {
        if (xhr2.readyState == 4 && xhr2.status == 200) {
            if (xhr2.responseText == "Error") {
                alert("Ошибка отправки жалобы");
                return;
            }
            alert("Ваша жалоба отправленна успешно! Спасибо за участие! Администрация рассмотрит жалобу и примет меры.");
            document.location.href = '/profile';
        }
    }

    xhr2.send(body);
}

function loadName() {
    var id = parseInt(window.location.href.split('/')[(window.location.href.split('/')).length - 1]);
    var xhr3 = new XMLHttpRequest();
    var body = 'id=' + id;
    xhr3.open("POST", '/api/getNameForReport', true);
    xhr3.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr3.onreadystatechange = function() {
        if (xhr3.readyState == 4 && xhr3.status == 200) {
            if (xhr3.responseText == "Error") {
                alert("Ошибка загрузки имени");
                return;
            }
            var userName = document.getElementById("userName");
            userName.innerHTML = xhr3.responseText;
        }
    }
    xhr3.send(body);
}

function _getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}