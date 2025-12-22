import DEFAULT_HEAD_META_CONTENT from "constant/text/DEFAULT_HEAD_META_CONTENT"

interface Props {
	title?: string
	description?: string
	image?: string
}

function getHeadMetaParams(props: Props) {
	const {title = DEFAULT_HEAD_META_CONTENT.title, description = DEFAULT_HEAD_META_CONTENT.description, image = DEFAULT_HEAD_META_CONTENT.image} = props

	return {notEscapedTitle: title, title: title.replace(/"/g, "&quot;"), description: description.replace(/"/g, "&quot;"), image}
}

export default getHeadMetaParams
