// 负责关卡数据的读取

cc.Class({
    extends: require("LevelMan"),

    properties: {
        // 当关卡改变时，向外界发出通知
        onLevelLoaded: [cc.Component.EventHandler],

        playerNode: cc.Node,

        tiledmapNode: cc.Node,

        debugGun: cc.Prefab,
    },

    curLevel: 0,

    start () {
        this.curLevel = 0;
        
        this.emitLevelLoaded();

        cc.director.getCollisionManager().enabled = true;
        // cc.director.getCollisionManager().enabledDebugDraw = true;
    },

    gotoNext() {
        ++this.curLevel;

        this.emitLevelLoaded();
    },

    loadPlayerWeapon() {
        var weaponman = this.playerNode.getComponent('WeaponMan');
        var weaponnode = cc.instantiate(this.debugGun);
        weaponman.addMainWeaponNode(weaponnode);
    },

    emitLevelLoaded()
    {
        this.loadPlayerWeapon();
        
        for(let i=0; i<this.onLevelLoaded.length; ++i)
        {
            this.onLevelLoaded[i].emit([this]);
        }
    },

    getPlayerNode()
    {
        return this.playerNode;
    },

    getMapNode()
    {
        return this.tiledmapNode;
    },

    getCurLevel()
    {
        return this.curLevel;
    },

    getEnermyGenner()
    {
        return this.node.getComponent('FreeEnermyGenner');
    },

    getEnermyMan()
    {
        return this.node.getComponent('EnermyMan');
    },
});
