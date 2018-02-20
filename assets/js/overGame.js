cc.Class({
    extends: cc.Component,

    properties:{
        topScore:cc.Label,
    },
    
    init(){
        this.node.active = false;
    },

    win(){
        this.node.getChildByName('score').getComponent(cc.Label).string = "最终得分：" + this.topScore.string;
        this.node.getChildByName('score').getChildByName('result').getComponent(cc.Label).string = 'You WIN!';
    },

    lose(){
        this.node.getChildByName('score').getComponent(cc.Label).string = "最终得分：" + this.topScore.string;
        this.node.getChildByName('score').getChildByName('result').getComponent(cc.Label).string = 'You Lose!';
    },

    // update (dt) {},
});
