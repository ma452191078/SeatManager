/**
 * Created by majingyuan on 2016/12/25.
 */

// var path = "http://weixin.shidanli.cn:8080/imetting";
var path = "http://localhost:8088/imetting";


//获取url中的参数
function getUrlParam(name) {
    var param = '';
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r !== null){
        var param = unescape(r[2]);

        if (param === null || param === 'undefined'){
            param = '';
        }
    }
    return param; //返回参数值
}

// 获取用户的企业号id
function getUserOpenId() {
    var userCode = getUrlParam('code');
    if (userCode !== undefined) {
        var _url = path + "/wechat/getUserInfo";
        var parameter = {};
        parameter["code"] = userCode;
        $.ajax({
            url: _url,
            type : 'POST',
            dataType : 'JSON',
            data: parameter,
            beforeSend: function () {

            },
            success: function (data) {
                if (data !== null && data !== undefined){
                    store.set("userId", data.userid);
                    store.set("userName", data.name);
                    getSeatInfoByUserId(data.userid);
                }
            },
            error : function(data){
                console.log(data);
            }
        });
    }
}

// 根据用户id查询座次
function getSeatInfoByUserId(userId) {

    var _url = path + "/seatInfo/getSeatInfoById";
    var parameter = {};
    parameter["id"] = userId;
    $.ajax({
        url : _url,
        type : "post",
        dataType : "json",
        data : parameter,
        beforeSend : function(){

        },
        success : function(data){
            $("#inputName").val(data.seatUser);
            var dataList = [];
            if(data != null){
                dataList.push(data);
                showSeatInfos(dataList);

            }else{
                resetSeatInfo();
            }
        },
        error : function(){
            resetSeatInfo();
        }
    });
}

function getMySeat(){
    var room = "";
    var seatUser = $("#inputName").val();
    if(seatUser === "" || seatUser === undefined || seatUser === null){
        alert("请输入姓名");
        return;
    }

    var _url = path + "/seatInfo/getSeatInfoByUser";
    var parameter = {};
    parameter["seatUser"] = seatUser;
    $.ajax({
        url : _url,
        type : "post",
        dataType : "json",
        data : parameter,
        beforeSend : function(){

        },
        success : function(data){
            var dataList = data.content;
            if(data != null){
                showSeatInfos(dataList);

            }else{
                resetSeatInfo();
            }
        },
        error : function(){
            resetSeatInfo();
        }
    });

}


function resetSeatInfo() {
    $("#seatList").hide();
    $("#tips").show();
    for(var i=1; i<=3; i++){
        $("#a"+i).removeClass("areaActive");
        $("#b"+i).removeClass("areaActive");
        $("#c"+i).removeClass("areaActive");
        $("#d"+i).removeClass("areaActive");
        $("#a"+i).addClass("areaUnActive");
        $("#b"+i).addClass("areaUnActive");
        $("#c"+i).addClass("areaUnActive");
        $("#d"+i).addClass("areaUnActive");
    }
    $("#area").show();
}

function showSeatInfos(dataList) {
    $("#tips").hide();
    $("#seatList").show();
    $("#seatList").html("");
    $("#area").show();
    for(var i=1; i<=2; i++){
        $("#a"+i).removeClass("areaActive");
        $("#b"+i).removeClass("areaActive");
        $("#c"+i).removeClass("areaActive");
        $("#d"+i).removeClass("areaActive");
        $("#a"+i).addClass("areaUnActive");
        $("#b"+i).addClass("areaUnActive");
        $("#c"+i).addClass("areaUnActive");
        $("#d"+i).addClass("areaUnActive");
    }

    $.each(dataList, function(i,item){
        switch(item.seatRoom){
            case "A1":
                room = "渠";
                break;
            case "B1":
                room = "道";
                break;
            case "C1":
                room = "设";
                break;
            case "D1":
                room = "计";
                break;
            case "A2":
                room = "精";
                break;
            case "B2":
                room = "准";
                break;
            case "C2":
                room = "营";
                break;
            case "D2":
                room = "销";
                break;
        }
        if(i > 0){
            $("#seatList").append("<hr class='hr-stanley' />");
        }
        $("#seatList").append(
            "<p class='lead'>区域：<u>&nbsp;" + room + "&nbsp;</u>，第<u>&nbsp;"
            + item.seatRow	+ "&nbsp;</u>排，第<u>&nbsp;"
            + item.seatCol + "&nbsp;</u>列。"
            //                            + "</p><p class='lead'>"
            + "<strong>"
            + item.seatUser + "</strong>&nbsp;&nbsp;"
            + item.seatDw + "&nbsp;&nbsp;"
            + "</p>"
        );


        switch(item.seatRoom){
            case "A1":
                $("#a1").removeClass("areaUnActive");
                $("#a1").addClass("areaActive");
                break;
            case "A2":
                $("#a2").removeClass("areaUnActive");
                $("#a2").addClass("areaActive");
                break;
            case "B1":
                $("#b1").removeClass("areaUnActive");
                $("#b1").addClass("areaActive");
                break;
            case "B2":
                $("#b2").removeClass("areaUnActive");
                $("#b2").addClass("areaActive");
                break;
            case "C1":
                $("#c1").removeClass("areaUnActive");
                $("#c1").addClass("areaActive");
                break;
            case "C2":
                $("#c2").removeClass("areaUnActive");
                $("#c2").addClass("areaActive");
                break;
            case "D1":
                $("#d1").removeClass("areaUnActive");
                $("#d1").addClass("areaActive");
                break;
            case "D2":
                $("#d2").removeClass("areaUnActive");
                $("#d2").addClass("areaActive");
                break;
        }
    });
}