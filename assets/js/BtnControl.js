cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad () {
        cc.director.preloadScene('game');
    },

    start () {

    },

    ModelChose(event,date){
        switch(date)
        {
            case "easy":
            cc.find('Game').getComponent('game')._model = 5;
            break;
            case "norml":
            cc.find('Game').getComponent('game')._model = 10;
            break;
            case "hard":
            cc.find('Game').getComponent('game')._model = 30;
            break;
            case "special":
            cc.find('Game').getComponent('game')._model = 100;
            break;
        }

        cc.director.loadScene('game');
    }

    // update (dt) {},
});
