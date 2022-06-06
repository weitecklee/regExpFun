const secretCode = [
  '1G1A11A3A13A1A6B6A1A8A',
  '|B3B|@7@=(1)10@|@3\\1A=2@|@4@|',
  '2@=@|B3B1A=|A|\\1C4B1A|@=1@|A1C@|@E=|',
  "2@=@`A1/1\\1A'@B=\\1B=1\\1A'@|@1@1A\\1A1/|@|\\1\\1B=|",
  '2@=@|@=(A|@|A2/B1/@(A|@=|A1@|=&@=2</B1/A|',
  '2+A=+A=|A|/B,A|/B=|C\\2/B,A|A|A(1)+A=/C\\|A|A|/A/C&',
  '41+\\',
  '56G1A17A27B38A3A16A',
  '54+B3B|@13@=24\\1A=34@=&13@|',
  '57@=@|B3B1A1A1B@=B2A3A2C2A3A1@|A1C2A1B3A3A2C2A3A1A1B1@|A1A1A1B1C3C=|',
  "57@=@`A1/1\\1A'@`A1/=|\\1\\@|@|\\1A1/|@|@=1A\\1A1/=`B|@|@|\\1A1/|@|@`B|@B|@`A1'1A1/1\\1A1/+",
  '57@=@|@=(A|@|@=2<1@|A|@&@|A|@=|=&@=2@|A|@&@|A|@=2@|A|@|@|@=1B\\A|',
  '57+A=+A=|A|/B,A|A=|A|A|/A/2/B,+/C\\1/B,A=|A=/C\\|A=4/B,+/C\\1/B,A|A=4/B|A|A=|A=|A|/C&',
  '90B\\@30B\\+',
  '88+C\\30+C\\'
];

for (let i = 0; i < secretCode.length; i++) {
  secretCode[i] = secretCode[i].replace(/@/g, ' | ')
    .replace(/=/g, '| ')
    .replace(/\+/g, ' |')
    .replace(/&/g, '(_)')
    .replace(/[\\\/]/g, (match) => (match === '\\' ? '\/' : '\\'))
    .replace(/[\'\`]/g, (match) => (match === '\'' ? '\`' : '\''))
    .replace(/[A-Z]/g, (match) => ('_'.repeat('_ABCDEFGH'.indexOf(match))))
    .replace(/\d+/g, (match) => (' '.repeat(Number(match))));
};

const printOut = (lines, delay) => {
  let x = 0;
  const loader = setInterval(() => {
    for (let i = 0; i < lines.length; i++) {
      if (x < lines[i].length){
        process.stdout.write(`${lines[i][x]}`);
        process.stdout.write('\u001b[1D');
      }
      process.stdout.write('\u001b[1B');
    }
    x++;
    process.stdout.write('\u001b[1C');
    process.stdout.write('\u001b[' + lines.length + 'A')
  }, delay);

  setTimeout(() => {
    clearInterval(loader);
    process.stdout.write('\u001b[' + lines.length + 'B')
    process.stdout.write('\n');
  }, (Math.max(...lines.map(q => q.length))) * (delay + 1));
};

console.clear();
printOut(secretCode, 25);