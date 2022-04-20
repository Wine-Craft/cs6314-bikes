import {getTechnicianModel} from "../schema.js";

export default async function browseTechnicians(req, res) {
    const Technician = getTechnicianModel();

    try {
        const technicians = await Technician.find({});

        return res.status(200).json({
            technicians,
        });
    } catch(e) {
        console.log(e);
        return res.status(500).json({});
    }
}