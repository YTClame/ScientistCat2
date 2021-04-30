function loadReports() {
    let body = 'token=' + encodeURIComponent(_getCookie('token'));

    let xhr = new XMLHttpRequest();
    xhr.open("POST", '/api/loadReports', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            if (xhr.responseText == "Error") {
                alert("Ошибка!");
                return;
            } else {
                let reports = JSON.parse(xhr.responseText);
                let res = '';
                reports.forEach(report => {
                    res += '<div class="report"><div class="oneString"><span class="fieldName">Обвинитель: </span><a href="/user/' +
                        report['Отправитель'] + '"><span class="fieldText name">' +
                        report['Фамилия отправителя'] + ' ' + report["Имя отправителя"] + '</span></a></div><div class="oneString"><span class="fieldName">Обвиняемый: </span><a href="/user/' +
                        report['Обвиняемый'] + '"><span class="fieldText name">' +
                        report['Фамилия обвиняемого'] + ' ' + report['Имя обвиняемого'] + '</span></a></div><div class="oneString"><span class="fieldName">Жалоба: </span><span class="fieldText">' +
                        report['Жалоба'] + '</span></div><input type="button" class="button RepButton" value="Их переписка" onclick="window.open(\'/messenger?f=' +
                        report['Отправитель'] + '&s=' + report['Обвиняемый'] + '\');">\n<input type="button" class="button RepButton" value="Удалить" onclick="removeReport(' + report['ID'] + ', this)"></div>';
                });
                let el = document.getElementById('reportsMainDiv');
                el.innerHTML = res;
            }
        }
    }
    xhr.send(body);
}

function removeReport(id, button) {
    var body = 'token=' + encodeURIComponent(_getCookie('token')) +
        '&id=' + encodeURIComponent(id);

    let xhr = new XMLHttpRequest();
    xhr.open("POST", '/api/deleteReport', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            if (xhr.responseText == "Error") {
                alert("Ошибка!");
                return;
            } else {
                button = button.parentNode;
                button.remove();
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