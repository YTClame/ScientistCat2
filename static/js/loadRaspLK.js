rasp = {}
times = ["08:00-09:00", "09:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-13:00", "13:00-14:00", "14:00-15:00", "15:00-16:00", "16:00-17:00", "17:00-18:00", "18:00-19:00", "19:00-20:00", "20:00-21:00", "21:00-22:00", "22:00-23:00"];
mobileDayOfTheWeek = ''

function loadMobileRasp(day) {
    mobileDayOfTheWeek = day;
    mobileRes = "";
    if (day == "Пн")
        mobileRes = '<span id="mobileNameOfDay">Понедельник</span>';
    if (day == "Вт")
        mobileRes = '<span id="mobileNameOfDay">Вторник</span>';
    if (day == "Ср")
        mobileRes = '<span id="mobileNameOfDay">Среда</span>';
    if (day == "Чт")
        mobileRes = '<span id="mobileNameOfDay">Четверг</span>';
    if (day == "Пт")
        mobileRes = '<span id="mobileNameOfDay">Пятница</span>';
    if (day == "Сб")
        mobileRes = '<span id="mobileNameOfDay">Суббота</span>';
    if (day == "Вс")
        mobileRes = '<span id="mobileNameOfDay">Воскресенье</span>';
    mobileRes += '<div id="mobileMargin"></div>';
    for (var i = 0; i < 15; i++) {
        mobileRes += '<div class="mobileTimeDiv"><span class="mobileTimeSpan">' +
            times[i] + '</span><div class="mobileDay ';
        if (rasp[day][i] == "Свободен")
            mobileRes += 'green';
        else
            mobileRes += 'red';
        mobileRes += '" onclick="changeRaspElem(this, \'' + day + '\', ' + i + ');"></div></div>';
    }
    mobileRasp = document.getElementById("mobileContent");
    mobileRasp.innerHTML = mobileRes;
}

function _loadRaspToToken() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", '/api/getRasp?token=' + _getCookie("token"), true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200 && xhr.responseText != "Error") {
            rasp = JSON.parse(xhr.responseText);
            loadMobileRasp("Пн");

            desktopRes = '';
            days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
            days.forEach((day) => {
                desktopRes += '<div class="desktopOneDayColumn">';
                desktopRes += '<span class="desktopDayName">' + day + '</span>';
                desktopRes += '<div class="desktomMargin"></div>';
                for (var i = 0; i < 14; i++) {
                    if (rasp[day][i] == 'Свободен')
                        desktopRes += '<div class="desktopOneHourBlock green" onclick="changeRaspElem(this, \'' + day + '\', ' + i + ');"></div>'
                    else
                        desktopRes += '<div class="desktopOneHourBlock red" onclick="changeRaspElem(this, \'' + day + '\', ' + i + ');"></div>'
                }
                if (rasp[day][14] == 'Свободен')
                    desktopRes += '<div class="desktopOneHourBlock bottom green" onclick="changeRaspElem(this, \'' + day + '\', ' + i + ');"></div></div>'
                else
                    desktopRes += '<div class="desktopOneHourBlock bottom red" onclick="changeRaspElem(this, \'' + day + '\', ' + i + ');"></div></div>'
            })
            desktopRasp = document.getElementById("desktopColumnsDays");
            desktopRasp.innerHTML = desktopRes;
        }
    }
    xhr.send();
}

function changeRaspElem(el, day, indexHour) {
    var body = 'token=' + _getCookie('token') +
        '&day=' + encodeURIComponent(day) +
        '&hourIndex=' + indexHour;

    var xhr2 = new XMLHttpRequest();
    xhr2.open("POST", '/api/updateRasp', true);
    xhr2.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr2.onreadystatechange = function() {
        if (xhr2.readyState == 4 && xhr2.status == 200) {
            try {
                rasp = JSON.parse(xhr2.responseText);
            } catch {
                alert("Произошла ошибка");
            }
            desktopRes = '';
            days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
            days.forEach((day) => {
                desktopRes += '<div class="desktopOneDayColumn">';
                desktopRes += '<span class="desktopDayName">' + day + '</span>';
                desktopRes += '<div class="desktomMargin"></div>';
                for (var i = 0; i < 14; i++) {
                    if (rasp[day][i] == 'Свободен')
                        desktopRes += '<div class="desktopOneHourBlock green" onclick="changeRaspElem(this, \'' + day + '\', ' + i + ');"></div>'
                    else
                        desktopRes += '<div class="desktopOneHourBlock red" onclick="changeRaspElem(this, \'' + day + '\', ' + i + ');"></div>'
                }
                if (rasp[day][14] == 'Свободен')
                    desktopRes += '<div class="desktopOneHourBlock bottom green" onclick="changeRaspElem(this, \'' + day + '\', ' + i + ');"></div></div>'
                else
                    desktopRes += '<div class="desktopOneHourBlock bottom red" onclick="changeRaspElem(this, \'' + day + '\', ' + i + ');"></div></div>'
            })
            desktopRasp = document.getElementById("desktopColumnsDays");
            desktopRasp.innerHTML = desktopRes;
            loadMobileRasp(mobileDayOfTheWeek);
        }
    }
    xhr2.send(body);
}

function _getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}