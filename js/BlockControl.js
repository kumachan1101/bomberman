

class Block{
    constructor(x, y){
        //this.blocklist = [];
        this.x = x;
        this.y = y;
        this.sprite = new Sprite( 'img/block.png', 0, 0 );
        this.bDel = false;
    }
}

class BlockControl{
    constructor(){
        this.blocklist = [];
        this.bCreate = false;
    }
    
    update(){

        for(let cBlock of this.blocklist) {
            if(!this.bDel){
                let sprite = cBlock.sprite;
                let x = cBlock.x;
                let y = cBlock.y;
                cGameControl.add( sprite, CHARACTER_LARGE*x, CHARACTER_LARGE*y );
            }
        }

        //if(!this.bCreate){
        //resetボタンが押されていたらBlockControlで各ユーザーが保持している内部のblocklistと
        //DBのブロックデータを両方初期化する必要があるので、DBのbCreateフラグをtrueしないといけない
        if(bFlag){
            bFlag = false;
            //cDBBlockControl.update_Create(true);
            
            let cFactory = new DBCreate_update_factory();
            let cDB_update = cFactory.create_instance();
            let v = {bCreate:true};
            cDB_update.update_db(v);
            
        }
      
    }

    create_rand(x, y){
        let bRet = false;
        let rand = Math.floor(Math.random() * 5)
        if (1 == rand){
            // DB_IDを指定して、DBアクセスクラスのインスタンスを取得して、update要求するように変更する
            //cDBBlockControl.update_db(v);
            let cFactory = new DBBlock_update_factory();
            let cDB_update = cFactory.create_instance();
            let v = {x:x, y:y};
            cDB_update.update_db(v);

            bRet = true;
        }
        return bRet;
    }
1
    add(cBlock){
        this.blocklist.push(cBlock);
    }

    isExsist(x, y){
        for(let cBlock of this.blocklist) {
            if((x == cBlock.x) && (y == cBlock.y)){
                return true;
            }
        }
        return false;
    }

    setdel(x, y){
        for(let i = 0;  i < this.blocklist.length;  i++  ) {
            let blockx = this.blocklist[i].x;
            let blocky = this.blocklist[i].y;
            if((x == blockx) && (y == blocky)){
                this.blocklist.splice(i , 1);
            }
        }
    }
/*
    delete(){
        for(let i = 0;  i < this.blocklist.length;  i++  ) {
            let blockx = this.blocklist[i].x;
            let blocky = this.blocklist[i].y;
            if(this.blocklist[i].bDel){
                this.blocklist.splice(i , 1);
            }
        }
    }
*/
}