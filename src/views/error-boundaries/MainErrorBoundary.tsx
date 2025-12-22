import {ENV_CONSTANT} from "helpers/general/ENV_CONSTANT"
import isIpOrLocal from "helpers/general/isIpOrLocal"
import onFirstInteraction from "helpers/general/onFirstInteraction"
import yieldTask from "helpers/general/yieldTask"
import {PureComponent, type ReactNode, Suspense} from "react"

// const UnexpectedErrorPage = lazy(() => import("views/pages/error-pages/UnexpectedErrorPage"))

interface State {
	hasError: boolean
}

interface Props {
	children: ReactNode
}

class MainErrorBoundary extends PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)
		this.state = {hasError: false}

		if (typeof window !== "undefined" && process.env.NODE_ENV === "production" && !isIpOrLocal()) {
			onFirstInteraction({
				callback: () => {
					yieldTask().then(() =>
						import("@sentry/react").then(Sentry => {
							Sentry.init({
								environment: ENV_CONSTANT,
								dsn: "https://eca03912ebff713df02802ba1f0b4c6c@sentry.roya-negar.ir/14",
								integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration()],
								tracesSampleRate: 1,
								sendDefaultPii: true,
								replaysSessionSampleRate: 0.1,
								replaysOnErrorSampleRate: 1,
							})
						}),
					)
				},
			})
		}
	}

	static getDerivedStateFromError(error: any) {
		console.error(error)
		return {hasError: true}
	}

	override componentDidCatch(error: any, errorInfo: any) {
		console.error({error, errorInfo})
	}

	override render() {
		const {hasError} = this.state
		const {children} = this.props
		if (hasError) {
			return (
				<Suspense fallback={null}>
					{/*<UnexpectedErrorPage/>*/}
					error
				</Suspense>
			)
		} else {
			return children
		}
	}
}

export default MainErrorBoundary
