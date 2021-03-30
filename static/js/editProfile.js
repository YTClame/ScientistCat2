function saveTeacher() {
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
    about = document.getElementById("about");

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

    var sendForm = new FormData();
    imageEl = document.getElementById("photo");
    sendForm.append('token', _getCookie("token"));
    sendForm.append('photo', imageEl.files[0]);
    sendForm.append('city', selectCities.value.trim());
    sendForm.append('secondName', secondName.value.trim());
    sendForm.append('firstName', firstName.value.trim());
    sendForm.append('birth', birthDay.value.trim());
    sendForm.append('stot', stot);
    sendForm.append('ttos', ttos);
    sendForm.append('dist', dist);
    sendForm.append('edu', selectEducation.value.trim());
    sendForm.append('stash', stash.value.trim());
    sendForm.append('sex', sex);
    sendForm.append('phone', telephone.value.trim());
    sendForm.append('pass', password.value.trim());
    sendForm.append('email', email.value.trim());
    sendForm.append('math', math);
    sendForm.append('rus', rus);
    sendForm.append('phis', phis);
    sendForm.append('inf', inf);
    sendForm.append('chem', chem);
    sendForm.append('bio', bio);
    sendForm.append('hist', hist);
    sendForm.append('soc', soc);
    sendForm.append('lit', lit);
    sendForm.append('geo', geo);
    sendForm.append('eco', eco);
    sendForm.append('eng', eng);
    sendForm.append('nem', nem);
    sendForm.append('price', price.value);
    sendForm.append('solo', solo);
    sendForm.append('group', group);
    sendForm.append('home', home);
    sendForm.append('standart', standart);
    sendForm.append('about', about.value.trim());

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/saveTeacherChanges');
    xhr.onreadystatechange = function() {
        if (xhr.status == 200 && xhr.readyState == 4) {
            if (xhr.responseText == "0")
                document.location.href = "/";
            else
                alert(xhr.responseText);
        }
    };
    xhr.send(sendForm);
}

function saveStudent() {
    selectCities = document.getElementById("selectCities");
    secondName = document.getElementById("secondName");
    firstName = document.getElementById("firstName");
    birthDay = document.getElementById("birthDay");
    classNumber = document.getElementById("classNumber");
    selectTTOS = document.getElementById("selectTTOS");
    selectSTOT = document.getElementById("selectSTOT");
    selectDistant = document.getElementById("selectDistant");
    selectEducation = document.getElementById("selectEducation");
    radioMan = document.getElementById("radioMan");
    radioWoman = document.getElementById("radioWoman");
    telephone = document.getElementById("telephone");
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
    about = document.getElementById("about");

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

    if (!isEmail(email.value.trim())) {
        alert("Введите корректный email!");
        return;
    }

    if (!selectMATH.checked && !selectRUS.checked && !selectPHIS.checked && !selectINF.checked && !selectCHEM.checked && !selectBIO.checked && !selectHIST.checked && !selectSOC.checked && !selectLIT.checked && !selectGEO.checked && !selectECO.checked && !selectENG.checked && !selectNEM.checked) {
        alert("Выберите хотя бы один предмет!");
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

    var sendForm = new FormData();
    imageEl = document.getElementById("photo");
    sendForm.append('token', _getCookie("token"));
    sendForm.append('photo', imageEl.files[0]);
    sendForm.append('city', selectCities.value.trim());
    sendForm.append('secondName', secondName.value.trim());
    sendForm.append('firstName', firstName.value.trim());
    sendForm.append('birth', birthDay.value.trim());
    sendForm.append('stot', stot);
    sendForm.append('ttos', ttos);
    sendForm.append('dist', dist);
    sendForm.append('sex', sex);
    sendForm.append('phone', telephone.value.trim());
    sendForm.append('pass', password.value.trim());
    sendForm.append('email', email.value.trim());
    sendForm.append('math', math);
    sendForm.append('rus', rus);
    sendForm.append('phis', phis);
    sendForm.append('inf', inf);
    sendForm.append('chem', chem);
    sendForm.append('bio', bio);
    sendForm.append('hist', hist);
    sendForm.append('soc', soc);
    sendForm.append('lit', lit);
    sendForm.append('geo', geo);
    sendForm.append('eco', eco);
    sendForm.append('eng', eng);
    sendForm.append('nem', nem);
    sendForm.append('about', about.value.trim());
    sendForm.append('class', classNumber.value.trim());

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/saveStudentChanges');
    xhr.onreadystatechange = function() {
        if (xhr.status == 200 && xhr.readyState == 4) {
            if (xhr.responseText == "0")
                document.location.href = "/";
            else
                alert(xhr.responseText);
        }
    };
    xhr.send(sendForm);
}

function _getCookie(name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

photoLabel = document.getElementById("photoLabel");
photo = document.getElementById("photo");
photo.addEventListener("change", () => {
    var fullPath = photo.value;
    var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
    var filename = fullPath.substring(startIndex);
    if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
        filename = filename.substring(1);
    }
    photoLabel.innerHTML = "Фотография: " + filename;
});

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