/**
 * Determine the mobile operating system.
 * This function returns one of 'iOS', 'Android', 'Windows Phone', or 'unknown'.
 *
 * @returns {String}
 */

export function getMobileOperatingSystem() {
    const userAgent = navigator.userAgent || navigator.vendor;
    
    let retString: string = "";

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        retString = "Windows Phone";
    }

    if (/android/i.test(userAgent)) {
        retString = "Android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window["MSStream"]) {
        retString = "iOS";
    }

    return  retString || "unknown";
}

/**
 * Determine if we are in mobile.
 *
 * @returns {boolean}
 */

export function isMobile() {
    
    return /iOS/i.test( getMobileOperatingSystem() ) ||  /Android/i.test( getMobileOperatingSystem() )

}

