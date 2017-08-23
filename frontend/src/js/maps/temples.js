/**
 * [模板页面]
 * @return {[type]} [description]
 */
function getHeaderTempl() {
	var headerTempl = '<div class="ui label large left">奎屯市<div class="detail">{{head}}</div></div><a class="ui label large float-right" href="index.html"> 返回主菜单 </a>';
	return headerTempl;
}

//左侧菜单
function getLeftMenu() {
	var leftTempl = '{{#leftBanner}} <a class = "item"	data-toggle = "items" data-itemsindex = "{{itemsindex}}" data-type="{{type}}">' + '<div class="ui segment">' + '<h3>{{text}}</h3>' + '<h3>{{subtext}}</h3>' + '</div> </a>' + '{{#itemshighlight}} <div class="ui items item-highligth-list"> {{/itemshighlight}}' + '{{^itemshighlight}} {{^folder}} <div class="ui items transition visible item-normal-list"> {{/folder}} {{#folder}} <div class="ui items transition hidden item-normal-list"> {{/folder}} {{/itemshighlight}} ' + '{{#content}}' + '<a class="fitting item three_fire" data-itemsindex = "{{itemsindex}}" data-type="{{type}}">' + '<div class="ui inverted segment">' + '<p>{{name}}</p>' + '<h4 class="ui header">{{total}}</h4>' + '</div>' + '</a>' + '{{/content}}' + '</div>' + '{{/leftBanner}}';

	return leftTempl;
}

//右侧菜单
function getRightMenu() {
	var rightTempl = '{{#rightBanner}} <a class = "item" data-toggle = "items" data-itemsindex = "{{itemsindex}}" data-type="{{type}}">' + '<div class="ui segment">' + '<h3>{{text}}</h3>' + '<h3>{{subtext}}</h3>' + '</div> </a>' + '{{^folder}} <div class="ui items transition visible item-normal-list"> {{/folder}} {{#folder}} <div class="ui items transition hidden item-normal-list"> {{/folder}}' + '{{#content}}' + '<a class="fitting item" data-itemsindex = "{{itemsindex}}" data-type="{{type}}">' + '<div class="ui inverted segment">' + '<p>{{name}}</p>' + '<h4 class="ui header">{{total}}</h4>' + '</div>' + '</a>' + '{{/content}}' + '</div>' + '{{/rightBanner}}';
	return rightTempl;
}

//使用mustache渲染模板
function getParsedHTML(template, info, parentDiv) {
	Mustache.parse(template); // optional, speeds up future uses
	var headerHTML = Mustache.render(template, info);
	if (parentDiv)
		parentDiv.empty().append(headerHTML);
	return headerHTML;
}

//map-area.html部分的返回全市地图按钮模板  左侧
function getLeftMenuBack() {
	var leftTemplBack = ' <a class = "item left-templ-back" href="map-outside.html">' + '<div class="ui segment">' + '<h3 class="left-back">返回全市地图</h3>' + '</div> </a> ';
	return leftTemplBack;
}

