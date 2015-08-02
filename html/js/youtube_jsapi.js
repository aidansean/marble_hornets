/*
 * @author       Rob W (http://stackoverflow.com/a/7513356/938089
 * @description  Executes function on a framed YouTube video (see previous link)
 *               For a full list of possible functions, see:
 *               http://code.google.com/apis/youtube/js_api_reference.html
 * @param String frame_id The id of (the div containing) the frame
 * @param String func     Desired function to call, eg. "playVideo"
 *        (Function)      Function to call when the player is ready.
 * @param Array  args     (optional) List of arguments to pass to function func*/
function callPlayer(frame_id, func, args) {
    if (window.jQuery && frame_id instanceof jQuery) frame_id = frame_id.get(0).id;
    var iframe = document.getElementById(frame_id);
    if (iframe && iframe.tagName.toUpperCase() != 'IFRAME') {
        iframe = iframe.getElementsByTagName('iframe')[0];
    }
    // When the player is not ready yet, add them to a queue
    if (!callPlayer.queue) callPlayer.queue = {};
    var queue = callPlayer.queue[frame_id],
        domReady = document.readyState == 'complete';
    // queue has three states: Uninitialised, array and 0
    // Array = queue, 0 = ready
    if (domReady && !iframe && queue) {
        window.console && console.log('callPlayer: No suitable frame found for id=' + frame_id);
        return clearInterval(queue.poller);
    }
    if (func != 'listening' && (!domReady || iframe && (!iframe.contentWindow || !queue.ready))) {
        if (!queue) queue = callPlayer.queue[frame_id] = [];
        queue.push([func, args]);
        if (!('poller' in queue)) {
            queue.poller = setInterval(function() {callPlayer(frame_id, 'listening');}, 250);
            me(1, function runOnceReady(e) {
                clearInterval(queue.poller);
                var tmp = JSON.parse(e.data);
                if (tmp && tmp.id == frame_id &&
                    tmp.info && tmp.info.videoData &&
                    tmp.info.videoData.jsapicallback == 'ytPlayerOnYouTubePlayerReady') {
                    queue.ready = true;
                    me(runOnceReady);
                    while (tmp = queue.shift()) {
                        callPlayer(frame_id, tmp[0], tmp[1]);
                    }
                }
            }, false);
        }
    } else if (iframe) {
        // When a function is supplied, just call it ("onYouTubePlayerReady")
        if (func.call) return func();
        // Frame exists, 
        iframe.contentWindow.postMessage(JSON.stringify({
            "event": "command",
            "func": func,
            "args": args || [],
            "id": frame_id
        }), "*");
    }
    /* IE8 does not support addEventListener... */
    function me(add, listener) {
        var w3 = add ? window.addEventListener : window.removeEventListener;
        w3 ?
            w3('message', listener, !1)
        :
            (add ? window.attachEvent : window.detachEvent)('onmessage', listener);
    }
}
