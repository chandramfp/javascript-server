// const n = 'no shadow';
export default function equilateral(n: number): string {
  if (n < 2 || n > 10)
    return 'please enter value between 2 to 10';
  for (let i: number = 1; i <= n; i++) {
    let p: string = '';
    for (let j: number = i; j <= n; j++)
      p += ' ';
    for (let k: number = 1; k <= i; k++)
      p += '* ';
    console.log(p);
  }
}

