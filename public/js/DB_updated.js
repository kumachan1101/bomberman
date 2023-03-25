class DB_update_factory {
    create(){
        return create_instance();
    }

    judge_id(key){
    }
}

class DBItem_updated_factory extends DB_update_factory {
    create_instance(){
        return new DBItem_updated();
    }

    judge_id(key){
        if (key.substr( 0, 7 ) == DB_ITEM_ID ){
            return true;
        }
        return false;
    }
}

class DBBom_updated_factory extends DB_update_factory {
    create_instance(){
        return new DBBom_updated();
    }

    judge_id(key){
        if (key.substr( 0, 6 ) == DB_BOM_ID ){
            return true;
        }
        return false;
    }

}

class DBBlock_updated_factory extends DB_update_factory {
    create_instance(){
        return new DBBlock_updated();
    }

    judge_id(key){
        if (key.substr( 0, 8 ) == DB_BLOCK_ID ){
            return true;
        }
        return false;
    }

}

class DBCreate_updated_factory extends DB_update_factory {
    create_instance(){
        return new DBCreate_updated();
    }

    judge_id(key){
        if (key == DB_BLOCK_CREATE_ID ){
            return true;
        }
        return false;
    }
}

class DBPlayer_updated_factory extends DB_update_factory {
    create_instance(){
        return new DBPlayer_updated();
    }

    judge_id(key){
        for(let i = 1; i <= 3;  i++) {
            if (key == (DB_PLAYER_ID + String(i))){
                return true;
            }
        }
        return false;
    }
}

class DBEnemy_updated_factory extends DB_update_factory {
    create_instance(){
        return new DBEnemy_updated();
    }

    judge_id(key){
        for (let cEnemy of cEnemyControl.charalist){
            if(cEnemy != undefined){
                if (key == (cEnemy.cDBEnemyControl.DB_ENEMY)){
                    return true;
                }   
            }
        }
        return false;
    }
}

class DBEnemy_useid_updated_factory extends DB_update_factory {
    create_instance(){
        return new DBEnemy_useid_updated();
    }

    judge_id(key){
        if (key == DB_ENEMY_USE_ID){
            return true;
        }
        return false;
    }
}


class DB_updated {

    updated_db(v, key){
        return
    }

}

class DBItem_updated extends DB_updated {

    updated_db(v, key) {
        if(v.x == -1 && v.y == -1 && v.item == -1){
            return;
        }
        if(v.x == -1 && v.y == -1){
            cItemFieldControl.delid(key);
            return;
        }

        let cItem = ItemFactory.create(v.item, v.x, v.y, key);
        cItemFieldControl.add(cItem);
    }
}

class DBBom_updated extends DB_updated {

    updated_db(v, key) {
        if(v.x == -1 && v.y == -1){
            return;
        }
        let time = new Date();
        let cBom = new bom(v.x, v.y, time.getTime(), v.fire, v.user);

        // 爆弾を置こうとした場所に既に爆弾があった場合は何もしない
        if(cBomControl.isExsist(cBom.x/CHARACTER_LARGE, cBom.y/CHARACTER_LARGE) 
        || cBlockControl.isExsist(cBom.x/CHARACTER_LARGE, cBom.y/CHARACTER_LARGE)){
            cDBBomControl.deldata(cBom.x, cBom.y);
            return;
        }

        
        bomlist.push(cBom);
    }
}

class DBBlock_updated extends DB_updated {

    updated_db(v, key) {
        if(v.x == -1 && v.y == -1){
            return;
        }
        let cBlock = new Block(v.x, v.y);
        cBlockControl.add(cBlock);
    }
}

class DBCreate_updated extends DB_updated {

    updated_db(v, key) {
        if(!v.bCreate){
            init();
        }
        cBlockControl.bCreate = v.bCreate;
    }
}

class DBPlayer_updated extends DB_updated {

    updated_db(v, key) {
        for(let i = 1; i <= cPlayerControl.charalist.length;  i++) {
            if (key == (DB_PLAYER_ID + String(i))){
                cPlayerControl.updated_chara_pos(v.x, v.y, i, v.fire); 
            }
        }
    }
}

class DBEnemy_updated extends DB_updated {

    updated_db(v, key) {
        for (let cEnemy of cEnemyControl.charalist){
            if(cEnemy != undefined){
                if (key == (cEnemy.cDBEnemyControl.DB_ENEMY)){
                    cEnemy.updated_chara_pos(v.x, v.y, v.fire); 
                }   
            }
        }
    }
}

class DBEnemy_useid_updated extends DB_updated {

    updated_db(v, key) {
        cEnemyControl.set_db_useid(v.id);
    }
}