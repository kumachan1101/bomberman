let keycode = [37, 38, 39, 40, 13];
let keypush = ["left", "up", "right", "down", "enter"];


class Move_Update_Enemy extends Move_Update{

	update_dropbom(cPlayerPos, playerval, cEnemyInput){
		if ( cPlayerPos.move === 0 ) {
			if ( cEnemyInput.enter === true ) {
				// 爆弾を置こうとした場所に既に爆弾があった場合は何もしない
				for(let cBom of bomlist) {	
					if((cBom.x == cPlayerPos.cPos.x) && (cBom.y == cPlayerPos.cPos.y)){
						return;
					}
				}

				let rand = Math.floor(Math.random() * 100);
				if(0 != rand){
					return;
				}
				
				let cFactory = new DBBom_update_factory();
				let cDB_update = cFactory.create_instance();
				let v = {x:cPlayerPos.cPos.x, y:cPlayerPos.cPos.y, user:playerval};
				cDB_update.update_db(v);
		
				cEnemyInput.enter = false;
			}
		}	
	}

	update(cCharaPos, cEnemyInput, cItemData){
        if ( cCharaPos.move === 0 ) {
            cEnemyInput.clear();
            let len = keycode.length;
            let rand = Math.floor(Math.random() * len);
            cEnemyInput.updatestate(keycode[rand] , true);
            cEnemyInput.push = keypush[rand];

        }
		this.update_moving(cCharaPos, cEnemyInput, cItemData);
		//this.update_dropbom(cCharaPos, playerval, cEnemyInput);
	}

}

class Enemy extends Character {

    constructor(sprite, x, y, playerval) {
		super(sprite, x, y, playerval);
		this.cEnemyInput = new Input();
		this.cDBEnemyControl = new DBEnemyControl(playerval);
	}

	move_sp() {
		let cMove_Update = new Move_Update_Enemy();
		cMove_Update.update(this.cCharaPos, this.cEnemyInput, this.cItemData);
	}

	update_chara_pos(){
		let cFactory = new DBEnemy_update_factory();
		let cDB_update = cFactory.create_instance();
		let v = {x:this.cCharaPos.cPos.x, y:this.cCharaPos.cPos.y, fire:this.cItemData.fire};
		cDB_update.update_db(v, this.cDBEnemyControl.DB_ENEMY);

	}
}