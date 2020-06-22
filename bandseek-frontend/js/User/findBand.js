import {isLogin,getCookie} from "../cookie.js";
import {welcome} from "../topBar.js";
import {typeTransfer} from "./user.js";
import {getBand} from "../Band/myBand.js";
import {getUserName} from "../Band/myBand.js";
import {sendMail} from "../Mail/myMail.js";

let bands=[];
let member=[];
let band_leader=[];//用于乐队展示时的Leader_name的展示
let my_name=[];
let leader_name=[]; //全局变量，用于发送消息时的receiver_name
layui.use('form', function() {
    var form = layui.form;
    form.render();
});


window.onload=function () {
    welcome();
    getUserName(getCookie("id"),my_name);
    //alert(my_name[0]);
    let button1 =document.getElementById("findAll");
    button1.addEventListener("click",findAll);

    let button2 =document.getElementById("findByLeader");
    button2.addEventListener("click",findByLeader);

    let button3 = document.getElementById("findByName");
    button3.addEventListener("click",findByBandName);

    isLogin();
};

function displayBand(bands) {
    let bandList = document.getElementById("band_list");
    let resultBand=bandList.firstChild;
    resultBand.classList.add("band_bigger");
    resultBand.classList.remove("my_band");


    // let bandId = document.getElementById("band_id");
    // bandId.classList.add("band_id");
    //
    // let bandName = document.getElementById("band_name");
    // bandName.classList.add("band_name");
    //
    // let bandNum = document.getElementById("band_num");
    // bandNum.classList.add("band_num");
    //
    // let bandDescription = document.getElementById("band_description");
    // bandDescription.classList.add("band_description");
    //
    // let bandMem = document.getElementById("band_mem");
    // bandMem.classList.add("band_mem");
    //
    // let bandLeader = document.getElementById("band_leader");
    // bandLeader.classList.add("band_mem");

    let button = document.createElement("button");
    button.id=bands[0].band_id;
    button.innerHTML="<i class=\"layui-icon\">&#xe654;</i>加入该乐队";
    button.classList.add("join_right");

    resultBand.appendChild(button);


}

function findByLeader() {
    let content = document.getElementById("content");
    content.innerText="";
    let userList = document.getElementById("band_list");
    userList.innerText="";
    bands=[];
    let leader_id=document.getElementById("id").value;
    if(leader_id===""){
        alert("输入的队长账号不能为空");
        window.location.reload();
    }
    else{
        let xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("microsoft.XMLHttp");
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    if(parseInt(xhr.responseText)===-1){
                        alert("该用户不存在或者该用户不是乐队队长");
                        window.location.reload();
                    }
                    else {
                        getBand(parseInt(xhr.responseText), member, band_leader, bands);
                        displayBand(bands);
                        addClickEvent(2);
                    }
                } else
                    alert("请检查您的网络连接1");
            }
        };
        xhr.open("post", "http://localhost:8080/band/getLeaderBand", false);
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhr.send("user_id=" + leader_id);
    }

}

function findByBandName() {
    let content = document.getElementById("content");
    content.innerText="";
    let userList = document.getElementById("band_list");
    userList.innerText="";
    bands=[];
    let band_name=document.getElementById("id").value;
    if(band_name===""){
        alert("输入的乐队名称不能为空");
        window.location.reload();
    }
    else{
        let xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("microsoft.XMLHttp");
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    //alert(xhr.responseText);
                    let str=xhr.responseText.substr(1,xhr.responseText.length-2);
                    let a=str.split(",");
                    let band_id = parseInt(a[0].split(":")[1]);
                    if(band_id===0){
                        alert("不存在名称为 "+band_name+" 的乐队");
                        window.location.reload();
                    }
                    else{
                        getBand(band_id,member,band_leader,bands);
                        displayBand(bands);
                        addClickEvent(2);
                    }
                } else
                    alert("请检查您的网络连接1");
            }
        };
        xhr.open("post", "http://localhost:8080/band/findByName", false);
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhr.send("band_name=" + band_name);
    }

}


function findAll() {
    let content = document.getElementById("content");
    content.innerText="";
    let userList = document.getElementById("band_list");
    userList.innerText="";
    bands=[];
    let xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("microsoft.XMLHttp");
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                let str = xhr.responseText.substr(1, xhr.responseText.length - 2);
                str = str.split("},");
                str[str.length - 1] = str[str.length - 1].slice(0, str[str.length - 1].length - 1);
                for (let i = 0; i < str.length; i++) {
                    str[i] = str[i].substr(1, str[i].length - 1);

                    let a = str[i].split(",");
                    //alert( a[3].split(":")[1].substr(1, a[3].split(":")[1].length - 2));
                    let band = {
                        band_id: a[0].split(":")[1],
                        band_name: a[1].split(":")[1].substr(1, a[1].split(":")[1].length - 2),
                        band_num: a[2].split(":")[1],
                        band_description: a[3].split(":")[1].substr(1, a[3].split(":")[1].length - 2)

                    };
                    //show(user);
                    bands.push(band);
                }
                layui.use(['laypage', 'layer'], function() {
                        var laypage = layui.laypage
                            , layer = layui.layer;
                        laypage.render({
                            elem: 'content'
                            ,count: bands.length
                            ,limit:4
                            ,jump: function(obj){
                                //模拟渲染
                                document.getElementById('band_list').innerHTML = function(){
                                    var arr = []
                                        ,thisData = bands.concat().splice(obj.curr*obj.limit - obj.limit, obj.limit);
                                    layui.each(thisData, function(index, item){
                                        arr.push('<div class="band">'+'<div class="band_id">NO.'+ item.band_id +'</div>'+'<div class="band_name">'+item.band_name+'</div>'+'<div class="band_description">'+item.band_description+'</div>'+'<div class="band_num">人数：'+item.band_num+' / 10</div>'+'<button class="join_left" id='+item.band_id+'>'+'<i class="layui-icon">&#xe654;</i>'+'加入该乐队</button></div>');
                                    });
                                    return arr.join('');
                                }();
                                addClickEvent(1);
                            }
                        });

                    }
                );

            } else
                alert("请检查您的网络连接1");
        }
    };
    xhr.open("get", "http://localhost:8080/band/findAll", false);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.send();
}

function addClickEvent(flag) {
    let a;
    if(flag===1){
        a=document.getElementsByClassName("join_left");
    }
    else {
        a=document.getElementsByClassName("join_right");
    }
    for(let i=0;i<a.length;i++){
        a[i].addEventListener("click",joinBand);
    }
}

function joinBand() {
    let band_id = this.id;
    let user_id = getCookie("id");
    let xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("microsoft.XMLHttp");
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                if (xhr.responseText === "2") {
                    alert("您已经是乐队的一员");
                    window.location.reload();
                } else if(xhr.responseText==="3"){
                    alert("加入乐队失败，该乐队人数已满");
                    window.location.reload();
                }else {
                    getBandLeader(band_id,leader_name);
                    sendMail(Date(),"System",leader_name[0],"乐手："+my_name[0]+" 加入了您的乐队，详情请前往我管理的乐队界面查看");
                    alert("成功加入该乐队");
                    window.location.reload();
                }
            } else
                alert("请检查您的网络连接1");
        }
    };
    xhr.open("post", "http://localhost:8080/band/addBandUser", false);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.send("user_id=" + user_id + "&band_id=" + band_id + "&isLeader=" + 0);
}

function getBandLeader(band_id,leader_name) {
    let xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("microsoft.XMLHttp");
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
               leader_name.push(xhr.responseText);
            } else
                alert("请检查您的网络连接1");
        }
    };
    xhr.open("post", "http://localhost:8080/band/getBandLeader", false);
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr.send("band_id="+band_id);
}


