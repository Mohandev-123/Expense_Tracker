import React, {useState, useEffect} from 'react'
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {useNavigate} from 'react-router-dom'

const ManageExpense = () => {

    const navigate = useNavigate()
    const userId = localStorage.getItem('userId')
          useEffect(()=>{
            if(!userId) {
              navigate('/login')
            }
          },[])

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
                <tr>
                    <td>#</td>
                    <td>12/12/2026</td>
                    <td>books</td>
                    <td>500</td>
                    <td>Action</td>
                </tr>
                <tr>
                    <td>#</td>
                    <td>12/12/2026</td>
                    <td>books</td>
                    <td>500</td>
                    <td>Action</td>
                </tr>
                <tr>
                    <td colSpan="5" className='text-center text-muted'><i className='fas fa-exclamation-circle me-2'></i>No expenses found</td>
                </tr>
            </tbody>
        </table>
      </div>
    </div>
  )
}

export default ManageExpense