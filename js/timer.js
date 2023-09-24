function Timer() {
    this.statusList = ['work', 'rest']
    this.statusChinese = ['现在开始工作！！', '是时候放松咯！']
    this.statusNow = 0
    this.countdownDisplayObj = gById("countdownDisplay");
    this.statusDisplayObj = gById('status')
    this.statusDisplayObj.innerText = this.statusChinese[this.statusNow]
    this.progressBarObj = gById('progressBar')

}

Timer.prototype.switch_status = function () {
    const lenStatus = this.statusList.length
    if (this.statusNow++ >= lenStatus) {
        this.statusNow = 0
    } else {
        this.statusNow = this.statusNow++
    }
    this.statusDisplayObj.innerText = this.statusChinese[this.statusNow]
}
Timer.prototype.start_timer = function () {
    this.time = getLocalStorage(this.statusList[this.statusNow] + 'Time')
    this.startTimeStamp = Date.now();
    this.targetTimeStamp = this.startTimeStamp + this.time * 60 * 1000;
    this.leftTime = this.targetTimeStamp - Date.now();
    let interval = setInterval(
        () => {
            this.tictoc(interval)
        }
        , 1000)
}
Timer.prototype.update_countdown_display = function () {
    this.countdownDisplayObj.innerHTML = toHMS(this.leftTime)
    this.leftTime = this.targetTimeStamp - Date.now()
}
Timer.prototype.update_progressbar_display = function () {
    this.progressBarObj.style.width = ((this.time * 60 * 1000 - this.leftTime) / (this.time * 60 * 1000)) * 100 + '%'
}
Timer.prototype.tictoc = function (interval) {
    if (this.leftTime > 0) {
        this.update_countdown_display()
        this.update_progressbar_display()
    } else {
        clearInterval(interval)
        sessionFinishSound.play()
        this.switch_status()
        this.start_timer()
    }
}

function toHMS(data) {
    let s;
    let hours = parseInt((data % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = parseInt((data % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = parseInt((data % (1000 * 60)) / 1000);
    s = (hours < 10 ? ('0' + hours) : hours) + ':' + (minutes < 10 ? ('0' + minutes) : minutes) + ':' + (seconds < 10 ? ('0' + seconds) : seconds);
    return s;
};