cc.Class({
    extends: cc.Component,

    properties: {
        _model:0,
    },

    onLoad () {
        cc.game.addPersistRootNode(this.node);
    },

    // update (dt) {},
});
