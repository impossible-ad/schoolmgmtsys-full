import { toast } from "react-toastify";
import { useDeleteTeacherMutation, useGetAllTeachersQuery, useUpdateTeacherMutation, } from "../../../../redux/features/teacherSlice";
import Loading from "../../shared/Loading";
import { useState } from "react";

const TeacherDashB = () => {

    const [originalData, setOriginalData] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [teacherId, setTeacherId] = useState();
    // const [selectedTeacher, setSelectedTeacher] = useState(null);
    const { data, isLoading, error } = useGetAllTeachersQuery();
    const [deleteTeacher] = useDeleteTeacherMutation();
    const [updateTeacher] = useUpdateTeacherMutation();

    const [formData, setFormData] = useState({
        name: "", email: "", position: "", phone: ""
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev, //spread operator
            [id]: value
        }));
    }

    if (isLoading) {
        return <Loading />
    }
    if (error) return <p className="p-4 text-red-600">Failed to load teachers!</p>;


    const teachers = data?.teacher || [];

    const handleDelete = async (teacher) => {
        setTeacherId(teacher.id);
        try {
            await deleteTeacher(teacher.id).unwrap();
            toast.success(`${teacher.name} deleted successfully`);

        } catch (error) {
            toast.error(`Failed to delete ${teacher.name}`);
        }
    }


    const handleEdit = async (teacher) => {
        setIsModalOpen(true);
        setTeacherId(teacher.id);
        setOriginalData(teacher);
        setFormData({
            name: teacher.name,
            email: teacher.email,
            position: teacher.position,
            phone: teacher.phone
        })
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedData = {};
        if (formData.name !== originalData.name) {
            updatedData.name = formData.name;
        }
        if (formData.email !== originalData.email) {
            updatedData.email = formData.email;
        }
        if (formData.phone !== originalData.phone) {
            updatedData.phone = formData.phone;
        }
        if (formData.position !== originalData.position) {
            updatedData.position = formData.position;
        }
        if (Object.keys(updatedData).length === 0) {
            toast.info("No changes made.");
            return;
        }

        try {
            const res = await updateTeacher({ id: teacherId, data: updatedData }).unwrap();
            await updateTeacher({ id: teacherId, data: updatedData }).unwrap();
            toast.success(res.message || `${formData.name} 's data updated successfully`);
            setIsModalOpen(false);

        } catch (error) {
            toast.error(error?.data?.message || "Update Failed!");
        }
    }



    return (

        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Teachers List</h1>

            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Position</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Phone</th>

                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Action</th>



                        </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-200">
                        {teachers.map((teacher) => (
                            <tr key={teacher.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm text-gray-800">{teacher.id}</td>
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">{teacher.name}</td>
                                <td className="px-6 py-4 text-sm text-blue-600">{teacher.email}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{teacher.position}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">{teacher.phone}</td>
                                <td className="px-6 py-4 text-sm text-gray-700">
                                    <div className="space-x-4">
                                        <button onClick={() => handleDelete(teacher)} className="cursor-pointer">Delete</button>
                                        <button onClick={() => handleEdit(teacher)} className="cursor-pointer">Edit</button>
                                    </div>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>

                {teachers.length === 0 && (
                    <p className="p-4 text-center text-gray-500">No teacher data found</p>
                )}
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg w-96">
                        <h2 className="text-xl font-bold mb-4">Edit Teacher</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                id="name"
                                value={formData.name || ""}
                                placeholder="Name"
                                onChange={handleChange}
                                className="w-full p-2 border rounded mb-3"
                            />
                            <input
                                type="email"
                                id="email"
                                value={formData.email || ""}
                                placeholder="Email"
                                onChange={handleChange}
                                className="w-full p-2 border rounded mb-3"
                            />
                            <input
                                type="text"
                                id="position"
                                value={formData.position || ""}
                                placeholder="Position"
                                onChange={handleChange}
                                className="w-full p-2 border rounded mb-3"
                            />
                            <input
                                type="text"
                                id="phone"
                                value={formData.phone || ""}
                                placeholder="Phone"
                                onChange={handleChange}
                                className="w-full p-2 border rounded mb-3"
                            />
                            <div className="flex justify-end space-x-2">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    type="button" className="px-4 py-2 bg-gray-300 rounded">
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>



            )}
        </div>
    );


};

export default TeacherDashB;
