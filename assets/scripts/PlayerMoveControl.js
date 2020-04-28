
cc.Class({
    extends: cc.Component,

    properties: {
        debugLabel: cc.Label,
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
        this.playerInfo = this.player.getComponent('PlayerInfo');

        this.tilesize = this.displayLayer.getMapTileSize();
        this.mapsize = levelLoader.tiledmap.node.getContentSize();

        this.displayLayer.node.on(cc.Node.EventType.MOUSE_DOWN, this.onMouseDown, this);
        this.displayLayer.node.on(cc.Node.EventType.MOUSE_MOVE, this.onMouseMove, this);
    },

    onMouseMove(event) {
        var pos = this.displayLayer.node.convertToNodeSpaceAR(event.getLocation());
        var rc = this.positionToRC(pos);
        var bound = this.rcBounding(rc);
        // this.debugLabel.string = `bound=${bound.xMin}, ${bound.yMin}, ${bound.xMax}, ${bound.yMax}`;
    },

    onMouseDown(event) {
        var pos = this.displayLayer.node.convertToNodeSpaceAR(event.getLocation());
        var rc = this.positionToRC(pos);
        var bound = this.rcBounding(rc);
        this.debugLabel.string = `rc=(${rc.r},${rc.c}),bound=${bound.xMin}, ${bound.yMin}, ${bound.xMax}, ${bound.yMax}`;
    },

    positionToRC(pos)
    {
        pos = pos.clone();

        pos.x += this.mapsize.width/2;
        pos.y += this.mapsize.height/2;

        pos.y = this.mapsize.height - pos.y;

        var r = Math.floor(pos.y / this.tilesize.height);
        var c = Math.floor(pos.x / this.tilesize.width);
        return {r:r, c:c};
    },

    getPossibleTiles(cur, s)
    {
        var s_tile_count = Math.floor(s.len() / this.tilesize.width)+1;
        var ret = [];
        if(s.x<0)
        {
            for(var i=0; i<s_tile_count; ++i)
            {
                ret.push({r:cur.r-1, c:cur.c-2-i});
                ret.push({r:cur.r, c:cur.c-2-i});
                ret.push({r:cur.r+1, c:cur.c-2-i});
            }
        }
        else if (s.x >0) 
        {
            for(var i=0; i<s_tile_count; ++i)
            {
                ret.push({r:cur.r-1, c:cur.c+2+i});
                ret.push({r:cur.r, c:cur.c+2+i});
                ret.push({r:cur.r+1, c:cur.c+2+i});
            }
        }
        else if (s.y < 0)
        {
            for(var i=0; i<s_tile_count; ++i)
            {
                ret.push({r:cur.r+2+i, c:cur.c-1});
                ret.push({r:cur.r+2+i, c:cur.c});
                ret.push({r:cur.r+2+i, c:cur.c+1});
            }
        }
        else if (s.y > 0)
        {
            for(var i=0; i<s_tile_count; ++i)
            {
                ret.push({r:cur.r-2-i, c:cur.c-1});
                ret.push({r:cur.r-2-i, c:cur.c});
                ret.push({r:cur.r-2-i, c:cur.c+1});
            }
        }
        return ret;
    },

    calcYOnCircle(origin, radius, x)
    {
        return Math.sqrt(radius*radius-(x-origin.x)*(x-origin.x))+origin.y;
    },
    calcXOnCircle(origin, radius, y)
    {
        return Math.sqrt(radius*radius-(y-origin.y)*(y-origin.y))+origin.x;
    },
    onDebug()
    {
        var t = this.calcMaxCanGo(this.player.position, cc.v2(1, 0));
        if (t) {
            var s = cc.v2(t, 0);
            this.player.position = this.player.position.add(s);
            this.debugLabel.string = s;
        }
        else
        {
            this.player.position = this.player.position.add(cc.v2(1,0));

        }




        // this.debugLabel.string = this.calcXOnCircle(cc.v2(1,1), 1, 0)+" "+
        // this.calcXOnCircle(cc.v2(1,1), 1, 1)+" "+
        // this.calcXOnCircle(cc.v2(1,1), 1, 0.5)+" "+
        // this.calcXOnCircle(cc.v2(1,1), 1, -0.5);
    },
    rcBounding(rc)
    {
        return new cc.Rect(rc.c*this.tilesize.width - this.mapsize.width/2, 
            this.mapsize.height/2 - rc.r*this.tilesize.height - this.tilesize.height,
            this.tilesize.width,
            this.tilesize.height);
    },
    calcMaxCanGo(cur, s)
    {
        var currc = this.positionToRC(cur);
        cc.log("cur", cur.x, cur.y);
        cc.log("currc", currc.r, currc.c);
        var tiles = this.getPossibleTiles(currc, s);

        var r = this.playerInfo.radius;

        if (tiles.length <3) {
            cc.error("error", tiles.length);
            return 0;
        }

        cc.log("tiles[0]", tiles[0].r, tiles[0].c, this.displayLayer.getTileGIDAt(tiles[0].c, tiles[0].r));
        cc.log("tiles[1]", tiles[1].r, tiles[1].c, this.displayLayer.getTileGIDAt(tiles[1].c, tiles[1].r));
        cc.log("tiles[2]", tiles[2].r, tiles[2].c, this.displayLayer.getTileGIDAt(tiles[2].c, tiles[2].r));

        if(s.x<0)
        {
            var ret = [];

            // cc.log("cur", cur.x, cur.y);

            if (this.displayLayer.getTileGIDAt(tiles[0].c, tiles[0].r)>0) {
                var bound = this.rcBounding(tiles[0]);
                var x = this.calcXOnCircle(cur, r, bound.yMin);
                ret.push(bound.xMax-x);
            }

            if (this.displayLayer.getTileGIDAt(tiles[1].c, tiles[1].r)>0) {
                var bound = this.rcBounding(tiles[1]);
                // cc.log("1bound", bound.xMax, cur.x, r);
                ret.push(bound.xMax-(cur.x-r));
            }

            if (this.displayLayer.getTileGIDAt(tiles[2].c, tiles[2].r)>0) {
                var bound = this.rcBounding(tiles[2]);
                var x = this.calcXOnCircle(cur, r, bound.yMax);
                ret.push(bound.xMax-x);
            }

            // cc.log("ret[0]", ret[0]);
            // cc.log("ret[1]", ret[1]);
            // cc.log("ret[2]", ret[2]);


            if (ret.length === 0)
                return null;


            return Math.max.apply(null, ret);
        }
        else if (s.x >0) 
        {
            var ret = [];

            if (this.displayLayer.getTileGIDAt(tiles[0].c, tiles[0].r)>0) {
                var bound = this.rcBounding(tiles[0]);
                var x = this.calcXOnCircle(cur, r, bound.yMin);
                ret.push(bound.xMin-x);
            }

            if (this.displayLayer.getTileGIDAt(tiles[1].c, tiles[1].r)>0) {
                var bound = this.rcBounding(tiles[1]);
                ret.push(bound.xMin-(cur.x+r));
            }

            if (this.displayLayer.getTileGIDAt(tiles[2].c, tiles[2].r)>0) {
                var bound = this.rcBounding(tiles[2]);
                var x = this.calcXOnCircle(cur, r, bound.yMax);
                ret.push(bound.xMin-x);
            }

            if (ret.length === 0)
                return null;

            return Math.min.apply(null, ret);
        }
        else if (s.y < 0)
        {
            var ret = [];

            if (this.displayLayer.getTileGIDAt(tiles[0].c, tiles[0].r)>0) {
                var bound = this.rcBounding(tiles[0]);
                var y = this.calcYOnCircle(cur, r, bound.xMax);
                ret.push(bound.yMax-y);
            }

            if (this.displayLayer.getTileGIDAt(tiles[1].c, tiles[1].r)>0) {
                var bound = this.rcBounding(tiles[1]);
                ret.push(bound.yMax-(cur.y-r));
            }

            if (this.displayLayer.getTileGIDAt(tiles[2].c, tiles[2].r)>0) {
                var bound = this.rcBounding(tiles[2]);
                var y = this.calcYOnCircle(cur, r, bound.xMin);
                ret.push(bound.yMax-y);
            }

            cc.log("ret[0]", ret[0]);
            cc.log("ret[1]", ret[1]);
            cc.log("ret[2]", ret[2]);

            if (ret.length === 0)
                return null;

            return Math.max.apply(null, ret);
        }
        else if (s.y > 0)
        {
            var ret = [];

            if (this.displayLayer.getTileGIDAt(tiles[0].c, tiles[0].r)>0) {
                var bound = this.rcBounding(tiles[0]);
                var y = this.calcYOnCircle(cur, r, bound.xMax);
                ret.push(bound.yMin-y);
            }

            if (this.displayLayer.getTileGIDAt(tiles[1].c, tiles[1].r)>0) {
                var bound = this.rcBounding(tiles[1]);
                ret.push(bound.yMin-(cur.y-r));
            }

            if (this.displayLayer.getTileGIDAt(tiles[2].c, tiles[2].r)>0) {
                var bound = this.rcBounding(tiles[2]);
                var y = this.calcYOnCircle(cur, r, bound.xMin);
                ret.push(bound.yMin-y);
            }

            if (ret.length === 0)
                return null;

            return Math.min.apply(null, ret);
        }
    },

    checkMove(step) {

        // if (this.checked) {
        //     return;
        // }
        // this.checked = true;

        var dir = step.normalize();
        var s = dir.mul(this.playerInfo.speed);

        if (dir.x<0)
        {
            var xlimit = this.calcMaxCanGo(this.player.position, cc.v2(-1, 0));
            if (xlimit && s.x < xlimit) {
                s.x = xlimit;
            }
        }
        else if (dir.x>0)
        {
            xlimit = this.calcMaxCanGo(this.player.position, cc.v2(1, 0));
            if (xlimit && s.x > xlimit) {
                s.x = xlimit;
            }
        }

        if (dir.y<0) 
        {
            var ylimit = this.calcMaxCanGo(this.player.position, cc.v2(0, -1));
            if (ylimit && s.y < ylimit) {
                s.y = ylimit;
            }
        }
        else if (dir.y>0)
        {
            ylimit = this.calcMaxCanGo(this.player.position, cc.v2(0, 1));
            if (ylimit && s.y > ylimit) {
                s.y = ylimit;
            }
        }

        this.player.position = this.player.position.add(s);
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
