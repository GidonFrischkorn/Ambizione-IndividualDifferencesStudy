import { expInfo } from "../settings";

interface ImageObject {
  imagePath: string;
  color?: string;
}

interface TextObject {
  letter: "string";
  color: string;
}

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