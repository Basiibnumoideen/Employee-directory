'use client';

import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const ADD_EMPLOYEE = gql`
  mutation AddEmployee($name: String!, $position: String!, $department: String!, $salary: Float!) {
    addEmployee(name: $name, position: $position, department: $department, salary: $salary) {
      id
      name
    }
  }
`;

const GET_ALL_EMPLOYEES = gql`
  query GetAllEmployees {
    getAllEmployees {
      id
      name
      position
    }
  }
`;

export default function AddEmployeePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    position: '',
    department: '',
    salary: '',
  });

  const [addEmployee, { loading, error }] = useMutation(ADD_EMPLOYEE, {
    refetchQueries: [{ query: GET_ALL_EMPLOYEES }],
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.position || !form.department || !form.salary) {
      alert("All fields are required.");
      return;
    }

    try {
      await addEmployee({
        variables: {
          name: form.name,
          position: form.position,
          department: form.department,
          salary: parseFloat(form.salary),
        },
      });

      router.push('/');
    } catch (err) {
      console.error("❌ GraphQL Error:");
      console.dir(err, { depth: null });
    }
  };

  return (
    <div className="flex justify-center px-4 pt-30  ">
    <div className="w-full max-w-md bg-gray-800 text-gray-100 rounded-2xl shadow-lg p-6 sm:p-8 space-y-6">

        <h1 className="text-3xl font-bold text-center">Add New Employee</h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block mb-1 text-gray-300">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white border border-gray-600 p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-300">Position</label>
            <input
              name="position"
              value={form.position}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white border border-gray-600 p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-300">Department</label>
            <input
              name="department"
              value={form.department}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white border border-gray-600 p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-300">Salary</label>
            <input
              name="salary"
              type="number"
              value={form.salary}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white border border-gray-600 p-2 rounded"
              required
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-full transition"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
            <button
              type="button"
              onClick={() => router.push('/')}
              className="border border-gray-500 text-gray-300 px-4 py-2 rounded-full"
            >
              Cancel
            </button>
          </div>

          {error && <p className="text-red-500 pt-2">❌ {error.message}</p>}
        </form>
      </div>
    </div>
  );
}
