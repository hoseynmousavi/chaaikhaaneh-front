import URLS from "constant/routing/URLS"
import useUser from "context/auth/hooks/useUser"
import {type ReactElement, useRef} from "react"
import type {RouterType} from "types/RouterType"
import Redirect from "views/components/router/Redirect"
import Route from "views/components/router/Route"

interface Props {
	ifNotLogin?: boolean
	dontChange?: boolean
	location?: string
	isRendering?: boolean
	path: string
	element: (route: RouterType) => ReactElement
	isContainer?: boolean
}

function PrivateRoute(props: Props) {
	const {ifNotLogin, dontChange, location, isRendering = false, path, element} = props
	const {user} = useUser()
	const isLoginRef = useRef(!!user).current
	const isLogin = dontChange ? isLoginRef : !!user

	if (ifNotLogin) {
		if (!isLogin) return <Route location={location} isRendering={isRendering} path={path} element={element} />
		else return <Redirect to={URLS.mainContainer.routes.home.routes.homeNotPaid} />
	} else {
		if (isLogin) return <Route location={location} isRendering={isRendering} path={path} element={element} />
		else return <Redirect to={URLS.mainContainer.routes.login} />
	}
}

export default PrivateRoute
