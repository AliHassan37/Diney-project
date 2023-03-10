import { Suspense } from "react";
import CircleLoader from "components/atoms/CircleLoader";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "pages/Home";

export default function AppRoutes() {
  return (
    <div style={{ position: "relative" }}>
      <Suspense fallback={<CircleLoader />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />

          {/* Redirect to root or Not Found */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </div>
  );
}
