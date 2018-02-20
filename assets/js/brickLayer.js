const colorCtl = require('colorCtl');
const labelCtl = require('NumberCtl');

cc.Class({
    extends: cc.Component,

    properties: {
        padding: 0,
        spacing: 0,
        cols: 0,
        brickPrefab: cc.Prefab,
        bricksNumber: 0,
    },

    init(bricksNumber) {
        this.node.removeAllChildren();
        this.bricksNumber = bricksNumber;
        for (let i = 0; i < this.bricksNumber; i++) {
            let brickNode = cc.instantiate(this.brickPrefab);

            let label = brickNode.getChildByName('number');
            let NumberCtl = new labelCtl;
            let b = cc.find('Game').getComponent('game')._model
            
            NumberCtl.init(label.getComponent(cc.Label),b);

            if(label.getComponent(cc.Label).string == 0)
            {
                label.getComponent(cc.Label).string = 1;
            }

            let totle = cc.find('totleCtl').getComponent('totle');
            totle.plus(label.getComponent(cc.Label).string);

            let color = new colorCtl;
            color.init(brickNode);
            color.init(label);

            brickNode.parent = this.node;

            brickNode.x = this.padding + (i % this.cols) * (brickNode.width + this.spacing) + brickNode.width / 2;
            brickNode.y = -this.padding - Math.floor(i / this.cols) * (brickNode.height + this.spacing) - brickNode.height / 2;
        }
    }
});