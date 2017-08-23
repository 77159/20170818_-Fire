/**
 * [模板页面]
 * @return {[type]} [description]
 */
function getHeaderTempl() {
    var headerTempl = '<div class="ui label large left">奎屯市<div class="detail">{{head}}</div></div><a class="ui label large float-right" href="index.html"> 返回主菜单 </a>';
    return headerTempl;
}

/*预案类型*/
function getPlanType() {
    var planType = '<select class="ui dropdown">' + '<option value="">请选择预案类型</option>' + '{{#planTypeData}} <option value="{{id}}">{{name}}</option> {{/planTypeData}}' + '</select>';
    return planType;
}

/*案情类型*/
function getcaseType() {
    var caseType = '<select class="ui dropdown">' + '<option value="">请选择案情类型</option>' + '{{#caseTypeData}} <option value="{{id}}">{{name}}</option> {{/caseTypeData}}' + '</select>';
    return caseType;
}

/*制作时间*/
function getmakeDate() {
    var makeDate = '<select class="ui dropdown">' + '<option value="">请选择制作时间</option>' + '{{#makeDate}} <option value="{{id}}">{{name}}</option> {{/makeDate}}' + '</select>';
    return makeDate;
}

/*表格填充*/
function getTableData() {
    var tableData = '{{#tableData}}' + '<tr class="tr">' + '<td class="tr-td-nopadding">{{numbering}}</td>' + '<td class="tr-td-nopadding">{{type}}</td>' + '<td class="tr-td-nopadding">{{obj}}</td>' + '<td class="tr-td-nopadding">{{class}}</td>' + '<td class="tr-td-nopadding">{{data}}</td>' + '<td class="tr-td-nopadding">{{auditor}}</td>' + '<td class="tr-td-nopadding">{{change}}</td>' + '</tr>' + '{{/tableData}}';
    return tableData;
}

//左侧菜单
function getLeftMenu() {
    var leftTempl = '{{#leftBanner}} <a class = "item"	data-toggle = "items" data-itemsindex = "{{itemsindex}}" data-type="{{type}}">' + '<div class="ui segment">' + '<h3>{{text}}</h3>' + '<h3>{{subtext}}</h3>' + '</div> </a>' + '{{#itemshighlight}} <div class="ui items item-highligth-list"> {{/itemshighlight}}' + '{{^itemshighlight}} {{^folder}} <div class="ui items transition visible item-normal-list"> {{/folder}} {{#folder}} <div class="ui items transition hidden item-normal-list"> {{/folder}} {{/itemshighlight}} ' + '{{#content}}' + '<a href="plan-detail.html" class="fitting item" data-itemsindex = "{{itemsindex}}" data-type="{{type}}">' + '<div class="ui inverted segment">' + '<p>{{name}}</p>' + '<h4 class="ui header">{{total}}</h4>' + '</div>' + '</a>' + '{{/content}}' + '</div>' + '{{/leftBanner}}';
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