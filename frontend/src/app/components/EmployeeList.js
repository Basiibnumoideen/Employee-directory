"use client";

import { gql, useQuery, useLazyQuery } from "@apollo/client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const GET_ALL_EMPLOYEES = gql`
  query GetAllEmployees {
    getAllEmployees {
      id
      name
      position
    }
  }
`;

const GET_BY_DEPT = gql`
  query ($department: String!) {
    getEmployeesByDepartment(department: $department) {
      id
      name
      position
    }
  }
`;

const departments = ["HR", "Engineering", "Marketing"];

export default function EmployeeList() {
  const router = useRouter();
  const [selectedDept, setSelectedDept] = useState("");
  const { loading, error, data } = useQuery(GET_ALL_EMPLOYEES);
  const [getByDept, { data: deptData }] = useLazyQuery(GET_BY_DEPT);

  const handleFilterChange = (e) => {
    const dept = e.target.value;
    setSelectedDept(dept);
    if (dept) {
      getByDept({ variables: { department: dept } });
    }
  };

  const employees = selectedDept
    ? deptData?.getEmployeesByDepartment
    : data?.getAllEmployees;

  if (loading) {
    return (
      <p className="min-h-screen flex items-center justify-center text-gray-400 text-lg">
        Loading...
      </p>
    );
  }

  if (error) {
    return (
      <p className="min-h-screen flex items-center justify-center text-red-400 text-lg">
        Error: {error.message}
      </p>
    );
  }

  return (
    <div className="min-h-screen flex items-start justify-center px-4 ">
      <div className="w-full max-w-5xl p-8 space-y-6 bg-gray-800 text-gray-100 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-100">
          Employee Directory
        </h1>
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <select
            value={selectedDept}
            onChange={handleFilterChange}
            className="bg-gray-700 border border-gray-600 text-gray-100 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Departments</option>
            {departments.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-full shadow transition"
            onClick={() => router.push("/add")}
          >
            + Add New Employee
          </button>
        </div>

        <div className="overflow-x-auto border border-gray-700 rounded-lg shadow-sm">
          <table className="min-w-full divide-y divide-gray-700 text-sm">
            <thead className="bg-gray-700 text-gray-300">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">Name</th>
                <th className="px-6 py-3 text-left font-semibold">Position</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {employees?.map((emp) => (
                <tr
                  key={emp.id}
                  className="group hover:bg-gray-600 transition cursor-pointer"
                  onClick={() => router.push(`/employee/${emp.id}`)}
                >
                  <td className="px-6 py-4 group-hover:text-blue-400 transition">
                    {emp.name}
                  </td>
                  <td className="px-6 py-4 group-hover:text-blue-400 transition">
                    {emp.position}
                  </td>
                </tr>
              ))}
              {employees?.length === 0 && (
                <tr>
                  <td colSpan={2} className="text-center py-6 text-gray-400">
                    No employees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
