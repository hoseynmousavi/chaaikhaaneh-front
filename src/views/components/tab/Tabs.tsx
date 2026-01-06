import useResize from "hooks/general/useResize"
import {Children, cloneElement, type ReactElement, useRef, useState} from "react"

interface TabsProps {
	children: Array<ReactElement<TabChildProps>>
	className?: string
	activeRouteIndex: number | undefined
}

interface TabChildProps {
	link: string
	tabRef: (el: HTMLDivElement) => boolean | HTMLDivElement
	isActive: boolean
}

function Tabs(props: TabsProps) {
	const {children, className = "", activeRouteIndex} = props
	const [tabContainerBounding, setTabContainerBounding] = useState<{contX: number}>({contX: 0})
	const {contX} = tabContainerBounding
	const [activeTabBounding, setActiveTabBounding] = useState<{width: number; x: number}>({width: 0, x: 0})
	const {x, width} = activeTabBounding
	const tabsRef = useRef<Array<HTMLDivElement>>([])
	const tabsContainerRef = useRef<HTMLDivElement>(null)
	useResize({resizeCallback: calculateBounding, dependencies: [activeRouteIndex], callOnMount: true})

	function calculateBounding() {
		if (activeRouteIndex !== undefined && tabsRef.current[activeRouteIndex] && tabsContainerRef.current) {
			const {width, x} = tabsRef.current[activeRouteIndex].getBoundingClientRect()
			setActiveTabBounding({width, x})

			const {x: contX} = tabsContainerRef.current.getBoundingClientRect()
			setTabContainerBounding({contX})
		}
	}

	return (
		<div ref={tabsContainerRef} className={`tabs ${className}`}>
			{/** biome-ignore lint/suspicious/noAssignInExpressions: <well see> */}
			{Children.map(children, (child, index) => cloneElement(child, {tabRef: (el: HTMLDivElement) => (el ? (tabsRef.current[index] = el) : delete tabsRef.current[index]), isActive: index === activeRouteIndex}))}
			{(!!width || !!contX) && <div className="tabs-indicator" style={{width, left: x - contX}} />}
		</div>
	)
}

export default Tabs
