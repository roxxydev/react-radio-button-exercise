var spawnSync = require('child_process').spawnSync

var styles = {
  // got these from playing around with what I found from:
  // https://github.com/istanbuljs/istanbuljs/blob/0f328fd0896417ccb2085f4b7888dd8e167ba3fa/packages/istanbul-lib-report/lib/file-writer.js#L84-L96
  // they're the best I could find that works well for light or dark terminals
  success: {open: '\u001b[32;1m', close: '\u001b[0m'},
  danger: {open: '\u001b[31;1m', close: '\u001b[0m'},
  info: {open: '\u001b[36;1m', close: '\u001b[0m'},
  subtitle: {open: '\u001b[2;1m', close: '\u001b[0m'},
}

function color(modifier, string) {
  return styles[modifier].open + string + styles[modifier].close
}

console.log(color('info', '▶️  Starting setup...'))

var error = spawnSync('npx --version', {shell: true}).stderr.toString().trim()
if (error) {
  console.error(
    color(
      'danger',
      '🚨  npx is not available on this computer. Please install npm@5.2.0 or greater',
    ),
  )
  throw error
}

var command =
  'npx "https://gist.github.com/roxxydev/6f76d0edacfd5115d308b37967bb6223" -q'
console.log(
  color('subtitle', '      Running the following command: ' + command),
)

var result = spawnSync(command, {stdio: 'inherit', shell: true})

if (result.status === 0) {
  console.log(color('success', '✅ Setup complete...'))
} else {
  process.exit(result.status)
}

/*
eslint
  no-var: "off",
  "vars-on-top": "off",
*/
