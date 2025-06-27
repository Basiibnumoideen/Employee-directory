'use client';

import { useParams, useRouter } from 'next/navigation';
import { gql, useQuery, useMutation } from '@apollo/client';

// ✅ 1. Get full details of a specific employee
const GET_EMPLOYEE = gql`
  query GetEmployeeDetails($id: ID!) {
    getEmployeeDetails(id: $id) {
      id
      name
      position
      department
      salary
    }
  }
`;

// ✅ 2. Get all employees (used to refetch after delete)
const GET_ALL_EMPLOYEES = gql`
  query GetAllEmployees {
    getAllEmployees {
      id
      name
      position
    }
  }
`;

// ✅ 3. Delete an employee by ID
const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($id: ID!) {
    deleteEmployee(id: $id)
  }
`;

export default function EmployeeDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  // Fetch individual employee details
  const { loading, error, data } = useQuery(GET_EMPLOYEE, {
    variables: { id },
  });

  // Delete mutation
  const [deleteEmployee, { loading: deleting }] = useMutation(DELETE_EMPLOYEE, {
    variables: { id },
    refetchQueries: [{ query: GET_ALL_EMPLOYEES }],
    onCompleted: () => {
      alert('Employee deleted successfully.');
      router.push('/');
    },
    onError: (err) => {
      alert('Error deleting employee: ' + err.message);
    },
  });

  if (loading)
    return (
      <p className="min-h-screen flex items-center justify-center text-gray-600">
        Loading...
      </p>
    );
  if (error)
    return (
      <p className="min-h-screen flex items-center justify-center text-red-500">
        Error: {error.message}
      </p>
    );

  const emp = data.getEmployeeDetails;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-gray-800 shadow-md rounded-xl p-6 space-y-6">
        <h1 className="text-2xl font-semibold text-center text-gray-100">
          Employee Details
        </h1>

        <div className="space-y-2 text-gray-300 text-base">
          <p>
            <span className="font-medium">Name:</span> {emp.name}
          </p>
          <p>
            <span className="font-medium">Position:</span> {emp.position}
          </p>
          <p>
            <span className="font-medium">Department:</span> {emp.department}
          </p>
          <p>
            <span className="font-medium">Salary:</span> ₹{emp.salary}
          </p>
        </div>

        <div className="flex justify-between gap-4 pt-4">
          <button
            onClick={() => router.push('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-full transition w-full"
          >
            ← Back
          </button>

          <button
            onClick={() => {
              if (confirm('Are you sure you want to delete this employee?')) {
                deleteEmployee();
              }
            }}
            disabled={deleting}
            className="bg-red-600 hover:bg-red-700 text-white font-medium px-4 py-2 rounded-full transition w-full"
          >
            {deleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}
