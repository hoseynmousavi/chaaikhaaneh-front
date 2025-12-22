const md = typeof navigator !== "undefined" ? navigator.mediaDevices : null
let haveCam = false
if (md?.enumerateDevices) {
	md.enumerateDevices().then(devices => {
		if (devices.some(device => "videoinput" === device.kind)) haveCam = true
	})
}

function haveCamera() {
	return haveCam
}

export default haveCamera
