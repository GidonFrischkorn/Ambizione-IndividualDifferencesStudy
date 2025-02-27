
import { random } from "@coglabuzh/webpsy.js"
import { expInfo } from "../settings";
let {OBJECTS} = expInfo;

/**
 * Sample a pair of images from the pool.
 * The function returns an array of two image objects 
 * including the image name and the image size.
 * 
 * @param pool [object] the pool of images
 * @param memory [object] the memory of images that have been used over previous trials
 * @param interval [number] the interval between the two images [default: 2]
 * @param trialIndex [number] the index of the current trial [default: 0]
 * @returns [array] an array of two image objects
 */
export function samplePair(
    pool: { [key: string]: number },
    memory: { [key: number]: object },
    interval: number = 2,
    trialIndex: number,
    fix = false
): object {


  // image pool (exclude the control object from the pool)
  let imagePool = Object.keys(pool).filter(
    (image) => image !== OBJECTS.CONTROL_OBJECT
  );

  let secondImagePool:any[] = [];
  let firstImage:string;
  let firstSize:number;
  let i = 0;

  do {
    // sample the first image
    firstImage = fix
      ? OBJECTS.CONTROL_OBJECT
      /**
       * because the number of images whose size is 2 is much larger than other images,
       * it makes the other images whose size is larger than 4 more likely to be sampled as the second image.
       * to avoid this, we sample the first image from the images whose size is not 2.
       * it makes the other images whose size is 1 or 3 can be used more often.
       */
      : random.sample(imagePool.filter((image)=> pool[image]!==2), 1)[0];

    // get the size of the first image
    firstSize = pool[firstImage];

    // initialize the memory for the current trial index
    memory[trialIndex] = memory[trialIndex] || {};

    if (fix) {
      // create a temporary larger pool for the second image
      let largerPool = imagePool.filter(
        (image) => pool[image] >= firstSize + interval
      );
      // create a temporary smaller pool for the second image
      let smallerPool = imagePool.filter(
        (image) => pool[image] <= firstSize - interval
      );

      // if there is no image in the larger pool, sample the second image from the smaller pool
      let smallerPoolSize:number

      if (i > 50) {
         smallerPoolSize = largerPool.length === 0 ? 1 : largerPool.length;
      } else {
         smallerPoolSize = largerPool.length;
      }

      // sample the second image from the larger and smaller pool
      smallerPool = random.sample(smallerPool, smallerPoolSize);

      secondImagePool = largerPool.concat(smallerPool);
    } else {
      // create a temporary pool for the second image
      for (let image of imagePool) {
        // get the size of the current image
        let imageSize = pool[image];
        // check if the size of the current image is different from the size of the first image
        if (Math.abs(imageSize - firstSize) >= interval)
          secondImagePool.push(image);
      }
    }

    i++;

    // if the second image pool is empty, resample the first image
  } while (secondImagePool.length === 0 && i < 100);


  // move the first image to the memory
  memory[trialIndex][firstImage] = firstSize;

  // sample the second image
  let secondImage = random.sample(secondImagePool, 1)[0];

  // get the size of the second image
  let secondSize = pool[secondImage];

  // delete the first and second image from the pool
  if (!fix) delete pool[firstImage];
  delete pool[secondImage];

  let returnOBj1 = {
    left: { image: firstImage, size: firstSize },
    right: { image: secondImage, size: secondSize },
  };

  let returnOBj2 = {
    left: { image: secondImage, size: secondSize },
    right: { image: firstImage, size: firstSize },
  };

  if (random.random() > 0.5) {
    return returnOBj1;
  } else {
    return returnOBj2;
  }
}



