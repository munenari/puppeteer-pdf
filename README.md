# puppeteer docker image

## usage

build

```bash
docker build -t puppeteer .
```

run

```bash
docker run -it --rm -v `pwd`:/data puppeteer \
	print-to-pdf -f /etc/hostname -o /data/output.pdf --scale 2
```

```bash
docker run -it --rm -v `pwd`:/data puppeteer \
	print-to-pdf -u https://example.com -o /data/output.pdf
```

### script example

from file

```
echo '<meta charset="utf8">今日はいい天気ですね' | ./print-to-pdf.js -f '/dev/stdin'
```

from url (file: scheme is also available)

```
./print-to-pdf.js -u 'https://www.google.com'
```

when you are using macOS, -c option may help you

```
./print-to-pdf.js -u 'https://www.google.com' -c /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome
```

## available options

you can show this help by '-h' or '--help' option

+ -f, --file [string]

input html file path
> file value will be overrided by url value

+ -u, --url [string]

input html url path
> url value will override file path value

+ -o, --output [string] (default: output.pdf)

output file path

+ --format [string] (default: A4)

output format type [A4, letter, or so]

+ --scale [integer] (default: 1)

output scale factor [> 0]

+ --media [string] (default: screen)

emulate media type [screen, media]

+ --landscape [boolean] (default: false)

this document will be landscaped

+ --printBackground

print background images

+ --displayHeaderFooter

display header and footer

+ -c, --chromium [string] (default <alpine>: /usr/bin/chromium-browser)

executable chromium path
