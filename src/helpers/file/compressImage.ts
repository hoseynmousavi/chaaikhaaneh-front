import imageCompression from "browser-image-compression"

function compressImage({img, maxSizeMB}: {img: File; maxSizeMB: number}): Promise<File> {
	return new Promise((resolve, reject) => {
		if (img.size / 1024 / 1024 <= maxSizeMB) {
			resolve(img)
		} else {
			imageCompression(img, {maxSizeMB, maxIteration: 14})
				.then(compressedFile => {
					const file = new File([compressedFile], compressedFile.name)
					if (file.size > img.size) resolve(img)
					else resolve(file)
				})
				.catch(err => {
					reject(err)
				})
		}
	})
}

export default compressImage
