function editRaspElement(el) {
    el = el.parentNode;
    el = el.parentNode;
    let time = el.childNodes[0].innerHTML;
    let timeStart = time.split('-')[0]
    let timeEnd = time.split('-')[1]
    let task = el.childNodes[1].innerHTML;

    let resString = '';
    resString += '<input type="text" class="input" placeholder="Время начала" value="' +
        timeStart + '"></input><input type="text" class="input" placeholder="Время завершения" value="' +
        timeEnd + '"></input><textarea class="input" placeholder="Деятельность">' +
        task + '</textarea><input type="button" class="button addButton" value="Сохранить"></input>';

    el.innerHTML = resString;
}

function addRaspEvent(el) {
    let el2 = el.parentNode;
    el2.removeChild(el);
    let text = el2.innerHTML;
    text += '<div class="oneRecordRasp">' +
        '<input type="text" class="input" placeholder="Время начала"></input>' +
        '<input type="text" class="input" placeholder="Время завершения"></input>' +
        '<textarea class="input" placeholder="Деятельность"></textarea>' +
        '<input type="button" class="button addButton" value="Сохранить" onclick="createNewRaspElem(this);">' +
        '</div><input type="button" class="button addButton" value="Добавить" onclick="addRaspEvent(this);">';
    el2.innerHTML = text;
}

function addRaspAdditionalDate(el) {
    let el2 = el.parentNode;
    el2.removeChild(el);
    let text = el2.innerHTML;
    text += '<div class="oneRecordRasp">' +
        '<input type="text" class="input" placeholder="Дата события"></input>' +
        '<input type="text" class="input" placeholder="Время начала"></input>' +
        '<input type="text" class="input" placeholder="Время завершения"></input>' +
        '<textarea class="input" placeholder="Деятельность"></textarea>' +
        '<input type="button" class="button addButton" value="Сохранить" onclick="createNewRaspElemOnCustomDate(this);">' +
        '</div><input type="button" class="button addButton" value="Создать" onclick="addRaspAdditionalDate(this);">';
    el2.innerHTML = text;
}

function createNewRaspElem(el) {
    el = el.parentNode;
    let childs = el.childNodes;
    let time1 = childs[0].value;
    let time2 = childs[1].value;
    let task = childs[2].value;
    el = el.parentNode;
    childs = el.childNodes;
    let day = childs[0].innerHTML;
    if (day == "Понедельник")
        day = "Пн";
    if (day == "Вторник")
        day = "Вт";
    if (day == "Среда")
        day = "Ср";
    if (day == "Четверг")
        day = "Чт";
    if (day == "Пятница")
        day = "Пт";
    if (day == "Суббота")
        day = "Сб";
    if (day == "Воскресенье")
        day = "Вс";
    _continueCreate(day, time1, time2, task);
}

function createNewRaspElemOnCustomDate(el) {
    el = el.parentNode;
    let childs = el.childNodes;
    let day = childs[0].value;
    let time1 = childs[1].value;
    let time2 = childs[2].value;
    let task = childs[3].value;
    _continueCreate(day, time1, time2, task);
}

function _continueCreate(day, time1, time2, task) {
    let xhrPost = new XMLHttpRequest();
    var body = 'time1=' + encodeURIComponent(time1.trim()) +
        '&time2=' + encodeURIComponent(time2.trim()) +
        '&task=' + encodeURIComponent(task.trim()) +
        '&day=' + encodeURIComponent(day.trim()) +
        '&token=' + _getCookie('token');

    xhrPost.open("POST", '/api/createRaspElem', true);
    xhrPost.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhrPost.onreadystatechange = function() {
        if (xhrPost.readyState == 4 && xhrPost.status == 200) {
            if (xhrPost.responseText == "Error")
                alert("Ошибка при добавлении нового элемента в расписание!");
            if (xhrPost.responseText == "OK")
                alert("OK!");
        }
    }
    xhrPost.send(body);
}

function deleteRaspElem(el) {
    el = el.parentNode;
    el = el.parentNode;
    let time = el.childNodes[0].innerHTML;
    let timeStart = time.split('-')[0]
    let timeEnd = time.split('-')[1]
    let task = el.childNodes[1].innerHTML;
    el = el.parentNode;
    let day = el.childNodes[0].innerHTML;
    if (day == "Понедельник")
        day = "Пн";
    if (day == "Вторник")
        day = "Вт";
    if (day == "Среда")
        day = "Ср";
    if (day == "Четверг")
        day = "Чт";
    if (day == "Пятница")
        day = "Пт";
    if (day == "Суббота")
        day = "Сб";
    if (day == "Воскресенье")
        day = "Вс";

    let xhrPost = new XMLHttpRequest();
    xhrPost.open("POST", '/api/removeRaspElem', true);
    xhrPost.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhrPost.onreadystatechange = function() {
        if (xhrPost.readyState == 4 && xhrPost.status == 200) {
            if (xhrPost.responseText == "Error")
                alert("Ошибка при удалении!");
            if (xhrPost.responseText == "OK")
                alert("OK!");
        }
    }
    var body = 'time1=' + encodeURIComponent(timeStart.trim()) +
        '&time2=' + encodeURIComponent(timeEnd.trim()) +
        '&task=' + encodeURIComponent(task.trim()) +
        '&day=' + encodeURIComponent(day.trim()) +
        '&token=' + _getCookie('token');
    xhrPost.send(body);
}

function _getCookie(name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}