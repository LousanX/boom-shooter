cc.Class({
    extends: cc.Component,

    properties: {
        zongshu:0,
    },

    onLoad () {
        cc.game.addPersistRootNode(this.ndoe);
    },

    plus(number){
        this.zongshu += number;
    }

    // update (dt) {},
});
