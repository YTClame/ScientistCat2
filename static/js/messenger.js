function loadContacts() {
    var xhr2 = new XMLHttpRequest();
    var body = 'token=' + _getCookie('token');
    xhr2.open("POST", '/api/loadContacts', true);
    xhr2.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr2.onreadystatechange = function() {
        if (xhr2.readyState == 4 && xhr2.status == 200) {
            if (xhr2.responseText == "Error")
                alert("Ошибка получения контактов с сервера");
            else {
                contacts = JSON.parse(xhr2.responseText);
                mobileResContacts = '';
                desktopResContacts = '';
                contacts.forEach(contact => {
                    mobileResContacts += '<div class="mobileContact"><div class="mobileContactPhoto"><img src="' +
                        contact["Фото"] + '" alt="Фото"></div><div class="mobileContactInfo"><span class="mobileContactTitle">' +
                        contact["Фамилия"] + '</span><span class="mobileContactTitle">' +
                        contact["Имя"] + '</span><span class="mobileContactTitle ';
                    if (contact["Статус"] == "Online")
                        mobileResContacts += 'green">Online';
                    if (contact["Статус"] == "Offline")
                        mobileResContacts += 'red">Offline';
                    mobileResContacts += '</span></div></div>';

                    desktopResContacts += '<div class="desktopOneContact"><div class="desktopImageDiv"><img class="desktopImage" src="' +
                        contact["Фото"] + '"></div><div class="desktopName"><span class="desktopNameSpan">' +
                        contact["Фамилия"] + '</span><span class="desktopNameSpan">' +
                        contact["Имя"] + '</span><span class="desktopStatusSpan ';
                    if (contact["Статус"] == "Online")
                        desktopResContacts += 'green">Online';
                    if (contact["Статус"] == "Offline")
                        desktopResContacts += 'red">Offline';
                    desktopResContacts += '</span></div></div>';
                });
                mobileEl = document.getElementById("mobileContacts");
                desktopEl = document.getElementById("desktopContactsDiv");
                mobileEl.innerHTML = mobileResContacts;
                desktopEl.innerHTML = desktopResContacts;
            }
        }
    }

    xhr2.send(body);
}

function _getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}