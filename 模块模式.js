//Module模式使用闭包封装“私有”状态和组织。
//它提供了一种包装混合公有/私有方法和变量的方式，防止其泄露至全局作用域，并与别的开发人员的接口发生冲突。
//通过该模式，只需返回一个公有API，而其他的一切则都维持在私有闭包里。

var testModule = (function () {
  var counter = 0;
  return {
    incrementCounter: function () {
      return ++counter;
    },
    resetCounter: function () {
      console.log('counter is set to be Zero');
      counter = 0;
    }
  };
})();

testModule.incrementCounter();
testModule.resetCounter();

var myNamespace = (function () {
  var myPrivateVar = 0;
  var myPrivateMethod = function (foo) {
    console.log(foo);
  };
  return {
    myPublicVar: 'foo',
    myPublicFunction: function (bar) {
      myPrivateVar++;
      myPrivateMethod(bar);
    }
  };
})();

console.log(myNamespace.myPublicVar);


var basketModule = (function () {
  var basket = [];
  function doSTPrivate() {

  }
  function doSTEPrivate() {

  }

  return {
    addItem: function (values) {
      basket.push(values);
    },

    getItemCount: function () {
      return basket.length;
    },

    doST: doSTPrivate,

    getTotal: function () {
      var itemCount = this.getItemCount(),
        total = 0;
      while (itemCount--) {
        total += basket[itemCount].price;
      }
      return total;
    }
  };

})();

basketModule.addItem({
  item: 'bread',
  price: 0.5
});

basketModule.addItem({
  item: 'butter',
  price: 0.3
})

basketModule.addItem({
  item: 'vegetables',
  price: 0.8
})

console.log(basketModule.getItemCount());

console.log(basketModule.getTotal());


//Modules模式变化
//引入混入

var jQuery = require('jquery');
var _ = require('lodash');

var myModule = (function (jQ, _) {

  function privateMethod1() {

    console.log(jQ);

  }

  function privateMethod2() {

    console.log(_.min([10, 4, 3, 52, 12, 6]));

  }
  return {

    publicMethod: function () {

      privateMethod1();

    }

  };

})(jQuery, _);

myModule.publicMethod();

//引出

var myModule = (function () {

  var module = {},

    privateVariable = 'Hello World';

  function privateMethod() {

  }

  module.publicProperty = 'FooBar';

  module.publicMethod = function () {

    console.log(privateVariable);

  };

  return module;

})();

myModule.publicMethod();



//Modules模式的缺点

//Module模式的缺点是：由于我们访问公有和私有成员的方式不同，当我们想改变可见性时，实际上我们必须要修改每一个曾经使用过该成员的地方。
//我们也无法访问那些之后在方法里添加的私有成员。也就是说，在很多情况下，如果正确使用，Module模式仍然是相当有用的，肯定可以改进应用程序的结构。
//其他缺点包括：无法为私有成员创建自动化单元测试，bug需要修正补丁时会增加额外的复杂性。为私有方法打补丁是不可能的。相反，我们必须覆盖所有与有bug的私有方法进行交互的公有方法。另外开发人员也无法轻易地扩展私有方法，所以要记住，私有方法并不像它们最初显现出来的那么灵活。

//揭示模块模式

var myRevealingModule = function (){
  var privateVar = 'Ben Cherry',

  function privateFunction (){
    console.log('Name' + privateVar);
  }

  function publicSetName (strName){
    privateName = strName;
  }

  function publicGetName (){
    privateFunction();
  }

  return {
    setName: publicSetName,
    greeting: privateVar,
    getName: publicGetName
  };
}();

