import request from 'request'

const oPagesInfoRegexp = /^\s*var oPagesInfo = ({.*})\s*$/g

const extractPagesInfo = (body) => {
	const lineIndexStart = body.indexOf('var oPagesInfo')
	if (lineIndexStart === -1) {
		throw new Error('Could not find oPagesInfo variable')
	}
	
	const lineIndexEnd = body.indexOf('\n', lineIndexStart)
	
	const line = body.substring(lineIndexStart, lineIndexEnd)
	
	const match = oPagesInfoRegexp.exec(line)
	if (!match) {
		throw new Error('Invalid oPagesInfo line format')
	}
	
	const oPagesInfoStrValue = match[1]
	
	const oPagesInfoStrJson = JSON.stringify(oPagesInfoStrValue).replace(/'/g, '"').replace(/\\"/g, '"')
	const oPagesInfoJson = oPagesInfoStrJson.substring(1, oPagesInfoStrJson.length - 1)
	return JSON.parse(oPagesInfoJson)
}

const chromeUserAgent = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36'

export class KotarClient {
	constructor({appEndpoint = 'http://www.kotar.co.il/KotarApp/', imagesEndpoint = 'http://kotarimagesstg.cet.ac.il/', timeout = 0}) {
		this._appEndpoint = appEndpoint
		this._imagesEndpoint = imagesEndpoint
		this._timeout = timeout
	}
	
	getPagesInfo({bookId}) {
		return new Promise((resolve, reject) => {
			const url = `${this._appEndpoint}Viewer.aspx?nBookID=${bookId}`
			
			// Default user-agent gets blocked by reblaze.com's anti-bot protection
			request.get(url, {headers: { 'User-Agent': chromeUserAgent}, timeout: this._timeout, gzip: true}, (error, response, body) => {
				if (error) {
					if (error.code === 'ETIMEDOUT') {
						reject({
							code: 'timeout',
							description: 'request timed out'
						})
					} else {
						reject({
							code: 'network_down',
							description: 'network is down'
						})
					}
				} else {
					try {
						resolve(extractPagesInfo(body))
					} catch (e) {
						reject({
							code: 'protocol',
							description: 'unexpected response format'
						})
					}
				}
			})
		})
	}
	
	getImageUrl({type, gPageToken, nStep}) {
		return `${this._imagesEndpoint}GetPageImg_v2.ashx?Type=${type}&gPageToken=${gPageToken}&nStep=${nStep}&nVersion=10`
	}
}
