// 管理所有敌人的生命周期
// 必须挂在enermyLayer上

cc.Class({
    extends: cc.Component,

    ctor(){
        this.enermys = [];
    },

    properties: {
        
    },

    addEnermyNode(enermyNode)
    {
        var b = node.getComponent('Enermy');
        b.init(this);

        helper.moveNodeTo(node, this.node);

        this.enermys.push(b);
    },

    removeenermyNode(node)
    {
        this.node.removeChild(node);

        var b = node.getComponent('Enermy');
        var index = this.enermys.indexOf(b);
        if (index>=0) {
            this.enermys.splice(index, 1);
        }
    },

    update(dt) {
        for(let i=0; i<this.enermys.length; ++i)
        {
            this.enermys[i].enermyUpdate(dt);
        }
    },
});
