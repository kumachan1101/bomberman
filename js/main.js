/* https://bomberman-cc18d.web.app */
/*
・画面のサイズを広げる対応で、コードがぐちゃぐちゃなので、責務分担をはっきりさせる。
・アイテムは付け外しが出来るように
  ・壁すり抜けしたが、壁の上に爆弾が置ける。DBの爆弾の座標がプレイヤーの座標で精度が高いので
  　マス単位で登録した方が良い。移動中の座標に爆弾は置かないので。
  　そうすれば、爆弾の位置判定は、CHARACTER_LARGEを使わなくてよくなる。
  　CHARACTER_LARGEの使用箇所が多いのでやめる。  

　
  ・時限爆弾アイテム
　時限爆弾を実行するキーを新たに割り当てる。「0」キーにしよう。ソフトボタンも追加する。
  ソフトボタンは、アイテムを取得していないときはトーンダウンする
　DBの爆弾に、時限爆弾かどうかのフラグを追加する。
　爆発するかどうかのフラグの方が良いかもしれない。爆発させたいタイミングでフラグを立てる。
　フラグの変化があったら爆発させることで、全ての環境で爆発する。
　
　時限爆弾の場合は、Bomのupdatetimeの更新は実施しない。
　「0」キー押下で、RestTimeを0にする、そうすると、爆弾が発火する。

　・足のスピードを増減 →　あまりメリットなし
　・ブロックを置けるように
　・石破壊爆弾 → 微妙
　・爆弾すり抜け
　・炎無敵

・プレイヤーの位置を攻めてくる、爆弾からは離れるような頭がいい敵を用意する
・敵が爆弾を置けるキャラクターも追加→自爆してしまうからやめる
・クラス図を作成し、SOLID原則に従っているか確認する
→下記に格納しているので随時見直す
　C:\Users\kumac\OneDrive\デスクトップ\hiroaki\uml
・1つのデータを操作するクラスになっているか
・変更しやすいクラスには依存せず、抽象クラスに依存するようにする
・定数はdefine定義する。
・別の爆弾に爆発が当たったら誘発する事
・PlyaerControlがPlayerの中身を制御する
・爆弾の状態遷移である待機→爆発→消火は状態管理する。BomControlで行う。
・GameControlのクラスを用意して、ゲーム情報を保持
・キャラクター画像を選択して、既に選択済みの場合は、ほかのユーザーは選択できないようにする。全員選択完了したら、キャラクターを全員動けるようにする。
→ユーザーを選択したら、キャラクターを表示するようにする。
*/

'use strict';

//ゲームオブジェクトの作成
let cGameControl = new GameControl( SCREEN_WIDTH, SCREEN_HEIGHT );
let cPlayerControl = new PlayerControl();
let cEnemyControl = new EnemyControl();
let cBomControl = new BomControl();
//let cDBPlayerControl = new DBPlayerControl();
let cDBBomControl = new DBBomControl(DBBOM_NUM);
let cBlockControl = new BlockControl();
let cDBBlockControl = new DBBlockControl(DBBLOCK_NUM);
let cDBItemControl = new DBItemControl(DBITEM_NUM);
let cItemFieldControl = new ItemFieldControl();
//init();
//メインループ
function main() {
	cGameControl.update_map();
	cEnemyControl.update();
	cItemFieldControl.update();
	cBlockControl.update();
	cPlayerControl.update();
	cBomControl.update();
	cGameControl.update();
	requestAnimationFrame( main );
}
addEventListener('load', main(), false);
