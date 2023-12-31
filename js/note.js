function Note() {
    if (getLocalStorage('noteCount') === undefined) {
        setLocalStorage('noteCount', 0)
    }
    if (getLocalStorage('noteData') === undefined) {
        setLocalStorage('noteData', '{}')
    }
    this.noteTitleObj = gById('noteTitle')
    this.noteListOLObj = gById('noteListOL')
    this.noteListDoneObj = gById('noteListDone')
}

Note.prototype.addNote = function () {
    let noteID = getLocalStorage('noteCount') * 1 + 1
    setLocalStorage('noteCount', noteID)
    const title = this.noteTitleObj.value
    const startTimestamp = Date.now()
    let noteData = JSON.parse(getLocalStorage('noteData'))
    noteData[noteID] = {
        title: title,
        timestamp: startTimestamp,
        isDone: false
    }
    setLocalStorage('noteData', JSON.stringify(noteData))
    this.flushList()
    //判断是否超过夜眠长度
    if (hasScrollbar()) {
        window.resizeTo(document.body.clientWidth + 30, document.documentElement.offsetHeight + 40)
    }
}
Note.prototype.delNote = function (id) {
    let noteData = JSON.parse(getLocalStorage('noteData'))
    delete noteData[id]
    setLocalStorage('noteData', JSON.stringify(noteData))
    this.flushList()
}

Note.prototype.listModule = function (id, noteData) {
    const title = noteData.title
    const timestamp = noteData.timestamp
    let divBtnG = document.createElement('div')
    divBtnG.setAttribute('id', 'note-' + id)
    divBtnG.setAttribute('class', 'list-group-item list-group-item-action d-flex justify-content-between align-items-center p-1')
    let div = document.createElement('div')
    div.setAttribute('class', 'ms-2 me-auto')
    let spanTitle = document.createElement('span')
    spanTitle.setAttribute('class', 'fw-bold')
    spanTitle.innerText = title
    let spanTime = document.createElement('span')
    spanTime.setAttribute('class', 'ms-1 text-secondary fw-light')
    spanTime.setAttribute('id', 'note-timer-' + id)
    let timer = setInterval(() => {
        spanTime.innerText = toHMS(Date.now() - timestamp)
    }, 1000)
    let delBtn = document.createElement('button')
    delBtn.setAttribute('class', 'btn btn-danger btn-sm')
    delBtn.innerHTML = '×'
    delBtn.addEventListener('click', () => {
        this.delNote(id)
    })
    div.appendChild(spanTitle)
    div.appendChild(spanTime)
    divBtnG.appendChild(div)
    divBtnG.appendChild(delBtn)
    divBtnG.addEventListener('click', () => {
        const noteDataNew = JSON.parse(getLocalStorage('noteData'))
        const isDone = noteDataNew[id].isDone
        if (!isDone) {
            this.noteListDoneObj.appendChild(divBtnG)
            clearInterval(timer)
        } else {
            this.noteListOLObj.appendChild(divBtnG)
            timer = setInterval(() => {
                spanTime.innerText = toHMS(Date.now() - timestamp)
            }, 1000)
        }
        noteDataNew[id].isDone = !isDone
        setLocalStorage('noteData', JSON.stringify(noteDataNew))
    })
    return divBtnG
}

Note.prototype.flushList = function () {
    this.noteListOLObj.innerHTML = ''
    this.noteListDoneObj.innerHTML = ''
    const noteData = JSON.parse(getLocalStorage('noteData'))
    for (let i in noteData) {
        const liModule = this.listModule(i, noteData[i])
        if (noteData[i].isDone) {
            this.noteListDoneObj.prepend(liModule)
        } else {
            this.noteListOLObj.prepend(liModule)
        }

    }
}