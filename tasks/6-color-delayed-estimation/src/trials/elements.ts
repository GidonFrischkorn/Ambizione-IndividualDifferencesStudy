import { expInfo } from "../settings";

interface ImageObject {
  imagePath: string;
  color?: string;
}

interface TextObject {
  letter: "string";
  color: string;
}

/*export function drawImageObject(
  images: ImageObject,
  position: number[],
  width: number
): any[] {
  let objectList: any[] = [];

  const { imagePath, color } = images;

  var rect_object = {
    obj_type: "rect", // means a rectangle
    width: width,
    height: width,
    fill_color: color,
    line_color: color,
    startX: position[0],
    startY: position[1],
  };

  var img_object = {
    obj_type: "image", // means a rectangle
    file: imagePath,
    image_width: width + 2,
    startX: position[0],
    startY: position[1],
  };

  objectList.push(rect_object);
  objectList.push(img_object);

  return objectList;
}*/

export function drawTextObject(
  textObject: TextObject,
  position: number[],
  width: number
): any[] {
  let objectList: any[] = [];

  const { letter, color } = textObject;

  // Create text object for the letter
  var text_object = {
    obj_type: "text",
    content: letter, // Display the letter
    fontSize: expInfo.OBJECTS.SIZE, 
    startX: position[0],
    startY: position[1],
    text_color: color, // Set color of the text
  };

  objectList.push(text_object);

  return objectList;
}