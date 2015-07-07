if (this.WScript && this.WScript.LoadScriptFile) { // Check for running in
  // jc/jshost
  this.WScript.LoadScriptFile("..\\UnitTestFramework\\UnitTestFramework.js");
}

function p(x) {
  WScript.Echo(x);
}

var tests = [
  {
    name: "Class requires an extends expression if the extends keyword is used",
    body: function () {
      assert.throws(function () { eval("class E extends { }") }, SyntaxError);
    }
  },
  {
    name: "Class declarations require a name",
    body: function () {
      assert.throws(function () { eval("class { }") }, SyntaxError);
    }
  },
  {
    name: "Class methods may not have an octal name",
    body: function () {
      assert.throws(function () { eval("class E0 { 0123() {} }") }, SyntaxError, "0123");
      assert.throws(function () { eval("class E1 { 0123.1() {} }") }, SyntaxError, "0123.1");
    }
  },
  {
    name: "Class prototypes must be non-writable",
    body: function () {
      var d = Object.getOwnPropertyDescriptor(class { }, "prototype");
      assert.isFalse(d.writable);
    }
  },
  {
    name: "Class static methods may not be named 'prototype'",
    body: function () {
      assert.throws(function () { eval("class E0 { static prototype() {} }") }, SyntaxError, "static prototype");
      assert.throws(function () { eval("class E1 { static get prototype() {} }") }, SyntaxError, "static get prototype");
      assert.throws(function () { eval("class E2 { static set prototype(x) {} }") }, SyntaxError, "static set prototype");
    }
  },
  {
    name: "Class special methods may not be named 'constructor'",
    body: function () {
      assert.throws(function () { eval("class E0 { get constructor() {} }") }, SyntaxError, "get constructor");
      assert.throws(function () { eval("class E1 { set constructor(x) {} }") }, SyntaxError, "set constructor");
    }
  },
  {
    name: "Class method names can be duplicated; last one lexically always win",
    body: function () {
      assert.throws(function () { eval("class E0 { constructor() {} constructor() {} }") }, SyntaxError, "Duplicated constructor");

      // Valid
      class A { foo() {} foo() {} }
      class B { get foo() {} get foo() {} }
      class C { set foo(x) {} set foo(x) {} }
      class D { get foo() {} set foo(x) {} }
      class E { static foo() {} static foo() {} }
      class F { static get foo() {} static get foo() {} }
      class G { static set foo(x) {} static set foo(x) {} }
      class H { static get foo() {} static set foo(x) {} }
      class I { foo() {} get foo() {} set foo(x) {}}
      class J { static get foo() {} static set foo(x) {} get foo() {} set foo(x) {} }
      class K { static foo() {} static get foo() {} static set foo(x) {}}

      class L { static foo() {} foo() {} }
      class M { static foo() {} get foo() {} set foo(x) {}}
      class N { foo() {} static get foo() {} static set foo(x) {}}
    }
  },
  {
    name: "Class extends expressions must be (null || an object that is a constructor with a prototype that is (null || an object))",
    body: function () {
      class BaseClass {}
      assert.isTrue(Object.getPrototypeOf(BaseClass.prototype) === Object.prototype, "Object.getPrototypeOf(BaseClass.prototype) === Object.prototype")
      assert.isTrue(Object.getPrototypeOf(BaseClass.prototype.constructor) === Function.prototype, "Object.getPrototypeOf(BaseClass.prototype.constructor) === Function.prototype")

      class ExtendsNull extends null { }
      assert.isTrue(Object.getPrototypeOf(ExtendsNull.prototype) === null, "Object.getPrototypeOf(ExtendsNull.prototype) === null")
      assert.isTrue(Object.getPrototypeOf(ExtendsNull.prototype.constructor) === Function.prototype, "Object.getPrototypeOf(ExtendsNull.prototype.constructor) === Function.prototype")

      function NullPrototype () {}
      NullPrototype.prototype = null;
      class ExtendsNullPrototype extends NullPrototype {}
      assert.isTrue(Object.getPrototypeOf(ExtendsNullPrototype.prototype) === null, "Object.getPrototypeOf(ExtendsNullPrototype.prototype) === null")
      assert.isTrue(Object.getPrototypeOf(ExtendsNullPrototype.prototype.constructor) === NullPrototype, "Object.getPrototypeOf(ExtendsNullPrototype.prototype.constructor) === NullPrototype")

      class ExtendsObject extends Object {}
      assert.isTrue(Object.getPrototypeOf(ExtendsObject.prototype) === Object.prototype, "Object.getPrototypeOf(ExtendsObject.prototype) === Object.prototype")
      assert.isTrue(Object.getPrototypeOf(ExtendsObject.prototype.constructor) === Object, "Object.getPrototypeOf(ExtendsObject.prototype.constructor) === Object")

      function Func () {}
      class ExtendsFunc extends Func {}
      assert.isTrue(Object.getPrototypeOf(ExtendsFunc.prototype) === Func.prototype, "Object.getPrototypeOf(ExtendsFunc.prototype) === Func.prototype")
      assert.isTrue(Object.getPrototypeOf(ExtendsFunc.prototype.constructor) === Func, "Object.getPrototypeOf(ExtendsFunc.prototype.constructor) === Func")


      assert.throws(function () { class A extends 0       { } }, TypeError, "Integer extends");
      assert.throws(function () { class A extends "test"  { } }, TypeError, "String extends");
      assert.throws(function () { class A extends {}      { } }, TypeError, "Object literal extends");
      assert.throws(function () { class A extends undefined { } }, TypeError, "Undefined extends");
      assert.throws(
          function () {
            function Foo() {}
            Foo.prototype = 0;
            class A extends Foo { }
          }, TypeError, "Integer prototype");
      assert.throws(
          function () {
            function Foo() {}
            Foo.prototype = "test";
            class A extends Foo { }
          }, TypeError, "String prototype");
      assert.throws(
          function () {
            function Foo() {}
            Foo.prototype = undefined;
            class A extends Foo { }
          }, TypeError, "Undefined prototype");

      assert.doesNotThrow(function () { eval("class Foo extends new Proxy(class Bar {},{}){}"); });
    }
  },
  {
    name: "Class basic sanity tests",
    body: function () {
      function p(x) {
        WScript.Echo(x);
      }

      class Empty { }
      class EmptySemi { ; }
      class OnlyCtor { constructor() { p('ctor') } }
      class OnlyMethod { method() { p('method') } }
      class OnlyStaticMethod { static method() { p('smethod') } }
      class OnlyGetter { get getter() { p('getter') } }
      class OnlyStaticGetter { static get getter() { p('sgetter') } }
      class OnlySetter { set setter(x) { p('setter ' + x) } }
      class OnlyStaticSetter { static set setter(x) { p('ssetter ' + x) } }

      let empty = new Empty();
      let emptySemi = new EmptySemi();
      let onlyCtor = new OnlyCtor();
      let onlyMethod = new OnlyMethod();
      let onlyStaticMethod = new OnlyStaticMethod();
      let onlyGetter = new OnlyGetter();
      let onlyStaticGetter = new OnlyStaticGetter();
      let onlySetter = new OnlySetter();
      let onlyStaticSetter = new OnlyStaticSetter();

      onlyMethod.method()
      OnlyStaticMethod.method()
      onlyGetter.getter;
      OnlyStaticGetter.getter;
      onlySetter.setter = null;
      OnlyStaticSetter.setter = null;


      class InheritMethod extends OnlyMethod { method2() { p('sub method') } }
      class OverrideMethod extends OnlyMethod { method() { p('sub method') } }

      let inheritMethod = new InheritMethod()
      let overrideMethod = new OverrideMethod()

      inheritMethod.method()
      inheritMethod.method2()

      overrideMethod.method()


      let OnlyMethodExpr = class OnlyMethodExpr { method() { p('method') } }
      let OnlyMethodExprNameless = class { method() { p('method') } }

      let onlyMethodExpr = new OnlyMethodExpr();
      let onlyMethodExprNameless = new OnlyMethodExprNameless();

      onlyMethodExpr.method();
      onlyMethodExprNameless.method();


      class InternalNameUse { static method() { p(InternalNameUse.method.toString()) } }
      let InternalNameUseExpr_ = class InternalNameUseExpr { static method() { p(InternalNameUseExpr.method.toString()) } }

      InternalNameUse.method();
      InternalNameUseExpr_.method();
    }
  },
  {
    name: "Class basic sanity tests in closures",
    body: function () {

      function f1() {
        class Empty { }
        class EmptySemi { ; }
        class OnlyCtor { constructor() { p('ctor') } }
        class OnlyMethod { method() { p('method') } }
        class OnlyStaticMethod { static method() { p('smethod') } }
        class OnlyGetter { get getter() { p('getter') } }
        class OnlyStaticGetter { static get getter() { p('sgetter') } }
        class OnlySetter { set setter(x) { p('setter ' + x) } }
        class OnlyStaticSetter { static set setter(x) { p('ssetter ' + x) } }
        class OnlyComputedMethod { ["cmethod"]() { p('cmethod') } }
        class OnlyStaticComputedMethod { static ["cmethod"]() { p('scmethod') } }
        class OnlyComputedGetter { get ["cgetter"]() { p('cgetter') } }
        class OnlyStaticComputedGetter { static get ["cgetter"]() { p('scgetter') } }
        class OnlyComputedSetter { set ["csetter"](x) { p('csetter ' + x) } }
        class OnlyStaticComputedSetter { static set ["csetter"](x) { p('scsetter ' + x) } }

        function f2() {
          let empty = new Empty();
          let emptySemi = new EmptySemi();
          let onlyCtor = new OnlyCtor();
          let onlyMethod = new OnlyMethod();
          let onlyStaticMethod = new OnlyStaticMethod();
          let onlyGetter = new OnlyGetter();
          let onlyStaticGetter = new OnlyStaticGetter();
          let onlySetter = new OnlySetter();
          let onlyStaticSetter = new OnlyStaticSetter();
          let onlyComputedMethod = new OnlyComputedMethod();
          let onlyComputedGetter = new OnlyComputedGetter();
          let onlyComputedSetter = new OnlyComputedSetter();

          onlyMethod.method()
          OnlyStaticMethod.method()
          onlyGetter.getter;
          OnlyStaticGetter.getter;
          onlySetter.setter = null;
          OnlyStaticSetter.setter = null;
          onlyComputedMethod.cmethod()
          OnlyStaticComputedMethod.cmethod()
          onlyComputedGetter.cgetter;
          OnlyStaticComputedGetter.cgetter;
          onlyComputedSetter.csetter = null;
          OnlyStaticComputedSetter.csetter = null;
        }

        f2();
      }
      f1();

      function f3() {
        class OnlyMethod { method() { p('method') } }
        class InheritMethod extends OnlyMethod { method2() { p('sub method') } }
        class OverrideMethod extends OnlyMethod { method() { p('sub method') } }

        function f4() {
          let inheritMethod = new InheritMethod()
          let overrideMethod = new OverrideMethod()

          inheritMethod.method()
          inheritMethod.method2()

          overrideMethod.method()
        }

        f4();
      }
      f3();

      function f5() {
        let OnlyMethodExpr = class OnlyMethodExpr { method() { p('method') } }
        let OnlyMethodExprNameless = class { method() { p('method') } }

        function f6() {
          let onlyMethodExpr = new OnlyMethodExpr();
          let onlyMethodExprNameless = new OnlyMethodExprNameless();
          onlyMethodExpr.method();
          onlyMethodExprNameless.method();
        }

        f6()
      }
      f5()

      function f7() {
        class InternalNameUse { static method() { p(InternalNameUse.method.toString()) } }
        let InternalNameUseExpr_ = class InternalNameUseExpr { static method() { p(InternalNameUseExpr.method.toString()) } }

        function f8() {
          InternalNameUse.method();
          InternalNameUseExpr_.method();
        }

        f8()
      }
      f7()
    }
  },
  {
    name: "Invalid uses of super",
    body: function () {
      class A {
        constructor() { p('constructor A'); }
        method()      { p('method A'); }
      }

      // Test valid postfix operators in the wrong context
      assert.throws(function () { eval("super();") },        ReferenceError, "Invalid use of super");
      assert.throws(function () { eval("super[1];") },       ReferenceError, "Invalid use of super");
      assert.throws(function () { eval("super.method();") }, ReferenceError, "Invalid use of super");
    }
  },
  {
    name: "Basic uses of super",
    body: function () {
      class A {
        constructor() { this.initialized = true; p('constructor A'); }
        method()      { return 'method A'; }
      }

      class B extends A {
        constructor() {
          super();
          p('constructor B');
        }
        superMethod()      { return super.method() }
        superMethodIndex() { return super['method'](); }
        getAprop()         { return super.initialized; }
        setAprop(value)    { super.initialized = value; }
        getAIndex()        { return super['initialized']; }
        setAIndex(value)   { super['initialized'] = value; }
        lambdaIndex() {
          var mysuper = x => super[x]();
          return mysuper('method');
        }
      }

      let classA = new A();
      let classB = new B();

      // Sanity checks
      assert.isTrue(classA.method() === 'method A', "classA.method() === 'method A'");
      assert.isTrue(classA.initialized === true, "classA.initialized === true");

      // Super checks
      assert.isTrue(classB.initialized === true, "classB.initialized === true");
      assert.isTrue(classB.superMethod() === 'method A', "classB.superMethod() === 'method A'");
      assert.isTrue(classB.initialized === true, "classB.initialized === true");
      classB.setAprop(123);
      assert.isTrue(classB.getAprop() === 123, "classB.getAprop() === 123");
      assert.isTrue(classB.getAIndex() === 123, "classB.getAIndex() === 123");
      classB.setAIndex(456);
      assert.isTrue(classB.getAprop() === 456, "classB.getAprop() === 456");
      assert.isTrue(classB.getAIndex() === 456, "classB.getAIndex() === 456");

      assert.isTrue(classB.lambdaIndex() === 'method A', "classB.lambdaIndex() === 'method A'");
    }
  },
  {
    name: "Super used outside the class declaration function",
    body: function () {
      class A1
      {
        method() { return 3; }
      };

      class A2
      {
        method() { return 2; }
      }

      function GetClassB(Asomething)
      {
        class B extends (Asomething)
        {
          method() { return 4; }
          supermethod() { return super.method(); }
        };
        return B;
      }

      let classB1 = GetClassB(A1);
      let classB2 = GetClassB(A2);
      let b1 = new classB1();
      let b2 = new classB2();

      assert.isTrue(b1.method() === 4, "b1.method() === 4)");
      assert.isTrue(b1.supermethod() === 3, "b1.supermethod() === 3");

      assert.isTrue(b2.method() === 4, "b2.method() === 4");
      assert.isTrue(b2.supermethod() === 2, "b2.supermethod() === 2");
    }
  },
  {
    name: "Super adapts to __proto__ changes",
    body: function () {
      class A1 {
        method() { return "A1"; }
        static staticMethod() { return "static A1"; }
      }
      class A2 {
        method() { return "A2"; }
        static staticMethod() { return "static A2"; }
      }
      class A3 {
        method() { return "A3"; }
        static staticMethod() { return "static A3"; }
      }
  
      class B extends A1 {
        method() { return super.method(); }
        static staticMethod() { return super.staticMethod(); }
      }
  
      assert.areEqual(B.__proto__, A1);
      assert.areEqual(B.prototype.__proto__, A1.prototype);
  
      let instanceB1 = new B();
      let instanceB2 = new B();
      assert.areEqual("A1",                instanceB1.method());
      assert.areEqual("static A1",         B.staticMethod());
      assert.areEqual(instanceB1.method(), instanceB2.method());
  
      // Change the 'static' part of B
      B.__proto__ = A2;
  
      assert.areEqual(B.__proto__,           A2);
      assert.areEqual(B.prototype.__proto__, A1.prototype);
      assert.areEqual("A1",                  instanceB1.method(), "Instance methods should not be affected by B.__proto__ change");
      assert.areEqual("static A2",           B.staticMethod(),    "Static method should have changed after B.__proto__ change");
      assert.areEqual(instanceB1.method(),   instanceB2.method(), "All instances should not have been affected by B.__proto__ change");
  
      // Change the 'dynamic' part of B
      B.prototype.__proto__ = A3.prototype;
  
      assert.areEqual(B.__proto__,           A2);
      assert.areEqual(B.prototype.__proto__, A3.prototype);
      assert.areEqual("A3",                  instanceB1.method(), "Instance methods should be affected after B.prototype.__proto__ change");
      assert.areEqual("static A2",           B.staticMethod(),    "Static methods should be unaffected after B.prototype.__proto__ change");
      assert.areEqual(instanceB1.method(),   instanceB2.method(), "All instances should have been changed by B.prototype.__proto__ change");
    }
  },
  {
    name: "Default constructors",
    body: function () {
      class a { };
      class b extends a { };

      assert.areEqual("constructor() {}", a.prototype.constructor.toString());
      assert.areEqual("constructor(...args) { super(...args); }", b.prototype.constructor.toString());

      var result = [];
      var test = [];
      class c { constructor() { result = [...arguments]; } };
      class d extends c { };
      d();
      assert.areEqual(result, [], "Default extends ctor with no args");

      test = [1, 2, 3];
      d(...test);
      assert.areEqual(result, test, "Default extends ctor with some args");

      test = [-5, 4.53, "test", null, undefined, 9348579];
      d(...test);
      assert.areEqual(result, test, "Default extends ctor with different arg types");
    }
  },
  {
    name: "Evals and lambdas",
    body: function () {
      class a { method() { return "hello world"; } };
      class b extends a {
        method1() { return eval("super.method()"); }
        method2() { return eval("super['method']()"); }
        method3() { return eval("eval('super.method();')"); }
        method4() { return eval("x => super.method()")(); }
        method5() { return (x => eval("super.method()"))(); }
        method6() { return (x => x => x => super.method())()()(); }
        method7() { return (x => eval("x => eval('super.method')"))()()(); }
        method8() { eval(); return (x => super.method())(); }
        method9() { eval(); return (x => function () { return eval("x => super()")(); }())();}
        method10(){ var x = () => { eval(""); return super.method(); }; return x(); }
      }

      let instance = new b();

      assert.areEqual("hello world", instance.method1(), "Basic eval use");
      assert.areEqual("hello world", instance.method2(), "Basic eval use 2");
      assert.areEqual("hello world", instance.method3(), "Nested eval use");
      assert.areEqual("hello world", instance.method4(), "Mixed lambda and eval use, no nesting");
      assert.areEqual("hello world", instance.method5(), "Mixed lambda and eval use, no nesting 2");
      assert.areEqual("hello world", instance.method6(), "Nested lambdas and eval");
      // assert.areEqual("hello world", instance.method7(), "Nested lambdas and nested evals");                 /* Odd spec require this to be a syntax error, let's check Canary */
      assert.areEqual("hello world", instance.method8(), "Lambda with an eval in the parent");
      assert.throws(function() { instance.method9(); }, ReferenceError);
      // assert.throws(function() { (x => eval('super()'))(); }, ReferenceError);                               /* Odd spec require this to be a syntax error, let's check Canary */
      assert.areEqual("hello world", instance.method10(), "Lambda with an eval in the lambda");
    }
  },
  {
    name: "Immutable binding within class body, declarations also have normal let binding in enclosing context",
    body: function() {

      // Class expression with a name, eval should bind against enclosing context, not context containing
      // class name.
      class a{};

      this.k = a;
      var c = class k extends eval('k') {
          k() { k(); }
          reassign() { eval('k = 0; WScript.Echo(k);'); }
      }
      assert.areEqual(Object.getPrototypeOf(c.prototype), this.k.prototype, "Extends calling eval");

      // Class name is immutable within class body.
      var obj1 = new c();
      assert.throws(function() { obj1.reassign() }, ReferenceError);

      // Class name is also immutable within body of class declaration statement
      class Q extends c {
          reassign() { eval('Q = 0;') }
      };
      var obj2 = new Q();
      assert.throws(function() { obj2.reassign() }, ReferenceError);
      // Class name binding in enclosing context is mutable
      Q = 0;
      assert.areEqual(Q, 0, "Mutable class declaration binding");
    }
  },
  {
    name: "Ensure the super scope slot is emitted at the right time",
    body: function () {
      // Previously caused an assert in ByteCodeGen.
      class a { method () { return "hello" } };
      class b extends a { method () { let a; let b; return (x => super.method()); } }
    }
  },
  {
    name: "'super' reference in eval() and lambda",
    body: function () {
        class a {
            method() {return "foo"}
        }

        class b extends a {
            method1() { return eval("super.method()") }
            method2() { var method= () => super.method(); return method(); }
            method3() { return eval("var method= () => super.method(); method();") }
            method4() { return eval("var method=function () { return super.method()}; method();") }
            method5() { return eval("class a{method(){return 'bar'}}; class b extends a{method(){return super.method()}};(new b()).method()") }
        }

        let instance = new b();

        assert.areEqual("foo",instance.method1(),"'super' in eval()");
        assert.areEqual("foo",instance.method2(),"'super' in lambda");
        assert.areEqual("foo",instance.method3(),"'super' in lambda in eval");
        assert.throws(function () { instance.method4()}, ReferenceError, "'super' in function body in eval");
        assert.areEqual("bar",instance.method5(),"'super' in class method in eval");
     }
  },
];

testRunner.runTests(tests);

// BLUE 516429 at global scope
class a {};
a = null; // No error

// OS 257621 at global scope
assert.doesNotThrow(function () { eval('(class {})();'); }, "Parenthesized class expressions can be called");
