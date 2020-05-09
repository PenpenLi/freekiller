// 提供给BulletMan使用的对象
// 每个子弹都应该挂上这个脚本，只有挂上这个脚本的node才能添加到BulletMan中。

cc.Class({
    extends: cc.Component,

    properties: {

        // 每帧的回调函数
        // 外部通过设置此变量来hack每帧回调
        onBulletUpdate: null,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    bulletUpdate(dt) {
        this.onBulletUpdate && this.onBulletUpdate(dt);
    },
});
