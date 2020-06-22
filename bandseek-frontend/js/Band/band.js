import {welcome} from "../topBar.js";
import {getCookie, isLogin} from "../cookie.js";
import {getUserName,getUserBand} from "./myBand.js";
import {getBandLeader} from "./myBand.js";
import {sendMail} from "../Mail/myMail.js";

let user_band=[];//当前用户管理的乐队，内容为Band类型
let member=[];//乐队成员，全局变量，内容为String类型
let band_leader=[];//乐队队长，全局变量，内容为String类型
let my_name=[];//当前登录的用户的名称
let leader_name=[]; //全局变量，用于发送消息时的receiver_name
window.onload=function(){
    welcome();
    isLogin();
    getUserBand(band_leader,member,user_band);
    getUserName(getCookie("id"),my_name);
    addButton();
};

function addButton() {
    let bands = document.getElementsByClassName("my_band");
    if(bands.length===0){
        let notice = document.createElement("a");
        notice.href="../User/findBand.html";
        notice.innerHTML="<div style='font-size: 20px;margin-top:120px'><i class=\"layui-icon layui-icon-right\" style='font-size: 100px'></i></br>您还没有加入任何乐队</br>点击此处前往查找乐队</div>";
        let list = document.getElementById("band_list");
        list.appendChild(notice);

    }
    for(let i = 0;i<bands.length;i++){
        let bandMem = bands[i].firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling;
        let exitButton = document.createElement("button");
        exitButton.addEventListener("click",exitBand);
        exitButton.classList.add("exit");
        exitButton.innerText="退出乐队";
        bands[i].insertBefore(exitButton,bandMem);
    }
}

function exitBand() {

    let band_id = parseInt(this.parentNode.id);
    let user_name = my_name[0];

    let xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("microsoft.XMLHttp");
    xhr.onreadystatechange = () =>{
        if (xhr.readyState === 4){
            if(xhr.status === 200) {
                if(xhr.responseText==="2"){
                    alert("无法退出您创建的乐队");
                }
                else {
                    getBandLeader(band_id,leader_name);
                    sendMail(Date(),"System",leader_name[0],"乐手："+user_name+" 退出了您的乐队");
                    alert("退出乐队成功");
                    window.location.reload();
                }

            }
            else
                alert("请检查您的网络连接");
        }
    };
    xhr.open("post", "http://localhost:8080/band/removeBandUser", false);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.send("band_id="+band_id+"&user_name="+user_name);
}