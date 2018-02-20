cc.Class({
    extends: cc.Component,

    properties: {
        suipian:cc.Prefab,
    },

    boomBrick(node){
        let pos = node.position;
        let randArr = [];
        let fadeAction = cc.fadeOut(0.5);
        let easingAction1 =  cc.easeBezierAction(20,25,50,10,100,-150);
        let easingAction2 =  cc.easeBezierAction(0.17,0.67,0.79,1.47);

        for(let i = 0;i<4;i++){
            let rand = cc.random0To1() * 10;
            randArr.push(rand + 1);
        }

        for(let i = 0;i < 4;i++){
            let suipianNode = cc.instantiate(this.suipian);
            cc.find('Canvas/PhysicsLayer/brickLayer').addChild(suipianNode);
            // let pos =  cc.find('Canvas/PhysicsLayer/').convertToNodeSpaceAR(node.position);

            let ctx = suipianNode.getChildByName('ctx').getComponent(cc.Graphics);
            ctx.moveTo (0, 0);
            ctx.bezierCurveTo(20,25,50,10,100,-150);
            ctx.stroke();

            // ctx.moveTo (0, 0);
            // ctx.bezierCurveTo(-20,-50,-50,10,-100,-150);
            // ctx.stroke();

            suipianNode.position = pos; 
        }
    },

    boomBall(node){

    }

    // update (dt) {},
});
