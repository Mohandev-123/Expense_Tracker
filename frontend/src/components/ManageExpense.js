import React, { useState, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'

const ManageExpense = () => {
  const navigate = useNavigate()
  const [expenses, setExpenses] = useState([])
  const userId = localStorage.getItem('userId')

  useEffect(() => {
    if (!userId) {
      navigate('/login')
    }
    fetchExpenses(userId)
  }, [])

  const [editExpense, setEditExpense] = useState(null)

  const handleEdit = (expense) => {
    setEditExpense(expense)
  }

  const handleChange = (e) => {
        setEditExpense({...editExpense, [e.target.name]: e.target.value})
      }

  const fetchExpenses = async (userId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/manage_expense/${userId}/`)
      const data = await response.json()
      setExpenses(data)
    } catch (error) {
      console.error("Error fetching expenses: ", error)
    }
  }

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/update_expense/${editExpense.id}/`)
      const data = await response.json()
      setExpenses(data)
    } catch (error) {
      console.error("Error fetching expenses: ", error)
    }
  }

  return (
    <div className='container mt-5'>
      <div className='text-center mb-4'>
        <h2><i className='fas fa-tasks me-2'></i>ManageExpense</h2>
        <p className='text-muted'>View, edit, or delete your expenses</p>
      </div>
      <div>
        <table className='table table-striped table-bordered'>
          <thead className='table-dark text-center'>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Item</th>
              <th>Cost (₹)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {expenses.length > 0 ? (
              expenses.map((exp, index) => (
                <tr key={exp.id}>
                  <td>{index + 1}</td>
                  <td>{exp.ExpenseDate}</td>
                  <td>{exp.ExpenseItem}</td>
                  <td>{exp.ExpenseCost}</td>
                  <td>
                    <button className='btn btn-sm btn-info me-2' onClick={()=>handleEdit(exp)}><i className='fas fa-edit'></i></button>
                    <button className='btn btn-sm btn-danger'><i className='fas fa-trash-alt'></i></button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className='text-center text-muted'><i className='fas fa-exclamation-circle me-2'></i>No expenses found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
{editExpense && (  
      <div className="modal show d-block">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title"><i className='fas fa-pen me-2'></i>Edit Expense</h5>
              <button type="button" className="btn-close" onClick={()=>setEditExpense(null)}></button>
            </div>

            <div className="modal-body">
              <div className='mb-3'>
                <label className='form-label text-start d-block'>Expense Date</label>
                <div className='input-group'>
                  <span className='input-group-text'>
                    <i className='fas fa-calendar-alt'></i>
                  </span>
                  <input type='date' name='ExpenseDate' className='form-control' value={editExpense.ExpenseDate} required onChange={handleChange} />
                </div>
              </div>

              <div className='mb-3'>
                <label className='form-label text-start d-block'>ExpenseItem</label>
                <div className='input-group'>
                  <span className='input-group-text'>
                    <i className='fas fa-shopping-cart'></i>
                  </span>
                  <input type='text' name='ExpenseItem' className='form-control' required onChange={handleChange} value={editExpense.ExpenseItem} placeholder='Enter Expense Item (e.g. Groceries, Petrol)' />
                </div>
              </div>

              <div className='mb-3'>
                <label className='form-label text-start d-block'>Expense Cost (₹)</label>
                <div className='input-group'>
                  <span className='input-group-text'>
                    <i className='fas fa-rupee-sign'></i>
                  </span>
                  <input type='number' name='ExpenseCost' className='form-control' required onChange={handleChange} value={editExpense.ExpenseCost} placeholder='Enter amount spent' />
                </div>
              </div>

            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary">Save changes</button>
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={()=>setEditExpense(null)}>Close</button>
            </div>
          </div>
        </div>
      </div>
)}
      <ToastContainer />
    </div>
  )
}

export default ManageExpense