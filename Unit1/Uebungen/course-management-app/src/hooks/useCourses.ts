import { useState } from 'react';
import { Course, coursesData } from '../data/mockData';

const STORAGE_KEY = 'courses';

export function useCourses() {
    const [courses, setCourses] = useState<Course[]>(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? (JSON.parse(stored) as Course[]) : coursesData;
    });

    const addCourse = (course: Course) => {
        const updated = [...courses, course];
        setCourses(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    };

    const deleteCourse = (id: number) => {
        const updated = courses.filter((c) => c.id !== id);
        setCourses(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    };

    const nextId = (): number => Math.max(0, ...courses.map((c) => c.id)) + 1;

    return { courses, addCourse, deleteCourse, nextId };
}
