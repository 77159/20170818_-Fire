/**
 * 有关百度地图调用的方法
 */
var bmap, zoom = 13,
    maxZoom = 15,
    latitude = 44.432157,
    longitude = 84.909869,
    defaultMarkers = {},
    curInfoWindow = null,
    trafficControl = null,
    distanceControl = null;

var trafficMarkers = [];

//初始化百度地图
function creatMap(containerid) {
    //var container = (!document.getElementById('hide-Map')?document.getElementById('b-map'):document.getElementById('hide-Map'));
    bmap = new BMap.Map(containerid, {
        enableMapClick: false
            //mapType: BMAP_HYBRID_MAP
    }); // 创建Map实例
    bmap.centerAndZoom(new BMap.Point(longitude, latitude), zoom);

    bmap.enableScrollWheelZoom(); //启用滚轮放大缩小
    bmap.enableContinuousZoom(); //启用地图惯性拖拽

    trafficControl = new BMapLib.TrafficControl({
        showPanel: false
    });
    bmap.addControl(trafficControl);

    //trafficControl.showTraffic();

    bmap.setMapStyle({
        style: 'light'
    });
}

//获取默认图标
function getDefaultIconByType(type, index) {
    switch (type) {
        case 'goverments':
            return getIcon(imgUrl + "marker/outside/gov_on_point.png", 0);
        case 'waters':
            if (index == 1)
                return getIcon(imgUrl + "marker/outside/water_on_point.png", 0);
            if (index == 2)
                return getIcon(imgUrl + "marker/outside/water_on_point.png", 0);
            if (index == 3)
                return getIcon(imgUrl + "marker/outside/water_on_point.png", 0);
        case 'powers':
            return getIcon(imgUrl + "marker/outside/power.png", 0);
        case 'warnings':
            {
                if (index == 3) return getIcon(imgUrl + "marker/outside/water_warn_point.png", 0);
                else return getIcon(imgUrl + "marker/outside/gov_warn_point.png", 0);
            }
            break;
    }
}

//获取高亮图标
function getHighlightIconByType(type, index) {
    switch (type) {
        case 'goverments':
            return getIcon(imgUrl + "marker/outside/gov_on.png", 1);
        case 'waters':
            if (index == 1)
                return getIcon(imgUrl + "marker/outside/fire_on.png", 1);
            if (index == 2)
                return getIcon(imgUrl + "marker/outside/drink_on.png", 1);
            if (index == 3)
                return getIcon(imgUrl + "marker/outside/water_on.png", 1);
        case 'powers':
            if (index == 1)
                return getIcon(imgUrl + "marker/outside/power_on.png", 1);
            if (index == 2)
                return getIcon(imgUrl + "marker/outside/power_to.png", 1);
        case 'warnings':
            {
                if (index == 3) return getIcon(imgUrl + "marker/outside/water_warn.png", 1);
                else return getIcon(imgUrl + "marker/outside/gov_warn.png", 1);
            }
            break;
    }
}

function getIcon(url, type) {
    if (type == 0)
        return (new BMap.Icon(url, new BMap.Size(12, 12), {
            imageSize: new BMap.Size(12, 12)
        }));
    else
        return (new BMap.Icon(url, new BMap.Size(32, 32), {
            imageSize: new BMap.Size(32, 32)
        }));
}

//根据type创建初始marker
function createDefaultMarker(lonlat, id, type, name, index) {
    let array = lonlat.split(',');
    var point = new BMap.Point(parseFloat(array[0]), parseFloat(array[1]));
    var myIcon = getDefaultIconByType(type, index);
    var marker = new BMap.Marker(point, {
        title: name,
        icon: myIcon
    });
    bmap.addOverlay(marker);
    if (type == 'warnings') marker.setTop(true);
    if (!defaultMarkers[type]) {
        defaultMarkers[type] = {};
    }

    if (!defaultMarkers[type][index]) {
        defaultMarkers[type][index] = [];
    }
    defaultMarkers[type][index].push({
        id: type + '-' + id,
        type: type,
        marker: marker
    });
}


/**
 * [highlightMarker 高亮标注并添加信息窗]
 * @param  {[type]} lonlat [description]
 * @param  {[type]} info   [description]
 * @return {[type]}        [description]
 */
function highlightMarker(marker, info, type, item, index) {
    if (!marker) return;

    var myIcon = getHighlightIconByType(type, index);
    marker.setIcon(myIcon);

    var infoWindow = getInfoWindow(info, type);
    marker.addEventListener("click", function() {
        if (curInfoWindow) curInfoWindow.close();
        infoWindow.open(this);
        curInfoWindow = infoWindow;
        bindPageEvent();
    });

    item['infoWin'] = infoWindow;
}

/**
 * [unHighlightMarker 恢复标注至初始状态，不可点击]
 */
function unHighlightMarker(marker, info, type, item, index) {
    if (!marker) return;

    var myIcon = getDefaultIconByType(type, index);
    marker.setIcon(myIcon);

    //marker.closeInfoWindow();
    if (item.infoWin) item.infoWin.close();

    marker.removeEventListener("click", function() {});

    //item['infoWin'] = info;
}

function getInfoWindow(info, type) {
    var sContentTmpl = type == 'waters' ? getWaterMarkerContentTempl() : getMarkerContentTempl();
    var popHtml = getParsedHTML(sContentTmpl, info, null);
    var infoWindow = new BMapLib.InfoBox(bmap, popHtml, {
        boxStyle: {
            background: 'rgba(18, 65, 153, 0.9)',
            color: '#fff',
            padding: '0px',
            width: "286px"
        },
        closeIconMargin: "10px 12px 0 0 ",
        enableAutoPan: true,
        alignBottom: false,
        offset: new BMap.Size(0, 20)
    });
    return infoWindow;
}

function bindPageEvent() {
    $(".infoBox .pop-content-btn-box button:eq(0)").on('click', function() {
        window.location.href = 'map-area.html';
    });

    $(".infoBox .pop-content-btn-box button:eq(1)").on('click', function() {
        window.location.href = 'map-indoor.html';
    });
}

//高亮某一条记录
function goToCenter(lonlat, unitNo, type, index) {
    if (!defaultMarkers[type] || !defaultMarkers[type][index]) return;
    var uid = type + '-' + unitNo;
    var data = _.find(defaultMarkers[type][index], (item) => (item.id == (uid)));
    if (data) {
        var wrapInfo = getDetailsById(uid, index, type);
        highlightMarker(data.marker, wrapInfo, type, data, index);

        if (curInfoWindow) curInfoWindow.close();
        data.infoWin.open(data.marker);
        curInfoWindow = data.infoWin;

        let array = lonlat.split(',');
        var point = new BMap.Point(parseFloat(array[0]), parseFloat(array[1]));
        bmap.centerAndZoom(point, maxZoom);
        bindPageEvent();
    }
}

//高亮某一类图标
function highlightMarkersByType(type, index, isHighLight) {
    if (!defaultMarkers[type] || !defaultMarkers[type][index]) return;
    var selMarkers = defaultMarkers[type][index];
    $.each(selMarkers, function(i, item) {
        let wrapInfo = getDetailsById(item.id, index, type);
        if (isHighLight)
            highlightMarker(item.marker, wrapInfo, type, item, index);
        else
            unHighlightMarker(item.marker, wrapInfo, type, item, index);
    });
}

//恢复所有图标至初始状态
function setMarkersToDefault() {
    for (var ttype in defaultMarkers) {
        let typemarkers = defaultMarkers[ttype]
        for (var i in typemarkers) {
            highlightMarkersByType(ttype, i, false);
        }
    }
}

//添加实时路况
function showCurTraffic(isShow) {
    if (!isShow)
        trafficControl.showTraffic();
    else {
        trafficControl.hideTraffic();
    }
}

//开启测距工具
function openDistanceTool(isOpen) {
    if (!distanceControl) {
        distanceControl = new BMapLib.DistanceTool(bmap);
    }

    if (!isOpen)
        distanceControl.open();
    else
        distanceControl.close();
}

//搜索地图
function searchMarkersByName(value) {
    if (value == '') {
        resetAllMarkersToDefault();
        return;
    }
    for (var ttype in defaultMarkers) {
        for (var index in defaultMarkers[ttype]) {
            var selMarkers = defaultMarkers[ttype][index];
            var resMarkers = _.filter(selMarkers, (item) => (item.marker.getTitle().indexOf(value) >= 0));
            if (resMarkers) {
                for (var i = 0, ilen = resMarkers.length; i < ilen; i++) {
                    let resMarker = resMarkers[i];
                    let wrapInfo = getDetailsById(resMarker.id, index, ttype);
                    highlightMarker(resMarker.marker, wrapInfo, ttype, resMarker, index);
                }
            }
        }
    }
}

//恢复所有的marker到默认状态
function resetAllMarkersToDefault() {
    for (var ttype in defaultMarkers) {
        for (var index in defaultMarkers[ttype]) {
            var resMarkers = defaultMarkers[ttype][index];
            for (var i = 0, ilen = resMarkers.length; i < ilen; i++) {
                let resMarker = resMarkers[i];
                let wrapInfo = getDetailsById(resMarker.id, index, ttype);
                unHighlightMarker(resMarker.marker, wrapInfo, ttype, resMarker, index);
            }
        }
    }
}

//通行信息marker
function showMapTools() {
    clearMapTools();
    let points = ['84.914626, 44.4308', '84.900549, 44.434064'];

    for (var i = 0; i < 2; i++) {
        var array = points[i].split(',');
        var point = new BMap.Point(parseFloat(array[0]), parseFloat(array[1]));
        var myIcon = null;
        if (i == 0) myIcon = getIcon(imgUrl + "marker/way.png", 1);
        else if (i == 1) myIcon = getIcon(imgUrl + "marker/traffic.png", 1);
        var marker = new BMap.Marker(point, {
            title: name,
            icon: myIcon
        });
        marker.setTop(true);
        bmap.addOverlay(marker);
        trafficMarkers.push(marker);
    }
}

//通行信息marker
function clearMapTools() {
    if (trafficMarkers.length > 0) {
        bmap.removeOverlay(trafficMarkers[0]);
        bmap.removeOverlay(trafficMarkers[1]);
        trafficMarkers = [];
    }
}