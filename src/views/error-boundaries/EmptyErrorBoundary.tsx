import {PureComponent, type ReactNode} from "react"

interface State {
	hasError: boolean
}

interface Props {
	children: ReactNode
}

class EmptyErrorBoundary extends PureComponent<Props, State> {
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
		if (!hasError) {
			return children
		}
	}
}

export default EmptyErrorBoundary
