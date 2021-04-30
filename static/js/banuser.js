function blockUser(button, id) {
    function callbackButtonChange() {
        let parentButton = button.parentNode;
        parentButton.innerHTML = '<input type="button" class="button edit" value="Разблокировать" onclick="unblockUser(this, ' + id + ');">';
    }
    _sendRequest(id, true, callbackButtonChange)
}

function unblockUser(button, id) {
    function callbackButtonChange() {
        let parentButton = button.parentNode;
        parentButton.innerHTML = '<input type="button" class="button edit" value="Заблокировать" onclick="blockUser(this, ' + id + ');">';
    }
    _sendRequest(id, false, callbackButtonChange)
}

function _sendRequest(id, isBlockingNow, callback) { //true - блочить    false - разблочить
    let body = 'token=' + encodeURIComponent(_getCookie("token")) +
        '&id=' + encodeURIComponent(id);

    let urlApi = ''

    if (isBlockingNow)
        urlApi = '/api/blockUser';
    else
        urlApi = '/api/unblockUser';

    let xhr = new XMLHttpRequest();
    xhr.open("POST", urlApi, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            if (xhr.responseText == "Error") {
                alert("Ошибка!");
                return;
            } else {
                callback();
            }
        }
    }
    xhr.send(body);
}

function _getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}