function Component(figuresJSON) {

    this.figures = [];

    var objects = JSON.parse(figuresJSON);
    for (var i = 0; i < objects.length; i++) {
	var figure = objects[i];
	var o;
	switch (figure.name) {
	case "rectangle":
	    o = new Rectangle(figure);
	    break;
	case "circle":
	    o = new Circle(figure);
	    break;
	case "triangle":
	    o = new Triangle(figure);
	    break;
	case "polygon":
	    o = new Polygon(figure);
	    break;
	case "free":
	    o = new Free(figure);
	    break;
	case "square":
	    o = new Square(figure);
	    break;
	case "ellipse":
	    o = new Ellipse(figure);
	    break;
	case "pin":
	    o = new Pin(figure);
	    break;
	default:
	    alert(figure.name + " not expected!");
	}
	this.figures.push(o);
    }

    var center = this.calcCenter();

    this.cx = center.cx;
    this.cy = center.cy;

    this.offsets = this.calcFiguresOffsets();
    
    this.bbx = this.figures[0].bbx || 15000;
    this.bby = this.figures[0].bby || 15000;
    this.bbw = this.figures[0].bbw || 0;
    this.bbh = this.figures[0].bbh || 0;
    
    this.defineBB();

}

Component.prototype.draw = function(ctx, color) {
    var figs = this.figures;
    var color = color || '#F00';
    ctx.fillStyle = color;
    for (var i = 0; i < figs.length; i++) {
	figs[i].draw(ctx);
    }
}

Component.prototype.setCenter = function(cx, cy) {
    this.cx = cx;
    this.cy = cy;

    var figures = this.figures;
    var offsets = this.offsets;

    for (var i = 0; i < figures.length; i++) {
	var nx = cx + offsets[i].ox;
	var ny = cy + offsets[i].oy;

	figures[i].move(nx, ny);
    }
}

Component.prototype.setColor = function(color) {
    var figs = this.figures;
    for (var i = 0; i < figs.length; i++) {
	figs[i].fill = color;
    }
}

Component.prototype.resetColor = function() {
    this.setColor('#000');
}


Component.prototype.calcCenter = function() {
    var figures = this.figures;
    var minx = figures[0].bbx;
    var miny = figures[0].bby;
    var maxx = figures[0].bbx + figures[0].bbw;
    var maxy = figures[0].bby + figures[0].bbh;
    for (var i = 0; i < figures.length; i++) {
	var fig = figures[i];

	if (minx > fig.bbx) {
	    minx = fig.bbx;
	}
	if (miny > fig.bby) {
	    miny = fig.bby;
	}
	if (maxx < fig.bbx + fig.bbw) {
	    maxx = fig.bbx + fig.bbw;
	}
	if (maxy < fig.bby + fig.bbh) {
	    maxy = fig.bby + fig.bbh;
	}
    }

    var pad = 10;

    var cWidth = 750;
    var cHeight = 500;

    minx - pad >= 0 ? minx -= pad : 0;
    miny - pad >= 0 ? miny -= pad : 0;
    maxx + pad <= cWidth ? maxx += pad : cWidth;
    maxy + pad <= cHeight ? maxy += pad : cHeight;

    var x = minx;
    var y = miny;
    var w = maxx - minx;
    var h = maxy - miny;

    return {
	cx : x + w / 2,
	cy : y + h / 2
    };
}

Component.prototype.calcFiguresOffsets = function() {
    var cx = this.cx;
    var cy = this.cy;
    var figures = this.figures;

    var offsets = [];

    for (var i = 0; i < figures.length; i++) {
	var fig = figures[i];
	var c = getCenter(fig);
	offsets.push({
	    ox : c.cx - cx,
	    oy : c.cy - cy
	});
    }

    return offsets;
}

Component.prototype.defineBB = function() {

    var figures = this.figures;
    
    this.bbx = figures[0].bbx;
    this.bby = figures[0].bby;
    this.bbw = figures[0].bbw;
    this.bbh = figures[0].bbh;
    
    for (var i = 1; i < figures.length; i++) {
	var fig = figures[i];
	fig.defineBB();
	
	var fmaxx = fig.bbx + fig.bbw;
	var fmaxy = fig.bby + fig.bbh;
	var maxx = this.bbx + this.bbw;
	var maxy = this.bby + this.bbh;
	
	this.bbx = Math.min(this.bbx, fig.bbx);
	this.bby = Math.min(this.bby, fig.bby);
	
	if (maxx < fmaxx) {
	    this.bbw = fmaxx - this.bbx;
	}
	
	if (maxy < fmaxy) {
	    this.bbh = fmaxy - this.bby;
	}
	
    }
}

Component.prototype.contains = function(mouse) {
    var mx = mouse.x;
    var my = mouse.y;
    this.defineBB();
    
    var minx = this.bbx;
    var miny = this.bby
    var maxx = this.bbx + this.bbw;
    var maxy = this.bby + this.bbh;
    
    return minx <= mx && mx <= maxx && miny <= my && my <= maxy;
}

function getCenter(figure) {
    figure.defineBB();
    var x = figure.x;
    var y = figure.y;
    return {
	cx : x,
	cy : y
    };
}

function getComponentPins(component) {    
    var pins = [];
    var figures = component.figures;
    for (var i = 0; i < figures.length; i++) {
	if (figures[i].name === 'pin') {
	    pins.push(figures[i]);
	}
    }
    return pins;
}

function componentClicked(id) {
    var xmlhttp;
    if (window.XMLHttpRequest) {
	// code for IE7+, Firefox, Chrome, Opera, Safari
	xmlhttp = new XMLHttpRequest();
    } else {
	// code for IE6, IE5
	xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function() {
	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	    var data = xmlhttp.responseText;
	    var component = new Component(data);
	    component.setCenter(-1000, -1000);
	    component.setColor('#888');
	    s.setTempComponent(component);
	}
    }

    xmlhttp.open("POST", "component", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("id=" + id);
}
