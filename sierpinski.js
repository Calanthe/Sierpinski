var c;
var ctx;

var Sierpinski = {
	gasketArray : [],
	carpetArray : [],
	x : 400,
	y : 400,
	c : 241,
	v : 241,
	
	Pixel : {
		x : -1,
		y : -1,
		init : function (x,y){
			return{
			x : x,
			y : y
		    };
		}
	},
	
	initSierpinski : function(canvasElement){

		var a;
		c=canvasElement;
		ctx=c.getContext("2d");
		
		/* 
			Sierpinski gasket http://en.wikipedia.org/wiki/Sierpinski_triangle
			http://pl.php.net/manual/en/function.imagesetpixel.php
		*/
		this.gasketArray[0] = this.Pixel.init(200,20);
		this.gasketArray[1] = this.Pixel.init(0,380);
		this.gasketArray[2] = this.Pixel.init(400,380);

		for (var m = 0; m < 100000; m++) {
		  this.drawRect(Math.round(this.x),Math.round(this.y),'#37B6CE');
		  a = Math.floor(Math.random()*3);
		  this.x = (this.x + this.gasketArray[a].x) / 2;
		  this.y = (this.y + this.gasketArray[a].y) / 2;
		}
				
		/* 
			Sierpinski carpet http://en.wikipedia.org/wiki/Sierpinski_carpet
		*/		
		for (var i = 1; i <= this.c; i++) {
			this.carpetArray[i] = new Array(c); 
			for (var j = 1; j <= this.v; j++) {			  
			  if (this.isSierpinskiCarpetPixelFilled(i,j)) this.drawRect(i+500,j,'#FF4040');
			}
		}
	},
	
	isSierpinskiCarpetPixelFilled : function(x,y){
		while(x>0&&y>0) //when either of these reaches zero the pixel is determined to be on the edge at that square level and must be filled
		{
			if(x%3===1 && y%3===1) //checks if the pixel is in the center for the current square level
				return 0;
			x = Math.floor(x/3); //x and y are decremented to check the next larger square level
			y = Math.floor(y/3);
		}
		return 1; //if all possible square levels are checked and the pixel is not determined to be open it must be filled
	},

	drawRect : function(x,y,color) {
		ctx.fillStyle=color;
		ctx.beginPath();
		ctx.fillRect(x,y,1,1);
		ctx.closePath();
		ctx.fill();
	}
}
