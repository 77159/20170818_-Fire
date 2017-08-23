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
		if ($(this).find('.ui.segment').hasClass('active')) {
			$(this).find('.ui.segment').removeClass('active');
			resetAllMarkersToDefault(); //清空地图高亮的图标
		} else {
			$(this).find('.ui.segment').addClass('active');
		}

		bindSearchInputEvent();
	});
});

//获取当前页面属于哪个地图页面
function getPageUrl() {
	var href = window.location.href,
		start = href.indexOf('inspection-'),
		end = href.indexOf('.html');
	if (start > 0) {
		return href.substring(start + 11, end);
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
	var url = dataUrl + 'inspection/' + pagename + '/' + fileName;
	$.getJSON(url, function(result) {
		var title = result.head;
		initHeader(title);
		initInspectionRule(result);
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

//左边栏
function initLeftBanner(leftMenu) {
	//var templ = $('#template').html();
	var templ = getLeftMenu();
	Mustache.parse(templ); // optional, speeds up future uses
	var leftBannerHTML = Mustache.render(templ, leftMenu);
	$('#leftBanner .ui.menu').append(leftBannerHTML);
}

//右边栏
function initRightBanner(rightMenu) {
	var templ = getRightMenu();
	Mustache.parse(templ); // optional, speeds up future uses
	var leftBannerHTML = Mustache.render(templ, rightMenu);
	$('#rightBanner .ui.vertical.menu').append(leftBannerHTML);
}

//inspection-rule.html---表格
function initInspectionRule(tableRule) {
	var temp1 = getInspectionRule();
	Mustache.parse(temp1);
	var tableRuleHTML = Mustache.render(temp1, tableRule);
	$('#tbody').append(tableRuleHTML);

	//-rule页面点击查看弹出表格
	$('#tbody tr td >.button_watch').click(function() {
		event.stopPropagation(); //停止事件冒泡
		$(".hide2").toggle();
		$('.mask').show();
	});
	$('.cancel').click(function(event) {
		event.stopPropagation(); //停止事件冒泡
		$(".hide2").hide();
		$('.mask').hide();
	});

	$('#tbody tr td >.button_edit').click(function() {
		event.stopPropagation(); //停止事件冒泡
		$(".hide").toggle();
		$('.mask').show();
	});
	$('.cancel').click(function(event) {
		event.stopPropagation(); //停止事件冒泡
		$(".hide").hide();
		$('.mask').hide();
	});
}

//左右模块的收缩交互
function bindBannerEvent() {
	$('.ui.menu>.item[data-toggle="items"]').on('click', function() {
		let index = $(this).data("itemsindex");
		$('.ui .items:eq(' + index + ')').transition('slide down');
	});
}