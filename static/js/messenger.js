function loadContacts() {
    var xhr2 = new XMLHttpRequest();
    var body = 'token=' + _getCookie('token');
    xhr2.open("POST", '/api/loadContacts', true);
    xhr2.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    var secondUserId = _getSecondUserId();
    xhr2.onreadystatechange = function() {
        if (xhr2.readyState == 4 && xhr2.status == 200) {
            if (xhr2.responseText == "Error")
                alert("Ошибка получения контактов с сервера");
            else {
                contacts = JSON.parse(xhr2.responseText);
                mobileResContacts = '';
                desktopResContacts = '';
                contacts.forEach(contact => {
                    mobileResContacts += '<div class="mobileContact" ' + ' onclick="document.location.href=\'/messenger?userId=' + contact['ID'] + '\';">' + '<div class="mobileContactPhoto"><img src="' +
                        contact["Фото"] + '" alt="Фото"></div><div class="mobileContactInfo"><span class="mobileContactTitle">' +
                        contact["Фамилия"] + '</span><span class="mobileContactTitle">' +
                        contact["Имя"] + '</span><span class="mobileContactTitle ';
                    if (contact["Статус"] == "Online")
                        mobileResContacts += 'green">Online';
                    if (contact["Статус"] == "Offline")
                        mobileResContacts += 'red">Offline';
                    mobileResContacts += '</span></div></div>';

                    if (contact["ID"] == secondUserId)
                        desktopResContacts += '<div class="desktopOneContact desktopChoice" data-userId="' + contact['ID'] + '">';
                    else
                        desktopResContacts += '<div class="desktopOneContact" data-userId="' + contact['ID'] + '" onclick="document.location.href = \'/messenger?userId=' + contact['ID'] + '\'">';
                    desktopResContacts += '<div class="desktopImageDiv"><img class="desktopImage" src="' +
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

messages_count = 0;
mobile_name = '';

function _loadMessagesAjax() {
    if (isNaN(_getSecondUserId()))
        return;
    var xhr4 = new XMLHttpRequest();
    var body = 'token=' + _getCookie('token') + '&id=' + _getSecondUserId();
    xhr4.open("POST", '/api/loadMessages', true);
    xhr4.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    var secondUserId = _getSecondUserId();
    var res;
    var messages = [];
    xhr4.onreadystatechange = function() {
        if (xhr4.readyState == 4 && xhr4.status == 200) {
            try {
                res = JSON.parse(xhr4.responseText);
                messages = res['Messages'];
                mobile_name = res['MobileName']
            } catch {
                alert("Ошибка загрузки сообщений");
                return;
            }
            mobileMessagesRes = '';
            desktopMessagesRes = '';
            messages.forEach(message => {
                if (message["Отправитель"] == _getSecondUserId()) {
                    //Полученное сообщение
                    mobileMessagesRes += '<div class="mobileGetMessageDiv"><span class="mobileGetMessageSpan">' +
                        message["Сообщение"] + '</span></div>';

                    desktopMessagesRes += '<div class="desktopMessageGetDiv"><span class="desktopMessageGetSpan">' +
                        message["Сообщение"] + '</span></div>';
                } else {
                    //Отправленное сообщение
                    mobileMessagesRes += '<div class="mobileSendMessageDiv"><span class="mobileSendMessageSpan">' +
                        message["Сообщение"] + '</span></div>';

                    desktopMessagesRes += '<div class="desktopMessageSendDiv"><span class="desktopMessageSendSpan">' +
                        message["Сообщение"] + '</span></div>';
                }
            });
            mobileMessengerEl = document.getElementById("mobileMessages");
            desktopMessengerEl = document.getElementById("desktopMessages");
            mobileMessengerEl.innerHTML = mobileMessagesRes;
            desktopMessengerEl.innerHTML = desktopMessagesRes;
            messages_count = messages.length;
            var mobileNameElem = document.getElementById("mobileSenderNameSpan");
            mobileNameElem.innerHTML = mobile_name;
            var messengerElemForScrolling = document.getElementById("desktopMessages");
            messengerElemForScrolling.scrollTop = messengerElemForScrolling.scrollHeight;
            var messengerElemForScrolling = document.getElementById("mobileMessages");
            messengerElemForScrolling.scrollTop = messengerElemForScrolling.scrollHeight;
        }
    }
    xhr4.send(body);
}

function _checkSizeAndLoadMessages() {
    if (isNaN(_getSecondUserId()))
        return;
    var xhr5 = new XMLHttpRequest();
    var body = 'token=' + _getCookie('token') + '&id=' + _getSecondUserId();
    xhr5.open("POST", '/api/getMessagesSize', true);
    xhr5.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    var secondUserId = _getSecondUserId();
    var messages = []
    xhr5.onreadystatechange = function() {
        if (xhr5.readyState == 4 && xhr5.status == 200) {
            if (xhr5.responseText != messages_count.toString())
                _loadMessagesAjax();
        }
    }
    xhr5.send(body);
}

function loadMessages() {
    _loadMessagesAjax();
    setInterval(() => _checkSizeAndLoadMessages(), 4000);
}

function sendMessage() {
    var message = document.getElementById("desktopTextarea").value.trim();
    if (message.length < 1) {
        alert("Введите сообщение!");
        return;
    }
    var id = _getSecondUserId();
    var token = _getCookie("token");
    var xhr3 = new XMLHttpRequest();
    var body = 'token=' + token +
        '&id=' + id +
        '&message=' + encodeURIComponent(message);
    xhr3.open("POST", '/api/sendMessage', true);
    xhr3.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    var secondUserId = _getSecondUserId();
    xhr3.onreadystatechange = function() {
        if (xhr3.readyState == 4 && xhr3.status == 200 && xhr3.responseText == "OK") {
            messages_count++;
            var textAreaElem = document.getElementById("desktopTextarea");
            var mobileMessengerEl = document.getElementById("mobileMessages");
            var desktopMessengerEl = document.getElementById("desktopMessages");
            var mobileMessagesRes = mobileMessengerEl.innerHTML;
            var desktopMessagesRes = desktopMessengerEl.innerHTML;
            mobileMessagesRes += '<div class="mobileSendMessageDiv"><span class="mobileSendMessageSpan">' +
                textAreaElem.value.trim() + '</span></div>';
            desktopMessagesRes += '<div class="desktopMessageSendDiv"><span class="desktopMessageSendSpan">' +
                textAreaElem.value.trim() + '</span></div>';
            mobileMessengerEl.innerHTML = mobileMessagesRes;
            desktopMessengerEl.innerHTML = desktopMessagesRes;
            document.getElementById("desktopTextarea").value = "";
            document.getElementById("mobileInputTextarea").value = "";
            var messengerElemForScrolling = document.getElementById("desktopMessages");
            messengerElemForScrolling.scrollTop = messengerElemForScrolling.scrollHeight;
            var messengerElemForScrolling = document.getElementById("mobileMessages");
            messengerElemForScrolling.scrollTop = messengerElemForScrolling.scrollHeight;
        }
    }
    xhr3.send(body);
}

function _getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function _getSecondUserId() {
    var href = window.location.href;
    href = href.split('=')
    var id = href[1];
    return parseInt(id);
}

window.addEventListener(`resize`, event => {
    changeMobileView();
}, false);

function changeMobileView() {
    var mobileContacts = document.getElementById("mobileContacts");
    var mobileMessages = document.getElementById("mobileMessenger");
    if (screen.width <= 766) {
        if (window.location.href.split("?").length == 1) {
            //Открыта вкладка без выбранного контакта
            mobileContacts.style.display = "block";
            mobileMessages.style.display = "none";
        } else {
            //Выбран какой-то контакт
            mobileContacts.style.display = "none";
            mobileMessages.style.display = "block";
        }
    } else {
        mobileContacts.style.display = "none";
        mobileMessages.style.display = "none";
    }
}