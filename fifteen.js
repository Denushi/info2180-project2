/*
	Name: Michael-Shane Brown
	ID: 620054354
	Collaborated with Damion Lowers to come up with solution
*/

/*=====================================================
Variable declaration and initialization
======================================================*/
var space=15; 
var move="none";
var boxclone;
var count=0;
var adder=0;
var str;
var inProgress= false;

window.onload = function()
{
	var boxes = document.getElementById('puzzlearea').getElementsByTagName('div');
	boxclone=boxes;
	var btn = document.getElementById('shufflebutton');
	btn.onclick=shuffle;
	for(var x=0; x<boxes.length;x++)
	{
		boxes[x].className = 'puzzlepiece';
		boxes[x].onmouseover = canMove;
		boxes[x].onmouseout = clear;
		boxes[x].onclick = moveTile;

		if(x>-1 && x<4)
		{
			boxes[x].style.left+=x*100+'px';
			boxes[x].style.top=0+'px';
			boxes[x].style.backgroundPosition = -x*100+'px '+'0px';
		}
		else if(x>3 && x<8)
		{
			boxes[x].style.left+=(x-4)*100+'px';
			boxes[x].style.top=100+'px';
			boxes[x].style.backgroundPosition = -(x-4)*100+'px '+'-100px';
		}
		else if(x>7 && x<12)
		{
			boxes[x].style.left+=(x-8)*100+'px';
			boxes[x].style.top=200+'px';
			boxes[x].style.backgroundPosition = -(x-8)*100+'px '+'-200px';
		}
		else
		{
			boxes[x].style.left+=(x-12)*100+'px';
			boxes[x].style.top=300+'px';
			boxes[x].style.backgroundPosition = -(x-12)*100+'px '+'-300px';
		}
		
	}
};

/*
	Ensure tile is able to move
	===========================================================================================================================
*/
function canMove()
{
	if(!inProgress)
	{
		if((parseInt(this.style.left)+parseInt(this.offsetWidth)) === parseInt(getXCoord()) && this.style.top===getYCoord())
		{
			this.className = this.className + " movablepiece";
			move="right";
		}
		else if(parseInt(this.style.left) === (parseInt(getXCoord())+parseInt(this.offsetWidth)) && this.style.top===getYCoord())
		{
			this.className = this.className + " movablepiece";
			move= "left";
		}
		else if((parseInt(this.style.top)+parseInt(this.offsetHeight)) === parseInt(getYCoord()) && this.style.left===getXCoord())
		{
			this.className = this.className + " movablepiece";
			move= "down";
		}
		else if(parseInt(this.style.top) === (parseInt(getYCoord())+parseInt(this.offsetHeight)) && this.style.left===getXCoord())
		{
			this.className = this.className + " movablepiece";
			move= "up";
		}
		else
		{
			move= "none";
		}
	}
	

}

/*
	Remove movable piece class effect
	===============================================================================================================================
*/
function clear()
{
	this.className = 'puzzlepiece';
}



/*
	Tile Movement
	=======================================================================================================================
*/
function shift()
{
	var indx = 0;
	for(var x=0; x<boxclone.length;x++)
	{
		if(boxclone[x].textContent===str)
		{
			indx=x;	
		}
	}
	
	if(adder!=100)
	{
		if(move==="left" || move==="right")
		{
			boxclone[indx].style.left=parseInt(boxclone[indx].style.left)+count+'px';
		}
		else
		{
			boxclone[indx].style.top=parseInt(boxclone[indx].style.top)+count+'px';
		}
		adder+=1;
		inProgress=true;
		setTimeout("shift()", "1 * 1000");
	}
	else
	{
		adder=0;
		inProgress=false;
		move="none";
	}	
	
}

/*
	Obtain direction of shift
	========================================================================================================
*/
function moveTile()
{
	if(!inProgress)
	{
		switch(move)
		{
			case "right":
				count=1;
				space-=1;
				str=this.textContent;
				shift();
				break;
			case "left":
				count=-1;
				space+=1;
				str=this.textContent;
				shift();
				break;
			case "down":
				count=1;
				space-=4;
				str=this.textContent;
				shift();
				break;
			case "up":
				count=-1;
				space+=4;
				str=this.textContent;
				shift();
				break;

		}
	}
}

/*
	Shuffle Movement
	===================================================================================================
*/
function shuffleTile(tile)
{
	
	switch(move)
	{
		case "right":
			tile.style.left=parseInt(tile.style.left)+100+'px';
			space-=1;
			break;
		case "left":
			tile.style.left=parseInt(tile.style.left)-100+'px';
			space+=1;
			break;
		case "down":
			tile.style.top=parseInt(tile.style.top)+100+'px';
			space-=4;
			break;
		case "up":
			tile.style.top=parseInt(tile.style.top)-100+'px';
			space+=4;
			break;
		default:
	}
}

/*
	Shuffle verification
	===============================================================================================================
*/
function shuffleMove(tile)
{
	if((parseInt(tile.style.left)+parseInt(tile.offsetWidth)) === parseInt(getXCoord()) && tile.style.top===getYCoord())
	{
		move = "right";
	}
	else if(parseInt(tile.style.left) === (parseInt(getXCoord())+parseInt(tile.offsetWidth)) && tile.style.top===getYCoord())
	{
		move = "left";
	}
	else if((parseInt(tile.style.top)+parseInt(tile.offsetHeight)) === parseInt(getYCoord()) && tile.style.left===getXCoord())
	{
		move = "down";
	}
	else if(parseInt(tile.style.top) === (parseInt(getYCoord())+parseInt(tile.offsetHeight)) && tile.style.left===getXCoord())
	{
		move = "up";
	}
	else
	{
		move = "none";
	}
	return move;

}


/*
	Rearrange Tiles
	==========================================================================
*/

function shuffle()
{
	var num=100;
	for(var x =0; x<num; x++)
	{
		var lst = [];
		for(var y =0; y<boxclone.length; y++)
		{
			if(shuffleMove(boxclone[y])!="none")
			{
				lst.push(y);
			}

		}
		if(lst.length!=0)
		{
			var num = lst[Math.floor((Math.random()*lst.length)+0)];
			shuffleMove(boxclone[num]);
			shuffleTile(boxclone[num]);
		}
	}
	move="none";
}


function getXCoord()
{
		if(space>-1 && space<4)
		{
			return space*100+'px';
		}
		else if(space>3 && space<8)
		{
			return (space-4)*100+'px';
			
		}
		else if(space>7 && space<12)
		{
			return (space-8)*100+'px';
		}
		else
		{
			return (space-12)*100+'px';
		}		
}


function getYCoord()
{
	if(space>-1 && space<4)
	{
		return '0px';
	}
	else if(space>3 && space<8)
	{
			return '100px';
	}
	else if(space>7 && space<12)
	{
		return '200px';
	}
	else
	{
		return '300px';
	}
}

