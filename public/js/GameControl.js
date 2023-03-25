
//グローバル変数の定義
let canvas;
let context;
let vcanvas;
let vcontext;
let map = [];
let CHARACTER_LARGE = 32;
let MAPLEN = 1280;
let MAPX = MAPLEN/32;
let MAPY = MAPX;
let DBBOM_NUM = 50;
let DBITEM_NUM = 50;
let DBBLOCK_NUM = 300;
let SCREEN_WIDTH = MAPLEN/2;
let SCREEN_HEIGHT = MAPLEN/2;
let CAMERAX = 0;
let CAMERAY = 0;
let last_posx = SCREEN_WIDTH/2;
let last_posy = SCREEN_HEIGHT/2;

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
		this.width = CHARACTER_LARGE;
		this.height = CHARACTER_LARGE;
	}
}
 
//ゲームクラス
//width : ゲーム全体の横幅
//height : ゲーム全体の縦幅
//
//add() : ゲームにスプライトを表示
class GameControl {
	constructor( width, height ) {
		// 描画画面
		canvas = document.getElementById('can');
		canvas.width = width;
		canvas.height = height;
 		context = canvas.getContext( '2d' );

		// 仮想画面
		vcanvas = document.createElement("canvas");
		vcanvas.width = MAPLEN;
		vcanvas.height = MAPLEN;
 		vcontext = vcanvas.getContext( '2d' );

		Reset_update_select_btn();
	}

	add( sprite, x, y ) {
		if ( typeof x === "undefined" ) sprite.x = 0;
		else sprite.x = x;
		if ( typeof y === "undefined" ) sprite.y = 0;
		else sprite.y = y;
		// http://www.htmq.com/canvas/drawImage_s.shtml
		// drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
		// sはsourceでデータ元、dはdestinationで反映先
		if(CAMERAX-CHARACTER_LARGE <= sprite.x && sprite.x <= CAMERAX+SCREEN_WIDTH+CHARACTER_LARGE && CAMERAY-CHARACTER_LARGE <= sprite.y && sprite.y <= CAMERAY+SCREEN_HEIGHT+CHARACTER_LARGE){
			vcontext.drawImage( sprite.img, sprite.left, sprite.top, sprite.width, sprite.height, sprite.x, sprite.y ,sprite.width, sprite.height );
		}
	}

	isWall(x, y){
		return (x % 2 == 1) && (y % 2 == 1);
	}

	update_block_and_item(){
		
	}

	update_map(){
		for (var y=0; y<MAPY; y++) {
			/* https://prokatsu.com/javascript_array/ */
			map[y] = [];
			for (var x=0; x<MAPX; x++) {
				if (this.isWall(x, y)) {
					map[y][x] = 1;
					this.add( wall, CHARACTER_LARGE*x, CHARACTER_LARGE*y );
				}
				else {
					map[y][x] = 0;
					this.add( floor, CHARACTER_LARGE*x, CHARACTER_LARGE*y );
					if (bFlag/* && !cBlockControl.bCreate*/){
						let bRet = cBlockControl.create_rand(x, y);
						if(bRet){
							cItemFieldControl.create_rand(x, y);
						}
					}
				}
			}
		}	
	}

    update_camera(posx, posy){
        if ((SCREEN_WIDTH/2 < posx) && (posx < (MAPLEN - SCREEN_WIDTH/2))){
            if(last_posx != posx){
                let diff = posx - last_posx;
                CAMERAX = CAMERAX + diff;
                last_posx = posx;
            }
        }
        if ((SCREEN_HEIGHT/2 < posy) && (posy < (MAPLEN - SCREEN_HEIGHT/2))){
            if(last_posy != posy){
                let diff = posy - last_posy;
                CAMERAY = CAMERAY + diff;
                last_posy = posy;
            }
        }
    }

	update(){
		context.drawImage(vcanvas, CAMERAX, CAMERAY, SCREEN_WIDTH, SCREEN_HEIGHT, 0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
	}

	isExsist(x, y){
		return (map[y][x] === 1);
	}

}



class Input {

	constructor() {
		this.clear();
	}

	clear(){
		this.up = false;
		this.left = false;
		this.down = false;
		this.right = false;
		this.enter = false;
		this.push = "";
	}

    updatestate(key_code, bState){
		switch(key_code){
		case 37:
			this.left = bState;
			break;
		case 38:
			this.up = bState;
			break;
		case 39:
			this.right = bState;
			break;
		case 40:
			this.down = bState;
			break;
		case 13:
			this.enter = bState;
			break;
		}
	}
}
//入力（Input）クラス
//up : 上キー
//left : 左キー
//down : 下キー
//right : 右キー
class InputPlayer extends Input {
	constructor() {
		super();
		this.init_ui();
	}
	push_key() {
		addEventListener( "keydown", () => {
			const key_code = event.keyCode;
			this.updatestate(key_code, true);
			event.preventDefault();		//方向キーでブラウザがスクロールしないようにする
		}, false);
		addEventListener( "keyup", () => {
			const key_code = event.keyCode;
			this.updatestate(key_code, false);
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
let input = new InputPlayer();

//床、壁のマップチップのオブジェクトを作成
let floor = new Sprite( 'img/map.png', 0, 0 );
let wall = new Sprite( 'img/map.png', 33, 0 );
 
let cDBPlayerSelect = new DBPlayerSelect();
let BTN_ID1 = '1';
let BTN_ID2 = '2';
let BTN_ID3 = '3';
//let BTN_START = 'start';

document.getElementById(BTN_ID1).onclick = function(){
	cDBPlayerSelect.update_select(BTN_ID1, true);
	cPlayerControl.SetPlayer("rico");
};
document.getElementById(BTN_ID2).onclick = function(){
	cDBPlayerSelect.update_select(BTN_ID2, true);
	cPlayerControl.SetPlayer("aru");
};
document.getElementById(BTN_ID3).onclick = function(){
	cDBPlayerSelect.update_select(BTN_ID3, true);
	cPlayerControl.SetPlayer("yamada");
};


function judge_Player_stop(x, y, cItemData){
	if(cGameControl.isExsist(x, y)){
		return true;
	}
	if(cBomControl.isExsist(x, y)){
		return true;
	} 
	if(false == cItemData.wall){
		if(cBlockControl.isExsist(x,y)){
			return true;
		}
	}
	return false;
}

/*
function ChangeplayerID(event) {
    cPlayerControl.SetPlayer(event.currentTarget.value);
}

let btn_player_sel = [];
btn_player_sel.push(new Button(BTN_ID1, "rico"));
btn_player_sel.push(new Button(BTN_ID2, "aru"));
btn_player_sel.push(new Button(BTN_ID3, "yamada"));

function Start() {
	cDBPlayerSelect.update_select(BTN_ID1, true);
	cDBPlayerSelect.update_select(BTN_ID2, true);
	cDBPlayerSelect.update_select(BTN_ID3, true);
}
const btn_start = document.getElementById(BTN_START);

*/
/*
class Button {
	constructor(BTN_ID, name){
		self.btn_id = BTN_ID;
		self.btn = document.getElementById(self.btn_id);
		self.name = name;
	}

	get_btn_id(){
		return self.btn_id;
	}

	get_btn_name(){
		return self.name;
	}

	set_disable(bDisable){
		if(bDisable){
			self.btn.disabled = true;
		}
		else{
			self.btn.disabled = null;
		}
	}
}
*/