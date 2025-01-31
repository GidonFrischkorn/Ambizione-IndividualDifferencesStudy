export function bmw3_scores(responses: Object, expInfo: any) {
    // BMW-3
    const bmw3_resp = Object(Object.entries(responses).filter(([key, value]) => key === "bmw3-matrix")[0][1])

    // BMW-3: I scale
    const bmw3_i = Object.entries(bmw3_resp).filter(([key, value]) => key.startsWith("MW-I"))
    let bmw3_i_sum = 0;
    bmw3_i.map(([key, value]) => value as number).forEach(num => bmw3_i_sum += num);
    const bmw3_i_scale = bmw3_i_sum;

    // BMW-3: UI scale
    const bmw3_ui = Object.entries(bmw3_resp).filter(([key, value]) => key.startsWith("MW-UI"))
    let bmw3_ui_sum = 0;
    bmw3_ui.map(([key, value]) => value as number).forEach(num => bmw3_ui_sum += num);
    const bmw3_ui_scale = bmw3_ui_sum;

    // BMW-3: MA scale
    const bmw3_ma = Object.entries(bmw3_resp).filter(([key, value]) => key.startsWith("MW-MA"))
    let bmw3_ma_sum = 0;
    bmw3_ma.map(([key, value]) => value as number).forEach(num => bmw3_ma_sum += num);
    const bmw3_ma_scale = bmw3_ma_sum;

    return [bmw3_i_scale, bmw3_ui_scale, bmw3_ma_scale];
}