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

    var s = new CanvasState(document.getElementById('componentC'));
    var pressed = false;
    var pressedFree = false;
    document.getElementById("rectangle").onclick = function() {
        s.postSelection = null;
        s.valid = false;
        if (pressed) {
            s.canvas.removeEventListener('mousemove', mouseMove2);
            s.canvas.removeEventListener('mousedown', mouseClick2);
        }
        if (pressedFree) {
            s.canvas.removeEventListener('mouseup', mouseUp2);
            s.canvas.removeEventListener('mousemove', mouseMove2);
            s.canvas.removeEventListener('mousedown', mouseDown2);
        }
        s.setTemporary(null);
        var r = new Rectangle();
        var down = false;
        var sndPoint = false;
        var p1 = null;
        var p2 = null;
        mouseClick2 = function(e) {
            var mouse = s.getMouse(e);
            var p = new Point(mouse.x, mouse.y);

            if (sndPoint) {
                p2 = p;

                var rect = new Rectangle();
                var x = p1.x;
                var y = p1.y;
                var w = p2.x - p1.x;
                var h = p2.y - p1.y;
                rect.set(x, y, w, h, '#000');
                s.addRectangle(rect);
                s.setTemporary(null);
                pressed = false;
                s.canvas.removeEventListener('mousemove', mouseMove2);
                s.canvas.removeEventListener('mousedown', mouseClick2);
                s.registerEventListeners();
            } else {
                p1 = p;
                sndPoint = true;
            }
        }
        mouseMove2 = function(e) {
            if (sndPoint) {
                var mouse = s.getMouse(e);
                var p2 = new Point(mouse.x, mouse.y);

                var x = p1.x;
                var y = p1.y;
                var w = p2.x - p1.x;
                var h = p2.y - p1.y;
                var temp = new Rectangle();
                temp.set(x, y, w, h, '#000000');
                s.setTemporary(temp);
            }
        }
        pressed = true;
        s.canvas.addEventListener('mousedown', mouseClick2);
        s.canvas.addEventListener('mousemove', mouseMove2);
        s.unregisterEventListeners();
    }

    document.getElementById("square").onclick = function() {
        s.postSelection = null;
        s.valid = false;
        if (pressed) {
            s.canvas.removeEventListener('mousemove', mouseMove2);
            s.canvas.removeEventListener('mousedown', mouseClick2);
        }
        if (pressedFree) {
            s.canvas.removeEventListener('mouseup', mouseUp2);
            s.canvas.removeEventListener('mousemove', mouseMove2);
            s.canvas.removeEventListener('mousedown', mouseDown2);
        }
        s.setTemporary(null);
        var r = new Square();
        var down = false;
        var sndPoint = false;
        var p1 = null;
        var p2 = null;
        mouseClick2 = function(e) {
            var mouse = s.getMouse(e);
            var p = new Point(mouse.x, mouse.y);

            if (sndPoint) {
                p2 = p;

                var square = new Square();
                var x = p1.x;
                var y = p1.y;
                var dx = p2.x - p1.x;
                var dy = p2.y - p1.y;
                var r = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
                var a = r * Math.SQRT1_2;
                square.set(x, y, a, '#000');
                s.addRectangle(square);
                s.setTemporary(null);
                pressed = false;
                s.canvas.removeEventListener('mousemove', mouseMove2);
                s.canvas.removeEventListener('mousedown', mouseClick2);
                s.registerEventListeners();
            } else {
                p1 = p;
                sndPoint = true;
            }
        }
        mouseMove2 = function(e) {
            if (sndPoint) {
                var mouse = s.getMouse(e);
                var p2 = new Point(mouse.x, mouse.y);

                var x = p1.x;
                var y = p1.y;
                var dx = p2.x - p1.x;
                var dy = p2.y - p1.y;
                var r = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
                var a = r * Math.SQRT1_2;
                var temp = new Square();
                temp.set(x, y, a, '#000');
                s.setTemporary(temp);
            }
        }
        pressed = true;
        s.canvas.addEventListener('mousedown', mouseClick2);
        s.canvas.addEventListener('mousemove', mouseMove2);
        s.unregisterEventListeners();
    }

    document.getElementById("triangle").onclick = function() {
        s.postSelection = null;
        s.valid = false;
        if (pressed) {
            s.canvas.removeEventListener('mousemove', mouseMove2);
            s.canvas.removeEventListener('mousedown', mouseClick2);
        }
        if (pressedFree) {
            s.canvas.removeEventListener('mouseup', mouseUp2);
            s.canvas.removeEventListener('mousemove', mouseMove2);
            s.canvas.removeEventListener('mousedown', mouseDown2);
        }
        s.setTemporary(null);
        var t = new Triangle();
        var down = false;
        var sndPoint = false;
        var p1 = null;
        var p2 = null;
        mouseClick2 = function(e) {
            var mouse = s.getMouse(e);
            var p = new Point(mouse.x, mouse.y);
            if (sndPoint) {
                p2 = p;

                var tri = new Triangle();
                var x = p1.x;
                var y = p1.y;
                var w = p2.x - p1.x;
                var h = p2.y - p1.y;
                var a = Math.sqrt(Math.pow(w, 2) + Math.pow(h, 2));
                tri.set(x, y, a, '#000');
                tri.rotate(p2);
                s.addTriangle(tri);
                s.setTemporary(null);
                pressed = false;
                s.canvas.removeEventListener('mousemove', mouseMove2);
                s.canvas.removeEventListener('mousedown', mouseClick2);
                s.registerEventListeners();
            } else {
                p1 = p;
                sndPoint = true;
            }
        }
        mouseMove2 = function(e) {

            if (sndPoint) {
                var mouse = s.getMouse(e);
                var p2 = new Point(mouse.x, mouse.y);

                var x = p1.x;
                var y = p1.y;
                var w = p2.x - p1.x;
                var h = p2.y - p1.y;
                var temp = new Triangle();
                var a = Math.sqrt(Math.pow(w, 2) + Math.pow(h, 2));
                temp.set(x, y, a, '#000');
                temp.rotate(p2);
                s.setTemporary(temp);
            }
        }
        s.unregisterEventListeners();
        pressed = true;
        s.canvas.addEventListener('mousedown', mouseClick2);
        s.canvas.addEventListener('mousemove', mouseMove2);
    }

    document.getElementById("pinIn").onclick = function() {
        s.postSelection = null;
        s.valid = false;
        if (pressed) {
            s.canvas.removeEventListener('mousemove', mouseMove2);
            s.canvas.removeEventListener('mousedown', mouseClick2);
        }
        if (pressedFree) {
            s.canvas.removeEventListener('mouseup', mouseUp2);
            s.canvas.removeEventListener('mousemove', mouseMove2);
            s.canvas.removeEventListener('mousedown', mouseDown2);
        }
        s.setTemporary(null);
        var pin = new Pin();
        var down = false;
        var sndPoint = false;
        var p1 = null;
        var p2 = null;
        mouseClick2 = function(e) {
            var mouse = s.getMouse(e);
            var p = new Point(mouse.x, mouse.y);
            if (sndPoint) {
                p2 = p;

                var pi = new Pin();
                var x = p1.x;
                var y = p1.y;
                var w = p2.x - p1.x;
                var h = p2.y - p1.y;

                pi.set(x, y, 'in', '#000');
                pi.rotate(p2);
                s.addPin(pi);
                s.setTemporary(null);
                pressed = false;
                s.canvas.removeEventListener('mousemove', mouseMove2);
                s.canvas.removeEventListener('mousedown', mouseClick2);
                s.registerEventListeners();
            } else {
                p1 = p;
                sndPoint = true;
            }
        }
        mouseMove2 = function(e) {
            if (sndPoint) {
                var mouse = s.getMouse(e);
                var p2 = new Point(mouse.x, mouse.y);

                var x = p1.x;
                var y = p1.y;

                var temp = new Pin();

                temp.set(x, y, "in", '#000');
                temp.rotate(p2);
                s.setTemporary(temp);
            }
        }
        s.unregisterEventListeners();
        pressed = true;
        s.canvas.addEventListener('mousedown', mouseClick2);
        s.canvas.addEventListener('mousemove', mouseMove2);
    }

    document.getElementById("pinOut").onclick = function() {
        s.postSelection = null;
        s.valid = false;
        if (pressed) {
            s.canvas.removeEventListener('mousemove', mouseMove2);
            s.canvas.removeEventListener('mousedown', mouseClick2);
        }
        if (pressedFree) {
            s.canvas.removeEventListener('mouseup', mouseUp2);
            s.canvas.removeEventListener('mousemove', mouseMove2);
            s.canvas.removeEventListener('mousedown', mouseDown2);
        }
        s.setTemporary(null);
        var pin = new Pin();
        var down = false;
        var sndPoint = false;
        var p1 = null;
        var p2 = null;
        mouseClick2 = function(e) {
            var mouse = s.getMouse(e);
            var p = new Point(mouse.x, mouse.y);
            if (sndPoint) {
                p2 = p;

                var pi = new Pin();
                var x = p1.x;
                var y = p1.y;
                var w = p2.x - p1.x;
                var h = p2.y - p1.y;

                pi.set(x, y, 'out', '#000');
                pi.rotate(p2);
                s.addPin(pi);
                s.setTemporary(null);
                pressed = false;
                s.canvas.removeEventListener('mousemove', mouseMove2);
                s.canvas.removeEventListener('mousedown', mouseClick2);
                s.registerEventListeners();
            } else {
                p1 = p;
                sndPoint = true;
            }
        }
        mouseMove2 = function(e) {
            if (sndPoint) {
                var mouse = s.getMouse(e);
                var p2 = new Point(mouse.x, mouse.y);

                var x = p1.x;
                var y = p1.y;

                var temp = new Pin();

                temp.set(x, y, "out", '#000');
                temp.rotate(p2);
                s.setTemporary(temp);
            }
        }
        s.unregisterEventListeners();
        pressed = true;
        s.canvas.addEventListener('mousedown', mouseClick2);
        s.canvas.addEventListener('mousemove', mouseMove2);
    }

    document.getElementById("circle").onclick = function() {
        s.postSelection = null;
        s.valid = false;
        if (pressed) {
            s.canvas.removeEventListener('mousemove', mouseMove2);
            s.canvas.removeEventListener('mousedown', mouseClick2);
        }
        if (pressedFree) {
            s.canvas.removeEventListener('mouseup', mouseUp2);
            s.canvas.removeEventListener('mousemove', mouseMove2);
            s.canvas.removeEventListener('mousedown', mouseDown2);
        }
        s.setTemporary(null);
        var c = new Circle();
        var down = false;
        var sndPoint = false;
        var p1 = null;
        var p2 = null;
        mouseClick2 = function(e) {
            var mouse = s.getMouse(e);
            var p = new Point(mouse.x, mouse.y);
            if (sndPoint) {
                p2 = p;

                var cir = new Circle();
                var x = p1.x;
                var y = p1.y;
                var w = p2.x - p1.x;
                var h = p2.y - p1.y;
                var r = Math.sqrt(Math.pow(w, 2) + Math.pow(h, 2));
                cir.set(x, y, r, '#000');
                s.addCircle(cir);
                s.setTemporary(null);
                pressed = false;
                s.canvas.removeEventListener('mousemove', mouseMove2);
                s.canvas.removeEventListener('mousedown', mouseClick2);
                s.registerEventListeners();
            } else {
                p1 = p;
                sndPoint = true;
            }
        }
        mouseMove2 = function(e) {
            if (sndPoint) {
                var mouse = s.getMouse(e);
                var p2 = new Point(mouse.x, mouse.y);

                var x = p1.x;
                var y = p1.y;
                var w = p2.x - p1.x;
                var h = p2.y - p1.y;
                var temp = new Circle();
                var r = Math.sqrt(Math.pow(w, 2) + Math.pow(h, 2));
                temp.set(x, y, r, '#000');
                s.setTemporary(temp);
            }
        }
        s.unregisterEventListeners();
        pressed = true;
        s.canvas.addEventListener('mousedown', mouseClick2);
        s.canvas.addEventListener('mousemove', mouseMove2);
    }

    document.getElementById("ellipse").onclick = function() {
        s.postSelection = null;
        s.valid = false;
        if (pressed) {
            s.canvas.removeEventListener('mousemove', mouseMove2);
            s.canvas.removeEventListener('mousedown', mouseClick2);
        }
        if (pressedFree) {
            s.canvas.removeEventListener('mouseup', mouseUp2);
            s.canvas.removeEventListener('mousemove', mouseMove2);
            s.canvas.removeEventListener('mousedown', mouseDown2);
        }
        s.setTemporary(null);
        var r = new Ellipse();
        var down = false;
        var sndPoint = false;
        var p1 = null;
        var p2 = null;
        mouseClick2 = function(e) {
            var mouse = s.getMouse(e);
            var p = new Point(mouse.x, mouse.y);

            if (sndPoint) {
                p2 = p;

                var ell = new Ellipse();
                var x = p1.x;
                var y = p1.y;
                var w = p2.x - p1.x;
                var h = p2.y - p1.y;
                ell.set(x, y, w, h, '#000');
                s.addRectangle(ell);
                s.setTemporary(null);
                pressed = false;
                s.canvas.removeEventListener('mousemove', mouseMove2);
                s.canvas.removeEventListener('mousedown', mouseClick2);
                s.registerEventListeners();
            } else {
                p1 = p;
                sndPoint = true;
            }
        }
        mouseMove2 = function(e) {
            if (sndPoint) {
                var mouse = s.getMouse(e);
                var p2 = new Point(mouse.x, mouse.y);

                var x = p1.x;
                var y = p1.y;
                var w = p2.x - p1.x;
                var h = p2.y - p1.y;
                var temp = new Ellipse();
                temp.set(x, y, w, h, '#000000');
                s.setTemporary(temp);
            }
        }
        pressed = true;
        s.canvas.addEventListener('mousedown', mouseClick2);
        s.canvas.addEventListener('mousemove', mouseMove2);
        s.unregisterEventListeners();
    }

    document.getElementById("polygon").onclick = function() {
        s.postSelection = null;
        s.valid = false;
        if (pressed) {
            s.canvas.removeEventListener('mousemove', mouseMove2);
            s.canvas.removeEventListener('mousedown', mouseClick2);
        }
        if (pressedFree) {
            s.canvas.removeEventListener('mouseup', mouseUp2);
            s.canvas.removeEventListener('mousemove', mouseMove2);
            s.canvas.removeEventListener('mousedown', mouseDown2);
        }
        s.setTemporary(null);
        var ArrayOfPoints = [];
        var poly = new Polygon();

        mouseDown2 = function(e) {
            var mouse = s.getMouse(e);
            var p = new Point(mouse.x, mouse.y);
            ArrayOfPoints.push(p);
        }
        mouseMove2 = function(e) {
            var mouse = s.getMouse(e);
            var p = new Point(mouse.x, mouse.y);
            var tempPoints = [];
            for (var n = 0; n < ArrayOfPoints.length; n++) {
                tempPoints.push(ArrayOfPoints[n]);
            }
            tempPoints.push(p);

            var tempPoly = new Polygon();
            tempPoly.set(tempPoints);
            s.setTemporary(tempPoly);
        }
        var donePoly = function(e) {

            if (e.keyCode === 13) {

                var pointsForPoly = ArrayOfPoints;
                poly.set(pointsForPoly);
                ArrayOfPoints = [];
                s.addPolygon(poly);
                s.setTemporary(null);
                pressed = false;
                s.canvas.removeEventListener('mousedown', mouseDown2);
                s.canvas.removeEventListener('mousemove', mouseMove2);
                window.removeEventListener('keypress', donePoly);
                s.registerEventListeners();

            }
        }
        pressed = true;
        s.canvas.addEventListener('mousedown', mouseDown2);
        s.canvas.addEventListener('mousemove', mouseMove2);
        window.addEventListener('keypress', donePoly);
        s.unregisterEventListeners();

    }

    document.getElementById("free").onclick = function() {
        s.postSelection = null;
        s.valid = false;
        if (pressed) {
            s.canvas.removeEventListener('mousemove', mouseMove2);
            s.canvas.removeEventListener('mousedown', mouseClick2);
        }
        if (pressedFree) {
            s.canvas.removeEventListener('mouseup', mouseUp2);
            s.canvas.removeEventListener('mousemove', mouseMove2);
            s.canvas.removeEventListener('mousedown', mouseDown2);
        }
        s.setTemporary(null);
        var pointsArray = [];
        var f = new Free();
        var down = false;
        mouseDown2 = function(e) {
            down = true;
        }
        mouseUp2 = function(e) {
            down = false;

            var pointsForFree = pointsArray;
            f.set(pointsForFree);
            pointsArray = [];
            s.addFree(f);
            s.setTemporary(null);
            pressedFree = false;
            s.canvas.removeEventListener('mouseup', mouseUp2);
            s.canvas.removeEventListener('mousemove', mouseMove2);
            s.canvas.removeEventListener('mousedown', mouseDown2);
            s.registerEventListeners();
        }
        mouseMove2 = function(e) {
            if (down) {
                var mouse = s.getMouse(e);
                var p = new Point(mouse.x, mouse.y);
                pointsArray.push(p);
                var temp = new Free();
                temp.set(pointsArray);
                s.setTemporary(temp);
            }
        }
        pressedFree = true;
        s.canvas.addEventListener('mousedown', mouseDown2);
        s.canvas.addEventListener('mousemove', mouseMove2);
        s.canvas.addEventListener('mouseup', mouseUp2);
        s.unregisterEventListeners();
    }

    document.getElementById("delete").onclick = function() {
        if (pressed) {
            s.canvas.removeEventListener('mousemove', mouseMove2);
            s.canvas.removeEventListener('mousedown', mouseClick2);
        }
        if (pressedFree) {
            s.canvas.removeEventListener('mouseup', mouseUp2);
            s.canvas.removeEventListener('mousemove', mouseMove2);
            s.canvas.removeEventListener('mousedown', mouseDown2);
        }
        s.setTemporary(null);
        if (s.postSelection !== null) {
            var element = s.postSelection;
            var index = s.figures.indexOf(element);
            s.figures.splice(index, 1);
            s.postSelection = null;
            s.selection = null;
            s.valid = false;
        }
    }

    document.getElementById("deleteall").onclick = function() {
        if (pressed) {
            s.canvas.removeEventListener('mousemove', mouseMove2);
            s.canvas.removeEventListener('mousedown', mouseClick2);
        }
        if (pressedFree) {
            s.canvas.removeEventListener('mouseup', mouseUp2);
            s.canvas.removeEventListener('mousemove', mouseMove2);
            s.canvas.removeEventListener('mousedown', mouseDown2);
        }
        s.setTemporary(null);
        s.clearShapes();
    }

    document.getElementById("saveas").onclick = function() {
        id = null;
        saveaction();
    }

    saveaction = function() {
        if (pressed) {
            s.canvas.removeEventListener('mousemove', mouseMove2);
            s.canvas.removeEventListener('mousedown', mouseClick2);
        }
        if (pressedFree) {
            s.canvas.removeEventListener('mouseup', mouseUp2);
            s.canvas.removeEventListener('mousemove', mouseMove2);
            s.canvas.removeEventListener('mousedown', mouseDown2);
        }
        s.setTemporary(null);
        s.postSelection = null;
        s.valid = false;
        s.redraw();

        var objects = s.getFigures();
        var serialized = JSON.stringify(objects);

        var figures = s.getFigures();

        var inputPins = s.getInputPins();
        var outputPins = s.getOutputPins();

        var selected = document.getElementById('private').checked;

        if (figures.length == 0) {
            alert('Nema ništa za spremiti!');
            return;
        }

        var minx = figures[0].bbx;
        var miny = figures[0].bby;
        var maxx = figures[0].bbx + figures[0].bbw;
        var maxy = figures[0].bby + figures[0].bbh;
        for (var i = 0; i < figures.length; i++) {
            var fig = figures[i];

            if (minx > figures[i].bbx) {
                minx = figures[i].bbx;
            }
            if (miny > figures[i].bby) {
                miny = figures[i].bby;
            }
            if (maxx < figures[i].bbx + figures[i].bbw) {
                maxx = figures[i].bbx + figures[i].bbw;
            }
            if (maxy < figures[i].bby + figures[i].bbh) {
                maxy = figures[i].bby + figures[i].bbh;
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

        var name;
        
        do {
            name = prompt('Unesite ime:');
        } while (name === null || name === "");

        imgData = s.ctx.getImageData(x, y, w, h);
        s.canvas.width = w;
        s.canvas.height = h;
        s.ctx.putImageData(imgData, 0, 0);
        imgData = s.canvas.toDataURL();

        var params = {
            name : name,
            data : serialized,
            image : imgData,
            inPins : inputPins.length,
            outPins : outputPins.length,
            isPrivate : JSON.stringify(selected),
            id : id
        };

        post("menu", params);
    }

    document.getElementById("save").onclick = saveaction;
    
    if (loadedData !== "") {

        var objects = JSON.parse(loadedData);
        s.clearShapes();
        for (var i = 0; i < objects.length; i++) {
            var figure = objects[i];
            switch (figure.name) {
            case "rectangle":
                var r = new Rectangle(figure);
                s.addRectangle(r);
                break;
            case "circle":
                var c = new Circle(figure);
                s.addCircle(c);
                break;
            case "triangle":
                var t = new Triangle(figure);
                s.addTriangle(t);
                break;
            case "polygon":
                var p = new Polygon(figure);
                s.addPolygon(p);
                break;
            case "free":
                var f = new Free(figure);
                s.addFree(f);
                break;
            case "square":
                var q = new Square(figure);
                s.addRectangle(q);
                break;
            case "ellipse":
                var e = new Ellipse(figure);
                s.addCircle(e);
                break;
            case "pin":
                var p = new Pin(figure);
                s.addPin(p);
                break;
            default:
                alert(figure.name + " not expected!");
            }
        }
        s.valid = false;
    }
}
