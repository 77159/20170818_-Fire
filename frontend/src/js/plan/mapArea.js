var fmap;
var fmapID = 'kt02',
	isMarkerLoaded = {
		"builds": {
			"3": false,
			"4": false
		},
		"resources": {
			"1": false,
			"2": false,
			"3": false
		}
	};
var cars = [{
	"name": "登高平台车",
	"video": "",
	"lonlat": "9451656.99582,5531424.96428,1",
	"id": "1"
}, {
	"name": "登高平台车",
	"video": "",
	"lonlat": "9451684.38025,5531418.61427,1",
	"id": "1"
}, {
	"name": "登高平台车",
	"video": "",
	"lonlat": "9451683.5865,5531398.37361,1",
	"id": "1"
}, {
	"name": "高喷消防车",
	"video": "",
	"lonlat": "9451683.18962,5531376.14856,1",
	"id": "2"
}, {
	"name": "高喷消防车",
	"video": "",
	"lonlat": "9451679.61774,5531353.92352,1",
	"id": "2"
}, {
	"name": "供水消防车",
	"video": "",
	"lonlat": "9451620.08637,5531351.93914,1",
	"id": "3"
}, {
	"name": "供水消防车",
	"video": "",
	"lonlat": "9451538.32996,5531358.68603,1",
	"id": "3"
}, {
	"name": "供水消防车",
	"video": "",
	"lonlat": "9451505.38927,5531391.22984,1",
	"id": "3"
}, {
	"name": "中低压泵水罐车",
	"video": "",
	"lonlat": "9451515.31116,5531436.07681,1",
	"id": "4"
}, {
	"name": "中低压泵水罐车",
	"video": "",
	"lonlat": "9451581.19254,5531343.60475,1",
	"id": "4"
}, {
	"name": "供水消防车",
	"video": "",
	"lonlat": "9451520.07367,5531349.16101,1",
	"id": "4"
}, {
	"name": "中队指挥",
	"video": "",
	"lonlat": "9451655.80519,5531334.87348,1",
	"id": "5"
}];

var tableMarkers = {
	"builds": {
		"3": [{
			"name": "主出入口A",
			"video": "",
			"lonlat": "9451504.6059,5531416.5209,1",
			"id": "KTZB-04-0001"
		}],
		"4": [{
			"name": "消防疏散通道A",
			"video": "",
			"lonlat": "9451505.57053,5531365.39558,1",
			"id": "KTZB-05-0001"
		}, {
			"name": "消防疏散通道B",
			"video": "",
			"lonlat": "9451516.15389,5531466.99579,1",
			"id": "KTZB-05-0002"
		}]
	},
	"resources": {
		"1": [{
			"name": "监控视频A",
			"video": "",
			"lonlat": "9451753.18244,5531337.67491,1",
			"id": "KTZB-03-0001"
		}, {
			"name": "监控视频B",
			"video": "",
			"lonlat": "9451768.39602,5531541.40449,1",
			"id": "KTZB-03-0002"
		}, {
			"name": "监控视频C",
			"video": "",
			"lonlat": "9451397.26423,5531312.53944,1",
			"id": "KTZB-03-0003"
		}, {
			"name": "监控视频D",
			"video": "",
			"lonlat": "9451503.69044,5531302.62637,1",
			"id": "KTZB-03-0004"
		}, {
			"name": "监控视频E",
			"video": "",
			"lonlat": "9451669.31994,5531289.22079,1",
			"id": "KTZB-03-0005"
		}],
		"2": [{
			"name": "水源点A",
			"video": "",
			"lonlat": "9451629.45162,5531319.29528,1",
			"id": "KTZB-02-0001"
		}, {
			"name": "水源点B",
			"video": "",
			"lonlat": "9451538.17018,5531327.2328,1",
			"id": "KTZB-02-0002"
		}, {
			"name": "水源点C",
			"video": "",
			"lonlat": "9451419.9012,5531332.78906,1",
			"id": "KTZB-02-0003"
		}, {
			"name": "水源点D",
			"video": "",
			"lonlat": "9451334.35393,5531347.13945,1",
			"id": "KTZB-02-0004"
		}, {
			"name": "水源点E",
			"video": "",
			"lonlat": "9451748.29539,5531324.91441,1",
			"id": "KTZB-02-0005"
		}],
		"3": [{
			"name": "企业消防部队A",
			"video": "",
			"lonlat": "9451429.06616,5531382.11285,1",
			"id": "KTZB-01-0001"
		}, {
			"name": "企业消防部队B",
			"video": "",
			"lonlat": "9451720.41797,5531327.01956,1",
			"id": "KTZB-01-0002"
		}],
		"warnings": {
			"1": [{
				"name": "水源点A",
				"video": "",
				"lonlat": "9451629.45162,5531319.29528,1",
				"id": "KTZB-02-0001"
			}, {
				"name": "水源点B",
				"video": "",
				"lonlat": "9451538.17018,5531327.2328,1",
				"id": "KTZB-02-0002"
			}],
			"2": [{
				"name": "水源点C",
				"video": "",
				"lonlat": "9451419.9012,5531332.78906,1",
				"id": "KTZB-02-0003"
			}, {
				"name": "水源点D",
				"video": "",
				"lonlat": "9451334.35393,5531347.13945,1",
				"id": "KTZB-02-0004"
			}]
		}
	}
};

var defaultMarkers = {}; //默认标注

$(document).ready(function() {
	createAreaMap();
});

function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]);
	return null;
}

function createAreaMap() {
	fmap = new fengmap.FMMap({
		//渲染dom
		container: $('#fengMap')[0],
		mapServerURL: 'data/fmaps/area',
		mapThemeURL: 'data/fmaps/area/theme',
		focusAlpha: 0.8,
		useStoreApply: true,
		//defaultMapScaleLevel: 12,
		mapScaleLevelRange: [9, 23],
		key: '57c7f309aca507497d028a9c00207cf8',
		appName: '蜂鸟研发SDK_2_0',
		defaultBackgroundColor: '#144973'
	});

	//打开Fengmap服务器的地图数据和主题
	fmap.openMapById(fmapID);
	fmap.themeName = '2001';

	fmap.showCompass = false;

	//地图加载完成回掉方法
	fmap.on('loadComplete', function() {
		//fmap.setBackgroundColor('#144973', 1);

		//部署指挥
		if (GetQueryString('m') == 'bushu') {
			createCarsMarkers();
		}
	});
}

//根据type创建初始marker
function createDefaultMarker(lonlat, id, type, name, index) {
	if (!lonlat || lonlat.indexOf(',') < 0) return;
	let array = lonlat.split(',');
	if (array.length < 3) return;
	var groupId = parseInt(array[2]),
		x = parseFloat(array[0]),
		y = parseFloat(array[1]);
	var group = fmap.getFMGroup(groupId);
	//返回当前层中第一个imageMarkerLayer,如果没有，则自动创建
	var layer = group.getOrCreateLayer('imageMarker');
	//图标标注对象，默认位置为该楼层中心点
	var im = new fengmap.FMImageMarker({
		id: id,
		x: x,
		y: y,
		//设置图片路径
		url: getHighlightIconByType(type, index),
		//设置图片显示尺寸
		size: 32,
		highlight: false,
		lonlat: lonlat,
		type: type,
		index: index,
		callback: function() {
			im.height = .2;
			// 在图片载入完成后，设置 "一直可见"
			im.alwaysShow();
		}
	});

	layer.addMarker(im);

	if (!defaultMarkers[type]) {
		defaultMarkers[type] = {};
	}

	if (!defaultMarkers[type][index]) {
		defaultMarkers[type][index] = [];
	}
	defaultMarkers[type][index].push({
		id: id,
		type: type,
		name: name,
		groupID: groupId,
		marker: im
	});
}
//获取默认图标
function getDefaultIconByType(type, index) {
	switch (type) {
		case 'builds':
			return (imgUrl + "marker/area/door.png");
		case 'resources':
			if (index == 1) return (imgUrl + "marker/area/video.png");
			else if (index == 2) return (imgUrl + "marker/area/water.png");
			else if (index == 3) return (imgUrl + "marker/area/power.png");
			break;
		case 'warnings':
			break;
		case 'cars':
			if (index == 1) return (imgUrl + "marker/area/denggao.png");
			else if (index == 2) return (imgUrl + "marker/area/xiaofang.png");
			else if (index == 3) return (imgUrl + "marker/area/gongshui.png");
			else if (index == 4) return (imgUrl + "marker/area/zhongdibeng.png");
			else if (index == 5) return (imgUrl + "marker/area/zhihui.png");
			break;
	}
}

//获取高亮图标
function getHighlightIconByType(type, index) {
	if (type == 'builds') {
		if (index == 3) return imgUrl + "marker/area/exit.png";
		else if (index <= 4) return imgUrl + "marker/area/lift_on.png";
	} else if (type == 'resources') {
		if (index == 1) return imgUrl + 'marker/area/video_on.png';
		else if (index == 2) return imgUrl + 'marker/area/water_on.png';
		else if (index == 3) return imgUrl + 'marker/area/power_on.png';
	} else if (type == 'warnings') {
		if (index == 1) return imgUrl + 'marker/area/warn.png';
		else if (index == 2) return imgUrl + 'marker/area/video_on.png';
	} else if (type == 'cars') {
		if (index == 1) return (imgUrl + "marker/area/denggao.png");
		else if (index == 2) return (imgUrl + "marker/area/xiaofang.png");
		else if (index == 3) return (imgUrl + "marker/area/gongshui.png");
		else if (index == 4) return (imgUrl + "marker/area/zhongdibeng.png");
		else if (index == 5) return (imgUrl + "marker/area/zhihui.png");
	}
}

//创建markers
function createMarkersByType(ttype, index) {
	if (!tableMarkers[ttype] || !tableMarkers[ttype][index]) return;
	for (var i = 0, ilen = tableMarkers[ttype][index].length; i < ilen; i++) {
		var marker = tableMarkers[ttype][index][i];
		createDefaultMarker(marker.lonlat, marker.id, ttype, marker.name, index);
	}
	isMarkerLoaded[ttype][index] = true;
}

//设置markers 隐藏/显示
function setMarkersVisible(ttype, index, visible) {
	if (!tableMarkers[ttype] || !tableMarkers[ttype][index]) return;
	if (visible == true && isMarkerLoaded[ttype][index] == false) {
		createMarkersByType(ttype, index);
		return;
	}
	if (!defaultMarkers[ttype] || !defaultMarkers[ttype][index]) return;
	for (var i = 0, ilen = defaultMarkers[ttype][index].length; i < ilen; i++) {
		var marker = defaultMarkers[ttype][index][i].marker;
		marker.visible = visible;
	}
}

function createCarsMarkers() {
	for (var i = 0, ilen = cars.length; i < ilen; i++) {
		var car = cars[i];
		createDefaultMarker(car.lonlat, car.id, 'cars', 'cars', parseInt(car.id));
	}
}