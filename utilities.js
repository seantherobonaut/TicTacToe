//Prevents you from overwriting a property or method
const constant = function(instance = false, name = false)
{
  if(typeof instance == 'function' || typeof instance == 'object')
  {
    if(typeof name == 'string')
    {
      Object.defineProperty(instance, name, 
      {
        writable: false,
        configurable: false
      });
    }
    else
      console.log('constant\'s 2nd argument (name) must be of type string!');
  }
  else
    console.log('constant\'s 1st argument (instance) must be either an object or function! Ex:(this)');
};

//Checks if you used 'new' when calling a constructor function
const checkInstance = function(instance = false, className = false)
{
  //Checking cannot be done on 'instance' because if they do not call 'new', instance = false because 'this' was undefined
  
	if(typeof className != 'function')
		throw new Error('checkInstance\'s 2nd argument (className) must be a constructor function!');

  //TODO maybe add some extra logic to tell you if the instance and className are just mismatched
  if(!(instance instanceof className))
    throw new Error(className.name+' must be called with the "new" operator or be inherited by another object!');
};

//Sets up prototypical inheritance
//Object.assign? https://stackoverflow.com/questions/33692912/using-object-assign-and-object-create-for-inheritance
const setParent = function(Child = false, Parent = false)
{
	if(typeof Child != 'function')
		throw new Error('setParent\'s 1st argument (Child) must be a constructor function!');
 
  if(typeof Parent != 'function')
		throw new Error('setParent\'s 2nd argument (Parent) must be a constructor function!');

  Child.prototype = Object.create(Parent.prototype);
  Child.prototype.constructor = Child; //without this line, inheritance breaks
};

/*
  For the sake of development, pause on the complexity for now and settle for 2 arguments
  
  The answer might somewhere in the babel compiler. I want to be able to call something like super() without having 
  to pass any arguments to it or https://hacks.mozilla.org/2015/08/es6-in-depth-subclassing/
*/
//Calls the parent constructor and passes arguments along with performing a few other checks
const callParent = function(instance = false, parent = false) //optional arguments
{
  if(typeof instance != 'object')
		throw new Error('callParent\'s 1st argument (instance) must be an object!');

	if(typeof parent != 'function')
		throw new Error('callParent\'s 2nd argument (parent) must be a constructor function!');

  //Gather arguments to pass to parent constructor
  let args = new Array();
  if(arguments.length > 2)
    for(let i=2; i<arguments.length; i++) 
      args.push(arguments[i]);

  //Make sure the class does not call itself
  if(instance.constructor.name == parent.name)
    throw new Error(instance.constructor.name+' cannot call itself!');

  //Check if the instance is an instance of the parent (if setParent() has been called)
  if(instance instanceof parent)
    parent.apply(instance, args);
  else
    throw new Error('"'+instance.constructor.name+'" is not an instance of "'+parent.name+'"!');

  //Old test code
  //target.prototype.constructor.apply(target.prototype, args);
};

//Static class that checks values passed to member functions
const Valid = function(){throw new Error('"Valid" cannot be instantiated or called!');};
Valid.isFloat = function(value)
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
};
constant(Valid, 'isFloat');
Valid.isInteger = function(value, aboveZero = false)
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
};
constant(Valid, 'isInteger');

//Creates a synchronous delay in execution (it can be a bit laggy)
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

//Measures and outputs average frames per second
const FPS = function()
{
  checkInstance(this, FPS);

  let lastCall = 0;
  let thisCall = 0;
  let total = 0;
  let numCalls = 0;

  this.frameCall = function()
  {
    if(lastCall != 0)
    {
      thisCall = Date.now();
      total += 1000/(thisCall-lastCall);
      lastCall = thisCall;
      numCalls++;
    }
    else 
      lastCall = Date.now();
  };
  constant(this, 'frameCall');
  
  this.getFPS = function()
  {
    let result = total/numCalls;
    numCalls = 0;
    total = 0;
    
    if(!(result > 0))
      result = 0;

    return result.toFixed(3);
  };
  constant(this, 'getFPS');
};
