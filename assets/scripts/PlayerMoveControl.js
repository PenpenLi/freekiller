
cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.keys = [];

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, function (event) {
            var index = this.keys.indexOf(event.keyCode);
            if(index < 0)
            {
                this.keys.push(event.keyCode);
            }
        }, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, function (event) {
            var index = this.keys.indexOf(event.keyCode);
            if(index >= 0)
            {
                this.keys.splice(index, 1);
            }
        }, this);
    },

    onLevelLoaded(levelLoader) {
        this.player = levelLoader.player;
        this.displayLayer = levelLoader.displayLayer;
    },

    checkMove(step) {
        var step = step.normalize().mul(3);
        this.player.position = this.player.position.add(step);

        // cc.log(this.player.position.toString());
    },

    update(dt)
    {
        var step = cc.v2(0,0);
        if (this.keys.indexOf(cc.macro.KEY.w)>=0) {
            step.y += 1;
        }
        if (this.keys.indexOf(cc.macro.KEY.s)>=0) {
            step.y -= 1;
        }
        if (this.keys.indexOf(cc.macro.KEY.a)>=0) {
            step.x -= 1;
        }
        if (this.keys.indexOf(cc.macro.KEY.d)>=0) {
            step.x += 1;
        }
        
        if (step.x===0 && step.y===0)
        {
            return;
        }

        this.checkMove(step);
    },
});
