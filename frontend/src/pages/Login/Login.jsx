import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import LoginForm from "../../components/auth/LoginForm";

const Login = () => {

const { isAuthenticated, loading } =
  useContext(AuthContext);

  if (loading) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      Loading...
    </div>
  );
}
if (isAuthenticated) {
  return <Navigate to="/dashboard" replace />;
}

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 md:flex-row">
      <div className="flex w-full items-center justify-center bg-gray-900 px-6 py-10 text-white md:min-h-screen md:w-3/5 md:px-12">
        <div className="max-w-lg">
          <h1 className="mb-4 text-3xl font-bold md:mb-6 md:text-5xl">
            Incident Management System
          </h1>

          <p className="text-base text-gray-300 md:text-lg">
            Enterprise-grade platform for tracking incidents,
            managing escalations, and monitoring operational risks.
          </p>
        </div>
      </div>

      <div className="flex w-full flex-1 items-center justify-center px-4 py-8 md:w-2/5 md:px-8">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
