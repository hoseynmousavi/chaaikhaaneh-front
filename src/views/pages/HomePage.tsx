import URLS from "constant/routing/URLS"
import getTextConstant from "helpers/general/getTextConstant"
import {useState} from "react"
import type {PageRouterType} from "types/RouterType"
import HomeHeader from "views/components/home/HomeHeader"
import HomePlanCard from "views/components/home/HomePlanCard"
import Route from "views/components/router/Route"
import Switch from "views/components/router/Switch"
import Tab from "views/components/tab/Tab"
import Tabs from "views/components/tab/Tabs"
import HomeNotPaidTab from "views/tabs/home/HomeNotPaidTab"
import HomePaidTab from "views/tabs/home/HomePaidTab"

function HomePage({route: {isRendering}}: PageRouterType) {
	const textConstant = getTextConstant()
	const [activeRouteIndex, setActiveRouteIndex] = useState<number | undefined>(undefined)

	function onActiveRouteChange({activeRouteIndex}: {activeRouteIndex: number | undefined}) {
		setActiveRouteIndex(activeRouteIndex)
	}

	return (
		<div className="home">
			<main className="home-content">
				<div className="home-content-fix">
					<div className="home-page">
						<HomeHeader />
						<HomePlanCard />
						<Tabs activeRouteIndex={activeRouteIndex}>
							<Tab label={textConstant.paid} link={URLS.mainContainer.routes.home.routes.homePaid} order={2} />
							<Tab label={textConstant.notPaid} link={URLS.mainContainer.routes.home.routes.homeNotPaid} order={1} />
						</Tabs>

						<Switch className="" isTab isParentRendering={isRendering} level={2} onActiveRouteChange={onActiveRouteChange}>
							<Route path={URLS.mainContainer.routes.home.routes.homePaid} element={() => <HomePaidTab />} />
							<Route path={URLS.mainContainer.routes.home.routes.homeNotPaid} element={() => <HomeNotPaidTab />} />
						</Switch>
					</div>
				</div>
			</main>
		</div>
	)
}

export default HomePage
