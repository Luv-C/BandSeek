import {setCookie, getCookie} from "../cookie.js";
layui.use('form', function() {
    var form = layui.form;
    form.render();
});

window.onload=function(){
    let button =document.getElementById("register");
    button.addEventListener("click",register);
    let cookie = getCookie("id");
    if (cookie.length !== 0)
    {
        alert("请先退出登录" + cookie);
        window.location.href="home.html";
    }
};
function register(){
    let user_id=document.getElementById("user_id").value;
    let user_pwd=document.getElementById("user_pwd").value;
    let re_pwd=document.getElementById("re_pwd").value;
    let user_name=document.getElementById("user_name").value;
    let user_role=parseInt(document.getElementById("role").value);
    if(user_id ===''){
        alert("用户账号不能为空");
        return;
    }
    if(!isEmail(user_id)){
        alert("账号必须使用邮箱格式");
        return;
    }
    if(user_pwd===""){
        alert("用户密码不能为空");
        return;
    }
    if(user_name===""){
        alert("用户昵称不能为空");
        return;
    }
    if(user_role===0){
        alert("请选择您在乐队中的角色");
        return;
    }
    if(re_pwd !== user_pwd){
        alert("两次输入密码不一致");
        return;
    }
    let xhr = window.XMLHttpRequest ? new XMLHttpRequest(): new ActiveXObject("mincrosoft.XMLHttp");
    xhr.onreadystatechange = () =>{
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                let res = parseInt(xhr.responseText);
                if(res === 1){
                    alert("注册成功！");
                    window.location.href="login.html";
                }
                else if(res ===2){
                    alert("该账号已经注册，请重新输入");
                }
                else
                    alert("未知错误！");
            }
            else
                alert("请检查您的网络连接");
        }

    };
    xhr.open("post","http://localhost:8080/user/register",true);
    xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
    xhr.send("user_id="+ user_id + "&user_pwd=" + user_pwd+"&user_name="+user_name+"&user_type="+user_role);
}

function isEmail(user_id) {
    var re=/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
    return re.test(user_id) == true;
}