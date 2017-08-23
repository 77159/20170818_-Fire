//获取政府单位的表格html
function getGovermentTableTempl() {
	var tblTmpl = '<i class="close icon"></i>' + '<div class="ui relaxed horizontal list header">' + '<div class="item">{{title}}</div>' + '<div class="item">' + '<div class="ui transparent left icon input inverted">' + '<input type="text" placeholder="输入关键词搜索">' + '<i class="search icon"></i>' + '</div></div></div>' + '<table class="ui very basic selectable table inverted" data-itemIndex={{itemindex}} data-type="goverments">' + '<thead><tr>' + '<th class="goverments-table-width">{{columns.one}}</th><th class="goverments-table-width2">{{columns.two}}</th>' + '<th class="right aligned goverments-table-width2">{{columns.three}}</th>' + '</tr>' + '</thead>' + '<tbody>' + getGovermentTrTempl() + '</tbody>' + '</table>';
	return tblTmpl;
}

//获取政府表格列表模板
function getGovermentTrTempl() {
	return '{{#list}}' + '<tr data-lonlat="{{lonlat}}" data-id="{{unitNo}}">' + '<td class="goverments-table-width goverments-width">{{name}}</td>' + '<td class="goverments-table-width2">{{unitType}}</td>' + '<td class="goverments-table-width2 goverments-right">{{status}}</td>' + '</tr>' + '{{/list}}';
}

//获取政府单位的表格html
function getWaterTableTempl() {
	var tblTmpl = '<i class="close icon"></i>' + '<div class="ui relaxed horizontal list header">' + '<div class="item">{{title}}</div>' + '<div class="item">' + '<div class="ui transparent left icon input inverted">' + '<input type="text" placeholder="输入关键词搜索">' + '<i class="search icon"></i>' + '</div></div></div>' + '<table class="ui very basic selectable table inverted" data-itemIndex={{itemindex}} data-type="waters">' + '<thead><tr>' + '<th class="goverments-table-width">{{columns.one}}</th><th class="goverments-table-width2">{{columns.two}}</th>' + '<th class="right aligned goverments-table-width2">{{columns.three}}</th>' + '</tr>' + '</thead>' + '<tbody>' + getWaterTrTempl() + '</tbody>' + '</table>';
	return tblTmpl;
}

//获取水源表格列表模板
function getWaterTrTempl() {
	return '{{#list}}' + '<tr data-lonlat="{{lonlat}}" data-id="{{id}}">' + '<td class="goverments-table-width goverments-width">{{name}}</td>' + '<td class="goverments-table-width2">{{presure}}</td>' + '<td class="goverments-table-width2 right aligned"><u>照片</u></td>' + '</tr>' + '{{/list}}';
}


// todo 获取火警模版
function getFireTrTempl() {
	return '<i class="close icon"></i>' + '<div class="ui relaxed horizontal list header">' + '<div class="item">{{title}}</div></div><div class="static-content">{{content}}</div><div class="static-content">{{content}}</div></div>';
}

//获取政府单位的表格html
function getPowerTableTempl() {
	var tblTmpl = '<i class="close icon"></i>' + '<div class="ui relaxed horizontal list header">' + '<div class="item">{{title}}</div>' + '<div class="item">' + '<div class="ui transparent left icon input inverted">' + '<input type="text" placeholder="输入关键词搜索">' + '<i class="search icon"></i>' + '</div></div></div>' + '<table class="ui very basic selectable table inverted" data-itemIndex={{itemindex}} data-type="powers">' + '<thead><tr>' + '<th class="goverments-table-width4">{{columns.one}}</th><th class="goverments-table-width4 goverments-table-width3-center">{{columns.two}}</th><th class="goverments-table-width4 goverments-table-width3-center">{{columns.three}}</th>' + '<th class="right aligned goverments-table-width4 goverments-table-width3-center">{{columns.four}}</th>' + '</tr>' + '</thead>' + '<tbody>' + getPowerTrTempl() + '</tbody>' + '</table>';
	return tblTmpl;
}

//获取消防力量tr列表模板
function getPowerTrTempl() {
	return '{{#list}}' + '<tr data-lonlat="{{lonlat}}" data-id="{{id}}">' + '<td class="goverments-table-width4">{{name}}</td>' + '<td class="goverments-table-width4 goverments-table-width3-center">{{cars}}</td><td class="goverments-table-width4 goverments-table-width3-center">{{person}}</td>' + '<td class="goverments-table-width4 goverments-table-width3-center">{{status}}</td>' + '</tr>' + '{{/list}}';
}

//获取政府单位的表格html
function getWarningTableTempl() {
	var tblTmpl = '<i class="close icon"></i>' + '<div class="ui relaxed horizontal list header">' + '<div class="item">{{title}}</div>' + '<div class="item">' + '<div class="ui transparent left icon input inverted">' + '<input type="text" placeholder="输入关键词搜索">' + '<i class="search icon"></i>' + '</div></div></div>' + '<table class="ui very basic selectable table inverted" data-itemIndex={{itemindex}} data-type="warnings">' + '<thead><tr>' + '<th class="goverments-table-width4">{{columns.one}}</th><th class="goverments-table-width4 goverments-table-width3-center">{{columns.two}}</th><th class="goverments-table-width5 goverments-table-width3-center">{{columns.three}}</th>' + '<th class="right aligned goverments-table-width5 goverments-table-width3-center">{{columns.four}}</th>' + '</tr>' + '</thead>' + '<tbody>' + getWarningTrTempl() + '</tbody>' + '</table>';
	return tblTmpl;
}

//政府单位的表格
function getWarningTrTempl() {
	return '{{#list}}<tr data-lonlat="{{lonlat}}" data-id="{{id}}">' + '<td class="goverments-table-width4">{{time}}</td>' + '<td class="goverments-table-width4 goverments-table-width3-center">{{name}}</td><td class="goverments-table-width5">{{type}}</td>' + '<td class="center aligned goverments-table-width5"><u >消防指挥</u></td>' + '</tr>' + '{{/list}}';
}

//gov 单位
function getMarkerContentTempl() {
	var sContent = "<div class='pop-content' ><h4>{{title}}</h4><div class='pop-content-box'>{{#contents}}<div class='pop-content-list'><span class='pop-name'>{{name}}</span><span class='pop-line'>|</span><span class='pop-value'>{{value}}</span></div>{{/contents}}</div><div class='pop-content-btn-box'><button type='button'>周边地图 </button> <button type='button'>室内地图</button></div></div>";
	return sContent;
}

function getWaterMarkerContentTempl() {
	var sContent = "<div class='pop-content' ><h4>{{title}}</h4><div class='pop-content-box'>{{#contents}}{{#image}}<img src='{{imgUrl}}' />{{/image}}{{^image}}<div class='pop-content-list'><span  class='pop-name'>{{name}}  </span><span class='pop-line'>|</span><span class='pop-value'>{{value}}</span></div>{{/image}}{{/contents}}</div><div class='pop-content-btn-box'></div></div>";
	return sContent;
}

function getPowerMarkerContentTempl() {
	var sContent = "<div class='pop-content' ><h4>{{title}}</h4><div class='pop-content-box'>{{#contents}}<div class='pop-content-list'><span  class='pop-name'>{{name}}  </span><span class='pop-line'>|</span><span class='pop-value'> {{value}}</span></div>{{/contents}}</div><div class='pop-content-btn-box'><button type='button'>周边地图 </button> <button type='button'>室内地图</button></div></div>";
	return sContent;
}

function getWarnMarkerContentTempl() {
	var sContent = "<div class='pop-content' ><h4>{{title}}</h4><div class='pop-content-box'>{{#contents}}<div class='pop-content-list'><span class='pop-name'>{{name}}  </span><span class='pop-line'>|</span><span class='pop-value'> {{value}}</span></div>{{/contents}}</div><div class='pop-content-btn-box'><button type='button'>周边地图 </button> <button type='button'>室内地图</button> </div></div>";
	return sContent;
}