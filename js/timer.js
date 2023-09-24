function Timer() {
    this.statusList = ['work', 'rest']
    this.statusNow = 0
    this.countdownDisplayObj = gById("countdownDisplay");
    this.statusDisplayObj = gById('status')
    this.statusDisplayObj.innerText = this.statusList[this.statusNow]
    this.progressBarObj = gById('progressBar')

}

Timer.prototype.switch_status = function () {
    const lenStatus = this.statusList.length
    if (this.statusNow++ >= lenStatus) {
        this.statusNow = 0
    } else {
        this.statusNow = this.statusNow++
    }
    this.statusDisplayObj.innerText = this.statusList[this.statusNow]
}
Timer.prototype.start_timer = function () {
    this.time = getLocalStorage(this.statusList[this.statusNow] + 'Time')
    this.startTimeStamp = Date.now();
    this.targetTimeStamp = this.startTimeStamp + this.time * 60 * 1000;
    this.leftTime = this.targetTimeStamp - Date.now();
    setInterval(
        () => {
            if (this.leftTime > 0) {
                this.update_countdown_display()
                this.update_progressbar_display()
            } else {
                clearInterval()
                sessionFinishSound.play()
                this.switch_status()
                this.start_timer()
            }
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

function toHMS(data) {
    let s;
    let hours = parseInt((data % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = parseInt((data % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = parseInt((data % (1000 * 60)) / 1000);
    s = (hours < 10 ? ('0' + hours) : hours) + ':' + (minutes < 10 ? ('0' + minutes) : minutes) + ':' + (seconds < 10 ? ('0' + seconds) : seconds);
    return s;
};