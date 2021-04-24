function loadRaspToToken() {
    let xhr = new XMLHttpRequest();
    let monday = [];
    let tuesday = [];
    let wednesday = [];
    let thursday = [];
    let friday = [];
    let saturday = [];
    let sunday = [];
    let another = [];
    xhr.open('GET', '/api/getRasp?token=' + _getCookie('token'), true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let raspList = JSON.parse(xhr.responseText);
            raspList.forEach(raspEl => {
                if (raspEl['День'] == "Пн")
                    monday.push(raspEl);
                else if (raspEl['День'] == "Вт")
                    tuesday.push(raspEl);
                else if (raspEl['День'] == "Ср")
                    wednesday.push(raspEl);
                else if (raspEl['День'] == "Чт")
                    thursday.push(raspEl);
                else if (raspEl['День'] == "Пт")
                    friday.push(raspEl);
                else if (raspEl['День'] == "Сб")
                    saturday.push(raspEl);
                else if (raspEl['День'] == "Вс")
                    sunday.push(raspEl);
                else
                    another.push(raspEl);
            });
            let res = '';
            res += '<div class="borderRaspGroup"><span class="titleRaspType">Расписание по дням недели</span>' +
                '<div class="oneDayRasp"><span class="titleRaspType">Понедельник</span>';
            monday.forEach(task => {
                res += '<div class="oneRecordRasp">' +
                    '<span class="timeSpan">' +
                    task["От"] + '-' + task["До"] + '</span>' +
                    '<span class="taskSpan">' + task["Занятие"] + '</span>' +
                    '<span class="editRaspElementButtonSpan">' +
                    '<img class="editRaspElementButton" src="/static/img/edit.svg" onclick="editRaspElement(this);">' +
                    '<img class="editRaspElementButton" src="/static/img/trash.svg" onclick="deleteRaspElem(this);">' +
                    '</span></div>';
            });
            res += '<input type="button" class="button addButton" value="Добавить" onclick="addRaspEvent(this);"></div>' +
                '<div class="oneDayRasp"><span class="titleRaspType">Вторник</span>';
            tuesday.forEach(task => {
                res += '<div class="oneRecordRasp">' +
                    '<span class="timeSpan">' +
                    task["От"] + '-' + task["До"] + '</span>' +
                    '<span class="taskSpan">' + task["Занятие"] + '</span>' +
                    '<span class="editRaspElementButtonSpan">' +
                    '<img class="editRaspElementButton" src="/static/img/edit.svg" onclick="editRaspElement(this);">' +
                    '<img class="editRaspElementButton" src="/static/img/trash.svg" onclick="deleteRaspElem(this);">' +
                    '</span></div>';
            });
            res += '<input type="button" class="button addButton" value="Добавить" onclick="addRaspEvent(this);"></div>' +
                '<div class="oneDayRasp"><span class="titleRaspType">Среда</span>';
            wednesday.forEach(task => {
                res += '<div class="oneRecordRasp">' +
                    '<span class="timeSpan">' +
                    task["От"] + '-' + task["До"] + '</span>' +
                    '<span class="taskSpan">' + task["Занятие"] + '</span>' +
                    '<span class="editRaspElementButtonSpan">' +
                    '<img class="editRaspElementButton" src="/static/img/edit.svg" onclick="editRaspElement(this);">' +
                    '<img class="editRaspElementButton" src="/static/img/trash.svg" onclick="deleteRaspElem(this);">' +
                    '</span></div>';
            });
            res += '<input type="button" class="button addButton" value="Добавить" onclick="addRaspEvent(this);"></div>' +
                '<div class="oneDayRasp"><span class="titleRaspType">Четверг</span>';
            thursday.forEach(task => {
                res += '<div class="oneRecordRasp">' +
                    '<span class="timeSpan">' +
                    task["От"] + '-' + task["До"] + '</span>' +
                    '<span class="taskSpan">' + task["Занятие"] + '</span>' +
                    '<span class="editRaspElementButtonSpan">' +
                    '<img class="editRaspElementButton" src="/static/img/edit.svg" onclick="editRaspElement(this);">' +
                    '<img class="editRaspElementButton" src="/static/img/trash.svg" onclick="deleteRaspElem(this);">' +
                    '</span></div>';
            });
            res += '<input type="button" class="button addButton" value="Добавить" onclick="addRaspEvent(this);"></div>' +
                '<div class="oneDayRasp"><span class="titleRaspType">Пятница</span>';
            friday.forEach(task => {
                res += '<div class="oneRecordRasp">' +
                    '<span class="timeSpan">' +
                    task["От"] + '-' + task["До"] + '</span>' +
                    '<span class="taskSpan">' + task["Занятие"] + '</span>' +
                    '<span class="editRaspElementButtonSpan">' +
                    '<img class="editRaspElementButton" src="/static/img/edit.svg" onclick="editRaspElement(this);">' +
                    '<img class="editRaspElementButton" src="/static/img/trash.svg" onclick="deleteRaspElem(this);">' +
                    '</span></div>';
            });
            res += '<input type="button" class="button addButton" value="Добавить" onclick="addRaspEvent(this);"></div>' +
                '<div class="oneDayRasp"><span class="titleRaspType">Суббота</span>';
            saturday.forEach(task => {
                res += '<div class="oneRecordRasp">' +
                    '<span class="timeSpan">' +
                    task["От"] + '-' + task["До"] + '</span>' +
                    '<span class="taskSpan">' + task["Занятие"] + '</span>' +
                    '<span class="editRaspElementButtonSpan">' +
                    '<img class="editRaspElementButton" src="/static/img/edit.svg" onclick="editRaspElement(this);">' +
                    '<img class="editRaspElementButton" src="/static/img/trash.svg" onclick="deleteRaspElem(this);">' +
                    '</span></div>';
            });
            res += '<input type="button" class="button addButton" value="Добавить" onclick="addRaspEvent(this);"></div>' +
                '<div class="oneDayRasp"><span class="titleRaspType">Воскресенье</span>';
            sunday.forEach(task => {
                res += '<div class="oneRecordRasp">' +
                    '<span class="timeSpan">' +
                    task["От"] + '-' + task["До"] + '</span>' +
                    '<span class="taskSpan">' + task["Занятие"] + '</span>' +
                    '<span class="editRaspElementButtonSpan">' +
                    '<img class="editRaspElementButton" src="/static/img/edit.svg" onclick="editRaspElement(this);">' +
                    '<img class="editRaspElementButton" src="/static/img/trash.svg" onclick="deleteRaspElem(this);">' +
                    '</span></div>';
            });
            res += '<input type="button" class="button addButton" value="Добавить" onclick="addRaspEvent(this);"></div>' +
                '</div>';
            //Блок с датами:
            res += '<div class="borderRaspGroup"><span class="titleRaspType">Дополнительное расписание по датам</span>';
            let printedDates = [];
            another.forEach(task => {
                dateName = task['День'];
                if (printedDates.indexOf(dateName) == -1) {
                    res += '<div class="oneDayRasp">' +
                        '<span class="titleRaspType">' + dateName + '</span>';
                    another.forEach(task2 => {
                        if (task2["День"] == dateName) {
                            res += '<div class="oneRecordRasp">' +
                                '<span class="timeSpan">' +
                                task2["От"] + '-' + task2["До"] + '</span>' +
                                '<span class="taskSpan">' + task2["Занятие"] + '</span>' +
                                '<span class="editRaspElementButtonSpan">' +
                                '<img class="editRaspElementButton" src="/static/img/edit.svg" onclick="editRaspElement(this);">' +
                                '<img class="editRaspElementButton" src="/static/img/trash.svg" onclick="deleteRaspElem(this);">' +
                                '</span></div>';
                        }
                    });
                    res += '<input type="button" class="button addButton" value="Добавить" onclick="addRaspEvent(this);"></div>';
                    printedDates.push(dateName);
                }
            });
            res += '<input type="button" class="button addButton" value="Создать" onclick="addRaspAdditionalDate(this);"></div>';
            raspFrontElemFromId = document.getElementById("raspContent");
            raspFrontElemFromId.innerHTML = res;
        }
    }
    xhr.send();
}

function _getCookie(name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}