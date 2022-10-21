import React from 'react'
import { searchTerm } from '../actions'
import './header.css'
import { useDispatch} from "react-redux";

const Header = () => {
    // const inputVal = useSelector(state => state.searchRed);
    const dispatch = useDispatch();

    return (
        <div className='container'>
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href='/'>Kanban Board </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    {/* {searchTerm} */}
                    <div className="collapse navbar-collapse d-flex justify-content-end align-items-center" id="navbarSupportedContent">
                        <div className="form-group mb-2">
                            <i className="bi bi-search form-control-feedback"></i>
                            <input type="text" className="form-control" placeholder="Search" onChange={(e)=> dispatch(searchTerm(e.target.value))}  />
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header