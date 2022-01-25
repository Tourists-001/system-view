function debounce(handle, delay) {
    let timer = null;
    return function () {
        clearTimeout(timer);
        let This = this,
            _arg = arguments
        timer = setTimeout(() => {
            handle.apply(This, _arg)
        }, delay)
    }
}

function throttle(handler, wait) {
    var lastTime = 0;
    return function (e) {
        let nowTime = new Date().getTime();
        if (nowTime - lastTime > wait) {
            handler.apply(this, arguments)
            nowTime = lastTime
        }
    }
}

const Inp = document.getElementById('Inp')
Inp.oninput = debounce(ajax, 1000)

function ajax(e) {
    console.log(this.value, e);
}