import antiPlagiarism from '../src/AntiPlagiarism'
import {expect, assert} from 'chai'

describe('antiPlagiarism', () => {
	it ('deobfuscates obfuscated tokens', () => {
		const plain = '4f0ce664-4d8b-4fbc-a2b8-c1f9e7b24351'
		const obfuscated = 'S\u0001W\u0004\u0002QQSJS\u0003_\u0005JS\u0001\u0005\u0004J\u0006U\u0005_J\u0004V\u0001^\u0002P\u0005USTRV'
		
		expect(antiPlagiarism(obfuscated)).to.equal(plain)
	})		
})
