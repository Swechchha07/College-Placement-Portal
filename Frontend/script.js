cument.getElementById('studentForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const student = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    branch: document.getElementById('branch').value,
    cgpa: parseFloat(document.getElementById('cgpa').value)
  };

  await fetch('http://localhost:5000/api/students', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(student)
  });

  loadStudents();
  this.reset();
});

async function loadStudents() {
  const res = await fetch('http://localhost:5000/api/students');
  const students = await res.json();
  const list = document.getElementById('studentList');
  list.innerHTML = '';
  students.forEach(s => {
    const li = document.createElement('li');
    li.textContent = `${s.name} (${s.email}) - ${s.branch}, CGPA: ${s.cgpa}`;
    list.appendChild(li);
  });
}

loadStudents();
