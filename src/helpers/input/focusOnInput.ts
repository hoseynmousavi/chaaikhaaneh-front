import type {RefObject} from "react"

function focusOnInput(ref: RefObject<null | HTMLInputElement | HTMLTextAreaElement>) {
	setTimeout(() => {
		const valueLength = ref?.current?.value?.length ?? 0
		try {
			ref?.current?.setSelectionRange?.(valueLength, valueLength)
			ref?.current?.focus?.()
		} catch (_) {
			ref?.current?.focus?.()
		}
	}, 10)
}

export default focusOnInput
