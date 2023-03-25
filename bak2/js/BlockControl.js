

class Block{
    constructor(x, y){
        this.blocklist = [];
        this.x = x;
        this.y = y;
        this.sprite = new Sprite( 'img/Block.png', 0, 0 );
        this.bDel = false;
    }
}

class BlockControl{
    constructor(){
        this.blocklist = [];
        this.bCreate = false;
    }
    
    update(){
        for(let i = 0;  i < this.blocklist.length;  i++  ) {
            let sprite = this.blocklist[i].sprite;
            let x = this.blocklist[i].x;
            let y = this.blocklist[i].y;

            game.add( sprite, 32*x, 32*y );
        }
        this.bCreate = true;
    }

    create_rand(x, y){
        if(this.bCreate){
            return;
        }

        let rand = Math.floor(Math.random() * 5)
        if (1 == rand){
            let cBlock = new Block(x, y);
            this.blocklist.push(cBlock);
        }
    }

    add(cBlock){
        this.blocklist.push(cBlock);
    }

    isExsist(x, y){
        for(let i = 0;  i < this.blocklist.length;  i++  ) {
            let blockx = this.blocklist[i].x;
            let blocky = this.blocklist[i].y;
            if((x == blockx) && (y == blocky)){
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
                this.blocklist[i].bDel = true;
            }
        }
    }

    delete(){
        for(let i = 0;  i < this.blocklist.length;  i++  ) {
            let blockx = this.blocklist[i].x;
            let blocky = this.blocklist[i].y;
            if(this.blocklist[i].bDel){
                this.blocklist.splice(i , 1);
            }
        }
    }
}