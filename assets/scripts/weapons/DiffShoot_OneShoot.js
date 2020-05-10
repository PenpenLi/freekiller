// 每次射击触发时，只发射一颗子弹
// 依赖于DiffShootWeapon

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    start () {
        this.weapon = this.node.getComponent('Weapon');
        this.diffshoot = this.node.getComponent('Weapon_DiffShoot');
    },

    onShootTriggered(shootdir) {
        var bulletNode = cc.instantiate(this.diffshoot.bulletPrefab);
        bulletNode.position = this.node.convertToWorldSpaceAR(cc.v2(0,0));
        bulletNode.getComponent('LineMove').dir = shootdir;
        bulletNode.getComponent('LineMove').speed = 2;
        this.weapon.bulletMan.addBulletNode(bulletNode);

        cc.audioEngine.playEffect(this.diffshoot.shootSound, false);
    }
});
