import AuthProvider from "context/auth/authProvider"
import LocationProvider from "context/location/locationReducer"
import ScreenProvider from "context/screen/screenProvider"
import ScrollProvider from "context/scroll/scrollProvider"
import ThemeProvider from "context/theme/themeProvider"
import type {ReactNode} from "react"
import type {ExpressRequestType} from "types/ExpressRequestType"
import MainErrorBoundary from "views/error-boundaries/MainErrorBoundary"

export let serverReq: ExpressRequestType

interface Props {
	children: ReactNode
	req?: ExpressRequestType
}

function ContextWrapper({children, req}: Props) {
	if (req) {
		serverReq = req
	}
	return (
		<MainErrorBoundary>
			<LocationProvider>
				<ScreenProvider>
					<ThemeProvider>
						<ScrollProvider>
							<AuthProvider>{children}</AuthProvider>
						</ScrollProvider>
					</ThemeProvider>
				</ScreenProvider>
			</LocationProvider>
		</MainErrorBoundary>
	)
}

export default ContextWrapper
