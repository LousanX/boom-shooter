cc.Class({
    extends: cc.Component,

    properties: {
    },

    init(node){
        let rand1 = (cc.random0To1() * 140);
        let rand2 = (cc.random0To1() * 140);
        let rand3 = (cc.random0To1() * 140);

        let R = rand1 - rand1 % 1;
        let G = rand2 - rand2 % 1;
        let B = rand3 - rand3 % 1;
    
        let color = new cc.Color();
        color.setB(B+100);
        color.setG(G+100);
        color.setR(R+100);

        node.color = color;
    },

    // update (dt) {},
});
