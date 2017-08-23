
var _height = 0;

/////////////////////////////////
// 训练楼 
/////////////////////////////////
var buildingFireConfig = {
    positionStyle  : Type.SPHERE,
    positionBase   : new fm.Vector3( 30, _height + 15, 41 ),
    positionRadius : 2.5,
    
    velocityStyle  : Type.CUBE,
    velocityBase   : new fm.Vector3(0,30,0),
    velocitySpread : new fm.Vector3(5,15,5),
    
    particleTexture : new fm.TextureLoader().load( 'image/smokeparticle.png' ),
    
    sizeTween    : new Tween( [0, 0.2, .6], [10, 50, 10] ),
    opacityTween : new Tween( [0, .2, .5], [0, 1, 0] ),
    colorTween   : new Tween( [0.3, .6], [ new fm.Vector3(0.02, 1, .35), new fm.Vector3(0.05, 1, 0) ] ),
    blendStyle : fm.AdditiveBlending, 
    
    particlesPerSecond : 60,
    particleDeathAge   : .6,
};

var buildingSmokeConfig = {
    positionStyle    : Type.SPHERE,
    positionBase     : new fm.Vector3( 30, _height + 18, 41 ),
    positionRadius   : 3,
    
    velocityStyle    : Type.CUBE,
    velocityBase     : new fm.Vector3( 0, 20, 0 ),
    velocitySpread   : new fm.Vector3( 8, 15, 8 ), 
    accelerationBase : new fm.Vector3( 0,-10,0 ),
    
    particleTexture : buildingFireConfig.particleTexture,

    angleBase               : 0,
    angleSpread             : 720,
    // angleVelocityBase       : 0,
    // angleVelocitySpread     : 720,
    
    sizeTween    : new Tween( [0, .8, 1.5], [10, 80, 50] ),
    opacityTween : new Tween( [0, .4, 1.5], [0, .9, 0] ),
    colorTween   : new Tween( [0.3, 1.2], [ new fm.Vector3(0, 0, .6), new fm.Vector3(0, 0, .3) ] ),
    worldEffectTween: new Tween([.5, 1.5], [new fm.Vector3(0,0,0), new fm.Vector3(-1,0, -.2)]),

    particlesPerSecond : 30,
    particleDeathAge   : 1.5,       
    // emitterDeathAge    : 60
};

/////////////////////////////////
// 飞机 
/////////////////////////////////
var planeFireConfig = Object.assign({}, buildingFireConfig, {
    positionStyle  : Type.CUBE,
    positionBase   : new fm.Vector3( 95, _height, 8 ),
    positionSpread : new fm.Vector3( 25, 5, 5 ),
    particlesPerSecond : 90,
});

var planeSmokeConfig = Object.assign({}, buildingSmokeConfig, {
    positionStyle  : Type.CUBE,
    positionBase   : new fm.Vector3( 95, _height + 3, 8 ),
    positionSpread : new fm.Vector3( 25, 5, 5 ),
    velocitySpread   : new fm.Vector3( 5, 15, 5 ), 
    particlesPerSecond : 50,
});

/////////////////////////////////
// 化工楼 
/////////////////////////////////
var huagongFireConfig = Object.assign({}, buildingFireConfig, {
    positionBase   : new fm.Vector3( 98, _height + 20, 38 ),
});

var huagongSmokeConfig = Object.assign({}, buildingSmokeConfig, {
    positionBase   : new fm.Vector3( 98, _height + 23, 38 ),
});

/////////////////////////////////
// 弧罐 
/////////////////////////////////
var huguanFireConfig = Object.assign({}, buildingFireConfig, {
    positionBase   : new fm.Vector3( -18, _height + 6 , 50 ),
});

var huguanSmokeConfig = Object.assign({}, buildingSmokeConfig, {
    positionBase   : new fm.Vector3( -18, _height + 8 , 50 ),
});

/////////////////////////////////
// 球罐 
/////////////////////////////////
var qiuguanFireConfig = Object.assign({}, buildingFireConfig, {
    positionBase   : new fm.Vector3( -47, _height + 4, 45 ),
});

var qiuguanSmokeConfig = Object.assign({}, buildingSmokeConfig, {
    positionBase   : new fm.Vector3( -47, _height + 6, 45 ),
});

/////////////////////////////////
// 火幕墙
/////////////////////////////////
var huomuFireConfig = Object.assign({}, buildingFireConfig, {
    positionStyle  : Type.CUBE,
    positionBase   : new fm.Vector3( -70, _height + 2, 12 ),
    positionSpread : new fm.Vector3( 20, 5, 20 ),
    velocityBase   : new fm.Vector3(0,12,0),
    particlesPerSecond : 100,
});

var huomuSmokeConfig = Object.assign({}, buildingSmokeConfig, {
    positionStyle  : Type.CUBE,
    positionBase   : new fm.Vector3( -70, _height + 2, 12 ),
    velocityBase   : new fm.Vector3(0,20,0),
    positionSpread : new fm.Vector3( 20, 8, 20 ),
    velocitySpread : new fm.Vector3( 5, 15, 5 ), 
    particlesPerSecond : 80,
});



var blurFunctions = [];
var focusFunctions = [];

function fireInit() {
    map.setBackgroundColor(0x333333, 1);
    map.renderStep = 2;
}

/**
 * fire class
 */
function fire(config) {
    this.fire = createPe(config.fireConfig);
    this.smoke = createPe(config.smokeConfig);
    this.status = false;
}

fire.prototype = {
    constructor: fire,
    stop: function() {
        this.fire.stop();
        this.smoke.stop();
        this.status = false;
    },
    start: function() {
        this.fire.start();
        this.smoke.start();
        this.status = true;
    }
};


function createPe(config) {
    var pe_fire = new ParticleEngine();

    pe_fire.setValues(config);
    pe_fire.particleMesh.renderOrder = 1;

/*    blurFunctions.push(function() {
        pe_fire.stop();
    });

    focusFunctions.push(function() {
        pe_fire.start();
    });*/

    return pe_fire;
};


// blur focus 事件
// 
/*
window.onblur = function() {
    blurFunctions.forEach(function(itm) {
        itm();
    });
};

window.onfocus = function() {
    focusFunctions.forEach(function(itm) {
        itm();
    });
};
//*/






