import React from 'react';
import { Card, CardBody } from '@heroui/react';
import { AdminAnalytics } from '@/types';

interface AdminLessonsSectionProps {
  analytics: AdminAnalytics | null;
}

export default function AdminLessonsSection({
  analytics,
}: AdminLessonsSectionProps) {
  if (!analytics) return null;
  return (
    <Card className="shadow-md mb-8">
      <CardBody>
        <h2 className="text-xl font-semibold mb-4">Lessons</h2>
        <div className="text-center py-4">
          <div className="text-4xl font-bold text-primary-500">
            {analytics.totalLessons || 0}
          </div>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Total lessons created
          </p>
          <div className="mt-4 text-gray-700 dark:text-gray-300">
            Average{' '}
            {analytics.totalCourses > 0
              ? (analytics.totalLessons / analytics.totalCourses).toFixed(1)
              : 0}{' '}
            lessons per course
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
