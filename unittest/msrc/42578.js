function inlinee() {

}

function opt(arr) {
    arr[0] = 1.1;
    new inlinee();
    arr[0] = 2.3023e-320;
}

function main() {
    let arr = [1.1];
    for (let i = 0; i < 10000; i++) {
        inlinee.prototype = {};
        opt(arr);
    }

    inlinee.prototype = arr;
    opt(arr);

    WScript.Echo(arr.toString() === '2.3023e-320' ? 'pass' : 'fail');
}

main();

