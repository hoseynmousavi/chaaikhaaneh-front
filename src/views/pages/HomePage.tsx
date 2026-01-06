import URLS from "constant/routing/URLS"
import useUser from "context/auth/hooks/useUser"
import getTextConstant from "helpers/general/getTextConstant"
import TomanColoredSvg from "media/svg/TomanColoredSvg"
import {useState} from "react"
import type {PageRouterType} from "types/RouterType"
import Route from "views/components/router/Route"
import Switch from "views/components/router/Switch"
import Tab from "views/components/tab/Tab"
import Tabs from "views/components/tab/Tabs"
import HomeOverdueTab from "views/tabs/home/HomeOverdueTab"
import HomePaymentsTab from "views/tabs/home/HomePaymentsTab"

function HomePage({route: {isRendering}}: PageRouterType) {
	const textConstant = getTextConstant()
	const {user} = useUser()
	const {name, phone_number} = user || {}

	const [activeRouteIndex, setActiveRouteIndex] = useState<number | undefined>(undefined)

	function onActiveRouteChange({activeRouteIndex}: {activeRouteIndex: number | undefined}) {
		setActiveRouteIndex(activeRouteIndex)
	}

	return (
		<div className="home">
			<main className="home-content">
				<div id="main" className="home-content-fix">
					<div className="home-page">
						<div className="home-page-card">
							<div className="home-page-card-first">
								<div className="home-page-card-first-title">{name}</div>
								<div className="home-page-card-first-desc">{phone_number}</div>
							</div>
							<div className="home-page-card-second">
								<div className="home-page-card-second-top">
									<div>300,000</div>
									<TomanColoredSvg className="home-page-card-second-top-icon" />
								</div>
								<div className="home-page-card-second–desc">{textConstant.monthlyPay}</div>
							</div>
						</div>
						<Tabs activeRouteIndex={activeRouteIndex}>
							<Tab label={textConstant.payments} link={URLS.mainContainer.routes.home.routes.homePayments} order={2} />
							<Tab label={textConstant.overdue} link={URLS.mainContainer.routes.home.routes.homeOverdue} order={1} />
						</Tabs>

						<Switch className="org-content-tab-content" isTab isParentRendering={isRendering} level={2} onActiveRouteChange={onActiveRouteChange}>
							<Route path={URLS.mainContainer.routes.home.routes.homePayments} element={() => <HomePaymentsTab />} />
							<Route path={URLS.mainContainer.routes.home.routes.homeOverdue} element={() => <HomeOverdueTab />} />
						</Switch>
					</div>
				</div>
			</main>
		</div>
	)
}

export default HomePage
