function init() {

    ctrlIsDown = false;

    window.addEventListener('keydown', function(e) {
        if (e.keyCode === 17) {
            ctrlIsDown = true;
        }
    }, false);

    window.addEventListener('keyup', function(e) {
        if (e.keyCode === 17) {
            ctrlIsDown = false;
        }
    }, false);

    /** Globalna referenca na Canvas State. */
    s = new CanvasState(document.getElementById('systemC'));
    s.registerEventListeners();
    s.mode = 'cmpt';
    
    document.getElementById("delete").onclick = function() {
        // TODO delete
    }

    document.getElementById("deleteall").onclick = function() {
        // TODO deleteall
    }

    document.getElementById("saveas").onclick = function() {
        id = null;
        saveaction();
    }

    saveaction = function() {
        // TODO save
    }

    document.getElementById("save").onclick = saveaction;
    
    document.getElementById("cmpt").onclick = function() {
	s.mode = 'cmpt';
    }
    
    document.getElementById("line").onclick = function() {
	s.mode = 'line';
    }
    
    if (loadedData !== "") {

    }
}
