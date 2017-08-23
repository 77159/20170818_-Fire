
var routeAnalyse = fengmap.FMNaviAnalyser.create({}); //初始化路线对象

var naviCoords = [];
var naviGids = [];
var naviLines = []; //路线
var naviUserLayerGroups = [];
var naviUserLayers = [];
var lineObjects = [];

//起点、终点图层
var startImgGLayer = null;
var startImgLayer = null;
var endImgGlayer = null;
var endImgLayer = null;

var startpoint;
var startgroupid;
var endpoint;
var endgroupid;

$("#loading").css("display", "block");

var clearNaviLines = function() {
    if (naviLines.length != 0) {
        for (var i = 0; i < naviLines.length; i++) {
            if (naviLines[i])
                map.clearLineMark(naviLines[i]);
        }
        naviLines = [];
    }

    lineObjects.forEach(function (l) {
        l.dispose();
    });
}

var clearNaviUseLayers = function() {
    if (naviUserLayers.length != 0) {
        for (var i = 0; i < naviUserLayers.length; i++) {
            naviUserLayerGroups[i].removeLayer(naviUserLayers[i]);
        }
    }
}

//清除原有路线和起始点标注
var clearNaviObject = function() {
    naviCoords = [];
    naviGids = [];
    lineObjects.length = 0;
    clearNaviLines();
    clearNaviUseLayers();
}

function drawLines(startpoint, endpoint, startgroupid, endgroupid, autoClear) {

    autoClear = autoClear === undefined ? true: autoClear;
    //clear lines
    if (autoClear) {
        clearNaviLines();
    }

    if (naviCoords.length == 0) {
        //clear userLayers
        clearNaviUseLayers();
    }

    // addMarker(startgroupid,startpoint,true);
    // addMarker(endgroupid,endpoint,false);

    naviCoords.push(startpoint);
    naviGids.push(startgroupid);
    naviCoords.push(endpoint);
    naviGids.push(endgroupid);

    //路径分析
    if(routeAnalyse.analyzeNavi(naviGids[0],naviCoords[0],naviGids[1],naviCoords[1],fengmap.FMNaviModule.MODULE_SHORTEST) == fengmap.FMRouteCalcuResult.ROUTE_SUCCESS){
        var results = routeAnalyse.getNaviResults();

        if (results.length==0)
            return;

        //console.log(results);
        //console.log(naviGids);

        //绘制部分
        var line = new fengmap.FMLineMarker();

        for (var i = 0; i < results.length; i++)
        {
            var result = results[i];
            var gid = result.groupId;
            var points = result.pointList;

            var seg = new fengmap.FMSegment();
            seg.groupId = gid;
            seg.points = [];

            for (var j = 0; j < points.length; j++) {
                seg.points.push(points[j]);
            };
            line.addSegment(seg);
            naviLines.push(line);
            var lineObject = map.drawLineMark(line, {
                lineWidth: 6,
                color: '#ffffff',
                dashArray: [1,2],
                lineType: 'arrow',
                offsetHeight: .5,
                noAnimate: true,
            });

            lineObjects.push(lineObject);
        }
    }

    naviGids = [];
    naviCoords = [];

}

//清除起点、终点
function clearImgLayer() {
    if (endImgGlayer && endImgLayer) {
        endImgGlayer.removeLayer(endImgLayer);
    }
    if (startImgGLayer && startImgLayer) {
        startImgGLayer.removeLayer(startImgLayer);
    }
}

//添加起点、终点
var addMarker = function(groupid, coord, isStart) {
    clearNaviLines();
    var groupLayer = map.getFMGroup(groupid);

    if (isStart) {
        if (startImgGLayer && startImgLayer) {
            startImgGLayer.removeLayer(startImgLayer);
        }

        var slayer = new fengmap.FMImageMarkerLayer();
        groupLayer.addLayer(slayer);
        slayer.addMarker(new fengmap.FMImageMarker({
            x: coord.x,
            y: coord.y,
            url: 'image/start.png',
            size: 48
        }));

        if(!indoor)
            slayer.o3d_.position.y = coord.height - 40 -3;
        else 
            slayer.o3d_.position.y = -2;    
        startImgGLayer = groupLayer;
        startImgLayer = slayer;
    } else {
        if (endImgGlayer && endImgLayer) {
            endImgGlayer.removeLayer(endImgLayer);
        }

        var elayer = new fengmap.FMImageMarkerLayer();
        groupLayer.addLayer(elayer);
        elayer.addMarker(new fengmap.FMImageMarker({
            x: coord.x,
            y: coord.y,
            url: 'image/end.png',
            size: 48
        }));
    
    //设置图标高度
    if(!indoor)
        elayer.o3d_.position.y = coord.height - 40 - 2;
    else 
        elayer.o3d_.position.y = -2;

        endImgGlayer = groupLayer;
        endImgLayer = elayer;
    }
}