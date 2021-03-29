function showHideMenu(id) {
    ids = "menuId" + id;
    el = document.getElementById(ids);
    if (el.dataset.vis == "nonvis") {
        el.dataset.vis = "vis";
        el.style.display = "block";
    } else if (el.dataset.vis == "vis") {
        el.dataset.vis = "nonvis";
        el.style.display = "none";
    }
}