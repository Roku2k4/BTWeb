import React from 'react'
import './AddStudent.css'

function AddStudent({ onAdd }) {
  const [adding, setAdding] = React.useState(false)
  const [student, setStudent] = React.useState({
    name: '',
    age: '',
    class: ''
  })

  function handleChange(e) {
    const { id, value } = e.target
    setStudent({ ...student, [id]: value })
  }

  async function handleAdd() {
    if (student.name.trim() === '' || student.age.trim() === '' || student.class.trim() === '') {
      alert('Vui lòng nhập đầy đủ thông tin!')
      return
    }

    try {
      const res = await fetch('http://localhost:5000/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: student.name,
          age: parseInt(student.age),
          class: student.class
        })
      })

      if (!res.ok) {
        throw new Error('Không thể thêm học sinh')
      }

      const newStudent = await res.json()
      onAdd && onAdd(newStudent)
      
      setStudent({
        name: '',
        age: '',
        class: ''
      })
      setAdding(false)
      alert('Thêm học sinh thành công!')
    } catch (error) {
      console.error('Error adding student:', error)
      alert('Lỗi khi thêm học sinh: ' + error.message)
    }
  }

  return (
    <div>
      <button className="btn btn-primary" onClick={() => setAdding(true)}>Thêm</button>
      {adding && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>Thêm học sinh</h4>
            <div className="form-group">
              <label htmlFor="name">Họ và tên</label>
              <input id="name" type="text" value={student.name} onChange={handleChange} placeholder='Nhập tên'/>
            </div>
            <div className="form-group">
              <label htmlFor="age">Tuổi</label>
              <input id="age" type="number" value={student.age} onChange={handleChange} placeholder='Nhập tuổi' />
            </div>
            <div className="form-group">
              <label htmlFor="class">Lớp</label>
              <input id="class" type="text" value={student.class} onChange={handleChange} placeholder='Nhập lớp' />
            </div>
            <div className="form-actions">
              <button className="btn btn-primary" onClick={handleAdd}>Thêm</button>
              <button className="btn btn-secondary" onClick={() => setAdding(false)}>Hủy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AddStudent