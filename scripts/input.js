let Input = (function() {
    function Keyboard() {
        let that = {
            keys : {},
            handlers : {}
        };
        let pressed = false;

        function keyPress(e) {
            that.keys[e.key] = e.timeStamp;
        }
        
        function keyRelease(e) {
            delete that.keys[e.key];
            pressed = false;
        }

        window.addEventListener('keydown', keyPress);
        window.addEventListener('keyup', keyRelease);

        that.registerCommand = function(key, handler) {
            that.handlers[key] = handler;
        };

        that.update = function(elapsedTime) {
            for (let key in that.keys) {
                if (that.keys.hasOwnProperty(key)) {
                    if (that.handlers[key]) {
                        if(!pressed){
                            that.handlers[key](elapsedTime);
                            pressed = true;
                        }
                    }
                }
            }
        };

        return that;
    }

    return {
        Keyboard : Keyboard
    };
}());
