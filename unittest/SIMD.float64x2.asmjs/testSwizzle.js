function asmModule(stdlib, imports) {
    "use asm";
    
    var i4 = stdlib.SIMD.int32x4;
    var i4check = i4.check;
    var i4fromFloat64x2 = i4.fromFloat64x2;
    var i4fromFloat64x2Bits = i4.fromFloat64x2Bits;
    var i4fromFloat32x4 = i4.fromFloat32x4;
    var i4fromFloat32x4Bits = i4.fromFloat32x4Bits;
    //var i4abs = i4.abs;
    var i4neg = i4.neg;
    var i4add = i4.add;
    var i4sub = i4.sub;
    var i4mul = i4.mul;
    var i4swizzle = i4.swizzle;
    var i4shuffle = i4.shuffle;
    var i4withX = i4.withX;
    var i4withY = i4.withY;
    var i4withZ = i4.withZ;
    var i4withW = i4.withW;
    var i4lessThan = i4.lessThan;
    var i4equal = i4.equal;
    var i4greaterThan = i4.greaterThan;
    var i4select = i4.select;
    var i4and = i4.and;
    var i4or = i4.or;
    var i4xor = i4.xor;
    var i4not = i4.not;
    //var i4shiftLeftByScalar = i4.shiftLeftByScalar;
    //var i4shiftRightByScalar = i4.shiftRightByScalar;
    //var i4shiftRightArithmeticByScalar = i4.shiftRightArithmeticByScalar;

    var f4 = stdlib.SIMD.float32x4;  
    var f4check = f4.check;  
    var f4fromFloat64x2 = f4.fromFloat64x2;
    var f4fromFloat64x2Bits = f4.fromFloat64x2Bits;
    var f4fromInt32x4 = f4.fromInt32x4;
    var f4fromInt32x4Bits = f4.fromInt32x4Bits;
    var f4abs = f4.abs;
    var f4neg = f4.neg;
    var f4add = f4.add;
    var f4sub = f4.sub;
    var f4mul = f4.mul;
    var f4div = f4.div;
    var f4clamp = f4.clamp;
    var f4min = f4.min;
    var f4max = f4.max;
    var f4reciprocal = f4.reciprocal;
    var f4reciprocalSqrt = f4.reciprocalSqrt;
    var f4sqrt = f4.sqrt;
    var f4swizzle = f4.swizzle;
    var f4shuffle = f4.shuffle;
    var f4withX = f4.withX;
    var f4withY = f4.withY;
    var f4withZ = f4.withZ;
    var f4withW = f4.withW;
    var f4lessThan = f4.lessThan;
    var f4lessThanOrEqual = f4.lessThanOrEqual;
    var f4equal = f4.equal;
    var f4notEqual = f4.notEqual;
    var f4greaterThan = f4.greaterThan;
    var f4greaterThanOrEqual = f4.greaterThanOrEqual;

    var f4select = f4.select;
    var f4and = f4.and;
    var f4or = f4.or;
    var f4xor = f4.xor;
    var f4not = f4.not;

    var d2 = stdlib.SIMD.float64x2;  
    var d2check = d2.check;  
    var d2fromFloat32x4 = d2.fromFloat32x4;
    var d2fromFloat32x4Bits = d2.fromFloat32x4Bits;
    var d2fromInt32x4 = d2.fromInt32x4;
    var d2fromInt32x4Bits = d2.fromInt32x4Bits;
    var d2abs = d2.abs;
    var d2neg = d2.neg;
    var d2add = d2.add;
    var d2sub = d2.sub;
    var d2mul = d2.mul;
    var d2div = d2.div;
    var d2clamp = d2.clamp;
    var d2min = d2.min;
    var d2max = d2.max;
    var d2reciprocal = d2.reciprocal;
    var d2reciprocalSqrt = d2.reciprocalSqrt;
    var d2sqrt = d2.sqrt;
    var d2swizzle = d2.swizzle;
    var d2shuffle = d2.shuffle;
    var d2withX = d2.withX;
    var d2withY = d2.withY;
    var d2lessThan = d2.lessThan;
    var d2lessThanOrEqual = d2.lessThanOrEqual;
    var d2equal = d2.equal;
    var d2notEqual = d2.notEqual;
    var d2greaterThan = d2.greaterThan;
    var d2greaterThanOrEqual = d2.greaterThanOrEqual;
    var d2select = d2.select;

    var fround = stdlib.Math.fround;

    var globImportF4 = f4check(imports.g1);       // global var import
    var globImportI4 = i4check(imports.g2);       // global var import
    var globImportD2 = d2check(imports.g3);       // global var import
    var g1 = f4(1.0,2.0,3.0, -0.0);          // global var initialized
    var g2 = f4(-5.3, -0.0,7.332,8.0);          // global var initialized
    var g3 = i4(1,2,3,4);          // global var initialized
	var g4 = i4(5,6,7,8);          // global var initialized
	var g5 = d2(1.0,-0.0);          // global var initialized
	var g6 = d2(3.0,4.0);          // global var initialized
    var gval = 1234;
    var gval2 = 1234.0;

    var f4splat = f4.splat;
	
	var sqrt = stdlib.Math.sqrt;
	var pow = stdlib.Math.pow;
	
    var loopCOUNT = 3;

	function swizzle1()
    {
        var xy = d2(0.0,0.0);
		var xx = d2(0.0,0.0);
		var yy = d2(0.0,0.0);
		var yx = d2(0.0,0.0);
		
		var x=0.0,y=0.0,z=0.0,w=0.0;

        var loopIndex = 0;
        while ( (loopIndex|0) < (loopCOUNT|0)) {
			
            xy = d2swizzle(g5, 0,1);
			xx = d2swizzle(g6, 0,0);
			yy = d2swizzle(g5, 1,1);
			yx = d2swizzle(g6, 1, 0);
			
            loopIndex = (loopIndex + 1) | 0;
        }
		x = +sqrt((+xy.x * +xy.x) + (+xy.y* +xy.y));
		y = +sqrt((+xx.x * +xx.x) + (+xx.y* +xx.y));
		
        
		return d2check(d2(x,y));
        
    }
    
    function swizzle2()
    {
        var xy = d2(0.0,0.0);
		var xx = d2(0.0,0.0);
		var yy = d2(0.0,0.0);
		var yx = d2(0.0,0.0);
		var v1 = d2(122.0, -0.0);
        var v2 = d2(102.0, -33.13);
		var x=0.0,y=0.0,z=0.0,w=0.0;
		
        var loopIndex = 0;
        for (loopIndex = 0; (loopIndex | 0) < (loopCOUNT | 0) ; loopIndex = (loopIndex + 1) | 0)
        {
            xy = d2swizzle( d2add(v1,v2), 0, 1);
			xx = d2swizzle( d2mul(v1, v2), 0, 0);
			yx = d2swizzle( d2sub(v1, v2), 1,0);
			yy = d2swizzle( v2, 1, 1);
        }

		x = +sqrt((+xy.x * +xy.x) + (+xy.y* +xy.y));
		y = +sqrt((+xx.x * +xx.x) + (+xx.y* +xx.y));
		
        
		return d2check(d2(x,y));
    }

    function swizzle3()
    {
        var xy = d2(0.0,0.0);
		var xx = d2(0.0,0.0);
		var yy = d2(0.0,0.0);
		var yx = d2(0.0,0.0);
		
		var x=0.0,y=0.0,z=0.0,w=0.0;
		var v1 = d2(122.0, -0.0);
        var loopIndex = 0;
        loopIndex = loopCOUNT | 0;
        do {

            xy = d2swizzle( d2add(v1, g5), 0,1);
			xx = d2swizzle( d2mul(v1, g5), 0,0);
			yx = d2swizzle( d2sub(v1, g5), 1,0);
			yy = d2swizzle( g5, 1,1);

            loopIndex = (loopIndex - 1) | 0;
        }
        while ( (loopIndex | 0) > 0);

		x = +sqrt((+xy.x * +xy.x) + (+xy.y* +xy.y));
		y = +sqrt((+xx.x * +xx.x) + (+xx.y* +xx.y));
		
        
		return d2check(d2(x, y));
    }
    
    return {func1:swizzle1 , func2:swizzle2, func3:swizzle3 };
}


var m = asmModule(this, {g1:SIMD.float32x4(9,9,9,9), g2:SIMD.int32x4(1, 2, 3, 4), g3:SIMD.float64x2(10, 10, 10, 10)});

var ret1 = m.func1();
var ret2 = m.func2();
var ret3 = m.func3();


WScript.Echo(typeof(ret1));
WScript.Echo(ret1.toString());

WScript.Echo(typeof(ret2));
WScript.Echo(ret2.toString());

WScript.Echo(typeof(ret3));
WScript.Echo(ret3.toString());




