import {PureComponent, type ReactNode, Suspense} from "react"

// const UnexpectedErrorPage = lazy(() => import("views/pages/error-pages/UnexpectedErrorPage"))

interface State {
	hasError: boolean
}

interface Props {
	children: ReactNode
}

class PageErrorBoundary extends PureComponent<Props, State> {
	constructor(props: Props) {
		super(props)
		this.state = {hasError: false}
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
					{/*<UnexpectedErrorPage handleBack={true}/>*/}
					error
				</Suspense>
			)
		} else {
			return children
		}
	}
}

export default PageErrorBoundary
