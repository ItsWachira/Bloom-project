import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getCourse, getUsers, getProjects } from "../../services/api";
import toast from "react-hot-toast";
import styles from "./Enrolled.module.css"; 

export default function Enrolled() {
  const router = useRouter();
  const { id: courseId } = router.query;

  const [loading, setLoading] = useState(false);
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const [courseDetails, setCourseDetails] = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      if (!courseId) return;

      setLoading(true);
      try {
        const { data: courseData } = await getCourse(courseId);
        const enrolledStudentIds = courseData.data.students || [];
        const { data: allUsersData } = await getUsers();

        const enrolledStudentsData = allUsersData.data.filter((user) =>
          enrolledStudentIds.includes(user._id)
        );
        setEnrolledStudents(enrolledStudentsData);
      } catch (error) {
        console.error("Error fetching course details:", error);
        toast.error("Failed to fetch course details");
      } finally {
        setLoading(false);
      }
    };

    const fetchProjects = async () => {
      try {
        const { data } = await getProjects();
        setProjects(data); // Set all projects
      } catch (error) {
        console.error("Error fetching projects:", error);
        toast.error("Failed to fetch projects");
      }
    };

    fetchCourseDetails();
    fetchProjects();
  }, [courseId]);

  const renderEnrolledStudents = () => {
    return (
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.header}>Name</th>
            <th className={styles.header}>Email</th>
            <th className={styles.header}>Projects</th>
          </tr>
        </thead>
        <tbody>
          {enrolledStudents.map((student, index) => (
            <tr key={index} className={styles.row}>
              <td className={styles.cell}>{student.name}</td>
              <td className={styles.cell}>{student.email}</td>
              <td className={styles.cell}>
                <ul>
                  {filterProjects(student._id).map((project, index) => (
                    <li key={index}>
                      <a href={project.githubUrl}>{project.title}</a>
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const filterProjects = (userId) => {
    return projects.data.filter((project) => project.userId === userId);
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {enrolledStudents.length > 0 && (
        <div className={styles.container}>{renderEnrolledStudents()}</div>
      )}
    </div>
  );
}
