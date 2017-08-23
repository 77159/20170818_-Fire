/**
 * 初始化户外页面所需的项
 */
var tableNames = {
    "warnings": 3,
    "goverments": 3,
    "waters": 3,
    "powers": 2
};

var tables = {},
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
                if (!isActive) {
                    showMapTools();
                } else clearMapTools();
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

    //bindSearchInputEvent();
});

function bindSearchInputEvent() {
    //搜索地图功能
    $('.side-search .search.icon').on('click', function() {
        searchMarkersByName($('.side-search input').val());
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
        var type = $(this).data('type'),
            itemIndex = $(this).data('itemsindex');
        var index = $('.ui.items:eq(' + itemIndex + ') .item').index($(this));

        if (type == 'status') {
            var template = '',
                data = {};
            template = getFireTrTempl(type);
            data = {
                title: '火警统计',
                content: ""
            };
            Mustache.parse(template); // optional, speeds up future uses
            var tbHTML = Mustache.render(template, data);
            $('.right-Info-tbl.ui.message').empty().append(tbHTML);

            //先改变窗口的位置
            var slideLeft = 'right';
            var top = getMsgWinTop(1, index);
            changeMsgWinPositon(slideLeft, top + 'px');

            if (!$('.right-Info-tbl.ui.message').hasClass('visible')) {
                messageInfoEffect(1, index, slideLeft);
            }

            handleCloseEvent(slideLeft); //绑定窗口的关闭按钮事件

            if (index == 0) {
                $('.right-Info-tbl.ui.message .static-content:eq(0)').empty().append(initEcharts1($('.right-Info-tbl.ui.message .static-content:eq(0)')[0]));
                $('.right-Info-tbl.ui.message .static-content:eq(1)').empty().append(initEcharts2($('.right-Info-tbl.ui.message .static-content:eq(1)')[0]));
            }
            if (index == 1) {
                $('.right-Info-tbl.ui.message .static-content:eq(0)').empty().append(initEcharts5($('.right-Info-tbl.ui.message .static-content:eq(0)')[0]));
                $('.right-Info-tbl.ui.message .static-content:eq(1)').empty().append(initEcharts6($('.right-Info-tbl.ui.message .static-content:eq(1)')[0]));
            }
            if (index == 2) {
                $('.right-Info-tbl.ui.message .static-content:eq(0)').empty().append(initEcharts3($('.right-Info-tbl.ui.message .static-content:eq(0)')[0]));
            }

        } else {
            setMarkersToDefault(); //先清除地图上的高亮的图标

            var isLeft = (type == 'warnings' ? false : true);

            handleListWin(type, index, itemIndex, isLeft);
        }

    });
}

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

//创建单位窗口
function handleListWin(ttype, index, itemsIndex, isLeft) {
    var slideLeft = !isLeft ? 'right' : 'left';
    var tbData = tables[ttype][index + 1];
    tbData.itemindex = index + 1;

    createTableByType(tbData, ttype, index);

    $('.ui.message').data('type', ttype);
    $('.ui.message').data('direction', slideLeft);

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
        createBMapMarkers(tableName, index);
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
        case 'fire':
            return getFireTrTempl();
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
        case 'fire':
            return getFireTrTempl();
    }
}

/**
 * 根据表格模板填充表格
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
function createTableByType(data, type, index) {
    var template = getTbTemplByType(type);
    Mustache.parse(template); // optional, speeds up future uses
    var tbHTML = Mustache.render(template, data);

    $('.right-Info-tbl.ui.message').empty().append(tbHTML);

    if (type == 'warnings') {
        bindInnerLinkEvent(index);
    }

    bindTableClickEvent();
}

//火警、主机报警、水源异常 分别 跳转至不同页面
function bindInnerLinkEvent(index) {
    switch (index) {
        case 0:
            $('.right-Info-tbl.ui.message table td u').empty().append('消防');
            break;
        case 1:
            $('.right-Info-tbl.ui.message table td u').empty().append('处理下发');
            $('.right-Info-tbl.ui.message table td u').on('click', function() {
                event.preventDefault();
                event.stopPropagation();
                window.location.href = "inspection-issued.html";
            });
            break;
        case 2:
            $('.right-Info-tbl.ui.message table td u').empty().append('查看');
            break;
    }
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
    });

    $('.ui.message table tbody tr .u-indoor').on('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        window.location.href = 'map-indoor.html';
    })
}

function getDetailsById(id, index, type) {
    let details = tableDetails[type][index];
    let info = _.find(details, (item) => {
        return ((type + '-' + item.unitNo) == id) || ((type + '-' + item.id) == id)
    });
    let wrapInfo = getWrappedGovermentInfo(info, type, index);
    return wrapInfo;
}

//单位所需的信息框文字
function getWrappedGovermentInfo(info, type, index) {
    var res = {
        title: (type == 'goverments' ? '单位详情' : '详细信息'),
        contents: []
    };
    for (var i in info) {
        var col = {};
        i == 'unitNo' ? (col.name = '单位编号') : (col.name = i);
        if (i == 'id')
            col.name = '编号';
        col.value = info[i];
        col.image = false;
        res.contents.push(col);
    }
    if (type == 'waters') {
        var lastcol = {};
        lastcol.image = true;
        switch (index.toString()) {
            case '1':
                lastcol.imgUrl = imgUrl + 'marker/water-shizheng.png';
                break;
            case '2':
                lastcol.imgUrl = imgUrl + 'marker/water-xiaofang.png';
                break;
            case '3':
                lastcol.imgUrl = imgUrl + 'marker/water-tianran.png';
                break;
        }
        res.contents.push(lastcol);
    }

    return res;
}

//设置window窗口位置
function changeMsgWinPositon(type, top) {
    var msgWin = $('.right-Info-tbl.ui.message');
    //右边
    if (type == 'left') {
        msgWin.css('right', "84px");
        msgWin.css('left', "auto");
    } else {
        msgWin.css('left', "84px");
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
function createBMapMarkers(ttype, k) {
    for (var j = 0, jlen = tables[ttype][k].list.length; j < jlen; j++) {
        var item = tables[ttype][k].list[j];
        var id = (ttype == 'goverments' ? item.unitNo : item.id);
        createDefaultMarker(item.lonlat, id, ttype, item.name, k);
    }
}
//ui items item-highligth-list   fitting item   ui inverted segment

//#leftBanner---item-normal-list---fitting


//echarts
function initEcharts1(container) {
    //初始化echarts
    var $one = echarts.init(container);
    //配置
    var options_one = {
        title: {
            text: "火警触发分片区统计对比图",
            x: "center",
            y: "top",
            textStyle: {
                fontSize: 14,
                color: "rgb(255, 255, 255)"
            }
        },
        tooltip: {
            trigger: "axis"
        },
        legend: {
            data: ["火警触发次数"],
            x: "center",
            y: "bottom",
            textStyle: {
                color: "rgb(255, 255, 255)"
            }
        },
        toolbox: {
            feature: {
                dataView: {
                    show: true,
                    readOnly: true
                },
                magicType: {
                    type: ["line", "bar"],
                    show: false
                }
            },
            show: true
        },
        calculable: true,
        xAxis: [{
            type: "category",
            data: ["乌鲁木齐东路", "乌鲁木齐西路", "团结街", "北京东路", "北京西路", "火车站"],
            axisLabel: {
                textStyle: {
                    color: "rgb(255, 255, 255)",
                    fontSize: 12
                }
            }
        }],
        yAxis: [{
            type: "value",
            axisLabel: {
                textStyle: {
                    color: "rgb(255, 255, 255)",
                    fontSize: 12
                }
            }
        }],
        series: [{
            name: "火警触发次数",
            type: "bar",
            data: [2, 4.9, 7, 23.2, 25.6, 76.7],
            itemStyle: {
                normal: {
                    color: "rgb(255, 255, 86)"
                }
            }
        }]
    };
    //声明使用
    $one.setOption(options_one);
}

function initEcharts2(container) {
    //初始化echarts
    var $two = echarts.init(container);
    //配置
    var options_two = {
        title: {
            text: "火警触发因素统计对比图",
            x: "center",
            textStyle: {
                color: "rgb(255, 255, 255)",
                fontSize: 14
            }
        },
        tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: "vertical",
            x: "left",
            data: ["火灾", "爆炸", "毒害", "环境污染", "其它"],
            textStyle: {
                color: "rgb(255, 255, 255)",
                fontSize: 12
            },
            y: "bottom"
        },
        toolbox: {
            show: true,
            feature: {
                dataView: {
                    show: true,
                    readOnly: true
                }
            }
        },
        calculable: true,
        series: [{
            name: "触发因素",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [{
                value: 335,
                name: "火灾"
            }, {
                value: 310,
                name: "爆炸"
            }, {
                value: 234,
                name: "毒害"
            }, {
                value: 135,
                name: "环境污染"
            }, {
                value: 1548,
                name: "其它"
            }],
            itemStyle: {
                normal: {
                    labelLine: {
                        show: true
                    }
                }
            }
        }]
    };
    //声明使用
    $two.setOption(options_two);
}

function initEcharts3(container) {
    //初始化echarts
    var $three = echarts.init(container);
    //配置
    var options_three = {
        title: {
            text: "某站点用户访问来源",
            x: "center",
            textStyle: {
                color: "rgb(255, 255, 255)",
                fontSize: 14
            }
        },
        tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: "vertical",
            x: "left",
            data: ["正常", "异常"],
            y: "bottom",
            textStyle: {
                color: "rgb(255, 255, 255)"
            }
        },
        toolbox: {
            feature: {
                dataView: {
                    show: true,
                    readOnly: true
                }
            },
            show: true
        },
        calculable: true,
        series: [{
            name: "数值",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [{
                value: 335,
                name: "正常"
            }, {
                value: 310,
                name: "异常"
            }]
        }]
    };
    //声明使用
    $three.setOption(options_three);
}
/*function initEcharts4(container) {
    //初始化echarts
    var $four = echarts.init(container);
    //配置
    var options_four = {
            title: {
                text: "巡检损坏数对比图",
                x: "center",
                y: "top",
                textStyle: {
                    color: "rgb(255, 255, 255)",
                    fontSize: 14
                }
            },
            tooltip: {
                trigger: "axis"
            },
            legend: {
                data: ["数值"],
                x: "center",
                y: "bottom",
                textStyle: {
                    color: "rgb(255, 255, 255)",
                    fontSize: 12
                }
            },
            toolbox: {
                feature: {
                    mark: {
                        show: true
                    },
                    dataView: {
                        show: true,
                        readOnly: true
                    },
                    magicType: {
                        show: false,
                        type: ["line", "bar"]
                    },
                    restore: {
                        show: true
                    },
                    saveAsImage: {
                        show: true
                    }
                }
            },
            calculable: true,
            xAxis: [
                {
                    type: "category",
                    data: ["报警系统", "水系统", "电气系统", "灭火器具", "监控视频"],
                    axisLabel: {
                        textStyle: {
                            color: "rgb(255, 255, 255)",
                            fontSize: 12
                        }
                    }
                }
            ],
            yAxis: [
                {
                    type: "value",
                    axisLabel: {
                        textStyle: {
                            color: "rgb(255, 255, 255)",
                            fontSize: 12
                        }
                    }
                }
            ],
            series: [
                {
                    name: "数值",
                    type: "bar",
                    data: [2, 4.9, 7, 23.2, 25.6],
                    itemStyle: {
                        normal: {
                            color: "rgb(86, 255, 255)"
                        }
                    }
                }
            ]
        };
    //声明使用
    $four.setOption(options_four);
}*/
function initEcharts5(container) {
    //初始化echarts
    var $five = echarts.init(container);
    //配置
    var options_five = {
        title: {
            text: "消防主机报警趋势对比图",
            x: "center",
            textStyle: {
                fontSize: 14,
                color: "rgb(255, 255, 255)",
                fontStyle: "normal"
            }
        },
        tooltip: {
            trigger: "axis"
        },
        legend: {
            data: ["本月", "上月"],
            selectedMode: "multiple",
            x: "center",
            y: "bottom",
            textStyle: {
                fontSize: 12,
                fontStyle: "normal",
                color: "rgb(255, 255, 255)"
            }
        },
        toolbox: {
            feature: {
                dataView: {
                    show: true,
                    readOnly: true
                },
                magicType: {
                    type: ["line", "bar", "stack", "tiled"],
                    show: false
                }
            },
            show: true
        },
        calculable: true,
        xAxis: [{
            type: "category",
            boundaryGap: false,
            data: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"],
            nameTextStyle: {
                color: "rgb(255, 255, 255)"
            },
            axisLabel: {
                textStyle: {
                    color: "rgb(255, 255, 255)",
                    fontSize: 12
                }
            }
        }],
        yAxis: [{
            type: "value",
            axisLabel: {
                textStyle: {
                    color: "rgb(255, 255, 255)",
                    fontSize: 12
                }
            }
        }],
        series: [{
            name: "本月",
            type: "line",
            itemStyle: {
                normal: {
                    areaStyle: {
                        type: "default"
                    },
                    color: "rgb(86, 255, 255)"
                }
            },
            data: [20, 40, 60, 80, 100, 120, 140, 160, 150, 140, 130, 120, 110, 100, 80, 60, 40, 80, 120, 160, 130, 100, 70, 90, 80, 100, 90, 50, 40, 30],
            smooth: true
        }, {
            name: "上月",
            type: "line",
            itemStyle: {
                normal: {
                    areaStyle: {
                        type: "default"
                    },
                    color: "rgb(255, 255, 255)"
                }
            },
            data: [20, 50, 90, 90, 110, 130, 150, 170, 160, 150, 140, 130, 90, 80, 80, 90, 100, 60, 100, 140, 110, 80, 90, 110, 100, 120, 110, 70, 60, 70],
            smooth: true
        }],
        grid: {
            backgroundColor: "rgba(0, 0, 0, 0)"
        }
    };
    //声明使用
    $five.setOption(options_five);
}

function initEcharts6(container) {
    //初始化echarts
    var $six = echarts.init(container);
    //配置
    var options_six = {
        title: {
            text: "消防主机报警发生时段占比图",
            textStyle: {
                fontSize: 14,
                fontStyle: "normal",
                color: "rgb(255, 255, 255)"
            },
            x: "center"
        },
        tooltip: {
            trigger: "axis"
        },
        legend: {
            data: ["报警次数"],
            selectedMode: "multiple",
            x: "center",
            y: "bottom",
            textStyle: {
                color: "rgb(255, 255, 255)"
            }
        },
        toolbox: {
            show: true,
            feature: {
                dataView: {
                    show: true,
                    readOnly: true
                },
                magicType: {
                    type: ["line", "bar"],
                    show: false
                }
            }
        },
        calculable: true,
        xAxis: [{
            type: "category",
            data: ["0:00-3:00", "3:00-6:00", "6:00-9:00", "9:00-12:00", "12:00-15:00", "15:00-18:00", "18:00-21:00", "21:00-0:00"],
            nameTextStyle: {
                fontSize: 12
            },
            axisLabel: {
                textStyle: {
                    color: "rgb(255, 255, 255)",
                    fontSize: 12
                }
            }
        }],
        yAxis: [{
            type: "value",
            axisLabel: {
                textStyle: {
                    color: "rgb(255, 255, 255)",
                    fontSize: 12
                }
            }
        }],
        series: [{
            name: "报警次数",
            type: "bar",
            data: [33, 21, 177, 341, 355, 201, 199, 49],
            itemStyle: {
                normal: {
                    color: "rgb(86, 255, 255)"
                }
            }
        }]
    };
    //声明使用
    $six.setOption(options_six);
}