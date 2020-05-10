// 负责关卡数据的读取

cc.Class({
    extends: cc.Component,

    properties: {
        // 当关卡改变时，向外界发出通知
        onLevelChanged: cc.Component.EventHandler,

        handgun: cc.Prefab,
    },

    curLevel: 0,

    start () {
        this.curLevel = 0;
        
        this.onLevelChanged.emit([this]);

        cc.director.getCollisionManager().enabled = true;
        // cc.director.getCollisionManager().enabledDebugDraw = true;
    },

    gotoNext() {
        ++this.curLevel;

        this.onLevelChanged.emit([this]);
    },

    onLevelLoaded(levelLoader) {
        var weaponman = levelLoader.player.getComponent('WeaponMan');
        var weaponnode = cc.instantiate(this.handgun);
        weaponman.addMainWeaponNode(weaponnode);

        // var diffshoot = weaponnode.getComponent('DiffShootEmitter');
        // diffshoot.shootDiff = 200;
    },

});
