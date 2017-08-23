//获取各系统的表格html
function getGovermentTableTempl() {
	var tblTmpl = '<i class="close icon"></i>' + '<div class="ui relaxed horizontal list header">' + '<div class="item">{{title}}</div>' + '<div class="item">' + '<div class="ui transparent left icon input inverted">' + '<input type="text" placeholder="输入关键词搜索">' + '<i class="search icon"></i>' + '</div></div></div>' + '<table class="ui very basic selectable table inverted" data-itemIndex={{itemindex}} data-type="goverments">' + '<thead><tr>' + '<th class="goverments-table-width4 goverments-table-width3-center">{{columns.one}}</th><th class="goverments-table-width4 goverments-table-width3-center">{{columns.two}}</th>' + '<th class="goverments-table-width4 goverments-table-width3-center">{{columns.three}}</th>' + '</tr>' + '</thead>' + '<tbody>' + getGovermentTrTempl() + '</tbody>' + '</table>';
	return tblTmpl;
}

//获取查看视频列表模板
function getGovermentTrTempl() {
	return '{{#list}}' + '<tr data-lonlat="{{lonlat}}" data-id="{{id}}">' + 
	'<td class="goverments-table-width4 goverments-table-width3-center">{{name}}</td>' + 
	'{{^video}}<td class="goverments-table-width4 goverments-table-width3-center">{{data}}</td>{{/video}}{{#video}}<td class="video goverments-right goverments-table-width3-center" data-id={{id}}><u class="video-btn">查看</u></td>{{/video}}' 
	+ '<td class="right aligned goverments-table-width4 goverments-table-width3-center">{{status}}</td>' + '</tr>' + '{{/list}}';
}

//获取查看视频列表模板
function getVideoTrTempl() {
	return '{{#list}}' + '<tr data-lonlat="{{lonlat}}" data-id="{{id}}">' + 
	'<td class="goverments-table-width4 goverments-table-width3-center">{{id}}</td><td class="goverments-table-width4 goverments-table-width3-center">{{name}}</td><td class="goverments-table-width4 goverments-table-width3-center">{{floor}}</td></tr>' + '{{/list}}';
}

function getMarkerContentTempl() {
	var sContent = "<div class='infoBox'><img src='close.png'/><div class='pop-content' ><h4>{{title}}</h4><div class='pop-content-box'>{{#contents}}<div class='pop-content-list'><span  class='pop-name'>{{name}}  </span><span class='pop-line'>|</span><span class='pop-value'>{{value}}</span></div>{{/contents}}</div></div></div>";
	return sContent;
}

//获取警告的表格html
function getWarningTableTempl() {
	var tblTmpl = '<i class="close icon"></i>' + '<div class="ui relaxed horizontal list header">' + '<div class="item">{{title}}</div>' + '<div class="item">' + '<div class="ui transparent left icon input inverted">' + '<input type="text" placeholder="输入关键词搜索">' + '<i class="search icon"></i>' + '</div></div></div>' + '<table class="ui very basic selectable table inverted" data-itemIndex={{itemindex}} data-type="warnings">' + '<thead><tr>' + '<th class="goverments-table-width6 goverments-table-width3-center">{{columns.one}}</th><th class="goverments-table-width6 goverments-table-width3-center">{{columns.two}}</th>' + '<th class="right aligned goverments-table-width5 goverments-table-width3-center">{{columns.three}}</th>' + '</tr>' + '</thead>' + '<tbody>' + getWarningTrTempl() + '</tbody>' + '</table>';
	return tblTmpl;
}

//政府单位的表格
function getWarningTrTempl() {
	return '{{#list}}<tr data-lonlat="{{lonlat}}" data-id="{{id}}">' + '<td class="goverments-table-width6 goverments-table-width3-center">{{time}}</td>' + '<td class="goverments-table-width6 goverments-table-width3-center">{{name}}</td>' + '<td class="right aligned goverments-table-width5 goverments-table-width3-center">{{type}}</td>' + '</tr>' + '{{/list}}';
}