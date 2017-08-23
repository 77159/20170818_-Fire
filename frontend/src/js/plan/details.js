var tableMarkers = {
	"power": [{
		"id": "KTXF-01-0001",
		"name": "师人武部",
		"cars": "23",
		"person": "30",
		"status": "出动",
		"lonlat": "84.901786,44.434979"
	}, {
		"id": "KTXF-01-0002",
		"name": "农七师师部",
		"cars": "13",
		"person": "35",
		"status": "待命",
		"lonlat": "84.912612,44.438711"
	}],
	"goverments": [{
		"unitNo": "KTDW-08-0001",
		"name": "友好时尚购物中心",
		"unitType": "购物",
		"status": "在线",
		"lonlat": "84.914626,44.4308"
	}]
};
$(document).ready(function() {
	createBMap('map');
	//createIndoorMap();

	//createDefaultMarkers(); //创建室外地图坐标
	//室外地图marker点击事件
	$('.bmap-marker').on('click', function() {
		var type = $(this).data('type');
		if ($(this).hasClass('active')) {
			removeMarkersByType(type);
			$(this).removeClass('active');
		} else {
			createMarkersByType(type);
			$(this).addClass('active');
		}
	});
	//室外地图路线点击事件
	$('#routeLine').on('click', function() {
		if ($(this).hasClass('active')) {
			showDrivingRoute(false);
			$(this).removeClass('active');
		} else {
			showDrivingRoute(true);
			$(this).addClass('active');
		}
	});

	//室外marekr的显示和隐藏
	$('.area-marker').on('click', function() {
		var type = $(this).data('type'),
			index = $(this).data('index');
		if ($(this).hasClass('active')) {
			window.frames["mapAreaIframe"].contentWindow.setMarkersVisible(type, index, false);
			$(this).removeClass('active');
		} else {
			window.frames["mapAreaIframe"].contentWindow.setMarkersVisible(type, index, true);
			$(this).addClass('active');
		}
	});

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

	$('.indoor-zuozhan-route').on('click', function() {
		var type = $(this).data('type'),
			index = $(this).data('index');
		if ($(this).hasClass('active')) {
			//window.frames["mapIndoorZuozhanIframe"].contentWindow.glo.teamGo();
			$(this).removeClass('active');
		} else {
			window.frames["mapIndoorZuozhanIframe"].contentWindow.glo.teamGo('第一力量');
			$(this).addClass('active');
		}
	});

	//全屏展示
	// $('#map_wrapper .map-container .full-screen').on('click',function(){
	// 	if($('#map_wrapper .map-container .full-screen').hasClass('on')){
	// 		$('#map_wrapper .map-container').width($(body).width());
	// 	}
	// 	else {
	// 		$('#map_wrapper .map-container').width($(body).width());
	// 		$('#map_wrapper .map-container').height($(body).height());
	// 	}
	// })

});

function createMarkersByType(ttype) {
	if (!tableMarkers[ttype]) return;
	for (var i = 0, ilen = tableMarkers[ttype].length; i < ilen; i++) {
		var marker = tableMarkers[ttype][i];
		createDefaultMarker(marker.lonlat, marker.unitNo, ttype, marker.name, 1);
	}
}