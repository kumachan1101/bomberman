/*
時系列に並べると以下
■はリセット押下ユーザーのみ影響
★は他ユーザーも含めて影響

■リセット押下
・bFlagがtrue
・DBブロックリストクリア
・DBbCreateがfalse

★DBブロックリストクリア完了
※クリア後は何もしない(無効値は内部ブロックリストには反映しないように制御。爆弾によりブロックを壊す場合など、各ユーザーのタイミングで削除するため)

★DBbCreateがfalse完了
・内部bCreateがfalse
・内部ブロックリストクリア

■update(bFlagがtrueの場合)
・DBブロックリスト乱数生成

★DBブロックリスト乱数完了
・内部ブロックリスト乱数生成
・DBbCreateがtrue
・bFlagがfalse

★DBbCreateがtrue完了
・内部bCreateがtrue

*/



// resetボタンを押下したかどうか
let bFlag = false;

function Reset_update_select_btn() {
	cDBPlayerSelect.update_select(BTN_ID1, false);
	cDBPlayerSelect.update_select(BTN_ID2, false);
	cDBPlayerSelect.update_select(BTN_ID3, false);
}


function init(){
	cPlayerControl = new PlayerControl();
	cEnemyControl = new EnemyControl();
	cBomControl = new BomControl();
	cDBBomControl = new DBBomControl(DBBOM_NUM);
	cBlockControl = new BlockControl();
	cDBBlockControl = new DBBlockControl(DBBLOCK_NUM);
	cDBItemControl = new DBItemControl(DBITEM_NUM);
	cItemFieldControl = new ItemFieldControl();
	CAMERAX = 0;
	CAMERAY = 0;
	//cDBBlockControl.init_db();
	//cDBItemControl.init_db();
}

let BTN_RESET = 'reset';
const btn_reset = document.getElementById(BTN_RESET);
btn_reset.onclick  = function(){
	Reset_update_select_btn();
	//cDBBlockControl.update_Create(false);
	
	let cFactory = new DBCreate_update_factory();
	let cDB_update = cFactory.create_instance();
	let v = {bCreate:false};
	cDB_update.update_db(v);
	
	UpdateEnemy();

	bFlag = true;
	//init();
	//cDBBlockControl.init_db();
	//cDBItemControl.init_db();
	//cDBBomControl.init_db();
};

function UpdateEnemy(){
	let cFactory = new DBEnemy_update_factory();
	let cDB_update = cFactory.create_instance();
	let rand = Math.floor(Math.random() * 1000000000);
	cDB_update.setid(rand);
	cEnemyControl.set_useid(rand);
}
