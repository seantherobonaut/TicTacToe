class Game
{
    constructor(target, players) //Players will be a JSON string with playername and type
    {
        //round

        this.board = new Board(target, 3, 3);;
        this._players = new Array;
    }

    //Returns the next player in line
    getNextPlayer()
    {

    }

}