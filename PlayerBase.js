// PlayerBase
// //Will player type dictate how external javascript in terms of clicking next move act?
// _gamesWon;
// _type;
// _name;?getter/setter
// getID() getter/setter
// getMove() -> board->setMove(getMove())
//static id


class PlayerBase
{
    constructor(board)
    {        
        if(!(board instanceof Board))        
            throw new Error("PlayerBase's constructor argument \"board\", bust be an instance the Board class!");

        PlayerBase.players++;
        this._id = PlayerBase.players;
        this.name = "Player"+this._id;
    }

    get id()
    {
        return this._id;
    }
    set id(id)
    {
        console.log("PlayerBase.id is read-only! Passed value of \""+id+"\" will be ignored.");
    }

    //Todo
    getMove()
    {

    }
}
PlayerBase.players = 0;
