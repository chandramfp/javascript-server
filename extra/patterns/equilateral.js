let n;
export default function equilateral(n)
{
    
    if(n < 2 || n > 10)
     return "please enter value between 2 to 10";
     
    for(let i = 1; i <= n; i++)
    {
        let p = "";

        for(let j = i; j <= n; j++)
          p += " ";

        for( let k = 1;k <= i; k++)
          p += "* ";

        console.log(p);
    }
}

