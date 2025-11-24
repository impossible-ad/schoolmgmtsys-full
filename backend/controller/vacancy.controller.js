import db from "../config/dbconnect.js";

export const addVacancy = async (req, res, next) => {
    try {
        const { position, description, deadline } = req.body;
        if (!position || !deadline) {
            return res.status(404).json({
                message: " required fields are empty"
            })
        }

        await db.execute("INSERT INTO vacancy(position,description, deadline) VALUES(?,?,?)", [position, description, deadline]);
        res.status(200).json({
            message: " new vacancy annouced "
        })
    } catch (error) {
        next(error);
    }
}

export const getVacancy = async (req, res, next) => {
    try {
        const vacancyDetail = await db.execute("SELECT * FROM vacancy");

        if (vacancyDetail.length === 0) {

            return res.status(404).json({
                message: " no such vacancy available"
            })
        }

        return res.status(200).json({
            message: "vacancy getting process successful", vacancyDetail
        })


    } catch (error) {
        next(error);
    }
}


export const deleteVacancy = async (req, res, next) => {
    try {
        const { id } = req.params;

        const [inputid] = await db.execute("SELECT id FROM vacancy WHERE id =?", [id]);

        if (inputid.length === 0) {
            return res.status(400).json({
                message: "no vacancy found"
            });
        }

        await db.execute("DELETE FROM vacancy WHERE id =?", [id]);
        return res.status(200).json({
            message: "vacancy deleted successfully"
        });

    } catch (error) {
        next(error);
    }
}
