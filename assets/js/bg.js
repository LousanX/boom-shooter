const colorCtl = require('colorCtl');
cc.Class({
    extends: cc.Component,

    properties: {
    },

    init(){
        let color = new colorCtl;
        color.init(this.node);
    }

    // update (dt) {},
});
