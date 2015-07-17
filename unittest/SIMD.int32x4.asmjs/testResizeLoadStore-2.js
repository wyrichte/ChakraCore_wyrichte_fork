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
    
     
    var Int8Array = stdlib.Int8Array;
    var Uint8Array = stdlib.Uint8Array;
    var Int16Array = stdlib.Int16Array;
    var Uint16Array = stdlib.Uint16Array;
    var Int32Array = stdlib.Int32Array;
    var Uint32Array = stdlib.Uint32Array;
    var Float32Array = stdlib.Float32Array;
    
    var Int8Heap = new stdlib.Int8Array (buffer);    
    var Uint8Heap = new stdlib.Uint8Array (buffer);   
    var Int16Heap = new stdlib.Int16Array(buffer);
    var Uint16Heap = new stdlib.Uint16Array(buffer);
    var Int32Heap = new stdlib.Int32Array(buffer);
    var Uint32Heap = new stdlib.Uint32Array(buffer);
    var Float32Heap = new stdlib.Float32Array(buffer);	

    var len=stdlib.byteLength;
    
    function ch(newBuffer) 
	{ 
		if(len(newBuffer) & 0xffffff || len(newBuffer) <= 0xffffff || len(newBuffer) > 0x80000000) 
			return false; 
        
        Int8Heap = new Int8Array(newBuffer);
        Uint8Heap = new Uint8Array(newBuffer);
        Int16Heap = new Int16Array(newBuffer);
        Uint16Heap = new Uint16Array(newBuffer);
        Int32Heap = new Int32Array(newBuffer);
        Uint32Heap = new Uint32Array(newBuffer);
		Float32Heap = new Float32Array(newBuffer);
        
		buffer=newBuffer; 
		return true;
	}
    
 	function storeF32(value, idx) 
	{
		value= i4check(value);
		idx = idx|0;
		idx = idx<<2;
		i4store(Float32Heap, (idx>>2), value);
	}
	function loadF32(idx) 
	{
		idx = idx|0;
		idx = idx<<2;
		return i4load(Float32Heap, (idx>>2));
	}
	
	function storeUI32(value, idx) 
	{ value= i4check(value); idx = idx|0; idx = idx<<2; 
	i4store(Uint32Heap, (idx>>2), value);}
	function loadUI32(idx) 
	{ idx = idx|0; idx = idx<<2; return i4load(Uint32Heap, (idx>>2)); }
	
	function storeI32(value, idx) 
	{ value= i4check(value); idx = idx|0; idx = idx<<2; 
	i4store(Int32Heap, (idx>>2), value);}
	function loadI32(idx) 
	{ idx = idx|0; idx = idx<<2; return i4load(Int32Heap, (idx>>2)); }
	
	function storeI16(value, idx) 
	{ value= i4check(value); idx = idx|0; idx = idx<<1; 
	i4store(Int16Heap, (idx>>1), value);}
	function loadI16(idx) 
	{ idx = idx|0; idx = idx<<1; return i4load(Int16Heap, (idx>>1)); }

	function storeUI16(value, idx) 
	{ value= i4check(value); idx = idx|0; idx = idx<<1; 
	i4store(Uint16Heap, (idx>>1), value);}
	function loadUI16(idx) 
	{ idx = idx|0; idx = idx<<1; return i4load(Uint16Heap, (idx>>1)); }

	function storeI8(value, idx) 
	{ value= i4check(value); idx = idx|0; idx = idx<<0; 
	i4store(Int8Heap, (idx>>0), value);}
	function loadI8(idx) 
	{ idx = idx|0; idx = idx<<0; return i4load(Int8Heap, (idx>>0)); }

	function storeUI8(value, idx) 
	{ value= i4check(value); idx = idx|0; idx = idx<<0; 
	i4store(Uint8Heap, (idx>>0), value);}
	function loadUI8(idx) 
	{ idx = idx|0; idx = idx<<0; return i4load(Uint8Heap, (idx>>0)); }
	
	
	function loadStoreIndex1()
	{
		i4store(Float32Heap, 0, i4(-1,-2,3,-4)); 
		return i4load(Float32Heap, 0);
	}
	
	
	function store_1(functionPicker) //Function picker to pick store1/store2/store3/store
	{
		functionPicker = functionPicker|0;
		var v0 = i4(0,0,0,0);
		var loopIndex = 0, idx = 0, end = 256;		
		while((loopIndex|0) < (loopCOUNT|0)) 
		{
			idx = 0;
			v0 = i4(5,-12,0,2220);
			for(idx = idx << 2; idx < end|0 << 2; idx = (idx + 16)|0)
			{
				switch(functionPicker|0)
				{
					case 5:
						i4store(Float32Heap, idx>>2, v0); 
						break;
					case 6:
						i4store1(Float32Heap, idx>>2, v0);
						break;
					case 7:
						i4store2(Float32Heap, idx>>2, v0);
						break;
					case 8:
						i4store3(Float32Heap, idx>>2, v0);
						break;
					default:
						break;
				}
				v0 = i4add(v0, i4(1,1,1,1));
			}
			loopIndex = (loopIndex + 1)|0;
		}
		//Expects the heap to be: 0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3...15,15,15,15,0,0,0,0...
		return i4load(Float32Heap, 0);
		//Alternate validation
		// for(idx = 0; idx << 2 < end << 2; idx = (idx + 4 << 2)|0)
		// {
			// verify buffer view is as expected. 
			// 0,0,0,0,1,1,1,1,2,2,2,2... 
		// }
	}		
 	function store_2(functionPicker)
    {
		functionPicker = functionPicker|0;
		var v0 = i4(0,0,0,0);
		var loopIndex = 0, idx = 0, end = 256;		
        for (loopIndex = 0; (loopIndex | 0) < (loopCOUNT | 0) ; loopIndex = (loopIndex + 1) | 0)
        {
			idx = 0;
			v0 = i4(0,0,0,0);
			for(idx = idx << 2; idx < end|0 << 2; idx = (idx + 16)|0)
			{
				switch(functionPicker|0)
				{
					case 5:
						i4store(Float32Heap, idx>>2, v0); 
						break;
					case 6:
						i4store1(Float32Heap, idx>>2, v0);
						break;
					case 7:
						i4store2(Float32Heap, idx>>2, v0);
						break;
					case 8:
						i4store3(Float32Heap, idx>>2, v0);
						break;
					default:
						break;
				}
				v0 = i4add(v0, i4(1,1,1,1));
			}
        }
		return i4load(Float32Heap, 8);
    } 
    function store_3(functionPicker)
    {
		functionPicker = functionPicker|0;
		var v0 = i4(0,0,0,0);
		var loopIndex = 0, idx = 0, end = 256;	

        loopIndex = loopCOUNT | 0;
        do {
			idx = 0;
			v0 = i4(0,0,0,0);
			for(idx = idx << 2; idx < end|0 << 2; idx = (idx + 16)|0)
			{
				switch(functionPicker|0)
				{
					case 5:
						i4store(Float32Heap, idx>>2, v0); 
						break;
					case 6:
						i4store1(Float32Heap, idx>>2, v0);
						break;
					case 7:
						i4store2(Float32Heap, idx>>2, v0);
						break;
					case 8:
						i4store3(Float32Heap, idx>>2, v0);
						break;
					default:
						break;
				}
				v0 = i4add(v0, i4(1,1,1,1));
			}
            loopIndex = (loopIndex - 1) | 0;
        }
        while ( (loopIndex | 0) > 0);
		return i4load(Float32Heap, 8);
    } 
	function store_1_Int8(length) 
	{
		length = length|0;
		var v0 = i4(0,0,0,0);
		var loopIndex = 0, idx = 0, end = 0;
		end = length * 4; 
		while((loopIndex|0) < (loopCOUNT|0)) 
		{
			idx = (end - 4096) | 0;
			v0 = i4(0,0,0,0);
			for(idx = idx << 0; idx < end|0 << 0; idx = (idx + 16)|0)
			{
				i4store(Int8Heap, idx>>0, v0); 
				v0 = i4add(v0, i4(1,1,1,1));
			}
			loopIndex = (loopIndex + 1)|0;
		}
		//Expects the heap to be: 0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3...15,15,15,15,0,0,0,0...
		return i4load(Float32Heap, 2);
	}
	function store_1_Uint8(length) 
	{
		length = length|0;
		var v0 = i4(0,0,0,0);
		var loopIndex = 0, idx = 0, end = 0;
		end = length * 4; 
		while((loopIndex|0) < (loopCOUNT|0)) 
		{
			idx = (end - 4096) | 0;
			v0 = i4(0,0,0,0);
			for(idx = idx << 0; idx < end|0 << 0; idx = (idx + 16)|0)
			{
				i4store(Uint8Heap, idx>>0, v0); 
				v0 = i4add(v0, i4(1,1,1,1));
			}
			loopIndex = (loopIndex + 1)|0;
		}
		//Expects the heap to be: 0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3...15,15,15,15,0,0,0,0...
		return i4load(Float32Heap, 2);
	}
	function store_1_Int16(length) 
	{
		length = length|0;
		var v0 = i4(0,0,0,0);
		var loopIndex = 0, idx = 0, end = 0;
		end = length * 4; 
		while((loopIndex|0) < (loopCOUNT|0)) 
		{
			idx = (end - 4096) | 0;
			v0 = i4(0,0,0,0);
			for(idx = idx << 1; idx < end|0 << 1; idx = (idx + 16)|0)
			{
				i4store(Int16Heap, idx>>1, v0); 
				v0 = i4add(v0, i4(1,1,1,1));
			}
			loopIndex = (loopIndex + 1)|0;
		}
		//Expects the heap to be: 0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3...15,15,15,15,0,0,0,0...
		return i4load(Float32Heap, 2);
	}	
	function store_1_Uint16(length) 
	{
		length = length|0;
		var v0 = i4(0,0,0,0);
		var loopIndex = 0, idx = 0, end = 0;
		end = length * 4; 
		while((loopIndex|0) < (loopCOUNT|0)) 
		{
			idx = (end - 4096) | 0;
			v0 = i4(0,0,0,0);
			for(idx = idx << 1; idx < end|0 << 1; idx = (idx + 16)|0)
			{
				i4store(Uint16Heap, idx>>1, v0); 
				v0 = i4add(v0, i4(1,1,1,1));
			}
			loopIndex = (loopIndex + 1)|0;
		}
		//Expects the heap to be: 0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3...15,15,15,15,0,0,0,0...
		return i4load(Float32Heap, 2);
	}	
	function store_1_Int32(length) 
	{
		length = length|0;
		var v0 = i4(0,0,0,0);
		var loopIndex = 0, idx = 0, end = 0;
		end = length * 4; 
		while((loopIndex|0) < (loopCOUNT|0)) 
		{
			idx = (end - 4096) | 0;
			v0 = i4(0,0,0,0);
			for(idx = idx << 2; idx < end|0 << 2; idx = (idx + 16)|0)
			{
				i4store(Int32Heap, idx>>2, v0); 
				v0 = i4add(v0, i4(1,1,1,1));
			}
			loopIndex = (loopIndex + 1)|0;
		}
		//Expects the heap to be: 0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3...15,15,15,15,0,0,0,0...
		return i4load(Float32Heap, 2);
	}	
	function store_1_Uint32(length) 
	{
		length = length|0;
		var v0 = i4(0,0,0,0);
		var loopIndex = 0, idx = 0, end = 0;
		end = length * 4; 
		while((loopIndex|0) < (loopCOUNT|0)) 
		{
			idx = (end - 4096) | 0;
			v0 = i4(0,0,0,0);
			for(idx = idx << 2; idx < end|0 << 2; idx = (idx + 16)|0)
			{
				i4store(Uint32Heap, idx>>2, v0); 
				v0 = i4add(v0, i4(1,1,1,1));
			}
			loopIndex = (loopIndex + 1)|0;
		}
		//Expects the heap to be: 0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3...15,15,15,15,0,0,0,0...
		return i4load(Float32Heap, 2);
	}
	
	////////////////////////////Load////////////////////////////
	function load_1(functionPicker)
    {
		//length = length|0;
		functionPicker = functionPicker|0;
		
		var idx=0,end=16;//(length-4)|0;;
        var loopIndex = 0;
		var v = i4(0,0,0,0);

        while ( (loopIndex|0) < (loopCOUNT|0)) {
			
            idx=0;
			
			for(idx = idx<<2; idx <= end<<2; idx = (idx + 1)|0)
			{		
				switch(functionPicker|0)
				{
					case 1:
						v = i4load(Float32Heap, idx>>2); 
						break;
					 case 2:
						v = i4load1(Float32Heap, idx>>2);
						break;
					case 3:
						v = i4load2(Float32Heap, idx>>2);
						break;
					case 4:
						v = i4load3(Float32Heap, idx>>2);
						break;
					default:
						break;
				}
			}
            loopIndex = (loopIndex + 1) | 0;
        }
		return v;
    }
	 
    function load_2(functionPicker)
    {
		//length = length|0;
		functionPicker = functionPicker|0;
		
		var idx=0,end=16;//(length-4)|0;;
        var loopIndex = 0;
		var v = i4(0,0,0,0);
		
        for (loopIndex = 0; (loopIndex | 0) < (loopCOUNT | 0) ; loopIndex = (loopIndex + 1) | 0)
        {
			 idx=0;
			
			for(idx = idx<<2; idx <= end<<2; idx = (idx + 1)|0)
			{		
				switch(functionPicker|0)
				{
					case 1:
						v = i4load(Float32Heap, idx>>2); 
						break;
					 case 2:
						v = i4load1(Float32Heap, idx>>2);
						break;
					case 3:
						v = i4load2(Float32Heap, idx>>2);
						break;
					case 4:
						v = i4load3(Float32Heap, idx>>2);
						break;
					default:
						break;
				}
			}
        }
		return v;
    }

    function load_3(functionPicker)
    {
		//length = length|0;
		functionPicker = functionPicker|0;
		
		var idx=0,end=16;//(length-4)|0;;
        var loopIndex = 0;
		var v = i4(0,0,0,0);

        loopIndex = loopCOUNT | 0;
        do {
			idx = 0;
			for(idx = idx<<2; idx <= end<<2; idx = (idx + 1)|0)
			{		
				switch(functionPicker|0)
				{
					case 1:
						v = i4load(Float32Heap, idx>>2); 
						break;
					 case 2:
						v = i4load1(Float32Heap, idx>>2);
						break;
					case 3:
						v = i4load2(Float32Heap, idx>>2);
						break;
					case 4:
						v = i4load3(Float32Heap, idx>>2);
						break;
					default:
						break;
				}
			}
            loopIndex = (loopIndex - 1) | 0;
        }
        while ( (loopIndex | 0) > 0);
		return v;
    } 
    function load_1_Int8(length)
    {
		length = length|0;
		var idx=0,end=0;
        var loopIndex = 0;
		var v = i4(0,0,0,0);
		end = length * 4 - 16; 
        while ( (loopIndex|0) < (loopCOUNT|0)) {
            idx= (end - 4096) | 0;
			for(idx = idx<<0; idx <= end<<0; idx = (idx + 1)|0)
			{		
				v = i4load(Int8Heap, idx>>0); 
			}
            loopIndex = (loopIndex + 1) | 0;
        }
		return v;
    }
    function load_1_Uint8(length)
    {
		length = length|0;
		var idx=0,end=0;
        var loopIndex = 0;
		var v = i4(0,0,0,0);
		end = length * 4 - 16; 
        while ( (loopIndex|0) < (loopCOUNT|0)) {
            idx= (length * 4 - 4096) | 0;
			for(idx = idx<<0; idx <= end<<0; idx = (idx + 1)|0)
			{		
				v = i4load(Uint8Heap, idx>>0); 
			}
            loopIndex = (loopIndex + 1) | 0;
        }
		return v;
    }
    function load_1_Int16(length)
    {
		length = length|0;
		var idx=0,end=0;
        var loopIndex = 0;
		var v = i4(0,0,0,0);
		end = length * 2 - 8;
        while ( (loopIndex|0) < (loopCOUNT|0)) {
            idx= (end - 4096) | 0;
			for(idx = idx<<1; idx <= end<<1; idx = (idx + 1)|0)
			{		
				v = i4load(Int16Heap, idx>>1); 
			}
            loopIndex = (loopIndex + 1) | 0;
        }
		return v;
    }
    function load_1_Uint16(length)
    {
		length = length|0;
		var idx=0,end=120;
        var loopIndex = 0;
		var v = i4(0,0,0,0);
		end = length * 2 - 8;
        while ( (loopIndex|0) < (loopCOUNT|0)) {
            idx= (end - 4096) | 0;
			for(idx = idx<<1; idx <= end<<1; idx = (idx + 1)|0)
			{		
				v = i4load(Uint16Heap, idx>>1); 
			}
            loopIndex = (loopIndex + 1) | 0;
        }
		return v;
    }
    function load_1_Int32(length)
    {
		length = length|0;
		var idx=0,end=60;
        var loopIndex = 0;
		var v = i4(0,0,0,0);
		end = length * 1 - 4;
        while ( (loopIndex|0) < (loopCOUNT|0)) {
            idx= (end - 4096) | 0;
			for(idx = idx<<2; idx <= end<<2; idx = (idx + 1)|0)
			{		
				v = i4load(Int32Heap, idx>>2); 
			}
            loopIndex = (loopIndex + 1) | 0;
        }
		return v;
    }
    function load_1_Uint32(length)
    {
		length = length|0;
		var idx=0,end=60;
        var loopIndex = 0;
		var v = i4(0,0,0,0);
		end = length * 1 - 4;
        while ( (loopIndex|0) < (loopCOUNT|0)) {
            idx= (end - 4096) | 0;
			for(idx = idx<<2; idx <= end<<2; idx = (idx + 1)|0)
			{		
				v = i4load(Uint32Heap, idx>>2); 
			}
            loopIndex = (loopIndex + 1) | 0;
        }
		return v;
    }	
	
	return {
            changeHeap:ch
           ,store1:store_1
		   ,store2:store_2
		   ,store3:store_3
		   ,store1Int8:store_1_Int8
		   ,store1Uint8:store_1_Uint8
		   ,store1Int16:store_1_Int16
		   ,store1Uint16:store_1_Uint16
		   ,store1Int32:store_1_Int32
		   ,store1Uint32:store_1_Uint32
		   ,load1:load_1
		   ,load2:load_2
		   ,load3:load_3
		   ,load1Int8:load_1_Int8
		   ,load1Uint8:load_1_Uint8
		   ,load1Int16:load_1_Int16
		   ,load1Uint16:load_1_Uint16
		   ,load1Int32:load_1_Int32
		   ,load1Uint32:load_1_Uint32
		   ,loadF32:loadF32
		   ,storeF32:storeF32
		   ,storeUI32:storeUI32
		   ,loadUI32:loadUI32
		   ,storeI32:storeI32
		   ,loadI32:loadI32		   
		   ,storeI16:storeI16
		   ,loadI16:loadI16
		   ,storeUI16:storeUI16
		   ,loadUI16:loadUI16
		   ,storeI8:storeI8
		   ,loadI8:loadI8	
		   ,storeUI8:storeUI8
		   ,loadUI8:loadUI8		   
		   ,loadStoreIndex1:loadStoreIndex1};
}


var buffer = new ArrayBuffer(0x1000000); //16mb min 2^12

//Reset or flush the buffer
function initF32(buffer) {
	var values = new Float32Array( buffer );
	for( var i=0; i < values.length ; ++i ) {
		values[i] = i * 10;
	}
	return values.length;
}
function printBuffer(buffer, count)
{
    var i4;
    for (var i = 0; i < count/* * 16*/; i += 16)
    {
        i4 = SIMD.int32x4.load(buffer, i);
        WScript.Echo(i4.toString());
    }
}

function printResults(res)
{
	WScript.Echo(typeof(res));
	WScript.Echo(res.toString());
}

inputLength = initF32(buffer);
WScript.Echo(inputLength);
//Enumerating SIMD loads to test. 
SIMDLoad = 1;
SIMDLoad1 = 2;
SIMDLoad2 = 3;
SIMDLoad3 = 4;

SIMDStore = 5;
SIMDStore1 = 6;
SIMDStore2 = 7;
SIMDStore3 = 8;

//Module initialization
this['byteLength'] =
  Function.prototype.call.bind(Object.getOwnPropertyDescriptor(ArrayBuffer.prototype, 'byteLength').get);
var m = asmModule(this, {g0:initF32(buffer),g1:SIMD.float32x4(9,9,9,9), g2:SIMD.int32x4(1, 2, 3, 4), g3:SIMD.float64x2(10, 10, 10, 10)}, buffer);
var values = new Float32Array(buffer);



WScript.Echo("Stores:");

WScript.Echo("Test1");
inputLength = initF32(buffer); 
var ret = m.store1(SIMDStore1);//Lane1 store
printBuffer(values, 10);

WScript.Echo("Test2");;
inputLength = initF32(buffer); 
var ret = m.store1(SIMDStore2);//Lane 1,2 store
printBuffer(values, 10);

WScript.Echo("Test3");
inputLength = initF32(buffer); 
var ret = m.store1(SIMDStore3);//Lane 1,2,3 store
printBuffer(values, 10);

WScript.Echo("Test4");
inputLength = initF32(buffer); 

var ret = m.store1(SIMDStore);//Generic Store
printBuffer(values, 10);

WScript.Echo("Test5");
inputLength = initF32(buffer);  
var ret = m.store2(SIMDStore);//Generic store 
printBuffer(values, 10);

WScript.Echo("Test6");
inputLength = initF32(buffer); 
var ret = m.store3(SIMDStore);//Generic store
printBuffer(values, 10);

WScript.Echo("Test7");
inputLength = initF32(buffer); 
var ret = m.store1Int8(inputLength);//Int8Heap store
printBuffer(values, 10);

WScript.Echo("Test8");
inputLength = initF32(buffer); 
var ret = m.store1Uint8(inputLength);//Uint8Heap store
printBuffer(values, 10);

WScript.Echo("Test9");
inputLength = initF32(buffer); 
var ret = m.store1Int16(inputLength);//Int16Heap store
printBuffer(values, 10);

WScript.Echo("Test10");
inputLength = initF32(buffer); 
var ret = m.store1Uint16(inputLength);//Uint16Heap store
printBuffer(values, 10);

WScript.Echo("Test12");
inputLength = initF32(buffer); 
var ret = m.store1Int32(inputLength);//Int32Heap store
printBuffer(values, 10);

WScript.Echo("Test13");
inputLength = initF32(buffer); 
var ret = m.store1Uint32(inputLength);//Uint32Heap store
printBuffer(values, 10);

WScript.Echo("Test14");
inputLength = initF32(buffer); 
var ret = m.loadStoreIndex1();//Uint32Heap store
printBuffer(values, 10);


WScript.Echo("Loads");
WScript.Echo("Test1");
var ret = m.load1(SIMDLoad1);
printResults(ret);

WScript.Echo("Test2");
var ret = m.load1(SIMDLoad2);
printResults(ret);

WScript.Echo("Test3");
var ret = m.load1(SIMDLoad3);
printResults(ret);

WScript.Echo("Test4");
var ret = m.load1(SIMDLoad);
printResults(ret);

WScript.Echo("Test5");
var ret = m.load2(SIMDLoad);
printResults(ret);

WScript.Echo("Test6");
var ret = m.load3(SIMDLoad);
printResults(ret);

WScript.Echo("Test7");
var ret = m.load1Int8(inputLength); //Int8Heap load
printResults(ret);

WScript.Echo("Test8");
var ret = m.load1Uint8(inputLength); //Int8Heap load
printResults(ret);

WScript.Echo("Test9");
var ret = m.load1Int16(inputLength); //Int16Heap load
printResults(ret);

WScript.Echo("Test10");
var ret = m.load1Uint16(inputLength); //Int16Heap load
printResults(ret);

WScript.Echo("Test11");
var ret = m.load1Int32(inputLength); //Int32Heap load
printResults(ret);

WScript.Echo("Test12");
var ret = m.load1Uint32(inputLength); //Int32Heap load
printResults(ret);


print("BoundCheck");
var value = SIMD.int32x4(9.9,1.2,3.4,5.6);

WScript.Echo("Test1");
try {m.storeF32(value, inputLength); WScript.Echo("Wrong");} catch(err) {WScript.Echo("Correct");}

WScript.Echo("Test2");
try {m.loadF32(inputLength); WScript.Echo("Wrong");} catch(err) {WScript.Echo("Correct");}

WScript.Echo("Test3");
try {m.storeF32(value, inputLength-1); WScript.Echo("Wrong");} catch(err) {WScript.Echo("Correct");}

WScript.Echo("Test4");
try {m.loadF32(inputLength-1); WScript.Echo("Wrong");} catch(err) {WScript.Echo("Correct");}

WScript.Echo("Test5");
try {m.storeF32(value, inputLength-4);WScript.Echo("Correct");} catch(err) {WScript.Echo("Wrong");}

WScript.Echo("Test6");
try {var v = m.loadF32(inputLength-4);WScript.Echo("Correct");} catch(err) {WScript.Echo("Wrong");}

WScript.Echo("Test7");
try {m.storeUI32(value, inputLength+1);WScript.Echo("Wrong");} catch(err) {WScript.Echo("Correct");}

WScript.Echo("Test8");
try { m.loadUI32(inputLength+1); WScript.Echo("Wrong"); } catch(err) { WScript.Echo("Correct"); }

WScript.Echo("Test9");
try {m.storeI32(value, inputLength+1); WScript.Echo("Wrong");} catch(err) {WScript.Echo("Correct");}

WScript.Echo("Test10");
try {m.loadI32(inputLength+1);WScript.Echo("Wrong");} catch(err) {WScript.Echo("Correct");}

WScript.Echo("Test11");
try{
	m.storeI16(value, inputLength*2-8);
    WScript.Echo("Correct");
	m.storeUI16(value, inputLength*2-8);
    WScript.Echo("Correct");
	m.storeI8(value, inputLength*4-16);
    WScript.Echo("Correct");
	m.storeUI8(value, inputLength*4-16);
    WScript.Echo("Correct");
	m.loadI16(inputLength*2-8);
    WScript.Echo("Correct");
	m.loadUI16(inputLength*2-8);
    WScript.Echo("Correct");
	m.loadI8(inputLength*4-16);
    WScript.Echo("Correct");
	m.loadUI8(inputLength*4-16);
    WScript.Echo("Correct");
} catch(err){ print("Wrong"); }

WScript.Echo("Test12");
try {m.storeUI16(value, inputLength*2);WScript.Echo("Wrong");} catch(err) {WScript.Echo("Correct");}

WScript.Echo("Test13");
try {m.loadUI16(inputLength*2-7); WScript.Echo("Wrong");} catch(err) {WScript.Echo("Correct");}

WScript.Echo("Test14");
try {m.storeI16(value, inputLength*2-7); WScript.Echo("Wrong");} catch(err) {WScript.Echo("Correct");}

WScript.Echo("Test15");
try {m.loadI16(inputLength*2-7); WScript.Echo("Wrong");} catch(err) {WScript.Echo("Correct");}

WScript.Echo("Test16");
try {m.storeUI8(value, inputLength*4-15); WScript.Echo("Wrong");} catch(err) {WScript.Echo("Correct");}

WScript.Echo("Test17");
try {m.loadUI8(inputLength*4-15); WScript.Echo("Wrong");} catch(err) {WScript.Echo("Correct");}

WScript.Echo("Test18");
try {m.storeI8(value, inputLength*4-15); WScript.Echo("Wrong");} catch(err) {WScript.Echo("Correct");}

WScript.Echo("Test19");
try {m.loadI8(inputLength*4+15); WScript.Echo("Wrong");} catch(err) {WScript.Echo("Correct");}



// change buffer
var buffer = new ArrayBuffer(0x2000000);
print(m.changeHeap(buffer));

WScript.Echo(">>> ChangeHeap ");

WScript.Echo("Stores:");

WScript.Echo("Test1");
inputLength = initF32(buffer); 
var ret = m.store1(SIMDStore1);//Lane1 store
printBuffer(values, 10);

WScript.Echo("Test2");;
inputLength = initF32(buffer); 
var ret = m.store1(SIMDStore2);//Lane 1,2 store
printBuffer(values, 10);

WScript.Echo("Test3");
inputLength = initF32(buffer); 
var ret = m.store1(SIMDStore3);//Lane 1,2,3 store
printBuffer(values, 10);

WScript.Echo("Test4");
inputLength = initF32(buffer); 
//Should change the buffer to  0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3...15,15,15,15,0,0,0,0...
var ret = m.store1(SIMDStore);//Generic Store
printBuffer(values, 10);

WScript.Echo("Test5");
inputLength = initF32(buffer);  
var ret = m.store2(SIMDStore);//Generic store 
printBuffer(values, 10);

WScript.Echo("Test6");
inputLength = initF32(buffer); 
var ret = m.store3(SIMDStore);//Generic store
printBuffer(values, 10);

WScript.Echo("Test7");
inputLength = initF32(buffer); 
var ret = m.store1Int8(inputLength);//Int8Heap store
printBuffer(values, 10);

WScript.Echo("Test8");
inputLength = initF32(buffer); 
var ret = m.store1Uint8(inputLength);//Uint8Heap store
printBuffer(values, 10);

WScript.Echo("Test9");
inputLength = initF32(buffer); 
var ret = m.store1Int16(inputLength);//Int16Heap store
printBuffer(values, 10);

WScript.Echo("Test10");
inputLength = initF32(buffer); 
var ret = m.store1Uint16(inputLength);//Uint16Heap store
printBuffer(values, 10);

WScript.Echo("Test12");
inputLength = initF32(buffer); 
var ret = m.store1Int32(inputLength);//Int32Heap store
printBuffer(values, 10);

WScript.Echo("Test13");
inputLength = initF32(buffer); 
var ret = m.store1Uint32(inputLength);//Uint32Heap store
printBuffer(values, 10);

WScript.Echo("Test14");
inputLength = initF32(buffer); 
var ret = m.loadStoreIndex1();//Uint32Heap store
printBuffer(values, 10);


WScript.Echo("Loads");
WScript.Echo("Test1");
var ret = m.load1(SIMDLoad1);
printResults(ret);

WScript.Echo("Test2");
var ret = m.load1(SIMDLoad2);
printResults(ret);

WScript.Echo("Test3");
var ret = m.load1(SIMDLoad3);
printResults(ret);

WScript.Echo("Test4");
var ret = m.load1(SIMDLoad);
printResults(ret);

WScript.Echo("Test5");
var ret = m.load2(SIMDLoad);
printResults(ret);

WScript.Echo("Test6");
var ret = m.load3(SIMDLoad);
printResults(ret);

WScript.Echo("Test7");
var ret = m.load1Int8(inputLength); //Int8Heap load
printResults(ret);

WScript.Echo("Test8");
var ret = m.load1Uint8(inputLength); //Int8Heap load
printResults(ret);

WScript.Echo("Test9");
var ret = m.load1Int16(inputLength); //Int16Heap load
printResults(ret);

WScript.Echo("Test10");
var ret = m.load1Uint16(inputLength); //Int16Heap load
printResults(ret);

WScript.Echo("Test11");
var ret = m.load1Int32(inputLength); //Int32Heap load
printResults(ret);

WScript.Echo("Test12");
var ret = m.load1Uint32(inputLength); //Int32Heap load
printResults(ret);


print("BoundCheck");
var value = SIMD.int32x4(9.9,1.2,3.4,5.6);

WScript.Echo("Test1");
try {m.storeF32(value, inputLength); WScript.Echo("Wrong");} catch(err) {WScript.Echo("Correct");}

WScript.Echo("Test2");
try {m.loadF32(inputLength); WScript.Echo("Wrong");} catch(err) {WScript.Echo("Correct");}

WScript.Echo("Test3");
try {m.storeF32(value, inputLength-1); WScript.Echo("Wrong");} catch(err) {WScript.Echo("Correct");}

WScript.Echo("Test4");
try {m.loadF32(inputLength-1); WScript.Echo("Wrong");} catch(err) {WScript.Echo("Correct");}

WScript.Echo("Test5");
try {m.storeF32(value, inputLength-4);WScript.Echo("Correct");} catch(err) {WScript.Echo("Wrong");}

WScript.Echo("Test6");
try {var v = m.loadF32(inputLength-4);WScript.Echo("Correct");} catch(err) {WScript.Echo("Wrong");}

WScript.Echo("Test7");
try {m.storeUI32(value, inputLength+1);WScript.Echo("Wrong");} catch(err) {WScript.Echo("Correct");}

WScript.Echo("Test8");
try { m.loadUI32(inputLength+1); WScript.Echo("Wrong"); } catch(err) { WScript.Echo("Correct"); }

WScript.Echo("Test9");
try {m.storeI32(value, inputLength+1); WScript.Echo("Wrong");} catch(err) {WScript.Echo("Correct");}

WScript.Echo("Test10");
try {m.loadI32(inputLength+1);WScript.Echo("Wrong");} catch(err) {WScript.Echo("Correct");}

WScript.Echo("Test11");
try{
	m.storeI16(value, inputLength*2-8);
    WScript.Echo("Correct");
	m.storeUI16(value, inputLength*2-8);
    WScript.Echo("Correct");
	m.storeI8(value, inputLength*4-16);
    WScript.Echo("Correct");
	m.storeUI8(value, inputLength*4-16);
    WScript.Echo("Correct");
	m.loadI16(inputLength*2-8);
    WScript.Echo("Correct");
	m.loadUI16(inputLength*2-8);
    WScript.Echo("Correct");
	m.loadI8(inputLength*4-16);
    WScript.Echo("Correct");
	m.loadUI8(inputLength*4-16);
    WScript.Echo("Correct");
} catch(err){ print("Wrong"); }

WScript.Echo("Test12");
try {m.storeUI16(value, inputLength*2);WScript.Echo("Wrong");} catch(err) {WScript.Echo("Correct");}

WScript.Echo("Test13");
try {m.loadUI16(inputLength*2-7); WScript.Echo("Wrong");} catch(err) {WScript.Echo("Correct");}

WScript.Echo("Test14");
try {m.storeI16(value, inputLength*2-7); WScript.Echo("Wrong");} catch(err) {WScript.Echo("Correct");}

WScript.Echo("Test15");
try {m.loadI16(inputLength*2-7); WScript.Echo("Wrong");} catch(err) {WScript.Echo("Correct");}

WScript.Echo("Test16");
try {m.storeUI8(value, inputLength*4-15); WScript.Echo("Wrong");} catch(err) {WScript.Echo("Correct");}

WScript.Echo("Test17");
try {m.loadUI8(inputLength*4-15); WScript.Echo("Wrong");} catch(err) {WScript.Echo("Correct");}

WScript.Echo("Test18");
try {m.storeI8(value, inputLength*4-15); WScript.Echo("Wrong");} catch(err) {WScript.Echo("Correct");}

WScript.Echo("Test19");
try {m.loadI8(inputLength*4+15); WScript.Echo("Wrong");} catch(err) {WScript.Echo("Correct");}
