import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";


const LoginForm = () => {

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const [error, setError] = useState("");

    const [formData, setFormData] = useState({
    email: "",
    password: "",
    });

    const handleChange = (e)=>{
        const {name, value} = e.target

        setFormData((prev)=>({
            ...prev,
            [name]: value
        }))
    }
    const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setError("");

    await login(formData);

    navigate("/dashboard");
  } catch (error) {
    setError(
      error?.response?.data?.detail ||
      "Login failed"
    );
  }
};


  return (
    <div className="w-full max-w-md rounded-lg bg-white p-5 shadow-lg sm:p-8">
      <div className="mb-6 sm:mb-8">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Sign In</h2>
        <p className="mt-2 text-sm text-gray-500">
          Enter your credentials to access the system
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Email
          </label>

          <input
            id="email"
            type="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
            placeholder="Enter your email"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Password
          </label>

          <input
            id="password"
            type="password"
            name="password"
            onChange={handleChange}
            value={formData.password}
            placeholder="Enter your password"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
          />
        </div>
        {error && (
          <p className="text-sm text-red-500">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full rounded-lg bg-slate-900 px-4 py-3 font-medium text-white transition hover:bg-slate-800"
          
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
