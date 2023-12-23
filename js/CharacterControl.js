class CharacterControl{

    constructor(){
        //キャラクターのオブジェクトを作成
        this.charalist = [];
     
    }

    push(cChara){
        this.charalist.push(cChara);
    }


    AddSprite(){
        for(let cChara of this.charalist) {
            if(undefined != cChara){
                cGameControl.add( cChara.sprite, cChara.cCharaPos.cPos.x, cChara.cCharaPos.cPos.y);
            }
        }
    }

    GetPlayer(iID){
        for(let cChara of this.charalist) {
            if(undefined != cChara){
                if(iID === cChara.playerval){
                    return cChara;
                }
            }
        }
        return undefined;
    }
    
    updated_chara_pos(x, y, iID, fire){
        let cChara = this.GetPlayer(iID);
        if(undefined != cChara){
            cChara.updated_chara_pos(x, y, fire);
        }
    }

    IsConflict(posx, posy){
        for (let cChara of this.charalist){
            if(undefined != cChara){
                let cposx = cChara.cCharaPos.cPos.x;
                let cposy = cChara.cCharaPos.cPos.y;
                if(posx == cposx && posy == cposy){
                    return true;
                }
            }
        }
        return false;
    }


}

