import parsePathParams from "helpers/query-param/parsePathParams"
import {memo, type ReactElement} from "react"
import type {RouterType} from "types/RouterType"

interface Props {
	location?: string
	isRendering?: boolean
	path: string
	element: (route: RouterType) => ReactElement
	isContainer?: boolean
}

function Route(props: Props) {
	const {location = "", isRendering = false, path, element} = props
	const params = parsePathParams({path, location})
	return element({isRendering, params, location})
}

export default memo(Route)
