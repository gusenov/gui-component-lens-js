var circleForResizeRadius = 10;
var indentOfCircleForResize = 15;

var r;

function CreateLens(x, y, width, height) {
    // ------------------------------ Drag ’n’ Drop  для линзы ------------------------------
	var dragger = function () {
        this.ox = this.attr("x");
        this.oy = this.attr("y");
        this.animate({"fill-opacity": .2}, 500);
		
		// Original coords for pairs element
		for (i = 0, ii = this.pairs.length; i < ii; i++) {
			this.pairs[i].ox = this.pairs[i].attr("cx");
			this.pairs[i].oy = this.pairs[i].attr("cy");
		}		                		
    },

	move = function (dx, dy) {
		var att = {x: this.ox + dx, y: this.oy + dy};
		this.attr(att);

		for (i = 0, ii = this.pairs.length; i < ii; i++) {
			att = {cx: this.pairs[i].ox + dx, cy: this.pairs[i].oy + dy};
			this.pairs[i].attr(att);
		}		
		
		r.safari();
	},
	
	up = function () {
		this.animate({"fill-opacity": 0}, 500);
	};	
	// ------------------------------ ------------------------------ ------------------------------
	
    // ------------------------------ Drag ’n’ Drop  для кругов для изменения размеров линзы. ------------------------------
	var draggerOfCircleForResize = function () {
        this.ox = this.type == "rect" ? this.attr("x") : this.attr("cx");
        this.oy = this.type == "rect" ? this.attr("y") : this.attr("cy");
        this.animate({"fill-opacity": .2}, 500);
		
		// Original coords for pairs element
		for (i = 0, ii = this.pairs.length; i < ii; i++) {
			if (this.pairs[i].type == "rect")
			{
				this.pairs[i].ox = this.pairs[i].attr("x");
				this.pairs[i].oy = this.pairs[i].attr("y");		
				this.pairs[i].oh = this.pairs[i].attr("height");
				this.pairs[i].ow = this.pairs[i].attr("width");				
			} else {
				this.pairs[i].ox = this.pairs[i].attr("cx");
				this.pairs[i].oy = this.pairs[i].attr("cy");				
			}
		}			
    },
	
	// Верхний маркер по центру
	moveOfCircleForResize1 = function (dx, dy) {
		var att = this.type == "rect" ? {y: this.oy + dy} : {cy: this.oy + dy};
		this.attr(att);
		
		att = {y: this.pairs[0].oy + dy, height: this.pairs[0].oh - dy};
		this.pairs[0].attr(att);		
		
		for (i = 1, ii = this.pairs.length; i < ii; i++) {
			if (i == 1 || i == 2) {
				att = {cy: this.pairs[i].oy + dy};
				this.pairs[i].attr(att);
			} else if (i == 3 || i == 4) {
				att = {cy: this.pairs[i].oy + dy / 2};
				this.pairs[i].attr(att);
			}			
		}		
		
		r.safari();		
	},
	// Нижний маркер по центру	
	moveOfCircleForResize5 = function (dx, dy) {
		var att = this.type == "rect" ? {y: this.oy + dy} : {cy: this.oy + dy};
		this.attr(att);
		
		att = {height: this.pairs[0].oh + dy};
		this.pairs[0].attr(att);		
		
		for (i = 1, ii = this.pairs.length; i < ii; i++) {
			if (i == 1 || i == 2) {
				att = {cy: this.pairs[i].oy + dy};
				this.pairs[i].attr(att);
			} else if (i == 3 || i == 4) {
				att = {cy: this.pairs[i].oy + dy / 2};
				this.pairs[i].attr(att);
			}
		}		
		
		r.safari();		
	},	
	
	// Правый маркер по центру
	moveOfCircleForResize3 = function (dx, dy) {
		var att = this.type == "rect" ? {x: this.ox + dx} : {cx: this.ox + dx};
		this.attr(att);
		
		att = {width: this.pairs[0].ow + dx};
		this.pairs[0].attr(att);		
		
		for (i = 1, ii = this.pairs.length; i < ii; i++) {
			if (i == 1 || i == 2) {
				att = {cx: this.pairs[i].ox + dx};
				this.pairs[i].attr(att);
			} else if (i == 3 || i == 4) {
				att = {cx: this.pairs[i].ox + dx / 2};
				this.pairs[i].attr(att);				
			}
		}		
		
		r.safari();		
	},	
	// Левый маркер по центру
	moveOfCircleForResize7 = function (dx, dy) {
		var att = this.type == "rect" ? {x: this.ox + dx} : {cx: this.ox + dx};
		this.attr(att);
		
		att = {x: this.pairs[0].ox + dx, width: this.pairs[0].ow - dx};
		this.pairs[0].attr(att);		
		
		for (i = 1, ii = this.pairs.length; i < ii; i++) {
			if (i == 1 || i == 2) {
				att = {cx: this.pairs[i].ox + dx};
				this.pairs[i].attr(att);
			} else if (i == 3 || i == 4) {
				att = {cx: this.pairs[i].ox + dx / 2};
				this.pairs[i].attr(att);				
			}
		}		
		
		r.safari();		
	},	
	
	upOfCircleForResize = function () {
		this.animate({"fill-opacity": 0}, 500);
	};
	// ------------------------------ ------------------------------ ------------------------------
	
	var lens = r.rect(x, y, width, height, 2);	
	lens.attr({fill: '#C1CDCD', stroke: '#191970', "fill-opacity": 0, "stroke-width": 2, cursor: "move"});
	lens.drag(move, dragger, up);	
	
	// Круги для изменения размеров линзы. Упорядочены по часовой стрелке от верхнего левого угла.
	var circlesForResize = [ 
					r.circle(x + indentOfCircleForResize, y + indentOfCircleForResize, circleForResizeRadius),
					r.circle(x + width / 2, y + indentOfCircleForResize, circleForResizeRadius),
					r.circle(x + width - indentOfCircleForResize, y + indentOfCircleForResize, circleForResizeRadius),
					r.circle(x + width - indentOfCircleForResize, y + height / 2, circleForResizeRadius),
					r.circle(x + width - indentOfCircleForResize, y + height - indentOfCircleForResize, circleForResizeRadius),				  
					r.circle(x + width / 2, y + height - indentOfCircleForResize, circleForResizeRadius),
					r.circle(x + indentOfCircleForResize, y + height - indentOfCircleForResize, circleForResizeRadius),
					r.circle(x + indentOfCircleForResize, y + height / 2, circleForResizeRadius),					 
				  ];	
	
	// Треугольники в кругах для изменения размеров линзы. Упорядочены по часовой стрелке от верхнего левого угла.
	var trianglesOfcirclesForResize = [];	
	var j = 0;
	for (i = 0, ii = circlesForResize.length; i < ii; i++) {
		if (i == 0 || i == 4) {
		} else if (i == 2 || i == 6) {
		} else {
			trianglesOfcirclesForResize[j++] = r.path("M " 
				+ (circlesForResize[i].attr("cx") - circleForResizeRadius / 2) + " " + (circlesForResize[i].attr("cy")-circleForResizeRadius/5)
				+ " l " + circleForResizeRadius + " 0 l " 
				+ (-circleForResizeRadius/2) + " " + (-circleForResizeRadius/2) + " z");
        			
			trianglesOfcirclesForResize[j++] = r.path("M " 
				+ (circlesForResize[i].attr("cx") - circleForResizeRadius / 2) + " " + (circlesForResize[i].attr("cy")+circleForResizeRadius/5) 
				+ " l " + circleForResizeRadius + " 0 l " 
				+ (-circleForResizeRadius/2) + " " + (circleForResizeRadius/2) + " z");			
		}
	}
	for (i = 0, ii = circlesForResize.length; i < j; i++) {
		trianglesOfcirclesForResize[i].attr({stroke: '#8B008B', 'stroke-width': 1, fill: '#8B008B'});
	}
	
					
	lens.pairs = [];
	for (i = 0, ii = circlesForResize.length; i < ii; i++) {
		lens.pairs[i] = circlesForResize[i];

		circlesForResize[i].attr({fill: '#C1CDCD', stroke: '#191970', "fill-opacity": 0, "stroke-width": 2, cursor: "move"});
		circlesForResize[i].pairs = [];
		circlesForResize[i].pairs[0] = lens;		
		if (i == 0) {		
		} else if (i == 1) {
			circlesForResize[i].drag(moveOfCircleForResize1, draggerOfCircleForResize, upOfCircleForResize);
			circlesForResize[i].pairs[1] = circlesForResize[0];
			circlesForResize[i].pairs[2] = circlesForResize[2];			
			circlesForResize[i].pairs[3] = circlesForResize[3];
			circlesForResize[i].pairs[4] = circlesForResize[7];
		} else if (i == 2) {
		} else if (i == 3) {
			circlesForResize[i].drag(moveOfCircleForResize3, draggerOfCircleForResize, upOfCircleForResize);			
			circlesForResize[i].pairs[1] = circlesForResize[2];
			circlesForResize[i].pairs[2] = circlesForResize[4];			
			circlesForResize[i].pairs[3] = circlesForResize[1];
			circlesForResize[i].pairs[4] = circlesForResize[5];			
		} else if (i == 4) {
		} else if (i == 5) {
			circlesForResize[i].drag(moveOfCircleForResize5, draggerOfCircleForResize, upOfCircleForResize);			
			circlesForResize[i].pairs[1] = circlesForResize[4];
			circlesForResize[i].pairs[2] = circlesForResize[6];		
			circlesForResize[i].pairs[3] = circlesForResize[3];
			circlesForResize[i].pairs[4] = circlesForResize[7];			
		} else if (i == 6) {
		} else if (i == 7) {
			circlesForResize[i].drag(moveOfCircleForResize7, draggerOfCircleForResize, upOfCircleForResize);			
			circlesForResize[i].pairs[1] = circlesForResize[6];
			circlesForResize[i].pairs[2] = circlesForResize[0];	
			circlesForResize[i].pairs[3] = circlesForResize[1];
			circlesForResize[i].pairs[4] = circlesForResize[5];			
		}
	}
}

window.onload = function() {  
    r = Raphael("holder", 900, 480);
	CreateLens(50, 50, 500, 200);	
}  