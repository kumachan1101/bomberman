// database
var database = firebase.database();
let room = "bomberman";
// databaseURL
// https://console.firebase.google.com/project/bomberman-cc18d/database/bomberman-cc18d-default-rtdb/data

let DB_PLAYER_ID  = "DB_PLAYER"
let DB_BOM_ID     = "DB_BOM";
let DB_PLAYER_SEL_ID = "DB_PLAYER_SEL";


class DBBom{
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

class DBBomControl{
    constructor(){
        this.dblist = [];
        for(let i = 0; i < 30; i++){
            this.dblist.push(new DBBom(i));
        }
        
    }

    delbom(x, y){
        for(let i = 0; i < this.dblist.length; i++){
            if(this.dblist[i].x == x && this.dblist[i].y == y){
                this.dblist[i].x = -1;
                this.dblist[i].y = -1;
                this.dblist[i].bUse = false;
            }
        }
    }

    use_db_id(x, y,){
        let DB_BOM;
        for(let i = 0; i < 10; i++){
            if (false == this.dblist[i].bUse){
                DB_BOM = DB_BOM_ID + "0" + String(i);
                this.dblist[i].use();
                this.dblist[i].x = x;
                this.dblist[i].y = y;
                return DB_BOM;
            }
        }
        for(let i = 10; i < 30; i++){
            if (false == this.dblist[i].bUse){
                DB_BOM = DB_BOM_ID + String(i);
                this.dblist[i].use();
                this.dblist[i].x = x;
                this.dblist[i].y = y;
                return DB_BOM;
            }
        }
        return DB_BOM;
    }
    
    update_pos(x, y, user) {
        let DB_BOM = this.use_db_id(x,y);

        database.ref(room).child(DB_BOM).update({
            x: x,
            y: y,
            user: user
        });
    }

    updated_pos(x, y, user){
        let time = new Date();
        let cbom = new bom(x, y, time.getTime(), 3);
        bomlist.push(cbom);
    }

}

class DBPlayerControl{
    constructor(playerval){
        this.DB_PLAYER = this.get_db_id(playerval);
    }

    get_db_id(playerval){
        let DB_PLAYER = DB_PLAYER_ID + String(playerval);
        return DB_PLAYER;
    }
    
    update_pos(x, y) {
        database.ref(room).child(this.DB_PLAYER).update({
            x: x,
            y: y
        });
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



database.ref(room).on("child_changed", function(data) {
    var key = data.key;
    for(let i = 1; i <= 3;  i++) {
        if (key == (DB_PLAYER_ID + String(i))){
            const v = data.val();
            cPlayerControl.updated_player_pos(v.x, v.y, i); 
        }
    }
});

database.ref(room).on("child_changed", function(data) {
    var key = data.key;
    if (key.substr( 0, 6 ) == DB_BOM_ID ){
        const v = data.val();
        cDBBomControl.updated_pos(v.x, v.y, v.user); 
    }
});


database.ref(room).on("value", function(data) {
    var key = data.key;
    const v = data.val();

    const btn1 = document.getElementById(BTN_ID1);
    const btn2 = document.getElementById(BTN_ID2);
    const btn3 = document.getElementById(BTN_ID3);

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
    
    /*
    btn1.setAttribute("disabled", v.DB_PLAYER_SEL1.select);
    btn2.setAttribute("disabled", v.DB_PLAYER_SEL2.select);
    btn3.setAttribute("disabled", v.DB_PLAYER_SEL3.select);

    cDBPlayerSelect.updated_select(1, v.DB_PLAYER_SEL1.select);
    cDBPlayerSelect.updated_select(2, v.DB_PLAYER_SEL2.select);
    cDBPlayerSelect.updated_select(3, v.DB_PLAYER_SEL3.select);
    */

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
