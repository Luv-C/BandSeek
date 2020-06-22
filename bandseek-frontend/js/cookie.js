export function setCookie(name, value, day) {
    let date = new Date();
    date.setDate(date.getDate() + day);
    document.cookie = name + '=' + value + ';expires=' + date+";path=/";
}

//获取cookie
export function getCookie(name) {
    let reg = RegExp(name + '=([^;]+)');
    let arr = document.cookie.match(reg);
    if (arr) {
        return arr[1];
    } else {
        return '';
    }
}

//删除cookie
export function delCookie(name) {
    setCookie(name, null, -1);
}

export function isLogin() {
    let cookie = getCookie("id");
    if (cookie.length === 0)
    {
        alert("请先登录！");
        window.location.href="/bandseek-frontend/html/login.html";
    }
    return true;
}