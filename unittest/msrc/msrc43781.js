var arr_arr = new Array();

let a = [{},1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32];
// profile to generate the var array
var i = 100;
while(i-- > 0)
    a = [{},1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32];


a[1000] = 1.2;
a[0x40] = 1;
a.reverse();
var b = a.splice(1, 0x1041);
a = null;

var counter = 0;
function f()
{
    for (var i = 0; i < 10000; ++ i)
        arr_arr.push([2.3023e-320,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32]);

    try {
        b[0] + 1;
    } catch (e) {}

    if (counter++ < 20) {
        WScript.SetTimeout(f, 50);
    }
    else {
        print('pass');
    }

}

WScript.SetTimeout(f, 50);
