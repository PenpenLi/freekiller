// 普通武器工具类
// 经过一段时间发射一次子弹
// 挂在Weapon下面

cc.Class({
    extends: cc.Component,

    properties: {
        // 经过多长时间发射一次(毫秒)
        shootDiff: {
            default: 200,
            visible: false,
        },

        // 子弹模型
        bulletPrefab: cc.Prefab,

        // 射击时的音效
        shootSound: {
            type: cc.AudioClip,
            default: null,
        },

        // 发射时触发的回调
        // 不同的武器应该在回调中创建子弹，添加到bulletMan中
        onShootTriggered: cc.Component.EventHandler,
    },

    start(){
        this.weapon = this.node.getComponent("Weapon");
    },

    onCheckShoot(shootdir) {

        if (!this.lastShootTime) {
            this.lastShootTime = 0;
        }

        if (Date.now()-this.lastShootTime<this.shootDiff)
            return;

        this.shootTriggered(shootdir);

        this.lastShootTime = Date.now();
    },

    shootTriggered(shootdir) {
        if (!this.bulletPrefab) {
            cc.log('找不到HandGunBullet');
            return;
        }

        this.onShootTriggered && this.onShootTriggered.emit([shootdir]);
    },
});
