function loadInfoAboutTeacher() {
    var xhr = new XMLHttpRequest();
    nowUrl = window.location.href;
    id = nowUrl.split('/')[nowUrl.split('/').length - 1];
    xhr.open("GET", '/api/getInformationAboutTeacher?id=' + id, true);
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
                '<span class="valueText">' + userInfo["О себе"] + '</span>';

            desktopRes += '</div><div class="onePartContext"><span class="labelText">Преподаваемые предметы</span>';
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
            menuButtonBlockMobile = '';
            if (userInfo["Доступ"] == "Открыт")
                menuButtonBlockMobile = '<input type="button" class="button edit" value="Заблокировать" onclick="blockUser(this, ' + id + ');">';
            if (userInfo["Доступ"] == "Закрыт")
                menuButtonBlockMobile = '<input type="button" class="button edit" value="Разблокировать" onclick="unblockUser(this, ' + id + ');">';
            menuBlockDivEl = document.getElementById("blockButtonDiv");
            menuBlockDivEl.innerHTML = menuButtonBlockMobile;
            _loadRaspToId();
        }
    }
    xhr.send();
}

function _loadRaspToId() {
    var xhr = new XMLHttpRequest();
    nowUrl = window.location.href;
    id = nowUrl.split('/')[nowUrl.split('/').length - 1];
    xhr.open("GET", '/api/getRasp?id=' + id, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200 && xhr.responseText != "Error") {
            let rasp = JSON.parse(xhr.responseText);
            _drawRasp(rasp)
        }
    }
    xhr.send();
}