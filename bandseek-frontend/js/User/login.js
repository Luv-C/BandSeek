import {setCookie, getCookie} from "../cookie.js";
import {welcome} from "../topBar.js";

window.onload=function(){
    let button =document.getElementById("login");
    button.addEventListener("click",login);
    let cookie = getCookie("id");
    if (cookie.length!==0){
        alert("已经登录！用户"+cookie);
        window.location.href="home.html";
    }
    welcome();
};

function login(){
    let user_id=document.getElementById("user_id").value;
    let user_pwd=document.getElementById("user_pwd").value;
    if(user_id ===''){
        alert("请输入用户账号");
        return;
    }
    if(user_pwd===""){
        alert("请输入用户密码");
        return;
    }
    let xhr = window.XMLHttpRequest ? new XMLHttpRequest(): new ActiveXObject("mincrosoft.XMLHttp");
    xhr.onreadystatechange = () =>{
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                let res = parseInt(xhr.responseText);
                if(res === 1){
                    setCookie("id",user_id,1);
                    setCookie("pwd",user_pwd,1);
                    window.location.href="home.html";
                    alert("登录成功！");

                }
                else if(res === 2){
                    alert("该用户名不存在！");
                }
                else if(res === 3){
                    alert("密码错误！");
                }
                else
                    alert("未知错误！");
            }
            else
                alert("请检查您的网络连接"+"login error"+xhr.responseText);
        }

    };
    xhr.open("post","http://localhost:8080/user/login",false);
    xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
    xhr.send("user_id="+ user_id + "&user_pwd=" + user_pwd);
}
