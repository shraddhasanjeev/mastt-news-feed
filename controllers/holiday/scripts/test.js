
const spawn = require('child_process').spawn;
const ls = spawn('python', ['C:/Users/yyq/Desktop/code/mastt-news-feed/controllers/holiday/scripts/htmlParser.py', 'arg1', 'arg2']);

ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
});

ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
});