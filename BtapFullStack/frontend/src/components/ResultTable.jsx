import React from 'react'
import './ResultTable.css'

function ResultTable({ keyword = '', student, onAdded }) {
  const [students, setStudents] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [editing, setEditing] = React.useState(null)
  const [sortAsc, setSortAsc] = React.useState(true)

  React.useEffect(() => {
    let isMounted = true

    const fetchStudents = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/students')
        const data = await res.json()
        if (!isMounted) return
        setStudents(data)
        setLoading(false)
      } catch (error) {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchStudents()

    return () => {
      isMounted = false
    }
  }, [])

  React.useEffect(() => {
    if (!student) return
    setStudents((prev) => [...prev, { ...student, id: prev.length + 1 }])
    onAdded && onAdded()
  }, [student, onAdded])

  const filteredStudents = students.filter((s) => {
    const kw = String(keyword || '').toLowerCase()
    return (
      s.name.toLowerCase().includes(kw) ||
      (s.class && s.class.toLowerCase().includes(kw))
    )
  })

  // Sắp xếp danh sách sau khi lọc
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    const nameA = a.name.toLowerCase()
    const nameB = b.name.toLowerCase()
    if (nameA < nameB) return sortAsc ? -1 : 1
    if (nameA > nameB) return sortAsc ? 1 : -1
    return 0
  })

  function editStudent(s) {
    setEditing({ ...s })
  }

  function handleEditChange(field, value) {
    if (!editing) return
    setEditing({ ...editing, [field]: value })
  }

  function saveStudent() {
    if (!editing) return
    const id = editing._id
    fetch(`http://localhost:5000/api/students/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editing)
    })
      .then((res) => res.json())
      .then((data) => {
        setStudents((prev) => prev.map((s) => (s._id === editing._id ? data : s)))
        setEditing(null)
      })
      .catch((err) => console.error('Error updating student:', err))
  }

  function cancelEdit() {
    setEditing(null)
  }

  function removeStudent(id) {
    fetch(`http://localhost:5000/api/students/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        setStudents((prev) => prev.filter((s) => s._id !== id))
      })
      .catch((err) => console.error('Error deleting student:', err))
  }

  if (loading) return <div>Đang tải dữ liệu...</div>

  return (
    <div>
      {students.length === 0 ? (
        <div style={{ padding: '20px', textAlign: 'center', fontSize: '18px' }}>
          Không có học sinh nào trong hệ thống.
        </div>
      ) : (
        <>
          <div style={{ marginBottom: '10px' }}>
            <button 
              className="btn btn-primary" 
              onClick={() => setSortAsc(prev => !prev)}
              style={{ marginLeft: '0' }}
            >
              Sắp xếp theo tên: {sortAsc ? 'A → Z' : 'Z → A'}
            </button>
          </div>
          <table className="user-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên</th>
            <th>Tuổi</th>
            <th>Lớp</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {sortedStudents.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>
                Không tìm thấy học sinh nào với từ khóa "{keyword}".
              </td>
            </tr>
          ) : (
            sortedStudents.map((s, index) => (
              <tr key={s._id}>
                <td>{index + 1}</td>
                <td>{s.name}</td>
                <td>{s.age}</td>
                <td>{s.class}</td>
                <td>
                  <div className="actions">
                    <button className="btn btn-edit" onClick={() => editStudent(s)}>Sửa</button>
                    <button className="btn btn-delete" onClick={() => removeStudent(s._id)}>Xóa</button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
        </>
      )}
      

      {editing && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4>Sửa học sinh</h4>
            <div className="form-group">
              <label htmlFor="name">Tên</label>
              <input
                id="name"
                type="text"
                value={editing.name}
                onChange={(e) => handleEditChange('name', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="age">Tuổi</label>
              <input
                id="age"
                type="number"
                value={editing.age}
                onChange={(e) => handleEditChange('age', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="class">Lớp</label>
              <input
                id="class"
                type="text"
                value={editing.class}
                onChange={(e) => handleEditChange('class', e.target.value)}
              />
            </div>
            <div className="form-actions">
              <button className="btn btn-edit" onClick={saveStudent}>Lưu</button>
              <button className="btn btn-delete" onClick={cancelEdit}>Hủy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ResultTable