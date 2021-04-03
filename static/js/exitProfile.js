function exit() {
    document.cookie = "token=exit; path=/; max-age=-1";
    document.location.href = '/'
}