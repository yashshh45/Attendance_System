import React, { useState } from 'react';
import './App.css';

function App() {
  const [daysOfWeek, setDaysOfWeek] = useState(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']);

  const [students, setStudents] = useState([
    { id: 1, name: 'John Doe', attendance: [false, true, false, true, true] },
    { id: 2, name: 'Jane Smith', attendance: [true, false, true, false, true] },
    { id: 3, name: 'Alex Johnson', attendance: [true, true, true, true, false] },
    // Add more students here
  ]);

  const [newStudentName, setNewStudentName] = useState('');
  const [editingStudent, setEditingStudent] = useState(null);

  const toggleAttendance = (studentId, dayIndex) => {
    setStudents(prevStudents =>
      prevStudents.map(student =>
        student.id === studentId
          ? {
              ...student,
              attendance: student.attendance.map(
                (attendance, index) => (index === dayIndex ? !attendance : attendance)
              ),
            }
          : student
      )
    );
  };

  const addStudent = () => {
    if (newStudentName.trim() !== '') {
      setStudents(prevStudents => [
        ...prevStudents,
        { id: Date.now(), name: newStudentName, attendance: new Array(daysOfWeek.length).fill(false) },
      ]);
      setNewStudentName('');
    }
  };

  const editStudentName = (studentId, newName) => {
    setStudents(prevStudents =>
      prevStudents.map(student =>
        student.id === studentId ? { ...student, name: newName } : student
      )
    );
    setEditingStudent(null);
  };

  return (
    <div className="attendance-app">
      <h1>Attendance App</h1>
      <div className="attendance-record">
        <h2>Timetable Attendance</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              {daysOfWeek.map(day => (
                <th key={day}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.id}>
                <td>
                  {editingStudent === student.id ? (
                    <input
                      type="text"
                      value={student.name}
                      onChange={e => editStudentName(student.id, e.target.value)}
                      onBlur={() => setEditingStudent(null)}
                      autoFocus
                    />
                  ) : (
                    <>
                      {student.name}
                      <button className="edit-button" onClick={() => setEditingStudent(student.id)}>
                        Edit
                      </button>
                    </>
                  )}
                </td>
                {student.attendance.map((attended, dayIndex) => (
                  <td
                    key={dayIndex}
                    className={`attendance-cell ${attended ? 'present' : 'absent'}`}
                    onClick={() => toggleAttendance(student.id, dayIndex)}
                  >
                    {attended ? 'Present' : 'Absent'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="add-student">
        <input
          type="text"
          placeholder="Enter student name"
          value={newStudentName}
          onChange={e => setNewStudentName(e.target.value)}
        />
        <button onClick={addStudent}>Add Student</button>
      </div>
    </div>
  );
}

export default App;




