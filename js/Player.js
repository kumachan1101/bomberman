//プレイヤークラス
//x : プレイヤーのx座標
//y : プレイヤーのy座標
//move : プレイヤーをうまく動かすためのもの
//
//move_sp() : プレイヤーのスプライトを動かす

class CompareData{

	isUseBom(){
		let iMapUsedBom = cBomControl.getPlayerBomNum(cPlayerControl.playerID);
		let iPlayerUseBom = cPlayerControl.cPlayer.cItemData.bom;
		return iPlayerUseBom > iMapUsedBom;
	}
}

class PlayerPos{
	constructor(x, y){
		this.cPos = new Pos(x, y);
		this.move = 0;
	}
}

class Move_Update_Player extends Move_Update{

	update_dropbom(cPlayerPos, playerval){
		if ( cPlayerPos.move === 0 ) {
			if ( input.enter === true ) {

				let cCompareData = new CompareData();
				let bRet = cCompareData.isUseBom();
				if(bRet){
					//cDBBomControl.update_db(this.x, this.y, this.playerval);
					let cFactory = new DBBom_update_factory();
					let cDB_update = cFactory.create_instance();
					let v = {x:cPlayerPos.cPos.x, y:cPlayerPos.cPos.y, user:playerval, expl:false};
					cDB_update.update_db(v);
		
				}
				input.enter = false;
			}
		}	
	}

	update(cPlayerPos, playerval, cItemData){
		input.push_key();
		this.update_moving(cPlayerPos, input, cItemData);
		this.update_dropbom(cPlayerPos, playerval);
	}
}

class Player extends Character {

	constructor(sprite, x, y, playerval) {
		super(sprite, x, y, playerval);
		this.cDBPlayerControl = new DBPlayerControl(playerval);
	}

	move_sp() {
		let cMove_Update = new Move_Update_Player();
		cMove_Update.update(this.cCharaPos, this.playerval, this.cItemData);
	}

	update_chara_pos(){
		//this.cDBPlayerControl.update_db(this.x, this.y, this.cItemData.fire);
		let cFactory = new DBPlayer_update_factory();
		let cDB_update = cFactory.create_instance();
		let v = {x:this.cCharaPos.cPos.x, y:this.cCharaPos.cPos.y, fire:this.cItemData.fire};
		cDB_update.update_db(v);

	}
}
