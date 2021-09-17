export function spearator(number) {
  let output = '';
  let count = 0;
  [...`${number}`].reverse().forEach(n => {
    if (count === 3) {
      count = 0;
      output += ','
    }
    output += n
    count++;
  })
  return [...output].reverse().join('');
}