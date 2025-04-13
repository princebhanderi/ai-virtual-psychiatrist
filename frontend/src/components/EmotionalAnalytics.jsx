import React, { useState, useEffect } from 'react';

const EmotionAnalytics = () => {
  const [emotionData, setEmotionData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEmotionAnalytics();
  }, []);

  const fetchEmotionAnalytics = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8000/emotion-analytics/', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch emotion analytics: ${response.status}`);
      }

      const data = await response.json();
      setEmotionData(data.emotions || {});
    } catch (err) {
      console.error('Error fetching emotion analytics:', err);
      setError(err.message || 'Failed to load emotion analytics');
    } finally {
      setLoading(false);
    }
  };

  const getEmotionColor = (emotion) => {
    const colors = {
      happy: 'bg-yellow-400',
      sad: 'bg-blue-400',
      angry: 'bg-red-500',
      fear: 'bg-purple-400',
      surprise: 'bg-teal-400',
      disgust: 'bg-green-600',
      neutral: 'bg-gray-400',
    };
    return colors[emotion] || 'bg-gray-300';
  };

  const getEmotionIcon = (emotion) => {
    const icons = {
      happy: '😊',
      sad: '😢',
      angry: '😠',
      fear: '😨',
      surprise: '😲',
      disgust: '🤢',
      neutral: '😐',
    };
    return icons[emotion] || '😐';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-6">
        <div className="animate-pulse">Loading emotion data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4">
        Error: {error}
      </div>
    );
  }

  // Get total count of emotions
  const totalEmotions = Object.values(emotionData).reduce((sum, count) => sum + count, 0);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Emotion Analytics</h2>

      {Object.keys(emotionData).length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">No emotion data available yet.</p>
      ) : (
        <>
          <div className="mb-4 flex h-6 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
            {Object.entries(emotionData).map(([emotion, count]) => (
              <div
                key={emotion}
                className={`${getEmotionColor(emotion)} flex items-center justify-center text-xs font-medium text-white`}
                style={{ width: `${(count / totalEmotions) * 100}%` }}
                title={`${emotion}: ${count} (${Math.round((count / totalEmotions) * 100)}%)`}
              >
                {(count / totalEmotions) * 100 > 10 ? `${emotion}` : ''}
              </div>
            ))}
          </div>

          <div className="space-y-2 mt-4">
            {Object.entries(emotionData)
              .sort((a, b) => b[1] - a[1])
              .map(([emotion, count]) => (
                <div key={emotion} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{getEmotionIcon(emotion)}</span>
                    <span className="capitalize text-gray-800 dark:text-gray-200">{emotion}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-600 dark:text-gray-400">{count}</span>
                    <span className="ml-2 text-gray-400 dark:text-gray-500 text-sm">
                      ({Math.round((count / totalEmotions) * 100)}%)
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default EmotionAnalytics;