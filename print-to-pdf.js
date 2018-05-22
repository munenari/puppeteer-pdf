#!/usr/bin/env node

const fs = require( 'fs' )
const commander = require( 'commander' )
const puppeteer = require( 'puppeteer' )

const chromiumBin = '/usr/bin/chromium-browser'

commander
	.option( '-f, --file <s>', 'input html file path' )
	.option( '-u, --url <s>', 'input html url path' )
	.option( '-o, --output <s>', 'output file path', 'output.pdf' )
	.option( '--format <s>', 'output format type [A4, letter, or so]', 'A4' )
	.option( '--scale <n>', 'output scale factor [> 0]', 1 )
	.option( '--media <s>', 'emulate media type [screen, media]', 'screen' )
	.option( '--landscape', 'this document will be landscaped' )
	.option( '--printBackground', 'print background images' )
	.option( '--displayHeaderFooter', 'display header and footer' )
	.option( '-c, --chromium <s>', 'executable chromium path', chromiumBin )
	.parse( process.argv )

if ( ! commander.file && ! commander.url ) {
	commander.help( )
}

let url
if ( commander.url ) {
	url = commander.url
}
else {
	const body = fs.readFileSync( commander.file )
	if ( ! body ) {
		commander.help( )
	}
	url = 'data:text/html;,' + encodeURIComponent( body )
}

( async ( ) => {
	const browser = await puppeteer.launch( {
		executablePath: commander.chromium,
		args: [
			'--headless',
			'--no-sandbox'
		]
	} )
	const page = await browser.newPage( )
	await page.emulateMedia( commander.media )
	await page.goto( url, {
		waitUntil: 'networkidle2'
	} )

	await page.pdf( {
		path: commander.output,
		scale: parseFloat(commander.scale),
		displayHeaderFooter: commander.displayHeaderFooter,
		format: commander.format,
		printBackground: commander.printBackground,
		landscape: commander.landscape
	} )
	await browser.close( )
} )( )
