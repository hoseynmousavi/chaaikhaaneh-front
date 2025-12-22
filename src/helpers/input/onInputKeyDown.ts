import nothing from "helpers/general/nothing"
import type {KeyboardEvent, KeyboardEventHandler} from "react"

interface Props {
	disableSubmit?: boolean
	onSubmit?: () => void
	onSubmitDisable?: () => void
	checkError?: (e: any) => void
}

function onInputKeyDown(props: Props): undefined | ReturnType<(e: KeyboardEvent) => KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>> {
	const {disableSubmit, onSubmit, onSubmitDisable, checkError} = props
	if (onSubmit) {
		return (e: KeyboardEvent<HTMLInputElement>) => {
			if (e.key === "Enter" && !e.shiftKey) {
				if (e.currentTarget.type === "textarea") {
					try {
						e?.preventDefault?.()
					} catch (_) {
						nothing()
					}
				}

				if (!disableSubmit) {
					onSubmit?.()
				} else {
					checkError?.(e)
					onSubmitDisable?.()
				}
			}
		}
	}
}

export default onInputKeyDown
