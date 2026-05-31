import LoginForm from "../../components/auth/LoginForm";

const Login = () => {
  return (
    <div className="flex min-h-screen">
      <div className="flex w-3/5 items-center justify-center bg-gray-900 px-12 text-white">
        <div className="max-w-lg">
          <h1 className="mb-6 text-5xl font-bold">
            Incident Management System
          </h1>

          <p className="text-lg text-gray-300">
            Enterprise-grade platform for tracking incidents,
            managing escalations, and monitoring operational risks.
          </p>
        </div>
      </div>

      <div className="flex w-2/5 items-center justify-center bg-gray-50 px-8">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;