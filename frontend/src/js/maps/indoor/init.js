/**
 * 初始化户外页面所需的项
 */
var tableNames = {
    "warnings": 2,
    "goverments": 9
};

var alltables = {},
    alltableDetails = {},
    tables = {},
    tableDetails = {},
    curTbName = '';
$(document).ready(function() {
    initTableDatas();
    //地图工具的淡入淡出
    $('#rightBanner .menu>.item:eq(0)').on('click', function() {
        $('.side-tools').transition('slide left');

        if ($(this).find('.ui.segment').hasClass('active')) {
            $(this).find('.ui.segment').removeClass('active');
        } else $(this).find('.ui.segment').addClass('active');
    });

    //地图工具点击事件
    $('#rightBanner .side-tools.menu .segment').on('click', function() {
        var index = $('#rightBanner .side-tools.menu .segment').index($(this)),
            isActive = $(this).hasClass('active');
        switch (index) {
            case 0:
                showCurTraffic(isActive);
                break;
            case 1:
                break;
            case 2:
                openDistanceTool(isActive);
                break;
        }

        if (isActive) {
            $(this).removeClass('active');
        } else {
            $('#rightBanner .side-tools.menu .segment').removeClass('active');
            $(this).addClass('active');
        }
    });

    //控制标注的显示/隐藏
    $('.container-map .label-ctrl-btn').on('click', function() {
        var isActive = $(this).hasClass('active');
        if (isActive) {
            showLabels(false);
            $(this).removeClass('active');
        } else {
            showLabels(true);
            $(this).addClass('active');
        }
    })

    /* 地图标注弹框，点击关闭按钮 */
    $(document).on('click', '.infoBox img', function() {
        $(this).parents('.fm-control-popmarker').css('display', 'none');
    });

    /*打开/关闭视频窗口按钮*/
    $('.open1,.video-list-right-close').on('click', function() {
        $('.video-list').transition({
            'animation': 'slide right',
            onShow: function() {
                //显示的时候填充表格内数据
                var videos = getVideoData();
                getParsedHTML(getVideoTrTempl(), videos, $('.video-table-box table tbody'));
            }
        });
    });

    /* 关闭短的视频弹框 */
    $('.video-view-box-btn').on('click', function() {
        $('.video-view-box').transition('slide right');
    });

    bindFilterVideoEvent();
});

//获取视频列表 包括监控视频+消防室+重点区域
function getVideoData() {
    var videosObj = _.cloneDeep(tables["goverments"][7]);
    videosObj.list = [];
    var list = _.union(tables["goverments"][7].list, tables["goverments"][8].list, tables["goverments"][9].list);
    videosObj.list = list;
    return videosObj;
}

//绑定视频列表中搜索框和下拉框的变化事件
function bindFilterVideoEvent() {
    $('.video-list-search-input').on('keyup', function() {
        var value = $(this).val().trim();
        searchVideoByVal(value);
    });

    $('#floorDrop').dropdown({
        onChange: function(value, text, $selectedItem) {
            var curData = tables["goverments"][7];
            var filterData = [];
            if (value.trim() != '')
                filterData = _.filter(curData.list, (item) => {
                    if (item["floor"].indexOf(value) >= 0)
                        return true;
                });
            else filterData = tables[ttype][index].list;

            getParsedHTML(getVideoTrTempl(), {
                list: filterData
            }, $('.video-table-box table tbody'));
        }
    });
}

//根据关键字搜索视频
function searchVideoByVal(value) {
    var curData = getVideoData();
    var filterData = [];
    if (value.trim() != '')
        filterData = _.filter(curData.list, (item) => {
            for (var i in item) {
                //console.log(i, item[i]);
                if (item && item[i] && item[i].toString().indexOf(value) >= 0)
                    return true;
            }
        });
    else filterData = curData.list;

    getParsedHTML(getVideoTrTempl(), {
        list: filterData
    }, $('.video-table-box table tbody'));
}

//绑定监控视频每行的数据
function bindVideoTrEvent() {
    //点击某列视屏事件
    $('.video-table-box table tbody tr').on('click', function() {

    });
}

function bindSearchInputEvent() {
    //搜索地图功能
    $('.side-search .search.icon').on('click', function() {
        searchMarkersByName($('.side-search input').val());
    });
}

//绑定大按钮事件
function bindBannerEvent() {
    $('.ui.menu>.item[data-toggle="items"]').on('click', function() {
        let index = $(this).data("itemsindex");
        $('.ui .items:eq(' + index + ')').transition('slide down');
        if ($('.ui.message').hasClass('visible')) {
            var itemsIndex = $('.ui.message').data('itemsindex'),
                itemIndex = $('.ui.message').data('itemindex'),
                direction = $('.ui.message').data('direction');

            messageInfoEffect(itemsIndex, itemIndex, direction);
        }
    });
}

//初始化各个表格的数据存入tables,和tableDetails
function initTableDatas() {
    for (var i in tableNames) {
        for (var j = 0, jlen = parseInt(tableNames[i]); j < jlen; j++) {
            getList(curPage, i, j + 1);
        }
    }
}

//绑定左右栏弹框的窗口
function bindBannerItemEvent() {
    //右侧table弹出
    $('.ui.items .item').on('click', function() {
        setMarkersToDefault(); //先清除地图上的高亮的图标

        var type = $(this).data('type'),
            itemIndex = $(this).data('itemsindex');

        var index = $('.ui.items:eq(' + itemIndex + ') .item').index($(this));
        var isLeft = (type == 'warnings' ? false : true);

        handleListWin(type, index, itemIndex, isLeft);
    });
}

//创建单位窗口
function handleListWin(ttype, index, itemsIndex, isLeft) {
    var slideLeft = !isLeft ? 'right' : 'left';
    var tbData = tables[ttype][index + 1];
    tbData.itemindex = index + 1;

    createTableByType(tbData, ttype);

    $('.ui.message').data('type', ttype);

    //先改变窗口的位置
    var top = getMsgWinTop(itemsIndex, index);
    changeMsgWinPositon(slideLeft, top + 'px');

    //控制窗口的动效
    messageInfoEffect(itemsIndex, index, slideLeft);

    handleCloseEvent(slideLeft); //绑定窗口的关闭按钮事件
    handleInputEvent(itemsIndex, index + 1, ttype); //搜索
}

//table 窗口动画 动态的修改窗口的弹出位置和动画方向
function messageInfoEffect(itemsIndex, itemindex, type) {
    var msgItemsIndex = $('.ui.message').data('itemsindex');
    if (msgItemsIndex == null) {
        msgItemsIndex = itemsIndex;
        $('.ui.message').data('itemsindex', itemsIndex);
        $('.ui.message').data('itemindex', itemindex);
    }

    if (msgItemsIndex == itemsIndex) {
        var msgItemIndex = $('.ui.message').data('itemindex');
        if (itemindex == msgItemIndex || $('.ui.message').hasClass('hidden')) {
            $('.ui.message').transition({
                "animation": 'slide ' + type,
                onComplete: slideEffectComplete
            });
        } else {
            $('.ui.message').transition('slide ' + type).transition({
                "animation": 'slide ' + type,
                onComplete: slideEffectComplete
            });
        }
    } else if (msgItemsIndex != itemsIndex && $('.ui.message').hasClass('visible')) {
        $('.ui.message').transition('slide ' + type).transition({
            "animation": 'slide ' + type,
            onComplete: slideEffectComplete
        });
        // var top = getMsgWinTop(itemsIndex, itemindex);
        // changeMsgWinPositon(type, top + 'px');
    }

    //记录当前窗口属于items的下标及item的下标
    $('.ui.message').data('itemsindex', itemsIndex);
    $('.ui.message').data('itemindex', itemindex);
}

//计算窗口距离顶部的高度，如果超出窗口高度，则距离底部30px的地方弹出窗口
function getMsgWinTop(itemsIndex, itemindex) {
    var offsetTop = $('.ui.items:eq(' + itemsIndex + ') .item>.segment:eq(' + itemindex + ')').offset().top,
        winHei = $('.ui.message').height();
    if ((offsetTop + winHei) < $(window).height()) return offsetTop - 10;
    else return $(window).height() - winHei - 30;
}

//弹出窗口动效完成后
function slideEffectComplete() {
    var isHighLight = true;
    if ($('.ui.message').hasClass('visible'))
        isHighLight = true;
    else
        isHighLight = false;

    var type = $('.ui.message').data('type'),
        itemIndex = $('.ui.message').data('itemindex');
    highlightMarkersByType(type, itemIndex + 1, isHighLight); //高亮
}

/**
 * 获取列表数据
 * @param  {[type]} 'goverment' [description]
 * @return {[type]}             [description]
 */
function getList(pagename, tableName, index) {
    var tbFileName = pagename + '_' + tableName + '_' + index + '.json';
    var tbDetailFileName = pagename + '_' + tableName + '_details' + '_' + index + '.json';
    var url = dataUrl + 'maps/' + pagename + '/' + tableName + '/' + tbFileName;
    var durl = dataUrl + 'maps/' + pagename + '/' + tableName + '/' + tbDetailFileName;

    $.ajax({
        url: durl,
        type: "GET",
        async: false,
        dataType: "json",
        success: function(data) {
            fillTables(tableName, index, data.list, 1);
        }
    });

    $.getJSON(url, function(result) {
        fillTables(tableName, index, result, 0);
    });
}

//保存表格数据
function fillTables(tableName, index, data, type) {
    var table = !type ? tables : tableDetails;
    if (!table[tableName]) {
        table[tableName] = {};
    }

    if (!table[tableName][index])
        table[tableName][index] = {};

    table[tableName][index] = data;

    /*curFloorTables(tableName, index, data, type, 1);*/
}

//获取当前层的数据
function curFloorTables(tableName, index, data, type, curFloorId) {
    var table = !type ? tables : tableDetails;
    if (!table[tableName]) {
        table[tableName] = {};
    }

    if (!table[tableName][index])
        table[tableName][index] = {};

    var resData = _.cloneDeep(data);
    resData.list = [];
    if (!type) {
        resData.list = _.filter(data.list, (item) => (item.floor == curFloorId));
    }

    table[tableName][index] = resData;
}

//获取窗口模板
function getTbTemplByType(type) {
    switch (type) {
        case 'goverments':
            return getGovermentTableTempl();
        case 'waters':
            return getWaterTableTempl();
        case 'powers':
            return getPowerTableTempl();
        case 'warnings':
            return getWarningTableTempl();
    }
}

//获取表格模板
function getTrTemplByType(type) {
    switch (type) {
        case 'goverments':
            return getGovermentTrTempl();
        case 'waters':
            return getWaterTrTempl();
        case 'powers':
            return getPowerTrTempl();
        case 'warnings':
            return getWarningTrTempl();
    }
}

/**
 * 根据表格模板填充表格
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
function createTableByType(data, type) {
    var template = getTbTemplByType(type);
    Mustache.parse(template); // optional, speeds up future uses
    var tbHTML = Mustache.render(template, data);

    $('.right-Info-tbl.ui.message').empty().append(tbHTML);
    bindTableClickEvent();
}

//绑定表格行内单击事件
function bindTableClickEvent() {
    $('.ui.message table tbody tr').on('click', function() {
        let unitNo = $(this).data('id'),
            lonlat = $(this).data('lonlat'),
            tbpar = $(this).parents('table'),
            itemIndex = tbpar.data('itemindex'),
            type = tbpar.data('type');

        setMarkersToDefault(); //先清除地图上的高亮的图标
        goToCenter(lonlat, unitNo, type, itemIndex);
        /*createMarker(lonlat, wrapInfo, 'goverments', info);*/
    });

    //查看视频
    $('.ui.message table tbody tr .video').on('click', function() {
        event.preventDefault();
        event.stopPropagation();
        var id = $(this).data('id');
        if ($('.video-list').hasClass('visible')) {
            $('.video-list .ui.input input').val(id);
            searchVideoByVal(id);
        } else {
            $('.video-list').transition({
                "animation": 'slide right',
                onComplete: function() {
                    $('.video-list .ui.input input').val(id);
                    searchVideoByVal(id);
                }
            })
        }
    });
}

function getDetailsById(id, index, type) {
    let details = tableDetails[type][index];
    let info = _.find(details, (item) => {
        return item.id == id
    });
    let wrapInfo = getWrappedGovermentInfo(info, type);
    return wrapInfo;
}

//单位所需的信息框文字
function getWrappedGovermentInfo(info, type) {
    var res = {
        title: '详细信息',
        contents: []
    };
    for (var i in info) {
        var col = {};
        i == 'id' ? (col.name = '编号') : (col.name = i);
        col.value = info[i];
        res.contents.push(col);
    }

    return res;
}

//设置window窗口位置
function changeMsgWinPositon(type, top) {
    var msgWin = $('.right-Info-tbl.ui.message');
    //右边
    if (type == 'left') {
        msgWin.css('right', "95px");
        msgWin.css('left', "auto");
    } else {
        msgWin.css('left', "95px");
        msgWin.css('right', "auto");
    }
    msgWin.css('top', top);
}

//关闭窗口
function handleCloseEvent(type) {
    //关闭table窗口
    $('.ui.message .close.icon').on('click', function() {
        $('.ui.message').transition({
            "animation": 'slide ' + type,
            onComplete: slideEffectComplete
        });
    });
}

//添加输入框的blur事件
function handleInputEvent(itemsIndex, index, ttype) {
    $('.ui.message input').on('keyup', function() {
        var value = $(this).val();
        var curData = tables[ttype][index];
        var filterData = [];
        if (value.trim() != '')
            filterData = _.filter(curData.list, (item) => {
                for (var i in item) {
                    if (item[i].indexOf(value) >= 0)
                        return true;
                }
            });
        else filterData = tables[ttype][index].list;

        var template = getTrTemplByType(ttype);
        Mustache.parse(template); // optional, speeds up future uses
        var tbHTML = Mustache.render(template, {
            list: filterData
        });

        $('.ui.message table tbody').empty().append(tbHTML);
        bindTableClickEvent();
    });
}

//创建地图默认markers
function createBMapMarkers() {
    for (var ttype in tables) {
        for (var k in tables[ttype]) {
            for (var j = 0, jlen = tables[ttype][k].list.length; j < jlen; j++) {
                var item = tables[ttype][k].list[j];
                var id = item.id;
                createDefaultMarker(item.lonlat, id, ttype, item.name, k);
            }
        }
    }
}

//切换不同楼层的数据
function changeTableDataByFloor(floorId) {
    for (var ttype in tables) {
        for (var k in tables[ttype]) {
            for (var j = 0, jlen = tables[ttype][k].list.length; j < jlen; j++) {
                var item = tables[ttype][k].list[j];
                curFloorTables(ttype, k, tables[ttype][k], 0, floorId);
                curFloorTables(ttype, k, tables[ttype][k], 1, floorId);
            }
        }
    }
}