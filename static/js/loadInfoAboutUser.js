function loadInfoAboutTeacher() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", '/api/getInformationAboutTeacher?token=' + _getCookie("token"), true);
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
                '<span class="labelText">Образование</span>' +
                '<span class="valueText">' + userInfo["Образование"] + '</span>' +
                '<span class="labelText">Стаж</span>' +
                '<span class="valueText">' + userInfo["Стаж"] + '</span>' +
                '<span class="labelText">Ставка в час</span>' +
                '<span class="valueText">' + userInfo["Ставка"] + '</span>' +
                '<span class="labelText">Номер телефона</span>' +
                '<span class="valueText">' + userInfo["Телефон"] + '</span>' +
                '<span class="labelText">Email</span>' +
                '<span class="valueText">' + userInfo["Email"] + '</span>' +
                '<span class="labelText">О себе</span>' +
                '<span class="valueText">' + userInfo["О себе"] + '</span>' +
                '<span class="labelText">Преподаваемые предметы</span>';
            lessons = userInfo["Преподаваемые предметы"];
            lessons.forEach(lesson => {
                mobileRes += '<span class="valueText">' + lesson + '</span>';
            });
            mobileRes += '<span class="labelText">Формат занятий</span>';
            formatLessons = userInfo["Формат занятий"];
            formatLessons.forEach(form => {
                mobileRes += '<span class="valueText">' + form + '</span>';
            });
            mobileRes += '<span class="labelText">Вид занятий</span>'
            viewLessons = userInfo["Вид занятий"];
            viewLessons.forEach(view => {
                mobileRes += '<span class="valueText">' + view + '</span>';
            });
            mobileRes += '<input type="button" class="button edit" value="Редактировать профиль">';
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
                '<span class="labelText">Образование</span>' +
                '<span class="valueText">' + userInfo["Образование"] + '</span>' +
                '<span class="labelText">Стаж</span>' +
                '<span class="valueText">' + userInfo["Стаж"] + '</span>' +
                '<span class="labelText">Ставка в час</span>' +
                '<span class="valueText">' + userInfo["Ставка"] + '</span>' +
                '<span class="labelText">Номер телефона</span>' +
                '<span class="valueText">' + userInfo["Телефон"] + '</span>' +
                '<span class="labelText">Email</span>' +
                '<span class="valueText">' + userInfo["Email"] + '</span>' +
                '<span class="labelText">О себе</span>' +
                '<span class="valueText">' + userInfo["О себе"] + '</span>' +
                '<input type="button" class="button edit" value="Редактировать профиль"></div><div class="onePartContext"><span class="labelText">Преподаваемые предметы</span>';
            lessons.forEach(lesson => {
                desktopRes += '<span class="valueText">' + lesson + '</span>';
            });
            desktopRes += '<span class="labelText">Формат занятий</span>'
            formatLessons.forEach(form => {
                desktopRes += '<span class="valueText">' + form + '</span>';
            });
            desktopRes += '<span class="labelText">Вид занятий</span>'
            viewLessons.forEach(view => {
                desktopRes += '<span class="valueText">' + view + '</span>';
            });
            desktopRes += '</div>';
            desktopCont = document.getElementById("desktopContext");
            desktopCont.innerHTML = desktopRes;
        }
    }
    xhr.send();
}


function loadInfoAboutStudent() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", '/api/getInformationAboutStudent?token=' + _getCookie("token"), true);
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
            mobileRes += '<input type="button" class="button edit" value="Редактировать профиль">';
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
                '<span class="labelText">' + userInfo["Класс"] + '</span>' +
                '<span class="labelText">Номер телефона</span>' +
                '<span class="valueText">' + userInfo["Телефон"] + '</span>' +
                '<span class="labelText">Email</span>' +
                '<span class="valueText">' + userInfo["Email"] + '</span>' +
                '<span class="labelText">О себе</span>' +
                '<span class="valueText">' + userInfo["О себе"] + '</span>' +
                '<input type="button" class="button edit" value="Редактировать профиль"></div><div class="onePartContext"><span class="labelText">Изучаемые предметы</span>';

            lessons.forEach(lesson => {
                desktopRes += '<span class="valueText">' + lesson + '</span>';
            });
            desktopRes += '<span class="labelText">Формат занятий</span>';
            formatLessons.forEach(form => {
                desktopRes += '<span class="valueText">' + form + '</span>';
            });
            desktopRes += '</div>';
            desktopCont = document.getElementById("desktopContext");
            desktopCont.innerHTML = desktopRes;
        }
    }
    xhr.send();
}



function _getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}