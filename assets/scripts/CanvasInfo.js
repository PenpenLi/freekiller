
cc.Class({
    extends: cc.Component,

    properties: {
        bulletLayer: cc.Node,
    },

    getBulletMan()
    {
        return this.bulletLayer.getComponent('BulletMan');
    },
});
