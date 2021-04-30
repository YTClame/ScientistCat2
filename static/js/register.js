function _continueRegisterStudent() {
    selectCities = document.getElementById("selectCities");
    secondName = document.getElementById("secondName");
    firstName = document.getElementById("firstName");
    birthDay = document.getElementById("birthDay");
    classNumber = document.getElementById("classNumber");
    selectSTOT = document.getElementById("selectSTOT");
    selectTTOS = document.getElementById("selectTTOS");
    selectDistant = document.getElementById("selectDistant");
    radioMan = document.getElementById("radioMan");
    radioWoman = document.getElementById("radioWoman");
    telephone = document.getElementById("telephone");
    login = document.getElementById("login");
    password = document.getElementById("password");
    email = document.getElementById("email");
    selectMATH = document.getElementById("selectMATH");
    selectRUS = document.getElementById("selectRUS");
    selectPHIS = document.getElementById("selectPHIS");
    selectINF = document.getElementById("selectINF");
    selectCHEM = document.getElementById("selectCHEM");
    selectBIO = document.getElementById("selectBIO");
    selectHIST = document.getElementById("selectHIST");
    selectSOC = document.getElementById("selectSOC");
    selectLIT = document.getElementById("selectLIT");
    selectGEO = document.getElementById("selectGEO");
    selectECO = document.getElementById("selectECO");
    selectENG = document.getElementById("selectENG");
    selectNEM = document.getElementById("selectNEM");

    if (!secondName.value.trim()) {
        alert("Введите фамилию!");
        return;
    }

    if (!firstName.value.trim()) {
        alert("Введите имя!");
        return;
    }

    if (!birthDay.value.trim() || !checkDate(birthDay.value.trim())) {
        alert("Введите корректную дату рождения!");
        return;
    }

    if (!selectTTOS.checked && !selectSTOT.checked && !selectDistant.checked) {
        alert("Выберите хотя бы один формат занятий!");
        return;
    }

    if (!isPhoneNumber(telephone.value.trim())) {
        alert("Введите корректный номер телефона!");
        return;
    }

    if (!login.value.trim()) {
        alert("Введите логин!");
        return;
    }

    if (!password.value.trim()) {
        alert("Введите пароль!");
        return;
    }

    if (!isEmail(email.value.trim())) {
        alert("Введите корректный email!");
        return;
    }

    if (!selectMATH.checked && !selectRUS.checked && !selectPHIS.checked && !selectINF.checked && !selectCHEM.checked && !selectBIO.checked && !selectHIST.checked && !selectSOC.checked && !selectLIT.checked && !selectGEO.checked && !selectECO.checked && !selectENG.checked && !selectNEM.checked) {
        alert("Выберите хотя бы один предмет!");
        return;
    }


    var xhr = new XMLHttpRequest();
    stot = '0';
    if (selectSTOT.checked)
        stot = '1';
    ttos = '0';
    if (selectTTOS.checked)
        ttos = '1';
    dist = '0';
    if (selectDistant.checked)
        dist = '1';

    sex = "m";
    if (radioWoman.checked)
        sex = "w";

    math = '0';
    if (selectMATH.checked)
        math = '1';

    rus = '0';
    if (selectRUS.checked)
        rus = '1';

    phis = '0';
    if (selectPHIS.checked)
        phis = '1';

    inf = '0';
    if (selectINF.checked)
        inf = '1';

    chem = '0';
    if (selectCHEM.checked)
        chem = '1';

    bio = '0';
    if (selectBIO.checked)
        bio = '1';

    hist = '0';
    if (selectHIST.checked)
        hist = '1';

    soc = '0';
    if (selectSOC.checked)
        soc = '1';

    lit = '0';
    if (selectLIT.checked)
        lit = '1';

    geo = '0';
    if (selectGEO.checked)
        geo = '1';

    eco = '0';
    if (selectECO.checked)
        eco = '1';

    eng = '0';
    if (selectENG.checked)
        eng = '1';

    nem = '0';
    if (selectNEM.checked)
        nem = '1';


    var body = 'city=' + encodeURIComponent(selectCities.value.trim()) +
        '&secondName=' + encodeURIComponent(secondName.value.trim()) +
        '&firstName=' + encodeURIComponent(firstName.value.trim()) +
        '&birth=' + encodeURIComponent(birthDay.value.trim()) +
        '&class=' + encodeURIComponent(classNumber.value.trim()) +
        '&stot=' + stot +
        '&ttos=' + ttos +
        '&dist=' + dist +
        '&sex=' + sex +
        '&phone=' + encodeURIComponent(telephone.value.trim()) +
        '&login=' + encodeURIComponent(login.value.trim()) +
        '&pass=' + encodeURIComponent(password.value.trim()) +
        '&email=' + encodeURIComponent(email.value.trim()) +
        '&math=' + math +
        '&rus=' + rus +
        '&phis=' + phis +
        '&inf=' + inf +
        '&chem=' + chem +
        '&bio=' + bio +
        '&hist=' + hist +
        '&soc=' + soc +
        '&lit=' + lit +
        '&geo=' + geo +
        '&eco=' + eco +
        '&eng=' + eng +
        '&nem=' + nem;

    var xhr2 = new XMLHttpRequest();
    xhr2.open("POST", '/api/registerStudent', true);
    xhr2.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr2.onreadystatechange = function() {
        if (xhr2.readyState == 4 && xhr2.status == 200)
            _lastRegistrationStep(xhr2.responseText);
    }

    xhr2.send(body);
}

function registerTeacher() {
    selectCities = document.getElementById("selectCities");
    isGoodCity = false;
    var xhr4 = new XMLHttpRequest();
    xhr4.open('GET', '/api/getCityNames', true);
    xhr4.onreadystatechange = function() {
        if (xhr4.readyState == 4 && xhr4.status == 200) {
            gettedCities = JSON.parse(xhr4.responseText);
            gettedCities.forEach(city => {
                if (city["Name"] == selectCities.value) {
                    isGoodCity = true;
                    _continueRegisterTeacher();
                    return;
                }
                if (!isGoodCity) {
                    alert("Указан неверный город!");
                    return;
                }
            });
        }
    }
    xhr4.send();
}

function registerStudent() {
    selectCities = document.getElementById("selectCities");
    isGoodCity = false;
    var xhr5 = new XMLHttpRequest();
    xhr5.open('GET', '/api/getCityNames', true);
    xhr5.onreadystatechange = function() {
        if (xhr5.readyState == 4 && xhr5.status == 200) {
            gettedCities = JSON.parse(xhr5.responseText);
            gettedCities.forEach(city => {
                if (city["Name"] == selectCities.value) {
                    isGoodCity = true;
                    _continueRegisterStudent();
                    return;
                }
                if (!isGoodCity) {
                    alert("Указан неверный город!");
                    return;
                }
            });
        }
    }
    xhr5.send();
}

function _continueRegisterTeacher() {
    selectCities = document.getElementById("selectCities");
    secondName = document.getElementById("secondName");
    firstName = document.getElementById("firstName");
    birthDay = document.getElementById("birthDay");
    selectTTOS = document.getElementById("selectTTOS");
    selectSTOT = document.getElementById("selectSTOT");
    selectDistant = document.getElementById("selectDistant");
    selectEducation = document.getElementById("selectEducation");
    stash = document.getElementById("stash");
    radioMan = document.getElementById("radioMan");
    radioWoman = document.getElementById("radioWoman");
    telephone = document.getElementById("telephone");
    login = document.getElementById("login");
    password = document.getElementById("password");
    email = document.getElementById("email");
    selectMATH = document.getElementById("selectMATH");
    selectRUS = document.getElementById("selectRUS");
    selectPHIS = document.getElementById("selectPHIS");
    selectINF = document.getElementById("selectINF");
    selectCHEM = document.getElementById("selectCHEM");
    selectBIO = document.getElementById("selectBIO");
    selectHIST = document.getElementById("selectHIST");
    selectSOC = document.getElementById("selectSOC");
    selectLIT = document.getElementById("selectLIT");
    selectGEO = document.getElementById("selectGEO");
    selectECO = document.getElementById("selectECO");
    selectENG = document.getElementById("selectENG");
    selectNEM = document.getElementById("selectNEM");
    price = document.getElementById("price");
    checkSolo = document.getElementById("checkSolo");
    checkGroup = document.getElementById("checkGroup");
    checkHome = document.getElementById("checkHome");
    checkStandart = document.getElementById("checkStandart");

    if (!secondName.value.trim()) {
        alert("Введите фамилию!");
        return;
    }

    if (!firstName.value.trim()) {
        alert("Введите имя!");
        return;
    }

    if (!birthDay.value.trim() || !checkDate(birthDay.value.trim())) {
        alert("Введите корректную дату рождения!");
        return;
    }

    if (!selectTTOS.checked && !selectSTOT.checked && !selectDistant.checked) {
        alert("Выберите хотя бы один формат занятий!");
        return;
    }

    if (!isInteger(stash.value.trim())) {
        alert("Введите корректный стаж!");
        return;
    }

    if (!isPhoneNumber(telephone.value.trim())) {
        alert("Введите корректный номер телефона!");
        return;
    }

    if (!login.value.trim()) {
        alert("Введите логин!");
        return;
    }

    if (!password.value.trim()) {
        alert("Введите пароль!");
        return;
    }

    if (!isEmail(email.value.trim())) {
        alert("Введите корректный email!");
        return;
    }

    if (!selectMATH.checked && !selectRUS.checked && !selectPHIS.checked && !selectINF.checked && !selectCHEM.checked && !selectBIO.checked && !selectHIST.checked && !selectSOC.checked && !selectLIT.checked && !selectGEO.checked && !selectECO.checked && !selectENG.checked && !selectNEM.checked) {
        alert("Выберите хотя бы один предмет!");
        return;
    }

    if (!isInteger(price.value.trim())) {
        alert("Введите корректуню ставку!");
        return;
    }

    if (!checkGroup.checked && !checkHome.checked && !checkStandart.checked && !checkSolo.checked) {
        alert("Выберите хотя бы один вид занятий!");
        return;
    }


    stot = '0';
    if (selectSTOT.checked)
        stot = '1';
    ttos = '0';
    if (selectTTOS.checked)
        ttos = '1';
    dist = '0';
    if (selectDistant.checked)
        dist = '1';
    solo = '0';
    if (checkSolo.checked)
        solo = '1';
    group = '0';
    if (checkGroup.checked)
        group = '1';
    home = '0';
    if (checkHome.checked)
        home = '1';
    standart = '0';
    if (checkStandart.checked)
        standart = '1';
    sex = "m";
    if (radioWoman.checked)
        sex = "w";

    math = '0';
    if (selectMATH.checked)
        math = '1';

    rus = '0';
    if (selectRUS.checked)
        rus = '1';

    phis = '0';
    if (selectPHIS.checked)
        phis = '1';

    inf = '0';
    if (selectINF.checked)
        inf = '1';

    chem = '0';
    if (selectCHEM.checked)
        chem = '1';

    bio = '0';
    if (selectBIO.checked)
        bio = '1';

    hist = '0';
    if (selectHIST.checked)
        hist = '1';

    soc = '0';
    if (selectSOC.checked)
        soc = '1';

    lit = '0';
    if (selectLIT.checked)
        lit = '1';

    geo = '0';
    if (selectGEO.checked)
        geo = '1';

    eco = '0';
    if (selectECO.checked)
        eco = '1';

    eng = '0';
    if (selectENG.checked)
        eng = '1';

    nem = '0';
    if (selectNEM.checked)
        nem = '1';

    var body = 'city=' + encodeURIComponent(selectCities.value.trim()) +
        '&secondName=' + encodeURIComponent(secondName.value.trim()) +
        '&firstName=' + encodeURIComponent(firstName.value.trim()) +
        '&birth=' + encodeURIComponent(birthDay.value.trim()) +
        '&stot=' + stot +
        '&ttos=' + ttos +
        '&dist=' + dist +
        '&edu=' + encodeURIComponent(selectEducation.value.trim()) +
        '&stash=' + encodeURIComponent(stash.value.trim()) +
        '&sex=' + sex +
        '&phone=' + encodeURIComponent(telephone.value.trim()) +
        '&login=' + encodeURIComponent(login.value.trim()) +
        '&pass=' + encodeURIComponent(password.value.trim()) +
        '&email=' + encodeURIComponent(email.value.trim()) +
        '&math=' + math +
        '&rus=' + rus +
        '&phis=' + phis +
        '&inf=' + inf +
        '&chem=' + chem +
        '&bio=' + bio +
        '&hist=' + hist +
        '&soc=' + soc +
        '&lit=' + lit +
        '&geo=' + geo +
        '&eco=' + eco +
        '&eng=' + eng +
        '&nem=' + nem +
        '&price=' + price.value +
        '&solo=' + solo +
        '&group=' + group +
        '&home=' + home +
        '&standart=' + standart;

    var xhr3 = new XMLHttpRequest();
    xhr3.open("POST", '/api/registerTeacher', true);
    xhr3.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr3.onreadystatechange = function() {
        if (xhr3.readyState == 4 && xhr3.status == 200)
            _lastRegistrationStep(xhr3.responseText);
    }

    xhr3.send(body);
}

function checkDate(date) {
    var arrayOfStrings = date.split(".");
    if (arrayOfStrings.length != 3)
        return false;
    res = arrayOfStrings[2] + "-" + arrayOfStrings[1] + "-" + arrayOfStrings[0] + "T11:11:11Z";
    const dateFormat = Date.parse(res)
    if (dateFormat > 0)
        return true
    else
        return false
}

function isInteger(num) {
    n = parseInt(num);
    return (n ^ 0) === n;
}

function isPhoneNumber(number) {
    var reg = /^[+]{1}[7][0-9]{10}$/;
    return reg.test(number);
}

function isEmail(email) {
    var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(email);
}

function _lastRegistrationStep(serverResponseText) {
    if (serverResponseText.substring(0, 7) == "token: ") {
        document.cookie = "token=" + serverResponseText.substring(7) + "; max-age=315360000000";
        document.location.href = '/profile'
        return;
    }
    alert(serverResponseText);
}