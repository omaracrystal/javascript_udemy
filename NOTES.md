# JAVASCRIPT UNDERSTANDING THE WEIRD PARTS

# Section: 1 - Getting Started

## Conceptual Side
1. **Syntax Parsers:**
> A program that reads your code and determines what it does and if its grammar is valid

1. **Lexical Environments:**
> Where something sits physically in the code you write.

1. **Execution Contexts:**
> A Wrapper to help manage the code that is running.

1. **Name/ Value Pairs:**
> A name which maps to a unique value. The name may be defined more than once, but only can have one value in any given context.

  ``Address = '100 Main St``

1. **Object:**
> A collection of name value Pairs

1. **Javascript and 'Undefined':**
> A special value that Javascript has within it internally that means the variable has not been set. A key word that takes up memory.

  example:

  ```
  var a,
  console.log(a);
  ```

1. Single Threaded:
> One command at a time. Under the hood of the browser, maybe not.

1. Synchronous: (similar to Single Threaded)
> One at a time executes in the order that it appears.

# Section: 2 - Execution Contexts and Lexical Environments

## The Global Environment and the Global Object
- Two things are always created when execution context is created: **'Global object'** = window object when ran in the browser, **'variable = this'** which is equal to the global object.

*test out in console of browser. if you attach an empty js file to an html file, then type this in the console you will see a window object.*

**Global** = "not inside a function"
1. In Javascript when you are creating variables and functions where those variables are not inside of a function, they end up being attached to the global object.
1. **Outer Environment** is null at the global level.

## The Execution Context: Creation and 'Hoisting'
1. Hoisting Examples:

```
var a = "Hello World"

function b() {
  console.log('Called b!');
}
b();
console.log(a);
```

Results:
![img](images/works_hoisting.png)

```
b();
console.log(a);
var a = "Hello World"

function b() {
  console.log('Called b!');
}
```

Results:
![img](images/undefined_hoisting.png)

```
b();
console.log(a);

function b() {
  console.log('Called b!');
}
```

Results:
![img](images/not_defined_hoisting.png)

### What is Hoisting?
> Most languages read line by line... Javascript doesn't do that (as you can see in examples above for the function).

### *Note*
**ALL VARIABLES** in Javascript are initially set to **undefined**, and **FUNCTIONS ARE** sitting **in memory in their entirety**.

## Execution context is created in two phases:
1. **Creation Phase**
  - Global Object
  - 'this'
  - Outer Environment
  *Setup **Memory Space** for Variables and Functions 'Hoisting' it is not moving code to the top of the page*
1. **Execution Phase**
  - Runs code line by line, once the creation phase is complete.

### Function Invocation and The Execution Stack
>**Invocation:** running a function. In Javascript this is done using parenthesis ()

- Stack is created in this example:
![image](images/stack.png)

### Functions, context, and Variable Environments
>**Variable Environments:** where the variables live and how they relate to each other in memory

Example:
![img](images/env_ex.png)
Results:
[img](images/scopeChain2.png)
- Each of the myVars is sitting in its own execution context.

## The Scope Chain
![img](images/outer_env.png)

Javascript does something special... it cares about the lexical environment when it comes to the outer reference that every execution context gets (*outer environment in creation phrase*). When you ask for a variable while running a line of code inside any particular execution context, if it can't find that variable it will look at the outer reference and go look for variables there. Somewhere down below it in the execution stack. And that outer reference where that points is going to depend on where the function sits **lexically**.
Now this entire act of searching for references to **outer environments** is called **THE SCOPE CHAIN**

| EXAMPLE                        | RESULTS                        |
|:------------------------------:|:------------------------------:|
| ![img](images/scope1.png)      | ![img](images/scope2.png)      |
| ![img](images/scope3.png)      | ![img](images/scope4.png)      |
| ![img](images/scope5.png)      | ![img](images/scope6.png)      |

### Scope :
> where a variable is available in your code... and if it's truly the same variable, or a new copy

### ES6 (ECMAScript 6, ECMAScript 2015):
> **let** allows Javascript engine to use block scoping. Similar to **var**... more options of how to scope a variable with the new version of Javascript.

> blocks are within {}

## What about asynchronous callbacks?
- **asynchronous:** more than one at a time
- Although the Javascript Engine is synchronous, there are other engines within the browser that Javascript has hooks to them to make them asynchronous
- **Event Queue**: where all events are held, such as http request, click event, etc. This doesn't get looked at until the **stack** is empty.
- The event queue won't be processed until the execution stack is empty, until Javascript is done reading that code line by line. **So it isn't REALLY asynchronous.** What is happening is that the browser asynchronously is putting things into the event queue.

# Types and Operators
 ## Types and Javascript:
 ### **Dynamic Typing**: you don't tell the the engine what type of data a variable holds, it figures it out while your code is running. *(variables can hold different types of values because it's all figured out during execution)*

 Languages like Java or C#, they use something called **Static Typing** which means you tell the engine (compiler) ahead of time what kind of data you intend to hold inside a variable. Example: You might have a keyword like bool to say that this variable should hold a Boolean value, either true or false, and if you try to put a value that is other than a Boolean into that variable, you get an error... **JAVASCRIPT is NOT like that (Dynamic Typing)** You can change the bool to a string or number or whatever.

 ## Primitive Types - 6 total (type of data that represents a single value - not an object)
 - **Undefined** represents lack of existence (you shouldn't set a variable to this)
 - **Null** represents lack of existence (you can set a variable to this)
 - **Boolean** true or false
 - **Number** floating point number (there's always some decimals). Unlike other programming languages, there's only one 'number' type... and it can make math weird.
 - **String** a sequence of characters (bother ' and " can be used)
 - **Symbol** Used in ES6 (the next version of Javascript)

## Operators
- A special function that is syntactically (written) differently *Generally, operators take two parameters and return one result.*
- The operators are functions within Javascript
- **Infix Notation** the ability to write code as 3 + 4 vs +(3,4)... the addition side is inbetween the parameters. **Prefix notation** is + 3 4; and **Postfix notation** is 3 4+; (alot of old scholl calculators work this way)

**operators** + - > < * / % << >> >>> <= >= and soo many more...

## Operator Precedence and associativity
- **Operator Precendence** which operator function gets called first. Functions are called in order of precedence (higher precedence wins)
- **Associativity** what order operator functions get called in: left-to-right or right-to-left. When function have the same precedence

[Click here to see Operator Precedence]( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence.compiler)

##FRAMEWORK ASIDE
- To fix colliding libraries you can write (angular and jquery maybe?):
``
window.libraryName = window.libraryName || "Lib 2";
``

# OBJECTS AND FUNCTIONS
## Objects and the Dot
- Name/ Value pairs
- Primitive "property"
- Object "property"
- Function "method"

## computer member access operator > '[]'
```
var person = new Object();
person["firstname"] = "Tony";
person["lastname"] = "Alicea";

var firstNameProperty = "firstname";

console.log(person);
console.log(person[firstNameProperty]);

//faster to type after the "." is 'searching' for a string/property with that name= 'firstname'
console.log(person.firstname);

//create an object in an object
person.address = new Object();

//create an property on the most inner object
person.address.street = "111 Main St.";
person.address.city = "New York";
person.address.state = "NY";
//prefered
console.log(person.address.state);
//not recommended, but works the same way
console.log(person.["address"]["state"]);
```

## Object and Object Literals
- Object Literals (much faster to write) is the curly braces = {}
```
//assumes creating an object
var person = {};
console.log(person);

//below are the same thing
var person = {
  firstname: 'Tony',
  lastname: 'Alicea',
  address: {
    street: '111 Main St',
    city: 'New York',
    state: 'NY'
  }
};
console.log(person);

person = new Object();
person.firstname = "Tony";
person.lastname = "Alicea";

function greet(person) {
  console.log('Hi ' + person.firstname);
}

greet(Tony);

greet({
  firstname: 'Mary';
  lastname: 'Doe'
});

Tony.address2 = {
  street: '333 Secont St.'
}
```

### Javascript doesn't have namespaces (we can fake them)
1. **NameSpace**: A container for variables and functions. Typically to keep variables and functions with the same name seperate
```
var greet = 'Hello!';
var greet = 'Hola!';

console.log(greet);

var english = {};
var spanish = {};

english.greet = 'Hello!';
spanish.greet = 'Hola!';

console.log(english);
```

## JSON (JavaScript Object Notation)
- Not the same as object literal notation, but it is inspired by it and looks very similar to it
```
var objectLiteral1 = {
  firstname: 'Mary',
  isAProgrammer: true
}

console.log(objectLiteral);

//back in the day XML syntax (longer download times)
<object>
  <firstname>Mary</fistname>
  <isAProgrammer>true</isAProgrammer>
</object>

//anything that is JSON, expects the properties to be wrapped in quotes
//JSON is technically a subset of the object literal syntax. Meaning that anything that is JSON valid is also valid JavaScript object literal syntax. But not **ALL**

object literal syntax is valid JSON (JSON is more strict and puts quotes around property names)
{
  "fistname" : "Mary",
  "isProgrammer" : true
}

//can call to convert object literal to JSON
console.log(JSON.stringigy(objectLiteral1));

//and call JSON.parse to convert to object literal
var jsonValue = JSON.parse('{ "firstname": "Mary", "isAProgrammer": true }');

console.log(jsonValue);

```

## Functions are Objects

1. **First Class Functions** = Everything you can do with other types you can do with functions. Assign them to cariables, pass them around, create them on the fly.

1. Function = a special type of object... you can attach the same things you can attact to an object such as: "Primitive, Object, Function" can have the following properties: "Name(optional can be anonymous), and CODE(invocable- meaning that you can say run this code sitting on that property"

## Function Statements and Function Expressions
1. **Expression** - a unit of code that results in a value. It doesn't have to save to a variable.
examples:
```
a = 3;
$ 3
1 + 2;
$ 3

//if is a statement and expression results in value
if (a === 3) {

}

//function statement - this gets hoisted to the top... so you can call the function earlier then when it's defined
greet();

function greet() {
  console.log('hi');
}

//this function is considered an expression because it is set to to a variable, ends up being hoisted as an annoynoumous function until it is read inline.

var anonymousGreet = function() {
  cosole.log('hi');
}

anonymousGreet();
```
1. First class function : you can create a function on the fly (similar to object literal)
```
function log(a) {
  a();
}
//invoke code within another code.
log(function () {
  console.log('hi');
});
```
- **FIST CLASS FUNCTIONS introduces FUNCTIONAL PROGRAMMING**
>this concept of first class functions then, where you can pass functions around, give functions to other functions use them like you do variables, introduces an entirely new class of programming, called **functional programming**

## Conceptional aside by VALUE vs by REFERENCE
- both cases we are talking about variables
```
//by value (primitives)
var a = 3;
var b;
// be is only a copy of a and has it's own space in value
b = a;
a = 2;

results (b = )

// by reference (all objects (including functions))
var c = { greeting: 'hi' };
var d;

d = c;
c.greeting = 'hello'; //mute (means to change something - 'immutable' means it can't be changed)

console.log(c);
console.log(d);

//this poits to same location in memory
c = $ {greeting: 'hello'}
d = $ {greeting: 'hello'}

```

## Types of ways to create and invoke functions:
```
//fuction statement
function statement () {
  console.log('I am a statement');
}
statement();

//function expression
var expression = function() {
  console.log('I am an expression');
}
expression();

//IIFE = Immediately Invoked Function Expressions
var expression = function() {
  console.log('I am an expression');
}();

var greeting = function(name) {
  return 'Hello' + name;
}('John');

console.log(greeting);
```

## Understanding Closures (Part 1)
1. To start with we're going to write a bit of code to show the power of closures then go under the hood to understand them.
- **CODE**
```
function greet(whattosay) {
  return function(name) {
    console.log(whattosay + ' ' + name);
  }
}

//1.
greet('Hi')('Tony');

$ Hi Tony

//2.
var sayHi = greet('Hi');
sayHi('Tony')

$ Hi Tony
```
- **UNDER THE HOOD**
* 1st when the code starts we have our Global Execution Context. When I hit this line ``sayHi = greet`` it invokes the greet function, the new execution context is created. And the variable that's passed to it, ``whattosay``, is siting in its variable environment. It returns a new function object. It creates a function on the fly, and returns it. And that's it.
![img](images/closures.png)

* So after that return, the greet execution context is popped off the stack. It's gone. But here's a question... We said every execution context has this space in memory, where the variables and functions created inside of it live. What happens to that memory space when the execution contect goes away? Well under normal circumstances, the JavaScript engine would eventually clear it out with a process called garbage collection. But at the moment that execution context finishes, that memory space is still there. The execution context may be gone but it's just sitting there somewhere in memory.
![img](images/closures2.png)

* All right, now we move on and we're inside the global execution context again. And then we invoke the function that sayHi is pointing at. It's an anonymous function, because we didn't give out function a name when we returned it.
![img](images/closures3.png)

* And then that creates a new execution context. And I've passed the name variable, Tony. So that will end up in its memory. So that will end up in its memory.
![img](images/closures4.png)

* But when I hit this line, console.log. When its code is invoked and JavaScript engine sees the ``whattosay`` variable, what does the JavaScript engine do? Well it goes up the scope chain. There's an outer lexical environment reference. In other words it goes to the next point outside where the function was created to look for that variable, since it couldn't find it inside the function itself.
![img](images/closures5.png)

* And even though the execution context of that function greet is gone, was popped off the stack, the sayHi execution context still has a reference to the variables, to the memory space of its outer environment. In other words, even thought the greet function ended, it finished, any function created inside of it when they are called will still hae a reference to that greet function's memory. To what was in its memory, its execution context memory space. Think about this for a second. Greet is gone, the execution context is gone. But what's in memory for that execution context isn't and the JavaScript engine makes sure that my function can still go down the scope chain and find it. Even though it's not even on the execution stack anymore.
![img](images/closures6.png)

* And this way we say that the execution context has closed in its outer variables, the variables that it would normally have reference to anyway. Even though those execution contexts are gone. And **so this phenomenon, of it closing in all the variables that it's supposed to have access to, is called a closure.** Makes sense? It isn't something, then, that you create, that you type, that you tell the JavaScript engine to do.
![img](images/closures7.png)

* Closures are simply a feature of the JavaScript programming language. They just happen. It doesn't matter when we invoke a function. We don't have to worry if its outer environments are still running. The JavaScript engine will always make sure that whatever function I'm running, that it will ave access to the variables that it's supposed to have access to. That its scope is intact. Makes sense? This is a feature of the language that's extraordinarily important and powerful. We rely on it a lot. It allows us to make some really interesting coding patterns. And understanding what's happening under the hood helps us to understand closures aren't all that complicated. They're just a feature to make sure that, when you run a function, it works the way it's supposed to,; that it has access to those outer variables. It doesn't matter whether the outer functions have finished runnign or not. So when you say, oh I create a closure. Well sort of. You'll read that sometimes, I create a closure. The JavaScript engine creates the closure. We're just taking advantage of it.

## Understanding Closures (Part 2)
* All right, so let's look at what may be the classic example of how closures can end up in surprising results when you look at code. But, if you understand what's happenign under the hood it may not be so surprising after all.

