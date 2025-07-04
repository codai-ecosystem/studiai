import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import CourseHeader from './CourseHeader';
import CourseDetails from './CourseDetails';
import CourseEnrollment from './CourseEnrollment';
import { AppContext } from '@/components/AppContext';

interface CourseDetailProps {
  course: any;
  courseId: string;
  courseLessons: any[];
  hasAccess: boolean;
  isAdmin: boolean;
}

export default function CourseDetailView({
  course,
  courseId,
  courseLessons,
  hasAccess,
  isAdmin,
}: CourseDetailProps) {
  const [courseWithStats, setCourseWithStats] = useState(course);
  const context = useContext(AppContext);

  useEffect(() => {
    if (!course) return;

    const enhancedCourse = { ...course };

    // Add lesson count from actual lessons data
    enhancedCourse.lessonsCount = courseLessons ? courseLessons.length : 0; // Calculate minutes of content
    const totalMinutes = courseLessons
      ? courseLessons.reduce((acc, lesson) => {
          // Ensure lesson is defined
          if (!lesson) return acc;

          // Handle different duration property types with enhanced safety checks
          let durationMins = 0;

          // First try durationMinutes field
          if (lesson.durationMinutes !== undefined) {
            if (typeof lesson.durationMinutes === 'number') {
              durationMins = lesson.durationMinutes;
            } else if (typeof lesson.durationMinutes === 'string') {
              const parsed = parseInt(lesson.durationMinutes, 10);
              if (!isNaN(parsed)) durationMins = parsed;
            }
          }
          // Fall back to duration field if durationMinutes is not available
          else if (lesson.duration !== undefined) {
            if (typeof lesson.duration === 'number') {
              durationMins = lesson.duration;
            } else if (typeof lesson.duration === 'string') {
              const parsed = parseInt(lesson.duration, 10);
              if (!isNaN(parsed)) durationMins = parsed;
            }
          }

          return acc + durationMins;
        }, 0)
      : 0;

    // Format duration based on total minutes
    if (totalMinutes > 0) {
      const hours = Math.floor(totalMinutes / 60);
      const mins = totalMinutes % 60;

      if (hours > 0) {
        enhancedCourse.duration = `${hours}h ${mins > 0 ? `${mins}m` : ''}`;
      } else {
        enhancedCourse.duration = `${mins}m`;
      }
    }

    // Calculate student count from user purchases data (if available)
    if (context?.userPaidProducts) {
      const studentsCount = context.userPaidProducts.filter(
        product => product.metadata?.courseId === courseId
      ).length;

      enhancedCourse.students = studentsCount;
    }

    setCourseWithStats(enhancedCourse);
  }, [course, courseId, courseLessons, context?.userPaidProducts]);

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <CourseHeader course={courseWithStats} />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <CourseDetails
            course={course}
            courseId={courseId}
            lessons={courseLessons}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700"
        >
          <CourseEnrollment
            course={course}
            isPurchased={hasAccess || isAdmin}
          />
        </motion.div>
      </div>
    </div>
  );
}
