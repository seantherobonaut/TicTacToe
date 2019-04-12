class Game
{
    constructor(target, players) //Players will be an array of PlayerBase objects
    {
        this._round = 0;
        this._state = true;
        this._players = players; //TODO write a check to make sure the array contains only PlayerBase objects

        //Fill an empty array with zeros 3x3
        this._board = new Array;
        for(let i=0; i<3; i++)
        {
            this._board.push(new Array);
            for(let ii=0; ii<3; ii++)
                this._board[i][ii] = 0;
        }
    }

    //Returns the next player in line
    getNextPlayer()
    {
        //shift the array
        let player = this._players.shift();
        this._players.push(player);

        return this._players[0];
    }

    //Return true if the move is successful or false if the spot is already taken
    makeMove(playerObj, move)
    {
        if(playerObj instanceof PlayerBase)
        {
            if(this._board[move.y][move.x] == 0)
            {
                this._board[row][column] = playerObj.id;

                //TODO Run logic to check the board, if the game is won set state to false

                return true;
            }
            else
                return false;
        }
        else
            throw new Error("Board.makeMove\'s 1st argument (playerObj) must be an instance of PlayerBase!");
    }

    getState()
    {
        return this._state;
    }

    //TODO restart game
}
