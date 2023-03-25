class fire{
    constructor(fire_sprite, x, y){
        this.fire_sprite = fire_sprite;
        this.x = x;
        this.y = y;
    }

}


class bom{
    constructor(x, y, time, strength){
        this.bom_sprite = new Sprite( 'img/bom.png', 0, 0 );
        this.fire_sprite = new Sprite( 'img/fire.png', 0, 0 );
        this.x = x;
        this.y = y;
        this.resttime = 5000;
        this.beforetime = time;
        this.aftertime = time;
        this.restexplosiontime = 3000;
        this.strength = strength;

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

    isExplosion(){
        if (this.resttime <= 0){
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