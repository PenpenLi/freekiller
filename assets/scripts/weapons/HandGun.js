// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        shootCount: 0,
    },

    start(){
        cc.loader.load('main/weapons/handgunbullet', function(error, bulletNode){
            if (error) {
                cc.log(error);
                return;
            }
            this.bulletNode = bulletNode;
        }.bind(this));
    },

    init() {
        cc.log("handgun init");
    },

    checkShoot(shootdir) {

        if (!this.lastShootTime) {
            this.lastShootTime = 0;
        }

        if (Date.now()-this.lastShootTime<1000)
            return;

        this.forceShoot(shootdir);

        this.lastShootTime = Date.now();
    },

    forceShoot(shootdir) {
        // var bulletNode = cc.instantiate(this.bulletNode);
        // bulletNode.parent = cc.find('Canvas/bulletLayer');
    },
});
