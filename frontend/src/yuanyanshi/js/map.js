$(function() {
    //模型转换2D-3D
    $('#btnViewModel').on('click', function() {
        var viewmodel = $(this).data('viewmodel');
        if (viewmodel == '3d') {
            $(this).html('<img class="imageIcon" src="./image/3d-f.png" />');
            $(this).data('viewmodel', '2d');
            if (groupControl && groupControl.allLayer)
                groupControl.changeGroupsSelect(false);
            map.viewMode = fengmap.FMViewMode.MODE_2D;
        } else {
            $(this).html('<img class="imageIcon" src="./image/3d-n.png" />');
            $(this).data('viewmodel', '3d');
            map.viewMode = fengmap.FMViewMode.MODE_3D;
        }
    });
});

var imgsLayer = {}; //存储温度的markLayers
var cameraImgsLayers = {}; //存储摄像头的markLayers

var fireImgsLayers = {}; //存储摄像头的markLayers

//记录json中读取到的视频和着火点配置
var cameras = [];
var lights = [];
//var cameras = [];

//添加传感器图标
var addHeatMarkers = function() {
    $.getJSON(markDataUrl, function(data) {
        var imgs = data.light;

        lights = imgs;

        imgsLayer = {};
        for (var i = 0, ilen = imgs.length; i < ilen; i++) {
            var img = imgs[i];

            if (!imgsLayer[img.gid]) {
                var groupLayer = map.getFMGroup(img.gid);
                if (!groupLayer) return true;
                imgsLayer[img.gid] = new fengmap.FMImageMarkerLayer();
                groupLayer.addLayer(imgsLayer[img.gid]);
            }

            var imgURL = getHeatImgUrl(img.value);

            var im = new fengmap.FMImageMarker({
                url: imgURL,
                name: img.name,
                x: img.X,
                y: img.Y,
                id: 'temper-' + img.Id,
                size: 80
            });
            imgsLayer[img.gid].addMarker(im);

            //console.log(img.height);
            if (img.height) imgsLayer[img.gid].o3d_.position.y = img.height - 40;
            else
                imgsLayer[img.gid].o3d_.position.y = -2;

            //查看当前是否有着火
            if(!indoor) checkFire(img.Id);
        }
    })
}

var getHeatImgUrl = function(value) {
    return 'image/heatMarker/heat_' + value + '.png';
}

//清除温度传感器
var clearHeatMarkers = function() {
    for (var i in imgsLayer) {
        var groupLayer = map.getFMGroup(i);
        if (!groupLayer) return true;
        groupLayer.removeLayer(imgsLayer[i]);
    }
    imgsLayer = {};
}


//添加传感器图标
var addCameraMarkers = function() {
    $.getJSON(markDataUrl, function(data) {
        var imgs = data.camera;

        cameras = imgs;

        cameraImgsLayers = {};
        for (var i = 0, ilen = imgs.length; i < ilen; i++) {
            var img = imgs[i];

            if (!cameraImgsLayers[img.gid]) {
                var groupLayer = map.getFMGroup(img.gid);
                if (!groupLayer) return true;
                cameraImgsLayers[img.gid] = new fengmap.FMImageMarkerLayer();
                groupLayer.addLayer(cameraImgsLayers[img.gid]);
            }

            var imgURL = 'image/camera.png';

            var im = new fengmap.FMImageMarker({
                url: imgURL,
                name: img.name,
                x: img.X,
                y: img.Y,
                id: 'camera-' + img.Id,
                size: 64
            });

            cameraImgsLayers[img.gid].addMarker(im);
        }
        setTimeout(function() {
            map.listGroups.forEach(function(val, i) {
                var imgLayer = fengmap.MapUtil.getLayerByAlias(map, val.gid, 'imageMarker');
                if (imgLayer && imgLayer.o3d_) imgLayer.o3d_.position.y = -5.5;
            });
        }, 10);
    })
}

//清除摄像头传感器
var clearCameraMarkers = function() {
    for (var i in cameraImgsLayers) {
        var groupLayer = map.getFMGroup(i);
        if (!groupLayer) return true;
        groupLayer.removeLayer(cameraImgsLayers[i]);
    }
    cameraImgsLayers = {};
}

//添加灾情点图标
var addFireMarkers = function() {
    $.getJSON(markDataUrl, function(data) {
        var imgs = data.fires;

        fireImgsLayers = {};
        for (var i = 0, ilen = imgs.length; i < ilen; i++) {
            var img = imgs[i];

            if (!fireImgsLayers[img.gid]) {
                var groupLayer = map.getFMGroup(img.gid);
                if (!groupLayer) return true;
                fireImgsLayers[img.gid] = new fengmap.FMImageMarkerLayer();
                groupLayer.addLayer(fireImgsLayers[img.gid]);
            }

            var imgURL = 'image/flame.png';

            var im = new fengmap.FMImageMarker({
                url: imgURL,
                x: img.X,
                y: img.Y,
                id: 'flame-' + img.Id,
                size: 100
            });

            fireImgsLayers[img.gid].addMarker(im);
        }
        setTimeout(function() {
            map.listGroups.forEach(function(val, i) {
                var imgLayer = fengmap.MapUtil.getLayerByAlias(map, val.gid, 'imageMarker');
                if (imgLayer && imgLayer.o3d_) imgLayer.o3d_.position.y = -6;
            });
        }, 10);
    })
}

//动态添加灾情点标注
var addFireMarker = function(markerData) {
    var img = markerData;

    if (!fireImgsLayers[img.groupID]) {
        var groupLayer = map.getFMGroup(img.groupID);
        if (!groupLayer) return true;
        fireImgsLayers[img.groupID] = new fengmap.FMImageMarkerLayer();
        groupLayer.addLayer(fireImgsLayers[img.groupID]);
    }

    var imgURL = 'image/flame.png';

    var im = new fengmap.FMImageMarker({
        url: imgURL,
        x: img.x,
        y: img.y,
        id: 'flame-' + img.ID,
        size: 100
    });

    fireImgsLayers[img.groupID].addMarker(im);

    setTimeout(function() {
        map.listGroups.forEach(function(val, i) {
            var imgLayer = fengmap.MapUtil.getLayerByAlias(map, val.gid, 'imageMarker');
            if (imgLayer && imgLayer.o3d_) imgLayer.o3d_.position.y = -5.8;
        });
    }, 10);

}

//清除摄像头传感器
var clearFireMarkers = function() {
    for (var i in fireImgsLayers) {
        var groupLayer = map.getFMGroup(i);
        if (!groupLayer) return true;
        groupLayer.removeLayer(fireImgsLayers[i]);
    }
    fireImgsLayers = {};
}

//获取楼层名称
var getGroupNameByID = function(groupId) {
    var groupLayer = map.getFMGroup(groupId);
    if (groupLayer)
        return groupLayer.groupName.toUpperCase();
    else return "未知楼层";
}

//获取当前建筑物是否着火
var checkFire = function(id) {
    var index = -1,name;
    if(id == 1) {
        index = 0;
        name = "训练楼";
    }
    if(id == 2) {
        index = 1;
        name = "飞机";
    }
    if(id == 4) {
        index = 3;
        name = "弧罐";
    }

    if(index < 0) return;

    var obj = $(".div-group-highlight.first ul li").eq(index);

    if (obj.hasClass('on')) {
        setTimeout(function(){
            changeHeatMarkerImg(name,true);
        },2000);        
    }
}

//改变当前起火位置的温度marker
var changeHeatMarkerImg = function(name, isFire) {
    var id = 1;
    switch (name) {
        case "训练楼":
            id = 1;
            break;
        case "飞机":
            id = 2;
            break;
        case "弧罐":
            id = 4;
            break;
        default:
            return;
    }

    changeHeatData(id, isFire);

    if (imgsLayer[1] && imgsLayer[1].markers) {
        for(var i = 0; i < imgsLayer[1].markers.length; i ++) {
            if(imgsLayer[1].markers[i].ID == ('temper-'+id))
                imgsLayer[1].markers[i].url = getHeatImgUrl(lights[id - 1].value);        
        }        
    }
}

var changeHeatData = function(id, isFire) {
    var obj = getpntsByID(lights, id);
    if (isFire) {
        lights[obj.Id - 1].value = 79;
    } else {
        switch (id) {
            case 1:
                lights[0].value = 26;
                break;
            case 2:
                lights[1].value = 34;
                break;
            case 4:
                lights[3].value = 32;
                break;
        }
    }
}
