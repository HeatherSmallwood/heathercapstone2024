export const convertImageToBase64 = (image: File): Promise<string | null> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
  
      reader.onloadend = () => {
        // Resolve with the base64 data when the reader is done
        resolve(reader.result as string);
      };
  
      // Read the image file as Data URL
      reader.readAsDataURL(image);
    });
  };