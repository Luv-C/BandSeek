import {isLogin,getCookie} from "../cookie.js";
import {welcome} from "../topBar.js";
import {typeTransfer} from "./user.js";
import {sendMail} from "../Mail/myMail.js";
import {getUserName} from "../Band/myBand.js";

let findUser=[];
let myBandId=[];
let myName=[];
let receiver=[];
layui.use('form', function() {
    var form = layui.form;
    form.render();

});


window.onload=function () {
    welcome();
    getUserName(getCookie("id"),myName);
    let button1 =document.getElementById("findById");
    button1.addEventListener("click",findById);

    let button2 =document.getElementById("findByRole");
    button2.addEventListener("click",findByRole);

    isLogin();
};

function show(user) {
    let content = document.getElementById("user_list");

        let userInfo = document.createElement("div");
        userInfo.classList.add("user");

        let userName = document.createElement("div");
        userName.innerText = user.user_name;
        userName.classList.add("user_name");

        let userId = document.createElement("div");
        userId.innerText = user.user_id;
        userId.classList.add("user_id");

        let userType = document.createElement("div");
        userType.innerText = typeTransfer(user.user_type);
        userType.classList.add("user_type");

        let userIntro = document.createElement("div");
        userIntro.innerText = user.user_intro;
        userIntro.classList.add("user_intro");

        let button = document.createElement("button");
        button.innerText="招募乐队成员";
        button.classList.add("invite");
        button.id=user.user_id;

        content.appendChild(userInfo);
        userInfo.appendChild(userName);
        userInfo.appendChild(userType);
        userInfo.appendChild(userId);
        userInfo.appendChild(userIntro);
        content.appendChild(button);
        //alert(user.user_name);
    addClickEvent();

    let inputBox = document.getElementById("user_id");
    inputBox.value = "";
}

function findById() {
    let content = document.getElementById("content");
    content.innerText="";
    let userList = document.getElementById("user_list");
    userList.innerText="";
    let user_id = document.getElementById("user_id").value;
    if(user_id===""){
        alert("输入的乐手账号为空！");
        window.location.href="findUser.html";
    }
    //alert(user_id);
    else {
        let xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("microsoft.XMLHttp");
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    if (xhr.responseText === "") {
                        alert("不存在账号为：" + user_id + "  的乐手");
                        window.location.href = "findUser.html";
                    }
                    let str = xhr.responseText.slice(1, xhr.responseText.length - 1);
                    //alert(str);
                    let a = str.split(",");
                    let user = {
                        user_id: a[0].split(":")[1].substr(1, a[0].split(":")[1].length - 2),
                        user_name: a[2].split(":")[1].substr(1, a[2].split(":")[1].length - 2),
                        user_type: a[3].split(":")[1],
                        user_intro: a[4].split(":")[1].substr(1, a[4].split(":")[1].length - 2)
                    };
                    //alert(user.user_name);
                    show(user);
                    findUser.push(user);
                } else
                    alert("请检查您的网络连接1");
            }
        };
        xhr.open("post", "http://localhost:8080/user/findUser", false);
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhr.send("id=" + user_id);
    }
}


function findByRole(){
    let content = document.getElementById("content");
    content.innerText="";
    let userList = document.getElementById("user_list");
    userList.innerText="";
    findUser=[];
    let user_type = parseInt(document.getElementById("role").value);
    if(user_type===0){
        alert("要查询的乐手角色为空！");
        window.location.href="findUser.html";
    }
    else {
        let xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("microsoft.XMLHttp");
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    let str = xhr.responseText.substr(1, xhr.responseText.length - 2);
                    str = str.split("},");
                    str[str.length - 1] = str[str.length - 1].slice(0, str[str.length - 1].length - 1);
                    for (let i = 0; i < str.length; i++) {
                        str[i] = str[i].substr(1, str[i].length - 1);
                        //alert(str[i]);
                        let a = str[i].split(",");
                        let user = {
                            user_id: a[0].split(":")[1].substr(1, a[0].split(":")[1].length - 2),
                            user_name: a[2].split(":")[1].substr(1, a[2].split(":")[1].length - 2),
                            user_type: a[3].split(":")[1],
                            user_intro: a[4].split(":")[1].substr(1, a[4].split(":")[1].length - 2)
                        };
                        //show(user);
                        findUser.push(user);
                    }
                    layui.use(['laypage', 'layer'], function() {
                        var laypage = layui.laypage
                            , layer = layui.layer;
                            laypage.render({
                                elem: 'content'
                                ,count: findUser.length
                                ,limit:4
                                ,jump: function(obj){
                                    //模拟渲染
                                    document.getElementById('user_list').innerHTML = function(){
                                        var arr = []
                                            ,thisData = findUser.concat().splice(obj.curr*obj.limit - obj.limit, obj.limit);
                                        layui.each(thisData, function(index, item){
                                            arr.push('<div class="user">'+'<div class="user_name">'+ item.user_name +'</div>'+'<div class="user_id">'+item.user_id+'</div>'+'<div class="user_intro">'+item.user_intro+'</div>'+'</div>'+'<button class="invite" id='+item.user_id+'>'+'招募乐队成员</button>');
                                        });
                                        return arr.join('');
                                    }();
                                    addClickEvent();
                                }
                            });

                    }
                            );

                } else
                    alert("请检查您的网络连接1");
            }
        };
        xhr.open("post", "http://localhost:8080/user/findType", false);
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhr.send("type=" + user_type);
    }
}

function addClickEvent() {
    let a=document.getElementsByClassName("invite");
    for(let i=0;i<a.length;i++){
        a[i].addEventListener("click",addToBand);
    }
}
// function addToBand(){
//     alert("hi");
// }



function addToBand() {
    let user_id = this.id;
    getLeaderBand(getCookie("id"));
    if(user_id===getCookie("id")){
        alert("无法添加自己进乐队");
        window.location.href="findUser.html";
    }
    else {
        //alert(myBandId[0]);
        if (myBandId[0] === -1) {
            alert("您还没有创建乐队");
            window.location.href = "findUser.html";
        }
        else {
            let xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("microsoft.XMLHttp");
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        if (xhr.responseText === "2") {
                            alert("该乐手已经是乐队的一员");
                            window.location.href = "findUser.html";
                        } else if(xhr.responseText==="3") {
                            alert("招募失败，乐队人数已满");
                            window.location.reload();
                        } else {
                            getUserName(user_id,receiver);
                            // alert(user_id);
                            // alert(myName[0]);
                            // alert(receiver[0]);

                            sendMail(Date(),"System",receiver[0],"您已被 "+myName[0]+" 邀请加入了他的乐队，详情请前往我的乐队查看");
                            alert("成功招募到该乐队成员");
                            window.location.href = "findUser.html";
                        }
                    } else
                        alert("请检查您的网络连接1");
                }
            };
            xhr.open("post", "http://localhost:8080/band/addBandUser", false);
            xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
            xhr.send("user_id=" + user_id + "&band_id=" + myBandId[0] + "&isLeader=" + 0);
        }
    }
}

function getLeaderBand(user_id){
    let xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("microsoft.XMLHttp");
    xhr.onreadystatechange = () =>{
        if(xhr.readyState === 4) {
            if (xhr.status === 200) {
                myBandId.push(parseInt(xhr.responseText));
            }
            else
                alert("请检查您的网络连接3");
        }
    };
    xhr.open("post", "http://localhost:8080/band/getLeaderBand", false);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.send("user_id="+user_id);
}

