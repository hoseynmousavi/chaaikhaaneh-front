import type {RefObject} from "react"
import MaterialLink from "views/components/material/MaterialLink"

interface TabProps {
	tabRef?: RefObject<HTMLDivElement>
	isActive?: boolean
	label: string
	link: string
	order?: number
}

function Tab(props: TabProps) {
	const {tabRef, isActive, label, link, order} = props
	return (
		<MaterialLink className="tab" link={{to: link, replace: true}} rippleColor="var(--surface-fourth)" style={{order}}>
			<div ref={tabRef} className={`tab-inner ${isActive ? "active" : ""}`}>
				{label}
			</div>
		</MaterialLink>
	)
}

export default Tab
