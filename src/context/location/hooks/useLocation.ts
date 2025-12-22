import {locationContext} from "context/location/locationReducer"
import {use} from "react"

function useLocation() {
	const {location} = use(locationContext)
	return {location}
}

export default useLocation
