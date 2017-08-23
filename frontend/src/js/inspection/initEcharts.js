/*var $one = $('.bannerContent>.statistics_list>.list_bottom>.echarts_two');
var $two = $('.bannerContent>.statistics_list>.list_bottom>.echarts_one');
var $three = $('.bannerContent>.statistics_list>.list_bottom>.echarts_four');
var $four = $('.bannerContent>.statistics_list>.list_bottom>.echarts_three');*/


//初始化echarts
var $one = echarts.init($('#echarts_two')[0]);
var $two = echarts.init($('#echarts_one')[0]);
var $three = echarts.init($('#echarts_four')[0]);
var $four = echarts.init($('#echarts_three')[0]);
//配置
var options_one = {
    title: {
        text: "消防主机报警发生时段占比图",
        textStyle: {
            fontSize: 14,
            fontStyle: "normal",
            color: "rgb(255, 255, 255)"
        },
        x: "center"
    },
    tooltip: {
        trigger: "axis"
    },
    legend: {
        data: ["报警次数"],
        selectedMode: "multiple",
        x: "center",
        y: "bottom",
        textStyle: {
            color: "rgb(255, 255, 255)"
        }
    },
    toolbox: {
        show: false,
        feature: {
            mark: {
                show: true
            },
            dataView: {
                show: true,
                readOnly: true
            },
            magicType: {
                show: false,
                type: ["line", "bar"]
            },
            restore: {
                show: true
            },
            saveAsImage: {
                show: true
            }
        }
    },
    calculable: true,
    xAxis: [
        {
            type: "category",
            data: ["0:00-3:00", "3:00-6:00", "6:00-9:00", "9:00-12:00", "12:00-15:00", "15:00-18:00", "18:00-21:00", "21:00-0:00"],
            nameTextStyle: {
                fontSize: 12
            },
            axisLabel: {
                textStyle: {
                    color: "rgb(255, 255, 255)"
                }
            }
        }
    ],
    yAxis: [
        {
            type: "value",
            axisLabel: {
                textStyle: {
                    color: "rgb(255, 255, 255)"
                }
            }
        }
    ],
    series: [
        {
            name: "报警次数",
            type: "bar",
            data: [33, 21, 177, 341, 355, 201, 199, 49],
            itemStyle: {
                normal: {
                    color: "rgb(255, 0, 0)"
                }
            }
        }
    ]
};
var options_two = {
    title: {
        text: "消防主机报警发生时段占比图",
        textStyle: {
            fontSize: 14,
            fontStyle: "normal",
            color: "rgb(255, 255, 255)"
        },
        x: "center"
    },
    tooltip: {
        trigger: "axis"
    },
    legend: {
        data: ["报警次数"],
        selectedMode: "multiple",
        x: "center",
        y: "bottom",
        textStyle: {
            color: "rgb(255, 255, 255)"
        }
    },
    toolbox: {
        show: false,
        feature: {
            mark: {
                show: true
            },
            dataView: {
                show: true,
                readOnly: true
            },
            magicType: {
                show: false,
                type: ["line", "bar"]
            },
            restore: {
                show: true
            },
            saveAsImage: {
                show: true
            }
        }
    },
    calculable: true,
    xAxis: [
        {
            type: "category",
            data: ["0:00-3:00", "3:00-6:00", "6:00-9:00", "9:00-12:00", "12:00-15:00", "15:00-18:00", "18:00-21:00", "21:00-0:00"],
            nameTextStyle: {
                fontSize: 12
            },
            axisLabel: {
                textStyle: {
                    color: "rgb(255, 255, 255)"
                }
            }
        }
    ],
    yAxis: [
        {
            type: "value",
            axisLabel: {
                textStyle: {
                    color: "rgb(255, 255, 255)"
                }
            }
        }
    ],
    series: [
        {
            name: "报警次数",
            type: "bar",
            data: [33, 21, 177, 341, 355, 201, 199, 49],
            itemStyle: {
                normal: {
                    color: "rgb(255, 0, 0)"
                }
            }
        }
    ]
};
var options_three = {
        title: {
            text: "消防主机报警趋势对比图",
            x: "center",
            textStyle: {
                fontSize: 14,
                color: "rgb(255, 255, 255)",
                fontStyle: "normal"
            }
        },
        tooltip: {
            trigger: "axis"
        },
        legend: {
            data: ["本月", "上月"],
            selectedMode: "multiple",
            x: "center",
            y: "bottom",
            textStyle: {
                fontSize: 12,
                fontStyle: "normal",
                color: "rgb(255, 255, 255)"
            }
        },
        toolbox: {
            feature: {
                dataView: {
                    show: true,
                    readOnly: true
                },
                magicType: {
                    show: false,
                    type: ["line", "bar", "stack", "tiled"]
                },
                restore: {
                    show: true
                },
                saveAsImage: {
                    show: true
                },
                mark: {
                    show: true
                }
            }
        },
        calculable: true,
        xAxis: [
            {
                type: "category",
                boundaryGap: false,
                data: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"],
                nameTextStyle: {
                    color: "rgb(255, 255, 255)"
                },
                axisLabel: {
                    textStyle: {
                        color: "rgb(255, 255, 255)"
                    }
                }
            }
        ],
        yAxis: [
            {
                type: "value",
                axisLabel: {
                    textStyle: {
                        color: "rgb(255, 255, 255)"
                    }
                }
            }
        ],
        series: [
            {
                name: "本月",
                type: "line",
                itemStyle: {
                    normal: {
                        areaStyle: {
                            type: "default"
                        },
                        color: "rgb(255, 0, 0)"
                    }
                },
                data: [20, 40, 60, 80, 100, 120, 140, 160, 150, 140, 130, 120, 110, 100, 80, 60, 40, 80, 120, 160, 130, 100, 70, 90, 80, 100, 90, 50, 40, 30],
                smooth: true
            },
            {
                name: "上月",
                type: "line",
                itemStyle: {
                    normal: {
                        areaStyle: {
                            type: "default"
                        },
                        color: "rgb(0, 0, 255)"
                    }
                },
                data: [20, 50, 90, 90, 110, 130, 150, 170, 160, 150, 140, 130, 90, 80, 80, 90, 100, 60, 100, 140, 110, 80, 90, 110, 100, 120, 110, 70, 60, 70],
                smooth: true
            }
        ],
        grid: {
            backgroundColor: "rgba(0, 0, 0, 0)"
        }
    };
var options_four = {
    title: {
        text: "消防主机报警趋势对比图",
        x: "center",
        textStyle: {
            fontSize: 14,
            color: "rgb(255, 255, 255)",
            fontStyle: "normal"
        }
    },
    tooltip: {
        trigger: "axis"
    },
    legend: {
        data: ["本月", "上月"],
        selectedMode: "multiple",
        x: "center",
        y: "bottom",
        textStyle: {
            fontSize: 12,
            fontStyle: "normal",
            color: "rgb(255, 255, 255)"
        }
    },
    toolbox: {
        feature: {
            dataView: {
                show: true,
                readOnly: true
            },
            magicType: {
                show: false,
                type: ["line", "bar", "stack", "tiled"]
            },
            restore: {
                show: true
            },
            saveAsImage: {
                show: true
            },
            mark: {
                show: true
            }
        }
    },
    calculable: true,
    xAxis: [
        {
            type: "category",
            boundaryGap: false,
            data: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"],
            nameTextStyle: {
                color: "rgb(255, 255, 255)"
            },
            axisLabel: {
                textStyle: {
                    color: "rgb(255, 255, 255)"
                }
            }
        }
    ],
    yAxis: [
        {
            type: "value",
            axisLabel: {
                textStyle: {
                    color: "rgb(255, 255, 255)"
                }
            }
        }
    ],
    series: [
        {
            name: "本月",
            type: "line",
            itemStyle: {
                normal: {
                    areaStyle: {
                        type: "default"
                    },
                    color: "rgb(255, 0, 0)"
                }
            },
            data: [20, 40, 60, 80, 100, 120, 140, 160, 150, 140, 130, 120, 110, 100, 80, 60, 40, 80, 120, 160, 130, 100, 70, 90, 80, 100, 90, 50, 40, 30],
            smooth: true
        },
        {
            name: "上月",
            type: "line",
            itemStyle: {
                normal: {
                    areaStyle: {
                        type: "default"
                    },
                    color: "rgb(0, 0, 255)"
                }
            },
            data: [20, 50, 90, 90, 110, 130, 150, 170, 160, 150, 140, 130, 90, 80, 80, 90, 100, 60, 100, 140, 110, 80, 90, 110, 100, 120, 110, 70, 60, 70],
            smooth: true
        }
    ],
    grid: {
        backgroundColor: "rgba(0, 0, 0, 0)"
    }
};
//声明使用
$one.setOption(options_one);
$two.setOption(options_two);
$three.setOption(options_three);
$four.setOption(options_four);