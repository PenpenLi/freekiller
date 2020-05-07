// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        tiledmap: cc.TiledMap,

        namePattern: cc.String,

        playerPrefab: cc.Prefab,

        onLevelLoaded: [cc.Component.EventHandler],

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
    },

    onLevelChanged(levelMan) {
        var mapname = `${this.namePattern}${levelMan.curLevel}`;

        cc.loader.loadRes(mapname, (err, asset) => {
            this.tiledmap.tmxAsset = asset;

            this.displayLayer = this.tiledmap.getLayer('display');

            var objects = this.tiledmap.getObjectGroup('object').getObjects();
            for(var i=0; i<objects.length; ++i)
            {
                if (objects[i].name === "player") {
                    this.reloadPlayer(objects[i]);
                }
            }

            for(var i=0; i<this.onLevelLoaded.length; ++i)
            {
                this.onLevelLoaded[i].emit([this]);
            }
        });
    },

    reloadPlayer(config)
    {
        this.player = cc.instantiate(this.playerPrefab);

        // var mapRC = this.tiledmap.getMapSize();
        // var tileSize = this.tiledmap.getTileSize();
        var center = cc.v2(this.tiledmap.node.width/2, this.tiledmap.node.height/2);

        var x = config.x - center.x;
        var y = config.y - center.y;

        // cc.log("config", config.x, config.y);

        this.player.position = cc.v2(x, y);
        // this.player.position = cc.v2(8,8);
        cc.log("player:", this.player.position.toString());

        this.displayLayer.addUserNode(this.player);

        
    },

    onSlide(slider){
        cc.log("pre", this.progress2.progress);
        this.progress2.progress = slider.progress;
        cc.log("after", this.progress2.progress);
    },
});
