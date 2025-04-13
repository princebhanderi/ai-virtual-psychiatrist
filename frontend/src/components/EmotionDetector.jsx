import React, { useRef, useEffect, useState } from 'react';

const EmotionDetector = ({ onEmotionDetected, isActive = true }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const [isAccessGranted, setIsAccessGranted] = useState(false);
  const [error, setError] = useState(null);
  const captureIntervalRef = useRef(null);
  const [currentEmotion, setCurrentEmotion] = useState('neutral');

  // Start webcam access
  useEffect(() => {
    const startWebcam = async () => {
      try {
        if (!isActive) return;
        
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            width: 320, 
            height: 240,
            facingMode: 'user' 
          } 
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          streamRef.current = stream;
          setIsAccessGranted(true);
          setError(null);
        }
      } catch (err) {
        console.error('Error accessing webcam:', err);
        setError('Could not access webcam. Please check permissions.');
        setIsAccessGranted(false);
      }
    };

    startWebcam();

    return () => {
      // Cleanup function
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (captureIntervalRef.current) {
        clearInterval(captureIntervalRef.current);
      }
    };
  }, [isActive]);

  // Setup emotion detection interval
  useEffect(() => {
    if (!isAccessGranted || !isActive) return;

    // Capture and analyze facial expression every 5 seconds
    captureIntervalRef.current = setInterval(() => {
      captureFacialExpression();
    }, 5000);

    return () => {
      if (captureIntervalRef.current) {
        clearInterval(captureIntervalRef.current);
      }
    };
  }, [isAccessGranted, isActive]);

  const captureFacialExpression = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    try {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      // Make sure video is playing
      if (video.readyState !== video.HAVE_ENOUGH_DATA) return;

      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Draw video frame to canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convert canvas to blob instead of base64
      canvas.toBlob(async (blob) => {
        try {
          if (!blob) {
            console.error("Failed to create blob from canvas");
            return;
          }
          
          // Create form data
          const formData = new FormData();
          formData.append('file', blob, 'face.jpg');
          
          // Send to backend
          const response = await fetch('http://localhost:8000/analyze-emotion/', {
            method: 'POST',
            credentials: 'include',
            body: formData,
          });
          
          if (!response.ok) {
            const errorText = await response.text();
            console.error('Emotion analysis failed:', response.status, errorText);
            return;
          }
          
          const emotionData = await response.json();
          console.log('Detected emotion:', emotionData);
          
          // Update the current emotion state
          setCurrentEmotion(emotionData.emotion);
          
          // Send to parent component callback
          if (onEmotionDetected) {
            onEmotionDetected(emotionData);
          }
        } catch (err) {
          console.error('Error sending emotion data:', err);
        }
      }, 'image/jpeg', 0.8);
    } catch (err) {
      console.error('Error capturing facial expression:', err);
    }
  };

  // Manually trigger a capture
  const triggerCapture = () => {
    captureFacialExpression();
  };

  return (
    <div className="emotion-detector">
      {error && (
        <div className="error-message text-red-500 p-2">
          {error}
        </div>
      )}
      
      <div className="video-container relative">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="rounded-lg shadow-md"
          style={{ 
            width: '100%', 
            maxWidth: '320px',
            display: isActive ? 'block' : 'none'
          }}
        />
        
        {currentEmotion && (
          <div className="emotion-status absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
            {currentEmotion}
          </div>
        )}
        
        {/* Hidden canvas used for image processing */}
        <canvas 
          ref={canvasRef} 
          style={{ display: 'none' }} 
        />
      </div>

      <button 
        onClick={triggerCapture}
        className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
      >
        Detect Emotion
      </button>
    </div>
  );
};

export default EmotionDetector;