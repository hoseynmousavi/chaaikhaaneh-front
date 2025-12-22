import OS_TYPES from "constant/general/OS_TYPES"
import ThemeColorBar from "context/theme/ThemeColorBar"
import checkIsStandAlone from "helpers/general/checkIsStandAlone"
import createIosSplashScreen from "helpers/general/createIosSplashScreen"
import getOS from "helpers/general/getOS"
import getComputedStyleHelper from "helpers/theme/getComputedStyleHelper"
import {lazy, type ReactNode, Suspense, useEffect} from "react"
import BodyScrollbar from "views/components/body-scrollbar/BodyScrollbar"
import ToastContainer from "views/components/toast/ToastContainer"

const PhoneSimulatorTopAndEnv = lazy(() => import("views/components/phone-simulator-dev/PhoneSimulatorTopAndEnv"))

function ThemeProvider({children}: {children: ReactNode}) {
	useEffect(() => {
		const OS = getOS()
		const isIOS = OS === OS_TYPES.ios
		const isStandalone = checkIsStandAlone()

		if (isStandalone) {
			function preventContextMenu(e: any) {
				e.preventDefault()
			}

			window.addEventListener("contextmenu", preventContextMenu, {passive: false})
		} else {
			if (isIOS) {
				createIosSplashScreen({icon: `/icon_512.png?version=${process.env.REACT_APP_VERSION}`, backgroundColor: getComputedStyleHelper("--surface-fourth")})
			}
		}
	}, [])

	return (
		<>
			<ThemeColorBar />
			{children}
			<BodyScrollbar />

			{process.env.NODE_ENV === "development" && (
				<Suspense fallback={null}>
					<PhoneSimulatorTopAndEnv />
				</Suspense>
			)}
			<ToastContainer />
		</>
	)
}

export default ThemeProvider
