import React, { useEffect, useState } from "react";
import { FaSearch, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllUserProfile } from "../../store/actions/authActions";
import UsersProfile from "./UsersProfile";

const AllUserProfile = () => {
  const dispatch = useDispatch();
  const { users,userCount, loading } = useSelector((state) => state.auth);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchAllUserProfile(searchTerm, currentPage));
  }, [dispatch, currentPage]);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(fetchAllUserProfile(searchTerm, currentPage));
  };

  const handleClickNext = () => {
    const totalPages = Math.ceil(userCount / 4);
    if(currentPage<totalPages)
    setCurrentPage((prevPage) => prevPage + 1);
    dispatch(fetchAllUserProfile(searchTerm, currentPage));
  };

  const handleClickPrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
      dispatch(fetchAllUserProfile(searchTerm, currentPage));
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="justify-content-center align-items-center mb-5">
      <div className="card-header d-flex justify-content-evenly  align-item-center bg-primary text-white" style={{position:'sticky',top:'0',zIndex:'100'}}>
          <h5 className="text-center d-flex align-items-center">
            <FaUser /> All Users Profiles
          </h5>
      <Link to={"/admin/profile"} className="btn btn-dark text-center d-flex  " ><h6>My Profile</h6></Link>
    </div>
        <form className="d-flex align-item-center justify-content-center m-auto w-100 my-1" onSubmit={handleSearch}>
          <input 
            type="text" 
            className="form-control " 
            placeholder="Search..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ maxWidth: '500px' }}
          />
          <button className="btn btn-success px-5" type="submit">
            <FaSearch size={20} />
          </button>

        </form>
      <div className="container card">
    
        
        <div className="card-body">
          {users.length > 0 ? (
            users.map((user) => (
              <UsersProfile user={user}/>
            ))
          ) : (
            <div>No users found.</div>
          )}
        </div>
        <div className="d-flex align-item-center mb-3">
          <button className='btn btn-dark' onClick={handleClickPrev} disabled={currentPage === 1}>Prev Page</button>
          <h6 className="mt-2">&nbsp; &nbsp; &nbsp; {currentPage} / {Math.ceil(userCount / 4)} &nbsp; &nbsp; &nbsp; &nbsp;</h6>
          <button className="btn btn-dark" onClick={handleClickNext} disabled={currentPage === Math.ceil(userCount/4)}>Next Page</button>
        </div>
      </div>
      
    </div>
  );
};

export default AllUserProfile;
