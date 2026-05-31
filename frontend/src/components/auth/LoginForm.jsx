import { useState } from "react";
const LoginForm = () => {

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
    const handleSubmit = (e) => {
  e.preventDefault();

  console.log(formData);
};


  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Sign In</h2>
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