let bEnemyAuthority;

class EnemyControl extends CharacterControl{

    constructor(){
        super();
        for(let i = 0; i < 5; i++){
            this.push(new Enemy( new Sprite( 'img/enemy.jpg',  0, 0 ), CHARACTER_LARGE*5, CHARACTER_LARGE*16, i));
        }
        this.useid = -1;
        this.db_useid = -2;
    }

    set_useid(id){
        this.useid = id;
    }

    set_db_useid(id){
        this.db_useid = id;
    }

    isVaild_id(){
        if(this.db_useid == this.useid){
            return true;
        }
        return false;
    }

    ConflictBombExplotion(){
        for(let i in this.charalist){
            let cChara = this.charalist[i];
            if(undefined != cChara){
                let bRet = cBomControl.ConflictFire(cChara.cCharaPos.cPos.x, cChara.cCharaPos.cPos.y);
                if(bRet){
                    delete this.charalist[i];
                }
            }
        }
    } 

    update(){
        this.AddSprite()
        this.ConflictBombExplotion();

        let bRet = this.isVaild_id();
        if(!bRet){
            return;
        }

        for (let cEnemy of this.charalist){
            if(undefined != cEnemy){
                cEnemy.move_sp();
                cEnemy.update_chara_pos();
            }
        }
    }
}

