function equilateral(n)
{
    if(n<2 || n>10)
     return "please enter value between 2 to 10";
     for(let i = 0; i < n; i++)
     {
         let p=''
         for(let j = n; j>=i;j--)
          //console.log(" ");
          p+=" "
        for( let k = 0;k<i;k++)
         //console.log("*");
         p+="*"+" "
         console.log(p);
     }
}

let t=Number(process.argv[2]);
equilateral(t);
//console.log(process.argv);