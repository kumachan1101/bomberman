class fire{
    constructor(fire_sprite, x, y){
        this.fire_sprite = fire_sprite;
        this.x = x;
        this.y = y;
        this.firelist = [];
    }
}

class bom{
    constructor(x, y, time, strength, user, key){
        this.bom_sprite = new Sprite( 'img/bom.png', 0, 0 );
        this.fire_sprite = new Sprite( 'img/fire.png', 0, 0 );
        this.x = x;
        this.y = y;
        this.resttime = 5000;
        this.beforetime = time;
        this.aftertime = time;
        this.restexplosiontime = 3000;
        this.strength = strength;
        this.bExploOnce = false;
        this.user = user;
        this.bExpl = false;
        this.DB_ID = key;
    }

    updatetime(time){
        this.beforetime = this.aftertime;
        this.aftertime = time;        
        let diffime = this.aftertime - this.beforetime;
        if (this.resttime > 0){
            this.resttime = this.resttime - diffime;
        }
        else{
            if (this.restexplosiontime > 0){
                this.restexplosiontime = this.restexplosiontime - diffime;
            }
        }
    }


    updateDBExpl(){
        if (this.resttime <= 0 && !this.bExpl){
            let cFactory = new DBBom_update_factory();
            let cDB_update = cFactory.create_instance();
            cDB_update.update_expl(this.DB_ID, true);
        }
    }

    isExplosion(){
        if(this.bExpl){
            return true;
        }
        return false;
    }

    isNofire(){
        if (this.restexplosiontime <= 0){
            return true;
        }
        return false;
    }
}

class bomtime extends bom {

    updatetime(time){
        this.beforetime = this.aftertime;
        this.aftertime = time;        
        let diffime = this.aftertime - this.beforetime;
        if (this.resttime > 0){
            // 時限爆弾の場合は、爆発までの時間は更新しない
        }
        else{
            if (this.restexplosiontime > 0){
                this.restexplosiontime = this.restexplosiontime - diffime;
            }
        }
    }

}