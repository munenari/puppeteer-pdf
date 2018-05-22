#!/usr/bin/env node

const fs = require( 'fs' )
const commander = require( 'commander' )
const puppeteer = require( 'puppeteer' )

const chromiumBin = '/usr/bin/chromium-browser'

commander
	.option( '-f, --file <s>', 'input html file path' )
	.option( '-o, --output <s>', 'output file path', 'output.pdf' )
	.option( '--format <s>', 'output format type [A4, letter, or so]', 'A4' )
	.option( '--scale <n>', 'output scale factor [> 0]', 1 )
	.option( '--media <s>', 'emulate media type [screen, media]', 'screen' )
	.parse( process.argv )

if ( ! commander.file ) {
	commander.help( )
}

const body = fs.readFileSync( commander.file, 'utf8' )
if ( ! body || ! commander.output ) {
	commander.help( )
}

( async ( ) => {
	const browser = await puppeteer.launch( {
		executablePath: chromiumBin,
		args: [
			'--headless',
			'--no-sandbox'
		]
	} )
	const page = await browser.newPage( )
	await page.emulateMedia( commander.media )
	await page.goto( 'data:text/html;,' + encodeURIComponent( body ), {
		waitUntil: 'networkidle2'
	} )
	await page.pdf( {
		path: commander.output,
		scale: parseFloat(commander.scale),
		displayHeaderFooter: false,
		format: commander.format,
		printBackground: true
	} )
	await browser.close( )
} )( )
