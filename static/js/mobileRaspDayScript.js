function setRaspDay(day) {
    day1 = document.getElementById("mobileDay1");
    day2 = document.getElementById("mobileDay2");
    day3 = document.getElementById("mobileDay3");
    day4 = document.getElementById("mobileDay4");
    day5 = document.getElementById("mobileDay5");
    day6 = document.getElementById("mobileDay6");
    day7 = document.getElementById("mobileDay7");
    nameDay = document.getElementById("mobileNameOfDay");
    disableAll();
    if (day == 1) {
        day1.classList.add("choice");
        nameDay.innerHTML = "Понедельник";
    }
    if (day == 2) {
        day2.classList.add("choice");
        nameDay.innerHTML = "Вторник";
    }
    if (day == 3) {
        day3.classList.add("choice");
        nameDay.innerHTML = "Среда";
    }
    if (day == 4) {
        day4.classList.add("choice");
        nameDay.innerHTML = "Четверг";
    }
    if (day == 5) {
        day5.classList.add("choice");
        nameDay.innerHTML = "Пятница";
    }
    if (day == 6) {
        day6.classList.add("choice");
        nameDay.innerHTML = "Суббота";
    }
    if (day == 7) {
        day7.classList.add("choice");
        nameDay.innerHTML = "Воскресенье";
    }
    showHideMenu(4);
}

function disableAll() {
    day1.classList.remove("choice");
    day2.classList.remove("choice");
    day3.classList.remove("choice");
    day4.classList.remove("choice");
    day5.classList.remove("choice");
    day6.classList.remove("choice");
    day7.classList.remove("choice");
}