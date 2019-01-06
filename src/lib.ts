export function roundToPrecision(n, precision, fixed?: boolean) {
    n = parseFloat(n);

    if ( isNaN(n) || !isFinite(n) ) {
        return NaN;
    }

    if ( !precision || isNaN(precision) || !isFinite(precision) || precision < 1 ) {
        return Math.round( n );
    }

    var q = Math.pow(10, precision);
    n = Math.round( n * q ) / q;

    if (fixed) {
        n = n.toFixed(fixed);
    }

    return n;
}

/**
 * Obtains a human-readable file size string (1024 based).
 * @param {Number} bytes The file size in bytes
 * @param {Number} precision (optional) Defaults to 2
 * @return {String}
 */
export function readableFileSize(bytes, precision = 2, fixed = false) {
    var i = 0, step = 1024  , units = [
            "B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"
        ], out;

    while (bytes > step) {
        bytes = bytes / step;
        i++;
    }

    out = roundToPrecision(
        bytes,
        precision
    );

    if (fixed) {
        out = out.toFixed(fixed);
    }

    return out + " " + units[i];
}

/**
 * Returns the int representation of the first argument or the
 * "defaultValue" if the int conversion is not possible.
 * @memberof Utils
 * @param {*} x The argument to convert
 * @param {*} defaultValue The fall-back return value. This is going to be
 *                         converted to integer too.
 * @return {Number} The resulting integer.
 */
export function intVal( x, defaultValue? ) {
    var out = parseInt(x, 10);
    if ( isNaN(out) || !isFinite(out) ) {
        out = defaultValue === undefined ? 0 : intVal(defaultValue);
    }
    return out;
}

export function floatVal( x, defaultValue? ) {
    var out = parseFloat(x);
    if ( isNaN(out) || !isFinite(out) ) {
        out = defaultValue === undefined ? 0 : floatVal(defaultValue);
    }
    return out;
}

export function uInt( x, defaultValue? ) {
    return Math.max(intVal( x, defaultValue ), 0);
}

export function uFloat( x, defaultValue? ) {
    return Math.max(floatVal( x, defaultValue ), 0);
}

// finds the greatest common divider for a and b
export function gcd (a: number, b: number): number
{
    return (b === 0) ? a : gcd(b, a % b);
}

export function getRatio(w: number, h: number): string
{
    var d = gcd(w, h);
    return w / d + "/" + h / d;
}
