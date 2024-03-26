import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getCourse, getUsers } from "../../services/api";
import toast from "react-hot-toast";
import styles from "./Enrolled.module.css";

export default function Enrolled() {
  const router = useRouter();
  const { id: courseId } = router.query;

  const [loading, setLoading] = useState(false);
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const [courseName, setCourseName] = useState("");

  useEffect(() => {
    const fetchCourseDetails = async () => {
      if (!courseId) return;

      setLoading(true);
      try {
        const { data: courseData } = await getCourse(courseId);
        setCourseName(courseData.name);

        const { data: allUsersData } = await getUsers();
        const enrolledStudentIds = courseData.students || [];

        const enrolledStudentsData = allUsersData.data.filter((user) =>
          enrolledStudentIds.includes(user._id)
        );
        setEnrolledStudents(enrolledStudentsData);

        console.log(enrolledStudents)
      } catch (error) {
        console.error("Error fetching course details:", error);
        toast.error("Failed to fetch course details");
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  const generateReport = () => {
    const currentDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const printContent = `
      <html>
        <head>
          <title>${courseName} Enrollment Report</title>
          <style>
            /* Add your custom CSS styles here */
            ${styles}
          </style>
        </head>
        <body>
          <div class="print-header">
            <h1>Bloom Learning Platform Report</h1>
            <h1>${courseName} Enrollment Report</h1>
            <p class="print-vision">Vision: Learning to build your future</p>
          </div>
          <div class="print-date">
            <p>Generated on: ${currentDate}</p>
          </div>
          <div class="print-data">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                ${enrolledStudents
                  .map(
                    (student) => `
                      <tr>
                        <td>${student.name}</td>
                        <td>${student.email}</td>
                      </tr>
                    `
                  )
                  .join("")}
              </tbody>
            </table>
          </div>
        </body>
      </html>
    `;

    const printWindow = window.open("", "_blank");
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div>
      <div className={styles.container}>
        {loading && <p>Loading...</p>}
        {enrolledStudents.length > 0 && (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {enrolledStudents.map((student, index) => (
                <tr key={index}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <button onClick={generateReport} className="btn btn-primary">
        Generate Report
      </button>
    </div>
  );
}

// const generateReport = () => {
  //   const currentDate = new Date().toLocaleDateString();

  //   const printContent = `
  //     <html>
  //       <head>
  //         <title>${courseName} Enrollment Report</title>
  //         <style>
  //           body {
  //             font-family: Arial, sans-serif;
  //             background-color: #f0f8ff;
  //             color: #333;
  //           }

  //           .print-header {
  //             text-align: center;
  //             background-color: #fff;
  //             padding: 20px;
  //             border: 1px solid #ccc;
  //             border-radius: 5px;
  //             margin-bottom: 20px;
  //           }

  //           .print-vision {
  //             font-style: italic;
  //           }

  //           .print-date {
  //             text-align: right;
  //             margin-bottom: 20px;
  //           }

  //           .print-data {
  //             background-color: #fff;
  //             padding: 20px;
  //             border: 1px solid #ccc;
  //             border-radius: 5px;
  //           }

  //           table {
  //             width: 100%;
  //             border-collapse: collapse;
  //           }

  //           th, td {
  //             padding: 10px;
  //             border: 1px solid #ccc;
  //           }

  //           th {
  //             background-color: #e6f2ff;
  //           }

  //           tr:nth-child(even) {
  //             background-color: #f2f2f2;
  //           }
  //         </style>
  //       </head>
  //       <body>
  //         <div class="print-header">
  //           <h1>Bloom Learning Platform Report</h1>
  //           <h1>${courseName} Enrollment Report</h1>
  //           <p class="print-vision">Vision: Learning to build your future</p>
  //         </div>
  //         <div class="print-date">
  //           <p>Generated on: ${currentDate}</p>
  //         </div>
  //         <div class="print-data">
  //           <table>
  //             <thead>
  //               <tr>
  //                 <th>Name</th>
  //                 <th>Email</th>
  //               </tr>
  //             </thead>
  //             <tbody>
  //               ${enrolledStudents
  //                 .map(
  //                   (student) => `
  //                     <tr>
  //                       <td>${student.name}</td>
  //                       <td>${student.email}</td>
  //                     </tr>
  //                   `
  //                 )
  //                 .join("")}
  //             </tbody>
  //           </table>
  //         </div>
  //       </body>
  //     </html>
  //   `;

  //   const printWindow = window.open("", "_blank");
  //   printWindow.document.write(printContent);
  //   printWindow.document.close();
  //   printWindow.print();
  // };
