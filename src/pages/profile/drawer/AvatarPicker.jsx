import { useEffect, useRef, useState } from "react";
import { Camera, Check, Trash2, X } from "lucide-react";
import Avatar from "../../../components/shared/Avatar";
import { useTranslation } from "../../../context/language";

const SIZE = 320;

export default function AvatarPicker({ name, value, onChange }) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const { t } = useTranslation();

  function stopCamera() {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  }

  useEffect(() => stopCamera, []);

  async function openCamera() {
    setError("");
    if (!navigator.mediaDevices?.getUserMedia) {
      setError(t("cameraNotSupported"));
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 640 } },
      });
      streamRef.current = stream;
      setOpen(true);
      requestAnimationFrame(() => {
        if (videoRef.current) videoRef.current.srcObject = stream;
      });
    } catch {
      setError(t("cameraDenied"));
    }
  }

  function closeCamera() {
    stopCamera();
    setOpen(false);
  }

  function takePhoto() {
    const video = videoRef.current;
    if (!video) return;

    const side = Math.min(video.videoWidth, video.videoHeight) || SIZE;
    const canvas = document.createElement("canvas");
    canvas.width = SIZE;
    canvas.height = SIZE;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(
      video,
      (video.videoWidth - side) / 2,
      (video.videoHeight - side) / 2,
      side,
      side,
      0,
      0,
      SIZE,
      SIZE
    );

    onChange(canvas.toDataURL("image/jpeg", 0.85));
    closeCamera();
  }

  return (
    <div className="dw-avatar-picker">
      {open ? (
        <div className="dw-cam">
          <video ref={videoRef} autoPlay playsInline muted className="dw-cam-video" />
          <div className="dw-cam-actions">
            <button type="button" className="dw-cam-shot" onClick={takePhoto}>
              <Check size={18} strokeWidth={2.6} />
              {t("cameraShoot")}
            </button>
            <button type="button" className="dw-avatar-btn" onClick={closeCamera}>
              <X size={15} strokeWidth={2.4} />
              {t("cancel")}
            </button>
          </div>
        </div>
      ) : (
        <>
          <Avatar src={value} name={name} className="dw-avatar-preview" />

          <div className="dw-avatar-controls">
            <button type="button" className="dw-avatar-btn" onClick={openCamera}>
              <Camera size={15} strokeWidth={2.2} />
              {value ? t("cameraRetake") : t("cameraTake")}
            </button>

            {value && (
              <button type="button" className="dw-avatar-btn is-danger" onClick={() => onChange("")}>
                <Trash2 size={14} strokeWidth={2.2} />
                {t("removeImage")}
              </button>
            )}

            <small>{t("avatarHint")}</small>
          </div>
        </>
      )}

      {error && <p className="dw-note is-bad">{error}</p>}
    </div>
  );
}
