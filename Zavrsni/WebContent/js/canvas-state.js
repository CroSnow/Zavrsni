/**
 * Represents a canvas state: everything that is currently drawn on canvas.
 * 
 * @param canvas
 *            a base canvas
 */
function CanvasState(canvas) {

    /**
     * Actions to be executed when left mouse button is raised.
     * 
     * @param e
     *            mouse event
     */
    mouseUp = function(e) {

        if (myState.postSelection !== null) {
            myState.postSelection.defineBB();
        }

        myState.dragging = false;
        myState.pressed = false;
        myState.knobs = [];
        myState.points = [];
        myState.rot = null;

        if (!myState.dragging) {
            var selection = getSelection(e);
            /* Ne oznacavati knobove i pointeve kao 'selection'! */
            if (selection == null || selection != null && selection.selectable) {
                myState.postSelection = selection;
                if (selection != null) {
                    selection.defineBB();
                }
            }
        }

        if (myState.postSelection !== null && myState.postSelection.selectable) {

            var fig = myState.postSelection;
            // fig.defineBB();
            var x1 = fig.bbx;
            var y1 = fig.bby;
            var x2 = x1 + fig.bbw;
            var y2 = y1 + fig.bbh;
            var o = 2;

            /*
             * Obavezno postaviti id prije svega ostaloga jer se knob razlikuje
             * od rectanglea po atributu id.
             */
            if (myState.postSelection.resizable) {
                k1 = new Rectangle();
                k1.id = "UL";
                k1.set(x1 - o, y1 - o, 2 * o, 2 * o, '#0000FF');
                k1.selectable = false;
                k1.name = 'knob';

                k2 = new Rectangle();
                k2.id = "UR";
                k2.set(x2 - o, y1 - o, 2 * o, 2 * o, '#0000FF');
                k2.selectable = false;
                k2.name = 'knob';

                k3 = new Rectangle();
                k3.id = "LR";
                k3.set(x2 - o, y2 - o, 2 * o, 2 * o, '#0000FF');
                k3.selectable = false;
                k3.name = 'knob';

                k4 = new Rectangle();
                k4.id = "LL";
                k4.set(x1 - o, y2 - o, 2 * o, 2 * o, '#0000FF');
                k4.selectable = false;
                k4.name = 'knob';

                myState.knobs.push(k1);
                myState.knobs.push(k2);
                myState.knobs.push(k3);
                myState.knobs.push(k4);
            }

            /* Dodavanje point-ova: */
            pts = fig.getPoints();
            var o = 2;

            for (var i = 0; i < pts.length; i++) {
                var cir = new Circle();
                var x = pts[i].x;
                var y = pts[i].y;
                cir.freepoint = true; // tretira se kao point!
                cir.point = pts[i];
                cir.set(x, y, o, '#F00');
                myState.points.push(cir);
            }

            var rot = new Circle();
            var cx = fig.bbx + fig.bbw / 2;
            var cy = fig.bby + fig.bbh / 2;
            var rotOffset = Math.sqrt(Math.pow(fig.bby - cy, 2) + Math.pow(fig.bbx - cx, 2)) * Math.SQRT1_2 * 1.2;
            var r = 4;
            var rx = Math.round(cx + rotOffset * Math.cos(fig.angle));
            var ry = Math.round(cy - rotOffset * Math.sin(fig.angle));
            rot.set(rx, ry, r, '#0F0');
            rot.rotpoint = true;
            myState.rot = rot;

            var postSel = myState.postSelection;
            myState.boundingFrame = new Rectangle();
            myState.boundingFrame.set(postSel.bbx, postSel.bby, postSel.bbw, postSel.bbh, '#888888');
            myState.boundingFrame.selectable = false;

        }
        myState.valid = false;
    }

    /**
     * Returns a figure which is positioned at top level under mouse cursor, if
     * any.
     * 
     * @param e
     *            mouse event
     * @return a figure, or <code>null</code>
     */
    getSelection = function(e) {
        var mouse = myState.getMouse(e);
        var mx = mouse.x;
        var my = mouse.y;
        var figures = myState.getFigures();

        var knobs = myState.knobs;
        var points = myState.points;

        if (myState.rot != null) {
            if (myState.rot.contains(mx, my)) {
                var mySel = myState.rot;
                return mySel;
            }
        }

        for (var i = 0; i < points.length; i++) {
            if (points[i].contains(mx, my)) {
                var mySel = points[i];
                return mySel;
            }
        }

        for (var i = 0; i < knobs.length; i++) {
            if (knobs[i].contains(mx, my)) {
                var mySel = knobs[i];
                return mySel;
            }
        }

        var l = figures.length;
        for (var i = l - 1; i >= 0; i--) {
            if (figures[i].contains(mx, my)) {
                var mySel = figures[i];
                return mySel;
            }
        }
        return null;
    };

    /**
     * Actions to be executed when left mouse button is pressed.
     * 
     * @param e
     *            mouse event
     */
    mouseDown = function(e) {
        var selection = getSelection(e);
        myState.selection = selection;
        if (selection !== null) {
            var mouse = myState.getMouse(e);
            var mx = mouse.x;
            var my = mouse.y;
            myState.dragoffx = mx - selection.x;
            myState.dragoffy = my - selection.y;
        }
        myState.pressed = true;
    };

    /**
     * Actions to be executed when mouse is moved, regardless of whether mouse
     * button is pressed or not.
     * 
     * @param e
     *            mouse event
     */
    mouseMove = function(e) {

        /* DEBUG MODE: */
        var sel = getSelection(e);
        var element = document.getElementById("debug");
        var debug;

        debug = '<pre>\n';
        if (sel == null) {
            debug += "<i>null</i>\n";
        } else {
            debug += JSON.stringify(sel, null, 4);
        }

        debug += '</pre>\n';
        element.innerHTML = debug;
        /* END OF DEBUG. */

        if (myState.dragging || myState.pressed) {
            myState.dragging = true;
            var mouse = myState.getMouse(e);
            var nx = mouse.x - myState.dragoffx;
            var ny = mouse.y - myState.dragoffy;
            if (myState.selection != null) {
                myState.selection.move(nx, ny);
                if (myState.selection.hasOwnProperty('id')) {
                    var knob = myState.selection;
                    myState.postSelection.resize(knob);
                }
                if (myState.selection.hasOwnProperty('freepoint') && myState.selection.name !== "rectangle") {
                    var point = myState.selection;
                    myState.postSelection.freepoint(point, nx, ny);
                }
                if (myState.selection.hasOwnProperty('rotpoint')) {
                    var rpoint = myState.selection;
                    myState.postSelection.rotate(rpoint);
                }
            }
            myState.valid = false;
        }
    }
    this.canvas = canvas;
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = canvas.getContext('2d');

    this.registerEventListeners();

    // border checking
    var stylePaddingLeft, stylePaddingTop, styleBorderLeft, styleBorderTop;
    if (document.defaultView && document.defaultView.getComputedStyle) {
        this.stylePaddingLeft = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingLeft'], 10) || 0;
        this.stylePaddingTop = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingTop'], 10) || 0;
        this.styleBorderLeft = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderLeftWidth'], 10) || 0;
        this.styleBorderTop = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderTopWidth'], 10) || 0;
    }

    var html = document.body.parentNode;
    this.htmlTop = html.offsetTop;
    this.htmlLeft = html.offsetLeft;

    this.valid = false;
    this.points = [];
    this.figures = [];
    this.inPins = [];
    this.outPins = [];
    this.rot = null;
    this.knobs = [];
    this.boundingFrame = null;

    this.temporary = null;

    this.dragging = false;
    this.selection = null;
    this.postSelection = null;
    this.dragoffx = 0;
    this.dragoffy = 0;

    /** Internal refernce to canvas state. */
    var myState = this;

    /*
     * Fixes a problem where double clicking causes text to get selected on the
     * canvas:
     */
    canvas.addEventListener('selectstart', function(e) {
        e.preventDefault();
        return false;
    }, false);

    this.selectionColor = '#CC0000';
    this.selectionWidth = 2;
    this.interval = 30;
    setInterval(function() {
        myState.redraw();
    }, myState.interval);
}

/**
 * Returns all currently drawn figures, including pins.
 * 
 * @return array of figures
 */
CanvasState.prototype.getFigures = function() {

    var figures = [];

    figures.pushAll = function(o) {
        for (j = 0; j < o.length; j++) {
            this.push(o[j]);
        }
    }

    /* Making a deep copy of canvas figures. */
    figures.pushAll(this.figures);

    var temporary = this.temporary;

    if (temporary !== null) {
        figures.push(temporary);
    }

    return figures;
}

CanvasState.prototype.getInputPins = function() {
    return this.inPins;
}

CanvasState.prototype.getOutputPins = function() {
    return this.outPins;
}

/**
 * Adds a rectangle to canvas state.
 * 
 * @param rectangle
 *            a rectangle
 */
CanvasState.prototype.addRectangle = function(rectangle) {
    // this.rectangles.push(rectangle);
    this.figures.push(rectangle);
    this.valid = false;
}

/**
 * Clears all figures which are currently drawn on canvas.
 */
CanvasState.prototype.clearShapes = function() {
    this.figures = [];
    this.inPins = [];
    this.outPins = [];
    this.ctx.clearRect(0, 0, this.width, this.height);
}

/**
 * Adds a circle to canvas state.
 * 
 * @param circle
 *            a circle
 */
CanvasState.prototype.addCircle = function(circle) {
    // this.circles.push(circle);
    this.figures.push(circle);
    this.valid = false;
}

/**
 * Adds a triangle to canvas state.
 * 
 * @param triangle
 *            a triangle
 */
CanvasState.prototype.addTriangle = function(triangle) {
    // this.triangles.push(triangle);
    this.figures.push(triangle);
    this.valid = false;
}

/**
 * Adds a pin to canvas state.
 * 
 * @param pin
 *            a pin
 */
CanvasState.prototype.addPin = function(pin) {
    // this.pins.push(pin);
    this.figures.push(pin);
    if (pin.type === 'in') {
        this.inPins.push(pin);
    }
    if (pin.type === 'out') {
        this.outPins.push(pin);
    }
    this.valid = false;
}

/**
 * Asynchronously clears the screen.
 */
CanvasState.prototype.clear = function() {
    this.ctx.clearRect(0, 0, this.width, this.height);
}

/**
 * Adds a polygon to canvas state.
 * 
 * @param polygon
 *            a polygon
 */
CanvasState.prototype.addPolygon = function(polygon) {
    // this.polygons.push(polygon);
    this.figures.push(polygon);
    this.valid = false;
}

/**
 * Adds a free shape to canvas state.
 * 
 * @param free
 *            a free shape
 */
CanvasState.prototype.addFree = function(free) {
    // this.frees.push(free);
    this.figures.push(free);
    this.valid = false;
}

/**
 * Sets a currently drawing figure.
 * 
 * @param temp
 *            a figure
 */
CanvasState.prototype.setTemporary = function(temp) {
    this.temporary = temp;
    this.valid = false;
}

/**
 * Redraws canvas if invalid.
 */
CanvasState.prototype.redraw = function() {

    // if our state is invalid, redraw and validate!
    if (!this.valid) {

        var ctx = this.ctx;
        // ctx.lineJoin = 'round';
        ctx.lineWidth = 2;

        var figures = this.getFigures();

        this.clear();

        for (j = 0; j < figures.length; j++) {
            /**/
//            figures[j].defineBB();
            /**/
            figures[j].draw(ctx);
        }

        if (this.postSelection !== null && !this.dragging) {

            if (this.boundingFrame !== null) {
                ctx.setLineDash([ 5 ]);
                ctx.lineWidth = 1;
                this.boundingFrame.draw(ctx);
                ctx.lineWidth = 2;
                ctx.setLineDash([]);
            }

            for (j = 0; j < this.knobs.length; j++) {
                ctx.fillStyle = '#fff';
                this.knobs[j].draw(ctx);
            }

            for (var i = 0; i < this.points.length; i++) {
                ctx.fillStyle = '#fff';
                this.points[i].draw(ctx);
            }

            if (this.rot !== null) {
                this.rot.draw(ctx);
            }

        }

        this.valid = true;
    }
}

/**
 * Registers all default event listeners on canvas.
 */
CanvasState.prototype.registerEventListeners = function() {
    this.canvas.addEventListener('mousedown', mouseDown, true);
    this.canvas.addEventListener('mouseup', mouseUp, true);
    this.canvas.addEventListener('mousemove', mouseMove, true);
}

/**
 * Unregisters all default event listeners on canvas.
 */
CanvasState.prototype.unregisterEventListeners = function() {
    this.canvas.removeEventListener('mousedown', mouseDown, true);
    this.canvas.removeEventListener('mouseup', mouseUp, true);
    this.canvas.removeEventListener('mousemove', mouseMove, true);
}

/**
 * Calculates relative position of mouse x and y coordinates to canvas in the
 * page.
 * 
 * @param e
 *            mouse event
 * @return {x, y}
 */
CanvasState.prototype.getMouse = function(e) {
    var element = this.canvas, offsetX = 0, offsetY = 0, mx, my;

    // Compute the total offset
    if (element.offsetParent !== undefined) {
        do {
            offsetX += element.offsetLeft;
            offsetY += element.offsetTop;
        } while ((element = element.offsetParent));
    }

    // Add padding and border style widths to offset
    // Also add the <html> offsets in case there's a position:fixed bar
    offsetX += this.stylePaddingLeft + this.styleBorderLeft + this.htmlLeft;
    offsetY += this.stylePaddingTop + this.styleBorderTop + this.htmlTop;

    mx = e.pageX - offsetX;
    my = e.pageY - offsetY;

    // We return a simple javascript object (a hash) with x and y defined
    return {
        x : mx,
        y : my
    };
}
