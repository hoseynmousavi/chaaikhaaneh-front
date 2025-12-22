function b64ToFile({b64Data, contentType, fileName = "avatar.png"}: {b64Data: Base64URLString; contentType: string; fileName?: string}) {
	const sliceSize = 512
	const byteCharacters = atob(b64Data)
	const byteArrays = []
	for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
		const slice = byteCharacters.slice(offset, offset + sliceSize)
		const byteNumbers = new Array(slice.length)
		for (let i = 0; i < slice.length; i++) {
			byteNumbers[i] = slice.charCodeAt(i)
		}
		const byteArray = new Uint8Array(byteNumbers)
		byteArrays.push(byteArray)
	}
	return new File(byteArrays, fileName, {type: contentType, lastModified: Date.now()})
}

export default b64ToFile
