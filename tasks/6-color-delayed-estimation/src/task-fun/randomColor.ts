

/**
 * A function used to generate a random HSL Color for the sqaures in the encoding part of the task.
 * 
 *
 * @returns Returns the HSL code for one color.
 */
export function getRandomHSLColor() {
    // Random hue value between 0 and 359
    const h = Math.floor(Math.random() * 360);
    
    // Fixed saturation and lightness values
    const s = 80; // You can set this to any value between 0 and 100
    const l = 50; // You can set this to any value between 0 and 100

    return `hsl(${h}, ${s}%, ${l}%)`;
}