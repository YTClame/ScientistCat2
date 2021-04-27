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

    let days = [];
    let onedaySettings = {};
    onedaySettings["День"] = "Понедельник";
    onedaySettings["Список"] = monday;
    days.push(onedaySettings);

    onedaySettings = {};
    onedaySettings["День"] = "Вторник";
    onedaySettings["Список"] = tuesday;
    days.push(onedaySettings);

    onedaySettings = {};
    onedaySettings["День"] = "Среда";
    onedaySettings["Список"] = wednesday;
    days.push(onedaySettings);

    onedaySettings = {};
    onedaySettings["День"] = "Четверг";
    onedaySettings["Список"] = thursday;
    days.push(onedaySettings);

    onedaySettings = {};
    onedaySettings["День"] = "Пятница";
    onedaySettings["Список"] = friday;
    days.push(onedaySettings);

    onedaySettings = {};
    onedaySettings["День"] = "Суббота";
    onedaySettings["Список"] = saturday;
    days.push(onedaySettings);

    onedaySettings = {};
    onedaySettings["День"] = "Воскресенье";
    onedaySettings["Список"] = sunday;
    days.push(onedaySettings);

    xhr.open('GET', '/api/getRasp?token=' + _getCookie('token'), true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let raspList = JSON.parse(xhr.responseText);
            raspList.forEach(raspEl => {
                if (raspEl['День'] == "Пн")
                    days[0]["Список"].push(raspEl);
                else if (raspEl['День'] == "Вт")
                    days[1]["Список"].push(raspEl);
                else if (raspEl['День'] == "Ср")
                    days[2]["Список"].push(raspEl);
                else if (raspEl['День'] == "Чт")
                    days[3]["Список"].push(raspEl);
                else if (raspEl['День'] == "Пт")
                    days[4]["Список"].push(raspEl);
                else if (raspEl['День'] == "Сб")
                    days[5]["Список"].push(raspEl);
                else if (raspEl['День'] == "Вс")
                    days[6]["Список"].push(raspEl);
                else
                    another.push(raspEl);
            });
            let res = '';
            res += '<div class="borderRaspGroup"><span class="titleRaspType">Расписание по дням недели</span>';
            days.forEach(oneDay => {
                res += '<div class="oneDayRasp"><span class="titleRaspType">' + oneDay["День"] + '</span>';
                oneDay["Список"].forEach(task => {
                    res += '<div class="oneRecordRasp">' +
                        '<span class="timeSpan">' +
                        task["От"] + '-' + task["До"] + '</span>' +
                        '<span class="taskSpan">' + task["Занятие"] + '</span>' +
                        '<span class="editRaspElementButtonSpan">' +
                        '<img class="editRaspElementButton" src="/static/img/edit.svg" onclick="editRaspElement(this);">' +
                        '<img class="editRaspElementButton" src="/static/img/trash.svg" onclick="deleteRaspElem(this);">' +
                        '</span></div>';
                });
                res += '<input type="button" class="button addButton" value="Добавить" onclick="addRaspEvent(this);"></div>';
            });
            res += '</div>';

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