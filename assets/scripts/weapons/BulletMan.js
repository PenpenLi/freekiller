// 控制bullet的生命周期
// 应该附加在bulletLayer上

cc.Class({
    extends: cc.Component,

    properties: {
        bullets: [],
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    addBulletNode(node) {
        helper.moveNodeTo(node, this.node);

        var b = node.getComponent('Bullet');

        this.bullets.push(b);
    },

    update (dt) {
        for(let i=0; i<this.bullets.length; ++i)
        {
            this.bullets[i].bulletUpdate(dt);
        }
    },
});
