const printOut = (Q) => {
  let x = 0;
  const loader = setInterval(() => {
    for (let i = 0; i < Q.length; i++) {
      if (x <= Q[i].length){
        process.stdout.write(`\r${Q[i].slice(0, x + 1)}`);
      }
      process.stdout.write('\u001b[1B')
    }
    x++;
    process.stdout.write('\u001b[' + Q.length + 1 + 'A')
  }, 50);


  setTimeout(() => {
    clearInterval(loader);
    process.stdout.write('\u001b[8B')
    process.stdout.write('\n');
  }, (Math.max(...Q.map(q => q.length))) * 51);
}

module.exports.printOut = printOut;