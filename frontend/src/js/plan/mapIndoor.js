var fmap;
var fmapID = 'kt01',
	defaultMarkers = {},
	isMarkerLoaded = {
		"goverments": {
			"1": false,
			"2": false,
			"3": false,
			"4": false,
			"5": false,
			"6": false,
			"7": false,
			"8": false,
			"9": false
		},
		"warnings": {
			"1": false,
			"2": false
		}
	};

var tableMarkers = {
	"goverments": {
		"1": [{
			"name": "RTU",
			"data": "640",
			"status": "在线",
			"lonlat": "9451590.8423,5531404.32345,5",
			"id": "KTSB-02-0003",
			"floor": "F4"
		}, {
			"name": "RTU",
			"data": "640",
			"status": "在线",
			"lonlat": "9451633.29957,5531410.49621,3",
			"id": "KTSB-02-0002",
			"floor": "F2"
		}, {
			"name": "报警主机",
			"data": "28",
			"status": "在线",
			"lonlat": "9451557.49641,5531432.10643,2",
			"id": "KTSB-01-0001",
			"floor": "F1"
		}, {
			"name": "RTU",
			"data": "640",
			"status": "在线",
			"lonlat": "9451597.47944,5531394.90418,1",
			"id": "KTSB-02-0001",
			"floor": "B1"
		}],
		"2": [{
			"name": "烟感探测器",
			"data": "0.00-250.00V",
			"status": "227.88V",
			"lonlat": "9451535.68799,5531427.94286,6",
			"id": "KTSB-03-0033",
			"floor": "F5"
		}, {
			"name": "烟感探测器",
			"data": "0.00-250.00V",
			"status": "227.88V",
			"lonlat": "9451615.46664,5531396.06712,6",
			"id": "KTSB-03-0036",
			"floor": "F5"
		}, {
			"name": "温感探测器",
			"data": "0.00-250.00V",
			"status": "227.88V",
			"lonlat": "9451585.67317,5531415.34867,6",
			"id": "KTSB-04-0033",
			"floor": "F5"
		}, {
			"name": "温感探测器",
			"data": "0.00-250.00V",
			"status": "227.88V",
			"lonlat": "9451637.79619,5531395.76947,6",
			"id": "KTSB-04-0036",
			"floor": "F5"
		}, {
			"name": "手动报警器",
			"data": "0.00-250.00V",
			"status": "227.88V",
			"lonlat": "9451560.47997,5531392.26654,5",
			"id": "KTSB-05-0046",
			"floor": "F4"
		}, {
			"name": "手动报警器",
			"data": "0.00-250.00V",
			"status": "227.88V",
			"lonlat": "9451584.32119,5531380.90861,5",
			"id": "KTSB-05-0049",
			"floor": "F4"
		}, {
			"name": "手动报警器",
			"data": "0.00-250.00V",
			"status": "227.88V",
			"lonlat": "9451618.25961,5531404.8196,5",
			"id": "KTSB-05-0052",
			"floor": "F4"
		}, {
			"name": "手动报警器",
			"data": "0.00-250.00V",
			"status": "227.88V",
			"lonlat": "9451577.65981,5531426.386,5",
			"id": "KTSB-05-0055",
			"floor": "F4"
		}, {
			"name": "烟感探测器",
			"data": "0.00-250.00V",
			"status": "227.88V",
			"lonlat": "9451595.92231,5531377.81214,5",
			"id": "KTSB-03-0025",
			"floor": "F4"
		}, {
			"name": "烟感探测器",
			"data": "0.00-250.00V",
			"status": "227.88V",
			"lonlat": "9451556.86973,5531402.10094,5",
			"id": "KTSB-03-0028",
			"floor": "F4"
		}, {
			"name": "温感探测器",
			"data": "0.00-250.00V",
			"status": "227.88V",
			"lonlat": "9451611.73119,5531399.98559,5",
			"id": "KTSB-04-0025",
			"floor": "F4"
		}, {
			"name": "温感探测器",
			"data": "0.00-250.00V",
			"status": "227.88V",
			"lonlat": "9451543.33626,5531428.16378,5",
			"id": "KTSB-04-0028",
			"floor": "F4"
		}, {
			"name": "手动报警器",
			"data": "0.00-250.00V",
			"status": "227.88V",
			"lonlat": "9451605.08435,5531379.08549,4",
			"id": "KTSB-05-0034",
			"floor": "F3"
		}, {
			"name": "手动报警器",
			"data": "0.00-250.00V",
			"status": "227.88V",
			"lonlat": "9451527.17572,5531384.96727,4",
			"id": "KTSB-05-0037",
			"floor": "F3"
		}, {
			"name": "手动报警器",
			"data": "0.00-250.00V",
			"status": "227.88V",
			"lonlat": "9451613.01057,5531423.00448,4",
			"id": "KTSB-05-0040",
			"floor": "F3"
		}, {
			"name": "手动报警器",
			"data": "0.00-250.00V",
			"status": "227.88V",
			"lonlat": "9451627.93721,5531374.19652,4",
			"id": "KTSB-05-0043",
			"floor": "F3"
		}, {
			"name": "烟感探测器",
			"data": "0.00-250.00V",
			"status": "227.88V",
			"lonlat": "9451611.93933,5531384.38683,4",
			"id": "KTSB-03-0021",
			"floor": "F3"
		}, {
			"name": "烟感探测器",
			"data": "0.00-250.00V",
			"status": "227.88V",
			"lonlat": "9451641.05127,5531382.09598,4",
			"id": "KTSB-03-0024",
			"floor": "F3"
		}, {
			"name": "温感探测器",
			"data": "0.00-250.00V",
			"status": "227.88V",
			"lonlat": "9451597.03003,5531398.93894,4",
			"id": "KTSB-04-0021",
			"floor": "F3"
		}, {
			"name": "温感探测器",
			"data": "0.00-250.00V",
			"status": "227.88V",
			"lonlat": "9451622.32425,5531383.91058,4",
			"id": "KTSB-04-0024",
			"floor": "F3"
		}, {
			"name": "手动报警器",
			"data": "0.00-250.00V",
			"status": "227.88V",
			"lonlat": "9451547.60328,5531384.04916,3",
			"id": "KTSB-05-0024",
			"floor": "F2"
		}, {
			"name": "手动报警器",
			"data": "0.00-250.00V",
			"status": "227.88V",
			"lonlat": "9451649.88225,5531375.48399,3",
			"id": "KTSB-05-0027",
			"floor": "F2"
		}, {
			"name": "手动报警器",
			"data": "0.00-250.00V",
			"status": "227.88V",
			"lonlat": "9451629.59886,5531377.64147,3",
			"id": "KTSB-05-0030",
			"floor": "F2"
		}, {
			"name": "手动报警器",
			"data": "0.00-250.00V",
			"status": "227.88V",
			"lonlat": "9451585.96336,5531381.77729,3",
			"id": "KTSB-05-0033",
			"floor": "F2"
		}, {
			"name": "烟感探测器",
			"data": "0.00-250.00V",
			"status": "227.88V",
			"lonlat": "9451559.00442,5531426.68875,3",
			"id": "KTSB-03-0015",
			"floor": "F2"
		}, {
			"name": "烟感探测器",
			"data": "0.00-250.00V",
			"status": "227.88V",
			"lonlat": "9451544.7169,5531389.96451,3",
			"id": "KTSB-03-0018",
			"floor": "F2"
		}, {
			"name": "温感探测器",
			"data": "0.00-250.00V",
			"status": "227.88V",
			"lonlat": "9451598.057,5531420.2329,3",
			"id": "KTSB-04-0015",
			"floor": "F2"
		}, {
			"name": "温感探测器",
			"data": "0.00-250.00V",
			"status": "227.88V",
			"lonlat": "9451654.67795,5531398.00786,3",
			"id": "KTSB-04-0018",
			"floor": "F2"
		}, {
			"name": "手动报警器",
			"data": "0.00-250.00V",
			"status": "227.88V",
			"lonlat": "9451607.35337,5531376.25274,2",
			"id": "KTSB-05-0015",
			"floor": "F1"
		}, {
			"name": "手动报警器",
			"data": "0.00-250.00V",
			"status": "227.88V",
			"lonlat": "9451611.48926,5531426.1925,2",
			"id": "KTSB-05-0018",
			"floor": "F1"
		}, {
			"name": "手动报警器",
			"data": "0.00-250.00V",
			"status": "227.88V",
			"lonlat": "9451567.1245,5531397.718,2",
			"id": "KTSB-05-0021",
			"floor": "F1"
		}, {
			"name": "烟感探测器",
			"data": "0.00-250.00V",
			"status": "227.88V",
			"lonlat": "9451607.74397,5531412.95784,2",
			"id": "KTSB-03-0009",
			"floor": "F1"
		}, {
			"name": "烟感探测器",
			"data": "0.00-250.00V",
			"status": "227.88V",
			"lonlat": "9451602.76979,5531426.26641,2",
			"id": "KTSB-03-0012",
			"floor": "F1"
		}, {
			"name": "温感探测器",
			"data": "0.00-250.00V",
			"status": "227.88V",
			"lonlat": "9451602.0369,5531418.80183,2",
			"id": "KTSB-04-0009",
			"floor": "F1"
		}, {
			"name": "温感探测器",
			"data": "0.00-250.00V",
			"status": "227.88V",
			"lonlat": "9451645.19846,5531377.52675,2",
			"id": "KTSB-04-0012",
			"floor": "F1"
		}, {
			"name": "手动报警器",
			"data": "0.00-250.00V",
			"status": "227.88V",
			"lonlat": "9451594.91775,5531424.64639,1",
			"id": "KTSB-05-0003",
			"floor": "B1"
		}, {
			"name": "手动报警器",
			"data": "0.00-250.00V",
			"status": "227.88V",
			"lonlat": "9451655.2636,5531377.28059,1",
			"id": "KTSB-05-0006",
			"floor": "B1"
		}, {
			"name": "手动报警器",
			"data": "0.00-250.00V",
			"status": "227.88V",
			"lonlat": "9451572.2363,5531383.1301,1",
			"id": "KTSB-05-0009",
			"floor": "B1"
		}, {
			"name": "手动报警器",
			"data": "0.00-250.00V",
			"status": "227.88V",
			"lonlat": "9451578.5281,5531416.88306,1",
			"id": "KTSB-05-0012",
			"floor": "B1"
		}, {
			"name": "烟感探测器",
			"data": "0.00-250.00V",
			"status": "227.88V",
			"lonlat": "9451586.73381,5531394.94497,1",
			"id": "KTSB-03-0003",
			"floor": "B1"
		}, {
			"name": "烟感探测器",
			"data": "0.00-250.00V",
			"status": "227.88V",
			"lonlat": "9451555.62139,5531396.92053,1",
			"id": "KTSB-03-0006",
			"floor": "B1"
		}, {
			"name": "温感探测器",
			"data": "0.00-250.00V",
			"status": "227.88V",
			"lonlat": "9451590.61128,5531410.59797,1",
			"id": "KTSB-04-0003",
			"floor": "B1"
		}, {
			"name": "温感探测器",
			"data": "0.00-250.00V",
			"status": "227.88V",
			"lonlat": "9451664.93289,5531363.14926,1",
			"id": "KTSB-04-0006",
			"floor": "B1"
		}],
		"3": [{
			"name": "水压表",
			"data": "0.20-0.80Mpa",
			"status": "0.286Mpa",
			"lonlat": "9451645.37079,5531401.13346,6",
			"id": "KTSB-07-0011",
			"floor": "F5"
		}, {
			"name": "水位仪",
			"data": "35.00-80.00cm",
			"status": "58.15cm",
			"lonlat": "9451630.44826,5531411.50515,6",
			"id": "KTSB-08-0012",
			"floor": "F5"
		}, {
			"name": "洒水喷头",
			"data": "0.20-0.112Mpa",
			"status": "0.318Mpa",
			"lonlat": "9451561.66968,5531388.56132,6",
			"id": "KTSB-06-0033",
			"floor": "F5"
		}, {
			"name": "洒水喷头",
			"data": "0.20-0.115Mpa",
			"status": "0.321Mpa",
			"lonlat": "9451604.26768,5531385.38631,6",
			"id": "KTSB-06-0036",
			"floor": "F5"
		}, {
			"name": "水位仪",
			"data": "35.00-80.00cm",
			"status": "58.15cm",
			"lonlat": "9451542.33195,5531400.17632,5",
			"id": "KTSB-08-0009",
			"floor": "F4"
		}, {
			"name": "洒水喷头",
			"data": "0.20-0.105Mpa",
			"status": "0.311Mpa",
			"lonlat": "9451593.7439,5531396.19653,5",
			"id": "KTSB-06-0026",
			"floor": "F4"
		}, {
			"name": "洒水喷头",
			"data": "0.20-0.108Mpa",
			"status": "0.314Mpa",
			"lonlat": "9451637.66482,5531401.35592,5",
			"id": "KTSB-06-0029",
			"floor": "F4"
		}, {
			"name": "水压表",
			"data": "0.20-0.80Mpa",
			"status": "0.286Mpa",
			"lonlat": "9451607.2562,5531403.83375,4",
			"id": "KTSB-07-0008",
			"floor": "F3"
		}, {
			"name": "洒水喷头",
			"data": "0.20-0.98Mpa",
			"status": "0.304Mpa",
			"lonlat": "9451544.78795,5531414.86689,4",
			"id": "KTSB-06-0019",
			"floor": "F3"
		}, {
			"name": "洒水喷头",
			"data": "0.20-0.101Mpa",
			"status": "0.307Mpa",
			"lonlat": "9451595.98492,5531395.0231,4",
			"id": "KTSB-06-0022",
			"floor": "F3"
		}, {
			"name": "水压表",
			"data": "0.20-0.80Mpa",
			"status": "0.286Mpa",
			"lonlat": "9451582.31426,5531393.73835,3",
			"id": "KTSB-07-0005",
			"floor": "F2"
		}, {
			"name": "水位仪",
			"data": "35.00-80.00cm",
			"status": "58.15cm",
			"lonlat": "9451617.34517,5531402.73421,3",
			"id": "KTSB-08-0006",
			"floor": "F2"
		}, {
			"name": "洒水喷头",
			"data": "0.20-0.94Mpa",
			"status": "0.300Mpa",
			"lonlat": "9451593.87129,5531393.03368,3",
			"id": "KTSB-06-0015",
			"floor": "F2"
		}, {
			"name": "洒水喷头",
			"data": "0.20-0.97Mpa",
			"status": "0.303Mpa",
			"lonlat": "9451633.93457,5531417.48123,3",
			"id": "KTSB-06-0018",
			"floor": "F2"
		}, {
			"name": "水位仪",
			"data": "35.00-80.00cm",
			"status": "58.15cm",
			"lonlat": "9451563.54038,5531386.7034,2",
			"id": "KTSB-08-0003",
			"floor": "F1"
		}, {
			"name": "洒水喷头",
			"data": "0.20-0.87Mpa",
			"status": "0.293Mpa",
			"lonlat": "9451582.27821,5531415.49012,2",
			"id": "KTSB-06-0008",
			"floor": "F1"
		}, {
			"name": "洒水喷头",
			"data": "0.20-0.90Mpa",
			"status": "0.296Mpa",
			"lonlat": "9451648.94232,5531389.81447,2",
			"id": "KTSB-06-0011",
			"floor": "F1"
		}, {
			"name": "水压表",
			"data": "0.20-0.80Mpa",
			"status": "0.286Mpa",
			"lonlat": "9451645.24168,5531377.43701,1",
			"id": "KTSB-07-0002",
			"floor": "B1"
		}, {
			"name": "洒水喷头",
			"data": "0.20-0.80Mpa",
			"status": "0.286Mpa",
			"lonlat": "9451531.29864,5531424.88484,1",
			"id": "KTSB-06-0001",
			"floor": "B1"
		}, {
			"name": "洒水喷头",
			"data": "0.20-0.83Mpa",
			"status": "0.289Mpa",
			"lonlat": "9451537.43698,5531403.03021,1",
			"id": "KTSB-06-0004",
			"floor": "B1"
		}],
		"4": [{
			"name": "防火阀",
			"data": "0.00-100.00A",
			"status": "28.99A",
			"lonlat": "9451542.75194,5531403.80135,6",
			"id": "KTSB-11-0021",
			"floor": "F5"
		}, {
			"name": "防火阀",
			"data": "0.00-100.00A",
			"status": "28.99A",
			"lonlat": "9451608.47898,5531384.3853,6",
			"id": "KTSB-11-0024",
			"floor": "F5"
		}, {
			"name": "防火阀",
			"data": "0.00-100.00A",
			"status": "28.99A",
			"lonlat": "9451635.33758,5531420.73669,5",
			"id": "KTSB-11-0017",
			"floor": "F4"
		}, {
			"name": "防火阀",
			"data": "0.00-100.00A",
			"status": "28.99A",
			"lonlat": "9451644.44809,5531376.22707,5",
			"id": "KTSB-11-0020",
			"floor": "F4"
		}, {
			"name": "防火阀",
			"data": "0.00-100.00A",
			"status": "28.99A",
			"lonlat": "9451563.76686,5531397.71126,4",
			"id": "KTSB-11-0013",
			"floor": "F3"
		}, {
			"name": "防火阀",
			"data": "0.00-100.00A",
			"status": "28.99A",
			"lonlat": "9451636.71263,5531395.25063,4",
			"id": "KTSB-11-0016",
			"floor": "F3"
		}, {
			"name": "防火阀",
			"data": "0.00-100.00A",
			"status": "28.99A",
			"lonlat": "9451533.34067,5531392.93887,3",
			"id": "KTSB-11-0009",
			"floor": "F2"
		}, {
			"name": "防火阀",
			"data": "0.00-100.00A",
			"status": "28.99A",
			"lonlat": "9451637.6264,5531381.29057,3",
			"id": "KTSB-11-0012",
			"floor": "F2"
		}, {
			"name": "防火阀",
			"data": "0.00-100.00A",
			"status": "28.99A",
			"lonlat": "9451577.98666,5531403.3788,2",
			"id": "KTSB-11-0005",
			"floor": "F1"
		}, {
			"name": "防火阀",
			"data": "0.00-100.00A",
			"status": "28.99A",
			"lonlat": "9451547.95639,5531400.99754,2",
			"id": "KTSB-11-0008",
			"floor": "F1"
		}, {
			"name": "防火阀",
			"data": "0.00-100.00A",
			"status": "28.99A",
			"lonlat": "9451552.92026,5531412.68309,1",
			"id": "KTSB-11-0001",
			"floor": "B1"
		}, {
			"name": "防火阀",
			"data": "0.00-100.00A",
			"status": "28.99A",
			"lonlat": "9451626.56453,5531391.86563,1",
			"id": "KTSB-11-0004",
			"floor": "B1"
		}],
		"5": [{
			"name": "疏散指示标志",
			"data": "0.00-100.00A",
			"status": "28.99A",
			"lonlat": "9451626.13047,5531411.63127,6",
			"id": "KTSB-12-0050",
			"floor": "F5"
		}, {
			"name": "疏散指示标志",
			"data": "0.00-100.00A",
			"status": "28.99A",
			"lonlat": "9451544.42697,5531389.08872,6",
			"id": "KTSB-12-0053",
			"floor": "F5"
		}, {
			"name": "消防电梯",
			"data": "0.00-250.00V",
			"status": "227.88V",
			"lonlat": "9451547.88442,5531390.34748,6",
			"id": "KTSB-13-0006",
			"floor": "F5"
		}, {
			"name": "防火门报警器",
			"data": "0.00-100.00A",
			"status": "28.99A",
			"lonlat": "9451577.17452,5531387.31006,6",
			"id": "KTSB-14-0028",
			"floor": "F5"
		}, {
			"name": "安全出口",
			"data": "N/A",
			"status": "N/A",
			"lonlat": "9451537.37057,5531432.36857,6",
			"id": "KTSB-19-0052",
			"floor": "F5"
		}, {
			"name": "安全出口",
			"data": "N/A",
			"status": "N/A",
			"lonlat": "9451658.85662,5531397.35474,6",
			"id": "KTSB-19-0055",
			"floor": "F5"
		}, {
			"name": "安全出口",
			"data": "N/A",
			"status": "N/A",
			"lonlat": "9451652.0983,5531373.31898,6",
			"id": "KTSB-19-0058",
			"floor": "F5"
		}, {
			"name": "疏散指示标志",
			"data": "0.00-100.00A",
			"status": "28.99A",
			"lonlat": "9451543.90776,5531414.64619,5",
			"id": "KTSB-12-0041",
			"floor": "F4"
		}, {
			"name": "疏散指示标志",
			"data": "0.00-100.00A",
			"status": "28.99A",
			"lonlat": "9451617.56791,5531417.29202,5",
			"id": "KTSB-12-0044",
			"floor": "F4"
		}, {
			"name": "疏散指示标志",
			"data": "0.00-100.00A",
			"status": "28.99A",
			"lonlat": "9451635.77128,5531385.75363,5",
			"id": "KTSB-12-0047",
			"floor": "F4"
		}, {
			"name": "防火门报警器",
			"data": "0.00-100.00A",
			"status": "28.99A",
			"lonlat": "9451541.89979,5531391.02392,5",
			"id": "KTSB-14-0022",
			"floor": "F4"
		}, {
			"name": "防火门报警器",
			"data": "0.00-100.00A",
			"status": "28.99A",
			"lonlat": "9451597.96952,5531430.67181,5",
			"id": "KTSB-14-0025",
			"floor": "F4"
		}, {
			"name": "安全出口",
			"data": "N/A",
			"status": "N/A",
			"lonlat": "9451611.60627,5531426.49976,5",
			"id": "KTSB-19-0046",
			"floor": "F4"
		}, {
			"name": "安全出口",
			"data": "N/A",
			"status": "N/A",
			"lonlat": "9451569.41314,5531379.46517,5",
			"id": "KTSB-19-0049",
			"floor": "F4"
		}, {
			"name": "疏散指示标志",
			"data": "0.00-100.00A",
			"status": "28.99A",
			"lonlat": "9451548.94487,5531409.65414,4",
			"id": "KTSB-12-0032",
			"floor": "F3"
		}, {
			"name": "疏散指示标志",
			"data": "0.00-100.00A",
			"status": "28.99A",
			"lonlat": "9451579.26618,5531382.66658,4",
			"id": "KTSB-12-0035",
			"floor": "F3"
		}, {
			"name": "疏散指示标志",
			"data": "0.00-100.00A",
			"status": "28.99A",
			"lonlat": "9451626.65315,5531383.93658,4",
			"id": "KTSB-12-0038",
			"floor": "F3"
		}, {
			"name": "防火门报警器",
			"data": "0.00-100.00A",
			"status": "28.99A",
			"lonlat": "9451552.86402,5531408.37818,4",
			"id": "KTSB-14-0016",
			"floor": "F3"
		}, {
			"name": "防火门报警器",
			"data": "0.00-100.00A",
			"status": "28.99A",
			"lonlat": "9451598.58411,5531416.51413,4",
			"id": "KTSB-14-0019",
			"floor": "F3"
		}, {
			"name": "安全出口",
			"data": "N/A",
			"status": "N/A",
			"lonlat": "9451573.49924,5531429.59369,4",
			"id": "KTSB-19-0037",
			"floor": "F3"
		}, {
			"name": "安全出口",
			"data": "N/A",
			"status": "N/A",
			"lonlat": "9451607.38975,5531376.65954,4",
			"id": "KTSB-19-0040",
			"floor": "F3"
		}, {
			"name": "安全出口",
			"data": "N/A",
			"status": "N/A",
			"lonlat": "9451524.3502,5531382.93068,4",
			"id": "KTSB-19-0043",
			"floor": "F3"
		}, {
			"name": "疏散指示标志",
			"data": "0.00-100.00A",
			"status": "28.99A",
			"lonlat": "9451602.06633,5531411.74417,3",
			"id": "KTSB-12-0026",
			"floor": "F2"
		}, {
			"name": "疏散指示标志",
			"data": "0.00-100.00A",
			"status": "28.99A",
			"lonlat": "9451570.74842,5531406.30256,3",
			"id": "KTSB-12-0029",
			"floor": "F2"
		}, {
			"name": "消防电梯",
			"data": "0.00-250.00V",
			"status": "227.88V",
			"lonlat": "9451547.89278,5531390.11444,3",
			"id": "KTSB-13-0003",
			"floor": "F2"
		}, {
			"name": "防火门报警器",
			"data": "0.00-100.00A",
			"status": "28.99A",
			"lonlat": "9451605.02967,5531423.21388,3",
			"id": "KTSB-14-0013",
			"floor": "F2"
		}, {
			"name": "安全出口",
			"data": "N/A",
			"status": "N/A",
			"lonlat": "9451537.2308,5531432.0837,3",
			"id": "KTSB-19-0028",
			"floor": "F2"
		}, {
			"name": "安全出口",
			"data": "N/A",
			"status": "N/A",
			"lonlat": "9451658.81652,5531397.4933,3",
			"id": "KTSB-19-0031",
			"floor": "F2"
		}, {
			"name": "安全出口",
			"data": "N/A",
			"status": "N/A",
			"lonlat": "9451652.05821,5531373.45754,3",
			"id": "KTSB-19-0034",
			"floor": "F2"
		}, {
			"name": "疏散指示标志",
			"data": "0.00-100.00A",
			"status": "28.99A",
			"lonlat": "9451548.85157,5531418.2149,2",
			"id": "KTSB-12-0010",
			"floor": "F1"
		}, {
			"name": "疏散指示标志",
			"data": "0.00-100.00A",
			"status": "28.99A",
			"lonlat": "9451626.42756,5531421.17824,2",
			"id": "KTSB-12-0013",
			"floor": "F1"
		}, {
			"name": "疏散指示标志",
			"data": "0.00-100.00A",
			"status": "28.99A",
			"lonlat": "9451534.03487,5531387.629,2",
			"id": "KTSB-12-0016",
			"floor": "F1"
		}, {
			"name": "疏散指示标志",
			"data": "0.00-100.00A",
			"status": "28.99A",
			"lonlat": "9451656.06095,5531388.264,2",
			"id": "KTSB-12-0019",
			"floor": "F1"
		}, {
			"name": "疏散指示标志",
			"data": "0.00-100.00A",
			"status": "28.99A",
			"lonlat": "9451543.7257,5531380.43938,2",
			"id": "KTSB-12-0022",
			"floor": "F1"
		}, {
			"name": "防火门报警器",
			"data": "0.00-100.00A",
			"status": "28.99A",
			"lonlat": "9451573.38555,5531403.45376,2",
			"id": "KTSB-14-0006",
			"floor": "F1"
		}, {
			"name": "防火门报警器",
			"data": "0.00-100.00A",
			"status": "28.99A",
			"lonlat": "9451622.80982,5531372.44454,2",
			"id": "KTSB-14-0009",
			"floor": "F1"
		}, {
			"name": "安全出口",
			"data": "N/A",
			"status": "N/A",
			"lonlat": "9451548.22285,5531372.16139,2",
			"id": "KTSB-19-0014",
			"floor": "F1"
		}, {
			"name": "安全出口",
			"data": "N/A",
			"status": "N/A",
			"lonlat": "9451568.90802,5531370.60564,2",
			"id": "KTSB-19-0017",
			"floor": "F1"
		}, {
			"name": "安全出口",
			"data": "N/A",
			"status": "N/A",
			"lonlat": "9451621.65546,5531366.37274,2",
			"id": "KTSB-19-0020",
			"floor": "F1"
		}, {
			"name": "安全出口",
			"data": "N/A",
			"status": "N/A",
			"lonlat": "9451666.60649,5531387.82167,2",
			"id": "KTSB-19-0023",
			"floor": "F1"
		}, {
			"name": "安全出口",
			"data": "N/A",
			"status": "N/A",
			"lonlat": "9451523.29332,5531417.6654,2",
			"id": "KTSB-19-0026",
			"floor": "F1"
		}, {
			"name": "疏散指示标志",
			"data": "0.00-100.00A",
			"status": "28.99A",
			"lonlat": "9451548.00132,5531398.04675,1",
			"id": "KTSB-12-0002",
			"floor": "B1"
		}, {
			"name": "疏散指示标志",
			"data": "0.00-100.00A",
			"status": "28.99A",
			"lonlat": "9451621.58705,5531408.07779,1",
			"id": "KTSB-12-0005",
			"floor": "B1"
		}, {
			"name": "疏散指示标志",
			"data": "0.00-100.00A",
			"status": "28.99A",
			"lonlat": "9451579.63177,5531397.74468,1",
			"id": "KTSB-12-0008",
			"floor": "B1"
		}, {
			"name": "防火门报警器",
			"data": "0.00-100.00A",
			"status": "28.99A",
			"lonlat": "9451612.43146,5531384.52021,1",
			"id": "KTSB-14-0002",
			"floor": "B1"
		}, {
			"name": "防火门报警器",
			"data": "0.00-100.00A",
			"status": "28.99A",
			"lonlat": "9451641.35929,5531401.09969,1",
			"id": "KTSB-14-0005",
			"floor": "B1"
		}, {
			"name": "安全出口",
			"data": "N/A",
			"status": "N/A",
			"lonlat": "9451569.42924,5531379.86945,1",
			"id": "KTSB-19-0003",
			"floor": "B1"
		}, {
			"name": "安全出口",
			"data": "N/A",
			"status": "N/A",
			"lonlat": "9451606.8414,5531369.33901,1",
			"id": "KTSB-19-0006",
			"floor": "B1"
		}, {
			"name": "安全出口",
			"data": "N/A",
			"status": "N/A",
			"lonlat": "9451656.30535,5531398.16542,1",
			"id": "KTSB-19-0009",
			"floor": "B1"
		}, {
			"name": "安全出口",
			"data": "N/A",
			"status": "N/A",
			"lonlat": "9451537.51513,5531431.31249,1",
			"id": "KTSB-19-0012",
			"floor": "B1"
		}],
		"6": [{
			"name": "消火栓",
			"data": "0.20-0.80Mpa",
			"status": "0.286Mpa",
			"lonlat": "9451597.79513,5531377.34864,6",
			"id": "KTSB-16-0118",
			"floor": "F5"
		}, {
			"name": "灭火器",
			"data": "0.20-0.80Mpa",
			"status": "0.286Mpa",
			"lonlat": "9451637.21284,5531418.5664,6",
			"id": "KTSB-17-0061",
			"floor": "F5"
		}, {
			"name": "消火栓",
			"data": "0.20-0.80Mpa",
			"status": "0.286Mpa",
			"lonlat": "9451649.75624,5531375.69115,5",
			"id": "KTSB-16-0088",
			"floor": "F4"
		}, {
			"name": "消火栓",
			"data": "0.20-0.80Mpa",
			"status": "0.286Mpa",
			"lonlat": "9451563.12094,5531405.68573,5",
			"id": "KTSB-16-0097",
			"floor": "F4"
		}, {
			"name": "消火栓",
			"data": "0.20-0.80Mpa",
			"status": "0.286Mpa",
			"lonlat": "9451585.66406,5531418.29633,5",
			"id": "KTSB-16-0106",
			"floor": "F4"
		}, {
			"name": "灭火器",
			"data": "0.20-0.80Mpa",
			"status": "0.286Mpa",
			"lonlat": "9451654.59403,5531375.35331,5",
			"id": "KTSB-17-0051",
			"floor": "F4"
		}, {
			"name": "消火栓",
			"data": "0.20-0.80Mpa",
			"status": "0.286Mpa",
			"lonlat": "9451646.81546,5531383.41269,4",
			"id": "KTSB-16-0071",
			"floor": "F3"
		}, {
			"name": "消火栓",
			"data": "0.20-0.80Mpa",
			"status": "0.286Mpa",
			"lonlat": "9451605.65248,5531414.53276,4",
			"id": "KTSB-16-0080",
			"floor": "F3"
		}, {
			"name": "灭火器",
			"data": "0.20-0.80Mpa",
			"status": "0.286Mpa",
			"lonlat": "9451654.51127,5531375.21298,4",
			"id": "KTSB-17-0041",
			"floor": "F3"
		}, {
			"name": "消火栓",
			"data": "0.20-0.80Mpa",
			"status": "0.286Mpa",
			"lonlat": "9451648.25744,5531391.73842,3",
			"id": "KTSB-16-0055",
			"floor": "F2"
		}, {
			"name": "消火栓",
			"data": "0.20-0.80Mpa",
			"status": "0.286Mpa",
			"lonlat": "9451614.16578,5531425.11391,3",
			"id": "KTSB-16-0064",
			"floor": "F2"
		}, {
			"name": "灭火器",
			"data": "0.20-0.80Mpa",
			"status": "0.286Mpa",
			"lonlat": "9451608.33727,5531425.48681,3",
			"id": "KTSB-17-0032",
			"floor": "F2"
		}, {
			"name": "消火栓",
			"data": "0.20-0.80Mpa",
			"status": "0.286Mpa",
			"lonlat": "9451647.61819,5531385.46599,2",
			"id": "KTSB-16-0038",
			"floor": "F1"
		}, {
			"name": "消火栓",
			"data": "0.20-0.80Mpa",
			"status": "0.286Mpa",
			"lonlat": "9451574.94362,5531428.12203,2",
			"id": "KTSB-16-0047",
			"floor": "F1"
		}, {
			"name": "灭火器",
			"data": "0.20-0.80Mpa",
			"status": "0.286Mpa",
			"lonlat": "9451614.06895,5531423.13656,2",
			"id": "KTSB-17-0021",
			"floor": "F1"
		}, {
			"name": "消火栓",
			"data": "0.20-0.80Mpa",
			"status": "0.286Mpa",
			"lonlat": "9451530.85941,5531391.78835,1",
			"id": "KTSB-16-0005",
			"floor": "B1"
		}, {
			"name": "消火栓",
			"data": "0.20-0.80Mpa",
			"status": "0.286Mpa",
			"lonlat": "9451557.86774,5531381.16755,1",
			"id": "KTSB-16-0014",
			"floor": "B1"
		}, {
			"name": "消火栓",
			"data": "0.20-0.80Mpa",
			"status": "0.286Mpa",
			"lonlat": "9451677.98882,5531390.0364,1",
			"id": "KTSB-16-0023",
			"floor": "B1"
		}, {
			"name": "消火栓",
			"data": "0.20-0.80Mpa",
			"status": "0.286Mpa",
			"lonlat": "9451604.67523,5531389.29856,1",
			"id": "KTSB-16-0032",
			"floor": "B1"
		}, {
			"name": "灭火器",
			"data": "0.20-0.80Mpa",
			"status": "0.286Mpa",
			"lonlat": "9451653.74455,5531393.93262,1",
			"id": "KTSB-17-0009",
			"floor": "B1"
		}],
		"7": [{
			"name": "监控摄像头",
			"data": "查看",
			"status": "在线",
			"lonlat": "9451571.15546,5531417.24596,6",
			"id": "KTSB-18-0053",
			"video": true,
			"floor": "F5"
		}, {
			"name": "监控摄像头",
			"data": "查看",
			"status": "在线",
			"lonlat": "9451629.78724,5531383.80256,6",
			"id": "KTSB-18-0056",
			"video": true,
			"floor": "F5"
		}, {
			"name": "监控摄像头",
			"data": "查看",
			"status": "在线",
			"lonlat": "9451614.44137,5531389.72924,6",
			"id": "KTSB-18-0059",
			"video": true,
			"floor": "F5"
		}, {
			"name": "监控摄像头",
			"data": "查看",
			"status": "在线",
			"lonlat": "9451573.0175,5531422.55614,5",
			"id": "KTSB-18-0042",
			"video": true,
			"floor": "F4"
		}, {
			"name": "监控摄像头",
			"data": "查看",
			"status": "在线",
			"lonlat": "9451618.10259,5531421.92114,5",
			"id": "KTSB-18-0045",
			"video": true,
			"floor": "F4"
		}, {
			"name": "监控摄像头",
			"data": "查看",
			"status": "在线",
			"lonlat": "9451655.6735,5531398.32026,5",
			"id": "KTSB-18-0048",
			"video": true,
			"floor": "F4"
		}, {
			"name": "监控摄像头",
			"data": "查看",
			"status": "在线",
			"lonlat": "9451539.13212,5531414.85607,4",
			"id": "KTSB-18-0031",
			"video": true,
			"floor": "F3"
		}, {
			"name": "监控摄像头",
			"data": "查看",
			"status": "在线",
			"lonlat": "9451599.56307,5531422.37026,4",
			"id": "KTSB-18-0034",
			"video": true,
			"floor": "F3"
		}, {
			"name": "监控摄像头",
			"data": "查看",
			"status": "在线",
			"lonlat": "9451637.13398,5531400.25105,4",
			"id": "KTSB-18-0037",
			"video": true,
			"floor": "F3"
		}, {
			"name": "监控摄像头",
			"data": "查看",
			"status": "在线",
			"lonlat": "9451547.70463,5531401.41521,4",
			"id": "KTSB-18-0040",
			"video": true,
			"floor": "F3"
		}, {
			"name": "监控摄像头",
			"data": "查看",
			"status": "在线",
			"lonlat": "9451598.13351,5531423.76443,3",
			"id": "KTSB-18-0023",
			"video": true,
			"floor": "F2"
		}, {
			"name": "监控摄像头",
			"data": "查看",
			"status": "在线",
			"lonlat": "9451581.40652,5531381.89668,3",
			"id": "KTSB-18-0026",
			"video": true,
			"floor": "F2"
		}, {
			"name": "监控摄像头",
			"data": "查看",
			"status": "在线",
			"lonlat": "9451544.19809,5531385.22779,3",
			"id": "KTSB-18-0029",
			"video": true,
			"floor": "F2"
		}, {
			"name": "监控摄像头",
			"data": "查看",
			"status": "在线",
			"lonlat": "9451538.73212,5531387.76747,2",
			"id": "KTSB-18-0012",
			"video": true,
			"floor": "F1"
		}, {
			"name": "监控摄像头",
			"data": "查看",
			"status": "在线",
			"lonlat": "9451562.48469,5531407.0521,2",
			"id": "KTSB-18-0015",
			"video": true,
			"floor": "F1"
		}, {
			"name": "监控摄像头",
			"data": "查看",
			"status": "在线",
			"lonlat": "9451617.4123,5531422.08047,2",
			"id": "KTSB-18-0018",
			"video": true,
			"floor": "F1"
		}, {
			"name": "监控摄像头",
			"data": "查看",
			"status": "在线",
			"lonlat": "9451520.74532,5531389.78245,1",
			"id": "KTSB-18-0001",
			"video": true,
			"floor": "B1"
		}, {
			"name": "监控摄像头",
			"data": "查看",
			"status": "在线",
			"lonlat": "9451557.83623,5531427.907,1",
			"id": "KTSB-18-0004",
			"video": true,
			"floor": "B1"
		}, {
			"name": "监控摄像头",
			"data": "查看",
			"status": "在线",
			"lonlat": "9451632.0961,5531363.12364,1",
			"id": "KTSB-18-0007",
			"video": true,
			"floor": "B1"
		}, {
			"name": "监控摄像头",
			"data": "查看",
			"status": "在线",
			"lonlat": "9451559.06236,5531370.03193,1",
			"id": "KTSB-18-0010",
			"video": true,
			"floor": "B1"
		}],
		"8": [{
			"name": "消控室",
			"video": true,
			"status": "在线",
			"lonlat": "9451555.71047,5531435.41373,2",
			"id": "KTQY-01-0001",
			"floor": "F1"
		}],
		"9": [{
			"name": "水泵房",
			"video": true,
			"status": "在线",
			"lonlat": "9451534.84764,5531365.09678,1",
			"id": "KTQY-03-0001",
			"floor": "B1"
		}, {
			"name": "配电室",
			"video": true,
			"status": "在线",
			"lonlat": "9451650.58721,5531400.96376,1",
			"id": "KTQY-02-0001",
			"floor": "B1"
		}]
	},
	"warnings": {
		"1": [{
			"name": "监控摄像头",
			"data": "查看",
			"status": "在线",
			"lonlat": "9451632.0961,5531363.12364,1",
			"id": "KTSB-18-0007",
			"video": true,
			"floor": "B1"
		}, {
			"name": "监控摄像头",
			"data": "查看",
			"status": "在线",
			"lonlat": "9451559.06236,5531370.03193,1",
			"id": "KTSB-18-0010",
			"video": true,
			"floor": "B1"
		}],
		"2": [{
			"name": "安全出口",
			"data": "N/A",
			"status": "N/A",
			"lonlat": "9451537.51513,5531431.31249,1",
			"id": "KTSB-19-0012",
			"floor": "B1"
		}]
	}
};

//起点终点坐标
var routePoints = [{
	x: 9451632.0961,
	y: 5531363.12364,
	groupID: 1
}, {
	x: 9451547.70463,
	y: 5531401.41521,
	groupID: 4
}];

var routePoints1 = [{
	x: 9451547.70463,
	y: 5531401.41521,
	groupID: 4
}, {
	x: 9451653.74455,
	y: 5531393.93262,
	groupID: 1
}];

var ssRoutePoints = [
	[{
		x: 9451661.34960349,
		y: 5531355.01443239,
		groupID: 1
	}, {
		x: 9451558.4546211,
		y: 5531368.14501824,
		groupID: 1
	}],
	[{
		x: 9451661.34960349,
		y: 5531355.01443239,
		groupID: 1
	}, {
		x: 9451606.49705294,
		y: 5531413.28985905,
		groupID: 1
	}],
	[{
		x: 9451661.34960349,
		y: 5531355.01443239,
		groupID: 1
	}, {
		x: 9451560.93092735,
		y: 5531402.92014565,
		groupID: 2
	}],
	[{
		x: 9451661.34960349,
		y: 5531355.01443239,
		groupID: 1
	}, {
		x: 9451592.48388908,
		y: 5531419.61416351,
		groupID: 2
	}],
	[{
		x: 9451661.34960349,
		y: 5531355.01443239,
		groupID: 1
	}, {
		x: 9451641.30575167,
		y: 5531395.61774518,
		groupID: 2
	}],
	[{
		x: 9451661.34960349,
		y: 5531355.01443239,
		groupID: 1
	}, {
		x: 9451524.13315941,
		y: 5531379.52676528,
		groupID: 3
	}],
	[{
		x: 9451661.34960349,
		y: 5531355.01443239,
		groupID: 1
	}, {
		x: 9451658.1100962,
		y: 5531406.61513788,
		groupID: 3
	}]
];


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
		x: 10,
		y: 52
	}
});

var modeCtlOpt = new fengmap.controlOptions({
	//设置显示的位置为左上角
	position: fengmap.controlPositon.RIGHT_TOP,
	//位置x,y的偏移量
	offset: {
		x: 10,
		y: 0
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
// var zoomCtlOpt = new fengmap.controlOptions({
// 	//设置显示的位置为左上角
// 	position: fengmap.controlPositon.RIGHT_TOP,
// 	//位置x,y的偏移量
// 	offset: {
// 		x: 20,
// 		y: 373
// 	}
// });

var naviAnalyser = null; //路径分析

$(document).ready(function() {
	createIndoorMap();
});

function createIndoorMap() {
	fmap = new fengmap.FMMap({
		//渲染dom
		container: $('#fengMap')[0],
		mapServerURL: 'data/fmaps/indoor',
		mapThemeURL: 'data/fmaps/indoor/theme',
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
		//创建楼层(按钮型)，创建时请在地图加载后(loadComplete回调)创建。
		groupControl = new fengmap.scrollGroupsControl(fmap, layerCtlOpt);

		//2/3D 切换控件
		toolControl = new fengmap.toolControl(fmap, modeCtlOpt);

		//放大、缩小控件
		//zoomControl = new fengmap.zoomControl(fmap, zoomCtlOpt);

		//fmap.setBackgroundColor('#144973', 1);
		//		 
	});
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
	} else if (type == 'warnings') {
		if (index == 1) return imgUrl + "marker/indoor/warn_on.png";
		else if (index == 2) return imgUrl + "marker/indoor/imparea_on.png";
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

// 导航对象
var navi;
var groupControl;
//第一人称、第三人称控制开关；定位跟随开关
var others = true,
	follow = true;
//导航开关
var navigation = true;

//创建导航路线
function createrNavi(coord) {
	if (!navi) {
		//初始化导航对象
		navi = new fengmap.FMNavigation({
			map: fmap,
			locationMarkerUrl: imgUrl + 'marker/map/pointer.png',
			//设置Marker尺寸
			locationMarkerSize: 43,
			//设置跟随定位的默认为true
			followPosition: true,
			//设置地图是否选择，默认false	
			followAngle: true,
			//导航跟随倾斜角度		
			tiltAngle: 80,
			//导航跟随显示级别
			scaleLevel: 0,
			// 设置导航线的样式
			lineStyle: {
				// 导航线样式
				lineType: fengmap.FMLineType.FMARROW,
				// 设置线的宽度
				lineWidth: 6,
				//设置线的颜色
				// godColor: '#FF0000',
				//设置边线的颜色   
				// godEdgeColor: '#920000',   
			}
		});
		// 设置导航事件
		navi.on('walking', function(data) {
			cardInfo(data);
		});

		//导航路径结束事件
		navi.on('complete', function() {
			createrNavi(routePoints1);
			navi.simulate();
			navigation = true;
		});

		//路径跨楼层事件
		navi.on('crossGroup', function(groupID) {});
	}

	//添加起点
	navi.setStartPoint({
		x: coord[0].x,
		y: coord[0].y,
		height: .2,
		groupID: coord[0].groupID,
		url: imgUrl + 'marker/map/position_cilck.png',
		size: 32
	});

	//添加终点
	navi.setEndPoint({
		x: coord[1].x,
		y: coord[1].y,
		height: .2,
		groupID: coord[1].groupID,
		url: imgUrl + 'marker/map/position_cilck.png',
		size: 32
	});

	// 画出导航线
	navi.drawNaviLine();
};

//显示路径数据
function cardInfo(data) {
	//距终点的距离
	distance = data.remain;
	//路线提示信息
	var prompt = navi.naviDescriptions[data.index];

	if (distance < 1) {
		distance = 0
		var prompt = '到达终点';
	}

	//普通人每分钟走80米。
	var time = distance / 80;

	var m = parseInt(time);

	var s = Math.floor((time % 1) * 60);

	$('#description').html('<p>距终点：' + distance.toFixed(1) + ' 米</p><p>大约需要：  ' + m + '  分钟   ' + s + '   秒</p><p>路线提示：' + prompt + ' </p>');

	//$('.layerMask').html('F' + data.groupID);
};

//开始模拟导航
function startNavi() {
	if (!navi) createrNavi(routePoints);
	if (navigation) {
		navigation = false;
		$('#description').css('display', 'block');
		//导航开始
		navi.simulate();
		//switchStaircase();
	}
}

//结束导航
function stopNavi() {
	if (navi) {
		navi.stop();
		navi.clearAll();
		navi = null;
		$('#description').css('display', 'none');
	}
}

//楼梯控件点击开关,与导航功能本身无关
function switchStaircase() {
	if (!navigation) {
		if (!follow & !others) {
			//楼层控件可点击
			groupControl.enableExpand = true;
		} else if (follow || others) {
			layerMask();
		} else {
			layerMask();
		}
	}
};

//楼层控件是否可点击
function layerMask() {
	var groupID = navi.locationMarker.groupID;
	if (groupID !== map.focusGroupID) {
		//设置焦点层
		map.focusGroupID = groupID;
		//设置可见层
		map.visibleGroupIDs = [groupID];
	}
	//楼层控件不可点击
	groupControl.enableExpand = false;
	$('.fm-layer-list').css({
		display: 'none'
	});
};

var naviUserLayers = [],
	naviUserLayerGroups = [];
//清除标注
function clearNavi() {
	if (naviUserLayers.length != 0) {
		for (var i = 0; i < naviUserLayers.length; i++) {
			naviUserLayerGroups[i].removeLayer(naviUserLayers[i]);
		}
	}
	fmap.clearLineMark();
}

function drawRouteLines() {
	if (!naviAnalyser) {
		naviAnalyser = fengmap.FMNaviAnalyser.create({});
		naviAnalyser.init(fmap);
	}
	fmap.visibleGroupIDs = fmap.groupIDs;
	for (var i = 0; i < ssRoutePoints.length; i++) {
		var coord = ssRoutePoints[i][0];
		var coord1 = ssRoutePoints[i][1];

		var groupLayer = fmap.getFMGroup(coord.groupID);
		var layer = new fengmap.FMImageMarkerLayer();
		groupLayer.addLayer(layer);
		var groupLayer1 = fmap.getFMGroup(coord1.groupID);
		var layer1 = new fengmap.FMImageMarkerLayer();
		groupLayer1.addLayer(layer1);

		layer.addMarker(new fengmap.FMImageMarker({
			x: coord.x,
			y: coord.y,
			height: .2,
			groupID: coord.groupID,
			url: imgUrl + 'marker/map/end.png',
			size: 32
		}));

		//添加起始点坐标
		layer1.addMarker(new fengmap.FMImageMarker({
			x: coord1.x,
			y: coord1.y,
			height: .2,
			groupID: coord1.groupID,
			url: imgUrl + 'marker/map/start.png',
			size: 32
		}));

		naviUserLayerGroups.push(groupLayer);
		naviUserLayers.push(layer);
		naviUserLayerGroups.push(groupLayer1);
		naviUserLayers.push(layer1);


		//对起点和终点路径分析
		if (naviAnalyser.analyzeNavi(coord.groupID, coord, coord1.groupID, coord1, fengmap.FMNaviModule.MODULE_SHORTEST) == fengmap.FMRouteCalcuResult.ROUTE_SUCCESS) {
			//获取路径分析后的结果，结果为fengmap.FMNaviResult 对象集合
			var results = naviAnalyser.getNaviResults();
			if (results.length == 0)
				return;
			drawLines(results);
		}

	}
}

//配置线型、线宽、透明度等
var lineStyle = {
	//设置线的宽度
	lineWidth: 4,
	//设置线的透明度
	alpha: 0.8,

	// offsetHeight 默认的高度为 1, (离楼板1米的高度)
	offsetHeight: 1,

	//设置线的类型为导航线
	lineType: fengmap.FMLineType.FMARROW,
	//设置线动画,false为动画
	noAnimate: true,
};

//绘制线图层
function drawLines(results) {
	//绘制部分
	var line = new fengmap.FMLineMarker();
	for (var i = 0; i < results.length; i++) {
		var result = results[i];
		var gid = result.groupId;
		var points = result.pointList;
		var seg = new fengmap.FMSegment();
		seg.groupId = gid;
		seg.points = points;
		line.addSegment(seg);
		var lineObject = fmap.drawLineMark(line, lineStyle);
	}
};

//绘制路径线
function drawRouteLines1() {
	stopNavi();
	fmap.visibleGroupIDs = fmap.groupIDs;
	if (!navi) {
		//初始化导航对象
		navi = new fengmap.FMNavigation({
			map: fmap,
			// 设置导航线的样式
			lineStyle: {
				//设置线为导航线样式
				lineType: fengmap.FMLineType.FMARROW,
				lineWidth: 6,
				//设置线的颜色
				// godColor: '#FF0000',
				//设置边线的颜色   
				// godEdgeColor: '#920000',   
			}
		});
	}

	for (var i = 0; i < ssRoutePoints.length; i++) {
		var coord = ssRoutePoints[i][0];
		var coord1 = ssRoutePoints[i][1];
		navi.setStartPoint({
			x: coord.x,
			y: coord.y,
			height: .2,
			groupID: coord.groupID,
			url: imgUrl + 'marker/map/start.png',
			size: 32
		});

		navi.setEndPoint({
			x: coord1.x,
			y: coord1.y,
			height: .2,
			groupID: coord1.groupID,
			url: imgUrl + 'marker/map/end.png',
			size: 32
		});
		// 画导航线
		navi.drawNaviLine();
	}
}