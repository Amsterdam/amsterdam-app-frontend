import {execFileSync} from 'node:child_process'

export const run = (cmd: string, args: string[]) => {
  execFileSync(cmd, args, {
    stdio: 'inherit',
    cwd: process.cwd(),
  })
}
