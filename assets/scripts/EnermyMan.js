// 管理所有敌人的生命周期

cc.Class({
    extends: cc.Component,

    ctor(){
    },

    properties: {
        enermyLayer: cc.Node,
    },

    addEnermyNode(node)
    {
        helper.moveNodeTo(node, this.enermyLayer);

        let comps = node.getComponents(cc.Component);
        for(let i=0; i<comps.length; ++i)
        {
            comps[i].setEnermyMan && comps[i].setEnermyMan(this);
        }
    },

    removeEnermyNode(node)
    {
        this.enermyLayer.removeChild(node, true);
    },

    update(dt) {
        for(let i=0; i<this.enermyLayer.children.length; ++i)
        {
            this.updateOneEnermy(this.enermyLayer.children[i], dt);
        }
    },

    updateOneEnermy(node, dt)
    {
        let comps = node.getComponents(cc.Component);
        for(let i=0; i<comps.length; ++i)
        {
            comps[i].enermyUpdate && comps[i].enermyUpdate(dt);
        }
    },
});
