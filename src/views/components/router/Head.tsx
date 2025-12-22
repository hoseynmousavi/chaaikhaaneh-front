import {serverReq} from "ContextWrapper"
import getHeadMetaParams from "helpers/router/getHeadMetaParams"
import {useEffect} from "react"

interface Props {
	title: string
	description?: string
	image?: string
}

function Head(props: Props) {
	const {title, description, image} = props

	useEffect(() => {
		const {notEscapedTitle, title: metaTitle, description: metaDescription, image: metaImage} = getHeadMetaParams({title, description, image})

		document.title = notEscapedTitle
		document.querySelector("meta[property='og:title']")?.setAttribute("content", metaTitle)
		document.querySelector("meta[name='twitter:title']")?.setAttribute("content", metaTitle)

		document.querySelector("meta[name='description']")?.setAttribute("content", metaDescription)
		document.querySelector("meta[property='og:description']")?.setAttribute("content", metaDescription)
		document.querySelector("meta[name='twitter:description']")?.setAttribute("content", metaDescription)

		document.querySelector("meta[property='og:image']")?.setAttribute("content", metaImage)
		document.querySelector("meta[name='twitter:image']")?.setAttribute("content", metaImage)
	}, [title, description, image])

	if (typeof window === "undefined") {
		serverReq.metaTitle = title
		if (description) {
			serverReq.metaDescription = description
		}
		if (image) {
			serverReq.metaImage = image
		}
	}

	return undefined
}

export default Head
