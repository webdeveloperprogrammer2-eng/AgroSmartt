"use client";

import { useRef, useState } from "react";
import { Mic, Square } from "lucide-react";
import { useTranslation } from "../../context/language";

// Сабти паёми овозӣ. Сервер `audio`-ро ҳатман ҳамчун data-URL мехоҳад
// (ниг. Swagger: kind "voice"), барои ҳамин blob-ро ба base64 табдил медиҳем.
function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export default function VoiceRecorder({ onSend, onError }) {
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const recorderRef = useRef(null);
  const timerRef = useRef(null);
  const { t } = useTranslation();

  async function start() {
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
      onError(t("voiceNotSupported"));
      return;
    }
    let stream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch {
      onError(t("voiceDenied"));
      return;
    }

    const recorder = new MediaRecorder(stream);
    const chunks = [];
    recorder.ondataavailable = (e) => e.data.size > 0 && chunks.push(e.data);
    recorder.onstop = async () => {
      stream.getTracks().forEach((track) => track.stop());
      clearInterval(timerRef.current);
      const blob = new Blob(chunks, { type: recorder.mimeType || "audio/webm" });
      const audio = await blobToDataUrl(blob);
      // Дарозиро аз ҳисобкунаки худамон мегирем — blob-и webm онро надорад
      onSend({ audio, duration: seconds || 1, mimeType: blob.type });
      setSeconds(0);
    };

    recorder.start();
    recorderRef.current = recorder;
    setRecording(true);
    setSeconds(0);
    timerRef.current = setInterval(() => setSeconds((v) => v + 1), 1000);
  }

  function stop() {
    recorderRef.current?.stop();
    setRecording(false);
  }

  if (!recording) {
    return (
      <button type="button" className="chat-mic" onClick={start} aria-label={t("voiceRecord")}>
        <Mic size={18} strokeWidth={2.3} />
      </button>
    );
  }

  return (
    <button type="button" className="chat-mic is-recording" onClick={stop} aria-label={t("voiceStop")}>
      <Square size={15} strokeWidth={2.6} />
      <span>{seconds}s</span>
    </button>
  );
}
