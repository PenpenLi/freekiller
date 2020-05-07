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
        this.buff1.node.active = false;
    },

    // update (dt) {},
});
