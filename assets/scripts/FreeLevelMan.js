// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        onLevelChanged: cc.Component.EventHandler,
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
});
