// create function for CIELAB color transformations:
export const CIElab = {    
    l_center: 70,
    a_center: 20,
    b_center: 38, 
    radius: 60,
    
    // Convert CIElab to RGB
    toRGB: function(l: number, a: number , b: number) {
        var varY = (l + 16) / 115.0;
        var varX = a / 500.0 + varY;
        var varZ = varY - b / 200.0;

        varX = CIElab.filter_threshold(varX)
        varY = CIElab.filter_threshold(varY)
        varZ = CIElab.filter_threshold(varZ)
        
        var refX =  95.047
        var refY = 100.000
        var refZ = 108.883
        
        var X = refX * varX / 100
        var Y = refY * varY / 100
        var Z = refZ * varZ / 100
        
        var varR = X * 3.2406 + Y * (-1.5374) + Z * (-0.4986)
        var varG = X * (-0.9689) + Y * 1.8758 + Z * 0.0415
        var varB = X * 0.0557 + Y * (-0.2040) + Z * 1.0570
        
        var R = CIElab.gamma_correction(varR) * 255
        var G = CIElab.gamma_correction(varG) * 255
        var B = CIElab.gamma_correction(varB) * 255
        
        R = CIElab.trimming(R)
        G = CIElab.trimming(G)
        B = CIElab.trimming(B)  
        
        return RGBtoHEX(R,G,B)
    },

    // Filter threshold for CIElab to RGB conversion
    filter_threshold: function(xyz: number) {
        if(Math.pow(xyz, 3.0) > 0.008856){
            return Math.pow(xyz, 3.0)
        } else{
            return((xyz - 16.0/116.0) / 7.787)
        }
    },

    // Trimming for CIElab to RGB conversion
    trimming: function(rgb: number) {
        if (rgb > 255){
            rgb = 255
        } else if(rgb < 0){
            rgb = 0
        }
        return(Math.floor(rgb))
    },
    
    // Gamma correction for IEC 61966-2-1 standard
    gamma_correction: function(rgb: number) {
        if (rgb > 0.0031308){
            return(1.055 * (Math.pow(rgb, (1.0/2.4))) - 0.055)
        } else {
            return(12.92 * rgb)
        }
    },

    // Convert angle to RGB
    angle_to_rgb(angle: number){
        var theta = angle * Math.PI / 180.0
        var a = CIElab.a_center + CIElab.radius * Math.cos(theta)
        var b = CIElab.b_center + CIElab.radius * Math.sin(theta)
        var l = CIElab.l_center
        return CIElab.toRGB(l,a,b)
    },
    
    angle_distance_correction(angles: number[]) {
        let new_angles: number[] = [];
        for(let i = 0; i < angles.length; i++){
            new_angles[i] = (angles[i] + 360) % 360;
        }
        return(new_angles);
    }
}

const componentToHex = function (c: number) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
};

const RGBtoHEX = function(R: number, G: number, B: number) {
    return "#" + componentToHex(R) + componentToHex(G) + componentToHex(B);
};

// create function to create grayscale colors:
export const grayscale = (gray: number) => {
    return "hsl(0,0%," + gray + "%)";
}