import React from "react";
import Profile from "components/profile";
import Sidebar from "components/dashboard/Sidebar";
import { ProtectedRoute } from "utils/ProtectedRoute";




export default function Profle() {

  
  return (
  
      <ProtectedRoute>
        <div className="grid grid-cols-12 gap-4 pt-4 pb-10 my-16">
          <Sidebar />
          <Profile />
        </div>
      </ProtectedRoute>
  );
  }