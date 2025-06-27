const { ObjectId } = require('mongodb');
const { getDB } = require('./db');

module.exports = {
  Query: {
    getAllEmployees: async () => {
      const db = getDB();
      const employees = await db
        .collection('employees')
        .find({})
        .project({ name: 1, position: 1 })
        .toArray();

      return employees.map(emp => ({
        id: emp._id.toString(),
        name: emp.name,
        position: emp.position,
      }));
    },

    getEmployeeDetails: async (_, { id }) => {
      const db = getDB();
      try {
        const emp = await db.collection('employees').findOne({ _id: new ObjectId(id) });
        if (!emp) return null;

        return {
          id: emp._id.toString(),
          name: emp.name,
          position: emp.position,
          department: emp.department,
          salary: emp.salary,
        };
      } catch (err) {
        console.error("❌ Invalid ID format");
        return null;
      }
    },

    getEmployeesByDepartment: async (_, { department }) => {
      const db = getDB();
      const employees = await db.collection('employees').find({ department }).toArray();

      return employees.map(emp => ({
        id: emp._id.toString(),
        name: emp.name,
        position: emp.position,
        department: emp.department,
        salary: emp.salary,
      }));
    },
  },

  Mutation: {
    addEmployee: async (_, { name, position, department, salary }) => {
      const db = getDB();
      const newEmp = { name, position, department, salary };
      const result = await db.collection('employees').insertOne(newEmp);

      return {
        id: result.insertedId.toString(),
        ...newEmp
      };
    },
deleteEmployee: async (_, { id }) => {
  const db = getDB();
  try {
    const result = await db.collection('employees').deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount === 1;
  } catch (err) {
    console.error("❌ Failed to delete employee", err);
    return false;
  }
}
  },
};
