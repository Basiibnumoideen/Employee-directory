// seed.js
const { connectDB, getDB } = require('./db');

async function seedData() {
  await connectDB();
  const db = getDB();

  const departments = [
    { name: 'Engineering', floor: 2 },
    { name: 'HR', floor: 1 },
    { name: 'Marketing', floor: 3 },
  ];

  const employees = [
    { name: 'Alice', position: 'Frontend Developer', department: 'Engineering', salary: 60000 },
    { name: 'Bob', position: 'Backend Developer', department: 'Engineering', salary: 65000 },
    { name: 'Charlie', position: 'HR Manager', department: 'HR', salary: 50000 },
    { name: 'Daisy', position: 'Recruiter', department: 'HR', salary: 45000 },
    { name: 'Eve', position: 'SEO Specialist', department: 'Marketing', salary: 55000 },
  ];

  await db.collection('departments').deleteMany({});
  await db.collection('employees').deleteMany({});

  await db.collection('departments').insertMany(departments);
  await db.collection('employees').insertMany(employees);

  console.log("✅ Seed data inserted");
  process.exit();
}

seedData();
