import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/features/authState";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {

    const { email, isAuth } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuth) {
            navigate("/not_found");
        }
    }, [isAuth]);

    const handlelogout = () => {
        dispatch(logout());
    };

    return (

        <div className="h-screen flex ">

            <div className="bg-blue-500 pt-3">
                <Link to="/dashboard/teacher" className="text-black text-xl p-2 bg-amber-300 m-2 rounded-md">Teacher</Link>
            </div>


            <div className="flex flex-col mx-auto justify-center items-center ">
                <h1 className=" font-bold text-3xl"> Welcome to Admin Dashboard {email}</h1>
                <button
                    onClick={handlelogout}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
                    Logout
                </button>

            </div>
        </div>


    )
};

export default Dashboard;