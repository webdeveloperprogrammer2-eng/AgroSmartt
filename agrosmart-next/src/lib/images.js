// Сурати захиравӣ, вақте маҳсулот/замин расми худро надорад.
// Пештар via.placeholder.com истифода мешуд — он домен дигар кор намекунад
// ва дар ҷои сурат иконкаи шикаста нишон медод.
export const PLACEHOLDER_IMG = "/img/image.png";

// Агар корбар суроғаи холӣ ё нодуруст диҳад, суратро иваз мекунем
export function imgOrPlaceholder(src) {
  return typeof src === "string" && src.trim() ? src.trim() : PLACEHOLDER_IMG;
}

// Ҳадди ниҳоии ҳаҷми сурат (2 МБ).
// Сурат ҳамчун data URL мустақим дар худи сабт нигоҳ дошта мешавад —
// json-server захираи файл надорад, бинобар ин файлҳои калон базаро вазнин
// мекунанд. (Дар db.json сурати мавҷуда низ ҳамин тавр нигоҳ дошта шудааст.)
export const MAX_IMAGE_BYTES = 2 * 1024 * 1024;

/**
 * Файли аз компютер интихобшударо ба data URL табдил медиҳад.
 * Хатогиҳо ҳамчун КАЛИДИ ТАРҶУМА партофта мешаванд — форма онҳоро бо t() нишон медиҳад.
 */
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
