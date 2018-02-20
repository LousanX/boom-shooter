const colorCtl = require('colorCtl');
const labelCtl = require('NumberCtl');

cc.Class({
    extends: cc.Component,

    properties: {

    },

    init(gameCtl) {
        let a = 0;

        if(cc.find('Game').getComponent('game')._model == 5){
            a = 100;
        }
        if(cc.find('Game').getComponent('game')._model == 10){
            a = 50;
        }
        if(cc.find('Game').getComponent('game')._model == 30){
            a = 20;
        }
        if(cc.find('Game').getComponent('game')._model == 100){
            a = 999;
        }

        this.gameCtl = gameCtl;

        let label = this.node.getChildByName('number');
        let result = cc.find('totleCtl').getComponent('totle');
        let hero = cc.find('Canvas/hero').getComponent('hero');
        let i = (result.zongshu + a) / hero._ball;

        label.getComponent(cc.Label).string = i - i % 1;

        this.node.position = cc.v2(0,-100);//初始化位置

        let rand = cc.random0To1();
        let speedX = rand * 1000;

        this.getComponent(cc.RigidBody).linearVelocity = cc.v2(speedX,800);//初始化速度
        let color = new colorCtl;
        color.init(this.node);
    },

    onBeginContact(contact, self, other) {
        switch (other.tag) {
            case 1://球碰到砖块
                this.gameCtl.onBallContactBrick(self.node, other.node);
                break;
            case 2://球碰到地面
                this.gameCtl.onBallContactGround(self.node, other.node);
                break;
            case 3://球碰到托盘
                this.gameCtl.onBallContactPaddle(self.node, other.node);
                break;
            case 4://球碰到墙
                this.gameCtl.onBallContactWall(self.node, other.node);
                break;

        }
    },

    onPreSolve(contact, self, other) {
        switch (other.tag) {
            case 0://球
            contact.disabledOnce = true;
            break;
        }
    },
});