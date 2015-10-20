// b();
// console.log(a);

// var a = "Hello World"

// function b() {
//   console.log('Called b!');
// }

// b();
// console.log(a);



function a() {
  function b() {
    console.log(myVar);
  }
  var myVar = 2;
  b();
}

var myVar = 1;
a();
