define(function (require, exports, module) {

    var prefix,
        lastTime = 0,
        prefixes = 'webkit moz ms o'.split(' '), //各浏览器前缀
        requestAnimationFrame = window.requestAnimationFrame,
        cancelAnimationFrame = window.cancelAnimationFrame;

    /*
     * Through the traversal of the browser prefix to get the cancelAnimationFrame and requestAnimationFrame in the current form of the browser
     */
    for( var i = 0; i < prefixes.length; i++ ) {
        if ( requestAnimationFrame && cancelAnimationFrame ) {
            break;
        }
        prefix = prefixes[i];
        requestAnimationFrame = requestAnimationFrame || window[ prefix + 'RequestAnimationFrame' ];
        cancelAnimationFrame  = cancelAnimationFrame  || window[ prefix + 'CancelAnimationFrame' ] || window[ prefix + 'CancelRequestAnimationFrame' ];
    }

    /*
     *  If the browser does not support requestAnimationFrame and cancelAnimationFrame,
     *  will be back to setTimeout
     */
    if ( !requestAnimationFrame || !cancelAnimationFrame ) {
        requestAnimationFrame = function( callback, element ) {
            var currTime = new Date().getTime();
            /*
             * in order to make the setTimeout as close as possible to the effect of 60 frames per second
             */
            var timeToCall = Math.max( 0, 16 - ( currTime - lastTime ) );
            var id = window.setTimeout( function() {
                callback( currTime + timeToCall );
            }, timeToCall );
            lastTime = currTime + timeToCall;
            return id;
        };

        cancelAnimationFrame = function( id ) {
            window.clearTimeout( id );
        };
    }
    /*
     * Get global objects
     */
    window.requestAnimationFrame = requestAnimationFrame;
    window.cancelAnimationFrame = cancelAnimationFrame;
});
