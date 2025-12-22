export interface SwitchStateType {
	showChildIndex: number
	location: string
	id: string
	lastScrollY?: number
}

export interface SwitchChildProps {
	path: string
	exact: boolean
	isContainer: boolean
	location: string
	isRendering: boolean
}

export interface RouterType {
	isRendering: boolean
	params: {[key: string]: string}
	location: string
}

export interface PageRouterType {
	route: RouterType
}
