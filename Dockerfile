FROM node:9-alpine

RUN apk update && apk upgrade && \
	echo @edge http://nl.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories && \
	echo @edge http://nl.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories && \
	apk add --no-cache \
		chromium@edge nss@edge \
		ca-certificates openssl

ADD resources/TimesNewRoman.ttf /usr/share/fonts
ADD resources/NotoSerifCJKjp-Light.otf /usr/share/fonts

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
RUN mkdir -m 777 /puppeteer-working-dir
WORKDIR /puppeteer-working-dir
ADD print-to-pdf.js /puppeteer-working-dir
ADD package.json /puppeteer-working-dir
RUN yarn install && \
	fc-cache -fv && \
	chmod +x /puppeteer-working-dir/print-to-pdf.js && \
	ln -s /puppeteer-working-dir/print-to-pdf.js /usr/local/bin/print-to-pdf

CMD [ "print-to-pdf" ]
