// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        weapons: [],
    },

    start () {
        // this.weapons = [];
    },

    // addMainWeapon(weapon) {

    // },

    addWeapon(weapon) {
        this.weapons.push(weapon);
    },

    checkShoot(shootdir){
        for(var i=0; i<this.weapons.length; ++i)
        {
            this.weapons[i].checkShoot(shootdir);
        }
    },
});
