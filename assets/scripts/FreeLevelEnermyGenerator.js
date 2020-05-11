// 以一定的规则创建一系列enermy的组件

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    onLevelLoaded(levelLoader)
    {
     //    var canvasInfo = cc.find('Canvas').getComponent('CanvasInfo');
    	// this.enermyMan = canvasInfo.getEnermyMan();
    	this.freeLevelMan = cc.find('Canvas').getComponent('FreeLevelMan');

    	var rule = db.freeEnermyGeneratorRules[this.freeLevelMan.curLevel] || db.freeEnermyGeneratorDefaultRule;
    	this.rootGenner = helper.create(rule.type);
    	this.rootGenner.init(rule.config);
    },

    update(dt)
    {
        if (!this.rootGenner) {
            return;
        }

        var res = this.rootGenner.gennerUpdate(dt);

        if (res) {
            this.node.removeComponent(this);
        }
    },
});
