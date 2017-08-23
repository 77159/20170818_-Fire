//点击切换表格显示隐藏
$('#button').click(function(event) {
    event.stopPropagation(); //停止事件冒泡
    $(".hide").toggle();
    $('.mask').show();
});
$('.cancel').click(function(event) {
    event.stopPropagation(); //停止事件冒泡
    $(".hide").hide();
    $(".hide2").hide();
    $('.mask').hide();
});

//下发规则页面
$('#files-list .content_detail .button_issued2').click(function() {
    event.stopPropagation(); //停止事件冒泡
    $(".hide").toggle();
    $('.mask').show();
});
/*点击显示图片*/
$('.five_left1 #tbody tr:eq(0)').click(function() {
    $('.five_left2 img:eq(0)').show();
    $('.five_left2 img:eq(1)').hide();
});
$('.five_left1 #tbody tr:eq(1)').click(function() {
    $('.five_left2 img:eq(0)').hide();
    $('.five_left2 img:eq(1)').show();
});


$(document).ready(function() {
    //室内marekr的显示和隐藏
    $('.indoor-marker').on('click', function() {
        var type = $(this).data('type'),
            index = $(this).data('index');
        if ($(this).hasClass('active')) {
            window.frames["mapIndoorIframe"].contentWindow.setMarkersVisible(type, index, false);
            $(this).removeClass('active');
        } else {
            window.frames["mapIndoorIframe"].contentWindow.setMarkersVisible(type, index, true);
            $(this).addClass('active');
        }
    });

    //室内轨迹回放
    $('.indoor-route').on('click', function() {
        if ($(this).hasClass('active')) {
            window.frames["mapIndoorIframe"].contentWindow.stopNavi();
            $(this).removeClass('active');
        } else {
            window.frames["mapIndoorIframe"].contentWindow.startNavi();
            $(this).addClass('active');
        }
    });

    $('.container-center .ui.sidebar.menu .item .ui.segment').on('click', function() {
        window.location.href = 'inspection-recording.html';
    });
});



/*//点击其它区域表格隐藏
$('body').click(function (event) {
    var _hide = $('.hide');//设置目标区域
    if (!_hide.is(event.target) && _hide.has(event.target).length == 0) {
        $(".hide").hide();
    }
});*/

/*
handleInputEvent(itemsIndex, index + 1, ttype); //搜索

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
*/