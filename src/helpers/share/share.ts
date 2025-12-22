import nothing from "helpers/general/nothing"
import getFullUrl from "helpers/router/getFullUrl"
import toastManager from "helpers/theme/toastManager"

function share({title, text}: { title?: string; text?: string } = {}) {
    const link = getFullUrl().fullUrlWithDomain

    if (navigator.share) {
        const shareData = {...(title ? {title} : {}), ...(text ? {text} : {}), url: link}

        navigator.share(shareData).catch(nothing)
    }
    else {
        navigator.clipboard.writeText(link).then(() => {
            // const {linkCopied} = getToastConstant()
            toastManager.addToast({type: "INFO", message: "linkCopied"})
        })
    }
}

export default share
