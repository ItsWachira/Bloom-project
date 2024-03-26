import React, { useState, useEffect, useRef } from "react";
import { getCourses, getUsers } from "../../services/api";
import Chart from "chart.js/auto";

export default function Account() {
  const [loading, setLoading] = useState(false);
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const chartRef = useRef(null); // Ref for storing the chart instance

  useEffect(() => {
    const fetchCourseDetails = async () => {
      setLoading(true);
      try {
        const { data: courseData } = await getCourses();
        const { data: allUsersData } = await getUsers();

        const courseCounts = courseData.data.map(course => {
          const total = course.students.length;
          return { name: course.name, count: total };
        });

        setCourses(courseCounts);
      } catch (error) {
        console.error("Error fetching course details:", error);
        // Handle error, e.g., toast.error("Failed to fetch course details");
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, []);

  useEffect(() => {
    renderChart();
  }, [courses]);

  const renderChart = () => {
    const ctx = document.getElementById("courseChart");
    if (!ctx || !courses.length) return;

    // Ensure existing chart instance is properly destroyed
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const courseNames = courses.map(course => course.name);
    const enrollments = courses.map(course => course.count);

    chartRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: courseNames,
        datasets: [
          {
            label: "Total Users Enrolled",
            data: enrollments,
            backgroundColor: "rgba(54, 162, 235, 0.6)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Total Users Enrolled in Each Course"
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            suggestedMax: 10, // Adjust maximum value for y-axis
            stepSize: 1, // Set step size for y-axis
            title: {
              display: true,
              text: "Number of Users"
            }
          },
          x: {
            title: {
              display: true,
              text: "Course"
            }
          }
        }
      }
    });
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      <canvas id="courseChart"></canvas>
    </div>
  );
}
