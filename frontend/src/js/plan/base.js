/**
 * [页面载入初始方法]
 * @param  {[type]} ) {}          [description]
 * @return {[type]}   [description]
 */

var goverment = [];
var curPage = '';

$(document).ready(function() {
    //creatMap('b-Map');
    curPage = getPageUrl();
    getPageMenu(curPage);

    //搜索框的淡入淡出
    $('#leftBanner .menu>.item:eq(0)').on('click', function() {
        $('.side-search').transition('slide right');
    });
});

//获取当前页面属于哪个地图页面
function getPageUrl() {
    var href = window.location.href,
        start = href.indexOf('plan-'),
        end = href.indexOf('.html');
    if (start > 0) {
        return href.substring(start + 5, end);
    }

    return '';
}

/**
 * [getPageMenu 获取页面界面配置的json]
 * @param  {[type]} pagename [description]
 * @return {[type]}          [description]
 */
function getPageMenu(pagename) {
    var fileName = pagename + '_menus.json';
    var url = dataUrl + 'plan/' + pagename + '/' + fileName;
    $.getJSON(url, function(result) {
        var title = result.head;
        initHeader(title);
        initPlanType(result);
        initCaseType(result);
        initMakeDate(result);
        initTableData(result);
        initLeftBanner(result);
        bindBannerEvent();

        let collection = result.tableData; //获取json数据所有集合

        /*点击搜索*/
        $('#search').blur(function() {
            let val = $(this).val();
            let a = _.filter(collection, function(item) {
                return item.class == val || item.auditor == val || item.Numbering == val || item.obj == val;
            });
            console.log(a);
            console.log(result);
            //$('#tbody').detach();
        });
    });
}


//模板化header
function initHeader(title) {
    var template = getHeaderTempl();
    Mustache.parse(template); // optional, speeds up future uses
    var headerHTML = Mustache.render(template, {
        head: title
    });
    $("body>header").empty().append(headerHTML);
}


//预案类型
function initPlanType(plantype) {
    var templ = getPlanType();
    Mustache.parse(templ);
    var planTypeHTML = Mustache.render(templ, plantype);
    $('#planType').append(planTypeHTML);
}

//案情类型
function initCaseType(casetype) {
    var templ = getcaseType();
    Mustache.parse(templ);
    var caseTypeHTML = Mustache.render(templ, casetype);
    $('#caseType').append(caseTypeHTML);
}

//制作时间
function initMakeDate(makedate) {
    var templ = getmakeDate();
    Mustache.parse(templ);
    var makeDateHTML = Mustache.render(templ, makedate);
    $('#makeDate').append(makeDateHTML);
}

//表格填充
function initTableData(tableData) {
    var temp1 = getTableData();
    Mustache.parse(temp1);
    var tableDataHTML = Mustache.render(temp1, tableData);
    $('#tbody').append(tableDataHTML);

    $('#tbody tr').on('click', function() {
        window.location.href = "plan-detail.html";
    })
}

//左边栏
function initLeftBanner(leftMenu) {
    //var templ = $('#template').html();
    var templ = getLeftMenu();
    Mustache.parse(templ); // optional, speeds up future uses
    var leftBannerHTML = Mustache.render(templ, leftMenu);
    $('#leftBanner .ui.menu').append(leftBannerHTML);
}


//左右模块的收缩交互
function bindBannerEvent() {
    $('.ui.menu>.item:eq(0)').on('click', function() {
        if (curPage == 'power') {
            window.open('plan-list.html', '_blank');
        } else window.location.href = 'plan-list.html';
    });

    $('.ui.menu>.item[data-toggle="items"]').on('click', function() {
        let index = $(this).data("itemsindex");
        $('.ui .items:eq(' + index + ')').transition('slide down');
    });
}

//点击切换流程顺序
$('.banner-content .plan_process>.process>li:not(:first)').click(function() {
    //获取当前li在所有li中的索引值
    var index = $.inArray(this, $('.banner-content .plan_process>.process>li:not(:first)'));
    //准确获取对应的div
    var $divs = $(".banner-content .process_detail>div"); //数组对象
    //根据索引值查找对应的div
    var $div = $divs.eq(index);
    //将对应的div显示，其它兄弟元素隐藏
    $div.show();
    $div.siblings("div").hide();

    //切换地图
    if (index == 0 || index == 2 || index == 3) {
        $('.process_detail>.one>table:nth-child(2)>thead>tr').trigger('click');
    } else if (index == 1) {
        $('#bushu-btn').trigger('click');
    } else if (index == 4) {
        $('#combat').trigger('click');
    }
});

//点击切换地图
$('.process_detail>.one>table:nth-child(2)>thead>tr,#rightBanner>.ui>a:nth-child(2)>div').click(function() {
    var index = $.inArray(this, $('#map_wrapper>.city'));
    var $maps = $("#map_wrapper>.city");
    var $map = $maps.eq(index);
    $map.show();
    $map.siblings("div").hide();
});
$('.process_detail>.one>table:nth-child(4)>thead>tr,#rightBanner>.ui>a:nth-child(3)>div').click(function() {
    var index = $.inArray(this, $('#map_wrapper>.outdoor'));
    var $maps = $("#map_wrapper>.outdoor");
    var $map = $maps.eq(index);
    $map.show();
    if ($('#map2').find('iframe').attr("src") == "") {
        $('#map2').find('iframe').attr("src", 'mapArea.html');
    }
    $map.siblings("div").hide();
});
$('.process_detail>.one>table:nth-child(6)>thead>tr,#rightBanner>.ui>a:nth-child(4)>div').click(function() {
    var index = $.inArray(this, $('#map_wrapper>.indoor'));
    var $maps = $("#map_wrapper>.indoor");
    var $map = $maps.eq(index);
    $map.show();
    if ($('#map3').find('iframe').attr("src") == "") {
        $('#map3').find('iframe').attr("src", 'mapIndoor.html');
    }
    $map.siblings("div").hide();
});
/*第三步点击切换地图*/
$('#watch_outside').click(function() {
    var index = $.inArray(this, $('#map_wrapper>.outdoor'));
    var $maps = $("#map_wrapper>.outdoor");
    var $map = $maps.eq(index);
    $map.show();
    if ($('#map2').find('iframe').attr("src") == "") {
        $('#map2').find('iframe').attr("src", 'mapArea.html');
    }
    $map.siblings("div").hide();
});
$('#watch_indoor').click(function() {
    var index = $.inArray(this, $('#map_wrapper>.indoor'));
    var $maps = $("#map_wrapper>.indoor");
    var $map = $maps.eq(index);
    $map.show();
    if ($('#map3').find('iframe').attr("src") == "") {
        $('#map3').find('iframe').attr("src", 'mapIndoor.html');
    }
    $map.siblings("div").hide();
});
/*第四步点击切换地图*/
$('#four_outside').click(function() {
    var index = $.inArray(this, $('#map_wrapper>.outdoor'));
    var $maps = $("#map_wrapper>.outdoor");
    var $map = $maps.eq(index);
    $map.show();
    if ($('#map2').find('iframe').attr("src") == "") {
        $('#map2').find('iframe').attr("src", 'mapArea.html');
    }
    $map.siblings("div").hide();
});
$('#four_indoor').click(function() {
    var index = $.inArray(this, $('#map_wrapper>.indoor'));
    var $maps = $("#map_wrapper>.indoor");
    var $map = $maps.eq(index);
    $map.show();
    if ($('#map3').find('iframe').attr("src") == "") {
        $('#map3').find('iframe').attr("src", 'mapIndoor.html');
    }
    $map.siblings("div").hide();
});
/*第五步切换作战地图*/
$('#combat').click(function() {
    var index = $.inArray(this, $('#map_wrapper>.indoor-zuozhan'));
    var $maps = $("#map_wrapper>.indoor-zuozhan");
    var $map = $maps.eq(index);
    $map.show();
    if ($('#map5').find('iframe').attr("src") == "") {
        $('#map5').find('iframe').attr("src", 'yuanyanshi/index.html');
    }
    $map.siblings("div").hide();
});

//查看部署地图
$('#bushu-btn').click(function() {
    var index = $.inArray(this, $('#map_wrapper>.indoor-bushu'));
    var $maps = $("#map_wrapper>.indoor-bushu");
    var $map = $maps.eq(index);
    $map.show();
    if ($('#map4').find('iframe').attr("src") == "") {
        $('#map4').find('iframe').attr("src", 'mapArea.html?m=bushu');
    }
    $map.siblings("div").hide();
});

//查看指挥网络
$('.ui.table.two_two .center-th').on('click', function() {
    var index = 4;
    var $maps = $("#map_wrapper .map-container").hide();
    var $map = $("#map_wrapper .map-container.zhihui");
    $map.show();
});

//查看疏散路线
$('.ui.table.three_three .center-td').on('click', function() {
    var index = $.inArray(this, $('#map_wrapper>.indoor'));
    var $maps = $("#map_wrapper>.indoor");
    var $map = $maps.eq(index);
    $map.show();
    if ($('#map3').find('iframe').attr("src") == "") {
        $('#map3').find('iframe').attr("src", 'mapIndoor.html');
    }
    $map.siblings("div").hide();
});

//室内轨迹回放
$('.indoor-route').on('click', function() {
    if ($(this).hasClass('active')) {
        window.frames["mapIndoorIframe"].contentWindow.clearNavi();
        $(this).removeClass('active');
    } else {
        window.frames["mapIndoorIframe"].contentWindow.drawRouteLines();
        $(this).addClass('active');
    }
});