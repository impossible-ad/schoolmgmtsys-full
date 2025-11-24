import db from "../config/dbconnect.js";

export const addTeacher = async (req, res, next) => {
    try {
        const { name, email, phone, position } = req.body;
        //console.log(req.body);

        if (!name || !email || !phone || !position) {
            return res.status(401).json({
                message: "please provide all the required information"
            });
        }
        //check if email already exists in db
        const [givenemail] = await db.execute(
            "SELECT id FROM teacher Where email=?", [email]
        );

        if (givenemail.length > 0) { //0 denotes no of id present in database array
            return res.status(409).json({
                message: "this email already exists. provide a unique email"
            });
        }

        //check if phone no already exists
        const [givenphone] = await db.execute(
            "SELECT id FROM teacher Where phone=?", [phone]
        );

        if (givenphone.length > 0) { //0 denotes no of id present in database array
            return res.status(409).json({
                message: "this phone no already exists. provide a unique phone no"
            });
        }

        //insert teacher
        await db.execute("INSERT INTO teacher (name,email,phone,position) VALUES(?,?,?,?)",
            [name, email, phone, position]);
        return res.status(201).json({
            message: "teacher added successfully"
        });

    } catch (error) {
        next(error);
    }

}


export const getAllTeacher = async (req, res, next) => {
    try {
        const [result] = await db.execute("SELECT * FROM TEACHER ");
        res.status(200).json({
            message: "all teacher's data retrieved",
            data: result
        });

    } catch (error) {
        next(error);
    }
}


export const deleteTeacher = async (req, res, next) => {
    try {
        const { id } = req.params;

        const [givenid] = await db.execute(
            "SELECT id FROM teacher where id =?", [id]
        );

        if (givenid.length === 0) {
            return res.status(404).json({
                message: `teacher with ${id} id not found`
            });
        }

        await db.execute("DELETE FROM teacher WHERE id =?", [id]);
        return res.status(200).json({
            message: `teacher with id ${id} is deleted`
        })
    } catch (error) {
        next(error);
    }
}


export const updateTeacher = async (req, res, next) => {
    try {
        const { name, email, phone, position } = req.body;
        const { id } = req.params;


        //check if teacher exists
        const [teacher] = await db.execute("SELECT * FROM teacher WHERE id=?", [id]);
        if (teacher.length === 0) {
            return res.status(404).json({
                message: "teacher not found"
            });
        }
        const oldTeacher = teacher[0];

        const [teacherEmail] = await db.execute("SELECT * FROM teacher WHERE email=?", [email]);
        if (teacherEmail.length > 0) {
            return res.status(404).json({
                message: "duplicate email found "
            });
        }


        await db.execute("UPDATE teacher SET name=?,email=?,phone=?,position=?", [
            name ?? oldTeacher.name,
            email ?? oldTeacher.email,
            phone ?? oldTeacher.phone,
            position ?? oldTeacher.position
        ]);

        return res.status(200).json({
            message: "teacher updated"
        });


    } catch (error) {
        next(error);
    }

}
