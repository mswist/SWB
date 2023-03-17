// remove first line <!-- saved from url
// rename file folder - prefix with "x"
// rename file folder reference in html
// remove empty lines
// change links containing fnfis.com to #

import fs from 'node:fs/promises';
import process from 'node:process';
import path from 'node:path';
 
// print process.argv
const args = process.argv.filter(arg => !process.execArgv.includes(arg))
// first two arguments are "node" and program name, third should be file name 
const filename = path.basename(args[2],'.html')
console.log(filename)

try {
    let content = await fs.readFile(args[2], { encoding: 'utf8' })
    content = content.replace(/^<!-- saved from url[^>]+>/gm, '')
    content = content.replace(new RegExp(filename, "gm"), `x${filename}`)
    content = content.replace(/"http[^"]+"/gm,'"#"')
    content = content.replace(/\t/gm,'')
    content = content.replace(/\n{2,}/gm,'')
    fs.writeFile(args[2], content, 'utf8')
    fs.rename(`${args[2].replace(".html","")}_files`,`${args[2].replace(filename, "x"+filename)}`)
}
catch(err) {
    console.log(err.message)
}
