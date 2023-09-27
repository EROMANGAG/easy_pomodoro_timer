function gById(id) {
    return document.getElementById(id)
}

function setLocalStorage(key, value) {
    let storage = window.localStorage
    storage.setItem(key, value)
}

function getLocalStorage(key) {
    let storage = window.localStorage
    return storage[key]
}

function setAndStart(settingFormID) {
    const form = document.querySelector('#' + settingFormID);
    const formData = new FormData(form);
    console.log(formData)
    console.log(form)
    const restTime = formData.get('restTime');
    const workTime = formData.get('workTime');
    const soundPath = formData.get('soundPath')
    setLocalStorage('restTime', restTime);
    setLocalStorage('workTime', workTime);
    setLocalStorage('soundPath', soundPath);

    window.open("timer.html", "_blank", "toolbar=no, location=no, directories=no, status=no, menubar=yes, scrollbars=no, resizable=no, copyhistory=no, width=320, height=280");
    window.close()
}

function fillInSettings() {
    gById('workTime').value = getLocalStorage('workTime') === undefined ? 50 : getLocalStorage('workTime')
    gById('restTime').value = getLocalStorage('restTime') === undefined ? 10 : getLocalStorage('restTime')
    gById('soundPath').value = getLocalStorage('soundPath') === undefined ? "./sound/research-completed.ogg" : getLocalStorage('soundPath')
}

function hasScrollbar() {
    return document.documentElement.clientHeight < document.documentElement.offsetHeight - 4;
}