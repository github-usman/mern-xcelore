import React, { useEffect, useState } from "react";
import { FaPlusCircle, FaSearch, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllUserProfile } from "../../store/actions/authActions";
import UsersProfile from "./UsersProfile";
import UserRegister from "./UserRegister";

const AllUserProfile = () => {
  // Modal
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };


  const dispatch = useDispatch();
  const { users,userCount, loading } = useSelector((state) => state.auth);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchAllUserProfile(searchTerm, currentPage));
    // eslint-disable-next-line
  }, [dispatch, currentPage]);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(fetchAllUserProfile(searchTerm, 1));
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
      <div className="card-header  bg-primary text-white" style={{position:'sticky',top:'0',zIndex:'100'}}>
        <div className="container d-flex justify-content-between align-items-center">
          <h5 className="text-center d-flex align-items-center gap-2">
            <FaUser /> All Users Profiles
          </h5>
      <Link to={"/admin/profile"} className="btn btn-dark text-center d-flex  " ><h6>My Profile</h6></Link>
      </div>
    </div>
      <div className="d-flex justify-content-center my-1 gap-5">
        <form className="d-flex align-item-center justify-content-center" onSubmit={handleSearch}>
          <input 
            type="text" 
            className="form-control " 
            placeholder="Search..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn btn-success " type="submit">
            <FaSearch size={20} />
          </button>

        </form>
        <button className="btn btn-success d-flex align-items-center justify-content-between" onClick={openPopup}>
          <p className="mb-0 me-2 flex-grow-1 text-start">Add New User</p>
          <FaPlusCircle size={20} />
        </button>
        </div>

        {isOpen && <UserRegister closePopup={closePopup} />}
      <div className="container card">
    
        
        <div className="card-body">
          {users.length > 0 ? (
            users.map((user) => (
              <UsersProfile user={user} key={user.id}/>
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
