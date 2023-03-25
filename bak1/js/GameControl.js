
//グローバル変数の定義
let canvas;
let ctx;
 
//マップの作成（さくせい）
/*
let map = [
	[0, 0, 1, 0, 1, 0, 0, 0 ,0 ,1 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,1 ,0],
	[0, 1, 0, 0, 0, 1, 1, 1 ,0 ,1 ,0 ,1 ,1 ,0 ,1 ,1 ,1 ,0 ,1 ,0],
	[0, 0, 1, 1, 0, 0, 0, 1 ,0 ,0 ,0 ,1 ,0 ,0 ,0 ,1 ,0 ,0 ,0 ,0],
	[1, 0, 1, 0, 1, 1, 0, 0 ,0 ,1 ,1 ,1 ,1 ,1 ,0 ,0 ,1 ,0 ,1 ,0],
	[0, 0, 0, 0, 0, 1, 1, 1 ,0 ,1 ,0 ,0 ,0 ,0 ,1 ,1 ,0 ,1 ,1 ,0],
	[0, 1, 1, 1, 0, 0, 0, 0 ,0 ,1 ,0 ,1 ,1 ,1 ,0 ,1 ,0 ,0 ,0 ,0],
	[0, 1, 1, 1, 0, 1, 1, 1 ,1 ,1 ,0 ,1 ,0 ,0 ,0 ,0 ,1 ,1 ,1 ,0],
	[0, 0, 0, 1, 0, 0, 0, 0 ,1 ,0 ,0 ,1 ,0 ,1 ,1 ,0 ,0 ,0 ,1 ,0],
	[1, 1, 0, 1, 1, 1, 1, 1 ,1 ,0 ,1 ,1 ,0 ,0 ,1 ,1 ,1 ,0 ,1 ,1],
	[1, 0, 0, 0, 0, 0, 1, 1 ,0 ,0 ,0 ,0 ,1 ,0 ,1 ,1 ,0 ,0 ,1 ,0],
	[1, 0, 1, 1, 1, 0, 0, 0 ,1 ,0 ,1 ,0 ,0 ,0 ,0 ,0 ,1 ,1 ,0 ,0],
	[1, 0, 1, 0, 1, 1, 1, 0 ,1 ,0 ,1 ,1 ,0 ,1 ,1 ,0 ,0 ,0 ,0 ,1],
	[0, 0, 1, 0, 0, 1, 0, 0 ,1 ,0 ,0 ,1 ,0 ,1 ,0 ,1 ,1 ,1 ,0 ,0],
	[0, 1, 1, 1, 0, 1, 0, 1 ,0 ,0 ,1 ,1 ,0 ,1 ,0 ,1 ,1 ,0 ,1 ,0],
	[0, 0, 0, 1, 0, 1, 0, 0 ,1 ,0 ,1 ,1 ,0 ,1 ,0 ,0 ,0 ,0 ,0 ,0],
	[1, 1, 0, 1, 0, 1, 0, 1 ,1 ,0 ,0 ,1 ,0 ,1 ,1 ,0 ,1 ,1 ,1 ,0],
	[0, 0, 0, 1, 0, 1, 1, 1 ,1 ,1 ,0 ,1 ,0 ,1 ,1 ,0 ,0 ,0 ,1 ,0],
	[0, 1, 1, 1, 0, 1, 0, 0 ,0 ,0 ,0 ,1 ,0 ,0 ,0 ,1 ,1 ,0 ,1 ,1],
	[0, 1, 0, 0, 0, 1, 0, 1 ,1 ,1 ,0 ,0 ,1 ,1 ,0 ,1 ,0 ,0 ,0 ,0],
	[0, 0, 0, 1, 0, 0, 0, 1 ,1 ,1 ,1 ,0 ,0 ,0 ,1 ,1 ,1 ,1 ,1 ,0]
]
*/
let map = [];
function imageGuard(selector){

	var guard_selector = document.querySelectorAll(selector);
  
	for(var n = 0; n < guard_selector.length; n++){
	  guard_selector[n].addEventListener("contextmenu", function(e){
		e.preventDefault();
	  }, false);
	}
  
	var guard_style = {
	  'pointer-events':'none',
	  '-webkit-touch-callout':'none',
	  '-moz-touch-callout':'none',
	  'touch-callout':'none',
	  '-webkit-user-select':'none',
	  '-moz-user-select':'none',
	  'user-select':'none'
	}
  
	Object.keys(guard_style).forEach(function(v, i, a){
	  for(var n = 0; n < guard_selector.length; n++){
		guard_selector[n].style[v] = guard_style[v];
	  }
	});
  
  }
  
  document.addEventListener("DOMContentLoaded", function() {
	imageGuard('img');
  });


//スプライトクラス
//img : スプライトに使う画像
//left : 画像の左から何ピクセルの部分を使うか
//top : 画像の上から何ピクセルの部分を使うか
class Sprite {
	constructor( img, left, top ) {
		this.left = left || 0;
    		this.top = top || 0;
		this.img = new Image();
		this.img.src = img;
		this.width = 32;
		this.height = 32;
	}
}
 
//ゲームクラス
//width : ゲーム全体の横幅
//height : ゲーム全体の縦幅
//
//add() : ゲームにスプライトを表示
class Game {
	constructor( width, height ) {
		this.width = width || 320;
		this.height = height || 320;
 
		canvas = document.getElementById( 'canvas' );
		canvas.width = this.width;		//canvasの横幅（よこはば）
		canvas.height = this.height;		//canvasの縦幅（たてはば
 
		ctx = canvas.getContext( '2d' );
	}
	add( sprite, x, y ) {
		if ( typeof x === "undefined" ) sprite.x = 0;
		else sprite.x = x;
		if ( typeof y === "undefined" ) sprite.y = 0;
		else sprite.y = y;
		// http://www.htmq.com/canvas/drawImage_s.shtml
		// drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
		// sはsourceでデータ元、dはdestinationで反映先
		ctx.drawImage( sprite.img, sprite.left, sprite.top, sprite.width, sprite.height, sprite.x, sprite.y ,sprite.width, sprite.height );
	}
}
 
//入力（Input）クラス
//up : 上キー
//left : 左キー
//down : 下キー
//right : 右キー
class Input {
	constructor() {
		this.up = false;
		this.left = false;
		this.down = false;
		this.right = false;
		this.enter = false;

		this.init_ui();
	}
	push_key() {
		addEventListener( "keydown", () => {
			const key_code = event.keyCode;
			if( key_code === 37 ) this.left = true;
			if( key_code === 38 ) this.up = true;
			if( key_code === 39 ) this.right = true;
			if( key_code === 40 ) this.down = true;
			if( key_code === 13 ) this.enter = true;

			event.preventDefault();		//方向キーでブラウザがスクロールしないようにする
		}, false);
		addEventListener( "keyup", () => {
			const key_code = event.keyCode;
			if( key_code === 37 ) this.left = false;
			if( key_code === 38 ) this.up = false;
			if( key_code === 39 ) this.right = false;
			if( key_code === 40 ) this.down = false;
			if( key_code === 13 ) this.enter = false;
		}, false);
	}

	init_ui(){
		document.getElementById('btnright').addEventListener('pointerdown', () => {
		const intervalId = setInterval(pushing_btnright, 100)
		
		document.addEventListener('pointerup', () => {
			this.right = false;
			clearInterval(intervalId)
			}, { once: true })
		})
		const pushing_btnright = () => {
			this.right = true;
		}
	
		document.getElementById('btnleft').addEventListener('pointerdown', () => {
			const intervalId = setInterval(pushing_btnleft, 100)
	
			document.addEventListener('pointerup', () => {
				this.left = false;
				clearInterval(intervalId)
			}, { once: true })
		})
		const pushing_btnleft = () => {
			this.left = true;
		}

		document.getElementById('btnup').addEventListener('pointerdown', () => {
			const intervalId = setInterval(pushing_btnup, 100)
			
			document.addEventListener('pointerup', () => {
				this.up = false;
				clearInterval(intervalId)
			}, { once: true })
		})
		const pushing_btnup = () => {
			this.up = true;
		}
		
		document.getElementById('btndown').addEventListener('pointerdown', () => {
			const intervalId = setInterval(pushing_btndown, 100)
	
			document.addEventListener('pointerup', () => {
				this.down = false;
				clearInterval(intervalId)
			}, { once: true })
		})
		const pushing_btndown = () => {
			this.down = true;
		}

		document.getElementById('btnenter').addEventListener('pointerenter', () => {
			const intervalId = setInterval(pushing_btnenter, 100)
	
			document.addEventListener('pointerup', () => {
				this.enter = false;
				clearInterval(intervalId)
			}, { once: true })
		})
		const pushing_btnenter = () => {
			this.enter = true;
		}

	}
}

//inputオブジェクトの作成
let input = new Input();


//ゲームオブジェクトの作成
let game = new Game( 640, 640 );

//床、壁のマップチップのオブジェクトを作成
let floor = new Sprite( 'img/map.png', 0, 0 );
let wall = new Sprite( 'img/map.png', 33, 0 );
 

function ChangeplayerID(event) {
    cPlayerControl.SetPlayer(event.currentTarget.value);
}

