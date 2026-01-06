import URLS from "constant/routing/URLS"
import {lazy} from "react"
import AlertContainer from "views/components/alert/AlertContainer"
import PrivateRoute from "views/components/router/PrivateRoute"
import Switch from "views/components/router/Switch"

const LoginPage = lazy(() => import("views/pages/LoginPage"))
const HomePage = lazy(() => import("views/pages/HomePage"))

function App() {
	return (
		<>
			<Switch level={1} isParentRendering>
				<PrivateRoute path={URLS.mainContainer.routes.login} element={() => <LoginPage />} ifNotLogin />

				<PrivateRoute path={URLS.mainContainer.routes.home.entry} element={route => <HomePage route={route} />} isContainer />
			</Switch>

			<AlertContainer />
		</>
	)
}

export default App
