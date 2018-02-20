cc.Class({
    extends: cc.Component,

    properties: {
    },

    init(label,fanwei){
        let rand = cc.random0To1() * fanwei;
        let number = rand - rand % 1;
        label.string = number;
    }

    // update (dt) {},
});
