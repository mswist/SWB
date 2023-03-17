// remove first line <!-- saved from url
// rename file folder - prefix with "x"
// rename file folder reference in html
// remove empty lines
// change links containing fnfis.com to #

const fs = require('fs').promises;
const process = require('process');
const path = require('path');
//import html_beautify from 'js-beautify/bin/html_beautify'
const beautify_html = require('js-beautify').html;

// print process.argv
const args = process.argv.filter(arg => !process.execArgv.includes(arg))
// first two arguments are "node" and program name, third should be file name 
const filename = path.basename(args[2],'.html')
console.log(filename);

(async () => {
    try {
        let content = await fs.readFile(args[2], { encoding: 'utf8' })
        content = content.replace(/^<!-- saved from url[^>]+>/gm, '')
        content = content.replace(new RegExp(filename, "gm"), `x${filename}`)
        content = content.replace(/"http[^"]+"/gm,'"#"')
        content = content.replace(/\t/gm,'')
        content = content.replace(/\n{2,}/gm,'')
        content = beautify_html(content, {"indent_size": 2})
        content = content.replace(/([^\s])\/\*/, '$1\n/*')
        content = content.replace(/\*\s+\//,'*/')
        fs.writeFile(args[2], content, 'utf8')
        fs.rename(`${args[2].replace(".html","")}_files`,`${args[2].replace(filename, "x"+filename)}`)
    }
    catch(err) {
        console.log(err.message)
    }    
})();
