
cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.bulletMan = this.node.getComponent('Bullet').bulletMan;
    },

    onCollisionEnter: function (other, self) {
        if (!this.bulletMan)
            return;

        this.bulletMan.removeBulletNode(this.node);
    },

    onCollisionStay: function (other, self) {
        if (!this.bulletMan)
            return;

        this.bulletMan.removeBulletNode(this.node);
    },
});
