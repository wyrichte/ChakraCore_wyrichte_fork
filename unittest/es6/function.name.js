if (this.WScript && this.WScript.LoadScriptFile) { // Check for running in jc/jshost
    this.WScript.LoadScriptFile("..\\UnitTestFramework\\UnitTestFramework.js");
}

function testGetProperyNames(foo,checkForName)
{
    var properties = Object.getOwnPropertyNames(foo);
    var len = properties.length;
    var check = 0;
    for(var i = 0; i < len; i++)
    {
        var prop = properties[i].toString();
        if(prop == "prototype" || (checkForName && prop == "name") ||
        prop == "arguments" || prop == "caller" || prop == "length")
        {
            check++;
        }
        if (!checkForName && prop == "name")
        {
            return false;
        }
    }
    return check == len;
}

var tests = [
   {
       name: "function.name",
       body: function () 
       {
            function foo(){} //function declaration
            assert.areEqual("foo",foo.name,"name should be foo");
            foo.name = "bar"; 
            assert.areEqual("foo",foo.name, "function names are read only");
            assert.areEqual("funcExpr",(function funcExpr(){}).name,"function expression case should still print a name");
            assignment = function(){}; // "assignment"
            assert.areEqual("assignment",assignment.name,"Assignment functions should print the assigned name");
            var lambdaDecl = () => {}; // "lambda assignment"
            assert.areEqual("lambdaDecl",lambdaDecl.name,"lambda assignment should print the assigned name");
            var a = function bar() {}
            var b = foo;
            assert.areEqual("bar",a.name,"Assignment functions should inherit the declaration name in this case bar");
            assert.areEqual("foo",b.name,"Assignment functions should inherit the declaration name in this case foo");
       }
   },
   {
       name: "function.name for external functions",
       body: function () 
       {
            assert.areEqual("LoadScriptFile",WScript.LoadScriptFile.name,"check to make sure external functions are supported");
            assert.areEqual("prototype,name,caller,arguments",Object.getOwnPropertyNames(WScript.Quit).toString(),"Check to make sure name is exposed");
            var a = WScript.Echo.toString();
            var b = WScript.Echo.name;
            assert.areEqual("Echo",b,"Check Bug 639652 is fixed b should be name not toString");
            
       }
    },
    {
       name: "static name method overrides the creation of a name string.",
       body: function () 
       {
             //default constructor case
             var qux = class { static name() {} };
             assert.areEqual("function", typeof qux.name, 
                "14.5.15 Runtime Semantics: If the class definition included a 'name' static method then that method is not over-written");
             assert.areEqual("name",qux.name.name,"confirm we get the name 'name'");
             assert.areEqual(qux.name , qux.prototype.constructor.name,
                "confirm qux.prototype.constructor.name is the same functionn as qux.name");
             assert.areEqual("Function",qux.constructor.name,"The function constructor should still have the name Function");
             
             var qux = class { constructor(a,b) {} static name() {} };
             var quxobj = new qux(1,2);
             assert.areEqual("function", typeof qux.name, 
                "14.5.15 Runtime Semantics: If the class definition included a \"name\" static method then that method is not over-written");
             assert.areEqual("name",qux.name.name,"confirm we get the name \"name\"");
             assert.areEqual(qux.name , qux.prototype.constructor.name,
                "confirm qux.prototype.constructor.name is the same function as qux.name");
             assert.areEqual("Function",qux.constructor.name,"The function constructor should still have the name Function");
       }
    },
    {
       name: "function.name for built in constructors",
       body: function () 
       {
            function* gf() { }             
            assert.areEqual("GeneratorFunction", gf.constructor.name);
            assert.areEqual("Array", Array.name);
            assert.areEqual("ArrayBuffer", ArrayBuffer.name);
            assert.areEqual("DataView", DataView.name);
            assert.areEqual("Error", Error.name);
            assert.areEqual("SyntaxError", SyntaxError.name);
            assert.areEqual("EvalError", EvalError.name);
            assert.areEqual("RangeError", RangeError.name);
            assert.areEqual("ReferenceError", ReferenceError.name);
            assert.areEqual("Boolean", Boolean.name);
            assert.areEqual("Symbol", Symbol.name);
            assert.areEqual("Promise", Promise.name);
            assert.areEqual("Proxy", Proxy.name);
            assert.areEqual("Date", Date.name);
            assert.areEqual("Function", Function.name);
            assert.areEqual("Number", Number.name);
            assert.areEqual("Object", Object.name);
            assert.areEqual("RegExp", RegExp.name);
            assert.areEqual("String", String.name);
            assert.areEqual("Map", Map.name);
            assert.areEqual("Set", Set.name);
            assert.areEqual("WeakMap", WeakMap.name);
            assert.areEqual("WeakSet", WeakSet.name);
       }
    },
    {
       name: "Numeric value test cases",
       body: function () 
       {
            var a = [];
            var b = 1;
            var c = 2;
            a[4] = function() {};
            a[1.2] = function() {};
            function foo()
            {
                return a;
            }
            foo()[5] = function() {};
            a[4+3] = function() {};
            a[b] = function() {};
            a[c] = function() {};
            a[b+c] = function() {};
            var index1 = 4;
            var index2 = 4+8;
            var o = { index1 : function() {}, index2 : function() {}, [index1+1] : function() {}}
            assert.areEqual("index1", o.index1.name);
            assert.areEqual("index2",o.index2.name);
            assert.areEqual("5", o[5].name, "when our name has brackets return the computed name")
            assert.areEqual("b",a[1].name,"expressions are not evaluated, default to expression name"); 
            assert.areEqual("c",a[2].name,"expressions are not evaluated, default to expression name"); 
            assert.areEqual("1.2",a[1.2].name,"constants are the given numeric literal");
            var o = { 1.4 : function() {} }; 
            assert.areEqual("1.4",o[1.4].name,"constants are the given numeric literal");
            assert.areEqual("",a[3].name,"expressions are not evaluated, default to empty string since it lacks a variable name");
            assert.areEqual("4",a[4].name,"constants are the given numeric literal");
            assert.areEqual("5",a[5].name,"constants are the given numeric literal");
            assert.areEqual("",a[7].name,"expressions are not evaluated, default to empty string since it lacks a variable name");            
       }
    },
    {
       name: "Strings With Brackets or Periods in them",
       body: function () 
       {
            var o = { "hello.friend" : function() {},
                      "[a" : function() {},
                      "]" : function() {},
                      "]a" : function() {}};
            assert.areEqual("hello.friend",o["hello.friend"].name,"the period is included in the name don't shorten");
            assert.areEqual("[a",o["[a"].name,"the bracket is included in the name don't shorten");
            assert.areEqual("]",o["]"].name,"the bracket is included in the name don't shorten");
            assert.areEqual("]a",o["]a"].name,"the bracket is included in the name don't shorten");
            
            //var o = { "a[" : function() {} };
            //assert.areEqual("a[",o["a["].name,"the bracket is included in the name don't shorten"); //TODO figure out how to fix this case
            var o = { ["a["] : function() {} };
            assert.areEqual("a[",o["a["].name,"computed property names use a different code path");             
            var a = [];
            a["["] = function() {};
            a["]"] = function() {};
            assert.areEqual("",a["["].name);
            assert.areEqual("",a["]"].name);
            a["hello.buddy"] = function() {};
            assert.areEqual("",a["hello.buddy"].name); 
            
            class ClassTest 
            {
              static [".f"]() {}
              static ["f."]() {}
              static ["f["]() {}
              static ["f]"]() {}
              static ["]]f]]"]() {}
              static ["[f"]() {}
              static ["[[[[[f"]() {}
              static ["]f"]() {}
            }
            assert.areEqual("f.", ClassTest["f."].name);
            assert.areEqual(".f", ClassTest[".f"].name);
            assert.areEqual("f[", ClassTest["f["].name);
            assert.areEqual("f]", ClassTest["f]"].name);
            assert.areEqual("]]f]]", ClassTest["]]f]]"].name);
            assert.areEqual("[f", ClassTest["[f"].name);
            assert.areEqual("[[[[[f", ClassTest["[[[[[f"].name);
            assert.areEqual("]f", ClassTest["]f"].name);
       }
    },
    {
       name: "Class.name",
       body: function () 
       {
            var a = class foo {}
            assert.areEqual("foo",a.name,"should pick the class name not the assignment name");
            class ClassDecl {} // constructor is "ClassDecl"
            var c = class { method(){}}
            var b = new c();
            assert.areEqual("ClassDecl",ClassDecl.name,"name should be ClassDecl");
            assert.areEqual("c",c.name,"class name should be c");
            assert.areEqual("method",b.method.name,"c is a constructor, b is an instance so method is accessible on b");
            ClassDecl.name = "foo"; 
            assert.areEqual("ClassDecl",ClassDecl.name, "function names are read only");
            assert.areEqual("ClassExpr",(class ClassExpr {}).name,"class expression case should still print a name");
            
            var classFoo  = class 
            {
                constructor(){}                 // "classFoo "
                static func(){}                 // "func"
                method(){}                      // "method"
                get getter(){}                  // "get getter"
                set setter(v){}                 // "set setter"
            };
            
            class classFoo2
            {
                constructor(){}
            }
            assert.areEqual("Function",classFoo2.constructor.name, "classFoo2.constructor.name === 'Function'");
            assert.areEqual("classFoo2",classFoo2.prototype.constructor.name, "confirm that the prototype constructors name is the class name");
            
            var oGet = Object.getOwnPropertyDescriptor(classFoo.prototype,"getter")
            var oSet = Object.getOwnPropertyDescriptor(classFoo.prototype,"setter");
            assert.areEqual("Function",classFoo.constructor.name, "classFoo.constructor.name === 'Function'"); 
            assert.areEqual("classFoo",classFoo.name, "Name of the class should be classFoo");
            assert.areEqual("classFoo",classFoo.prototype.constructor.name, "Name of the constructor should be the class name");
            assert.areEqual("func",classFoo.func.name, "Name should just be func");
            assert.areEqual("method",classFoo.prototype.method.name, "Name should be method");
            assert.areEqual("get getter",oGet.get.name,"Accessors getter should be prefixed with get");  
            assert.areEqual("set setter",oSet.set.name, "Accessors setter should be prefixed with set");
            
            var instanceFoo = new classFoo();
            var instanceFoo2 = new classFoo2();
            assert.areEqual("classFoo2",instanceFoo2.constructor.name, "instance constructor should be class name");
            assert.areEqual("classFoo",instanceFoo.constructor.name, "instance constructor should be class name");
            assert.areEqual("method",instanceFoo.method.name, "instance should have function name method");
       }
    },
    {
       name: "Generator functions",
       body: function () 
       {
            function* gf() { }
            var gfe = function* () { }
            var obj = { gfm : function* () { } }
            //var gfi = new Object.getPrototypeOf(gf).constructor(); //TODO when Ian adds this functionality test this
            assert.areEqual("gf",gf.name, "Generator Declaration");
            assert.areEqual("gfe",gfe.name, "Generator Expression");
            assert.areEqual("gfm",obj.gfm.name, "Generator Method");
            //assert.areEqual("gf",gfi.constructor.name,"The constructor is gf");
            //TODO when Ian adds this functionality test this
            //assert.areEqual("anonymous",(new GeneratorFunction ).name,"Should be anonymous");
       }
    },
    { 
       name: "function.name accessor test",
       body: function () 
       {
            var foo ={
                        value : 0,
                        get : function() { return value;},
                        set : function (val) {value = val}
                    }
            assert.areEqual("get foo",foo.get.name,"name should be  get");
            assert.areEqual("set foo",foo.set.name, "name should be set");
            
            var object = 
            {
                f: function() {}
            };
            assert.areEqual("f",object.f.name, "f should no longer be an empty string");
            object.f.name = "foo"; 
            assert.areEqual("f",object.f.name, "function names are read only");
            
          let obj = 
            {
                prop: () => {},                 
                noOverride: function named(){}, 
                get getter(){ return 0;},        // "get getter"
                set setter(v){},                // "set setter"
                "literal": function(){},        
                5: () => {}                     
            };
            
            var oGet = Object.getOwnPropertyDescriptor(obj,"getter")
            var oSet = Object.getOwnPropertyDescriptor(obj,"setter");
            var oRuntime = Object.getOwnPropertyDescriptor(Map.prototype,"size");
            assert.areEqual("get size",oRuntime.get.name, "");
            assert.areEqual(undefined,oRuntime.set, "");
            assert.areEqual("prop",obj.prop.name,"lambda function name is assigned to prop");
            assert.areEqual("named",obj.noOverride.name, "noOverride inherits name from function named");
            assert.areEqual("get getter",oGet.get.name,"accessors are prefix with get/set");  
            assert.areEqual("set setter",oSet.set.name, "accessors are prefix with get/set"); 
            assert.areEqual("literal",obj.literal.name, "string function definitions are valid");
            assert.areEqual("5",obj["5"].name, "numeral function definitions are valid");
            
            var obj2 =
            {
                method(){}  
            }
            obj2.property = function(){};
            
            assert.areEqual("method",obj2.method.name, "tests functions without the function reserved word");
            assert.areEqual("",obj2.property.name, "test to make sure defining a property outside of a function is empty string"); 

            var obj3 = { get : function foo () { },
                        set : function bar (v) { }};
            //like the var a = function foo() {} case a inherits foo's name
            assert.areEqual("foo",obj3.get.name, "should be inherited name foo");
            assert.areEqual("bar",obj3.set.name, "should be inherited name bar");
       }
    },
   
    {
       name: "function.name Property existence test",
       body: function () 
       {
       	function foo(){}
        
        assert.areEqual(true,testGetProperyNames(foo,true),"Properties on foo");
        assert.areEqual(0,Object.keys(foo).length,"no enumerable properties in function instance foo");
        Object.defineProperty(foo,"name",{writable: false,enumerable: true,configurable: true});
        var o  = Object.getOwnPropertyDescriptor(foo,"name");
        assert.areEqual(true,  o.enumerable,   "Name is redefined to enumerable");
        for (i in foo)
        {
            assert.areEqual("name",i,"Name should be the only enumerable property");
        }
        assert.areEqual(1,Object.keys(foo).length,"name is now an enumerated property");
        assert.areEqual("name",Object.keys(foo).toString(),"Name should be the only enumerable property");
       }
    },
   
    {
       name: "function.name delete test",
       body: function () 
       {
            function foo(){}
            
            assert.areEqual(true,testGetProperyNames(foo,true), "Properties on foo");
            delete foo.name;
            assert.areEqual(true,testGetProperyNames(foo,false),"Properties on foo");
       }
    },
   
    {
       name: "built-in function.name",
       body: function () 
       {
            assert.areEqual("slice",[].slice.name,"name should be slice");
            [].slice.name = "bar"; 
            assert.areEqual("slice",[].slice.name, "function names are read only");
       }
    },
   
   {
       name: "built-in function.name delete test",
       body: function () 
       {
            assert.areEqual(true,testGetProperyNames([].splice,true),"Properties on foo");
            delete [].splice.name;
            assert.areEqual(true,testGetProperyNames([].splice,false),"Properties on foo");
       }
    },
   
    {
       name: "anonymous function",
       body: function () 
       {
            var f = function() { };
            assert.areEqual("f",f.name, "f should no longer be an empty string");
            f.name = "foo"; 
            assert.areEqual("f",f.name, "function names are read only");
            assert.areEqual("",(function(){}).name,"this anonymous function should be an empty string");

       }
    },
    {
       name: "anonymous function special cases",
       body: function () 
       {
           assert.areEqual("anonymous",(new Function).name,"Should be anonymous");
           assert.areEqual("",Function.prototype.name,"Should be empty string");

       }
    },
    {
       name: "nested function assignment names",
       body: function () 
       {
           var obj = 
           {
                x : function(){},
                y : () => {},
                z : class {}
           };
           
           assert.areEqual("x",obj.x.name,"x defined in obj Should be x");
           assert.areEqual("y",obj.y.name,"y defined in obj Should be y");
           assert.areEqual("z",obj.z.name,"z defined in obj Should be z");
           
           var obj = 
           {
                innerObj : 
                {
                    x : function(){},
                    y : () => {},
                    z : class {}
                }
           };
           
           assert.areEqual("x",obj.innerObj.x.name,"Should be x");
           assert.areEqual("y",obj.innerObj.y.name,"Should be y");
           assert.areEqual("z",obj.innerObj.z.name,"Should be z");
           
           var obj = {};
           obj.x = function(){};
           obj.y = () => {};
           obj.z = class {};
           
           assert.areEqual("",obj.x.name,"Should be ''");
           assert.areEqual("",obj.y.name,"Should be ''");
           assert.areEqual("",obj.z.name,"Should be ''");
           
           var obj = {innerObj : {}};
           
           obj.innerObj.x = function(){};
           obj.innerObj.y = () => {};
           obj.innerObj.z = class {};
           
           assert.areEqual("",obj.innerObj.x.name,"Should be ''");
           assert.areEqual("",obj.innerObj.y.name,"Should be ''");
           assert.areEqual("",obj.innerObj.z.name,"Should be ''");

       }
    },
    {
       name: "Check the Class of an Object",
       body: function () 
       {
            function foo(){}
            var f = new foo();

            assert.areEqual("foo",f.constructor.name,"The constructor is foo");
            assert.areEqual(undefined,f.name,"f is an instance of the function foo, the name exists only on the constructor");
            
       }
    },
    {
       name: "Attributes test",
       body: function () 
       {
            function foo(){}
            assert.areEqual(true, foo.hasOwnProperty("name"), "foo should have a name property");
            var o = Object.getOwnPropertyDescriptor(foo,"name");
            
            assert.areEqual(false, o.writable,     "Name is not writable");
            assert.areEqual(false, o.enumerable,   "Name is not enumerable");
            assert.areEqual(true,  o.configurable, "Name is configurable");
            assert.areEqual("foo", o.value,        "Names value should be foo");
            
       }
    },
    {
       name: "Symbol names",
       body: function () 
       {
            var sym1 = Symbol("foo"); 
            var sym2 = Symbol("bar"); 
            var sym3 = Symbol("baz");
            var sym4 = Symbol();            
            var o = {[Symbol.toPrimitive]: function() {}, 
                     [sym1] : function() {},
                     [sym3] : function bear() {},
                     [sym4] : function() {},
                    }
            o[Symbol.unscopables] = function(){}
            o[sym2] = function() {}
            assert.areEqual("[foo]", o[sym1].name, "9.2.11.4 SetFunctionName: If Type(name) is Symbol, then let name be the concatenation of \"[\", description, and \"]\"");
            assert.areEqual("[Symbol.toPrimitive]",o[Symbol.toPrimitive].name,
            "9.2.11.4 SetFunctionName: If Type(name) is Symbol, then let name be the concatenation of \"[\", description, and \"]\"");
            assert.areEqual("", o[Symbol.unscopables].name, "computed property names are not bound to index yet and builtin symbols are not bound to a name so they are empty strings");
            assert.areEqual("sym2", o[sym2].name, "computed property names are not bound to index yet");
            assert.areEqual("bear", o[sym3].name, "if the function already has a name don't overwrite it");
            assert.areEqual("", o[sym4].name, "empty symbols have empty string as a name");
       }
    },
    {  
       name: "Redefine Attributes test",
       body: function () 
       {
            function foo(){}
            
            Object.defineProperty(foo,"name",{writable: true,enumerable: true,configurable: false});
            foo.name = "bar";
            var o  = Object.getOwnPropertyDescriptor(foo,"name");
            
            assert.areEqual(true,  o.writable,     "Name is redefined to writable");
            assert.areEqual(true,  o.enumerable,   "Name is redefined to enumerable");
            assert.areEqual(false, o.configurable, "Name redefined not configurable");
            assert.areEqual("bar", o.value,        "Names value should be bar");
            assert.areEqual("bar",foo.name,"foo renamed to bar");
       	
       }
    },
    {
        name: "strings with null terminators sprinkled in",
        body: function()
        {
            var str = "hello\0 foo";
            var a = [];
            a["hello\0 foo"] = function() {};
            var o = {[str] : function() {}, ["h\0h"] : function() {}}
            var b = {}
            b["hello\0 foo"] = function() {}
            var c = { "hello\0 foo" : function() {} }
            assert.areEqual(str, o[str].name);
            assert.areEqual("h\0h", o["h\0h"].name);
            assert.areEqual("hello\0 foo", a["hello\0 foo"].name);
            assert.areEqual("hello\0 foo", b["hello\0 foo"].name);
            assert.areEqual("hello\0 foo", c["hello\0 foo"].name);
            var d = { "goo.\0d" : function() {} }
            var e = { "g\0oo\0.d" : function() {} }
            var f = { "fo\0o" : class {} }
            assert.areEqual("goo.\0d",  d["goo.\0d"].name);
            assert.areEqual("g\0oo\0.d", e["g\0oo\0.d"].name);
            assert.areEqual("fo\0o", f["fo\0o"].name);

            
        }
    },
    {
        name: "Function Bind",
        body: function()
        {
            function add(x, y) 
            {
                return x+y;
            }
            var AddZer0  = add.bind(null,0 /* x */);
            var Add2Nums = add.bind();
            
            assert.areEqual("bound add",AddZer0.name, "AddZer0  needs a bound prefix on add");
            assert.areEqual("bound add",Add2Nums.name,"Add2Nums needs a bound prefix on add");
        }
    },
    {
        name: "Bug 1642987 & 1242667",
        body: function()
        {
            e = ''['u3 = undefined'] = function () {}
            assert.areEqual('', e.name, "Bug 1642987: we should not AV if we can't shorten the name") ;
            f = ''['[f]o'] = function () {};
            assert.areEqual('', f.name, "Bug 1242667: We need to wrap strings in Brackets") ;
        }
    },
    {
        name: "Bug 2302197",
        body: function()
        {
            var b = {};
            var c = b.x = function Ctor() {}
            var a = new c();
            assert.areEqual('Ctor', b.x.name, "confirm IsNameIdentifierRef does not override IsNamedFunctionExpression");
            assert.areEqual('Ctor', c.name, "confirm IsNameIdentifierRef does not override IsNamedFunctionExpression");
            assert.areEqual('Ctor', a.constructor.name, "confirm IsNameIdentifierRef does not override IsNamedFunctionExpression");
        }
    },
    {
        name: "fix for toString override",
        body: function()
        {
            var b="barzee";
            class foo {
                [b] () {}
            };      
            var inst=new foo();
            inst[b].toString();
            assert.areEqual("barzee",inst[b].name);
        }
    }

];

testRunner.runTests(tests, { verbose: WScript.Arguments[0] != "summary" });
