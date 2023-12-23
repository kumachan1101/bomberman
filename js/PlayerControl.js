let CONFLICT_BOMB = 1;
let CONFLICT_ENEMY = 2;

class PlayerControl extends CharacterControl{

    constructor(){
        super();
        this.push(new Player( new Sprite( 'img/character.png',  0, 0 ), CHARACTER_LARGE*5, CHARACTER_LARGE*9, 1));
        this.push(new Player( new Sprite( 'img/character.png', 65, 0 ), CHARACTER_LARGE*1, CHARACTER_LARGE*1, 2));
        this.push(new Player( new Sprite( 'img/character.png', 33, 0 ), CHARACTER_LARGE*3, CHARACTER_LARGE*5, 3));

        this.cPlayer = undefined;
        this.playerID = -1;
        this.SetPlayer(-1);
        
    }

    Conflict(id){
        for(let cChara of this.charalist) {
            if(undefined != cChara){
                let bRet = this.IsConflict(id, cChara.cCharaPos.cPos.x, cChara.cCharaPos.cPos.y);
                if(bRet){
                    if(cChara.playerval == this.playerID){
                        this.cChara = undefined;
                        this.cPlayer = undefined;
                    }
                    delete this.charalist[cChara.playerval-1];
                }
            }
        }
    }

    IsConflict(id, posx, posy){
        let bRet = false;
        switch(id){
            case CONFLICT_BOMB:
                bRet = cBomControl.ConflictFire(posx, posy);
                break;
            case CONFLICT_ENEMY:
                bRet = cEnemyControl.IsConflict(posx, posy);
                break;
            default:
                break;
        }
        return bRet;
    }

    update(){
        this.AddSprite();
        this.Conflict(CONFLICT_BOMB);
        this.Conflict(CONFLICT_ENEMY);
        if(undefined != this.cPlayer){
            cGameControl.update_camera(this.cPlayer.cCharaPos.cPos.x, this.cPlayer.cCharaPos.cPos.y); // 画面に描画するカメラの範囲を移動する
            this.cPlayer.move_sp();
            this.cPlayer.update_chara_pos();
        }
    }

    SetPlayer(playerID){
        let iID;
        switch(playerID){
        case "rico":
            iID = 1;
            break;
        case "aru":
            iID = 2;
            break;
        case "yamada":
            iID = 3;
            break;
        default:
            break;
        }

        this.playerID = iID;
        this.cPlayer = this.GetPlayer(iID);
    }
}

