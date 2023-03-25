let bomlist = [];

class Pos{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

class BomControl {

    constructor(){
        /*
        　要素1：炎の強さによって拡張させる座標
        　要素2：障害物がなかった場合に炎を拡張させる処理
        　要素3：壁の境界に到達した場合に境界以上にならないようにするブロック判定
        　要素4：壁の境界値でブロック処理
        */
        /* cPos, update_pos, judge_pos, boundary_pos */
        this.funclist = [
            [new Pos(0, 0), function(cPos){cPos.y--;}, function(cPos){return cPos.y >= 0;}, function(cPos){cPos.y = 0;} ], // update_y_minus
            [new Pos(0, 0), function(cPos){cPos.y++;}, function(cPos){return cPos.y < MAPLEN/CHARACTER_LARGE;},function(cPos){cPos.y = MAPLEN/CHARACTER_LARGE;}], // update_y_plus
            [new Pos(0, 0), function(cPos){cPos.x--;}, function(cPos){return cPos.x >= 0;}, function(cPos){cPos.x = 0;} ], // update_x_minus
            [new Pos(0, 0), function(cPos){cPos.x++;}, function(cPos){return cPos.x < MAPLEN/CHARACTER_LARGE;},function(cPos){cPos.x = MAPLEN/CHARACTER_LARGE;}]  // update_x_plus
        ];

        this.funclist2 = [
            [new Pos(0, 0), function(cPos){cPos.y--;}, function(cPos){return cPos.y >= 0;}, function(cPos){cPos.y = 0;} ], // update_y_minus
            [new Pos(0, 0), function(cPos){cPos.y++;}, function(cPos){return cPos.y < MAPLEN/CHARACTER_LARGE;},function(cPos){cPos.y = MAPLEN/CHARACTER_LARGE;}], // update_y_plus
            [new Pos(0, 0), function(cPos){cPos.x;}, function(cPos){return cPos.x >= 0;}, function(cPos){cPos.x = 0;} ], // update_x_minus
            [new Pos(0, 0), function(cPos){cPos.x;}, function(cPos){return cPos.x < MAPLEN/CHARACTER_LARGE;},function(cPos){cPos.x = MAPLEN/CHARACTER_LARGE;}]  // update_x_plus
        ];

    }

    getPlayerBomNum(iPlayer){
        let iBom = 0;
        for(let cBom of bomlist) {
            if(cBom.user == iPlayer){
                iBom++;
            }
        }
        return iBom;
    }

    isExsist(x, y){
        for(let cBom of bomlist) {
            let bomx = cBom.x/CHARACTER_LARGE;
            let bomy = cBom.y/CHARACTER_LARGE;
            if((x == bomx) && (y == bomy)){
                let bExplosion = cBom.isExplosion();
                if(!bExplosion){
                    return true;
                }
            }
        }
        return false;
    }

    isFire(x, y){
        for(let cBom of bomlist) {
            let bomx = cBom.x/CHARACTER_LARGE;
            let bomy = cBom.y/CHARACTER_LARGE;
            if((x == bomx) && (y == bomy)){
                let bExplosion = cBom.isExplosion();
                if(bExplosion){
                    return true;
                }
            }
        }
        return false;

    }

    ConflictFire(x, y){
        let firelist = this.getFireList();
        if(undefined == firelist){
            return;
        }
        for(let i = 0;  i < firelist.length;  i++  ) {
            if(x == firelist[i].x && y == firelist[i].y){
                return true;
            }
        }
        return false;
    }

    update_direction_fire(fire_sprite, x, y, firelist){
        let bRet = false;
        if ( map[y][x] === 0 ) {
            firelist.push( new fire(fire_sprite, x*CHARACTER_LARGE, y*CHARACTER_LARGE ));	

            if (cBlockControl.isExsist(x,y)){
                cBlockControl.setdel(x,y);
                bRet = true;
            }
        }
        else{
            bRet = true;
        }
        return bRet;	
    }

    update_direction_fire_pos(fire_sprite, firelist, cPos, update_pos, judge_pos, boundary_pos){
        update_pos(cPos);
        if(judge_pos(cPos)){
            if(this.update_direction_fire(fire_sprite, cPos.x, cPos.y, firelist)){
                boundary_pos(cPos);
            }
        }
        return;      
    }

    update_fire(cBom, firelist){
        firelist.length = 0;
        firelist.push(new fire(cBom.fire_sprite, cBom.x, cBom.y));

        let x = cBom.x/CHARACTER_LARGE;
        let y = cBom.y/CHARACTER_LARGE;

        for(let func of this.funclist){
            func[0].x = x;
            func[0].y = y;
        }
        for(let j = 1;  j <= cBom.strength;  j++) {
            for(let func of this.funclist){
                this.update_direction_fire_pos(cBom.fire_sprite, firelist, func[0], func[1], func[2], func[3]);
            }

        }
    }
    
    /*
        1回目の炎リストが完成したら爆弾に紐づける
        次回更新時に紐づけた爆弾から炎リストを取り出す
        １つの爆弾に複数炎リストが紐づかないように、１ターン遅らせている。
        ブロックが炎で壊れた後、ブロックが壊れて空いた領域に炎が増大する違和感がある動きを防ぐために
        ブロックなどにより炎がさえぎられて、炎の大きさがっ確定したら、爆弾に炎リストを紐づけている。
        
    */
    getFireList(){
        
        let firelist_stock = [];
        for(let cBom of bomlist) {
            if (cBom.isExplosion()){
                if(cBom.bExploOnce){
                    for(let cFire of cBom.firelist){
                        firelist_stock.push(cFire);
                    }
                }
                else{
                    let firelist = [];
                    this.update_fire(cBom, firelist);
 
                    cBom.bExploOnce = true;
                    cBom.firelist = firelist;
                }

            }
        }
        return firelist_stock;
    }


    addgame(firelist){
        if (undefined == firelist){
            return;
        }
        for(let i = 0;  i < firelist.length;  i++  ) {
            cGameControl.add(firelist[i].fire_sprite, firelist[i].x, firelist[i].y);
        }
    }

    update(){
        let i = 0;
        for(let cBom of bomlist) {
            let time = new Date().getTime();
            cBom.updatetime(time);
            if (cBom.isExplosion()){
                if (cBom.isNofire()){
                    cDBBomControl.deldata(cBom.x, cBom.y);
                    bomlist.splice(i, 1);
                }
                else{
                    let firelist = this.getFireList();
                    this.addgame(firelist);    
                }
            }
            else{
                cGameControl.add( cBom.bom_sprite, cBom.x, cBom.y );	
            }
            i++;
        }
    }
}

class BomRegionControl extends BomControl{

    update_direction_fire(fire_sprite, x, y, firelist){
        firelist.push( new fire(fire_sprite, x*CHARACTER_LARGE, y*CHARACTER_LARGE ));	

        if (cBlockControl.isExsist(x,y)){
            cBlockControl.setdel(x,y);
        }
        return true;	
    }

    update_direction_fire_pos(fire_sprite, firelist, cPos, update_pos, judge_pos, boundary_pos){
        update_pos(cPos);
        if(judge_pos(cPos)){
            if(this.update_direction_fire(fire_sprite, cPos.x, cPos.y, firelist)){
                /*boundary_pos(cPos);*/
            }
        }
        return;      
    }

    update_fire(cBom, firelist){
        firelist.length = 0;
        firelist.push(new fire(cBom.fire_sprite, cBom.x, cBom.y));

        let x = cBom.x/CHARACTER_LARGE;
        let y = cBom.y/CHARACTER_LARGE;

        for(let func of this.funclist){
            func[0].x = x;
            func[0].y = y;
        }
        for(let j = 1;  j <= cBom.strength;  j++) {
            for(let func of this.funclist){
                this.update_direction_fire_pos(cBom.fire_sprite, firelist, func[0], func[1], func[2], func[3]);
            }
        }

        for(let i = 1;  i <= cBom.strength;  i++) {

            for(let func of this.funclist2){
                func[0].x = x-i;
                func[0].y = y;
            }
            for(let j = 1;  j <= cBom.strength;  j++) {
                for(let func of this.funclist2){
                this.update_direction_fire_pos(cBom.fire_sprite, firelist, func[0], func[1], func[2], func[3]);
                }
            }

            for(let func of this.funclist2){
                func[0].x = x+i;
                func[0].y = y;
            }
            for(let j = 1;  j <= cBom.strength;  j++) {
                for(let func of this.funclist2){
                this.update_direction_fire_pos(cBom.fire_sprite, firelist, func[0], func[1], func[2], func[3]);
                }
            }
        }
    }
 
}



