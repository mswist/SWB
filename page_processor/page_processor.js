//usage:
//node page_processor downloaded_html.html target_name (no extension)

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
// first two arguments are "node" and program name
// third parameter should be file name
// fourth parameter should be target file name 
const filename = path.basename(args[2],'.html')
const target_name = args[3]
console.log(`Current name: ${filename} -> target name: ${target_name}`);

(async () => {
    // rename html file
    fs.rename(`${filename}.html`,`${target_name}.html`)
    // rename src folder
    fs.rename(`${filename}_files`,`x${target_name}`)
    try {
        let content = await fs.readFile(args[2], { encoding: 'utf8' })
        // remove first line (saved from)
        content = content.replace(/^<!-- saved from url[^>]+>/gm, '')
        // rename src folder referece (adds "x" prefix) - escaping regex special chars
        content = content.replace(new RegExp(`${filename.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')}_files`, "gm"), `x${target_name}`)
        // replace all urls to "#"
        content = content.replace(/"http[^"]+"/gm,'"#"')
        // remove tabs
        content = content.replace(/\t/gm,'')
        // replace multiple end of lines with single one
        content = content.replace(/\n{2,}/gm, "\n")
        content = beautify_html(content, {"indent_size": 2})
        //content = content.replace(/([^\s])\/\*/, '$1\n/*')
        //content = content.replace(/\*\s+\//,'*/')
        fs.writeFile(`${target_name}.html`, content, 'utf8')
    }
    catch(err) {
        console.log(err.message)
    }    
})();
