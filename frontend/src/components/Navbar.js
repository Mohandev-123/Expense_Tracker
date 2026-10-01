import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {useNavigate} from 'react-router-dom'

const Navbar = () => {
    const userId = localStorage.getItem('userId')
    const navigate = useNavigate()
    const [isNavbarOpen, setIsNavbarOpen] = useState(false)

    const handleLogout = () => {
        localStorage.removeItem('userId')
        navigate('/login')
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className='container'>
                <Link className="navbar-brand" to="/"><i className='fas fa-wallet me-2'></i>Expense Tracker</Link>
                <button className="navbar-toggler" type="button" aria-controls="navbarSupportedContent" aria-expanded={isNavbarOpen} aria-label="Toggle navigation" onClick={() => setIsNavbarOpen(!isNavbarOpen)}>
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className={`collapse navbar-collapse${isNavbarOpen ? ' show' : ''}`} id="navbarSupportedContent">
                    <ul className="navbar-nav ms-lg-auto flex-nowrap text-nowrap align-items-start">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/"><i className='fas fa-home me-1'></i> Home <span className="sr-only">(current)</span></Link>
                        </li>
                        {userId ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/dashboard"><i className='fa fa-tachometer-alt me-1'></i> Dashboard</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/add-expense"><i className='fa fa-plus me-1'></i> Add Expense</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/manage-expense"><i className='fa fa-tasks me-1'></i> Manage Expense</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/expense-report"><i className='fa fa-file-alt me-1'></i> Expense Report</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/change-password"><i className='fa fa-key me-1'></i> Change Password</Link>
                                </li>
                                <button className="btn btn-danger btn-sm ms-2 mt-1" onClick={handleLogout}>
                                    <i className='fa fa-sign-out-alt me-1'></i> Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/signup"><i className='fa fa-user-plus me-1'></i> Signup</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login"><i className='fa fa-sign-in-alt me-1'></i> Login</Link>
                                </li>
                            </>
                        )}
                        
                        
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar