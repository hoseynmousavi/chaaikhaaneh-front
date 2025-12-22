import router from "helpers/router/router"
import {useEffect, useRef} from "react"

interface Props {
	to: string
	push?: boolean
}

function Redirect({to, push}: Props) {
	const timer = useRef<ReturnType<typeof setTimeout>>(null)

	useEffect(() => {
		if (timer.current) clearTimeout(timer.current)
		timer.current = setTimeout(() => {
			if (push) {
				router.pushState({url: to})
			} else {
				router.replaceState({url: to})
			}
		}, 100)
	}, [])

	return null
}

export default Redirect
