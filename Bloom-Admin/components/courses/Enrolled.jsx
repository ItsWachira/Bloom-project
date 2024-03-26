

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getCourse, getUsers, getProjects } from "../../services/api";
import toast from "react-hot-toast";
import styles from "./Enrolled.module.css"; 
import { set } from "lodash";

export default function Enrolled() {
  const router = useRouter();
  const { id: courseId } = router.query;

  const [loading, setLoading] = useState(false);
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const [courseName, setCourseName] = useState("");
  const [projects, setProjects] = useState([]);
  const [url, setURL] = useState([]);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      if (!courseId) return;

      setLoading(true);
      try {
        const { data: courseData } = await getCourse(courseId);
        setCourseName(courseData.data.name);
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

  

    fetchCourseDetails();
    
  }, [courseId]);

  
  
 console.log(enrolledStudents.length, courseName );

  

  const renderEnrolledStudents = () => {
    return (
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.header}>Name</th>
            <th className={styles.header}>Email</th>
          </tr>
        </thead>
        <tbody>
          {enrolledStudents.map((student, index) => (
            <tr key={index} className={styles.row}>
              <td className={styles.cell}>{student.name}</td>
              <td className={styles.cell}>{student.email}</td>

            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {enrolledStudents.length > 0 && (
        <div className={styles.container}>{renderEnrolledStudents()}</div>
      )}

      {/* <button onClick={generateReport} className="btn btn-primary">
        Generate Report
      </button> */}
    </div>
    
  );
}
