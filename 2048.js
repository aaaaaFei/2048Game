
//配置参数变量
//游戏进行状态
const PLAYING=0;

//方块移动中，键盘不能响应
const CELL_MOVING=1;

//游戏的结束状态，结束不能响应键盘事件
const GAME_OVER=2;

//分数
var score=0;

//当前游戏状态
var state=PLAYING;

var cells=[[],[],[],[]];//16个格子数据


function init () {
	//初始化16个格子数据
	for (var row = 0; row < cells.length; row++) {   //行
			for (var col = 0; col < cells.length; col++) {  //列
			cells[row][col]=0;
		}
	}
	//游戏记录
	score=0;
	//产生两个随机数，并写入cells数组
	randomNumber();	
	randomNumber();	
	//更新界面
	updateView()
	//游戏状态为PALYING
//	state=PLAYING;
	var restart=document.getElementById('gameOver')
	restart.style.display='none'
}

//产生两个随机数
	//生成2或4，方法到cells随机位置
	function randomNumber () {
		//判断是否填满
		if(full()){
			return
		}
		//生成2或四
		var n=Math.random()<0.5?2:4;
		while(true){
			var row=parseInt(Math.random()*4)
			var col=parseInt(Math.random()*4)  
			if(cells[row][col]==0){
				//只有当前位置值为0时才算成功
				cells[row][col]=n;
				break
			}
		}
}
//	填满函数判断
	function full () {
		for (var row = 0; row < cells.length; row++) {   //行
			for (var col = 0; col < cells.length; col++) {  //列
				if(cells[row][col]==0){
					return false
				}
			}
		}
	return true;
	}
	//更新界面函数
	function updateView () {
		//将表格中的数据更新到界面显示
		//遍历cells，将每个位置上的数字更新到向对应的div中
		for (var row = 0; row < cells.length; row++) {   //行
				for (var col = 0; col < cells[row].length; col++) {  //列
					//代码重构
					var n=cells[row][col];
					var cell=$('cell'
						+row+col);
					//清空
					cell.innerHTML='';
					//所有cell均包含cell类
					cell.className='cell';
					//只有大于0时
					if(n!=0){
						cell.innerHTML=n;
						//设置相应的数字类
						cell.className='cell num'+n;
					}
			}
		}
		$('score').innerHTML=score;
		$('finalScore').innerHTML=score;
	}
	//工厂函数：获取指定id的元素
	function $ (id) {
		return document.getElementById(id)
	}
	
	
//1、添加初始化代码
init (); //开始第一局



$('newGame').onclick=init;//点击newGame新开一局
$('up').onclick=upAction;//点击newGame新开一局
$('left').onclick=leftAction;//点击newGame新开一局
$('rigth').onclick=rigthAction;//点击newGame新开一局
$('down').onclick=downAction;//点击newGame新开一局

/*******************************************************/
function upAction () {
	//1.判断能否向上
	if(canMoveUp ()){
		for (var col = 0; col < cells.length; col++) {
			//移动指定的列
			upCol(col);
		}
		//2.每次处理一个列
		
		
		//3.生成一个随机数
		randomNumber()
		//4.更新界面
		updateView()
		//5,判断结束
	}
		 gameOver()
}


//判断能否向上移动
function canMoveUp () {
	//按列遍历
	for (var col = 0; col< cells.length; col++) {
		for (var row = 1; row < cells.length; row++) {
			//两种移动
			//1.上方是空位
			if((cells[row][col]!=0) && (cells[row-1][col]==0)){
				return true;
			}
			//2.相领格子的值相等
			if(cells[row][col]!=0 && (cells[row-1][col]==cells[row][col])){
				return true;
			}

		}
	}
	return false;
}
//移动指定列内的cell
function upCol(col){
	//按行由至上而下处理
	for (var row = 0; row < cells.length;) {
		//获取当前格子
		var current=cells[row][col];
		//从上往下查找下一个数的位子
		var nextRow=getNextInCol(col,row+1,1)
		console.log('第'+col+'行，列'+row+'有数'+cells[row][col])
		
		if(nextRow==-1){
			return
		}
		var next=cells[nextRow][col];
		//当前位置是空格
		//当前位置是零，下一个数移动上去
		if(current==0){
			cells[row][col]=next;
			cells[nextRow][col]=0;
		}
		//当前位置有数，下一个数更他相等，此时需要合并
		else if(current==next){
			cells[row][col]=next+current;
			cells[nextRow][col]=0;
//			移动情况下不需要跳行
			score+=cells[row][col]
			row++;//合并时跳行
		}
		else{
			row++;//其他情况合并时跳行
			
		}
	}
	//
}
//按列查找下一个数的位置  行号
function getNextInCol (col,row,step) {
	while(true){
		//越界直接返回-1
		if(row<0||row>=4){
			return -1;
		}
		//若吃位置有大于0的数则row即是要查找的行号
		if(cells[row][col]!=0){
			return row;
		}
		row += step;  //正值向上移动，负值向下移动
	}
	
	
}

/*************************************************************************************/
function leftAction () {
		//1.判断能否向左
	if(canMoveLeft ()){
		for (var row = 0; row < cells.length; row++) {
			//移动指定的列
			leftRow(row);
		}
		//2.每次处理一个列
		
		
		//3.生成一个随机数
		randomNumber()
		//4.更新界面
		updateView()
	}
		//5,判断结束 不能移动的时候检测
		 gameOver()
	}
function canMoveLeft () {
		//按行遍历
	for (var row = 0; row < cells.length; row++) {
		for (var col = 0; col< cells.length; col++) {
			//两种移动
			//1.左方是空位
			if(cells[row][col]!=0 && cells[row][col-1]==0){
				return true;
			}
			//2.相领格子的值相等
			if(cells[row][col]!=0 && (cells[row][col-1]==cells[row][col])){
				return true;
			}
		}
	}
	return false;
}	
function leftRow(row) {
		//按列由至左而右处理
	for (var col = 0; col < cells.length;) {
		//获取当前格子
		var current=cells[row][col];
		//从上往下查找下一个数的位子
		var nextCol=getNextInRow(row,col+1,1)
		if(nextCol==-1){
			return
		}
		var next=cells[row][nextCol];
		//当前位置是空格
		//当前位置是零，下一个数移动上去
		if(current==0){
			cells[row][col]=next;
			cells[row][nextCol]=0;
		}
		//当前位置有数，下一个数更他相等，此时需要合并
		else if(current==next){
			cells[row][col]=next+current;
			cells[row][nextCol]=0;
//			移动情况下不需要跳行
			score+=cells[row][col]
			col++;//合并时跳列
		}
		else{
			col++;//其他情况合并时跳列
			
		}
	}
	 
}
function getNextInRow(row,col,step){
		while(true){
		//越界直接返回-1
		if(col<0||col>=4){
			return -1;
		}
		//若吃位置有大于0的数则row即是要查找的行号
		if(cells[row][col]!=0){
			return col;
		}
		col += step;  //正值向上移动，负值向下移动
	}
}

/***************************************************************************************/
function rigthAction () {
		//1.判断能否向左
	if(canMoveRight ()){
		for (var row = 0; row < cells.length; row++) {
			//移动指定的列
			rightRow(row);
		}
		//2.每次处理一个列
		
		
		//3.生成一个随机数
		randomNumber()
		//4.更新界面
		updateView()
	}
		//5,判断结束 不能移动的时候检测
		 gameOver()
	}
function canMoveRight () {
		//按行遍历
	for (var row = 0; row < cells.length; row++) {
		for (var col = 0; col< cells.length; col++) {
			//两种移动
			//1.左方是空位
			if(cells[row][col]!=0 && cells[row][col+1]==0){
				return true;
			}
			//2.相领格子的值相等
			if(cells[row][col]!=0 && (cells[row][col+1]==cells[row][col])){
				return true;
			}
		}
	}
	return false;
}	
function rightRow(row) {
		//按列由至左而右处理
	for (var col = 3; col >=0;) {
		//获取当前格子
		var current=cells[row][col];
		//从上往下查找下一个数的位子
		var nextCol=getNextInRow(row,col-1,-1)
		if(nextCol==-1){
			return
		}
		var next=cells[row][nextCol];
		//当前位置是空格
		//当前位置是零，下一个数移动上去
		if(current==0){
			cells[row][col]=next;
			cells[row][nextCol]=0;
		}
		//当前位置有数，下一个数更他相等，此时需要合并
		else if(current==next){
			cells[row][col]=next+current;
			cells[row][nextCol]=0;
//			移动情况下不需要跳行
			score+=cells[row][col]
			col--;//合并时跳列
		}
		else{
			col--;//其他情况合并时跳列
			
		}
	}
	 
}
function getNextInRow(row,col,step){
		while(true){
		//越界直接返回-1
		if(col<0||col>=4){
			return -1;
		}
		//若吃位置有大于0的数则row即是要查找的行号
		if(cells[row][col]!=0){
			return col;
		}
		col += step;  //正值向上移动，负值向下移动
	}
}



/**********************************************************************************/

function downAction () {
		//1.判断能否向下
	if(canMoveDown ()){
		for (var col = 0; col < cells.length; col++) {
			//移动指定的列
			downCol(col);
		}
		//2.每次处理一个列
		
		
		//3.生成一个随机数
		randomNumber()
		//4.更新界面
		updateView()
	}
		//5,判断结束 不能移动的时候检测
		 gameOver()
}
//判断能否向下移动
function canMoveDown () {
	//按列遍历
	for (var col = 0; col< cells.length; col++) {
		for (var row = 2; row >=0; row--) {
			//两种移动
			//1.下方是空位
			if(cells[row][col]!=0 && cells[row+1][col]==0){
				return true;
			}
			//2.相领格子的值相等
			if(cells[row][col]!=0 && (cells[row+1][col]==cells[row][col])){
				return true;
			}

		}
	}
	return false;
}
//移动指定列内的cell
function downCol(col){
	//按行由至下而上处理
	for (var row = 3; row >0;) {
		//获取当前格子
		var current=cells[row][col];
		//从下往上查找上一个数的位子
		var nextRow=getNextInCol(col,row-1,-1)	
		if(nextRow==-1){
			return
		}
		var next=cells[nextRow][col];
		//当前位置是空格
		//当前位置是零，上一个数移动下去
		if(current==0){
			cells[row][col]=next;
			cells[nextRow][col]=0;
		}
		//当前位置有数，下一个数更他相等，此时需要合并
		else if(current==next){
			cells[row][col]=next+current;
			cells[nextRow][col]=0;
//			移动情况下不需要跳行
			score+=cells[row][col]
			row--;//合并时跳行
		}
		else{
			row--;//其他情况合并时跳行
			
		}
	}
	//
}
//判断游戏是否结束
function gameOver () {
	//用空位就不结束
	if(!full()){
		return false
	}
	if(canMoveDown()||canMoveUp()){
		return false
	}
	sata=GAME_OVER;
	$('gameOver').style.display='block';
	return true
}


//滑动手势
var toucher = Toucher("#toucher"); 
//  绑定
toucher.on("swipeUp",function(ev){
	upAction()
	console.log(111)
});
toucher.on("swipeRight", function(ev){
	rigthAction()
	console.log(222)
});
toucher.on("swipeDown",function(ev){
	downAction()
	console.log(333)
});
toucher.on("swipeLeft",function(ev){
	leftAction()
	console.log(444)
});
//点击事件
toucher.on("singleTap","#rigth", function(ev){
	rigthAction()
	console.log(111)
});
toucher.on("singleTap","#left", function(ev){
	leftAction()
	console.log(222)
});
toucher.on("singleTap","#up", function(ev){
	upAction()
	console.log(333)
});
toucher.on("singleTap","#down", function(ev){
	downAction()
	console.log(444)
});
toucher.on("singleTap","#newGame", function(ev){
	init ()
	
	console.log(555)
});
toucher.on("singleTap","#restart", function(ev){
	init ()
	console.log(666)
});