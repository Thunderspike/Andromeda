import { middleware } from "./gloabls";

const charsOnlyRegex = /^[a-zA-Z]+$/,
    charRegex = /[a-zA-Z]/,
    numRegex = /[0-9]/,
    alphaNumdashRegex = /[^_\w]/,
    wsRegex = /\s/;

export const onlyCharsAndNums = (input) => {
    return (
        !wsRegex.test(input) && // no white spaces
        !alphaNumdashRegex.test(input) && // no symbols other than a-z0-9
        charRegex.test(input) && // at least 1 a-zA-Z
        numRegex.test(input) // at least 1 0-9
    );
};

export const p_timeout = (timeout = 500) =>
    new Promise((resolve) => setTimeout(resolve, timeout));

// lodash's debounce
export const debounce = (func, wait, options) => {
    let lastArgs,
        lastThis,
        maxWait,
        result,
        timerId,
        lastCallTime,
        lastInvokeTime = 0,
        leading = false,
        maxing = false,
        trailing = true;
    if (typeof func !== "function") {
        throw new TypeError(`Expected function`);
    }
    wait = Number(wait) || 0;
    if (typeof options === "object") {
        leading = !!options.leading;
        maxing = "maxWait" in options;
        maxWait = maxing
            ? Math.max(Number(options.maxWait) || 0, wait)
            : maxWait;
        trailing = "trailing" in options ? !!options.trailing : trailing;
    }

    function invokeFunc(time) {
        let args = lastArgs,
            thisArg = lastThis;

        lastArgs = lastThis = undefined;
        lastInvokeTime = time;
        result = func.apply(thisArg, args);
        return result;
    }

    function leadingEdge(time) {
        // Reset any `maxWait` timer.
        lastInvokeTime = time;
        // Start the timer for the trailing edge.
        timerId = setTimeout(timerExpired, wait);
        // Invoke the leading edge.
        return leading ? invokeFunc(time) : result;
    }

    function remainingWait(time) {
        let timeSinceLastCall = time - lastCallTime,
            timeSinceLastInvoke = time - lastInvokeTime,
            result = wait - timeSinceLastCall;
        return maxing
            ? Math.max(result, maxWait - timeSinceLastInvoke)
            : result;
    }

    function shouldInvoke(time) {
        let timeSinceLastCall = time - lastCallTime,
            timeSinceLastInvoke = time - lastInvokeTime;
        // Either this is the first call, activity has stopped and we're at the trailing
        // edge, the system time has gone backwards and we're treating it as the
        // trailing edge, or we've hit the `maxWait` limit.
        return (
            lastCallTime === undefined ||
            timeSinceLastCall >= wait ||
            timeSinceLastCall < 0 ||
            (maxing && timeSinceLastInvoke >= maxWait)
        );
    }

    function timerExpired() {
        const time = Date.now();
        if (shouldInvoke(time)) {
            return trailingEdge(time);
        }
        // Restart the timer.
        timerId = setTimeout(timerExpired, remainingWait(time));
    }

    function trailingEdge(time) {
        timerId = undefined;

        // Only invoke if we have `lastArgs` which means `func` has been debounced at
        // least once.
        if (trailing && lastArgs) {
            return invokeFunc(time);
        }
        lastArgs = lastThis = undefined;
        return result;
    }

    function cancel() {
        if (timerId !== undefined) {
            clearTimeout(timerId);
        }
        lastInvokeTime = 0;
        lastArgs = lastCallTime = lastThis = timerId = undefined;
    }

    function flush() {
        return timerId === undefined ? result : trailingEdge(Date.now());
    }

    function debounced() {
        let time = Date.now(),
            isInvoking = shouldInvoke(time);
        lastArgs = arguments;
        lastThis = this;
        lastCallTime = time;

        if (isInvoking) {
            if (timerId === undefined) {
                return leadingEdge(lastCallTime);
            }
            if (maxing) {
                // Handle invocations in a tight loop.
                timerId = setTimeout(timerExpired, wait);
                return invokeFunc(lastCallTime);
            }
        }
        if (timerId === undefined) {
            timerId = setTimeout(timerExpired, wait);
        }
        return result;
    }
    debounced.cancel = cancel;
    debounced.flush = flush;
    return debounced;
};

export const copyTextToClipboard = (text) => {
    const errMessage = "Your browser doesn't allow clipboard access!";

    return new Promise(async (resolve, reject) => {
        if (!navigator.clipboard) {
            const fallbackMethodCopySuccessful =
                fallbackCopyTextToClipboard(text);
            fallbackMethodCopySuccessful ? resolve(true) : reject(errMessage);
        }
        try {
            await navigator.clipboard.writeText(text);
            resolve(true);
        } catch (e) {
            reject(e);
        }
    });
};

function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    let successful = false;

    try {
        successful = document.execCommand("copy");
    } catch (err) {}
    document.body.removeChild(textArea);

    return successful;
}

export const p_postData = ({ url, data }) =>
    new Promise(async (resolve, reject) => {
        let response = await fetch(url, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(data),
        });
        const isResponseSuccessful = response.ok;
        response = await response.json();

        if (!isResponseSuccessful) reject(response);
        resolve(response);
    });
