// const n: number;

export default function diamond(n: number): string {
    if (n < 2 || n > 10)
        return 'please enter value between 2 to 10';
    let space: number = n - 1;
    for (let i = 0; i < n; i++) {
        let p: string = '';
        for (let j = 0; j < space; j++)
            p += ' ';
        for (let k = 0; k <= i; k++)
            p += '* ';
        console.log(p);
        space--;
    }
    space = 0;
    for (let l = n; l > 0; l--) {
        let p: string = '';
        for (let m = 0; m < space; m++)
            p += ' ';
        for (let t = 0; t < l; t++)
            p += '* ';
        console.log(p);
        space++;
    }
}

