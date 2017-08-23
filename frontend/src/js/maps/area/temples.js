//获取建筑物的表格html
function getBuildsTableTempl() {
	var tblTmpl = '<i class="close icon"></i>' + '<div class="ui relaxed horizontal list header">' + '<div class="item">{{title}}</div>' + '<div class="item">' + '<div class="ui transparent left icon input inverted">' + '<input type="text" placeholder="输入关键词搜索">' + '<i class="search icon"></i>' + '</div></div></div>' + '<table class="ui very basic selectable table inverted" data-itemIndex={{itemindex}} data-type="goverments">' + '<thead><tr>' + '<th class="goverments-table-width4 goverments-table-width3-center">{{columns.one}}</th><th class="goverments-table-width4 goverments-table-width3-center">{{columns.two}}</th>' + '<th class="right aligned goverments-table-width4 goverments-table-width3-center">{{columns.three}}</th>' + '</tr>' + '</thead>' + '<tbody>' + getBuildsTrTempl() + '</tbody>' + '</table>';
	return tblTmpl;
}

//获取建筑物表格列表模板
function getBuildsTrTempl() {
	return '{{#list}}' + '<tr data-lonlat="{{lonlat}}" data-id="{{id}}">' + '<td class="goverments-table-width4 goverments-table-width3-center">{{name}}</td>' + '<td class="goverments-table-width4 goverments-table-width3-center">{{area}}</td>' + '<td class="right aligned goverments-table-width4 goverments-table-width3-center">{{status}}</td>' + '</tr>' + '{{/list}}';
}

//获取建筑物的表格html
function getFireResourcesTableTempl() {
	var tblTmpl = '<i class="close icon"></i>' + '<div class="ui relaxed horizontal list header">' + '<div class="item">{{title}}</div>' + '<div class="item">' + '<div class="ui transparent left icon input inverted">' + '<input type="text" placeholder="输入关键词搜索">' + '<i class="search icon"></i>' + '</div></div></div>' + '<table class="ui very basic selectable table inverted" data-itemIndex={{itemindex}} data-type="goverments">' + '<thead><tr><th class="goverments-table-width7 goverments-table-width3-center">{{columns.one}}</th><th class="right aligned goverments-table-width7 goverments-table-width3-center">{{columns.two}}</th>' + '</tr>' + '</thead>' + '<tbody>' + getFireResourcesTrTempl() + '</tbody>' + '</table>';
	return tblTmpl;
}

//获取建筑物表格列表模板
function getFireResourcesTrTempl() {
	return '{{#list}}' + '<tr data-lonlat="{{lonlat}}" data-id="{{id}}">' + '<td class="goverments-table-width7 goverments-table-width3-center">{{name}}</td><td class="right aligned right-watch-video goverments-table-width7 goverments-table-width3-center"><u data-video={{vidio}}>查看</u></td>' + '</tr>' + '{{/list}}';
}

//获取警告的表格html
function getWarningTableTempl() {
	var tblTmpl = '<i class="close icon"></i>' + '<div class="ui relaxed horizontal list header">' + '<div class="item">{{title}}</div>' + '<div class="item">' + '<div class="ui transparent left icon input inverted">' + '<input type="text" placeholder="输入关键词搜索">' + '<i class="search icon"></i>' + '</div></div></div>' + '<table class="ui very basic selectable table inverted" data-itemIndex={{itemindex}} data-type="warnings">' + '<thead><tr>' + '<th class="goverments-table-width4 goverments-table-width3-center">{{columns.one}}</th><th class="goverments-table-width4 goverments-table-width3-center">{{columns.two}}</th>' + '<th class="right aligned goverments-table-width4 goverments-table-width3-center">{{columns.three}}</th>' + '</tr>' + '</thead>' + '<tbody>' + getWarningTrTempl() + '</tbody>' + '</table>';
	return tblTmpl;
}

//政府单位的表格
function getWarningTrTempl() {
	return '{{#list}}<tr data-lonlat="{{lonlat}}" data-id="{{id}}">' + '<td class="goverments-table-width4 goverments-table-width3-center">{{time}}</td>' + '<td class="goverments-table-width4 goverments-table-width3-center">{{name}}</td>' + '<td class="right aligned goverments-table-width4 goverments-table-width3-center">{{type}}</td>' + '</tr>' + '{{/list}}';
}

// todo 获取火警模版
function getFireTrTempl() {
    return '<i class="close icon"></i>' + '<div class="ui relaxed horizontal list header">' + '<div class="item">{{title}}</div></div><div class="static-content">{{content}}</div><div class="static-content">{{content}}</div></div>';
}
