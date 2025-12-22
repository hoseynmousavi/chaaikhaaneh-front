import useResizeObserver from "hooks/screen/useResizeObserver"
import {type ReactNode, useRef, useState} from "react"

interface AutoHeightProps {
	className?: string
	contentClassName?: string
	children: ReactNode
}

function AutoHeight(props: AutoHeightProps) {
	const {className = "", contentClassName = "", children} = props
	const [height, setHeight] = useState("auto")
	const contRef = useRef<HTMLDivElement>(null)
	useResizeObserver({ref: contRef, callback: onResize})

	function onResize([entry]: Array<ResizeObserverEntry>) {
		setHeight(entry?.borderBoxSize?.[0] ? `${Math.ceil(entry.borderBoxSize[0].blockSize)}px` : "auto")
	}

	return (
		<div className={`auto-height ${className}`}>
			<div className="auto-height-content" style={{height}}>
				<div className={`auto-height-content-child ${contentClassName}`} ref={contRef}>
					{children}
				</div>
			</div>
		</div>
	)
}

export default AutoHeight
