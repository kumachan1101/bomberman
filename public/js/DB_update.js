class DBItem_update_factory extends DB_update_factory {
    create_instance(){
        return new DBItem_update();
    }
}

class DBBom_update_factory extends DB_update_factory {
    create_instance(){
        return new DBBom_update();
    }
}

class DBBlock_update_factory extends DB_update_factory {
    create_instance(){
        return new DBBlock_update();
    }
}

class DBCreate_update_factory extends DB_update_factory {
    create_instance(){
        return new DBCreate_update();
    }
}

class DBPlayer_update_factory extends DB_update_factory {
    create_instance(){
        return new DBPlayer_update();
    }
}

class DBEnemy_update_factory extends DB_update_factory {
    create_instance(){
        return new DBEnemy_update();
    }
}


class DB_update {
    update_db(v){
        return
    }
}

class DBItem_update extends DB_update {

    update_db(v) {
        let DB_ID = cDBItemControl.use_db_id(v.x,v.y,DB_ITEM_ID);
        if("INVALID"==DB_ID){
            return;
        }
        database.ref(room).child(DB_ID).update({
            x: v.x,
            y: v.y,
            item: v.item
        });
    }
}

class DBBom_update extends DB_update {

    update_db(v) {
        let DB_ID = cDBBomControl.use_db_id(v.x,v.y,DB_BOM_ID);
        if("INVALID"==DB_ID){
            return;
        }

        let iPlayerID = cPlayerControl.playerID;
        let cPlayer = cPlayerControl.GetPlayer(iPlayerID);
        let iFire = 3;
        if(undefined != cPlayer){
            iFire = iFire + cPlayer.cItemData.fire;
        }
        database.ref(room).child(DB_ID).update({
            x: v.x,
            y: v.y,
            user: v.user,
            fire: iFire,
            expl: v.expl
        });
    }
}

class DBBlock_update extends DB_update {

    update_db(v) {
        let DB_ID = cDBBlockControl.use_db_id(v.x,v.y,DB_BLOCK_ID);
        if("INVALID"==DB_ID){
            return;
        }
        database.ref(room).child(DB_ID).update({
            x: v.x,
            y: v.y
        });
    }
}

class DBCreate_update extends DB_update {

    update_db(v) {
        database.ref(room).child(DB_BLOCK_CREATE_ID).update({
            bCreate: v.bCreate
        });
    }
}

class DBPlayer_update extends DB_update {

    update_db(v) {
        database.ref(room).child(cPlayerControl.cPlayer.cDBPlayerControl.DB_PLAYER).update({
            x: v.x,
            y: v.y,
            fire: v.fire
        });
    }
}

class DBEnemy_update extends DB_update {

    update_db(v, DB_EMEMY) {
        database.ref(room).child(DB_EMEMY).update({
            x: v.x,
            y: v.y,
            fire: v.fire
        });
    }

    setid(id){
        database.ref(room).child(DB_ENEMY_USE_ID).update({
            id: id
        });
    }
}
