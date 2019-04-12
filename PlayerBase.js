// _gamesWon;
// _type;
// _name;?getter/setter
// getID() getter/setter

class PlayerBase
{
    constructor(type)
    {
        PlayerBase.players++;
        this._id = PlayerBase.players;
        this._type = type
        this.name = "Player"+this._id;
    }

    get id()
    {
        return this._id;
    }
    set id(value)
    {
        console.log("PlayerBase.id is read-only! Passed value of \""+value+"\" will be ignored.");
    }

    get type()
    {
        return this._type;
    }
    set type(value)
    {
        console.log("PlayerBase.type is read-only! Passed value of \""+value+"\" will be ignored.");
    }
}
PlayerBase.players = 0;
