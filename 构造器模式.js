
var defineProp = function (obj, key, value){
  Object.defineProperty(obj, key, {
    value: value
  });
};

var person = Object.create(null);

defineProp(person, 'dateofBirth', '1981');

defineProp(person, 'car', 'BenZ');

//创建司机对象，继承person对象
var driver = Object.create(person);

defineProp(driver, 'topSpeed', '100mph');

console.log(driver.dateofBirth);
console.log(driver.topSpeed);


//基本的Constructor

function CarBase (model, year, miles){
  this.model = model;
  this.year = year;
  this.miles = miles;
  this.toString = function (){
    return this.model + ' has done ' + this.miles + ' miles';
  };
}

var civic = new CarBase('Honda Civic', 2009, 130000);
var mondeo = new CarBase('Ford Mondeo', 2010, 220000);

console.log(civic.toString());
console.log(mondeo.toString());

//但它确实有一些问题。其中一个问题是，它使继承变得困难.
//另一个问题是，toString()这样的函数是为每个使用Car构造器创建的新对象而分别重新定义的.

//---------------------------------------------------------------------------------------

//带原型的Constructor

function Car (model, year, miles){
  this.model = model;
  this.year = year;
  this.miles = miles;
}

Car.prototype.toString = function (){
  return this.model + ' has done ' + this.miles + ' miles';
};

var civic = new Car('Honda Civic', 2009, 130000);
var mondeo = new Car('Ford Mondeo', 2010, 220000);

console.log(civic.toString());
console.log(mondeo.toString());