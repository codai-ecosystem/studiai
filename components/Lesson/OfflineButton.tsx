'use client';

import React, { useState, useContext, useEffect } from 'react';
import { Button, Tooltip, Progress } from '@heroui/react';
import { FiDownload, FiCheck, FiWifiOff } from '../icons/FeatherIcons';
import { useOfflineContent } from '@/components/Profile/hooks/useOfflineContent';
import { Lesson, Course } from '@/types';
import { AppContext } from '@/components/AppContext';

interface OfflineButtonProps {
  lesson: Lesson;
  course: Course;
  className?: string;
}

export default function OfflineButton({
  lesson,
  course,
  className = '',
}: OfflineButtonProps) {
  const {
    isDownloading,
    downloadProgress,
    downloadLesson,
    isLessonAvailableOffline,
    removeOfflineContent,
  } = useOfflineContent();

  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [isAvailableOffline, setIsAvailableOffline] = useState<boolean>(false);

  // Track online status
  useEffect(() => {
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    updateOnlineStatus();

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  // Track offline availability
  useEffect(() => {
    setIsAvailableOffline(isLessonAvailableOffline(lesson.id));
  }, [lesson.id, isLessonAvailableOffline]);

  const handleDownload = async () => {
    if (isAvailableOffline) {
      // If already available offline, remove it
      await removeOfflineContent(lesson.id, 'lesson');
      setIsAvailableOffline(false);
    } else {
      // Otherwise download it
      await downloadLesson(lesson, course);
      setIsAvailableOffline(true);
    }
  };

  // Don't show the button if we're offline and the lesson isn't available
  if (!isOnline && !isAvailableOffline) {
    return null;
  }

  const isCurrentlyDownloading = isDownloading[lesson.id];
  const currentProgress = downloadProgress[lesson.id] || 0;

  return (
    <Tooltip
      content={
        isAvailableOffline
          ? 'Remove from offline storage'
          : 'Download for offline viewing'
      }
    >
      <Button
        color={isAvailableOffline ? 'success' : 'default'}
        variant={isAvailableOffline ? 'flat' : 'bordered'}
        size="sm"
        className={`relative ${className}`}
        onClick={handleDownload}
        disabled={isCurrentlyDownloading || (!isOnline && !isAvailableOffline)}
      >
        {isCurrentlyDownloading ? (
          <>
            <span className="opacity-0">Downloading...</span>
            <div className="absolute inset-0 flex items-center justify-center">
              <Progress
                value={currentProgress}
                aria-label="Download progress"
                className="h-1 w-full absolute bottom-0 left-0"
              />
              <span className="text-xs">{currentProgress}%</span>
            </div>
          </>
        ) : isAvailableOffline ? (
          <>
            <FiCheck className="w-4 h-4 mr-2" />
            Available Offline
          </>
        ) : (
          <>
            <FiDownload className="w-4 h-4 mr-2" />
            Download Lesson
          </>
        )}
      </Button>
    </Tooltip>
  );
}
