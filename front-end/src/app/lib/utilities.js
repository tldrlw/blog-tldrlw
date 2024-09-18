import { promisify } from 'util';
import sizeOf from 'image-size';
import path from 'path';

const sizeOfAsync = promisify(sizeOf);

// Function to get scaled image dimensions
export async function resizeImage(image, scaleFactor) {
  // Path to the image file on the server
  const imagePath = path.join(process.cwd(), `public/images/${image}`);
  // Get the actual image dimensions
  const dimensions = await sizeOfAsync(imagePath);
  // Calculate the scaled dimensions with precision (retaining two decimal places)
  const scaledWidth = Math.round(dimensions.width * scaleFactor * 100) / 100;
  const scaledHeight = Math.round(dimensions.height * scaleFactor * 100) / 100;
  return {
    width: scaledWidth,
    height: scaledHeight,
  };
}
