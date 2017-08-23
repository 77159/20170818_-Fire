var bmap, zoom = 13,
	maxZoom = 15,
	latitude = 44.432157,
	longitude = 84.909869,
	defaultMarkers = {},
	driving = null;

//初始化百度地图
function createBMap(containerid) {
	//var container = (!document.getElementById('hide-Map')?document.getElementById('b-map'):document.getElementById('hide-Map'));
	bmap = new BMap.Map(containerid, {
		enableMapClick: false
			//mapType: BMAP_HYBRID_MAP
	}); // 创建Map实例
	bmap.centerAndZoom(new BMap.Point(longitude, latitude), zoom);

	bmap.enableScrollWheelZoom(); //启用滚轮放大缩小
	bmap.enableContinuousZoom(); //启用地图惯性拖拽

	bmap.setMapStyle({
		style: 'grayscale'
	});
}

//根据type创建初始marker
function createDefaultMarker(lonlat, id, type, name) {
	let array = lonlat.split(',');
	var point = new BMap.Point(parseFloat(array[0]), parseFloat(array[1]));
	var myIcon = getDefaultIconByType(type);
	var marker = new BMap.Marker(point, {
		title: name,
		icon: myIcon
	});
	bmap.addOverlay(marker);
	if (!defaultMarkers[type]) {
		defaultMarkers[type] = [];
	}

	defaultMarkers[type].push({
		id: id,
		type: type,
		marker: marker
	});
}

//获取默认图标
function getDefaultIconByType(type) {
	switch (type) {
		case 'goverments':
			return (new BMap.Icon(imgUrl + "marker/outside/gov_on.png", new BMap.Size(32, 32), {
				imageSize: new BMap.Size(32, 32)
			}));
		case 'power':
			return (new BMap.Icon(imgUrl + "marker/outside/power_on.png", new BMap.Size(32, 32), {
				imageSize: new BMap.Size(32, 32)
			}));
	}
}

//设置标注可见
function removeMarkersByType(type) {
	if (!defaultMarkers[type]) return;

	for (var i = 0, ilen = defaultMarkers[type].length; i < ilen; i++) {
		var dmarker = defaultMarkers[type][i];
		bmap.removeOverlay(dmarker.marker);
	}
}

//显示路线
function showDrivingRoute(isShow) {
	if (isShow) {
		var p1 = new BMap.Point(84.912612, 44.438711);
		var p2 = new BMap.Point(84.914626, 44.4308);

		driving = new BMap.DrivingRoute(bmap, {
			renderOptions: {
				map: bmap,
				autoViewport: true
			}
		});
		driving.search(p1, p2);

		driving.setPolylinesSetCallback(function(arr) {
			// console.log(arr[0].getRoute().getPath());
		});
	} else {
		if (driving) driving.clearResults();
	}
}