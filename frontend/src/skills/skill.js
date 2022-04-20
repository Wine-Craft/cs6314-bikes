import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";

export default function Skill({
    skill,
}) {
    return (
        <Chip
            avatar={
                <Avatar>
                    { skill.icon }
                </Avatar>
            }
            key={ skill._id }
            label={ skill.name }
        />
    );
}