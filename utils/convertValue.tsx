export function isDecimal(value: any) {
    return /^-?\d+(\.\d+)?$/.test(value);
}

export function isHexadecimal(value: any) {
    return /^0x[0-9a-fA-F]+$/.test(value);
}

export function bytesToHex(x: any) {
    return parseFloat(x).toString(16).toUpperCase();
}

export function hexToBytes(hex: string): number {
    return parseInt(hex, 16);
}

export function floatToHex(floatValue: any) {
    const buffer = new ArrayBuffer(4);
    const view = new DataView(buffer);
    view.setFloat32(0, floatValue, false);
    let hex = '';
    for (let i = 0; i < 4; i++) {
        hex += view.getUint8(i).toString(16).padStart(2, '0');
    }
    return hex.toUpperCase();
}

export function hexToFloat(hexValue: any) {
    const buffer = new ArrayBuffer(4);
    const view = new DataView(buffer);
    const hex = hexValue.replace(/^0x/, '');
    for (let i = 0; i < 4; i++) {
        view.setUint8(i, parseInt(hex.substr(i * 2, 2), 16));
    }
    return view.getFloat32(0, false);
}
