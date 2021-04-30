function foundTeacher() {
    checkboxSTOT = document.getElementById("checkboxSTOTdesktopFT");
    checkboxTTOS = document.getElementById("checkboxTTOSdesktopFT");
    checkboxDistant = document.getElementById("checkboxDistantDesktopFT");
    minStashEl = document.getElementById("inputMinStashdesktopFT");
    maxStashEl = document.getElementById("inputMaxStashdesktopFT");
    radioMAN = document.getElementById("radioMANdesktopFT");
    radioWOMAN = document.getElementById("radioWOMANdesktopFT");
    radioALL = document.getElementById("radioALLdesktopFT");
    checkboxMATAN = document.getElementById("checkboxMATANdesktopFT");
    checkboxRUS = document.getElementById("checkboxRUSdesktopFT");
    checkboxPHIS = document.getElementById("checkboxPHISdesktopFT");
    checkboxINF = document.getElementById("checkboxINFdesktopFT");
    checkboxCHEM = document.getElementById("checkboxCHEMdesktopFT");
    checkboxBIO = document.getElementById("checkboxBIOdesktopFT");
    checkboxHIST = document.getElementById("checkboxHISTdesktopFT");
    checkboxSOC = document.getElementById("checkboxSOCdesktopFT");
    checkboxLIT = document.getElementById("checkboxLITdesktopFT");
    checkboxGEO = document.getElementById("checkboxGEOdesktopFT");
    checkboxECO = document.getElementById("checkboxECOdesktopFT");
    checkboxENG = document.getElementById("checkboxENGdesktopFT");
    checkboxNEM = document.getElementById("checkboxNEMdesktopFT");
    minPriceEl = document.getElementById("inputMinStavkadesktopFT");
    maxPriceEl = document.getElementById("inputMaxStavkadesktopFT");
    edStud = document.getElementById("checkboxSTUDENTdesktopFT");
    edAspir = document.getElementById("checkboxASPIRdesktopFT");
    edTeacher = document.getElementById("checkboxTEACHERdesktopFT");
    edPrepod = document.getElementById("checkboxPREPODdesktopFT");

    stot = '0';
    if (checkboxSTOT.checked)
        stot = '1';

    ttos = '0';
    if (checkboxTTOS.checked)
        ttos = '1';

    dist = '0';
    if (checkboxDistant.checked)
        dist = '1';

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

    minStash = minStashEl.value;
    maxStash = maxStashEl.value;
    minPrice = minPriceEl.value;
    maxPrice = maxPriceEl.value;

    edS = '0';
    if (edStud.checked)
        edS = '1';

    edA = '0';
    if (edAspir.checked)
        edA = '1';

    edT = '0';
    if (edTeacher.checked)
        edT = '1';

    edP = '0';
    if (edPrepod.checked)
        edP = '1';

    token = _getCookie("token");
    body = 'stot=' + stot +
        '&ttos=' + ttos +
        '&dist=' + dist +
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
        '&minS=' + minStash +
        '&maxS=' + maxStash +
        '&minP=' + minPrice +
        '&maxP=' + maxPrice +
        '&edS=' + edS +
        '&edA=' + edA +
        '&edT=' + edT +
        '&edP=' + edP +
        '&token=' + token;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", '/api/foundTeacher', true);
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
                mobileRes += '<div class="mobileResult"><a href="/user/' + user['ID'] + '"><div class="mobileResultImg"><img src="' +
                    user["Фото"] + '" alt="Фотография"></div><div class="mobileResultInfo"><span class="valueText">' +
                    user["Фамилия"] + '</span><span class="valueText">' +
                    user['Имя'] + '</span><span class="valueText">' +
                    user['Образование'] + '</span><span class="valueText">Стаж: ' +
                    user["Стаж"] + '</span><span class="valueText">Ставка: ' +
                    user['Ставка'] + '</span></div></a></div>';

                desktopRes += '<div class="deskRes"><a href="/user/' + user["ID"] + '"><div class="mobileResultImg"><img src="' +
                    user["Фото"] + '" alt="Фотография"></div><div class="mobileResultInfo"><span class="valueText">Фамилия: ' +
                    user["Фамилия"] + '</span><span class="valueText">Имя: ' +
                    user["Имя"] + '</span><span class="valueText">Образование: ' +
                    user["Образование"] + '</span><span class="valueText">Стаж: ' +
                    user['Стаж'] + '</span><span class="valueText">Ставка: ' +
                    user['Ставка'] + '</span></div></a></div>';
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