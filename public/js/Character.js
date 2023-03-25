//プレイヤークラス
//x : プレイヤーのx座標
//y : プレイヤーのy座標
//move : プレイヤーをうまく動かすためのもの
//
//move_sp() : プレイヤーのスプライトを動かす

class CharaPos{
	constructor(x, y){
		this.cPos = new Pos(x, y);
		this.move = 0;
	}
}

class Move_Update{

	constructor(){
		this.funclist = [
			[function(input){return input.left;}, function(cPos){return cPos.x > 0}, function(cPos){cPos.x--;}, function(input){input.push = 'left';}],
			[function(input){return input.up;}, function(cPos){return cPos.y > 0}, function(cPos){cPos.y--;}, function(input){input.push = 'up';}],
			[function(input){return input.right;}, function(cPos){return cPos.x < MAPX-1}, function(cPos){cPos.x++;}, function(input){input.push = 'right';}],
			[function(input){return input.down;}, function(cPos){return cPos.y < MAPY-1}, function(cPos){cPos.y++;}, function(input){input.push = 'down';}]
		];
	}

	update_moving(cCharaPos, cInput, cItemData){

		if ( cCharaPos.move === 0 ) {
			let x = cCharaPos.cPos.x/CHARACTER_LARGE;
			let y = cCharaPos.cPos.y/CHARACTER_LARGE;
			let cPos = new Pos(x, y);

			for(let func of this.funclist){
				if(func[0](cInput) && func[1](cPos)){
					func[2](cPos);
					if ( !judge_Player_stop(cPos.x, cPos.y, cItemData)) {
						cCharaPos.move = CHARACTER_LARGE;
						func[3](cInput);
					}
					break;
				}
			}
		}
		//this.moveが0より大きい場合は、4pxずつ移動（いどう）を続ける
		if (cCharaPos.move > 0) {
			cCharaPos.move -= 4;
			if ( cInput.push === 'left' ) cCharaPos.cPos.x -= 4;
			if ( cInput.push === 'up' ) cCharaPos.cPos.y -= 4;
			if ( cInput.push === 'right' ) cCharaPos.cPos.x += 4;
			if ( cInput.push === 'down' ) cCharaPos.cPos.y += 4;
		}
	}

}

class Character {
	constructor(sprite, x, y, playerval) {
		this.sprite = sprite;
		// 移動中を表現するために、座標に対してCHARACTER_LARGE掛け算した値を設定
		this.x = x;
		this.y = y;
		this.move = 0;
		this.cCharaPos = new CharaPos(x, y);
        this.playerval = playerval;
		
		this.cItemData = new ItemData();
	}

	updated_chara_pos(x, y, fire){
		this.cCharaPos.cPos.x = x;
		this.cCharaPos.cPos.y = y;
		this.cItemData.fire = fire;
	}

	//move_sp() {
	//	let cMove_Update = new Move_Update();
	//	cMove_Update.update(this.cCharaPos, this.playerval);
	//}


}
