// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        center: cc.Node,
        buff1: cc.ProgressBar,
        // buff2: cc.ProgressBar,
        triangle: cc.Node,

        // 主武器的挂点
        mainWeaponHanging: cc.Node,

        radius: {
            serializable: false,
            visible: false,
            default: 16,
        },

        // 每帧移动多少像素
        speed: 1,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        cc.log('PlayerInfo start');

        this.buff1.node.active = false;

        // this.weaponman = this.getComponent('WeaponMan');
    },

    weaponman() {
        return this.getComponent('WeaponMan');
    },

    // update (dt) {},
});
