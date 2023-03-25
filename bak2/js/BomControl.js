let bomlist = [];

class BomControl {

    isExsistBom(x, y){
        for(let i = 0;  i < bomlist.length;  i++  ) {
            let bomx = bomlist[i].x/32;
            let bomy = bomlist[i].y/32;
            if((x == bomx) && (y == bomy)){
                let bExplosion = bomlist[i].isExplosion();
                if(!bExplosion){
                    return true;
                }
            }
        }
        return false;
    }

    isFire(x, y){
        for(let i = 0;  i < bomlist.length;  i++  ) {
            let bomx = bomlist[i].x/32;
            let bomy = bomlist[i].y/32;
            if((x == bomx) && (y == bomy)){
                let bExplosion = bomlist[i].isExplosion();
                if(bExplosion){
                    return true;
                }
            }
        }
        return false;

    }

    ConflictFire(x, y){
        let firelist = [];
        this.getFireList(firelist);
        for(let i = 0;  i < firelist.length;  i++  ) {
            if(x == firelist[i].x && y == firelist[i].y){
                return true;
            }
        }
        return false;
    }

    getFireList(firelist){
        for(let i = 0;  i < bomlist.length;  i++  ) {
            if (bomlist[i].isExplosion()){
                firelist.push(new fire(bomlist[i].fire_sprite, bomlist[i].x, bomlist[i].y));
                let x = bomlist[i].x/32;
                let y = bomlist[i].y/32;
                let x_minus = x;
                let x_plus = x;
                let y_minus = y;
                let y_plus = y;
                for(let j = 1;  j <= bomlist[i].strength;  j++) {
                    y_minus--;
                    if (y_minus >= 0){
                        if ( map[y_minus][x] === 0 ) {
                            firelist.push( new fire(bomlist[i].fire_sprite, bomlist[i].x, y_minus*32 ));	

                            if (cBlockControl.isExsist(x,y_minus)){
                                cBlockControl.setdel(x,y_minus);
                                y_minus = 0;    
                            }
                        }
                        else{
                            y_minus = 0;
                        }	
                    }
                    y_plus++;
                    if(y_plus <= 19){
                        if ( map[y_plus][x] === 0 ) {
                            firelist.push( new fire(bomlist[i].fire_sprite, bomlist[i].x, y_plus*32 ));	
                            
                            if (cBlockControl.isExsist(x,y_plus)){
                                cBlockControl.setdel(x,y_plus);
                                y_plus = 19;
                            }
                        }
                        else{
                            y_plus = 19;
                        }
                    }
                    x_minus--;
                    if (x_minus >= 0){
                        if ( map[y][x_minus] === 0 ) {
                            firelist.push( new fire(bomlist[i].fire_sprite, x_minus*32, bomlist[i].y));	
                            
                            if (cBlockControl.isExsist(x_minus,y)){
                                cBlockControl.setdel(x_minus,y);
                                x_minus = 0;
                            }
                        }
                        else{
                            x_minus = 0;
                        }
                    }
                    x_plus++;
                    if(x_plus <= 19){
                        if ( map[y][x_plus] === 0 ) {
                            firelist.push( new fire(bomlist[i].fire_sprite, x_plus*32, bomlist[i].y));	

                            if (cBlockControl.isExsist(x_plus,y)){
                                cBlockControl.setdel(x_plus,y);
                                x_plus = 19;
                            }

                        }	
                        else{
                            x_plus = 19;
                        }
                    }
                }
            }
        }
    }

    addgame(firelist){
        for(let i = 0;  i < firelist.length;  i++  ) {
            game.add(firelist[i].fire_sprite, firelist[i].x, firelist[i].y);
        }
    }

    update(){
        
        for(var i = 0;  i < bomlist.length;  i++  ) {
            let time = new Date().getTime();
            bomlist[i].updatetime(time);
            if (bomlist[i].isExplosion()){
                if (bomlist[i].isNofire()){
                    cBlockControl.delete();
                    cDBBomControl.delbom(bomlist[i].x, bomlist[i].y);
                    bomlist.splice(i, 1);
                }
                else{
                    let firelist = [];
                    this.getFireList(firelist);
                    this.addgame(firelist);

                    /*
                    game.add( bomlist[i].fire_sprite, bomlist[i].x, bomlist[i].y );	
                    var x = bomlist[i].x/32;
                    var y = bomlist[i].y/32;
                    var x_minus = x;
                    var x_plus = x;
                    var y_minus = y;
                    var y_plus = y;
                    for(var j = 1;  j <= bomlist[i].strength;  j++) {
                        y_minus--;
                        if (y_minus >= 0){
                            if ( map[y_minus][x] === 0 ) {
                                game.add( bomlist[i].fire_sprite, bomlist[i].x, y_minus*32 );	
                            }
                           else{
                                y_minus = 0;
                            }	
                        }
                        y_plus++;
                        if(y_plus <= 19){
                            if ( map[y_plus][x] === 0 ) {
                                game.add( bomlist[i].fire_sprite, bomlist[i].x, y_plus*32 );	
                            }
                            else{
                                y_plus = 19;
                            }
                        }
                        x_minus--;
                        if (x_minus >= 0){
                            if ( map[y][x_minus] === 0 ) {
                                game.add( bomlist[i].fire_sprite, x_minus*32, bomlist[i].y);	
                            }
                            else{
                                x_minus = 0;
                            }
                        }
                        x_plus++;
                        if(x_plus <= 19){
                            if ( map[y][x_plus] === 0 ) {
                                game.add( bomlist[i].fire_sprite, x_plus*32, bomlist[i].y);	
                            }	
                            else{
                                x_plus = 19;
                            }
                        }
                    }
                    */
                }
            }
            else{
                
                game.add( bomlist[i].bom_sprite, bomlist[i].x, bomlist[i].y );	
            }
        }
    }
}