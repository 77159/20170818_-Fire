$(function() {
    var videoUrl = indoor ? 'vidio/2.mp4' : 'vidio/1.mp4';

    //添加视频容器,因iphone中ios只支持全屏播放视频，所以不允许在iphone上面自动播放视频
    var u = navigator.userAgent;
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isiOS) {
        var video = "<video loop controls webkit-playsinline='true'><source src='" + videoUrl + "' type='video/mp4; codecs=\"avc1.42E01E, mp4a.40.2\"' ></source></video>";
        $("#videoInfor .info-left").empty().append(video);
    } else {
        var video = "<video autoplay loop webkit-playsinline='true'><source src='" + videoUrl + "' type='video/mp4; codecs=\"avc1.42E01E, mp4a.40.2\"' ></source></video>";
        $("#videoInfor .info-left").empty().append(video);
    }

    //按钮组点击样式
    $(".div-group-highlight.second ul li").on('click', function() {
        var index = $(".div-group-highlight.second ul li").index($(this));
        var isFire = false;

        if ($(this).hasClass('on')) {
            $(this).removeClass('on');
            isFire = false;
        } else {
            $(this).addClass('on');
            isFire = true;
        }

        switch (index) {
            // //控制火苗的显示和隐藏
            // case 2:
            //     if(isFire)
            //         addFireMarkers();
            //     else
            //         clearFireMarkers();
            // break;
            //控制传感器的显示和隐藏
            case 1:
                if (isFire)
                    addHeatMarkers();
                else
                    clearHeatMarkers();
                break;
                //控制视频marker的显示和隐藏
            case 0:
                if (isFire)
                    addCameraMarkers();
                else
                    clearCameraMarkers();
                break;
        }

    });

    //搜索路径        
    $("#btnSearchNavigation").on("click", function() {
        if (indoor && $(".div-group-highlight.first ul li").eq(0).hasClass("on")) {
            $(".div-group-highlight.first ul li").eq(0).trigger('click');
        }

        $('#btnInfo').data("info", "on");
        $('#btnInfo').html('<img class="imageIcon" src="./image/info-f.png" />');

        if ($(this).data('show') === "yes") {
            $(this).html('<img class="imageIcon" src="./image/gps-n.png" />');
            $(this).data('show', 'no');
            funcStatus = 5;
        } else {
            funcStatus = 0;

            $(this).html('<img class="imageIcon" src="./image/gps-f.png" />');
            $(this).data('show', 'yes');

            clearNaviObject();
            clearImgLayer();
            endpoint = null;
            endgroupid = null;
            startpoint = null;
            startgroupid = null;
        }
    });

    /*信息*/
    $('#btnInfo').on('click', function() {
        if (indoor && $(".div-group-highlight.first ul li").eq(0).hasClass("on")) {
            $(".div-group-highlight.first ul li").eq(0).trigger('click');
        }

        clearNaviObject();
        //clearBtnClass();
        // funcStatus = 0;
        var info = $(this).data('info')

        $("#btnSearchNavigation").html('<img class="imageIcon" src="./image/gps-f.png" />');
        $("#btnSearchNavigation").data('show', 'yes');
        funcStatus = 0;
        clearImgLayer();
        endpoint = null;
        endgroupid = null;
        startpoint = null;
        startgroupid = null;

        if (info == 'off') {
            funcStatus = 0;
            $(this).html('<img class="imageIcon" src="./image/info-f.png" />');
            $(this).data('info', 'on');
        } else {
            funcStatus = 1;
            $(this).html('<img class="imageIcon" src="./image/info-n.png" />');
            $(this).data('info', 'off');
        }
    });

    $(".div-info-bottom .close").on('click', function() {
        var index = $(".div-info-bottom .close").index($(this));
        $(".div-info-bottom").slideRightHide(1000);
    });

    //动态生成tab
    if (needTabs) createTabs();
});

var createTabs = function() {
    if (tabsDataUrl == '') return;
    $.getJSON(tabsDataUrl, function(data) {
        createTopTabs(data);
    });
}

let createTopTabs = function(data) {
    let ulTop = $("<ul>", {
        "class": "nav nav-tabs nav-justified"
    }).appendTo($('#tabsInfor'));

    var tabContent = $("<div >", {
        "class": "tab-content"
    }).appendTo($('#tabsInfor'));
    var count = 0;
    for (var i in data) {
        var item = data[i];
        //标题
        var liTop = '';
        if (count == 0) {
            liTop = '<li class="active"><a href="#tab_' + count + '" data-toggle="tab" >' + item.name + '</a></li>';
        } else {
            liTop = '<li><a href="#tab_' + count + '" data-toggle="tab" >' + item.name + '</a></li>';
        }
        ulTop.append(liTop);

        //内容
        var tabc = '',
            leftTabContent = createTabContents(tabc, item.contents);
        if (count == 0) {
            tabc = '<div class="tab-pane active" id="tab_' + count + '">' + leftTabContent + '</div>';
        } else {
            tabc = '<div class="tab-pane" id="tab_' + count + '">' + leftTabContent + '</div>';
        }
        tabContent.append(tabc);

        count++;
    }

    function startFire(fire) {
        if (glo.currentFire) {
            glo.currentFire.stop();
        }

        glo.currentFire = fire;

        glo.currentFire.start();
    }

    //点击tab抛出tab的标题名
    $("li.tabInfo").on('click', function(e) {
        var name = $(this).text();

        switch (name) {
            case '情况1':
                startFire(glo.huagongFire);
                break;
            case '情况2':
                startFire(glo.huguanFire);
                break;
            default:
                glo.removeTeam(name);
                glo.teamGo(name);
                break;
        }

    });
    handleTabHoverEvent();
}

var handleTabHoverEvent = function() {
    $('.tabsCollapse').on('click', function() {
            if ($(this).hasClass('left')) {
                $('.div-info-left').animate({
                    left: '2px'
                }, "slow");
                $(this).animate({
                    left: '501px'
                }, "slow", function() {
                    $(this).find('i').removeClass('glyphicon-chevron-right').addClass('glyphicon-chevron-left');
                });
                $(this).removeClass('left');
            } else {
                $('.div-info-left').animate({
                    left: '-502px'
                }, "slow");
                $(this).animate({
                    left: '2px'
                }, "slow", function() {
                    $(this).find('i').removeClass('glyphicon-chevron-left').addClass('glyphicon-chevron-right');
                });
                $(this).addClass('left');
            }
        })
        // $('.div-info-left').on('mouseleave', function() {
        //     if (!$(this).hasClass('down')) {
        //         $(this).animate({
        //             bottom: '-255px'
        //         }, "slow");
        //         $(this).addClass('down');
        //     }
        // });

    // $('.div-info-left').on('mouseenter', function() {
    //     if ($(this).hasClass('down')) {
    //         $(this).animate({
    //             bottom: '5px'
    //         }, "slow");
    //         $(this).removeClass('down');
    //     }
    // });
}

//创建tab内容
var createTabContents = function(tabc, contents) {
    var ulLeft = '<ul class="nav nav-pills nav-stacked pull-left">';

    var tabContent = '<div class="tab-content tab-content-content">';

    var count = 0;
    for (var i in contents) {
        var item = contents[i];
        //标题
        var liLeft = '';
        if (count == 0) {
            liLeft = '<li class="active tabInfo"><a href="#tab_tab_' + count + '" data-toggle="tab" >' + item.name + '</a></li>';
        } else {
            liLeft = '<li class="tabInfo"><a href="#tab_tab_' + count + '" data-toggle="tab" >' + item.name + '</a></li>';
        }
        ulLeft += liLeft;

        //内容
        var tabc = '';
        if (count == 0) {
            tabc = '<div class="tab-pane active" id="tab_tab_' + count + '">' + item.content + '</div>';
        } else {
            tabc = '<div class="tab-pane" id="tab_tab_' + count + '">' + item.content + '</div>';
        }
        tabContent += tabc;
        count++;
    }

    ulLeft += '</ul>';
    tabContent += '</div>';

    var leftContent = ulLeft + tabContent;

    return leftContent;
}

//展示温度窗口
var showHeatWin = function(img) {
    $(".div-info-bottom").css('display', 'none');
    $("#heatInfor").slideRightShow(1000);
    var heatObj = getpntsByID(lights, img.ID, 'temper-');
    if (!heatObj) return;
    console.log(heatObj.name);
    $("#heatInfor .name").text(heatObj.name);
    $("#heatInfor .temper").text(heatObj.value + '℃');
    //$("#heatInfor .info-right .temper").text(heatObj.value + '℃');
}

//展示视频窗口
var showCameraWin = function(img) {
    $(".div-info-bottom").css('display', 'none');
    $("#videoInfor").slideRightShow(1000);

    var cameraObj = getpntsByID(cameras, img.ID, 'camera-');
    if (!cameraObj) return;

    $("#videoInfor .name").text(cameraObj.name);
}

//展示信息窗口
var showInfoWin = function(model) {
    $(".div-info-bottom").css('display', 'none');
    $("#modelInfor").slideRightShow(1000);

    var name = model.name ? model.name : "房间";
    $("#modelInfor .name").text(name);
    $("#modelInfor .groupname").text(getGroupNameByID(model.groupID));
}

//根据ID获取对应视频信息或温度信息
var getpntsByID = function(data, id, split) {

    var res = null;

    if (split) id = parseInt(id.substr(split.length, id.length));
    data.forEach(function(val, i) {
        if (val.Id == id) {
            res = val;
            return;
        }
    });

    return res;
}