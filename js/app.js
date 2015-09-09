//Problem: No user interaction causes no change to application
//Solution: When user interacts cause changes appropietly

//When clicking on control list items

/*
	VARIABLES
*/
var $colors       = $('.controls');
var $newColor     = $('#revealColorSelect');
var $sliders      = $('input[type="range"]');
var $slideRed     = $('#red');
var $slideGreen   = $('#green');
var $slideBlue    = $('#blue');
var $spanColor    = $('#newColor');
var $addColor     = $('#addNewColor');
var colorSelected = $('.selected').css('background-color');

var canvas       = $('canvas')[0]; //Es igual que hacer document.getElementByTagName('canvas')[0]
var context = canvas.getContext('2d');

var $canvas = $('canvas');
var lastEvent;
var mouseDown = false;

/*
	FUNCTIONS
*/
function getColor (r, g, b) {
	 return 'rgb(' + r + ',' + g + ',' + b + ')';
}

function changeSpancolor () {
	$spanColor.css('background-color', getColor($slideRed.val(), $slideGreen.val(), $slideBlue.val()));
}


/*
	EVENTS
*/
$colors.on('click', 'li', function () {	
	//Deselect sibiling elements
	//Select clicked element
	var $clickedElement = $(this);
	$clickedElement.addClass('selected').siblings().removeClass('selected');
	colorSelected = $clickedElement.css('background-color');
});

//When add color is pressed
	//Show color select or hide the color select
$newColor.on('click', function () {
	changeSpancolor();
	$newColor.next().slideToggle();
});

//When color sliders change
	//Update the new color span
$sliders.on('change', changeSpancolor);

//When add color is pressed
$addColor.on('click', function () {
	//Append the color to the control ul
	//Select the new color
	var $newliColor = $('<li></li>').hide();
	$colors.find('ul').append($newliColor.css('background-color', $spanColor.css('background-color')));
	$newliColor.addClass('selected').show('slow').siblings().removeClass('selected');	
	$newColor.click();
	color = $newliColor.css('background-color');
});

//On mouse events on the canvas
	//Draw lines
$canvas.on('mousedown', function (e) {
	lastEvent = e; // Información del evento que se ha lanzado
	mouseDown = true;
}).on('mousemove', function (e) {
	if (mouseDown) {
		context.beginPath();
		context.moveTo(lastEvent.offsetX, lastEvent.offsetY);
		context.lineTo(e.offsetX, e.offsetY);
		context.strokeStyle = colorSelected;
		context.stroke();	
		lastEvent = e;
	}
}).on('mouseup mouseleave', function () {
	mouseDown = false;
});

/*context.beginPath();
context.moveTo(10, 10);
context.lineTo(20, 10);
context.lineTo(20, 20);
context.lineTo(10, 20);
context.lineTo(10, 10);
context.closePath();
context.stroke();*/