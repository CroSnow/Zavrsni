/**
 * Represents a canvas state: everything that is currently drawn on canvas.
 * 
 * @param canvas
 *                a base canvas
 */
function CanvasState(canvas) {

    /** Internal reference to canvas state. */
    var myState = this;

    this.components = [];
    this.lines = [];
    this.tempComponent = null;
    this.tempLine = null;
    this.linePoints = [];
    this.selectedComponent = null;
    this.selectedPoint = null;
    this.postSelectedComponent = null;
    this.isMouseDown = false;
    this.isMouseDragging = false;
    this.off = {
	x : 0,
	y : 0
    };
    this.mouse = {
	x : 0,
	y : 0
    };
    this.mode = 'cmpt';
    this.valid = false;
    this.linesValid = false;

    /**
     * Actions to be executed when left mouse button is raised.
     * 
     * @param e
     *                mouse event
     */
    mouseUp = function(e) {
	myState.isMouseDown = false;

	switch (myState.mode) {
	case 'cmpt':
	    // if (myState.isMouseDragging) {
	    // myState.postSelectedComponent = null;
	    // } else {
	    myState.postSelectedComponent = myState.selectedComponent;
	    // }
	    myState.selectedComponent = null;
	    break;

	case 'line':
	    if (!myState.isMouseDragging && myState.tempLine === null) {
		var l = null;
		var r = null;
		var lines = [].concat(myState.lines);
		for (var i = 0; i < lines.length; i++) {
		    var line = lines[i];
		    if (line.p1 === myState.selectedPoint) {
			r = line;
		    } else if (line.p2 === myState.selectedPoint) {
			l = line;
		    }
		}
		if (r !== null && l !== null) {
		    l.p2 = r.p2;
		    for (var i = 0; i < myState.linePoints.length; i++) {
			if (myState.linePoints[i] === r.p1) {
			    myState.linePoints.splice(i, 1);
			}
		    }
		    for (var i = 0; i < lines.length; i++) {
			if (lines[i] === r) {
			    myState.lines.splice(i, 1);
			    break;
			}
		    }
		} else {
		    var t = r || l;
		    for (var i = 0; i < lines.length; i++) {
			if (lines[i] === t) {
			    myState.lines.splice(i, 1);
			    break;
			}
		    }
		}
	    }
	    myState.selectedPoint = null;
	    myState.linesValid = false;
	    break;
	}
	myState.isMouseDragging = false;
	myState.valid = false;
    }

    /**
     * Actions to be executed when left mouse button is pressed.
     * 
     * @param e
     *                mouse event
     */
    mouseDown = function(e) {
	var mouse = myState.getMouse(e);

	switch (myState.mode) {

	case 'cmpt':
	    var tempComponent = myState.tempComponent;

	    if (tempComponent !== null) {
		myState.releaseTempComponent();
	    } else {
		var selection = myState.getSelection(true);
		myState.selectedComponent = selection;
		if (selection !== null) {
		    var center = selection.calcCenter();
		    myState.off.x = mouse.x - center.cx;
		    myState.off.y = mouse.y - center.cy;
		}
	    }
	    break;
	case 'line':
	    var closestPin = myState.getClosestPin();
	    if (closestPin !== null) {
		if (myState.tempLine !== null) {
		    if (!closestPin.joined) {
			var tempLine = myState.tempLine;
			tempLine.setPoint(closestPin);
			myState.lines.push(tempLine);
			myState.tempLine = null;
		    } else {
			myState.selectedPoint = closestPin;
		    }
		} else {
		    if (!closestPin.joined) {
			myState.tempLine = new Line(closestPin, closestPin);
		    } else {
			// if (!(closestPin instanceof Pin)) {
			myState.selectedPoint = closestPin;
			// }
		    }
		}
	    } else {
		if (myState.tempLine !== null) {
		    var tempLine = myState.tempLine;
		    var point = new LinePoint(mouse.x, mouse.y);
		    tempLine.setPoint(point);
		    myState.linePoints.push(point);
		    myState.lines.push(tempLine);
		    var old = myState.tempLine;
		    myState.tempLine = new Line(point, point);
		    old.next = myState.tempLine;
		    myState.tempLine.prev = old;
		} else {
		    var closestPoint = myState.getClosestPoint();
		    if (closestPoint !== null) {
			myState.selectedPoint = closestPoint;
			myState.off.x = mouse.x - closestPoint.cx;
			myState.off.y = mouse.y - closestPoint.cy;
		    }
		}
	    }
	    break;
	}

	myState.valid = false;
	myState.isMouseDown = true;
    }

    /**
     * Actions to be executed when mouse is moved, regardless of whether mouse
     * button is pressed or not.
     * 
     * @param e
     *                mouse event
     */
    mouseMove = function(e) {

	if (myState.isMouseDown) {
	    myState.isMouseDragging = true;
	}

	var m = myState.getMouse(e);

	myState.mouse = m;

	switch (myState.mode) {

	case 'cmpt':

	    if (myState.tempComponent !== null) {
		myState.tempComponent.setCenter(m.x, m.y);
		// myState.valid = false;
	    }

	    if (myState.selectedComponent !== null) {
		myState.selectedComponent.setCenter(m.x - myState.off.x, m.y - myState.off.y);
		// myState.valid = false;
	    }

	    break;

	case 'line':

	    if (myState.tempLine !== null) {
		myState.tempLine.setPoint({
		    cx : m.x,
		    cy : m.y
		});
		// myState.valid = false;
	    }

	    if (myState.selectedPoint !== null) {
		if (!(myState.selectedPoint instanceof Pin)) {
		    myState.selectedPoint.move(m.x - myState.off.x, m.y - myState.off.y);
		}
	    }

	    break;

	}

	myState.linesValid = false;
	myState.valid = false;
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

    /*
     * Fixes a problem where double clicking causes text to get selected on the
     * canvas:
     */
    canvas.addEventListener('selectstart', function(e) {
	e.preventDefault();
	return false;
    }, false);

    this.selectionColor = '#C00';
    this.selectionWidth = 2;
    this.interval = 10;
    setInterval(function() {
	myState.redraw();
    }, myState.interval);
}

/**
 * Returns all currently drawn elements.
 * 
 * @return array of figures
 */
CanvasState.prototype.getComponents = function() {
    return this.components;
}

CanvasState.prototype.resetTempComponent = function() {
    this.tempComponent = null;
}

CanvasState.prototype.getClosestPin = function() {
    var selected = null;
    var mouse = this.mouse;
    var components = this.components;
    var distance = 25;

    for (var i = components.length - 1; i >= 0; i--) {
	var comp = components[i];
	var pins = getComponentPins(comp);
	for (var j = 0; j < pins.length; j++) {
	    var p = pins[j];
	    var coords = p.getPinTip();
	    var dx = coords.cx - mouse.x;
	    var dy = coords.cy - mouse.y;
	    var nDist = dx * dx + dy * dy;
	    if (nDist < distance) {
		distance = nDist;
		selected = p;
	    }
	}
    }
    return selected;
};

CanvasState.prototype.getLinePoints = function() {
    var points = [].concat(this.linePoints);
    var components = this.components;
    for (var i = 0; i < components.length; i++) {
	var comp = components[i];
	var pins = getComponentPins(comp);
	for (var j = 0; j < pins.length; j++) {
	    var p = pins[j];
	    points.push(p.getPinTip());
	}
    }
    return points;
}

CanvasState.prototype.getClosestPoint = function() {
    var mouse = this.mouse;
    var points = this.getLinePoints();
    var closest = null;
    var distance = 25;

    for (var i = 0; i < points.length; i++) {
	var point = points[i];
	var dx = point.cx - mouse.x;
	var dy = point.cy - mouse.y;
	var nDist = dx * dx + dy * dy;
	if (nDist < distance) {
	    distance = nDist;
	    closest = point;
	}
    }

    return closest;
}

/**
 * Returns a figure which is positioned at top level under mouse cursor, if any.
 * 
 * @param e
 *                event
 * @param onTop
 *                put figure on top afterwards, if such exists
 * @return a figure, or <code>null</code>
 */

CanvasState.prototype.getSelection = function(onTop) {
    var mouse = this.mouse;
    var selected = null;
    var onTop = onTop || false;

    var components = this.components;
    for (var i = components.length - 1; i >= 0; i--) {
	var comp = components[i];
	if (comp.contains(mouse)) {
	    selected = comp;
	    if (onTop) {
		/* Gently put it on the top: */
		components.splice(i, 1);
		components.push(selected);
	    }
	    this.components = components;
	    break;
	}
    }

    return selected;
};

CanvasState.prototype.releaseTempComponent = function() {
    var tempComponent = this.tempComponent;
    tempComponent.resetColor();
    this.components.push(tempComponent);
    this.resetTempComponent();
    this.valid = false;
}

CanvasState.prototype.checkLines = function() {
    if (!this.linesValid) {

	/* svi joined na false */
	var components = this.components;
	for (var i = components.length - 1; i >= 0; i--) {
	    var comp = components[i];
	    var pins = getComponentPins(comp);
	    for (var j = 0; j < pins.length; j++) {
		pins[j].joined = false;
	    }
	}
	/* */

	var lines = [].concat(this.lines);
	if (this.tempLine !== null) {
	    lines.push(this.tempLine);
	}
	var checked = [];
	checked.contains = function(obj) {
	    for (var i = 0; i < checked.length; i++) {
		if (checked[i] === obj) {
		    return true;
		}
	    }
	    return false;
	}
	for (var i = 0; i < lines.length; i++) {
	    var l = lines[i];
	    if (checked.contains(l)) {
		continue;
	    }
	    checked.push(l);
	    var begin = false;
	    var end = false;
	    var pin1 = null;
	    var pin2 = null;
	    if (l.p1 instanceof Pin) {
		begin = true;
		pin1 = l.p1;
	    }
	    if (l.p2 instanceof Pin) {
		end = true;
		pin2 = l.p2;
	    }
	    if (!begin) {
		var p;
		for (p = l; p.prev !== null; p = p.prev) {
		    checked.push(p);
		}
		if (p.p1 instanceof Pin) {
		    begin = true;
		    pin1 = p.p1;
		}
	    }
	    if (!end) {
		var p;
		for (p = l; p.next !== null; p = p.next) {
		    checked.push(p);
		}
		if (p.p2 instanceof Pin) {
		    end = true;
		    pin2 = p.p2;
		}
	    }
	    if (begin && end) {
		if (pin1.type != pin2.type) {
		    recolorLine(l, '#000');
		} else {
		    recolorLine(l, '#F11');
		}
		pin1.joined = true;
		pin2.joined = true;
	    } else {
		recolorLine(l, '#666');
		if (begin) {
		    pin1.joined = !end;
		} else if (end) {
		    pin2.joined = !begin;
		}
	    }
	}
	this.linesValid = true;
    }
}

function recolorLine(line, color) {
    line.color = color;
    var p = line.prev;
    while (p !== null) {
	p.color = color;
	p = p.prev;
    }
    p = line.next;
    while (p !== null) {
	p.color = color;
	p = p.next;
    }
}

/**
 * Redraws canvas if invalid.
 */
CanvasState.prototype.redraw = function() {

    // if state is invalid, redraw and validate!
    if (!this.valid) {

	var ctx = this.ctx;
	ctx.lineWidth = 2;

	var components = this.getComponents();

	this.clear();

	for (var i = 0; i < components.length; i++) {
	    components[i].draw(ctx);
	}

	var tempComponent = this.tempComponent;
	if (tempComponent !== null) {
	    tempComponent.draw(ctx);
	}

	this.checkLines();

	var lines = this.lines;
	for (var i = 0; i < lines.length; i++) {
	    lines[i].draw(ctx);
	}

	var tempLine = this.tempLine;
	if (tempLine !== null) {
	    tempLine.draw(ctx);
	}

	var postSelectedComponent = this.postSelectedComponent;

	switch (this.mode) {

	case 'cmpt':

	    if (postSelectedComponent !== null && !this.isMouseDragging) {
		postSelectedComponent.defineBB();
		var bbx = postSelectedComponent.bbx;
		var bby = postSelectedComponent.bby;
		var bbh = postSelectedComponent.bbh;
		var bbw = postSelectedComponent.bbw;

		ctx.setLineDash([ 4 ]);
		ctx.strokeStyle = '#448';
		var o = 2;
		ctx.strokeRect(bbx - o, bby - o, bbw + 2 * o, bbh + 2 * o);
		ctx.strokeStyle = '#000';
		ctx.setLineDash([]);
	    }
	    break;

	case 'line':

	    var closest = this.getClosestPoint();
	    if (closest !== null) {
		ctx.strokeStyle = '#00f';
		ctx.beginPath();
		ctx.moveTo(closest.cx, closest.cy);
		ctx.arc(closest.cx, closest.cy, 3, 0, 2 * Math.PI, true);
		ctx.closePath();
		ctx.stroke();
		ctx.fillStyle = '#fff';
		ctx.fill();
	    }

	    break;
	}

	this.valid = true;
    }
}

CanvasState.prototype.addComponent = function(component) {
    this.components.push(component);
    this.valid = false;
}

CanvasState.prototype.setTempComponent = function(component) {
    this.tempComponent = component;
    this.valid = false;
}

CanvasState.prototype.clear = function() {
    this.ctx.clearRect(0, 0, this.width, this.height);
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
 *                mouse event
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
