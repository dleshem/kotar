const c = 'g'.charCodeAt(0)

const antiPlagiarism = (obfuscated) => {
	let deobfuscated = ''
	
	for (let i = 0; i < obfuscated.length; ++i){
		deobfuscated += String.fromCharCode(c ^ obfuscated.charCodeAt(i))
	}
	
	return deobfuscated
}

export default antiPlagiarism