import React, { useRef, useState, useCallback } from 'react';
import { Camera, X, Check, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../utils/cn';

export const VideoRecorder: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [recordedVideo, setRecordedVideo] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      const chunks: BlobPart[] = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/mp4' });
        const url = URL.createObjectURL(blob);
        setRecordedVideo(url);
        setIsPreviewing(true);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  }, []);

  const handleUpload = useCallback(async () => {
    setIsProcessing(true);
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setIsPreviewing(false);
    setRecordedVideo(null);
  }, []);

  const discardRecording = useCallback(() => {
    setRecordedVideo(null);
    setIsPreviewing(false);
  }, []);

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50">
      <AnimatePresence>
        {isPreviewing && recordedVideo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 w-64 bg-black rounded-lg overflow-hidden shadow-xl"
          >
            <video
              src={recordedVideo}
              className="w-full aspect-[9/16] object-cover"
              autoPlay
              loop
              muted
            />
            <div className="p-4 flex justify-between items-center">
              {isProcessing ? (
                <div className="flex items-center gap-2 text-white">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Uploading...</span>
                </div>
              ) : (
                <>
                  <button
                    onClick={discardRecording}
                    className="p-2 rounded-full bg-red-500/10 text-red-500 hover:bg-red-500/20"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleUpload}
                    className="p-2 rounded-full bg-green-500/10 text-green-500 hover:bg-green-500/20"
                  >
                    <Check className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={isRecording ? stopRecording : startRecording}
        className={cn(
          "p-4 rounded-full shadow-lg transition-all duration-300",
          isRecording 
            ? "bg-red-500 animate-pulse" 
            : "bg-primary hover:bg-primary/80"
        )}
      >
        <Camera className="w-6 h-6 text-white" />
      </button>

      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="hidden"
      />
    </div>
  );
};