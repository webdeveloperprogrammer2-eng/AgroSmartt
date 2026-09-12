export const PLACEHOLDER_IMG = "/img/image.png";

export function imgOrPlaceholder(src) {
  return typeof src === "string" && src.trim() ? src.trim() : PLACEHOLDER_IMG;
}

export const MAX_IMAGE_BYTES = 2 * 1024 * 1024;

export function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error("imageInvalid"));
      return;
    }
    if (!String(file.type).startsWith("image/")) {
      reject(new Error("imageInvalid"));
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      reject(new Error("imageTooLarge"));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("imageReadFailed"));
    reader.readAsDataURL(file);
  });
}
