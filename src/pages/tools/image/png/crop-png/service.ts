export async function cropImage(
  file: File,
  x: number,
  y: number,
  width: number,
  height: number,
  outputType: string
): Promise<File | null> {
  try {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    await img.decode();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, x, y, width, height, 0, 0, width, height);
    URL.revokeObjectURL(img.src);
    const blob = await new Promise<Blob>((resolve) =>
      canvas.toBlob((b) => b && resolve(b), outputType)
    );
    const ext = outputType.split('/')[1];
    const fileName = file.name.replace(/\.[^.]+$/, `.${ext}`);
    return new File([blob], fileName, { type: outputType });
  } catch (error) {
    console.error('Error cropping image:', error);
    return null;
  }
}
