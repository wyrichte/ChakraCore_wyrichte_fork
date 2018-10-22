
class C1
{
    constructor(next)
    {
        this.next = next;
        this.stuff = new ArrayBuffer(1024 * 1024);
    }
}


let root = new C1(null);

try
{
    for(let i = 0; i < 4000; i++)
    {
        root = new C1(root);
    }
    
    console.log("NO ERROR ON > 3Gb");
}
catch(e)
{
    console.log(e);
}