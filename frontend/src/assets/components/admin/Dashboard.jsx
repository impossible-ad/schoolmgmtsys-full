import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/features/authState";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

        <div className="h-screen flex justify-center items-center">
            <h1 className="font-bold text-3xl"> Welcome to Admin Dashboard {email} </h1>
            <h2>
                <button
                    onClick={handlelogout}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
                    Logout
                </button>
            </h2>
        </div>


    )
};

export default Dashboard;