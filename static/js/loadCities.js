function loadCities() {
    selectCities = document.getElementById("selectCities");
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/api/getCityNames', true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            res = "";
            gettedCities = JSON.parse(xhr.responseText);
            gettedCities.forEach(city => {
                res += "<option>" + city["Name"] + "</option>\n"
            });
            selectCities.innerHTML = res;
        }
    }
    xhr.send();
}