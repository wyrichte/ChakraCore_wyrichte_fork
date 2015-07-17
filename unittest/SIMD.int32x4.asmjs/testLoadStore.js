function asmModule(stdlib, imports, buffer) {
    "use asm";
    
    var i4 = stdlib.SIMD.int32x4;
    var i4check = i4.check;
    var i4splat = i4.splat;
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
    var i4load  = i4.load;
    var i4load1 = i4.load1;
    var i4load2 = i4.load2;
    var i4load3 = i4.load3;
    
    var i4store  = i4.store
    var i4store1 = i4.store1;
    var i4store2 = i4.store2;
    var i4store3 = i4.store3;
    
    //var i4shiftLeftByScalar = i4.shiftLeftByScalar;
    //var i4shiftRightByScalar = i4.shiftRightByScalar;
    //var i4shiftRightArithmeticByScalar = i4.shiftRightArithmeticByScalar;

    var f4 = stdlib.SIMD.float32x4; 
    var f4check = f4.check;    
    var f4splat = f4.splat;
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
    
    var f4load = f4.load;
    var f4load1 = f4.load1;
    var f4load2 = f4.load2;
    var f4load3 = f4.load3;
    
    var f4store  = f4.store;
    var f4store1 = f4.store1;
    var f4store2 = f4.store2;
    var f4store3 = f4.store3;
    
    
    var d2 = stdlib.SIMD.float64x2;  
    var d2check = d2.check;
    var d2splat = d2.splat;
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
    
    var d2load  = d2.load;
    var d2load1 = d2.load1;
    
    var d2store  = d2.store
    var d2store1 = d2.store1;
    
    
    var fround = stdlib.Math.fround;

    var globImportF4 = f4check(imports.g1);       // global var import
    var globImportI4 = i4check(imports.g2);       // global var import
    var globImportD2 = d2check(imports.g3);       // global var import
    var g1 = f4(-5033.2,-3401.0,665.34,32234.1);          // global var initialized
    var g2 = i4(1065353216, -1073741824, -1077936128, 1082130432);          // global var initialized
    var g3 = d2(0.12344,-1.6578);          // global var initialized
    var gval = 1234;
    var gval2 = 1234.0;


    
    var loopCOUNT = 3;
    
    var Int8Heap = new stdlib.Int8Array (buffer);    
    var Uint8Heap = new stdlib.Uint8Array (buffer);    
    
    var Int16Heap = new stdlib.Int16Array(buffer);
    var Uint16Heap = new stdlib.Uint16Array(buffer);
    var Int32Heap = new stdlib.Int32Array(buffer);
    var Uint32Heap = new stdlib.Uint32Array(buffer);
    var Float32Heap = new stdlib.Float32Array(buffer);

    function func1()
    {
        var x = i4(1, 2, 3, 4);
        var t = i4(0, 0, 0, 0);
        var y = i4(0, 0, 0, 0);
        var index = 100;
        var size = 10;
        var loopIndex = 0;
        for (loopIndex = 0; (loopIndex | 0) < (size | 0) ; loopIndex = (loopIndex + 1) | 0)
        {
            i4store(Int8Heap, index >> 0, x);
            index = (index + 16 ) | 0;
        }
        
        index = 100;
        for (loopIndex = 0; (loopIndex | 0) < (size | 0) ; loopIndex = (loopIndex + 1) | 0)
        {
            t = i4load(Uint8Heap, index >> 0);
            y = i4add(y, t);
            index = (index + 16 ) | 0;
        }
        return i4check(y);
    }
    
    function func1OOB_1()
    {
        var x = i4(1, 2, 3, 4);
        var t = i4(0,0,0,0);
        var y = i4(0,0,0,0);
        var index = 0;
        var size = 10;
        var loopIndex = 0;
        
        index = 0x10000-160;
        for (loopIndex = 0; (loopIndex | 0) < (size | 0) ; loopIndex = (loopIndex + 1) | 0)
        {
            i4store(Int8Heap, index >> 0, x);
            index = (index + 16 ) | 0;
        }
        
        // No OOB
        index = 0x10000-160;
        for (loopIndex = 0; (loopIndex | 0) < (size | 0) ; loopIndex = (loopIndex + 1) | 0)
        {
            t = i4load(Uint8Heap, index >> 0);
            y = i4add(y, t);
            index = (index + 16 ) | 0;
        }
        return i4check(y);
    }
    
    function func1OOB_2()
    {
        var x = i4(1, 2, 3, 4);
        var t = i4(0,0,0,0);
        var y = i4(0,0,0,0);
        var index = 0;
        var size = 10;
        var loopIndex = 0;
        
        index = 0x10000-160
        for (loopIndex = 0; (loopIndex | 0) < (size | 0) ; loopIndex = (loopIndex + 1) | 0)
        {
            i4store(Int8Heap, index >> 0, x);
            index = (index + 16 ) | 0;
        }
        
        // OOB
        index = (0x10000-160) + 1;
        for (loopIndex = 0; (loopIndex | 0) < (size | 0) ; loopIndex = (loopIndex + 1) | 0)
        {
            t = i4load(Uint8Heap, index >> 0);
            y = i4add(y, t);
            index = (index + 16 ) | 0;
        }
        return i4check(y);
    }
    
    function func2()
    {
        var x = i4(1, 2, 3, 4);
        var t = i4(0,0,0,0);
        var y = i4(0,0,0,0);
        var index = 100;
        var size = 10;
        var loopIndex = 0;
        for (loopIndex = 0; (loopIndex | 0) < (size | 0) ; loopIndex = (loopIndex + 1) | 0)
        {
            i4store3(Uint16Heap, index >> 1, x);
            index = (index + 16 ) | 0;
        }
        
        index = 100;
        for (loopIndex = 0; (loopIndex | 0) < (size | 0) ; loopIndex = (loopIndex + 1) | 0)
        {
            t = i4load3(Int16Heap, index >> 1);
            y = i4add(y, t);
            index = (index + 16 ) | 0;
        }
        return i4check(y);
    }

    function func2OOB_1()
    {
        var x = i4(1, 2, 3, 4);
        var t = i4(0,0,0,0);
        var y = i4(0,0,0,0);
        var index = 0;
        var size = 10;
        var loopIndex = 0;
        
        index = 0x10000 - 160;
        for (loopIndex = 0; (loopIndex | 0) < (size | 0) ; loopIndex = (loopIndex + 1) | 0)
        {
            i4store3(Uint16Heap, index >> 1, x);
            index = (index + 16 ) | 0;
        }
        
        
        // No OOB here
        index = (0x10000 - 160) + 4;
        for (loopIndex = 0; (loopIndex | 0) < (size | 0) ; loopIndex = (loopIndex + 1) | 0)
        {
            t = i4load3(Int16Heap, index >> 1);
            y = i4add(y, t);
            index = (index + 16 ) | 0;
        }
        return i4check(y);
    }
    
    function func2OOB_2()
    {
        var x = i4(1, 2, 3, 4);
        var t = i4(0,0,0,0);
        var y = i4(0,0,0,0);
        var index = 0;
        var size = 10;
        var loopIndex = 0;
        
        index = (0x10000 - 160);
        for (loopIndex = 0; (loopIndex | 0) < (size | 0) ; loopIndex = (loopIndex + 1) | 0)
        {
            i4store3(Uint16Heap, index >> 1, x);
            index = (index + 16 ) | 0;
        }

        index = (0x10000 - 160) + 6;
        // OOB here
        for (loopIndex = 0; (loopIndex | 0) < (size | 0) ; loopIndex = (loopIndex + 1) | 0)
        {
            t = i4load3(Int16Heap, index >> 1);
            y = i4add(y, t);
            index = (index + 16 ) | 0;
        }
    }
    

    
    function func3()
    {
        var x = i4(1, 2, 3, 4);
        var t = i4(0,0,0,0);
        var y = i4(0,0,0,0);
        var index = 100;
        var size = 10;
        var loopIndex = 0;
        for (loopIndex = 0; (loopIndex | 0) < (size | 0) ; loopIndex = (loopIndex + 1) | 0)
        {
            i4store2(Uint16Heap, index >> 1, x);
            index = (index + 16 ) | 0;
        }
        
        index = 100;
        for (loopIndex = 0; (loopIndex | 0) < (size | 0) ; loopIndex = (loopIndex + 1) | 0)
        {
            t = i4load2(Int32Heap, index >> 2);
            y = i4add(y, t);
            index = (index + 16 ) | 0;
        }
        return i4check(y);
    }
    
    function func3OOB_1()
    {
        var x = i4(1, 2, 3, 4);
        var t = i4(0,0,0,0);
        var y = i4(0,0,0,0);
        var index = 0;
        var size = 10;
        var loopIndex = 0;
        
        index = 0x10000 - 160;
        for (loopIndex = 0; (loopIndex | 0) < (size | 0) ; loopIndex = (loopIndex + 1) | 0)
        {
            i4store2(Uint16Heap, index >> 1, x);
            index = (index + 16 ) | 0;
        }
        
        index = (0x10000 - 160 ) + 8;
        // No OOB
        for (loopIndex = 0; (loopIndex | 0) < (size | 0) ; loopIndex = (loopIndex + 1) | 0)
        {
            t = i4load2(Int32Heap, index >> 2);
            y = i4add(y, t);
            index = (index + 16 ) | 0;
        }
        return i4check(y);
    }
    
    function func3OOB_2()
    {
        var x = i4(1, 2, 3, 4);
        var t = i4(0,0,0,0);
        var y = i4(0,0,0,0);
        var index = 0;
        var size = 10;
        var loopIndex = 0;
        
        index = 0x10000 - 160;
        for (loopIndex = 0; (loopIndex | 0) < (size | 0) ; loopIndex = (loopIndex + 1) | 0)
        {
            i4store2(Uint16Heap, index >> 1, x);
            index = (index + 16 ) | 0;
        }
        
        index = (0x10000 - 160 ) + 32;
        // OOB
        for (loopIndex = 0; (loopIndex | 0) < (size | 0) ; loopIndex = (loopIndex + 1) | 0)
        {
            t = i4load2(Int32Heap, index >> 2);
            y = i4add(y, t);
            index = (index + 16 ) | 0;
        }
        return i4check(y);
    }
    
    function func4()
    {
        var x = i4(1, 2, 3, 4);
        var t = i4(0,0,0,0);
        var y = i4(0,0,0,0);
        var index = 100;
        var size = 10;
        var loopIndex = 0;
        for (loopIndex = 0; (loopIndex | 0) < (size | 0) ; loopIndex = (loopIndex + 1) | 0)
        {
            i4store1(Uint32Heap, index >> 2, x);
            index = (index + 16 ) | 0;
        }
        
        index = 100;
        for (loopIndex = 0; (loopIndex | 0) < (size | 0) ; loopIndex = (loopIndex + 1) | 0)
        {
            t = i4load1(Float32Heap, index >> 2);
            y = i4add(y, t);
            index = (index + 16 ) | 0;
        }
        return i4check(y);
    }
    
    function func4OOB_1()
    {
        var x = i4(1, 2, 3, 4);
        var t = i4(0,0,0,0);
        var y = i4(0,0,0,0);
        var index = 0;
        var size = 10;
        var loopIndex = 0;
        
        index = 0x10000 - 160;
        for (loopIndex = 0; (loopIndex | 0) < (size | 0) ; loopIndex = (loopIndex + 1) | 0)
        {
            i4store1(Uint32Heap, index >> 2, x);
            index = (index + 16 ) | 0;
        }
        
        index = 0x10000 - 160 + 12;
        // No OOB
        for (loopIndex = 0; (loopIndex | 0) < (size | 0) ; loopIndex = (loopIndex + 1) | 0)
        {
            t = i4load1(Float32Heap, index >> 2);
            y = i4add(y, t);
            index = (index + 16 ) | 0;
        }
        return i4check(y);
    }
    
    function func4OOB_2()
    {
        var x = i4(1, 2, 3, 4);
        var t = i4(0,0,0,0);
        var y = i4(0,0,0,0);
        var index = 0;
        var size = 10;
        var loopIndex = 0;
        
        index = 0x10000 - 160;
        for (loopIndex = 0; (loopIndex | 0) < (size | 0) ; loopIndex = (loopIndex + 1) | 0)
        {
            i4store1(Uint32Heap, index >> 2, x);
            index = (index + 16 ) | 0;
        }
        
        index = 0x10000 - 160 + 16;
        // OOB
        for (loopIndex = 0; (loopIndex | 0) < (size | 0) ; loopIndex = (loopIndex + 1) | 0)
        {
            t = i4load1(Float32Heap, index >> 2);
            y = i4add(y, t);
            index = (index + 16 ) | 0;
        }
        return i4check(y);
    }
    
    function func5()
    {
        var x = i4(1, 2, 3, 4);
        var t = i4(0,0,0,0);
        var y = i4(0,0,0,0);
        var index = 100;
        var size = 10;
        var loopIndex = 0;
        for (loopIndex = 0; (loopIndex | 0) < (size | 0) ; loopIndex = (loopIndex + 1) | 0)
        {
            i4store(Uint32Heap, index >> 2, x);
            index = (index + 16 ) | 0;
        }
        
        index = 100;
        for (loopIndex = 0; (loopIndex | 0) < (size | 0) ; loopIndex = (loopIndex + 1) | 0)
        {
            t = i4load2(Float32Heap, index >> 2);
            y = i4add(y, t);
            index = (index + 16 ) | 0;
        }
        return i4check(y);
    }

    function func5OOB_1()
    {
        var x = i4(1, 2, 3, 4);
        var t = i4(0,0,0,0);
        var y = i4(0,0,0,0);
        var index = 0;
        var size = 10;
        var loopIndex = 0;
        index = 0x10000 - 160;
        for (loopIndex = 0; (loopIndex | 0) < (size | 0) ; loopIndex = (loopIndex + 1) | 0)
        {
            i4store(Uint32Heap, index >> 2, x);
            index = (index + 16 ) | 0;
        }
        
        index = 0x10000 - 160 + 8;
        // No OOB
        for (loopIndex = 0; (loopIndex | 0) < (size | 0) ; loopIndex = (loopIndex + 1) | 0)
        {
            t = i4load2(Float32Heap, index >> 2);
            y = i4add(y, t);
            index = (index + 16 ) | 0;
        }
        return i4check(y);
    }
    
    function func5OOB_2()
    {
        var x = i4(1, 2, 3, 4);
        var t = i4(0,0,0,0);
        var y = i4(0,0,0,0);
        var index = 0;
        var size = 10;
        var loopIndex = 0;
        
        index = 0x10000 - 160;
        for (loopIndex = 0; (loopIndex | 0) < (size | 0) ; loopIndex = (loopIndex + 1) | 0)
        {
            i4store(Uint32Heap, index >> 2, x);
            index = (index + 16 ) | 0;
        }
        
        index = 0x10000 - 160 + 12;
        // OOB
        for (loopIndex = 0; (loopIndex | 0) < (size | 0) ; loopIndex = (loopIndex + 1) | 0)
        {
            t = i4load2(Float32Heap, index >> 2);
            y = i4add(y, t);
            index = (index + 16 ) | 0;
        }
        return i4check(y);
    }
    
    function func6()
    {
        var x = i4(1, 2, 3, 4);
        var t = i4(0,0,0,0);
        var y = i4(0,0,0,0);
        var index = 100;
        var size = 10;
        var loopIndex = 0;
        for (loopIndex = 0; (loopIndex | 0) < (size | 0) ; loopIndex = (loopIndex + 1) | 0)
        {
            i4store(Uint32Heap, index >> 2, x);
            index = (index + 16 ) | 0;
        }
        
        index = 100;
        for (loopIndex = 0; (loopIndex | 0) < (size | 0) ; loopIndex = (loopIndex + 1) | 0)
        {
            t = i4load1(Float32Heap, index >> 2);
            y = i4add(y, t);
            index = (index + 16 ) | 0;
        }
        return i4check(y);
    }
    
    function func6OOB_1()
    {
        var x = i4(1, 2, 3, 4);
        var t = i4(0,0,0,0);
        var y = i4(0,0,0,0);
        var index = 0;
        var size = 10;
        var loopIndex = 0;
        
        index = 0x10000 - 160;
        for (loopIndex = 0; (loopIndex | 0) < (size | 0) ; loopIndex = (loopIndex + 1) | 0)
        {
            i4store(Uint32Heap, index >> 2, x);
            index = (index + 16 ) | 0;
        }
        
        index = 0x10000 - 160 + 12;
        // No OOB
        for (loopIndex = 0; (loopIndex | 0) < (size | 0) ; loopIndex = (loopIndex + 1) | 0)
        {
            t = i4load1(Float32Heap, index >> 2);
            y = i4add(y, t);
            index = (index + 16 ) | 0;
        }
        return i4check(y);
    }
    
    function func6OOB_2()
    {
        var x = i4(1, 2, 3, 4);
        var t = i4(0,0,0,0);
        var y = i4(0,0,0,0);
        var index = 0;
        var size = 10;
        var loopIndex = 0;
        
        index = 0x10000 - 160;
        for (loopIndex = 0; (loopIndex | 0) < (size | 0) ; loopIndex = (loopIndex + 1) | 0)
        {
            i4store(Uint32Heap, index >> 2, x);
            index = (index + 16 ) | 0;
        }
        
        index = 0x10000 - 160 + 16;
        // OOB
        for (loopIndex = 0; (loopIndex | 0) < (size | 0) ; loopIndex = (loopIndex + 1) | 0)
        {
            t = i4load1(Float32Heap, index >> 2);
            y = i4add(y, t);
            index = (index + 16 ) | 0;
        }
        return i4check(y);
    }
    
    // TODO: Test conversion of returned value
    function value()
    {
        var ret = 1.0;
        var i = 1.0;
        var loopIndex = 0;
        
        while ( (loopIndex|0) < (loopCOUNT|0)) {

            ret = ret + i;

            loopIndex = (loopIndex + 1) | 0;
        }

        return +ret;
    }
    
    return {
        func1:func1, 
        func1OOB_1:func1OOB_1, 
        func1OOB_2:func1OOB_2, 
        
        func2:func2, 
        func2OOB_1:func2OOB_1, 
        func2OOB_2:func2OOB_2, 
        
        func3:func3, 
        func3OOB_1:func3OOB_1, 
        func3OOB_2:func3OOB_2, 
        
        func4:func4, 
        func4OOB_1:func4OOB_1, 
        func4OOB_2:func4OOB_2, 
        
        func5:func5, 
        func5OOB_1:func5OOB_1, 
        func5OOB_2:func5OOB_2, 
        
        func6:func6,
        func6OOB_1:func6OOB_1,
        func6OOB_2:func6OOB_2
        };
}
var buffer = new ArrayBuffer(0x10000);
var m = asmModule(this, {g1:SIMD.float32x4(90934.2,123.9,419.39,449.0), g2:SIMD.int32x4(-1065353216, -1073741824,-1077936128, -1082130432), g3:SIMD.float64x2(110.20, 58967.0, 14511.670, 191766.23431)}, buffer);

var ret;

ret = m.func1();
WScript.Echo("func1");
WScript.Echo(typeof(ret));
WScript.Echo(ret.toString());

ret = m.func2();
WScript.Echo("func3");
WScript.Echo(typeof(ret));
WScript.Echo(ret.toString());

ret = m.func3();
WScript.Echo("func3");
WScript.Echo(typeof(ret));
WScript.Echo(ret.toString());


ret = m.func4();
WScript.Echo("func4");
WScript.Echo(typeof(ret));
WScript.Echo(ret.toString());


ret = m.func5();
WScript.Echo("func5");
WScript.Echo(typeof(ret));
WScript.Echo(ret.toString());

ret = m.func6();
WScript.Echo("func6");
WScript.Echo(typeof(ret));
WScript.Echo(ret.toString());

//

var funcOOB1 = [m.func1OOB_1, m.func2OOB_1 ,m.func3OOB_1, m.func4OOB_1, m.func5OOB_1, m.func6OOB_1];

for (var i = 0; i < funcOOB1.length; i ++)
{
    try
    {
        ret = funcOOB1[i]();
        WScript.Echo("func" + (i+1) + "OOB_1");
        WScript.Echo(typeof(ret));
        WScript.Echo(ret.toString());
    } catch(e)
    {
        WScript.Echo("Wrong");
    }
}

//
var funcOOB2 = [m.func1OOB_2, m.func2OOB_2 ,m.func3OOB_2, m.func4OOB_2, m.func5OOB_2, m.func6OOB_2];

for (var i = 0; i < funcOOB2.length; i ++)
{
    WScript.Echo("func" + (i+1) + "OOB_2");
    try
    {
        ret = funcOOB2[i]();
        WScript.Echo("Wrong");
        
    } catch(e)
    {
        if (e instanceof RangeError)
            WScript.Echo("Correct");
        else
            WScript.Echo("Wrong");
        
    }
}

