// 使player永远居中于屏幕中心，但不会超出tilemap范围
// 挂在任意位置

cc.Class({
    extends: cc.Component,

    properties: {
        movableNode: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    onLevelLoaded(levelLoader) {
        this.player = levelLoader.player;
        this.tiledmap = levelLoader.tiledmap;
        // cc.log("zz:", this.player, this.tiledmap);
    },

    update (dt)
    {
        if(!this.player || !this.tiledmap)
            return;

        var center = cc.v2(cc.winSize.width/2, cc.winSize.height/2);
        var world = this.player.convertToWorldSpaceAR(cc.v2(0,0));
        var diff = center.sub(world);
        var pos = this.movableNode.position.add(diff);
        var xmax = this.tiledmap.node.width/2 - center.x;
        var xmin = -xmax;
        var ymax = this.tiledmap.node.height/2 - center.y;
        var ymin = -ymax;
        if (pos.x > xmax) {
            pos.x = xmax;
        }
        if (pos.x < xmin) {
            pos.x = xmin;
        }
        if (pos.y > ymax) {
            pos.y = ymax;
        }
        if (pos.y < ymin) {
            pos.y = ymin;
        }
        this.movableNode.position = pos;
    },
});
