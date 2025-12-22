import {Activity, cloneElement, memo, type ReactElement, Suspense} from "react"
import type {SwitchChildProps} from "types/RouterType"
import LoadingWrapper from "views/components/loading/LoadingWrapper"
import PageErrorBoundary from "views/error-boundaries/PageErrorBoundary"

interface Props {
	index: number
	stateLength: number
	element: ReactElement<SwitchChildProps>
	location: string
	isParentRendering?: boolean
	isTab?: boolean
}

function SwitchItem(props: Props) {
	const {index, stateLength, element, location, isParentRendering, isTab} = props
	const isRendering = index === stateLength - 1 && !!isParentRendering
	return (
		<Activity mode={isRendering ? "visible" : "hidden"}>
			<div className={`router-container ${isTab ? "tab-container" : ""}`}>
				<PageErrorBoundary>
					<Suspense fallback={isTab ? null : <LoadingWrapper />}>{cloneElement(element, {location, isRendering})}</Suspense>
				</PageErrorBoundary>
			</div>
		</Activity>
	)
}

export default memo(SwitchItem)
