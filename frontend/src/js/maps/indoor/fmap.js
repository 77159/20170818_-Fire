/*
生成室内地图
*/

var fmap;
var fmapID = 'kt01',
    defaultMarkers = {},
    infoWindows = {},
    groupControl = null,
    toolControl = null,
    enableClickMarker = false,
    curInfoWindow = null;

//楼层控制控件配置参数
var layerCtlOpt = new fengmap.controlOptions({
    //默认在右上角
    position: fengmap.controlPositon.RIGHT_TOP,
    //默认显示楼层的个数
    showBtnCount: 6,
    //初始是否是多层显示，默认单层显示
    allLayer: false,
    //位置x,y的偏移量
    offset: {
        x: 95,
        y: 144
    }
});

var modeCtlOpt = new fengmap.controlOptions({
    //设置显示的位置为左上角
    position: fengmap.controlPositon.RIGHT_TOP,
    //位置x,y的偏移量
    offset: {
        x: 95,
        y: 92
    },
    //初始化2D模式
    init2D: false,
    //设置为false表示只显示2D,3D切换按钮
    groupsButtonNeeded: false,
    //点击按钮的回调方法,返回type表示按钮类型,value表示对应的功能值
    clickCallBack: function(type, value) {
        // console.log(type,value);
    }
});

//放大、缩小控件配置
var zoomCtlOpt = new fengmap.controlOptions({
    //设置显示的位置为左上角
    position: fengmap.controlPositon.RIGHT_TOP,
    //位置x,y的偏移量
    offset: {
        x: 95,
        y: 465
    }
});

function creatMap() {
    fmap = new fengmap.FMMap({
        //渲染dom
        container: $('#f-Map')[0],
        mapServerURL: 'data/fmaps/indoor',
        mapThemeURL: 'data/fmaps/indoor/theme',
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

    fmap.showCompass = false;

    //地图加载完成回掉方法
    fmap.on('loadComplete', function() {
        //showLabels(false);

        //创建楼层(按钮型)，创建时请在地图加载后(loadComplete回调)创建。
        groupControl = new fengmap.scrollGroupsControl(fmap, layerCtlOpt);

        //2/3D 切换控件
        toolControl = new fengmap.toolControl(fmap, modeCtlOpt);

        //放大、缩小控件
        zoomControl = new fengmap.zoomControl(fmap, zoomCtlOpt);

        createBMapMarkers(); //创建初始marker        
    });

    bindMarkerClickEvent();
}

//绑定marker的点击事件
function bindMarkerClickEvent() {
    fmap.on('mapClickNode', function(event) {
        if (event.nodeType == fengmap.FMNodeType.IMAGE_MARKER && event.target.highlight && event.target.highlight == true) {
            let marker = event.target;
            goToCenter(marker.x + ',' + marker.y + ',' + marker.groupID, marker.ID, marker.type, marker.index);
        }
    });
}

//控制label图层的显示隐藏
function showLabels(isShow) {
    $.each(fmap.groupIDs, function(index, item) {
        //遍历图层
        fmap.getLayerByAlias([item], 'label', function(layer) {
            layer.visible = isShow;
        });
    });
}

//获取默认图标
function getDefaultIconByType(type, index) {
    if (type == 'goverments') {
        if (index == 1) return imgUrl + "marker/indoor/server.png";
        else if (index > 1 && index <= 6) return imgUrl + "marker/indoor/device.png";
        else if (index == 7) return imgUrl + "marker/indoor/video.png";
        else return imgUrl + "marker/indoor/imparea.png";
    }
}

//根据type创建初始marker
function createDefaultMarker(lonlat, id, type, name, index) {
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
        size: 10,
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

    var infoWindow = getInfoWindow(marker.x, marker.y, marker.groupID, info);

    item['infoWin'] = infoWindow;
}

//获取高亮图标
function getHighlightIconByType(type, index) {
    if (type == 'goverments') {
        if (index <= 1) return imgUrl + "marker/indoor/server_on.png";
        else if (index == 2) return imgUrl + "marker/indoor/help_on.png";
        else if (index == 3) return imgUrl + "marker/indoor/water_on.png";
        else if (index == 4) return imgUrl + "marker/indoor/smoke_on.png";
        else if (index == 5) return imgUrl + "marker/indoor/lift_on.png";
        else if (index == 6) return imgUrl + "marker/indoor/fire_on.png";
        else if (index == 7) return imgUrl + "marker/indoor/video_on.png";
        else return imgUrl + "marker/indoor/imparea_on.png";
    }
}

/**
 * [unHighlightMarker 恢复标注至初始状态，不可点击]
 */
function unHighlightMarker(marker, info, type, item, index) {
    if (!marker) return;

    var myIcon = getDefaultIconByType(type, index);
    marker.url = myIcon;
    marker.o3d_.width_ = 10;
    marker.o3d_.height_ = 10;
    marker.highlight = false;

    if (item.popWin) {
        item.popWin.close();
        item.popWin = null;
    }
}


function openPopWin(opt) {
    if (curInfoWindow) curInfoWindow.close();
    curInfoWindow = new fengmap.FMPopInfoWindow(fmap, opt);
    //添加弹框到地图上
    return curInfoWindow;
}

//高亮某一条记录
function goToCenter(lonlat, unitNo, type, index) {
    if (!defaultMarkers[type] || !defaultMarkers[type][index]) return;
    var data = _.find(defaultMarkers[type][index], (item) => (item.id == unitNo));
    if (data) {
        let array = lonlat.split(',');
        if (array.length < 3) return;

        var wrapInfo = getDetailsById(unitNo, index, type);
        highlightMarker(data.marker, wrapInfo, type, data, index);

        if (curInfoWindow) curInfoWindow.close();

        var x = parseFloat(array[0]),
            y = parseFloat(array[1]),
            gid = parseFloat(array[2]);

        if (fmap.visibleGroupIDs.length == 1)
            fmap.visibleGroupIDs = [gid];
        else fmap.visibleGroupIDs = fmap.groupIDs;
        fmap.focusGroupID = gid;
        fmap.moveTo({
            x: x,
            y: y,
            groupID: gid,
            callback: function() {
                if (data.infoWin)
                    data.popWin = openPopWin(data.infoWin);
            }
        });
    }
}

//信息框控件大小配置
function getInfoWindow(x, y, groupID, info) {
    var sContentTmpl = getMarkerContentTempl();
    var popHtml = getParsedHTML(sContentTmpl, info, null);
    var popWinOpt = new fengmap.controlOptions({
        mapCoord: {
            //设置弹框的x轴
            x: x,
            //设置弹框的y轴
            y: y,
            //设置弹框位于的楼层
            groupID: groupID
        },
        //设置弹框的宽度
        width: 320,
        //设置弹框的高度
        height: 180,
        marginTop: -20,
        border: 0,
        background: 'none',
        //设置弹框的内容
        content: popHtml
    });
    return popWinOpt;
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
        let typemarkers = defaultMarkers[ttype];
        for (var i in typemarkers) {
            highlightMarkersByType(ttype, i, false);
        }
    }
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