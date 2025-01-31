export function nfc_scores(responses: Object, expInfo: any) {
    
    // NFC
    const nfc_resp = Object(Object.entries(responses).filter(([key, value]) => key === "nfc-matrix")[0][1])
    let nfc_sum = 0;

    nfc_resp.forEach(([key, value]) => {
        const num_value = Number(value); 
        if (key.endsWith("r")) {
            // Reverse-scored items: subtract from the scale
            nfc_sum += (expInfo.DESIGN.nSCALE_REV - num_value);
        } else {
            // Regular items: add to the scale
            nfc_sum += num_value;
        }
    });
    
    const nfc_sum_score = nfc_sum;
    const nfc_mean_score = nfc_sum/nfc_resp.length;
    
    return [nfc_sum_score, nfc_mean_score];
}