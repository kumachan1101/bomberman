/* https://bomberman-cc18d.web.app */
/*
・ブロックとブロックの下にアイテム
・アイテムは付け外しが出来るように
・別の爆弾に爆発が当たったら誘発する事
・PlyaerControlがPlayerの中身を制御する
・爆弾の状態遷移である待機→爆発→消火は状態管理する。BomControlで行う。
・GameControlのクラスを用意して、ゲーム情報を保持
・キャラクター画像を選択して、既に選択済みの場合は、ほかのユーザーは選択できないようにする。全員選択完了したら、キャラクターを全員動けるようにする。
・やられて消えた後も、キャラクターが裏では動いていて爆弾は置ける状態になっているので、動けないように制御する。
・画面サイズは環境に合わせ縮尺するように
*/

'use strict';

let cPlayerControl = new PlayerControl();
let cBomControl = new BomControl();
let cDBBomControl = new DBBomControl();
let cBlockControl = new BlockControl();

//メインループ
function main() {
	//塗（ぬ）りつぶす色を指定（してい）
	ctx.fillStyle = "rgb( 0, 0, 0 )";
	//塗（ぬ）りつぶす
	ctx.fillRect(0, 0, 640, 640);
 
	//マップを表示する
	/*
	for (var y=0; y<map.length; y++) {
		for (var x=0; x<map[y].length; x++) {
			if ( map[y][x] === 0 ) game.add( floor, 32*x, 32*y );
			if ( map[y][x] === 1 ) game.add( wall, 32*x, 32*y );
		}
	}
	*/
	for (var y=0; y<20; y++) {
		/* https://prokatsu.com/javascript_array/ */
		map[y] = [];
		for (var x=0; x<20; x++) {
			if ((x % 2 == 1) && (y % 2 == 1)) {
				map[y][x] = 1;
				game.add( wall, 32*x, 32*y );
			}
			else {
				map[y][x] = 0;
				game.add( floor, 32*x, 32*y );
				cBlockControl.create_rand(x, y);
			}
		}
	}
 
	//cPlayerControl.AddSprite();
	cBlockControl.update();
	cBomControl.update();
	cPlayerControl.update();
 
	requestAnimationFrame( main );
}
addEventListener('load', main(), false);
