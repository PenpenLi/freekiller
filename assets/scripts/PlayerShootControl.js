// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    onLevelLoaded(levelLoader) {
        this.playerInfo = levelLoader.player.getComponent('PlayerInfo');
    },

    checkShoot(step) {

        this.playerInfo.triangle.angle = -step.signAngle(cc.v2(0,1)) * 180 / 3.14;

    	var shootdir = step.normalize();
    	if (step.len()<0.33) {
            // 取得瞄准方向
        }

        this.playerInfo.weaponman().checkShoot(shootdir);
    },
});
