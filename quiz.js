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

const printOut = (lines, delay = 25, callback) => {
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
    setTimeout(() => {
      callback();
    }, 5000);
  }, (Math.max(...lines.map(q => q.length))) * (delay + 1));
};

const groovyPrint = (lines, delay = 2) => {
  let x = 0;
  let c = 9;
  const max = Math.max(...lines.map(l => l.length));
  process.stdout.write('\u001b[?25l'); // hide cursor
  process.stdout.write('\u001b[1m'); // bold
  process.stdout.write('\u001b[H'); // move cursor to (0, 0)
  process.stdout.write(`\u001b[38;5;${c++}m`); // iterate color
  const loader = setInterval(() => {
    for (let i = 0; i < lines.length; i++) {
      if (x < lines[i].length){
        process.stdout.write(`${lines[i][x]}`);
        process.stdout.write('\u001b[1D'); // move cursor left 1
      }
      process.stdout.write('\u001b[1B'); // move cursor down 1
    }
    process.stdout.write('\u001b[1C'); // move cursor right 1
    process.stdout.write('\u001b[' + lines.length + 'A') // move cursor up {lines.length}
    x++;
    if (x > max) {
      x = 0;
      process.stdout.write('\u001b[H');
      process.stdout.write(`\u001b[38;5;${c++}m`);
      if (c > 14) {
        c = 9;
      }
    }
  }, delay);
}

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.clear();
console.log('You have been given this encrypted message:\n')
for (let i = 0; i < secretCode.length; i++) {
  console.log(secretCode[i]);
}

const printCode = () => {
  for (let i = 0; i < secretCode.length; i++) {
    console.log(secretCode[i]);
  }
};

const decode = (match, replace) => {
  for (let i = 0; i < secretCode.length; i++) {
    secretCode[i] = secretCode[i].replace(match, replace);
  };
}

console.log('\nTo decipher it, follow these steps:');
console.log('1. Replace all occurrences of "@" with " | ".');

readline.question('\nEnter the line of code to do this:\nmessage = message.replace(', (data) => {
  if (data !== `/@/g, ' | ')`) {
    console.log("\n\u001b[38;5;9m\u001b[1mHmm, you could be right but here's what I was looking for:\u001b[0m")
    console.log(`\u001b[38;5;14mmessage = message.replace(/@/g, ' | ')\u001b[0m`);
  } else {
    console.log('\n\u001b[38;5;10m\u001b[1mCorrect!\u001b[0m')
  }
  console.log(`\nHere's the result:\n`)
  decode(/@/g, ' | ');
  printCode(secretCode);
  console.log('\n2. Replace all occurrences of "&" with "(_)".');

  readline.question('\nEnter the line of code to do this:\nmessage = message.replace(', (data) => {
    if (data !== `/&/g, '(_)')`) {
      console.log("\n\u001b[38;5;9m\u001b[1mHmm, you could be right but here's what I was looking for:\u001b[0m")
      console.log(`\u001b[38;5;14mmessage = message.replace(/&/g, '(_)')\u001b[0m`);
    } else {
      console.log('\n\u001b[38;5;10m\u001b[1mCorrect!\u001b[0m')
    }
    console.log(`\nHere's the result:\n`)
    decode(/&/g, '(_)');
    printCode(secretCode);
    console.log('\n3. Replace all occurrences of "+" and "=" with " |" and "| ", respectively. (Hint: use a function)');

    readline.question('\nEnter the line of code to do this:\nmessage = message.replace(', (data) => {
      if (data !== `/[+=]/g, (match) => (match === '+' ? ' |' : '| '))`) {
        console.log("\n\u001b[38;5;9m\u001b[1mHmm, you could be right but here's what I was looking for:\u001b[0m")
        console.log(`\u001b[38;5;14mmessage = message.replace(/[+=]/g, (match) => (match === '+' ? ' |' : '| '))\u001b[0m`);
      } else {
        console.log('\n\u001b[38;5;10m\u001b[1mCorrect!\u001b[0m')
      }
      console.log(`\nHere's the result:\n`)
      decode(/[+=]/g, (match) => (match === '+' ? ' |' : '| '));
      printCode(secretCode);
      console.log('\n4. Swap all occurrences of "\\" and "/" with each other. (Remember to escape your slashes)');

      readline.question('\nEnter the line of code to do this:\nmessage = message.replace(', (data) => {
        if (data !== `/[\\\\\\/]/g, (match) => (match === '\\\\' ? '\\/' : '\\\\'))`) {
          console.log("\n\u001b[38;5;9m\u001b[1mHmm, you could be right but here's what I was looking for:\u001b[0m")
          console.log(`\u001b[38;5;14mmessage = message.replace(/[\\\\\\/]/g, (match) => (match === '\\\\' ? '\\/' : '\\\\'))\u001b[0m`);
        } else {
          console.log('\n\u001b[38;5;10m\u001b[1mCorrect!\u001b[0m')
        }
        console.log(`\nHere's the result:\n`)
        decode(/[\\\/]/g, (match) => (match === '\\' ? '\/' : '\\'));
        printCode(secretCode);
        console.log('\n5. Replace all letters with a corresponding number of underscores (e.g., "A" -> "_", "B" -> "__").');
        readline.question('\nEnter the line of code to do this:\nmessage = message.replace(', (data) => {
          if (data !== `/[A-Z]/g, (match) => ('_'.repeat('_ABCDEFG'.indexOf(match))))`) {
            console.log("\n\u001b[38;5;9m\u001b[1mHmm, you could be right but here's what I was looking for:\u001b[0m")
            console.log(`\u001b[38;5;14mmessage = message.replace(/[A-Z]/g, (match) => ('_'.repeat('_ABCDEFG'.indexOf(match))))\u001b[0m`);
          } else {
            console.log('\n\u001b[38;5;10m\u001b[1mCorrect!\u001b[0m')
          }
          console.log(`\nHere's the result:\n`)
          decode(/[A-Z]/g, (match) => ('_'.repeat('_ABCDEFG'.indexOf(match))));
          printCode(secretCode);
          console.log('\nFinally, replace all numbers with a corresponding number of spaces (e.g., "1" -> " ", "2" -> "  ").');

          readline.question('\nEnter the line of code to do this:\nmessage = message.replace(', (data) => {
            if (data !== `/\\d+/g, (match) => (' '.repeat(Number(match))))`) {
              console.log("\n\u001b[38;5;9m\u001b[1mHmm, you could be right but here's what I was looking for:\u001b[0m")
              console.log(`\u001b[38;5;14mmessage = message.replace(/\\d+/g, (match) => (' '.repeat(Number(match))))\u001b[0m`);
            } else {
              console.log('\n\u001b[38;5;10m\u001b[1mCorrect!\u001b[0m')
            }
            decode(/\d+/g, (match) => (' '.repeat(Number(match))));
            readline.question('\n\u001b[38;5;11m\u001b[1mPress enter to see the deciphered code...\u001b[0m', () => {
              readline.close();
              console.clear();
              printOut(secretCode, 25, () => {groovyPrint(secretCode)});
            })
          })
        })
      })
    })
  })
})
