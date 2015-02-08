//Side Menu Constants
var fItem = "#prepod";
var menu = {
	prepod: {
		type: "Front",

		items: ["Category", "Genre"],
		itemsN: ["cat","SubClass"],

		next: "equip"
	},

	cat: {
		type: "List",
		head: "Category",

		items: ["Gaming", "Music", "People & Blogs", "Film & Animation"],
		itemsN: ["prepod","prepod","prepod","prepod"],

		click: function (dt)
		{
			$("#prepod0 span").text(dt.mn.items[dt.id]);
			video.cat = dt.mn.items[dt.id];
		}
	},

	SubClass:
	{
		type: "List",
		head: "Genre",

		items: ["Let's Play", "Unboxing", "Live Action", "Misuri"],
		itemsN: ["prepod","prepod","prepod","prepod"],

		click: function (dt)
		{
			$("#prepod1 span").text(dt.mn.items[dt.id]);
			video.sCat = dt.mn.items[dt.id];
		}
	},

	prod: {
		type: "List",
		head: "Production",

		items: ["Film Video", "Edit Video", "Publish Video"],
		itemsN: ["equip","prepod","prepod","prepod"]
	},

	equip: {
		type: "ImgList",
		head: "Equipment",

		items: ["Cam.svg","Cam.svg","Cam.svg","Cam.svg","Cam.svg"],
		itemsName: ["WebCam", "Point&Shoot", "FPRAS", "Canan 60D", "Nikon 50D"],

		itemsInst: [],

		unlocked: [true, true, true, true, true],
		bought: [true, true, true, false, true],

		itemsN: ["sldM","sldM","sldM","sldM","sldM"],

		click: function (dt)
		{
			video.equipment = dt.mn.itemsName[dt.id];
		}
	},

	sldM: {
		type: "Sliders",
		head: "Film Video",

		items: ["Funny", "Serious", "Informative", "Entertaining"],

		next: "prod"
	}
};

//Side Menu Object
function SideMenu()
{
	var mnDv = $("#aMenu"); //Menu Container

	this.Init = function()
	{
		for (var o in menu)
		{
			var mCtr = this.AContainer(o, mnDv);
			mCtr.css({ display: "none", left: "100%" });

			if (menu[o].head != undefined)
				this.AHeader(o+"H",mCtr, menu[o].head);

			if (menu[o].create != undefined)
				menu[o].create();

			switch (menu[o].type)
			{
				case "List":
					this.CListM(o, mCtr, menu[o]);
				break;

				case "ImgList":
					this.CImgListM(o, mCtr, menu[o]);
				break;

				case "Sliders":
					this.CSliderM(o, mCtr, menu[o]);
				break; 

				case "Front":
					this.CFrontM(o, mCtr, menu[o]);
				break;
			}
		}

		$(fItem).show();
		$(fItem).css({left:"0"});
	};

	//UI Elements
	this.AContainer = function (id, ctr)
	{
		var obj = $("<div id='"+id+"' class='aMenuC'></div>");
		ctr.append(obj);

		return obj;
	};

	this.AHeader = function(id, ctr, txt)
	{
		var obj = $("<div id='"+id+"' class='aMenuB' style='font-weight: bold;'> <span>"+txt+"</span> </div>");
		ctr.append(obj);

		return obj;
	};

	this.AButton = function (id, ctr, txt, style)
	{
		var obj = $("<div id='"+id+"' class='aMenuB aMenuBA' style='"+/*style+*/"'> <span>"+txt+"</span> </div>");
		ctr.append(obj);
		
		return obj;
	};

	this.ASlider = function(id, ctr, tag, y)
	{
		var tg = $("<span id='"+id+"Tag' class='labl' style='font-family: Myriad Pro; top: "+y+"vh'>"+tag+"</span>");
		var sld = $("<input id='"+id+"Sld' class='sld' style='top: "+(y+5)+"vh' type='range' step='5'>");

		ctr.append(tg);
		ctr.append(sld);

		return sld;
	};

	//UI Button Events
	this.AButtonE = function(e)
	{
		var d = e.data;

		if (d.mn.click != undefined)
			d.mn.click(d);

		var ths = $("#"+d.mId);
		var nxt = $("#"+d.nItem);

		ths.animate(
		{
			left: -parseInt(nxt.css("left")) + "%"
		}, 150, function ()
		{
			ths.hide();
		});

		nxt.show();
		nxt.animate(
		{
			left: "0%"
		}, 150);
	};
	this.AButtonClk = function (bt, dt, i, o, nxt) // Parameters: ( Button Object , Menu Data, Menu Item Index , Menu String ID , Next Item )
	{
		bt.click({ mn: dt, id: i, mId: o, nItem: nxt }, this.AButtonE);
	};

	//Menu Constructors

	//Front Menu 
	this.CFrontM = function (id, ctr, dt)
	{
		this.AHeadInput(id,ctr);
		this.CListM(id,ctr, dt);

		var b = this.AButton(id+"NxtB", ctr, "Create", "");
		b.addClass("aMenuNxt");

		b.click({ mn: dt, id: 0, mId: id, nItem: dt.next, fnc: this.AButtonE }, this.HeadButtonC);
	};
	this.AHeadInput = function (id, ctr)
	{
		var inp = $("<input id='"+id+"Inp' type='text' value='Video Name'>");
		ctr.append(inp);

		inp.focus(function (){
			$(this).select();
		});
		inp.keypress(function (e){
			if (e.which == 13)
				$(this).blur();
		});

		inp.blur(function(){
			video.name = $(this).val(); //VIDEO NAME CHANGE
		});

		return inp;
	};
	this.HeadButtonC = function (e)
	{
		if (video.name != "" && video.cat != "" && video.sCat != "") //VIDEO ATTRIBUTES CHECK
		{
			e.data.fnc(e); //Do Button Event
		}
		else
		{ 
			//Shake Animation

			$(this).animate({left: '+=10'}, 50);
 			$(this).animate({left: '-=20'}, 100);
	 		$(this).animate({left: '+=10'}, 50);
		}
	}

	//List Menu
	this.CListM = function (id, ctr, dt)
	{
		var lsDv = $("<div id='"+id+"C' class='aMenuCI'></div>");
		ctr.append(lsDv);

		for (var i=0; i<dt.items.length; i++)
		{
			var s = (i+1)*5 + "vh";
			var bt = this.AButton(id+i, lsDv, dt.items[i], "top: "+s);
			
			this.AButtonClk(bt, dt, i, id, dt.itemsN[i]);
		}
	};

	//Image List Menu
	this.CImgListM = function (id, ctr, dt)
	{
		var imgC = $("<div id='"+id+"C' class='aMenuCI' style='top: 7vh'></div>");
		ctr.append(imgC);

		for (var i=0; i<dt.items.length; i++)
		{
			var img = $("<img id='"+id+i+"' class='mImg' src='images/buttons/"+ dt.items[i] +"' >");
			imgC.append(img);

			var t = Math.floor(i/2) * 7;

			img.css({ top: t + "vw"});
			if (i%2 == 1)
				img.css({ right: "5%" });
			else
				img.css({ left: "5%"});

			this.AButtonClk(img, dt, i, id, dt.itemsN[i]);

			if (dt.unlocked[i])
				img.show();
			else
				img.hide();

			if (!dt.bought[i])
				img.addClass("aMenuD");

			dt.itemsInst.push(img);
		}
	};

	//Slider Menu
	this.CSliderM = function (id, ctr, dt)
	{
		for (var i=0; i<dt.items.length; i++)
		{
			this.ASlider(id+i, ctr, dt.items[i], 7+i*10);
		}

		var b = this.AButton(id+"NxtB", ctr, "Film", "");
		b.addClass("aMenuNxt");
		this.AButtonClk(b, dt, 0, id, dt.next);
	};
}