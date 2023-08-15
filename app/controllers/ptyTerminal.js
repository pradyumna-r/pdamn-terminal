const os = require("os");
const pty = require("node-pty");

const shell = os.platform() === "win32" ? "powershell.exe" : "bash";

const ptyProcess = pty.spawn(shell, [], {
  name: "xterm-color",
  cols: 80,
  rows: 30,
  cwd: process.env.HOME,
  env: process.env,
});
console.log(process.env);
// ptyProcess.onData((data) => {
//   process.stdout.write(data);
// });

// ptyProcess.write("ls\r");
// ptyProcess.resize(100, 40);
// ptyProcess.write("ls\r");

module.exports = ptyProcess;
