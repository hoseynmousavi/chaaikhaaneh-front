import URLS, {type UrlType} from "constant/routing/URLS"
import useLocation from "context/location/hooks/useLocation"
import pathToRegex from "helpers/router/pathToRegex"

interface Props {
	blackLocations?: Array<string | UrlType>
	whiteLocations?: Array<string>
}

function useCheckIfLocationMatch(props: Props) {
	const {location} = useLocation()
	const {blackLocations, whiteLocations} = props
	const urlsThatShouldCheck: {[key: string]: string | Function | UrlType} = {...URLS.mainContainer.routes} // Order is important
	const urlsKeys = Object.keys(urlsThatShouldCheck)
	for (let i = 0; i < urlsKeys.length; i++) {
		const key = urlsKeys[i]
		const url = urlsThatShouldCheck[key]
		const path = typeof url === "object" ? url.entry : typeof url === "string" ? url : ""
		const should = blackLocations ? blackLocations.indexOf(path) === -1 : whiteLocations?.indexOf(path) !== -1
		if (typeof url !== "function") {
			const matched = pathToRegex({path}).test(location)
			if (matched) {
				return should
			}
		}
	}
	return false
}

export default useCheckIfLocationMatch
