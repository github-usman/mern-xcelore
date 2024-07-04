import React, { useEffect, useState } from "react";
import { FaPlusCircle, FaSearch, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import UsersProfile from "../../components/UsersProfile";
// import { fetchAllProfileService } from "../../store/reducers/authReducer";
import AddNewUser from "./AddNewUser";
import LoadingSpinner from "../../components/LoadingSpinner";
import { fetchAllProfiles } from "../../store/thunks/adminThunk";

const AllUserProfile = () => {
  // Modal
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allUsers, userCount, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    const fetchData = async () => {
      if (isAuthenticated) {
        await dispatch(
          fetchAllProfiles({ searchTerm, currentPage })
        ).unwrap();
      } else {
        navigate("/login");
      }
    };

    fetchData().catch(console.error);
    // eslint-disable-next-line
  }, [dispatch, isAuthenticated, navigate]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(fetchAllProfiles({ keyword: searchTerm, page: 1 }));
  };

  const handleClickNext = () => {
    const totalPages = Math.ceil(userCount / 4);
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      dispatch(fetchAllProfiles({ keyword: searchTerm, page: nextPage }));
    }
  };

  const handleClickPrev = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
      dispatch(fetchAllProfiles({ keyword: searchTerm, page: prevPage }));
    }
  };


  if (!allUsers) {
    return <div>No user data available.</div>;
  }

  return (
    <div className="justify-content-center align-items-center mb-5">
      <div className="card-header  bg-warning text-white" style={{ position: "sticky", top: "0", zIndex: "100" }}>
      <LoadingSpinner/>
        <div className="container d-flex justify-content-between align-items-center">
          <div className="text-center text-black d-flex gap-1"><FaUser className="pt-1" size={20} /> <h5>All Users Profiles</h5></div>
          <Link to={"/admin/profile"} className="btn btn-dark text-center ">
            <h6 className="px-4 py-0">My Profile</h6>
          </Link>
        </div>
      </div>
      <div className="d-flex justify-content-center my-1 gap-5">
        <form
          className="d-flex align-item-center justify-content-center"
          onSubmit={handleSearch}
        >
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
        <button
          className="btn btn-success d-flex align-items-center justify-content-between shadow"
          onClick={openPopup}
        >
          <p className="mb-0 me-2 flex-grow-1 text-start">Add New User</p>
          <FaPlusCircle size={20} />
        </button>
      </div>

      {isOpen && <AddNewUser closePopup={closePopup} />}
      <div className="container card">
        <div className="card-body">
          {allUsers.length > 0 ? (
            allUsers.map((user) => <UsersProfile user={user} key={user.id} />)
          ) : (
            <div>No users found.</div>
          )}
        </div>
        
          
        <div className="d-flex align-item-center mb-3 ms-3">
          <button
            className="btn btn-dark"
            onClick={handleClickPrev}
            disabled={currentPage === 1}
          >
            Prev Page
          </button>
          <h6 className="mt-2">
            &nbsp; &nbsp; &nbsp; {currentPage} / {Math.ceil(userCount / 4)}{" "}
            &nbsp; &nbsp; &nbsp; &nbsp;
          </h6>
          <button
            className="btn btn-dark"
            onClick={handleClickNext}
            disabled={currentPage === Math.ceil(userCount / 4)}
          >
            Next Page
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default AllUserProfile;
