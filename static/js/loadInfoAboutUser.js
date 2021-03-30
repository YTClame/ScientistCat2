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
            mobileRes += '<a href="./edit"><input type="button" class="button edit" value="Редактировать профиль"></a>';
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
                '<a href="./edit"><input type="button" class="button edit" value="Редактировать профиль"></a></div><div class="onePartContext"><span class="labelText">Преподаваемые предметы</span>';
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
            mobileRes += '<a href="./edit"><input type="button" class="button edit" value="Редактировать профиль"></a>';
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
                '<a href="./edit"><input type="button" class="button edit" value="Редактировать профиль"></a></div><div class="onePartContext"><span class="labelText">Изучаемые предметы</span>';

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

function loadEditableTeacher() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", '/api/getInformationAboutTeacher?token=' + _getCookie("token"), true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200 && xhr.responseText != "Error") {
            userInfo = JSON.parse(xhr.responseText);
            secondName = document.getElementById("secondName");
            secondName.value = userInfo["Фамилия"];
            firstName = document.getElementById("firstName");
            firstName.value = userInfo["Имя"];
            birthDay = document.getElementById("birthDay");
            birthDay.value = userInfo["Дата рождения"];

            formatLessons = userInfo["Формат занятий"];
            selectTTOS = document.getElementById("selectTTOS");
            selectSTOT = document.getElementById("selectSTOT");
            selectDistant = document.getElementById("selectDistant");
            formatLessons.forEach(form => {
                if (form == "Ученик ко мне")
                    selectSTOT.checked = true;
                if (form == "Я к ученику")
                    selectTTOS.checked = true;
                if (form == "Дистанционно")
                    selectDistant.checked = true;
            });
            selectEducation = document.getElementById("selectEducation");
            selectEducation.value = userInfo["Образование"];
            stash = document.getElementById("stash");
            stash.value = userInfo["Стаж"];
            radioMan = document.getElementById("radioMan");
            radioWoman = document.getElementById("radioWoman");
            if (userInfo["Пол"] == "М") {
                radioWoman.checked = false;
                radioMan.checked = true;
            }
            if (userInfo["Пол"] == "Ж") {
                radioMan.checked = false;
                radioWoman.checked = true;
            }
            telephone = document.getElementById("telephone");
            telephone.value = userInfo["Телефон"];
            email = document.getElementById("email");
            email.value = userInfo["Email"];

            lessons = userInfo["Преподаваемые предметы"];
            lessons.forEach(lesson => {
                if (lesson == "Математика") {
                    el = document.getElementById("selectMATH");
                    el.checked = true;
                }
                if (lesson == "Русский язык") {
                    el = document.getElementById("selectRUS");
                    el.checked = true;
                }
                if (lesson == "Физика") {
                    el = document.getElementById("selectPHIS");
                    el.checked = true;
                }
                if (lesson == "Информатика") {
                    el = document.getElementById("selectINF");
                    el.checked = true;
                }
                if (lesson == "Химия") {
                    el = document.getElementById("selectCHEM");
                    el.checked = true;
                }
                if (lesson == "Биология") {
                    el = document.getElementById("selectBIO");
                    el.checked = true;
                }
                if (lesson == "История") {
                    el = document.getElementById("selectHIST");
                    el.checked = true;
                }
                if (lesson == "Обществознание") {
                    el = document.getElementById("selectSOC");
                    el.checked = true;
                }
                if (lesson == "Литература") {
                    el = document.getElementById("selectLIT");
                    el.checked = true;
                }
                if (lesson == "География") {
                    el = document.getElementById("selectGEO");
                    el.checked = true;
                }
                if (lesson == "Экономика") {
                    el = document.getElementById("selectECO");
                    el.checked = true;
                }
                if (lesson == "Английский язык") {
                    el = document.getElementById("selectENG");
                    el.checked = true;
                }
                if (lesson == "Немецкий язык") {
                    el = document.getElementById("selectNEM");
                    el.checked = true;
                }
            });
            price = document.getElementById("price");
            price.value = userInfo["Ставка"];

            lessonsView = userInfo["Вид занятий"];
            lessonsView.forEach(view => {
                if (view == "Разовые") {
                    el = document.getElementById("checkSolo");
                    el.checked = true;
                }
                if (view == "Групповые") {
                    el = document.getElementById("checkGroup");
                    el.checked = true;
                }
                if (view == "Помощь с домашней работой") {
                    el = document.getElementById("checkHome");
                    el.checked = true;
                }
                if (view == "Обычные") {
                    el = document.getElementById("checkStandart");
                    el.checked = true;
                }
            });
            about = document.getElementById("about");
            about.value = userInfo["О себе"];
            selectCities = document.getElementById("selectCities");
            selectCities.value = userInfo["Город"];
        }
    }
    xhr.send();
}

function loadEditableStudent() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", '/api/getInformationAboutTeacher?token=' + _getCookie("token"), true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200 && xhr.responseText != "Error") {
            userInfo = JSON.parse(xhr.responseText);
            secondName = document.getElementById("secondName");
            secondName.value = userInfo["Фамилия"];
            firstName = document.getElementById("firstName");
            firstName.value = userInfo["Имя"];
            birthDay = document.getElementById("birthDay");
            birthDay.value = userInfo["Дата рождения"];
            classNumber = document.getElementById("classNumber");
            classNumber.value = userInfo["Класс"];
            formatLessons = userInfo["Формат занятий"];
            selectTTOS = document.getElementById("selectTTOS");
            selectSTOT = document.getElementById("selectSTOT");
            selectDistant = document.getElementById("selectDistant");
            formatLessons.forEach(form => {
                if (form == "Я к репетитору")
                    selectSTOT.checked = true;
                if (form == "Репетитор ко мне")
                    selectTTOS.checked = true;
                if (form == "Дистанционно")
                    selectDistant.checked = true;
            });
            radioMan = document.getElementById("radioMan");
            radioWoman = document.getElementById("radioWoman");
            if (userInfo["Пол"] == "М") {
                radioWoman.checked = false;
                radioMan.checked = true;
            }
            if (userInfo["Пол"] == "Ж") {
                radioMan.checked = false;
                radioWoman.checked = true;
            }
            telephone = document.getElementById("telephone");
            telephone.value = userInfo["Телефон"];
            email = document.getElementById("email");
            email.value = userInfo["Email"];

            lessons = userInfo["Изучаемые предметы"];
            lessons.forEach(lesson => {
                if (lesson == "Математика") {
                    el = document.getElementById("selectMATH");
                    el.checked = true;
                }
                if (lesson == "Русский язык") {
                    el = document.getElementById("selectRUS");
                    el.checked = true;
                }
                if (lesson == "Физика") {
                    el = document.getElementById("selectPHIS");
                    el.checked = true;
                }
                if (lesson == "Информатика") {
                    el = document.getElementById("selectINF");
                    el.checked = true;
                }
                if (lesson == "Химия") {
                    el = document.getElementById("selectCHEM");
                    el.checked = true;
                }
                if (lesson == "Биология") {
                    el = document.getElementById("selectBIO");
                    el.checked = true;
                }
                if (lesson == "История") {
                    el = document.getElementById("selectHIST");
                    el.checked = true;
                }
                if (lesson == "Обществознание") {
                    el = document.getElementById("selectSOC");
                    el.checked = true;
                }
                if (lesson == "Литература") {
                    el = document.getElementById("selectLIT");
                    el.checked = true;
                }
                if (lesson == "География") {
                    el = document.getElementById("selectGEO");
                    el.checked = true;
                }
                if (lesson == "Экономика") {
                    el = document.getElementById("selectECO");
                    el.checked = true;
                }
                if (lesson == "Английский язык") {
                    el = document.getElementById("selectENG");
                    el.checked = true;
                }
                if (lesson == "Немецкий язык") {
                    el = document.getElementById("selectNEM");
                    el.checked = true;
                }
            });
            about = document.getElementById("about");
            about.value = userInfo["О себе"];
            selectCities = document.getElementById("selectCities");
            selectCities.value = userInfo["Город"];
        }
    }
    xhr.send();
}


function _getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}