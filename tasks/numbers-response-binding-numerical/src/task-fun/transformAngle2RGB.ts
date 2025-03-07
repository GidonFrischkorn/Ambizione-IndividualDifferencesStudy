export const Angle2RGB = function(ang: number, l, a, b, radius = 60){
    const angle = [ang];
    const theta = angle.map(i => i * Math.PI /180);
    const A = theta.map(i => a + radius * Math.cos(i));
    const Be = theta.map(i => b + radius * Math.sin(i));
    const L = Array(A.length).fill(l);

    // convert LAB to XYZ
    var var_y = L.map(i => (i + 16) / 115);
    var var_x = A.map((i, j) => i / 500 + var_y[j]);
    var var_z = Be.map((i, j) => var_y[j] - i / 200);

    // filter X, Y, Z with threshold 0.008856
    var_y = var_y.map(function(i){
        if((i**3) > 0.008856){
            return i**3
        } else{
            return (i -16 / 116) / 7.787
        }
    })

    var_x = var_x.map(function(i){
        if((i**3) > 0.008856){
            return i**3
        } else{
            return (i -16 / 116) / 7.787
        }
    })

    var_z = var_z.map(function(i){
        if((i**3) > 0.008856){
            return i**3
        } else{
            return (i -16 / 116) / 7.787
        }
    })

    const ref_x = 95.047;
    const ref_y = 100.000;
    const ref_z = 108.883;

    const x = var_x.map(i => ref_x * i / 100);
    const y = var_y.map(i => ref_y * i / 100);
    const z = var_z.map(i => ref_z * i / 100);

    const var_R = x.map((i, j) => i * 3.2406 + y[j] * -1.5372 + z[j] * -0.4986);
    const var_G = x.map((i, j) => i * -0.9689 + y[j] * 1.8758 + z[j] * 0.0415);
    const var_B = x.map((i, j) => i * 0.0557 + y[j] * -0.2040 + z[j] * 1.0570);

    // gamma correction
    const R = var_R.map(function(i){
        if(i > 0.0031308){
            return 1.055 * (i ** (1/2.4)) - 0.055
        } else{
            return 12.92 * i
        }
    })

    const G = var_G.map(function(i){
        if(i > 0.0031308){
            return 1.055 * (i ** (1/2.4)) - 0.055
        } else{
            return 12.92 * i
        }
    })

    const B = var_B.map(function(i){
        if(i > 0.0031308){
            return 1.055 * (i ** (1/2.4)) - 0.055
        } else{
            return 12.92 * i
        }
    })

    var RGB = [R, G, B];

    //trimming
    RGB = RGB.map(function(i){
        return i.map(function(j){
            if(j * 255 > 255){
                return 255
            } else if(j * 255 < 0){
                return 0
            } else {
                return j * 255
            }
        });      
    });

    return RGB.flat();
}
