import { InitialValuesType } from './type';

export const processImage = async (
  file: File,
  options: InitialValuesType
): Promise<File | null> => {
  const { direction } = options;

  try {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    await img.decode();

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    canvas.width = img.width;
    canvas.height = img.height;

    if (direction === 'horizontal') {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    } else {
      ctx.translate(0, canvas.height);
      ctx.scale(1, -1);
    }

    ctx.drawImage(img, 0, 0);
    URL.revokeObjectURL(img.src);

    const blob = await new Promise<Blob>((resolve) =>
      canvas.toBlob((b) => b && resolve(b), file.type || 'image/png')
    );

    return new File([blob], file.name, { type: file.type || 'image/png' });
  } catch (error) {
    console.error('Error flipping image:', error);
    return null;
  }
};
