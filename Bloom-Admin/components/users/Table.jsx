import React from "react";

export default function Table({ data, handleDelete, loading }) {
  const generateReport = () => {
    const currentDate = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });

    const printContent = `
      <html>
        <head>
          <title>Bloom Learning Platform Report</title>
          <style>
            body {
              font-family: Arial, sans-serif;
            }
            .print-header {
              text-align: center;
              margin-bottom: 20px;
            }
            .print-header h1 {
              color: #007bff;
              margin: 0;
            }
            .print-vision {
              margin-bottom: 10px;
              text-align: center;
            }
            .print-date {
              margin-bottom: 10px;
              text-align: right;
            }
            .print-data {
              margin-top: 30px;
            }
            .print-data table {
              width: 100%;
              border-collapse: collapse;
            }
            .print-data th, .print-data td {
              border: 1px solid #ddd;
              padding: 8px;
              text-align: left;
            }
          </style>
        </head>
        <body>
          <div class="print-header">
            <h1>Bloom Learning Platform Report</h1>
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
                ${data.map(user => `
                  <tr>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                  </tr>
                `).join('')}
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

  const rows = data.map((i, j) => {
    return (
      <tr key={j}>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
        <td>
          <div className="flex items-center space-x-3">
            <div className="avatar">
              <div className="w-12 h-12 mask mask-squircle">
                <img src={i?.avatar || "/avatar.svg"} alt="user avatar" />
              </div>
            </div>
            <div>
              <div className="font-bold">{i?.name}</div>
              <div className="flex flex-col text-sm opacity-70">
                <p className="">{i?.email}</p>
              </div>
            </div>
          </div>
        </td>
        <th>
          <button
            onClick={() => handleDelete(i._id)}
            className="btn btn-error btn-xs"
          >
            delete
          </button>
        </th>
      </tr>
    );
  });

  return (
    <>
      <div className="w-full overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
      <button onClick={generateReport} className="btn btn-primary">
        Generate Report
      </button>
    </>
  );
}
