const GameModel = require('GameModel');

cc.Class({
    extends: cc.Component,

    properties:{
        tan1:cc.AudioClip,
        tan2:cc.AudioClip,
        crack1:cc.AudioClip,
        crack2:cc.AudioClip,

        restartBtn:cc.Node,
        beginBtn:cc.Node,
        backtBtn:cc.Node,
        pauseBtn:cc.Node,

        ballnumber:0,
        hero: require('hero'),
        brickLayout: require('brickLayer'),
        gameView: require('GameView'),
        bg:require('bg'),
        overLayer:require('overGame'),
        // boomCtl:require('boom')
    },

    onLoad: function () {
        cc.director.preloadScene('chose');

        //安卓返回键退出
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, (event) => {
            if (event.keyCode === cc.KEY.back){
                if(cc.director.getScene().name == 'game'){
                    cc.director.loadScene('chose');
                }

                else{
                    cc.game.end();
                }
            }
        });

        this.physicsManager = cc.director.getPhysicsManager();
        this.gameModel = new GameModel();
        this.startGame();

        this.gameCtl = cc.find('Canvas').getComponent('GameCtl');
        
        this.restartBtn.on('touchend',(event)=>{
            this.gameCtl.init();
        });

        this.beginBtn.on('touchend',(event)=>{
            this.resumeGame();
        });

        this.backtBtn.on('touchend',(event)=>{
            cc.director.loadScene('chose');
        });

        this.pauseBtn.on('touchend',(event)=>{
            this.pauseGame();
        }); 
    },

    init() {
        this.gameModel.init();
        this.physicsManager.enabled = true;
        this.hero.init();
        this.brickLayout.init(this.gameModel.bricksNumber);
        this.gameView.init(this);
        this.bg.init();
        this.ballnumber = cc.find('Canvas/hero').getComponent('hero')._ball;
        this.overLayer.init();
    },
    
    startGame() {
        this.init();
    },

    pauseGame() {
        this.overLayer.node.active = true;
        this.physicsManager.enabled = false;
        this.overLayer.node.getChildByName('score').getComponent(cc.Label).string = "当前得分：" + cc.find('Canvas/top/topScore').getComponent(cc.Label).string;
        this.overLayer.node.getChildByName('score').getChildByName('result').active = false;
    },

    resumeGame() {
        this.overLayer.node.active = false;
        this.physicsManager.enabled = true;
    },

    stopGame() {
        this.physicsManager.enabled = false;
        this.overLayer.node.active = true;
        this.overLayer.node.getChildByName('score').getChildByName('result').active = true;
    },

    onBallContactBrick(ballNode, brickNode) {
        cc.audioEngine.play(this.tan2);
        ballNode.getChildByName('number').getComponent(cc.Label).string--
        if(ballNode.getChildByName('number').getComponent(cc.Label).string == 0){
            ballNode.destroy();
            this.ballnumber--;
            cc.audioEngine.play(this.crack2);
        }

        this.gameModel.addScore(1);
        
        brickNode.getChildByName('number').getComponent(cc.Label).string --;
        let number = brickNode.getChildByName('number').getComponent(cc.Label).string;
        
        if(number <= 0){
            // this.boomCtl.boomBrick(brickNode);
            brickNode.parent = null;
            cc.audioEngine.play(this.crack1);
        }

        this.gameView.updateScore(this.gameModel.score);
        if (this.gameModel.bricksNumber <= 0) {
            this.overLayer.win();
            this.stopGame();
        }

        if(this.ballnumber == 0){
            this.overLayer.lose();
            this.stopGame();
        }

        return;
    },

    onBallContactGround(ballNode, groundNode) {
        cc.audioEngine.play(this.tan1);

        ballNode.getChildByName('number').getComponent(cc.Label).string--;
        if(ballNode.getChildByName('number').getComponent(cc.Label).string == 0){
            ballNode.destroy();
            this.ballnumber--;
            cc.audioEngine.play(this.crack2);
        }

        if(this.ballnumber == 0){
            this.overLayer.lose();
            this.stopGame();
        }

        return;
    },

    onBallContactPaddle(ballNode, paddleNode) {
        cc.audioEngine.play(this.tan2);
        return;
    },

    onBallContactWall(ballNode, brickNode) {
        cc.audioEngine.play(this.tan1);
        ballNode.getChildByName('number').getComponent(cc.Label).string--;
        if(ballNode.getChildByName('number').getComponent(cc.Label).string == 0){
            ballNode.destroy();
            this.ballnumber--;
            cc.audioEngine.play(this.crack2);
        }
        
        if(this.ballnumber == 0){
            this.overLayer.lose();
            this.stopGame();
        }

        return;
    },

    onDestroy() {
        this.physicsManager.enabled = false;
    },

    update(dt){
        cc.find('Canvas/ballLabel').getComponent(cc.Label).string = this.hero.ballNodePool.size();
    }

});