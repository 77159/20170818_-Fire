
var cars = [];

/** 得到油罐车 */
function getVehicle(map) {
	var ems = fengmap.MapUtil.getDatasByAlias(map, 1, 'externalModel');

	var cname = "youguanche01.gltf";

	var group = map.getFMGroup(1).o3d_;
	var layer = group.carLayer;

	if (!layer ) {
		layer = new fm.Group();
		group.add(layer);
	}

	for (var i = 0; i < ems.length; i++) {
		var em = ems[i];

		if (em.data_.theme_.model === cname) {
			var vehicle = em.o3d_.clone();

			layer.add(vehicle);
			cars.push(vehicle);

			return vehicle;
		}
	}

	return null;
}

/**
 * 线上(点集合),给个距离. 得到对应的点, 以及此点的向量
 */
function getPointByDistance(vs, distance, offset) {
	var lastV = null, len = 0, _dis, _sub, vsLen = vs.length;

	offset = offset || 0;
	var upVec = new fm.Vector3(0, 1, 0);

	var res = {
		point: null,
		vector: null,
		isOver: false,
		index: 0
	};

	for (var i = 0; i < vsLen; i++) {
		var v = vs[i];

		if (i > 0) {
			_sub = v.clone().sub(lastV);
			_dis = _sub.length();
			len += _dis;

			if (len >= distance) {
				res.vector = _sub.normalize();
				res.point = lastV.clone().add(res.vector.clone().multiplyScalar(distance - len + _dis));
				res.index = i;

				// offset
				if (offset) {
					var _vec = res.vector.clone().applyAxisAngle(upVec, -Math.PI / 2);
					res.point.add(_vec.multiplyScalar(offset));
				}

				return res;
			}
		}

		lastV = v.clone();
	}

	// 最后一个点
	res.isOver = true;

	return res;
}

/**
 * 开车动画
 * 	config:
 * 		map: map
 * 		vehicle: mesh
 *   	line: lineObject
 *   	speed: float
 *   	loop: bool, false
 *   	offset: float, 0
 *   	startDistance: float, 0
 */
function drive(config) {

	if (!config || !config.map || !config.line) {
		return;
	}

	var map = config.map;
	var vehicle = config.vehicle;
	var line = config.line;
	var speed = config.speed || 12;
	var loop = config.loop || false;
	var offset = config.offset || 0;

	var dis = config.startDistance || 0;

	var axisX = new fm.Vector3(1, 0, 0);
	var rotateY = config.rotateY === undefined ? Math.PI / 2 : config.rotateY;
	var positionY = config.positionY || 0;

	var vs = line.geometry.pathVertices, res;

	function run(delta) {
		dis += delta * speed;

		res = getPointByDistance(vs, dis, offset);

		if (!res.isOver) {

			// set position
			vehicle.position.x = res.point.x + line.position.x;
			vehicle.position.z = res.point.z + line.position.z;
			vehicle.position.y = positionY;

			// set rotation
			vehicle.lookAt(vehicle.position.clone().add(res.vector));
			vehicle.rotateY( rotateY );

		} else {
			if (loop) {
				dis = 0;
			} else {
				vehicle.stop();
				vehicle.stop = null;
			}
		}
	}

	if (vehicle.stop) {
		vehicle.stop();
	}

	map.on('update', run);

	vehicle.stop = function () {
		if (vehicle._stop) {
			vehicle._stop();
		}
		map.off('update', run);
	};
}

/**
 * 创建文字标注
 */
function addTextMarker(text, text2, title, isMan) {
	var cm = new fengmap.FMCompositionMarker(map);

	var _text = [
		{text: text, name: 't1'},
		{text: (title || '灭火剂: ') + text2, name: 't2', size: 10, color: '#3382E5'}
	];

	if (isMan) {
		_text = _text.concat([
			{text: '环境温度: 39℃', name: 't2', size: 10, color: '#DC9709'},
			{text: '二氧化硫: 78ppm', name: 't2', size: 10, color: '#C81834'}
		])
	}

	cm.setTexts(_text);

	return cm;
};

/**
 * 清除线与车
 */
function clearCars() {

	cars.forEach(function (car) {
		car.parent.remove(car);
		car.geometry.dispose();
		if (car.stop) {
			car.stop();
		}
	});

	lineObjects.forEach(function(l) {
		l.dispose();
	});

	cars.length = 0;
	lineObjects.length = 0;

	for (var k in glo.teams) {
		glo.teams[k].cars.length = 0;
		glo.teams[k].lines.length = 0;
		glo.teams[k].index = 0;
		clearTimeout(glo.teams[k]._id);
	}
}

