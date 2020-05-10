// 挂在武器Node上，且必须是第一个节点
// 要求bulletMan必须存在

cc.Class({
    extends: cc.Component,

    properties: {

        // 每次发射的回调
        onCheckShoot: cc.Component.EventHandler,
    },

    start() {
    },

    init(weaponMan)
    {
        this.weaponMan = weaponMan;
    },

    checkShoot(shootdir) {
        this.onCheckShoot && this.onCheckShoot.emit([shootdir]);
    },
});
