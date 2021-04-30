function load() {
    let params = (new URL(document.location)).searchParams;
    let idF = params.get("f");
    let idS = params.get("s")
    var body = 'token=' + encodeURIComponent(_getCookie('token')) +
        '&f=' + encodeURIComponent(idF) +
        '&s=' + encodeURIComponent(idS);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", '/api/loadMessagesToIds', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            if (xhr.responseText == "Error") {
                alert("Ошибка!");
                return;
            } else if (xhr.responseText == "OK") {
                let messages = JSON.parse(xhr.responseText);
                let res = '';
                messages.forEach(message => {
                    if (message['Отправитель'] == idF) {
                        //Зелёные
                        res += '<div class="outputMessageDiv"><span class="outputMessage dateTime">(' +
                            message['Дата'] + ' ' + message['Время'] + ')   </span><span class="outputMessage">' +
                            message['Сообщение'] + '</span></div>';
                    } else {
                        //Красные
                        res += '<div class="inputMessageDiv"><span class="inputMessage">' +
                            message['Сообщение'] + '</span><span class="inputMessage dateTime">   (' +
                            message['Дата'] + ' ' + message['Время'] + ')</span></div>';
                    }
                });
                let el = document.getElementById('messenger');
                el.innerHTML = res;
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