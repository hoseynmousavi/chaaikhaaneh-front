import compressImage from "helpers/file/compressImage"
import router from "helpers/router/router"
import toastManager from "helpers/theme/toastManager"
import {useLayoutEffect, useRef, useState} from "react"
import CropModalContent from "views/components/crop/CropModalContent"
import Loader from "views/components/loading/Loader"
import Modal from "views/components/modal/Modal"

interface Props {
	file: File
	onSubmit: (file: File) => void
	close: () => void
	cropRatio: number
	maxSizeMB: number
}

function CropModal({file, onSubmit, close, cropRatio, maxSizeMB}: Props) {
	const [selectedAvatar, setSelectedAvatar] = useState("")
	const holeRatio = 0.7
	const fitWithWidthRef = useRef(true)
	const minScaleRef = useRef(0)
	const maxScale = 8

	const cropWidthRatio = holeRatio
	const marginWidthRatio = (1 - cropWidthRatio) / 2
	const distanceWidthRatio = marginWidthRatio + cropWidthRatio

	const cropHeightRatio = holeRatio / cropRatio
	const marginHeightRatio = (1 - cropHeightRatio) / 2
	const distanceHeightRatio = marginHeightRatio + cropHeightRatio

	function errorAndClose(toastTxt: string) {
		router.back()
		toastManager.addToast({message: toastTxt, type: "FAIL"})
	}

	function submitAndClose(file: File) {
		onSubmit(file)
		router.back()
	}

	useLayoutEffect(() => {
		if (file.type.includes("gif") || file.type.includes("svg")) {
			if (file.size / 1024 / 1024 <= maxSizeMB) {
				submitAndClose(file)
			} else {
				errorAndClose("imageIsLarge")
			}
		} else {
			compressImage({img: file, maxSizeMB})
				.then(file => {
					const reader = new FileReader()
					reader.readAsDataURL(file)
					reader.onload = () => {
						if (reader.result) {
							const selectedAvatar = reader.result.toString()
							const temp = new Image()
							temp.src = selectedAvatar
							temp.onload = () => {
								const {width, height} = temp
								if (width / height > cropRatio) {
									fitWithWidthRef.current = false
									minScaleRef.current = cropHeightRatio
								} else {
									minScaleRef.current = cropWidthRatio
								}
								setSelectedAvatar(selectedAvatar)
							}
						}
					}
				})
				.catch(() => {
					errorAndClose("processImgFailed")
				})
		}
	}, [])

	return (
		<Modal mobileRootClassName="crop-mobile-modal" className="crop" close={close} disableClose>
			{selectedAvatar ? (
				<CropModalContent
					minScale={minScaleRef.current}
					maxScale={maxScale}
					cropRatio={cropRatio}
					selectedAvatar={selectedAvatar}
					fitWithWidth={fitWithWidthRef.current}
					holeRatio={holeRatio}
					submitAndClose={submitAndClose}
					errorAndClose={errorAndClose}
					cropWidthRatio={cropWidthRatio}
					marginWidthRatio={marginWidthRatio}
					distanceWidthRatio={distanceWidthRatio}
					cropHeightRatio={cropHeightRatio}
					marginHeightRatio={marginHeightRatio}
					distanceHeightRatio={distanceHeightRatio}
				/>
			) : (
				<Loader />
			)}
		</Modal>
	)
}

export default CropModal
