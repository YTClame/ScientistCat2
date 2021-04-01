function loadInfoAboutStudent() {
    var xhr = new XMLHttpRequest();
    nowUrl = window.location.href;
    xhr.open("GET", '/api/getInformationAboutStudent?id=' + nowUrl.split('/')[nowUrl.split('/').length - 1], true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200 && xhr.responseText != "Error") {
            userInfo = JSON.parse(xhr.responseText);
            mobileRes = "";
            mobileRes += '<img id="avatarMobile" src="' + userInfo["Фото"] + '" alt="Ваше фото">' +
                '<span class="labelText">Фамилия</span>' +
                '<span class="valueText">' + userInfo["Фамилия"] + '</span>' +
                '<span class="labelText">Имя</span>' +
                '<span class="valueText">' + userInfo["Имя"] + '</span>' +
                '<span class="labelText">Дата рождения</span>' +
                '<span class="valueText">' + userInfo["Дата рождения"] + '</span>' +
                '<span class="labelText">Класс</span>' +
                '<span class="valueText">' + userInfo["Класс"] + '</span>' +
                '<span class="labelText">Номер телефона</span>' +
                '<span class="valueText">' + userInfo["Телефон"] + '</span>' +
                '<span class="labelText">Email</span>' +
                '<span class="valueText">' + userInfo["Email"] + '</span>' +
                '<span class="labelText">О себе</span>' +
                '<span class="valueText">' + userInfo["О себе"] + '</span>' +
                '<span class="labelText">Изучаемые предметы</span>';
            lessons = userInfo["Изучаемые предметы"];
            lessons.forEach(lesson => {
                mobileRes += '<span class="valueText">' + lesson + '</span>';
            });
            mobileRes += '<span class="labelText">Формат занятий</span>';
            formatLessons = userInfo["Формат занятий"];
            formatLessons.forEach(form => {
                mobileRes += '<span class="valueText">' + form + '</span>';
            });
            mobileRes += '<a href="#"><input type="button" class="button edit" value="Написать пользователю"></a>' +
                '<a href="#"><input type="button" class="button edit" value="Пожаловаться"></a>' +
                '<div class="menuMobileDiv"><input type="button" class="button" onclick="showHideMenu(4);" value="Выбрать день"><div class="menuMobile" id="menuId4" data-vis="nonvis">' +
                '<input type="button" class="button choice" id="mobileDay1" value="Понедельник" onclick="setRaspDay(1);loadMobileRasp(\'Пн\')">' +
                '<input type="button" class="button" id="mobileDay2" value="Вторник" onclick="setRaspDay(2);loadMobileRasp(\'Вт\')">' +
                '<input type="button" class="button" id="mobileDay3" value="Среда" onclick="setRaspDay(3);loadMobileRasp(\'Ср\')">' +
                '<input type="button" class="button" id="mobileDay4" value="Четверг" onclick="setRaspDay(4);loadMobileRasp(\'Чт\')">' +
                '<input type="button" class="button" id="mobileDay5" value="Пятница" onclick="setRaspDay(5);loadMobileRasp(\'Пт\')">' +
                '<input type="button" class="button" id="mobileDay6" value="Суббота" onclick="setRaspDay(6);loadMobileRasp(\'Сб\')">' +
                '<input type="button" class="button" id="mobileDay7" value="Воскресенье" onclick="setRaspDay(7);loadMobileRasp(\'Вс\')"></div></div><div id="raspMobile"></div>';
            mobileCont = document.getElementById("mobileContext");
            mobileCont.innerHTML = mobileRes;

            desktopRes = "";
            desktopRes += '<div class="onePartContext">' +
                '<img id="avatarDesktop" src="' + userInfo["Фото"] + '" alt="Ваше фото">' +
                '<span class="labelText firstColTextLabel">Фамилия</span>' +
                '<span class="valueText firstColTextValue">' + userInfo["Фамилия"] + '</span>' +
                '<span class="labelText firstColTextLabel">Имя</span>' +
                '<span class="valueText firstColTextValue">' + userInfo["Имя"] + '</span>' +
                '</div><div class="onePartContext">' +
                '<span class="labelText">Дата рождения</span>' +
                '<span class="valueText">' + userInfo["Дата рождения"] + '</span>' +
                '<span class="labelText">Класс</span>' +
                '<span class="valueText">' + userInfo["Класс"] + '</span>' +
                '<span class="labelText">Номер телефона</span>' +
                '<span class="valueText">' + userInfo["Телефон"] + '</span>' +
                '<span class="labelText">Email</span>' +
                '<span class="valueText">' + userInfo["Email"] + '</span>' +
                '<span class="labelText">О себе</span>' +
                '<span class="valueText">' + userInfo["О себе"] + '</span>' +
                '<a href="#"><input type="button" class="button edit" value="Написать пользователю"></a><a href="#"><input type="button" class="button edit" value="Пожаловаться"></a></div><div class="onePartContext"><span class="labelText">Изучаемые предметы</span>';

            lessons.forEach(lesson => {
                desktopRes += '<span class="valueText">' + lesson + '</span>';
            });
            desktopRes += '<span class="labelText">Формат занятий</span>';
            formatLessons.forEach(form => {
                desktopRes += '<span class="valueText">' + form + '</span>';
            });
            desktopRes += '</div><div id="raspDesktop"></div>';
            desktopCont = document.getElementById("desktopContext");
            desktopCont.innerHTML = desktopRes;
            _loadRaspToId()
        }
    }
    xhr.send();
}

rasp = {}
times = ["08:00-09:00", "09:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-13:00", "13:00-14:00", "14:00-15:00", "15:00-16:00", "16:00-17:00", "17:00-18:00", "18:00-19:00", "19:00-20:00", "20:00-21:00", "21:00-22:00", "22:00-23:00"];

function loadMobileRasp(day) {
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
        mobileRes += '"></div></div>';
    }
    mobileRasp = document.getElementById("raspMobile");
    mobileRasp.innerHTML = mobileRes;
}

function _loadRaspToId() {
    var xhr = new XMLHttpRequest();
    nowUrl = window.location.href;
    xhr.open("GET", '/api/getRasp?id=' + nowUrl.split('/')[nowUrl.split('/').length - 1], true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200 && xhr.responseText != "Error") {
            rasp = JSON.parse(xhr.responseText);
            loadMobileRasp("Пн");

            desktopRes = '<div id="desktopColumnTime"><div class="desktopTimeDiv"><span class="desktopTimeSpan">08:00-09:00</span></div><div class="desktopTimeDiv"><span class="desktopTimeSpan">09:00-10:00</span></div><div class="desktopTimeDiv"><span class="desktopTimeSpan">10:00-11:00</span></div><div class="desktopTimeDiv"><span class="desktopTimeSpan">11:00-12:00</span></div><div class="desktopTimeDiv"><span class="desktopTimeSpan">12:00-13:00</span></div><div class="desktopTimeDiv"><span class="desktopTimeSpan">13:00-14:00</span></div><div class="desktopTimeDiv"><span class="desktopTimeSpan">14:00-15:00</span></div><div class="desktopTimeDiv"><span class="desktopTimeSpan">15:00-16:00</span></div><div class="desktopTimeDiv"><span class="desktopTimeSpan">16:00-17:00</span></div><div class="desktopTimeDiv"><span class="desktopTimeSpan">17:00-18:00</span></div><div class="desktopTimeDiv"><span class="desktopTimeSpan">18:00-19:00</span></div><div class="desktopTimeDiv"><span class="desktopTimeSpan">19:00-20:00</span></div><div class="desktopTimeDiv"><span class="desktopTimeSpan">20:00-21:00</span></div><div class="desktopTimeDiv"><span class="desktopTimeSpan">21:00-22:00</span></div><div class="desktopTimeDiv"><span class="desktopTimeSpan">22:00-23:00</span></div></div><div id="desktopColumnsDays">';
            days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
            days.forEach((day) => {
                desktopRes += '<div class="desktopOneDayColumn">';
                desktopRes += '<span class="desktopDayName">' + day + '</span>';
                desktopRes += '<div class="desktomMargin"></div>';
                for (var i = 0; i < 14; i++) {
                    if (rasp[day][i] == 'Свободен')
                        desktopRes += '<div class="desktopOneHourBlock green"></div>'
                    else
                        desktopRes += '<div class="desktopOneHourBlock red"></div>'
                }
                if (rasp[day][14] == 'Свободен')
                    desktopRes += '<div class="desktopOneHourBlock bottom green"></div></div>'
                else
                    desktopRes += '<div class="desktopOneHourBlock bottom red"></div></div>'
            })
            desktopRes += '</div>';
            desktopRasp = document.getElementById("raspDesktop");
            desktopRasp.innerHTML = desktopRes;
        }
    }
    xhr.send();
}