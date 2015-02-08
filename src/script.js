var gameCanvas;
var gameDiv;
var ctx;

var ch;
var m;

window.onload = main;

var video = {
	name: "Name", //Video Name
	cat: "", //Video Category
	sCat: "", //Video Sub Category

	equipment: ""
};

function main()
{
	ch = new Channel();
	m = new SideMenu();

	ch.UpdateUI();
	m.Init();

	setInterval(function () { ch.UpdateUI(); }, 1000);

	//InitMenu();
	//InitChanel();

	gameCanvas = document.getElementById("gameCan");
		gameCanvas.width = window.innerWidth;
		gameCanvas.height = window.innerHeight;
	ctx = gameCanvas.getContext("2d");

	var img = new Image();
	img.onload = function ()
	{
		var w = gameCanvas.height/( img.height/img.width );
		var x = gameCanvas.width/2 - w/2;

		ctx.drawImage(img, x, 0, w, gameCanvas.height);
	};
	img.src = "images/rooms/room.svg";

	// var scn = document.getElementById("scn");

	// scn.domain = document.domain;

	// scn.addEventListener("load", function ()
	// {
	// 	console.log("LD");
	// 	var scnSvg = scn.contentDocument;
	// 	var art = scnSvg.getElementById("Art");

	// 	$("#pl", art).animate({
	// 		translate: 20
	// 	});
	// }, false);

	$("#plusB").click(function () {
		$("#plusB").animate({
			top: "-10vh"
		}, 300);

		SlideInC("#aMenu");
	});
}

function InitChanel()
{
	//$("")
}