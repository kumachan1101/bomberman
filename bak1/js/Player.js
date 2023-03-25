//プレイヤークラス
//x : プレイヤーのx座標
//y : プレイヤーのy座標
//move : プレイヤーをうまく動かすためのもの
//
//move_sp() : プレイヤーのスプライトを動かす
class Player {
	constructor(sprite, x, y, playerval) {
		this.sprite = sprite;
		// 移動中を表現するために、座標に対して32掛け算した値を設定
		this.x = x;
		this.y = y;
		this.move = 0;
        this.playerval = playerval;
        this.bAlive = true;
		this.cDBPlayerControl = new DBPlayerControl(playerval);
	}

	update_player_pos(){
		this.cDBPlayerControl.update_pos(this.x, this.y);
	}

	updated_player_pos(x, y){
		this.x = x;
		this.y = y;
	}

	move_sp() {
		input.push_key();
		//game.add( this.sprite, this.x, this.y );
		if ( this.move === 0 ) {
			if ( input.left === true ) {
				var x = this.x/32;
				var y = this.y/32;
				x--;
				if ( map[y][x] === 0 && !cBomControl.isExsistBom(x, y)) {
					this.move = 32;
					input.push = 'left';
				}
			}
			if ( input.up === true ) {
				var x = this.x/32;
				var y = this.y/32;
				if ( y > 0) {
					y--;
					if ( map[y][x] === 0 && !cBomControl.isExsistBom(x, y)) {
						this.move = 32;
						input.push = 'up';
					}
				}
			}
			if ( input.right === true ) {
				var x = this.x/32;
				var y = this.y/32;
				x++;
				if ( map[y][x] === 0 && !cBomControl.isExsistBom(x, y)) {
					this.move = 32;
					input.push = 'right';
				}
			}
			if ( input.down === true ) {
				var x = this.x/32;
				var y = this.y/32;
				if ( y < 19 ) {
					y++;
					if ( map[y][x] === 0 && !cBomControl.isExsistBom(x, y)) {
						this.move = 32;
						input.push = 'down';
					}
				}
			}
			if ( input.enter === true ) {
				// 爆弾を置こうとした場所に既に爆弾があった場合は何もしない
				for(var i = 0;  i < bomlist.length;  i++  ) {
					if((bomlist[i].x == this.x) && (bomlist[i].y == this.y)){
						return;
					}
				}
				
				let time = new Date();
				let cbom = new bom(this.x, this.y, time.getTime(), 3);
				bomlist.push(cbom);
				cDBBomControl.update_pos(this.x, this.y, this.playerval)
			}
		}
 
		//this.moveが0より大きい場合は、4pxずつ移動（いどう）を続ける
		if (this.move > 0) {
			this.move -= 4;
			if ( input.push === 'left' ) this.x -= 4;
			if ( input.push === 'up' ) this.y -= 4;
			if ( input.push === 'right' ) this.x += 4;
			if ( input.push === 'down' ) this.y += 4;
		}
	}
}
 