import { indexSlice } from "./indexSlice";

export const teacherAPIs = indexSlice.injectEndpoints({

    endpoints: (builder) => ({

        //get all teachers;
        // query for get uses providesTags;
        // mutation for postMessage,delete,update uses invalidateTags;

        getAllTeachers: builder.query({
            query: () => ({
                url: "/teacher/get_teacher",
                method: "GET"
            }),
            providesTags: ["teacher"]
        }),

        addTeacher: builder.mutation({
            query: (data) => ({
                url: "/teacher/add_teacher",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["teacher"]
        })
    })
})

export const { useGetAllTeachersQuery, useAddTeacherMutation } = teacherAPIs;