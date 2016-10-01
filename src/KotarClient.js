export class KotarClient {
	constructor({appEndpoint = 'http://www.kotar.co.il/KotarApp/', imagesEndpoint = 'http://kotarimagesstg.cet.ac.il/', timeout = 0}) {
		this._appEndpoint = appEndpoint
		this._imagesEndpoint = imagesEndpoint
		this._timeout = timeout
	}
}
