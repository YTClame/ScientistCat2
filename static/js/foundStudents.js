function foundStudent() {
    checkboxSTOT = document.getElementById("checkboxSTOTdesktopFS");
    checkboxTTOS = document.getElementById("checkboxTTOSdesktopFS");
    checkboxDistant = document.getElementById("checkboxDistantDesktopFS");
    selectMinClass = document.getElementById("selectMinClassdesktopFS");
    selectMaxClass = document.getElementById("selectMaxClassdesktopFS");
    radioMAN = document.getElementById("radioMANdesktopFS");
    radioWOMAN = document.getElementById("radioWOMANdesktopFS");
    radioALL = document.getElementById("radioALLdesktopFS");
    checkboxMATAN = document.getElementById("checkboxMATANdesktopFS");
    checkboxRUS = document.getElementById("checkboxRUSdesktopFS");
    checkboxPHIS = document.getElementById("checkboxPHISdesktopFS");
    checkboxINF = document.getElementById("checkboxINFdesktopFS");
    checkboxCHEM = document.getElementById("checkboxCHEMdesktopFS");
    checkboxBIO = document.getElementById("checkboxBIOdesktopFS");
    checkboxHIST = document.getElementById("checkboxHISTdesktopFS");
    checkboxSOC = document.getElementById("checkboxSOCdesktopFS");
    checkboxLIT = document.getElementById("checkboxLITdesktopFS");
    checkboxGEO = document.getElementById("checkboxGEOdesktopFS");
    checkboxECO = document.getElementById("checkboxECOdesktopFS");
    checkboxENG = document.getElementById("checkboxENGdesktopFS");
    checkboxNEM = document.getElementById("checkboxNEMdesktopFS");

    stot = '0';
    if (checkboxSTOT.checked)
        stot = '1';

    ttos = '0';
    if (checkboxTTOS.checked)
        ttos = '1';

    dist = '0';
    if (checkboxDistant.checked)
        dist = '1';

    minclass = selectMinClass.value;
    maxclass = selectMaxClass.value;

    sex = '';
    if (radioMAN.checked)
        sex = 'm';
    if (radioWOMAN.checked)
        sex = 'w';
    if (radioALL.checked)
        sex = 'a';

    math = '0';
    if (checkboxMATAN.checked)
        math = '1';

    rus = '0';
    if (checkboxRUS.checked)
        rus = '1';

    phis = '0';
    if (checkboxPHIS.checked)
        phis = '1';

    inf = '0';
    if (checkboxINF.checked)
        inf = '1';

    chem = '0';
    if (checkboxCHEM.checked)
        chem = '1';

    bio = '0';
    if (checkboxBIO.checked)
        bio = '1';

    hist = '0';
    if (checkboxHIST.checked)
        hist = '1';

    soc = '0';
    if (checkboxSOC.checked)
        soc = '1';

    lit = '0';
    if (checkboxLIT.checked)
        lit = '1';

    geo = '0';
    if (checkboxGEO.checked)
        geo = '1';

    eco = '0';
    if (checkboxECO.checked)
        eco = '1';

    eng = '0';
    if (checkboxENG.checked)
        eng = '1';

    nem = '0';
    if (checkboxNEM.checked)
        nem = '1';


    token = _getCookie("token");
    body = 'stot=' + stot +
        '&ttos=' + ttos +
        '&dist=' + dist +
        '&minClass=' + minclass +
        '&maxClass=' + maxclass +
        '&sex=' + sex +
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
        '&token=' + token;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", '/api/foundStudent', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            mobileRes = ''
            desktopRes = ''
            usersInfo = '';
            try {
                usersInfo = JSON.parse(xhr.responseText);
            } catch {
                alert(xhr.responseText);
                return;
            }
            usersInfo.forEach(user => {
                desktopRes += '<div class="deskRes"><a href="/user/' + user["ID"] + '"><div class="mobileResultImg"><img src="' +
                    user["Фото"] + '" alt="Фотография"></div><div class="mobileResultInfo"><span class="valueText">Фамилия: ' +
                    user["Фамилия"] + '</span><span class="valueText">Имя: ' +
                    user["Имя"] + '</span><span class="valueText">Класс: ' +
                    user["Класс"] + '</span></div></a></div>';

                mobileRes += '<div class="mobileResult"><a href="/user/' + user["ID"] + '"><div class="mobileResultImg"><img src="' +
                    user["Фото"] + '" alt="Фотография"></div><div class="mobileResultInfo"><span class="valueText">' +
                    user["Фамилия"] + '</span><span class="valueText">' +
                    user["Имя"] + '</span><span class="valueText">' +
                    user["Класс"] + ' класс</span></div></a></div>';
            });
            mob = document.getElementById("mobileContext");
            desk = document.getElementById("desktopResults");
            mob.innerHTML = mobileRes;
            desk.innerHTML = desktopRes;
        }
    }
    xhr.send(body);
}

function _getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}