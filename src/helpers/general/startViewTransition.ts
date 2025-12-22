interface Props {
	update: () => void
	types?: Array<string>
	useUpdateForCatch?: boolean
	addBodyClassName?: string
}

let activeTransition: ViewTransition | null = null

function startViewTransition(props: Props) {
	const {update, types, useUpdateForCatch = true, addBodyClassName} = props
	return new Promise((resolve, reject) => {
		if (document.startViewTransition) {
			if (activeTransition) {
				activeTransition.skipTransition()
				return activeTransition.finished.then(() => startViewTransition(props))
			} else {
				if (addBodyClassName) {
					document.body.classList.add(addBodyClassName)
				}
				try {
					activeTransition = document.startViewTransition({update, types})
					activeTransition.finished.then(() => {
						removeBodyClass(addBodyClassName)
						activeTransition = null
						resolve(null)
					})
				} catch (e: any) {
					console.log(e?.message)
					activeTransition = null
					removeBodyClass(addBodyClassName)
					rejectOrNot(reject, update, resolve, useUpdateForCatch)
				}
			}
		} else {
			rejectOrNot(reject, update, resolve, useUpdateForCatch)
		}
	})
}

function rejectOrNot(reject: () => void, update: () => void, resolve: (props: any) => void, useUpdateForCatch?: boolean) {
	if (useUpdateForCatch) {
		update()
		resolve(null)
	} else {
		reject()
	}
}

function removeBodyClass(addBodyClassName?: string) {
	if (addBodyClassName) {
		document.body.classList.remove(addBodyClassName)
	}
}

export default startViewTransition
