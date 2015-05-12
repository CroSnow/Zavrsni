function Line(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
};

Line.prototype = {
	
    next: null,
    
    prev: null,
	
    color : '#000',

    draw : function(ctx) {
	var x1 = this.p1.cx;
	var y1 = this.p1.cy;
	var x2 = this.p2.cx;
	var y2 = this.p2.cy;

	ctx.beginPath();
	ctx.strokeStyle = this.color;
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.closePath();
	ctx.stroke();
    },
    
    setPoint : function(p) {
	this.p2 = p;
    }

};

function LinePoint(x, y) {
    this.cx = x;
    this.cy = y;
};

LinePoint.prototype = {
	
    joined : false,

    move : function(nx, ny) {
	this.cx = nx;
	this.cy = ny;
    }

};