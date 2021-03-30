function exit() {
    document.cookie = "token=exit; max-age=-1";
    document.location.href = '/'
}