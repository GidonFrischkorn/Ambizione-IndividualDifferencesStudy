export function nfc_scores(responses: Object, expInfo: any) {
    
    // BFI-2
    const nfc_resp = Object(Object.entries(responses).filter(([key, value]) => key === "nfc-matrix")[0][1])

    // const nfc_resp = Object(Object.entries(search_object).filter(([key, value]) => key === "nfc-matrix")[0][1])
    const nfc = Object.entries(nfc_resp).filter(([key, value]) => !key.endsWith("r"))
    const nfc_r = Object.entries(nfc_resp).filter(([key, value]) => key.endsWith("r"))

    let nfc_sum = 0;
    nfc.map(([key, value]) => value).forEach(num => nfc_sum += num);
    nfc_r.map(([key, value]) => value).forEach(num => nfc_sum += (expInfo.DESIGN.nSCALE_REV - num));
    const nfc_scale = nfc_sum;

    return nfc_scale;
}