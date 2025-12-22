import getFullUrl from "helpers/router/getFullUrl"
import {createContext, type ReactNode, startTransition, useEffect, useState} from "react"

// @ts-expect-error - ok
export const locationContext = createContext<{location: string}>(null)

function LocationProvider({children}: {children: ReactNode}) {
	const [location, setLocation] = useState(() => getFullUrl().pathUrl)

	useEffect(() => {
		function changeRoute() {
			startTransition(() => setLocation(getFullUrl().pathUrl))
		}

		window.addEventListener("popstate", changeRoute, {passive: true})
		window.addEventListener("pushstate", changeRoute, {passive: true})
		window.addEventListener("replacestate", changeRoute, {passive: true})
	}, [])

	return <locationContext.Provider value={{location}}>{children}</locationContext.Provider>
}

export default LocationProvider
