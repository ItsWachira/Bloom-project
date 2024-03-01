import React from "react";
import Tabs from "components/profile/Tabs;
import Sidebar from "components/dashboard/Sidebar";
import { ProtectedRoute } from "utils/ProtectedRoute";

export default function Profle() {
  return (
    <>
      <ProtectedRoute>
        <div className="grid grid-cols-12 gap-4 pt-4 pb-10 my-16">
          <Sidebar />
          <Tabs />
        </div>
      </ProtectedRoute>
    </>
  );
  }