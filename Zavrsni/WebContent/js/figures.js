var global_id = 0;

function Pin(obj) {
    for (prop in obj) {
	this[prop] = obj[prop];
    }
}
/**
 * -----------------------------Pin------------------------
 */
Pin.prototype = {
    // Name of the shape.
    name : "pin",
    // Resizable flag.
    resizable : false,
    // Selectable flag.
    selectable : true,
    // id number.
    id : global_id++,
    // x coordinate.
    x : 0,
    // y coordinate.
    y : 0,
    
    // NE DIRAJ
    cx : 0,
    cy : 0,
    joined : false,
    // Lovre
    
    // width.
    w : 2,
    // height.
    h : 10,
    // points for drawing.
    points : [],
    // the color of the pin.
    fill : '#000000',
    // angle of the pin.
    angle : Math.PI / 2,
    // type of the pin. in/out.
    type : 'in',
    /**
     * Defines the bounding box of a pin.
     */
    defineBB : function() {
	this.definePoints();
	/*
	 * this.bbx = Math.round(this.x - 20); this.bby = Math.round(this.y -
	 * 20); this.bbw = Math.round(40); this.bbh = Math.round(40);
	 */
	if (this.points == undefined) {
	    return;
	}
	var points = this.points;
	var minx = points[4].x;
	var miny = points[4].y;
	var maxx = points[4].x;
	var maxy = points[4].y;
	for (i = 5; i < points.length; i++) {
	    if (minx > points[i].x) {
		minx = points[i].x;
	    }
	    if (maxx < points[i].x) {
		maxx = points[i].x;
	    }
	    if (miny > points[i].y) {
		miny = points[i].y;
	    }
	    if (maxy < points[i].y) {
		maxy = points[i].y;
	    }
	}
	this.bbx = Math.round(minx);
	this.bby = Math.round(miny);
	this.bbw = Math.round(maxx - minx);
	this.bbh = Math.round(maxy - miny);

	
	this.getPinTip();
    },
    /**
     * Sets the basic attributes of a pin.
     * 
     * @param x
     *                the x coordinate of the pin.
     * @param y
     *                the y coordinate of the pin.
     * @param type
     *                is this a in or out pin.
     * @param fill
     *                the color.
     */
    set : function(x, y, type, fill) {
	this.name = 'pin';

	var defaultWidth = 2;
	var defaultLength = 25;

	this.x = x || 0;
	this.y = y || 0;
	this.getPinTip();
	this.fill = fill || '#000000';
	this.direction = 0;
	this.type = type || "in";

	this.definePoints();
	this.defineBB();

    },
    /**
     * Checks if the given point is inside this pin.
     * 
     * @param mx
     *                the mouse x coordinate.
     * @param my
     *                the mouse y coordinate.
     * @returns {Boolean} true if its inside else false.
     */
    contains : function(mx, my) {
	return this.bbx <= mx && this.bbx + this.bbw >= mx && this.bby <= my && this.bby + this.bbh >= my;
    },
    /**
     * Returns points //does nothing.
     * 
     * @returns {Array}
     */
    getPoints : function() {

	return [];

    },
    /**
     * Defines points for drawing later.
     */
    definePoints : function() {
	var angle = this.angle;
	var cx = this.x;
	var cy = this.y;
	var w = this.w;
	var h = this.h;
	var r = 10;
	var offset1 = Math.asin(w / r);
	var offset2 = Math.asin(h / r);
	if (this.type === 'in') {
	    var offset3 = +1;
	    var x5 = cx + (r + 5 + 5 * offset3) * Math.cos(angle);
	    var y5 = cy - (r + 5 + 5 * offset3) * Math.sin(angle);
	    var x6 = x5 + (r + 5) * Math.cos(Math.PI / 4 + angle);
	    var y6 = y5 - (r + 5) * Math.sin(Math.PI / 4 + angle);
	    var x7 = x5 + (r + 5) * Math.cos(-Math.PI / 4 + angle);
	    var y7 = y5 - (r + 5) * Math.sin(-Math.PI / 4 + angle);
	} else {
	    var offset3 = +1;
	    var x5 = cx + (r + 5 + 5 * offset3) * Math.cos(angle);
	    var y5 = cy - (r + 5 + 5 * offset3) * Math.sin(angle);
	    var x6 = cx + (r + 5) * Math.cos(Math.PI / 4 + angle);
	    var y6 = cy - (r + 5) * Math.sin(Math.PI / 4 + angle);
	    var x7 = cx + (r + 5) * Math.cos(-Math.PI / 4 + angle);
	    var y7 = cy - (r + 5) * Math.sin(-Math.PI / 4 + angle);
	}
	var x1 = cx + r * Math.cos(offset1 + angle);
	var y1 = cy - r * Math.sin(offset1 + angle);
	var x2 = cx + r * Math.cos(offset2 + angle + Math.PI / 2);
	var y2 = cy - r * Math.sin(offset2 + angle + Math.PI / 2);
	var x3 = cx + r * Math.cos(offset1 + angle + Math.PI);
	var y3 = cy - r * Math.sin(offset1 + angle + Math.PI);
	var x4 = cx + r * Math.cos(offset2 + angle + 3 * Math.PI / 2);
	var y4 = cy - r * Math.sin(offset2 + angle + 3 * Math.PI / 2);

	var x8 = cx;
	var y8 = cy;
	this.points[0] = new Point(x1, y1);
	this.points[1] = new Point(x2, y2);
	this.points[2] = new Point(x3, y3);
	this.points[3] = new Point(x4, y4);
	this.points[4] = new Point(x5, y5);
	this.points[5] = new Point(x6, y6);
	this.points[6] = new Point(x7, y7);
	this.points[7] = new Point(x8, y8);
    },
    /**
     * Defines the free points which we use for manipulating the shape.
     * 
     * @param p
     * @param nx
     *                x coordinate
     * @param ny
     *                y coordinate
     */
    freepoint : function(p, nx, ny) {
	var r = Math.sqrt(Math.pow(this.x - nx, 2) + Math.pow(this.y - ny, 2));
	var point = p.point;
	var dx = nx - point.x;
	var dy = ny - point.y;
	switch (point.dim) {
	case 'w':
	    this.w = r;
	    break;
	case 'h':
	    this.h = r;
	    break;
	}
	point.x = nx;
	point.y = ny;
    },
    /**
     * Moves the pin to the given coordinates.
     * 
     * @param nx
     *                the new x coordinate.
     * @param ny
     *                the new y coordinate.
     */
    move : function(nx, ny) {
	this.x = nx;
	this.y = ny;
	this.defineBB();
	this.getPinTip();
    },
    /**
     * Rotates the pin.
     * 
     * @param p
     *                the point of rotation.
     */
    rotate : function(p) {
	var nx = p.x;
	var ny = p.y;
	var cx = this.x;
	var cy = this.y;
	var dx = nx - cx;
	var dy = ny - cy;

	var nang = Math.atan2(-dy, dx);
	if (ctrlIsDown) {
	    nang = Math.round(nang / (Math.PI / 4)) * (Math.PI / 4);
	}
	this.angle = nang;
	this.definePoints();
	this.defineBB();
    },
    /**
     * Draws the pin on the contex.
     */
    draw : function(ctx) {
	this.definePoints();
	ctx.strokeStyle = this.fill;
	var pointsForDrawing = this.points;

	ctx.stroke();

	var defaultWidth = 2;
	var offset = 0;
	if (this.type === "in") {
	    offset = -5;
	} else {
	    offset = 5;
	}
	ctx.beginPath();
	ctx.moveTo(pointsForDrawing[4].x, pointsForDrawing[4].y);
	ctx.lineTo(pointsForDrawing[5].x, pointsForDrawing[5].y);
	ctx.moveTo(pointsForDrawing[4].x, pointsForDrawing[4].y);
	ctx.lineTo(pointsForDrawing[6].x, pointsForDrawing[6].y);
	ctx.moveTo(pointsForDrawing[4].x, pointsForDrawing[4].y);
	ctx.lineTo(pointsForDrawing[7].x, pointsForDrawing[7].y);
	ctx.closePath();
	ctx.stroke();
	this.defineBB;
    },

    /**
     * Returns tip of pin.
     * 
     * @author Lovre
     */
    getPinTip : function() {
	var cx = this.x;
	var cy = this.y;
	var angle = this.angle;
	this.cx = cx + 20 * Math.cos(angle);
	this.cy = cy - 20 * Math.sin(angle);
	return {
	    cx : this.cx,
	    cy : this.cy
	};
    }
}

function Triangle(obj) {
    for (prop in obj) {
	this[prop] = obj[prop];
    }
}
/**
 * -------------------Triangle----------------
 */
Triangle.prototype = {
    // Name of the shape.
    name : "triangle",
    // the id of the shape on the contex.
    id : global_id++,
    // Resizable flag.
    resizable : false,
    // Selectable flag.
    selectable : true,
    // The angle of the triangle.
    angle : Math.PI / 2,

    fill : '#000',
    /**
     * Determines the bounding box of the triangle class.
     */
    defineBB : function() {
	this.determinePts();
	var x1 = this.x1;
	var x2 = this.x2;
	var x3 = this.x3;
	var y1 = this.y1;
	var y2 = this.y2;
	var y3 = this.y3;
	var minx = Math.min(x1, x2, x3);
	var miny = Math.min(y1, y2, y3);
	var maxx = Math.max(x1, x2, x3);
	var maxy = Math.max(y1, y2, y3);

	this.bbx = Math.round(minx);
	this.bby = Math.round(miny);
	this.bbw = maxx - minx;
	this.bbh = maxy - miny;
    },
    /**
     * Determines points that we use later for drawing. The points are
     * determined with the help of the center coordinate the angle and the
     * radius.
     */
    determinePts : function() {
	var angle = this.angle;
	var offset = Math.PI * 2 / 3;
	var cx = this.x;
	var cy = this.y;
	var a = this.a;

	this.x1 = cx + a * Math.cos(angle);
	this.y1 = cy - a * Math.sin(angle);
	this.x2 = cx + a * Math.cos(angle + offset);
	this.y2 = cy - a * Math.sin(angle + offset);
	this.x3 = cx + a * Math.cos(angle - offset);
	this.y3 = cy - a * Math.sin(angle - offset);
    },
    /**
     * Sets basic parameter which define a triangle.
     * 
     * @param cx
     *                the x coordinate of the center.
     * @param cy
     *                the y coordinate of the center.
     * @param a
     *                The lenght from the center to the vertex.
     * @param fill
     *                The collor of the triangle.
     */
    set : function(cx, cy, a, fill) {
	this.name = 'triangle';

	this.x = cx || 0;
	this.y = cy || 0;
	this.a = a || 10;
	this.fill = fill || "#000000";
	this.defineBB();
    },
    /**
     * Draws the triangle of the contex.
     * 
     * @param ctx
     *                the contex we draw on.
     */
    draw : function(ctx) {
	this.determinePts();
	ctx.strokeStyle = this.fill;
	ctx.beginPath();
	ctx.moveTo(this.x1, this.y1);
	ctx.lineTo(this.x2, this.y2);
	ctx.lineTo(this.x3, this.y3);
	ctx.fillStyle = this.fill;
	ctx.closePath();
	ctx.stroke();
    },
    /**
     * Checks if the given point is inside this triangle.
     * 
     * @param mx
     *                the mouse x coordinate.
     * @param my
     *                the mouse y coordinate.
     * @returns {Boolean} true if its inside else false.
     */
    contains : function(mx, my) {
	this.defineBB();
	var b1 = crossProd(mx, my, this.x1, this.y1, this.x2, this.y2) < 0;
	var b2 = crossProd(mx, my, this.x2, this.y2, this.x3, this.y3) < 0;
	var b3 = crossProd(mx, my, this.x3, this.y3, this.x1, this.y1) < 0;

	return ((b1 === b2) && (b2 === b3));
    },
    /**
     * Moves the triangle to the new coordinates.
     * 
     * @param nx
     *                the new x coordinate.
     * @param ny
     *                the new y coordinate.
     */
    move : function(nx, ny) {
	this.x = nx;
	this.y = ny;
	this.defineBB();
    },
    resize : function(knob) {
	// Will not be implemented.
    },
    /**
     * Returns the points of this triangle.
     * 
     * @returns {Array} the points.
     */
    getPoints : function() {
	this.determinePts();
	var x1 = this.x1;
	var x2 = this.x2;
	var x3 = this.x3;
	var y1 = this.y1;
	var y2 = this.y2;
	var y3 = this.y3;

	var p1 = new Point(x1, y1);
	var p2 = new Point(x2, y2);
	var p3 = new Point(x3, y3);

	var array = [];
	array.push(p1);
	array.push(p2);
	array.push(p3);

	return array;
    },
    /**
     * Determins the freepoints of this triangle.
     * 
     * @param p
     * @param nx
     *                x coordinate.
     * @param ny
     *                y coordinate.
     */
    freepoint : function(p, nx, ny) {
	var x = p.point.x;
	var y = p.point.y;
	var cx = this.x;
	var cy = this.y;

	var a = Math.sqrt(Math.pow(nx - cx, 2) + Math.pow(ny - cy, 2));

	this.a = a;
	this.determinePts();
    },
    /**
     * Rotates the triangle for a specific point.
     * 
     * @param p
     *                the point we rotate to.
     */
    rotate : function(p) {
	var nx = p.x;
	var ny = p.y;
	var cx = this.bbx + this.bbw / 2;
	var cy = this.bby + this.bbh / 2;
	var dx = nx - cx;
	var dy = ny - cy;

	var nang = Math.atan2(-dy, dx);

	if (ctrlIsDown) {
	    nang = Math.round(nang / (Math.PI / 6)) * (Math.PI / 6);
	}

	this.angle = nang;
    }
}
function crossProd(p1x, p1y, p2x, p2y, p3x, p3y) {
    return (p1x - p3x) * (p2y - p3y) - (p2x - p3x) * (p1y - p3y);
}

function Free(obj) {
    for (prop in obj) {
	this[prop] = obj[prop];
    }
}
/**
 * --------------Free drawing------------
 */
Free.prototype = {
    // The name of this shape.
    name : 'free',
    // Resizable flag.
    resizable : true,
    // Selectable flag.
    selectable : true,
    // Id on the canvas.
    id : global_id++,
    // Points for drawing.
    points : [],
    // The angle of the shape.
    angle : Math.PI / 2,
    fill : '#000',
    /**
     * Sets the points to this shape.
     * 
     * @param points
     *                the points of the shape.
     */
    set : function(points) {
	this.name = 'free';
	this.points = points;
	this.defineBB();
    },
    /**
     * Draws the figure on the canvas like a line strip.
     * 
     * @param ctx
     *                the contex /canvas.
     */
    draw : function(ctx) {
	var pointsForDrawing = this.points;
	if (pointsForDrawing.length == 0) {
	    return;
	}
	ctx.strokeStyle = this.fill;
	ctx.lineWidth = 2;
	ctx.beginPath();
	ctx.moveTo(pointsForDrawing[0].x, pointsForDrawing[0].y);
	for (var i = 0; i < pointsForDrawing.length; i++) {
	    ctx.lineTo(pointsForDrawing[i].x, pointsForDrawing[i].y);
	}
	ctx.moveTo(pointsForDrawing[0].x, pointsForDrawing[0].y);
	ctx.closePath();
	ctx.stroke();
    },
    /**
     * Checks if the given coordinate is inside the bounding box of this shape.
     * 
     * @param mx
     *                the x coordinate.
     * @param my
     *                the y coordinate.
     * @returns {Boolean} true if its inside else false.
     */
    contains : function(mx, my) {
	return (this.bbx <= mx) && (this.bbx + this.bbw >= mx) && (this.bby <= my) && (this.bby + this.bbh >= my);
    },
    /**
     * Moves all the points to the new coordinates.
     * 
     * @param nx
     *                the new x coordinate.
     * @param ny
     *                the new y coordinate.
     */
    move : function(nx, ny) {
	var xdiff = nx - this.x;
	var ydiff = ny - this.y;
	var ppoints = this.points;
	for (plf = 0; plf < ppoints.length; plf++) {
	    ppoints[plf].x += xdiff;
	    ppoints[plf].y += ydiff;
	}
	this.x = nx;
	this.y = ny;
	this.bbx = nx;
	this.bby = ny;
    },
    /**
     * Resizes the shape.
     * 
     * @param knob
     *                the know we resize with.
     */
    resize : function(knob) {
	var nx = knob.x + knob.w / 2;
	var ny = knob.y + knob.h / 2;
	var resizedPoints = [];
	var k = 0;
	var points = this.points;
	switch (knob.id) {
	case "UL":

	    var xdiff = nx - this.bbx;
	    var ydiff = ny - this.bby;
	    for (k = 0; k < points.length; k++) {
		var x = points[k].x + Math.round((this.bbw + this.bbx - points[k].x) / this.bbw * xdiff);
		var y = points[k].y + Math.round((this.bbh + this.bby - points[k].y) / this.bbh * ydiff);
		var p = new Point(x, y);
		resizedPoints.push(p);
	    }
	    this.set(resizedPoints);
	    break;
	case "LR":

	    var xdiff = nx - (this.bbx + this.bbw);
	    var ydiff = ny - (this.bby + this.bbh);
	    for (k = 0; k < points.length; k++) {
		var x = points[k].x + Math.round(((points[k].x - this.bbx) / this.bbw * xdiff));
		var y = points[k].y + Math.round(((points[k].y - this.bby) / this.bbh * ydiff));
		var p = new Point(x, y);
		resizedPoints.push(p);
	    }
	    this.set(resizedPoints);
	    break;

	case "LL":
	    var xdiff = nx - this.bbx;
	    var ydiff = ny - (this.bby + this.bbh);
	    for (k = 0; k < points.length; k++) {
		var x = points[k].x + Math.round((this.bbw + this.bbx - points[k].x) / this.bbw * xdiff);
		var y = points[k].y + Math.round((points[k].y - this.bby) / this.bbh * ydiff);
		var p = new Point(x, y);
		resizedPoints.push(p);
	    }
	    this.set(resizedPoints);
	    break;
	case "UR":
	    var xdiff = nx - (this.bbx + this.bbw);
	    var ydiff = ny - this.bby;
	    for (k = 0; k < points.length; k++) {
		var x = points[k].x + Math.round((points[k].x - this.bbx) / this.bbw * xdiff);
		var y = points[k].y + Math.round((this.bbh + this.bby - points[k].y) / this.bbh * ydiff);
		var p = new Point(x, y);
		resizedPoints.push(p);
	    }
	    this.set(resizedPoints);
	    break;
	}
    },

    getPoints : function() {
	return [];
    },
    /**
     * Defines the bounding box for this shape.
     */
    defineBB : function() {
	if (this.points === undefined || this.points.length === 0) {
	    return;
	}
	var points = this.points;
	var minx = points[0].x;
	var miny = points[0].y;
	var maxx = points[0].x;
	var maxy = points[0].y;
	for (i = 1; i < points.length; i++) {
	    if (minx > points[i].x) {
		minx = points[i].x;
	    }
	    if (maxx < points[i].x) {
		maxx = points[i].x;
	    }
	    if (miny > points[i].y) {
		miny = points[i].y;
	    }
	    if (maxy < points[i].y) {
		maxy = points[i].y;
	    }
	}
	this.bbx = Math.round(minx);
	this.bby = Math.round(miny);
	this.bbw = Math.round(maxx - minx);
	this.bbh = Math.round(maxy - miny);
	this.x = this.bbx + this.bbw / 2;
	this.y = this.bby + this.bbh / 2;
    },

    /**
     * Rotates for a specific angle.
     * 
     * @param p
     *                the point we rotate for.
     */
    rotate : function(p) {
	var nx = p.x;
	var ny = p.y;
	var cx = this.bbx + this.bbw / 2;
	var cy = this.bby + this.bbh / 2;
	var dx = nx - cx;
	var dy = ny - cy;

	var nang = Math.atan2(-dy, dx);

	if (ctrlIsDown) {
	    nang = Math.round(nang / (Math.PI / 4)) * (Math.PI / 4);
	}

	var dang = nang - this.angle;

	for (var i = 0; i < this.points.length; i++) {
	    var point = this.points[i];
	    var px = point.x;
	    var py = point.y;
	    var pang = Math.atan2(-(py - cy), px - cx);
	    var r = Math.sqrt(Math.pow(px - cx, 2) + Math.pow(py - cy, 2));
	    var pnx = cx + r * Math.cos(pang + dang);
	    var pny = cy - r * Math.sin(pang + dang);
	    point.x = pnx;
	    point.y = pny;
	}

	this.angle = nang;
    }
}
/**
 * ---------------Circle------------------
 */
function Circle(obj) {
    for (prop in obj) {
	this[prop] = obj[prop];
    }
}

Circle.prototype = {
    // The resizable flag.
    resizable : false,
    // The selectable flag.
    selectable : true,
    // The shape name.
    name : 'circle',
    // The global id.
    id : global_id++,
    // The x coordinate.
    x : 0,
    // The y coordinate.
    y : 0,
    // The bounding box parameters.
    bbx : 0,
    bby : 0,
    bbh : 0,
    bbw : 0,
    // The angle.
    angle : Math.PI / 2,
    fill : '#000',
    /**
     * Sets the bacis atributes of this circle.
     * 
     * @param x
     *                the x coordinate.
     * @param y
     *                the y coordinate.
     * @param r
     *                the radius.
     * @param fill
     *                the color.
     */
    set : function(x, y, r, fill) {
	this.name = "circle", this.x = x || 0;
	this.y = y || 0;
	this.r = r || 0;
	this.r = Math.round(this.r);
	this.bbx = this.x - this.r;
	this.bby = this.y - this.r;
	this.bbw = 2 * this.r;
	this.bbh = 2 * this.r;
	this.fill = fill || "#000000";
    },
    /**
     * Draws the circle on the contex.
     * 
     * @param ctx
     *                the contex we draw on.
     */
    draw : function(ctx) {
	ctx.strokeStyle = this.fill;
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
	ctx.closePath();
	if (this.hasOwnProperty('freepoint')) {
	    ctx.fillStyle = this.fill;
	    ctx.fill();
	}
	ctx.stroke();
    },
    /**
     * Moves the circle to the new point.
     * 
     * @param nx
     *                the new x coordinate.
     * @param ny
     *                the new y coordinate.
     */
    move : function(nx, ny) {
	this.x = nx;
	this.y = ny;
	this.bbx = this.x - this.r;
	this.bby = this.y - this.r;

    },
    /**
     * Checks if the given coordinate are inside this circle.
     * 
     * @param mx
     *                the x coordinate.
     * @param my
     *                the y coordinate.
     * @returns {Boolean} true if its inside , false else.
     */
    contains : function(mx, my) {
	return (this.r >= Math.sqrt(Math.pow((mx - this.x), 2) + Math.pow((my - this.y), 2)));
    },
    resize : function(knob) {
	// Will not be implemented.
    },
    /**
     * The free point function.
     * 
     * @param p
     * @param nx
     * @param ny
     */
    freepoint : function(p, nx, ny) {
	var nr = Math.sqrt(Math.pow(this.x - nx, 2) + Math.pow(this.y - ny, 2));
	this.r = nr;
	this.set(this.x, this.y, this.r, this.fill);
    },
    /**
     * Returns the points for this shape.
     * 
     * @returns {Array}
     */
    getPoints : function() {
	var x = this.x;
	var y = this.y - this.r;
	var p = new Point(x, y);
	var points = [];
	points.push(p);
	return points;
    },
    defineBB : function() {

    },
    rotate : function(p) {

    }
}
/**
 * ---------------Polygon ---------------
 */
function Polygon(obj) {
    for (prop in obj) {
	this[prop] = obj[prop];
    }
}

Polygon.prototype = {
    // Resizable flag.
    resizable : true,
    // Selectable flag.
    selectable : true,
    // The shape name.
    name : 'polygon',
    // The shape id on the contex.
    id : global_id++,
    // Points for drawing.
    points : [],
    // The angle of the shape.
    angle : Math.PI / 2,

    fill : '#000',
    /**
     * Defines the bounding box for the shape.
     */
    defineBB : function() {
	if (this.points == undefined) {
	    return;
	}
	var points = this.points;
	var minx = points[0].x;
	var miny = points[0].y;
	var maxx = points[0].x;
	var maxy = points[0].y;
	for (i = 1; i < points.length; i++) {
	    if (minx > points[i].x) {
		minx = points[i].x;
	    }
	    if (maxx < points[i].x) {
		maxx = points[i].x;
	    }
	    if (miny > points[i].y) {
		miny = points[i].y;
	    }
	    if (maxy < points[i].y) {
		maxy = points[i].y;
	    }
	}
	this.bbx = Math.round(minx);
	this.bby = Math.round(miny);
	this.bbw = Math.round(maxx - minx);
	this.bbh = Math.round(maxy - miny);
	this.x = this.bbx + this.bbw / 2;
	this.y = this.bby + this.bbh / 2;
    },
    /**
     * Sets the points of the polygon.
     * 
     * @param points
     *                the points.
     */
    set : function(points) {
	this.name = 'polygon';

	this.points = points;
	this.defineBB();
    },
    /**
     * Draws the polygon on the contex.
     * 
     * @param ctx
     *                the contex we draw on.
     */
    draw : function(ctx) {
	var pointsForDrawing = this.points;
	ctx.strokeStyle = this.fill;
	ctx.beginPath();
	ctx.moveTo(pointsForDrawing[0].x, pointsForDrawing[0].y);
	for (i = 1; i < pointsForDrawing.length; i++) {
	    ctx.lineTo(pointsForDrawing[i].x, pointsForDrawing[i].y);
	}
	ctx.closePath();
	pointsForDrawing = [];
	ctx.stroke();
    },
    /**
     * Moves the points to the new coordinates.
     * 
     * @param nx
     *                the new x coordinate.
     * @param ny
     *                the new y coordinate.
     */
    move : function(nx, ny) {
	var points = this.points;
	var xdiff = nx - this.x;
	var ydiff = ny - this.y;
	this.x = nx;
	this.y = ny;
	for (i = 0; i < points.length; i++) {
	    points[i].x += xdiff;
	    points[i].y += ydiff;
	}
	this.bbx = nx;
	this.bby = ny;
    },
    /**
     * Checks if the given coordinates are inside the bounding box.
     * 
     * @param mx
     *                the given x coordinate.
     * @param my
     *                the given y coordinate.
     * @returns {Boolean}
     */
    contains : function(mx, my) {
	return (this.bbx <= mx) && (this.bbx + this.bbw >= mx) && (this.bby <= my) && (this.bby + this.bbh >= my);
    },
    /**
     * Resizes the polygon by the given knob.
     * 
     * @param knob
     *                the know we used for resizing.
     */
    resize : function(knob) {
	var nx = knob.x + knob.w / 2;
	var ny = knob.y + knob.h / 2;
	var resizedPoints = [];
	var k = 0;
	var points = this.points;
	switch (knob.id) {
	case "UL":

	    var xdiff = nx - this.bbx;
	    var ydiff = ny - this.bby;
	    for (k = 0; k < points.length; k++) {
		var x = points[k].x + Math.round((this.bbw + this.bbx - points[k].x) / this.bbw * xdiff);
		var y = points[k].y + Math.round((this.bbh + this.bby - points[k].y) / this.bbh * ydiff);
		var p = new Point(x, y);
		resizedPoints.push(p);
	    }
	    this.set(resizedPoints);
	    break;
	case "LR":

	    var xdiff = nx - (this.bbx + this.bbw);
	    var ydiff = ny - (this.bby + this.bbh);
	    for (k = 0; k < points.length; k++) {
		var x = points[k].x + Math.round(((points[k].x - this.bbx) / this.bbw * xdiff));
		var y = points[k].y + Math.round(((points[k].y - this.bby) / this.bbh * ydiff));
		var p = new Point(x, y);
		resizedPoints.push(p);
	    }
	    this.set(resizedPoints);
	    break;

	case "LL":
	    var xdiff = nx - this.bbx;
	    var ydiff = ny - (this.bby + this.bbh);
	    for (k = 0; k < points.length; k++) {
		var x = points[k].x + Math.round((this.bbw + this.bbx - points[k].x) / this.bbw * xdiff);
		var y = points[k].y + Math.round((points[k].y - this.bby) / this.bbh * ydiff);
		var p = new Point(x, y);
		resizedPoints.push(p);
	    }
	    this.set(resizedPoints);
	    break;
	case "UR":
	    var xdiff = nx - (this.bbx + this.bbw);
	    var ydiff = ny - this.bby;
	    for (k = 0; k < points.length; k++) {
		var x = points[k].x + Math.round((points[k].x - this.bbx) / this.bbw * xdiff);
		var y = points[k].y + Math.round((this.bbh + this.bby - points[k].y) / this.bbh * ydiff);
		var p = new Point(x, y);
		resizedPoints.push(p);
	    }
	    this.set(resizedPoints);
	    break;
	}
    },
    /**
     * The freepoint Function.
     * 
     * @param p
     * @param nx
     * @param ny
     */
    freepoint : function(p, nx, ny) {
	p.point.x = nx;
	p.point.y = ny;
	this.set(this.points);
    },
    /**
     * Gets the points of the polygon.
     * 
     * @returns {Array} the polygon points.
     */
    getPoints : function() {
	return this.points;
    },
    /**
     * Rotates the polygon for a specific point.
     * 
     * @param p
     *                the point that was rotatetd.
     */
    rotate : function(p) {
	var nx = p.x;
	var ny = p.y;
	var cx = this.bbx + this.bbw / 2;
	var cy = this.bby + this.bbh / 2;
	var dx = nx - cx;
	var dy = ny - cy;

	var nang = Math.atan2(-dy, dx);

	if (ctrlIsDown) {
	    nang = Math.round(nang / (Math.PI / 4)) * (Math.PI / 4);
	}

	var dang = nang - this.angle;

	for (var i = 0; i < this.points.length; i++) {
	    var point = this.points[i];
	    var px = point.x;
	    var py = point.y;
	    var pang = Math.atan2(-(py - cy), px - cx);
	    var r = Math.sqrt(Math.pow(px - cx, 2) + Math.pow(py - cy, 2));
	    var pnx = cx + r * Math.cos(pang + dang);
	    var pny = cy - r * Math.sin(pang + dang);
	    point.x = pnx;
	    point.y = pny;
	}

	this.angle = nang;
    }
}
/**
 * The Point ( x, y ) used for coordinates.
 */
function Point(x, y) {
    this.x = x;
    this.y = y;
}

Point.prototype = {
    x : 0,
    y : 0
}

/**
 * ---------------Rectangle ---------------
 */
function Rectangle(obj) {
    for (prop in obj) {
	this[prop] = obj[prop];
    }
}

Rectangle.prototype = {
    // The resizable flag.
    resizable : false,
    // The selectable flag.
    selectable : true,
    // The name of this shape.
    name : 'rectangle',
    // The id on the contex.
    id : global_id++,
    // The x coordinate.
    x : 0,
    // The y coordinate.
    y : 0,
    // The height.
    h : 0,
    // The width.
    w : 0,
    // The boudning box parameters.
    bbx : 0,
    bby : 0,
    bbh : 0,
    bbw : 0,
    // Points for drawing.
    points : [],
    // The angle of this shape.
    angle : Math.PI / 2,
    // The color of the shape.
    fill : '#000',
    /**
     * Sets the basic atributes of the shape.
     * 
     * @param x
     *                the x coordinate.
     * @param y
     *                the y coordinate.
     * @param w
     *                the width.
     * @param h
     *                the height.
     * @param fill
     *                the color.
     */
    set : function(x, y, w, h, fill) {
	this.name = 'rectangle';

	this.x = x + w / 2;
	this.y = y + h / 2;
	this.w = Math.abs(w / 2);
	this.h = Math.abs(h / 2);
	this.fill = fill;
	this.angle = Math.PI / 2;

	this.definePoints();
	this.defineBB();
    },
    /**
     * Draws the shape on the contex.
     * 
     * @param ctx
     *                the contex.
     */
    draw : function(ctx) {
	this.definePoints();
	ctx.strokeStyle = this.fill;
	var pointsForDrawing = this.points;
	ctx.beginPath();
	ctx.moveTo(pointsForDrawing[0].x, pointsForDrawing[0].y);
	for (i = 1; i < pointsForDrawing.length; i++) {
	    ctx.lineTo(pointsForDrawing[i].x, pointsForDrawing[i].y);
	}
	ctx.closePath();
	ctx.stroke();
	if (this.name !== 'rectangle') {
	    ctx.fillStyle = '#fff';
	    ctx.fill();
	}
    },
    /**
     * Moves the shape to the new coordinates.
     * 
     * @param nx
     *                the new x coordinate.
     * @param ny
     *                the new y coordinate.
     */
    move : function(nx, ny) {
	this.x = nx;
	this.y = ny;
	this.definePoints();
	this.defineBB();
    },
    /**
     * Checks if the given point is inside the shape.
     * 
     * @param mx
     *                the given x coordinate.
     * @param my
     *                the given y coordinate.
     * @returns {Boolean} true if its inside, false else.
     */
    contains : function(mx, my) {
	return (this.bbx <= mx) && (this.bbx + this.bbw >= mx) && (this.bby <= my) && (this.bby + this.bbh >= my);
    },
    resize : function(knob) {
	// INTENTIONALLY LEFT UNIMPLEMENTED
    },
    /**
     * Defines the points for drawing.
     */
    definePoints : function() {
	var angle = this.angle;
	var cx = this.x;
	var cy = this.y;
	var w = this.w;
	var h = this.h;
	var r = Math.sqrt(Math.pow(w, 2) + Math.pow(h, 2));
	var offset1 = Math.asin(w / r);
	var offset2 = Math.asin(h / r);

	var x1 = cx + r * Math.cos(offset1 + angle);
	var y1 = cy - r * Math.sin(offset1 + angle);
	var x2 = cx + r * Math.cos(offset2 + angle + Math.PI / 2);
	var y2 = cy - r * Math.sin(offset2 + angle + Math.PI / 2);
	var x3 = cx + r * Math.cos(offset1 + angle + Math.PI);
	var y3 = cy - r * Math.sin(offset1 + angle + Math.PI);
	var x4 = cx + r * Math.cos(offset2 + angle + 3 * Math.PI / 2);
	var y4 = cy - r * Math.sin(offset2 + angle + 3 * Math.PI / 2);

	this.points[0] = new Point(Math.round(x1), Math.round(y1));
	this.points[1] = new Point(Math.round(x2), Math.round(y2));
	this.points[2] = new Point(Math.round(x3), Math.round(y3));
	this.points[3] = new Point(Math.round(x4), Math.round(y4));
    },
    /**
     * Returns the points as an array.
     * 
     * @returns {Array}
     */
    getPoints : function() {
	var wx = this.x + this.w * Math.cos(this.angle + Math.PI / 2);
	var wy = this.y - this.w * Math.sin(this.angle + Math.PI / 2);
	var wPoint = new Point(wx, wy);
	wPoint.dim = 'w';

	var hx = this.x + this.h * Math.cos(this.angle);
	var hy = this.y - this.h * Math.sin(this.angle);
	var hPoint = new Point(hx, hy);
	hPoint.dim = 'h';

	var array = [];
	array.push(wPoint);
	array.push(hPoint);
	return array;
    },
    /**
     * Defines the bounding box for the shape.
     */
    defineBB : function() {
	var points = this.points;
	var minx = points[0].x;
	var miny = points[0].y;
	var maxx = points[0].x;
	var maxy = points[0].y;
	for (i = 1; i < 4; i++) {
	    if (minx > points[i].x) {
		minx = points[i].x;
	    }
	    if (maxx < points[i].x) {
		maxx = points[i].x;
	    }
	    if (miny > points[i].y) {
		miny = points[i].y;
	    }
	    if (maxy < points[i].y) {
		maxy = points[i].y;
	    }
	}

	this.bbx = Math.round(minx);
	this.bby = Math.round(miny);
	this.bbw = Math.round(maxx - minx);
	this.bbh = Math.round(maxy - miny);
    },
    /**
     * Rotates the shape for a specific angle.
     * 
     * @param p
     *                the point that was rotated.
     */
    rotate : function(p) {
	var nx = p.x;
	var ny = p.y;
	var cx = this.x;
	var cy = this.y;
	var dx = nx - cx;
	var dy = ny - cy;

	var nang = Math.atan2(-dy, dx);
	if (ctrlIsDown) {
	    nang = Math.round(nang / (Math.PI / 4)) * (Math.PI / 4);
	}
	this.angle = nang;
	this.definePoints();
	this.defineBB();
    },
    /**
     * The freepoint function.
     * 
     * @param p
     * @param nx
     * @param ny
     */
    freepoint : function(p, nx, ny) {
	var r = Math.sqrt(Math.pow(this.x - nx, 2) + Math.pow(this.y - ny, 2));
	var point = p.point;
	var dx = nx - point.x;
	var dy = ny - point.y;
	switch (point.dim) {
	case 'w':
	    this.w = r;
	    break;
	case 'h':
	    this.h = r;
	    break;
	}
	point.x = nx;
	point.y = ny;
    }
}
/**
 * ---------------Square ---------------
 */
function Square(obj) {
    for (prop in obj) {
	this[prop] = obj[prop];
    }
}

Square.prototype = {
    // The resizable flag.
    resizable : false,
    // The selectable flag.
    selectable : true,
    // The shape name.
    name : 'square',
    // The shape id.
    id : global_id++,
    // the x coordinate.
    x : 0,
    // the y coordintae.
    y : 0,
    // The lenght.
    a : 0,
    // Bounding box parameters.
    bbx : 0,
    bby : 0,
    bbh : 0,
    bbw : 0,
    // The points for drawing.
    points : [],
    // The angle of the shape.
    angle : Math.PI / 2,
    // The color of the shape.
    fill : '#000',
    /**
     * Sets the basic parameters for the square.
     * 
     * @param x
     *                the x coordinate of the square.
     * @param y
     *                the y coordinate of the square.
     * @param a
     *                the lenght.
     * @param fill
     *                the color of the shape.
     */
    set : function(x, y, a, fill) {
	this.name = 'square';

	this.x = x + a / 2;
	this.y = y + a / 2;
	this.a = a;
	this.fill = fill;
	this.angle = Math.PI / 2;

	this.defineBB();
    },
    /**
     * The function which draws the shape on the contex.
     * 
     * @param ctx
     *                the contex we draw on.
     */
    draw : function(ctx) {
	this.definePoints();
	ctx.strokeStyle = this.fill;
	var pointsForDrawing = this.points;
	ctx.beginPath();
	ctx.moveTo(pointsForDrawing[0].x, pointsForDrawing[0].y);
	for (i = 1; i < pointsForDrawing.length; i++) {
	    ctx.lineTo(pointsForDrawing[i].x, pointsForDrawing[i].y);
	}
	ctx.closePath();
	ctx.stroke();
    },
    /**
     * Move the shape to the new location.
     * 
     * @param nx
     *                the new x coordinate.
     * @param ny
     *                the new y coordinate.
     */
    move : function(nx, ny) {
	this.x = nx;
	this.y = ny;
	this.defineBB();
    },
    /**
     * Checks if the given point is inside the shape.
     * 
     * @param mx
     *                the x coordinate of the point.
     * @param my
     *                the y coordinate of the point.
     * @returns {Boolean} true if its inside, else false.
     */
    contains : function(mx, my) {
	return (this.bbx <= mx) && (this.bbx + this.bbw >= mx) && (this.bby <= my) && (this.bby + this.bbh >= my);
    },

    resize : function(knob) {
	// INTENTIONALLY LEFT UNIMPLEMENTED
    },
    /**
     * Defines the points we use for drawing.
     */
    definePoints : function() {
	var angle = this.angle;
	var cx = this.x;
	var cy = this.y;
	var a = this.a;
	var r = a * Math.SQRT1_2;
	var offset = Math.PI / 4;

	var x1 = cx + r * Math.cos(offset + angle);
	var y1 = cy - r * Math.sin(offset + angle);
	var x2 = cx + r * Math.cos(offset + angle + Math.PI / 2);
	var y2 = cy - r * Math.sin(offset + angle + Math.PI / 2);
	var x3 = cx + r * Math.cos(offset + angle + Math.PI);
	var y3 = cy - r * Math.sin(offset + angle + Math.PI);
	var x4 = cx + r * Math.cos(offset + angle + 3 * Math.PI / 2);
	var y4 = cy - r * Math.sin(offset + angle + 3 * Math.PI / 2);

	this.points[0] = new Point(Math.round(x1), Math.round(y1));
	this.points[1] = new Point(Math.round(x2), Math.round(y2));
	this.points[2] = new Point(Math.round(x3), Math.round(y3));
	this.points[3] = new Point(Math.round(x4), Math.round(y4));
    },
    /**
     * Get the points of the shape.
     * 
     * @returns {Array} the points of the shape.
     */
    getPoints : function() {
	var x = this.x + this.a * Math.SQRT1_2 * Math.cos(this.angle - Math.PI / 4);
	var y = this.y - this.a * Math.SQRT1_2 * Math.sin(this.angle - Math.PI / 4);
	var point = new Point(x, y);

	var array = [];
	array.push(point);
	return array;
    },
    /**
     * Defines the bounding box of the shape.
     */
    defineBB : function() {
	this.definePoints();
	var points = this.points;
	var minx = points[0].x;
	var miny = points[0].y;
	var maxx = points[0].x;
	var maxy = points[0].y;
	for (i = 1; i < 4; i++) {
	    if (minx > points[i].x) {
		minx = points[i].x;
	    }
	    if (maxx < points[i].x) {
		maxx = points[i].x;
	    }
	    if (miny > points[i].y) {
		miny = points[i].y;
	    }
	    if (maxy < points[i].y) {
		maxy = points[i].y;
	    }
	}

	this.bbx = Math.round(minx);
	this.bby = Math.round(miny);
	this.bbw = Math.round(maxx - minx);
	this.bbh = Math.round(maxy - miny);
    },
    /**
     * Rotates the shape for a specific point.
     * 
     * @param p
     *                the point that we rotate for.
     */
    rotate : function(p) {
	var nx = p.x;
	var ny = p.y;
	var cx = this.x;
	var cy = this.y;
	var dx = nx - cx;
	var dy = ny - cy;

	var nang = Math.atan2(-dy, dx);
	if (ctrlIsDown) {
	    nang = Math.round(nang / (Math.PI / 4)) * (Math.PI / 4);
	}
	this.angle = nang;
	this.definePoints();
	this.defineBB();
    },
    /**
     * The free point function of the shape.
     * 
     * @param p
     * @param nx
     * @param ny
     */
    freepoint : function(p, nx, ny) {
	var r = Math.sqrt(Math.pow(this.x - nx, 2) + Math.pow(this.y - ny, 2));
	var point = p.point;
	this.a = r * Math.SQRT2;
	point.x = nx;
	point.y = ny;
    }
}

function Ellipse(obj) {
    for (prop in obj) {
	this[prop] = obj[prop];
    }
}
/**
 * -------------------Ellipse-------------------
 */
Ellipse.prototype = {
    // Resizable flag.
    resizable : false,
    // Selectable flag.
    selectable : true,
    // The name of the shape.
    name : 'sllipse',
    // The id of the shape.
    id : global_id++,
    // The x coordinate.
    x : 0,
    // The y coordinate.
    y : 0,
    // The a parameter of the ellipse.
    a : 0,
    // The b parameter of the ellipse.
    b : 0,
    // Bounding box parameters.
    bbx : 0,
    bby : 0,
    bbh : 0,
    bbw : 0,
    // Points of the ellipse.
    points : [],
    // Angle of the ellipse.
    angle : Math.PI / 2,
    // The color.
    fill : '#000',
    /**
     * Sets the basic parameters of the ellipse.
     * 
     * @param x
     *                the x coordinate.
     * @param y
     *                the y coordinate.
     * @param a
     *                the a parameter.
     * @param b
     *                the b parameter.
     * @param fill
     *                the color.
     */
    set : function(x, y, a, b, fill) {
	this.name = 'ellipse';

	this.x = x + a / 2;
	this.y = y + b / 2;
	this.a = a;
	this.b = b;
	this.fill = fill;
	this.angle = Math.PI / 2;

	this.definePoints();
	this.defineBB();
    },
    /**
     * Draws the ellipse on the contex.
     * 
     * @param ctx
     *                the contex we draw on
     */
    draw : function(ctx) {
	this.definePoints();
	ctx.strokeStyle = this.fill;
	var pointsForDrawing = this.points;
	ctx.beginPath();
	ctx.moveTo(pointsForDrawing[0].x, pointsForDrawing[0].y);
	for (i = 1; i < pointsForDrawing.length; i++) {
	    ctx.lineTo(pointsForDrawing[i].x, pointsForDrawing[i].y);
	}
	ctx.closePath();
	ctx.stroke();
    },
    /**
     * Moves the ellipse to a new point.
     * 
     * @param nx
     *                the new x coordinate.
     * @param ny
     *                the new y coordinate.
     */
    move : function(nx, ny) {
	this.x = nx;
	this.y = ny;
	this.definePoints();
	this.defineBB();
    },
    /**
     * Checks if the given point is inside the ellipse.
     * 
     * @param mx
     *                the x coordinate of the given point.
     * @param my
     *                the y coordinate of the given point.
     * @returns {Boolean} returns true if the point is inside, false else.
     */
    contains : function(mx, my) {
	return (this.bbx <= mx) && (this.bbx + this.bbw >= mx) && (this.bby <= my) && (this.bby + this.bbh >= my);
    },
    resize : function(knob) {
	// INTENTIONALLY LEFT UNIMPLEMENTED
    },
    /**
     * Defines the poins which we use for drawing.
     */
    definePoints : function() {
	var angle = this.angle - Math.PI / 2;
	var cx = this.x;
	var cy = this.y;
	var a = this.a;
	var b = this.b;
	this.points = [];
	for (var i = 0; i <= 2 * Math.PI; i += Math.PI / 50) {
	    var dx = a / 2 * Math.cos(i);
	    var dy = b / 2 * Math.sin(i);
	    var j = Math.atan2(-dy, dx);
	    var r = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
	    // ( ) ( )
	    // var x = cx + r * Math.cos(angle + i);
	    // var y = cy - r * Math.sin(angle + i);
	    var x = cx + r * Math.cos(angle + j);
	    var y = cy - r * Math.sin(angle + j);
	    var p = new Point(x, y);
	    this.points.push(p);
	}

    },
    /**
     * Returns the points of the ellipse.
     * 
     * @returns {Array}
     */
    getPoints : function() {
	var cx = this.x;
	var cy = this.y;
	var angle = this.angle;
	var a = this.a / 2;
	var b = this.b / 2;
	var offset = -Math.PI / 2;

	var p1 = new Point(cx + a * Math.cos(angle + offset), cy - a * Math.sin(angle + offset));
	var p2 = new Point(cx + b * Math.cos(angle + Math.PI / 2 + offset), cy - b
		* Math.sin(angle + Math.PI / 2 + offset));

	p1.dim = 'a';
	p2.dim = 'b';

	var points = [];
	points.push(p1);
	points.push(p2);
	return points;
    },
    /**
     * Defines the bounding box for the ellipse.
     */
    defineBB : function() {
	var points = this.points;
	var minx = points[0].x;
	var miny = points[0].y;
	var maxx = points[0].x;
	var maxy = points[0].y;
	for (i = 1; i < points.length; i++) {
	    if (minx > points[i].x) {
		minx = points[i].x;
	    }
	    if (maxx < points[i].x) {
		maxx = points[i].x;
	    }
	    if (miny > points[i].y) {
		miny = points[i].y;
	    }
	    if (maxy < points[i].y) {
		maxy = points[i].y;
	    }
	}

	this.bbx = Math.round(minx);
	this.bby = Math.round(miny);
	this.bbw = Math.round(maxx - minx);
	this.bbh = Math.round(maxy - miny);
    },
    /**
     * Rotates the ellipse for a point.
     * 
     * @param p
     *                the point we rotate for.
     */
    rotate : function(p) {
	var nx = p.x;
	var ny = p.y;
	var cx = this.x;
	var cy = this.y;
	var dx = nx - cx;
	var dy = ny - cy;

	var nang = Math.atan2(-dy, dx);
	if (ctrlIsDown) {
	    nang = Math.round(nang / (Math.PI / 4)) * (Math.PI / 4);
	}
	this.angle = nang;
	this.definePoints();
	this.defineBB();
    },
    /**
     * The free point function.
     * 
     * @param p
     * @param nx
     * @param ny
     */
    freepoint : function(p, nx, ny) {
	var cx = this.x;
	var cy = this.y;
	var r = Math.sqrt(Math.pow(nx - cx, 2) + Math.pow(ny - cy, 2));
	var point = p.point;
	switch (point.dim) {
	case 'a':
	    this.a = r * 2;
	    break;

	case 'b':
	    this.b = r * 2
	    break;
	}
	point.x = nx;
	point.y = ny;
    }
}