function _drawRasp(rasp) {
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

    rasp.forEach(raspEl => {
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
    let isClear = true;
    days.forEach(oneDay => {
        if (oneDay["Список"].length > 0) {
            isClear = false;
            return;
        }
    });
    if (!isClear) {
        res += '<div class="borderRaspGroup"><span class="titleRaspType">Расписание по дням недели</span>';
        days.forEach(oneDay => {
            if (oneDay["Список"].length > 0) {
                res += '<div class="oneDayRasp"><span class="titleRaspType">' + oneDay["День"] + '</span>';
                oneDay["Список"].forEach(task => {
                    res += '<div class="oneRecordRasp">' +
                        '<span class="timeSpan">' +
                        task["От"] + '-' + task["До"] + '</span>' +
                        '<span class="taskSpan">' + task["Занятие"] + '</span>' +
                        '<span class="editRaspElementButtonSpan"></span></div>';
                });
                res += '</div>';
            }
        });
        res += '</div>';
    }


    //Блок с датами:
    if (another.length > 0) {
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
                            '<span class="editRaspElementButtonSpan"></span></div>';
                    }
                });
                res += '</div>';
                printedDates.push(dateName);
            }
        });
        res += '</div>';
    }

    raspFrontElemFromId = document.getElementById("raspContent");
    raspFrontElemFromId.innerHTML = res;
}