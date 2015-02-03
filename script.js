var gameCanvas;
var gameDiv;

window.onload = main;

window.onresize = function ()
{
	//$("#gameH").height(window.innerHeight);
	$("#plusB").width($("#plusB").height());
	InitAButtonStyle();
};

var video = {
	name: "Name", //Video Name
	cat: "", //Video Category
	sCat: "", //Video Sub Category

	equipment: ""

};

var fItem = "#prepod";
var menu = {
	prepod: {
		id: "prepod",
		//head: "",
		items: ["Category", "Genre"],
		itemsId: ["cat","sClass","prod"]
	},

	cat: {
		id: "cat",
		head: "Category",
		items: ["Gaming", "Music", "People & Blogs", "Film & Animation"],
		itemsId: ["prepod","prepod","prepod","prepod"],

		click: function (dt)
		{
			$("#prepod0 span").text(dt.mn.items[dt.id]);
			video.cat = dt.mn.items[dt.id];
		}
	},

	SubClass:
	{
		id: "sClass",
		head: "Genre",
		items: ["Let's Play", "Unboxing", "Live Action", "Misuri"],
		itemsId: ["prepod","prepod","prepod","prepod"],

		click: function (dt)
		{
			$("#prepod1 span").text(dt.mn.items[dt.id]);
			video.sCat = dt.mn.items[dt.id];
		}
	},

	prod: {
		id: "prod",
		head: "Production",
		items: ["Film Video", "Edit Video", "Publish Video"],
		itemsId: ["equip","prepod","prepod","prepod"]
	},

	equip: {
		id: "equip",
		head: "Equipment",

		type: "icons",

		items: ["Cam.svg","Cam.svg","Cam.svg","Cam.svg","Cam.svg"],
		itemsName: ["WebCam", "Point&Shoot", "FPRAS", "Canan 60D", "Nikon 50D"],
		itemsId: ["sldM","sldM","sldM","sldM","sldM"],

		click: function (dt)
		{
			video.equipment = dt.mn.itemsName[dt.id];
		}
	}
};

function main()
{
	InitDiv();

	// InitMenu();
	// CrtButton();
	SliderMenu();

	$("#prepod").append("<input id='inpN' type='text' value='Name'>");

	$("#inpN").click(function (){
		$(this).select();
	});

	$("#inpN").keypress(function (e){
		if (e.which == 13)
		{
			$(this).blur();
		}
	});

	$("#inpN").blur(function(){
		video.name = $(this).val();
	});

	InitAButtonStyle();

	$("#plusB").click(function () {
		SlideInC("#aMenu");
	});

	$("#plusB").width($("#plusB").height());
}

function SliderMenu()
{
	MenuContainer("#aMenu", "sldM");
	CreateHeader("#sldM", "vHead", "Film Video");

	CreateSlider("#sldM", "fn", "Fun:", 7);
	CreateSlider("#sldM", "sr", "Serious:", 17);



	$("#fnS").on("input",function (){
		$("#srS").val(100 - $(this).val());
	});

	$("#srS").on("input",function (){
		$("#fnS").val(100 - $(this).val());
	});

	// $("#sldM").css({
	// 		display: "none",
	// 		left: "100%"
	// 	});
}

function CreateSlider(container, id, tag, y)
{
	$(container).append("<span id='"+id+"T' class='labl' style='font-family: Myriad Pro; top: "+y+"vh'>"+tag+"</span>");
	$(container).append("<input id='"+id+"S' class='sld' style='top: "+(y+5)+"vh' type='range' step='5'>");
}

function InitMenu()
{
	for (var o in menu)
	{
		MenuContainer("#aMenu", menu[o].id);
		var menuId = "#"+menu[o].id;

		$(menuId).css({
			display: "none", 
			left: "100%"
		});

		if (menu[o].head != undefined)
			CreateHeader(menuId, menu[o].id+"H", menu[o].head);

		for (var i=0; i<menu[o].items.length; i++)
		{
			var bId =  menu[o].id+i;

			if (menu[o].type == "icons")
			{
				$(menuId).append("<img id='"+ bId +"' class='mImg' src='"+ menu[o].items[i] +"' >");

				var t = Math.floor(i/2) * 25 + 15;
				$("#"+bId).css({
					top: t + "%"
				});

				if (i%2 == 1)
					$("#"+bId).css({
						right: "5%"
					});
				else
					$("#"+bId).css({
						left: "5%"
					});
			}
			else
			{
				var s = (i+1)*5 + "vh";
				ActionButton(menuId, bId, menu[o].items[i], s);
			}

			$(menuId+i).click({ mn: menu[o], id: i } ,function (e){
				var d = e.data;

				//Button Event
				if (d.mn.click != undefined)
					d.mn.click(d);

				var nxt = "#"+ d.mn.itemsId[d.id];

				if (parseInt($(nxt).css("left")) < 0)
					SlideOutCD($(this).parent());
				else 
					SlideOutC($(this).parent());

				SlideInC(nxt);
			});
		}
	}

	$(fItem).show();
	$(fItem).css("left", 0);
	InitAButtonStyle();
}

function InitDiv()
{
	//gameDiv = document.getElementById('gameH');
	//$("#gameH").height(window.innerHeight);
}

function InitAButtonStyle()
{
	// $(".aMenuB span").css({
	// 	"font-size": ($(".aMenuB").height()/2)+"px",
	// 	"line-height": ($(".aMenuB").height())+"px"
	// });

	// $("#inpN").css({
	// 	"font-size": ($(".aMenuB").height()/2)+"px"
	// });
}

function ActionButton(container, id, text, topOff)
{
	$(container).append( "<div id='"+id+"' class='aMenuB aMenuBA' style=' top:"+topOff+" '> <span>"+text+"</span> </div>" );
	//InitAButtonStyle();
}

function MenuContainer(container, id)
{
	$(container).append("<div id='"+id+"' class='aMenuC' ></div>");
}

//Slides Container To Left
function SlideOutC(container)
{
	$(container).animate(
	{
		left: "-100%"
	}, 150, function ()
	{
		$(container).hide();
	});
}

function SlideOutCD(container)
{
	$(container).animate(
	{
		left: "100%"
	}, 150, function ()
	{
		$(container).hide();
	});
}

function SlideInC(container)
{
	$(container).show();

	$(container).animate(
	{
		left: "0%"
	}, 150);
}

function CreateHeader(container, id, text)
{
	$(container).append("<div id='"+id+"' class='aMenuB' style='font-weight: bold;'> <span>" + text + "</span> </div>");
}

function CrtButton()
{
	if ($("#str").length <= 0)
	{
		ActionButton("#prepod", "str", "Create", "55.0vh");

		// $("#str").css({
		// 	"font-size": ($(".aMenuB").height()/2)+"px",
		// 	"line-height": ($(".aMenuB").height())+"px"
		// });

		$("#str").css({
			"border-top": "2px solid white",
			"border-bottom": "0"
		});

		$("#str").click(function (){
			if (video.name != "" && video.cat != "" && video.sCat != "")
			{
				var nxt = "#prod"; //"#"+$(this).attr("nxt");

				if (parseInt($(nxt).css("left")) < 0)
					SlideOutCD($(this).parent());
				else 
					SlideOutC($(this).parent());

				SlideInC(nxt);
			}
			else
			{

				$("#str").animate({
					left: "-10%"
				}, 50, function()
				{
					$("#str").animate({
						left: "10%"
					}, 50, function()
					{
						$("#str").animate({
							left: "0%"
						}, 50);
					});
				});
				
			}
		});
	}
}