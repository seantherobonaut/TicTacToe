//Numerical validation through static methods
class Valid
{
	constructor()
	{
		throw new Error('"Valid" is a static class that cannot be instantiated or called!');
	}

	static isFloat(value)
	{
		if(arguments.length > 0)
		{
			if(typeof value == 'number')
				return true;
			else
				return false;
		}
		else
		{
			console.log('Valid.isFloat() requires 1 argument!');
			return false;
		}
	}

	static isInteger(value, aboveZero = false)
	{
		if(arguments.length < 1)
		{
			console.log('Valid.isInteger() requires at least 1 argument!');
			return false;
		}
		else
		{
			if(typeof aboveZero == 'boolean')
			{
				if(Valid.isFloat(value) && value == Math.floor(value))
				{
					if(aboveZero)
					{
						if(Math.floor(value) > 0)
							return true;
						else
							return false;
					}
					else
						return true;
				}
				else
					return false;
			}	
			else
			{
				console.log('Valid.isInteger\'s 2nd argument (aboveZero) must be of type boolean!');
				return false;
			}
		}
	}	
}

//Measures and outputs average frames per second
class FPS
{
	constructor()
	{
		this._lastCall = 0;
		this._thisCall = 0;
		this._total = 0;
		this._numCalls = 0;
	}
	
	frameCall()
	{
		if(this._lastCall != 0)
		{
			this._thisCall = Date.now();
			this._total += 1000/(this._thisCall-this._lastCall);
			this._lastCall = this._thisCall;
			this._numCalls++;
		}
		else 
			this._lastCall = Date.now();
	}

	getFPS()
	{
		let result = this._total/this._numCalls;
		this._numCalls = 0;
		this._total = 0;

		if(!(result > 0))
			result = 0;

		return result.toFixed(3);
	}
}

//Creates a synchronous delay in execution (can be a bit laggy)
const wait = function(delay = 0)
{
  if(Valid.isInteger(delay, true))
  {
    let timeStart = Date.now();
    while((Date.now() - timeStart) <= delay){}
  }
  else
    console.log('Function wait\'s 1st argument must be a non-zero positive integer!');
};
