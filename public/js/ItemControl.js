let ITEM_ID_NONE  = 0;
let ITEM_ID_FIRE  = 1;
let ITEM_ID_BOM   = 2;
let ITEM_ID_BOM_REGION = 3;
let ITEM_ID_WALL = 4;
let ITEM_ID_TIME = 5;
let ITEM_ID_NUM   = 6;
let ITEM_ID_SPEED = 99; // 未使用


class ItemFactory{
    
    static create(id, x, y, dbid){
        let cItem;
        switch(id){
            case ITEM_ID_FIRE:
                cItem = new ItemFire(x, y, dbid);
                break;
            case ITEM_ID_BOM:
                cItem = new ItemBom(x, y, dbid);
                break;
            case ITEM_ID_SPEED:
                cItem = new ItemSpeed(x, y, dbid);
                break;
            case ITEM_ID_BOM_REGION:
                cItem = new ItemBomRegion(x, y, dbid);
                break;
            case ITEM_ID_WALL:
                cItem = new ItemWall(x, y, dbid);
                break;
            case ITEM_ID_TIME:
                cItem = new ItemTime(x, y, dbid);
                break;
            }
        return cItem;
    }

    static ReflectItem(cItem, cPlayer){
        cItem.additem(cPlayer.cItemData);		
	}
}

class ItemFieldControl{
    constructor(){
        this.itemfieldlist = [];
    }

    update(){

        let iPlayerID = cPlayerControl.playerID;
        let cPlayer = cPlayerControl.GetPlayer(iPlayerID);
        if(undefined != cPlayer){
            let cItem = this.isExsist(cPlayer.cCharaPos.cPos.x/CHARACTER_LARGE, cPlayer.cCharaPos.cPos.y/CHARACTER_LARGE);
            if (undefined != cItem){
                cDBItemControl.invalid_data(cItem.dbid);
                ItemFactory.ReflectItem(cItem, cPlayer);
            }
        }

        for(let i = 0;  i < this.itemfieldlist.length;  i++ ) {
            let sprite = this.itemfieldlist[i].sprite;
            let x = this.itemfieldlist[i].x;
            let y = this.itemfieldlist[i].y;
            cGameControl.add( sprite, CHARACTER_LARGE*x, CHARACTER_LARGE*y );
        }
    }

    isExsist(x, y){
        for(let i = 0;  i < this.itemfieldlist.length;  i++) {
            if(this.itemfieldlist[i].x == x && this.itemfieldlist[i].y == y){
                return this.itemfieldlist[i];
            }
        }
        return undefined;
    }

    create_rand(x, y){
        let rand = Math.floor(Math.random() * 20);
        if (ITEM_ID_NONE < rand && rand < ITEM_ID_NUM){
            if(rand == ITEM_ID_BOM_REGION){
                if(ITEM_ID_BOM_REGION == Math.floor(Math.random() * 50)){
                    rand = ITEM_ID_BOM_REGION;
                }
                else{
                    return;
                }
            }

            let cFactory = new DBItem_update_factory();
            let cDB_update = cFactory.create_instance();

            let v = {x:x, y:y, item:rand};
            cDB_update.update_db(v);
            //cDBItemControl.update_db(x, y, rand);
        }
    }

    add(cItem){
        this.itemfieldlist.push(cItem);
    }

    delpos(x, y){
        for(let i = 0;  i < this.itemfieldlist.length;  i++  ) {
            let itemx = this.itemfieldlist[i].x;
            let itemy = this.itemfieldlist[i].y;
            if((x == itemx) && (y == itemy)){
                this.itemfieldlist.splice(i , 1);
            }
        }       
    }

    delid(dbid){
        for(let i = 0;  i < this.itemfieldlist.length;  i++  ) {
            let list_dbid = this.itemfieldlist[i].dbid;
            if(dbid == list_dbid){
                this.itemfieldlist.splice(i , 1);
            }
        }       
    }

}    

class ItemData{

    constructor(){
        this.fire = 0;
        this.bom = 1;
        this.speed = 1;
        this.wall = false;
        this.time = false;
    }
}

class Item{
    constructor(x, y, dbid){
        this.x = x;
        this.y = y;
        this.dbid = dbid;
    }

    additem(){

    }
}

class ItemFire extends Item{
    constructor(x, y, dbid){
        super(x, y, dbid);
        this.sprite = new Sprite( 'img/item_fire.jpg', 0, 0 );
        this.id = ITEM_ID_FIRE;
    }

    additem(cItemData){
        cItemData.fire = cItemData.fire + 1;
    }
}

class ItemBom extends Item{

    constructor(x, y, dbid){
        super(x, y, dbid);
        this.sprite = new Sprite( 'img/item_bom.jpg', 0, 0 );
        this.id = ITEM_ID_BOM;
    }

    additem(cItemData){
        cItemData.bom = cItemData.bom + 1;
    }
}

class ItemSpeed extends Item{

    constructor(x, y, dbid){
        super(x, y, dbid);
        this.sprite = new Sprite( 'img/item_speed.jpg', 0, 0 );
        this.id = ITEM_ID_SPEED;
    }

    additem(cItemData){
        cItemData.speed = cItemData.speed + 1;
    }
}

class ItemBomRegion extends Item{

    constructor(x, y, dbid){
        super(x, y, dbid);
        this.sprite = new Sprite( 'img/item_bom_region.png', 0, 0 );
        this.id = ITEM_ID_BOM_REGION;
    }

    additem(cItemData){
        cBomControl = new BomRegionControl();
    }
}

class ItemWall extends Item{

    constructor(x, y, dbid){
        super(x, y, dbid);
        this.sprite = new Sprite( 'img/item_wall.jpg', 0, 0 );
        this.id = ITEM_ID_WALL;
    }

    additem(cItemData){
        cItemData.wall = true;
    }
}

class ItemTime extends Item{

    constructor(x, y, dbid){
        super(x, y, dbid);
        this.sprite = new Sprite( 'img/item_time.jpg', 0, 0 );
        this.id = ITEM_ID_TIME;
    }

    additem(cItemData){
        cItemData.time = true;
    }
}
