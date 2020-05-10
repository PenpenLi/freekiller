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
        var b = node.getComponent('Bullet');
        b.init(this);

        helper.moveNodeTo(node, this.node);

        this.bullets.push(b);
    },

    removeBulletNode(node)
    {
        this.node.removeChild(node);

        var b = node.getComponent('Bullet');
        var index = this.bullets.indexOf(b);
        if (index>=0) {
            this.bullets.splice(index, 1);
        }
    },

    update (dt) {
        for(let i=0; i<this.bullets.length; ++i)
        {
            this.bullets[i].bulletUpdate(dt);
        }
    },
});
