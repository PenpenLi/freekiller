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
    },

    gotoNext() {
        ++this.curLevel;

        this.onLevelChanged.emit([this]);
    },

    onLevelLoaded(levelLoader) {
        // 加载角色武器
        // 
        var playerInfo = levelLoader.player.getComponent('PlayerInfo');
        var weaponman = playerInfo.weaponman();

        var weaponnode = cc.instantiate(this.handgun);
        weaponnode.parent = playerInfo.mainWeaponHanging;

        var gun = weaponnode.addComponent('HandGun');
        gun.init();
        weaponman.addWeapon(gun);
    },

});
