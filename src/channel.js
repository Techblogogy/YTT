var ranges = [
	{ div: 1e4, suf:'M' },
	{ div: 1e3, suf:'k' }
];

function Channel ()
{
	//Properties
	this.name = "";

	this.subs = 0;
	this.views = 0;

	this.income = 0;
	this.budget = 0;

	this.uiDOM = ["#subI", "#vwsI", "#incI", "#bgtI"];

	this.vidId = 0;
	this.videos = [];
}

Channel.prototype.UpdateUI = function() 
{
	$(this.uiDOM[0]).text("Subscribers: "+ this.FormatI(this.subs));
	$(this.uiDOM[1]).text("Views: "+this.FormatI(this.views));
	$(this.uiDOM[2]).text("Income: "+this.FormatI(this.income)+" $");
	$(this.uiDOM[3]).text("Budget: "+this.FormatI(this.budget)+" $");
};

Channel.prototype.FormatI = function (n)
{
	for (var i=0, l=ranges.length; i<l; i++)
		if (n >= ranges[i].div)
			return (n/ranges[i].div).toString() + ranges[i].suf;

	return n.toString();
};