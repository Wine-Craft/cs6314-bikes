import {Chip} from "@mui/material";
import Avatar from "@mui/material/Avatar";

export default function Skill({
    id,
    icon,
    name,
}) {
    return (
        <Chip
            avatar={
                <Avatar>
                    { icon }
                </Avatar>
            }
            key={ id }
            label={ name }
        />
    );
}