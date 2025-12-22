import OS_TYPES from "constant/general/OS_TYPES"
import getBrowser from "helpers/general/getBrowser"
import getOS from "helpers/general/getOS"
import toastManager from "helpers/theme/toastManager"
import {type RefObject, useEffect, useRef, useState} from "react"

interface Props {
	inputRef: RefObject<{onChange?: ({value}: {value: string}) => void}>
}

function useSpeechToText({inputRef}: Props) {
	const transcriptRef = useRef<any>(null)
	const [hearingVoice, setHearingVoice] = useState(false)

	useEffect(() => {
		// @ts-expect-error - ok
		const speech = window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition
		if (speech && getBrowser() !== "safari" && getOS() !== OS_TYPES.ios) {
			try {
				transcriptRef.current = new speech()
				transcriptRef.current.lang = "fa-IR"
				transcriptRef.current.onresult = (event: any) => {
					const txt = event?.results?.[0]?.[0]?.transcript
					if (txt) {
						inputRef.current?.onChange?.({value: txt})
					}
				}
				transcriptRef.current.onstart = () => setHearingVoice(true)
				transcriptRef.current.onend = () => setHearingVoice(false)
				transcriptRef.current.onerror = console.log
			} catch (e: any) {
				transcriptRef.current = null
				console.error(e, e?.message)
			}
		}
	}, [])

	function onVoiceClick() {
		if (transcriptRef.current) {
			if (hearingVoice) {
				transcriptRef.current?.stop?.()
			} else {
				transcriptRef.current?.start?.()
			}
		} else {
			toastManager.addToast({message: "voiceNotSupported"})
		}
	}

	return {hearingVoice, onVoiceClick}
}

export default useSpeechToText
