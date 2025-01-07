import { Angle2RGB } from "./transformAngle2RGB";
import { calculateMods } from "./calculateMods";
import { random } from "@coglabuzh/webpsy.js";

export const sampleColorWheel = function(number_cols:number, cols_difference:number, col_group_difference:number, start:any){

  // set up given arguments
  const nr_cols = number_cols;
  const dist_col = cols_difference;
  const col_group_diff = col_group_difference;

  // CIELAB values as defined in:
  // Bae, G.-Y., Olkkonen, M., Allred, S. R., & Flombaum, J. I. (2015). 
  // Why Some Colors Appear More Memorable Than Others: A Model Combining Categories and Particulars in Color Working Memory. 
  // Journal of Experimental Psychology: General. Advance online publication. 
  // http://dx.doi.org/10.1037/xge0000076
  
  const L = 70;
  const a = 0;
  const b = 0;
  const wheel_radius = 38;
  
  // define RGB values for 360 colors on color wheel (range 0 - 359)
  var RGB = new Array();
  for (let ang = 0; ang < 360; ang++){
    let col = Angle2RGB(ang, L, a, b, wheel_radius);
    RGB.push(col);
  }

  // determine random start for first color on color wheel from all possible 360 values
  var col_start = start;
  
  // determine 2 color anchors
  const nr_anchors = 2;
  
  // difference between anchors
  const anchors_diff = calculateMods((col_group_diff + (nr_cols - 1) * (dist_col)), 360); //mods((col_group_diff + 2 * (nr_cols - 1) * (dist_col / 2)), 360);
  var anchors = new Array(nr_anchors).fill(0);

  // calculate starting points in degrees for two color groups
  for(let anchs = 0; anchs < nr_anchors; anchs++){

    // define starting point (i.e., first color) for color group 1
    if (anchs == 0){
      anchors[anchs] = col_start[0];
    } else { // define starting point (i.e., first color) for color group 2
      const new_anchor = calculateMods(col_start[0] + anchors_diff * anchs, 360);
      anchors[anchs] = new_anchor;
    }
  }

  // map values of 0 to 360 on color wheel (possible range from 1-360 degrees)
  anchors = anchors.map(function(i) {
    if (i == 0){
      return 360;
    } else{
      return Math.round(i);
    }
  })
  
  // determine n colors around anchor
  var cols_angs_anchors1 = new Array(nr_cols).fill(0);
  var cols_angs_anchors2 = new Array(nr_cols).fill(0);

  // caclulate angles for colors for both anchors
  for(let cols = 0; cols < nr_cols; cols++){
    if (cols == 0){
      cols_angs_anchors1[cols] = anchors[0]; 
      cols_angs_anchors2[cols] = anchors[1];
    } else {
      cols_angs_anchors1[cols] = calculateMods(anchors[0] + dist_col * (cols), 360); 
      cols_angs_anchors2[cols] = calculateMods(anchors[1] + dist_col * (cols), 360); 
    }
  }

  // map values of 0 to 360 on color wheel (possible range from 1-360 degrees)
  cols_angs_anchors1 = cols_angs_anchors1.map(function(i) {
    if (i == 0){
      return 360;
    } else{
      return Math.round(i);
    }
  })

  // map values of 0 to 360 on color wheel (possible range from 1-360 degrees)
  cols_angs_anchors2 = cols_angs_anchors2.map(function(i) {
    if (i == 0){
      return 360;
    } else{
      return Math.round(i);
    }
  })

  // select RGB values for colors from both color groups in a single array
  var cols_RGB = new Array(2 * nr_cols).fill(0);

  // define angles of 360 as 0 for RGB array to define colors
  for (let i = 0; i < 2 * nr_cols; i++){
    if (i < nr_cols){
      cols_RGB[i] = RGB[cols_angs_anchors1[i] % 360];
    } else {
      cols_RGB[i] = RGB[cols_angs_anchors2[i % nr_cols] % 360];
    }
  }
    
  // return 
  // random start point, 
  // RGB values of colors, 
  // angles of colors on color wheel from group 1 and group 2

  return [cols_RGB, cols_angs_anchors1, cols_angs_anchors2];
}

