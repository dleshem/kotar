import {KotarClient} from '../src/KotarClient'
import * as ImageTypes from '../src/ImageTypes'
import {expect, assert} from 'chai'

describe('KotarClient', () => {
	const imagesEndpoint = 'http://example.org/'
	const kotarClient = new KotarClient({
		imagesEndpoint
	})
	
	// TODO: use a driver instead of testing against the production server
	describe('getPagesInfo', () => {
		const someBookId = '30717'
		
		it('returns the book\'s pages info', () => {
			return kotarClient.getPagesInfo({
				bookId: someBookId
			}).then((pagesInfo) => {
				expect(pagesInfo.pages).to.not.be.empty
			})
		})
	})
	
	describe('getImageUrl', () => {
		it('returns valid image URLs', () => {
			const someImageType = ImageTypes.pageImage
			const someNStep = 9
			const someGPageToken = '4f0ce664-4d8b-4fbc-a2b8-c1f9e7b24351'
			
			const imageUrl = kotarClient.getImageUrl({
				type: someImageType,
				nStep: someNStep,
				gPageToken: someGPageToken
			})
			
			expect(imageUrl).to.equal(`${imagesEndpoint}GetPageImg_v2.ashx?Type=${someImageType}&gPageToken=${someGPageToken}&nStep=${someNStep}&nVersion=10`)
		})
	})
})
