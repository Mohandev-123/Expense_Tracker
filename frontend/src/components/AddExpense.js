import React, {useState, useEffect} from 'react'
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {useNavigate} from 'react-router-dom'

const AddExpense = () => {

    const navigate = useNavigate()
    
      const [formData, setformData] = useState({
        ExpenseDate : '',
        ExpenseItem : '',
        ExpenseCost : '',
      })

      const userId = localStorage.getItem('userId')
      useEffect(()=>{
        if(!userId) {
          navigate('/login')
        }
      },[])
    
      const handleChange = (e) => {
        setformData({...formData, [e.target.name]: e.target.value})
      }
    
      const handleSubmit = async(e) => {
        e.preventDefault()
        try {
          const response = await fetch("http://127.0.0.1:8000/api/add_expense/", {
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify({
              ...formData,
              UserId:userId
            })
          })
          const data = await response.json()
          if(response.status===201) {
            toast.success(data.message)
            setTimeout(()=> {
              navigate('/dashboard')
            }, 2000)
          }
          else {
            toast.error(data.message)
          }
        }
        catch (error) {
          console.log('Error:',error)
          toast.error('Something went wrong. Try again.')
        }
      }


  return (
    <div className='container mt-4'>
      <div className='text-center mb-4'>
        <h2><i className='fas fa-plus-circle me-2'></i>AddExpense</h2>
        <p className='text-muted'>Create your account to start tracting expenses</p>
      </div>

      <form className='p-4 border rounded shadow mx-auto' style={{maxWidth:'400px'}} onSubmit={handleSubmit}>

        <div className='mb-3'>
          <label className='form-label text-start d-block'>Expense Date</label>
          <div className='input-group'>
            <span className='input-group-text'>
              <i className='fas fa-calendar-alt'></i>
            </span>
            <input type='date' name='ExpenseDate' value={formData.ExpenseDate} className='form-control' required onChange={handleChange}/>
          </div>
        </div>

        <div className='mb-3'>
          <label className='form-label text-start d-block'>ExpenseItem</label>
          <div className='input-group'>
            <span className='input-group-text'>
              <i className='fas fa-shopping-cart'></i>
            </span>
            <input type='text' name='ExpenseItem' value={formData.ExpenseItem} className='form-control' required onChange={handleChange} placeholder='Enter Expense Item (e.g. Groceries, Petrol)'/>
          </div>
        </div>

        <div className='mb-3'>
          <label className='form-label text-start d-block'>Expense Cost (₹)</label>
          <div className='input-group'>
            <span className='input-group-text'>
              <i className='fas fa-rupee-sign'></i>
            </span>
            <input type='number' name='ExpenseCost' value={formData.ExpenseCost} className='form-control' required onChange={handleChange} placeholder='Enter amount spent'/>
          </div>
        </div>

        <button type='submit' className='btn btn-primary w-100 mt-3'><i className='fas fa-plus me-2'></i> Add Expense</button>
      </form>

      <ToastContainer/>
    </div>
  )
}

export default AddExpense