var messageDesk = document.getElementById("desktopTextarea");
var messageMob = document.getElementById("mobileInputTextarea");

messageDesk.addEventListener('input', () => {
    messageMob.value = messageDesk.value;
})
messageMob.addEventListener('input', () => {
    messageDesk.value = messageMob.value;
})