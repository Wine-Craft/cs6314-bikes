import { getTechnicianModel } from "../schema.js";

export async function getTechnician(req, res) {
    const Technician = getTechnicianModel();

    try {
        let userID = null;
        if(req.params.id != null) {
            userID = req.params.id;
        } else {
            userID = req.user._id;
        }

        const technician = await Technician.findOne({
            userID: userID,
        });

        if(!technician) {
            return res.status(404).json({
                technician: null,
            });
        }
        return res.status(200).json({
            technician,
        });
    } catch(err) {
        console.log(err);
        return res.status(500).send();
    }
}