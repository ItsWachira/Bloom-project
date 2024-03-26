import React, { useState, useEffect } from "react";
import { getCourses, getUsers } from "../../services/api";
import Chart from "chart.js/auto";

export default function Account() {
  const [loading, setLoading] = useState(false);
  const [courseData, setCourseData] = useState([]);
  


  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const { data } = await getCourses();
        setCourseData(data?.data);
      } catch (err) {
        console.log("some error ", err);
        toast.error(err?.response?.data?.msg);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     try {
  //       const { data: courses } = await getUsers();
  //       // setCourseData(courses);

  //       const { data } = await getUsers();
  //      setCourseData(data?.data);
        
  
  //     // console.log(courseNames, enrollments)
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();

  //   console.log(courseData)
  //   // const courseNames = courseData.map(course => course.data.name);
    

  //   // const enrollments = courseData.map(course => course.data.students.length);
  // }, []);

  // useEffect(() => {
  //   if (courseData.length > 0) {
  //     renderChart();
  //   }
  // }, [courseData]);

  // const renderChart = () => {
  //   const ctx = document.getElementById("courseChart");
  //   const courseNames = courseData.map(course => course.data.name);
  //   const enrollments = courseData.map(course => course.data.students.length);

  //   console.log(courseNames, enrollments)

  //   new Chart(ctx, {
  //     type: "bar",
  //     data: {
  //       labels: courseNames,
  //       datasets: [{
  //         label: "Total Users Enrolled",
  //         data: enrollments,
  //         backgroundColor: "rgba(54, 162, 235, 0.6)",
  //         borderColor: "rgba(54, 162, 235, 1)",
  //         borderWidth: 1
  //       }]
  //     },
  //     options: {
  //       responsive: true,
  //       plugins: {
  //         title: {
  //           display: true,
  //           text: "Total Users Enrolled in Each Course"
  //         }
  //       },
  //       scales: {
  //         y: {
  //           beginAtZero: true,
  //           title: {
  //             display: true,
  //             text: "Number of Users"
  //           }
  //         },
  //         x: {
  //           title: {
  //             display: true,
  //             text: "Course"
  //           }
  //         }
  //       }
  //     }
  //   });
  // };

 return (
   <div>
      {loading && <p>Loading...</p>}
      {/* <canvas id="courseChart" width="400" height="200"></canvas> */}
    </div>
   );
 }
