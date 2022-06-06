const printOut = (art) => {
  let x = 0;
  const loader = setInterval(() => {
    for (let i = 0; i < art.length; i++) {
      if (x < art[i].length){
        process.stdout.write(`${art[i][x]}`);
        process.stdout.write('\u001b[1D');
      }
      process.stdout.write('\u001b[1B');
    }
    x++;
    process.stdout.write('\u001b[1C');
    process.stdout.write('\u001b[' + art.length + 'A')
  }, 30);


  setTimeout(() => {
    clearInterval(loader);
    process.stdout.write('\u001b[' + art.length + 'B')
    process.stdout.write('\n');
  }, (Math.max(...art.map(q => q.length))) * 31);
};

const Q = [` _______ _                 _                           __                                      _   _                _`,
`|__   __| |               | |                         / _|                                    | | (_)              | |`,
`   | |  | |__   __ _ _ __ | | __  _   _  ___  _   _  | |_ ___  _ __   _   _  ___  _   _ _ __  | |_ _ _ __ ___   ___| |`,
`   | |  | '_ \\ / _\` | '_ \\| |/ / | | | |/ _ \\| | | | |  _/ _ \\| '__| | | | |/ _ \\| | | | '__| | __| | '_ \` _ \\ / _ \\ |`,
`   | |  | | | | (_| | | | |   <  | |_| | (_) | |_| | | || (_) | |    | |_| | (_) | |_| | |    | |_| | | | | | |  __/_|`,
`   |_|  |_| |_|\\__,_|_| |_|_|\\_\\  \\__, |\\___/ \\__,_| |_| \\___/|_|     \\__, |\\___/ \\__,_|_|     \\__|_|_| |_| |_|\\___(_)`,
`                                   __/ |                               __/ |`,
`                                  |___/                               |___/`];


const S = [` _______ _           _   _             _ _      __      _ _        _`,
`|__   __| |         | | ( )           | | |    / _|    | | |      | |`,
`   | |  | |__   __ _| |_|/ ___    __ _| | |   | |_ ___ | | | _____| |`,
`   | |  | '_ \\ / _\` | __| / __|  / _\` | | |   |  _/ _ \\| | |/ / __| |`,
`   | |  | | | | (_| | |_  \\__ \\ | (_| | | |_  | || (_) | |   <\\__ \\_|`,
`   |_|  |_| |_|\\__,_|\\__| |___/  \\__,_|_|_( ) |_| \\___/|_|_|\\_\\___(_)`,
`                                          |/`]

// printOut(S.concat(Q.map(a => ' '.repeat(55).concat(a))));

const code = S.concat(Q.map(a => ' '.repeat(55).concat(a)));

const tally = {};

for (let i = 0; i < code.length; i++) {
  for (let j = 0; j < code[i].length; j++) {
    tally[code[i][j]] = tally[code[i][j]] || 0;
    tally[code[i][j]] = tally[code[i][j]] + 1;
  }
  code[i] = code[i].replace(/ \| /g,'@');
  code[i] = code[i].replace(/\| /g,'=');
  code[i] = code[i].replace(/ \|/g,'+');
  code[i] = code[i].replace(/\(_\)/g,'&');
  code[i] = code[i].replace(/\s+/g,(m)=>(m.length));
  code[i] = code[i].replace(/_+/g, (m)=>('_ABCDEFGHIJKLMNOPQRSTUVWXYZ'[m.length]));
  code[i] = code[i].replace(/[\\/]/g, (m)=>(m === '\\' ? '/' : '\\'));

}

console.log(tally)
console.log(code)

const R = [
  '1G1A11A3A13A1A6B6A1A8A',
  '|B3B|@7@=(1)10@|@3\\1A=2@|@4@|',
  '2@=@|B3B1A=|A|\\1C4B1A|@=1@|A1C@|@E=|',
  "2@=@'A1/1\\1A`@B=\\1B=1\\1A`@|@1@1A\\1A1/|@|\\1\\1B=|",
  '2@=@|@=(A|@|A2/B1/@(A|@=|A1@|=&@=2</B1/A|',
  '2+A=+A=|A|/B,A|/B=|C\\2/B,A|A|A(1)+A=/C\\|A|A|/A/C&',
  '41+\\',
  '56G1A17A27B38A3A16A',
  '54+B3B|@13@=24\\1A=34@=&13@|',
  '57@=@|B3B1A1A1B@=B2A3A2C2A3A1@|A1C2A1B3A3A2C2A3A1A1B1@|A1A1A1B1C3C=|',
  "57@=@'A1/1\\1A`@'A1/=|\\1\\@|@|\\1A1/|@|@=1A\\1A1/='B|@|@|\\1A1/|@|@'B|@B|@'A1`1A1/1\\1A1/+",
  '57@=@|@=(A|@|@=2<1@|A|@&@|A|@=|=&@=2@|A|@&@|A|@=2@|A|@|@|@=1B\\A|',
  '57+A=+A=|A|/B,A|A=|A|A|/A/2/B,+/C\\1/B,A=|A=/C\\|A=4/B,+/C\\1/B,A|A=4/B|A|A=|A=|A|/C&',
  '90B\\@30B\\+',
  '88+C\\30+C\\'
]

for (let i = 0; i < R.length; i++) {
  R[i] = R[i].replace(/@/g, ' | ')
    .replace(/=/g, '| ')
    .replace(/\+/g, ' |')
    .replace(/&/g, '(_)')
    .replace(/[\\\/]/g, (match) => (match === '\\' ? '\/' : '\\'))
    .replace(/[A-Z]/g, (match) => ('_'.repeat('_ABCDEFGH'.indexOf(match))))
    .replace(/\d+/g, (match) => (' '.repeat(Number(match))));
}

console.clear();

printOut(R);

// const P = ['\\', '|', '/', '-'];
// let x = 0;
// const loader = setInterval(() => {
//   process.stdout.write(`\r${P[x++]}`);
//   x %= P.length;
// }, 250);

// setTimeout(() => {
//   clearInterval(loader);
// }, 5000);


