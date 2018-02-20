const colorCtl = require('colorCtl');
cc.Class({
    extends: cc.Component,

    properties: {
        _Shooting:false,
        _lineShoot:false,
        _ball:0,
        ballPrefab:cc.Prefab,

        putButton:cc.Node,
        lineBtn:cc.Node,
    },

    init(){
        this.node.x = 0;
        let color = new colorCtl;
        color.init(this.node);

        let ear1 = this.node.getChildByName('ear1');
        let ear2 = this.node.getChildByName('ear2');
        color.init(ear1);
        color.init(ear2);

        this._ball = this.setBallNumber();

        this.ballNodePool = new cc.NodePool();

        if(cc.find('Game').getComponent('game')._model == 100){
            this._ball = 99;
        }

        for(let i = 0;i < this._ball;i++){
            this.ballNodePool.put(cc.instantiate(this.ballPrefab));
        }

        this.node.on("touchmove",(event)=>{
            let touchPoint1 = this.node.parent.convertToNodeSpaceAR(event.getLocation());
     
            this.node.x = touchPoint1.x;

            ear1.x = -77.4;
            ear2.x = 77.8;
        })

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, (event) => {
            if (event.keyCode === cc.KEY.j) {
                this._Shooting = true;
            }
            if(event.keyCode === cc.KEY.k){
                this._lineShoot = true;
            }
        });

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, (event) => {
            if (event.keyCode === cc.KEY.j) {
                this._Shooting = false;
            }
            if(event.keyCode === cc.KEY.k){
                this._lineShoot = false;
            }
        });

        this.putButton.on('touchend',(event)=>{
            this._Shooting = true;
        });

        this.lineBtn.on('touchstart',(event)=>{
            this._lineShoot = true;
        });

        this.lineBtn.on('touchend',(event)=>{
            this._lineShoot = false;
        });
    },

    setBallNumber(){
        let rand = cc.random0To1();
        if(rand > 0 && rand < 0.33){return 2;}
        if(rand >= 0.33 && rand <= 0.66){return 4;}
        if(rand > 0.66 && rand < 1){return 6;}
    },

    update (dt) {
        if(this._Shooting || this._lineShoot){
            let self = this;
            if(self.ballNodePool.size() > 0){
                let ballNode = self.ballNodePool.get();
                ballNode.parent = cc.find('Canvas');
                ballNode.getComponent('ball').init(cc.find('Canvas').getComponent('GameCtl'));
            }
        }

        this._Shooting = false;
    },
});
