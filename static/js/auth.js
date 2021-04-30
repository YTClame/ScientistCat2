function auth() {
    loginEL = document.getElementById("login");
    passwordEL = document.getElementById("password");


    if (!loginEL.value.trim()) {
        alert("Введите логин!");
        return;
    }
    if (!passwordEL.value.trim()) {
        alert("Введите пароль!");
        return;
    }

    var body = 'login=' + encodeURIComponent(loginEL.value.trim()) +
        '&password=' + encodeURIComponent(passwordEL.value.trim());

    var xhr = new XMLHttpRequest();
    xhr.open("POST", '/api/login', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            if (xhr.responseText == "Error") {
                alert("Ошибка ввода! Пользователь не найден!");
                return;
            } else {
                let loginObject = JSON.parse(xhr.responseText);
                document.cookie = "token=" + loginObject["Токен"] + "; max-age=315360000000";
                if (loginObject["Роль"] == "Пользователь")
                    document.location.href = '/profile'
                else if (loginObject["Роль"] == "Админ")
                    document.location.href = '/admin'
            }
        }
    }
    xhr.send(body);
}