/* Konstruktor koji prima referencu na nepotpuni objekt, tj. onaj koji ima samo atribute. */
function MyObject(obj) {
	/* Napuni propertyje iz primljenog objekta: */
	for (var prop in obj) {
		this[prop] = obj[prop];
	}
	/* Metode se nasljeđuju automatski. */
}

/* Prototip objekta: */
MyObject.prototype = {
	/* Default vrijednosti idu u prototip: */
	x: 0,
	y: 0,
	h: 0,
	w: 0,
	/* Konstruktor koji je definiran gore: */
	constructor: MyObject,
	/* Neka metoda koja pripada prototipu, ona se ne serijalizira: */
	aboutMe: function () {
		alert('Hello, I\'m ' + this.x + ' ' + this.y + ' ' + this.h + ' ' + this.w + '.');
	}
}

function serialize() {
	/* Stvorimo novi objekt koji ne punimo iz ničega: */
	var object = new MyObject();
	/* 'Ručno' podesimo propertyje: */
	object.x = 1;
	object.y = 2;
	object.h = 3;
	object.w = 4;
	
	/* Serijaliziramo objekt: */
	var ser = JSON.stringify(object);
	alert(ser);
	/* Poziv metode aboutMe() koju sadrži prototip od MyObject: */
	object.aboutMe();
}

function test() {
	var ser = prompt('JSON:');
	var deserialized;
	/* Deserijalizacija:
	 *   1. JSON.parse(ser) napravi objekt 'obj' i popuni samo propertyje u njega 
	 *   2. new MyObject(obj) uzme 'obj', stvori novi MyObject koji ima metode iz MyObject,
	 *      i propertyje postavi na vrijednosti iz obj
	 *   Tako se dobije objekt koji ima atribute i metode kao originalni.
	 */
	deserialized = new MyObject(JSON.parse(ser));
	/* Poziv metode aboutMe() da se uvjerimo da je deserijalizirani objekt stvarno ima: */
	deserialized.aboutMe();
	alert('success');
}

function getURL() {
    var canvas = document.getElementById("componentC");
    var data = canvas.toDataURL();
    alert(data);
}