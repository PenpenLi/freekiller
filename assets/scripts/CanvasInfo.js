
cc.Class({
    extends: cc.Component,

    properties: {
        bulletLayer: cc.Node,
        enermyLayer: cc.Node,
    },

    getBulletMan()
    {
        return this.bulletLayer.getComponent('BulletMan');
    },

    getEnermyMan()
    {
    	return this.enermyLayer.getComponent('EnermyMan');
    }
});
