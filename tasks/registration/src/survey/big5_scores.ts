export function bfi2_scores(responses: { [key: string]: any }, expInfo: any) {
    // BFI-2
    var bfi2_resp = {};
    if (expInfo.DESIGN.BFI2_type == "extra-short") {
        bfi2_resp = { ...responses["bfi2-matrix-0"], ...responses["bfi2-matrix-1"]};
    } else if (expInfo.DESIGN.BFI2_type == "short") {
        bfi2_resp = { ...responses["bfi2-matrix-0"], ...responses["bfi2-matrix-1"], ...responses["bfi2-matrix-2"] };
    } else if (expInfo.DESIGN.BFI2_type == "full") {
        bfi2_resp = { ...responses["bfi2-matrix-0"], ...responses["bfi2-matrix-1"], ...responses["bfi2-matrix-2"],
                    ...responses["bfi2-matrix-3"], ...responses["bfi2-matrix-4"], ...responses["bfi2-matrix-5"] };
    } else {
        throw new Error("BFI-2 type not supported");
    };
    console.log(bfi2_resp);

    // for (let i; i < bfi2_resp_length; i++) {
    //     let x = bfi2_resp_all.filter(([key, value]) => key === "bfi2-matrix-${i}");
    //     bfi2_resp.push(x)
    //     console.log(x)
    // };
    
    // console.log(bfi2_resp)

    // BFI-2: extraversion
    const bfi2_e_all = Object.entries(bfi2_resp).filter(([key, value]) => key.startsWith("BFI-E"))
    const bfi2_e = bfi2_e_all.filter(([key, value]) => !key.endsWith("R"));
    const bfi2_e_r = bfi2_e_all.filter(([key, value]) => key.endsWith("R"));
   
    let bfi2_e_sum = 0;
    bfi2_e.map(([key, value]) => value as number).forEach(num => bfi2_e_sum += num);
    bfi2_e_r.map(([key, value]) => value as number).forEach(num => bfi2_e_sum += (expInfo.DESIGN.nSCALE_REV - num));
    const bfi2_e_scale = bfi2_e_sum;
    
    // BFI-2: agreeableness
    const bfi2_v_all = Object.entries(bfi2_resp).filter(([key, value]) => key.startsWith("BFI-V"))
    const bfi2_v = bfi2_v_all.filter(([key, value]) => !key.endsWith("R"));
    const bfi2_v_r = bfi2_v_all.filter(([key, value]) => key.endsWith("R"));
   
    let bfi2_v_sum = 0;
    bfi2_v.map(([key, value]) => value as number).forEach(num => bfi2_v_sum += num);
    bfi2_v_r.map(([key, value]) => value as number).forEach(num => bfi2_v_sum += (expInfo.DESIGN.nSCALE_REV - num));
    const bfi2_v_scale = bfi2_v_sum;

    // BFI-2: conscientiousness
    const bfi2_g_all = Object.entries(bfi2_resp).filter(([key, value]) => key.startsWith("BFI-G"))
    const bfi2_g = bfi2_g_all.filter(([key, value]) => !key.endsWith("R"));
    const bfi2_g_r = bfi2_g_all.filter(([key, value]) => key.endsWith("R"));
   
    let bfi2_g_sum = 0;
    bfi2_g.map(([key, value]) => value as number).forEach(num => bfi2_g_sum += num);
    bfi2_g_r.map(([key, value]) => value as number).forEach(num => bfi2_g_sum += (expInfo.DESIGN.nSCALE_REV - num));
    const bfi2_g_scale = bfi2_g_sum;

    // BFI-2: emotional stability
    const bfi2_ne_all = Object.entries(bfi2_resp).filter(([key, value]) => key.startsWith("BFI-NE"))
    const bfi2_ne = bfi2_ne_all.filter(([key, value]) => !key.endsWith("R"));
    const bfi2_ne_r = bfi2_ne_all.filter(([key, value]) => key.endsWith("R"));
   
    let bfi2_ne_sum = 0;
    bfi2_ne.map(([key, value]) => value as number).forEach(num => bfi2_ne_sum += num);
    bfi2_ne_r.map(([key, value]) => value as number).forEach(num => bfi2_ne_sum += (expInfo.DESIGN.nSCALE_REV - num));
    const bfi2_ne_scale = bfi2_ne_sum;

    // BFI-2: openness
    const bfi2_o_all = Object.entries(bfi2_resp).filter(([key, value]) => key.startsWith("BFI-O"))
    const bfi2_o = bfi2_o_all.filter(([key, value]) => !key.endsWith("R"));
    const bfi2_o_r = bfi2_o_all.filter(([key, value]) => key.endsWith("R"));
   
    let bfi2_o_sum = 0;
    bfi2_o.map(([key, value]) => value as number).forEach(num => bfi2_o_sum += num);
    bfi2_o_r.map(([key, value]) => value as number).forEach(num => bfi2_o_sum += (expInfo.DESIGN.nSCALE_REV - num));
    const bfi2_o_scale = bfi2_o_sum;

    return  [bfi2_e_scale, bfi2_v_scale, bfi2_g_scale, bfi2_ne_scale, bfi2_o_scale];

}