import {useState} from "react"

function useToggle(initial: boolean): [boolean, () => void] {
	const [s, setS] = useState(initial)

	function toggle() {
		setS(s => !s)
	}

	return [s, toggle]
}

export default useToggle
