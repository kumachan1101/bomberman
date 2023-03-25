// database
var database = firebase.database();
let room = "bomberman";
// databaseURL
// https://console.firebase.google.com/project/bomberman-cc18d/database/bomberman-cc18d-default-rtdb/data

let DB_PLAYER_ID  = "DB_PLAYER";
let DB_ENEMY_ID  = "DB_ENEMY";
let DB_ENEMY_USE_ID  = "DB_ENEMY_USE";
let DB_BOM_ID     = "DB_BOM";
let DB_PLAYER_SEL_ID = "DB_PLAYER_SEL";
let DB_BLOCK_ID = "DB_BLOCK";
let DB_BLOCK_CREATE_ID = "DB_BLOCK_CREATE";
let DB_ITEM_ID = "DB_ITEM";

class DBData{
    constructor(no){
        this.no = no;
        this.bUse = false;
        this.x = -1;
        this.y = -1;
    }

    use(){
        this.bUse = true;
    }

    end(){
        this.bUse = false;
    }
}

class DBDataControl{
    constructor(num, DB_ID){
        this.DB_ID = DB_ID;
        this.dblist = [];
        this.num = num;
        for(let i = 0; i < this.num; i++){
            this.dblist.push(new DBData(i));
        }
        this.init_db();
    }

    init_db(){
        let str;
        for(let i = 0; i < this.dblist.length; i++){
            if(i < 10){
                str = "00" + String(i);
            }
            else if(i < 100){
                str = "0" + String(i);
            }
            else{
                str = String(i);
            }
            database.ref(room).child(this.DB_ID + str).update({
                x: -1,
                y: -1
            });

            this.dblist[i].bUse = false;
        }
    }


    deldata(x, y){
        for(let i = 0; i < this.dblist.length; i++){
            if(this.dblist[i].x == x && this.dblist[i].y == y){
                this.dblist[i].x = -1;
                this.dblist[i].y = -1;
                this.dblist[i].bUse = false;
            }
        }
    }

    use_db_id(x, y, BASE_ID){
        let DB_ID= "INVALID";
        let str;

        for(let i = 0; i < this.num; i++){
            if(i < 10){
                str = "00" + String(i);
            }
            else if(i < 100){
                str = "0" + String(i);
            }
            else{
                str = String(i);
            }

            if (false == this.dblist[i].bUse){
                DB_ID = BASE_ID + str;
                this.dblist[i].use();
                this.dblist[i].x = x;
                this.dblist[i].y = y;
                return DB_ID;
            }
        }
        return DB_ID;
    }
}


class DBItemControl extends DBDataControl{

    constructor(num){
        super(num, DB_ITEM_ID);
    }
/*
    init_db(){
        let str;
        for(let i = 0; i < this.dblist.length; i++){
            if(i < 10){
                str = "0" + String(i);
            }
            else{
                str = String(i);
            }
            database.ref(room).child(DB_ITEM_ID + str).update({
                x: -1,
                y: -1,
                item: -1
            });
        }
    }
*/
    invalid_data(dbid){
        database.ref(room).child(dbid).update({
            x: -1,
            y: -1
        });
    }   
} 

class DBBomControl extends DBDataControl{
    constructor(num){
        super(num, DB_BOM_ID);
    }

}

class DBBlockControl extends DBDataControl{

    constructor(num){
        super(num, DB_BLOCK_ID);
        //this.init_db();
    }
/*
    init_db(){
        let str;
        for(let i = 0; i < this.dblist.length; i++){
            if(i < 10){
                str = "0" + String(i);
            }
            else{
                str = String(i);
            }
            database.ref(room).child(DB_BLOCK_ID + str).update({
                x: -1,
                y: -1
            });
        }
    }
*/
}

class DBPlayerControl{

    constructor(playerval){
        this.DB_PLAYER = this.get_db_id(playerval);
    }

    get_db_id(playerval){
        let DB_PLAYER = DB_PLAYER_ID + String(playerval);
        return DB_PLAYER;
    }
}

class DBEnemyControl{

    constructor(playerval){
        this.DB_ENEMY = this.get_db_id(playerval);
        database.ref(room).child(this.DB_ENEMY).update({
            x: -1,
            y: -1,
            fire: -1
        });
    }

    get_db_id(playerval){
        let str;
        if(playerval < 10){
            str = "0" + String(playerval);
        }
        else{
            str = String(playerval);
        }
        let DB_ENEMY = DB_ENEMY_ID + str;
        return DB_ENEMY;
    }


}


class DBPlayerSelect{
    constructor(){
        this.DB_PLAYER_SEL = DB_PLAYER_SEL_ID;
    }

    update_select(id, bSel){
        database.ref(room).child(this.DB_PLAYER_SEL + String(id)).update({
            select: bSel
        });
    }

    updated_select(id, bSel){
    }
}

let factorylist = [
                new DBPlayer_updated_factory(),
                new DBEnemy_updated_factory(),
                new DBEnemy_useid_updated_factory(),
                new DBBom_updated_factory(),
                new DBItem_updated_factory(),
                new DBBlock_updated_factory(),
                new DBCreate_updated_factory()
            ];

database.ref(room).on("child_changed", function(data) {
    var key = data.key;
    const v = data.val();
    
    for(let cFactory of factorylist) {    
        let bRet = cFactory.judge_id(key);
        if(bRet){
            let cDB_updated = cFactory.create_instance();
            cDB_updated.updated_db(v, key); 
        }
    }
});

database.ref(room).on("child_changed", function(data) {
    var key = data.key;
    for(let i = 1; i <= 3;  i++) {
        if (key == (DB_PLAYER_SEL_ID + String(i))){
            const v = data.val();
            cDBPlayerSelect.updated_select(i, v.select);
        }
    }
});

database.ref(room).on("value", function(data) {
    var key = data.key;
    const v = data.val();

    const btn1 = document.getElementById(BTN_ID1);
    const btn2 = document.getElementById(BTN_ID2);
    const btn3 = document.getElementById(BTN_ID3);
    //const btn_start = document.getElementById(BTN_START);

    if(v.DB_PLAYER_SEL1.select){
        btn1.disabled = true;
    }
    else{
        btn1.disabled = null;
    }
    if(v.DB_PLAYER_SEL2.select){
        btn2.disabled = true;
    }
    else{
        btn2.disabled = null;
    }
    if(v.DB_PLAYER_SEL3.select){
        btn3.disabled = true;
    }
    else{
        btn3.disabled = null;
    }

    cBlockControl.bCreate = v.DB_BLOCK_CREATE.bCreate;
});


