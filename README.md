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

### script example

```
echo '<meta charset="utf8">今日はいい天気ですね' | print-to-pdf -f '/dev/stdin'
```

## available options

you can show this help by '-h' or '--help' option

+ -f, --file [string]
input html file path

+ -o, --output [string] (default: output.pdf)
output file path

+ --format [string] (default: A4)
output format type [A4, letter, or so]

+ --scale [integer] (default: 1)
output scale factor [> 0]

+ --media [string] (default: screen)
emulate media type [screen, media]
