/*
生成室内地图
*/

var fmap;
var fmapID = 'kt02',
    defaultMarkers = {};

function creatMap() {
    fmap = new fengmap.FMMap({
        //渲染dom
        container: $('#f-Map')[0],
        mapServerURL: 'data/fmaps/area',
        mapThemeURL: 'data/fmaps/area/theme',
        focusAlpha: 0.8,
        useStoreApply: true,
        //defaultMapScaleLevel: 12,
        mapScaleLevelRange: [9, 23],
        key: '57c7f309aca507497d028a9c00207cf8',
        appName: '蜂鸟研发SDK_2_0',
    });

    //打开Fengmap服务器的地图数据和主题
    fmap.openMapById(fmapID);
    fmap.themeName = '2001';

    fmap.showCompass = true;

    //地图加载完成回掉方法
    fmap.on('loadComplete', function() {
        createBMapMarkers(); //创建初始marker    

        createCarsMarkers();
    });

    //点击事件
    fmap.on('mapClickNode', function(event) {
        if (event.nodeType == 100 && event.data_.fids == '25891201042') {
            window.location.href = 'map-indoor.html';
        }
    });
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

//获取默认图标
function getDefaultIconByType(type, index) {
    switch (type) {
        case 'builds':
            return (imgUrl + "marker/area/door.png");
        case 'resources':
            if (index == 1) return (imgUrl + "marker/area/video.png");
            else if (index == 2) return (imgUrl + "marker/area/water_on_point.png");
            else if (index == 3) return (imgUrl + "marker/area/power.png");
            break;
        case 'warnings':
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
    }
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
    marker.url = myIcon;
    marker.o3d_.width_ = 32;
    marker.o3d_.height_ = 32;
    marker.highlight = true;
    marker.type = type;
    marker.index = index;
}

/**
 * [unHighlightMarker 恢复标注至初始状态，不可点击]
 */
function unHighlightMarker(marker, info, type, item, index) {
    if (!marker) return;

    var myIcon = getDefaultIconByType(type, index);
    marker.url = myIcon;
    marker.o3d_.width_ = 16;
    marker.o3d_.height_ = 16;
    marker.highlight = false;

    if (item.popWin) {
        item.popWin.close();
        item.popWin = null;
    }
}

//高亮某一条记录
function goToCenter(lonlat, unitNo, type, index) {
    if (!defaultMarkers[type] || !defaultMarkers[type][index]) return;
    var data = _.find(defaultMarkers[type][index], (item) => (item.id == unitNo));
    if (data) {
        let array = lonlat.split(',');
        if (array.length < 3) return;
        var x = parseFloat(array[0]),
            y = parseFloat(array[1]),
            gid = parseFloat(array[2]);
        fmap.moveToCenter({
            x: x,
            y: y,
            groupID: gid,
            callback: function() {}
        });
    }
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
        url: getDefaultIconByType(type, index),
        //设置图片显示尺寸
        size: 16,
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

//搜索地图
function searchMarkersByName(value) {
    if (value == '') {
        resetAllMarkersToDefault();
        return;
    }
    for (var ttype in defaultMarkers) {
        for (var index in defaultMarkers[ttype]) {
            var selMarkers = defaultMarkers[ttype][index];
            var resMarkers = _.filter(selMarkers, (item) => (item.name.indexOf(value) >= 0));
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