// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        dir: cc.Vec2,
        speed: 1,
    },

    start () {
        
    },

    onBulletUpdate(dt) {
    	var step = this.dir.mul(this.speed);
        this.node.position = this.node.position.add(step);
        this.node.angle = -step.signAngle(cc.v2(0, 1)) * 180 / 3.14;
    },
});
