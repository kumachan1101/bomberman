class PlayerControl{

    constructor(){
        //キャラクターのオブジェクトを作成
        this.playerlist = [];

        this.playerlist.push(new Player( new Sprite( 'img/character.png',  0, 0 ),  0,  0, 1));
        this.playerlist.push(new Player( new Sprite( 'img/character.png', 65, 0 ), 32, 64, 2));
        this.playerlist.push(new Player( new Sprite( 'img/character.png', 33, 0 ), 96, 96, 3));
    
        let playerID = document.getElementById( 'player' );
        playerID.addEventListener('change', ChangeplayerID);
        this.SetPlayer(playerID.value);
        
    }

    AddSprite(){
        for(let i = 0;  i < this.playerlist.length;  i++  ) {
            let player = this.playerlist[i];
            if(player.bAlive){
                game.add( player.sprite, player.x, player.y);
            }
        }
    }

    ConflictBombExplotion(){
        for(let i = 0;  i < this.playerlist.length;  i++  ) {
            let player = this.playerlist[i];
            let bRet = cBomControl.ConflictFire(player.x, player.y);
            if(bRet){
                player.bAlive = false;
            }
        }
    }

    update(){
        this.AddSprite()
        this.ConflictBombExplotion();
        this.cPlayer.move_sp();
        this.cPlayer.update_player_pos();
    }

    SetPlayer(playerID){
        let cPlayer;
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

        this.cPlayer = this.GetPlayer(iID);
    }

    GetPlayer(iID){
        for(let i = 0;  i < this.playerlist.length;  i++  ) {
            let player = this.playerlist[i];
            if(iID === player.playerval){
                return player;
            }
        }

    }
    
    updated_player_pos(x, y, iID){
        let cPlayer = this.GetPlayer(iID);
        cPlayer.updated_player_pos(x, y);
    }

}

