import React, {useContext, useEffect, useState} from 'react';
import {
    Checkbox,
    Chip,
    FormControl,
    FormHelperText,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select
} from "@mui/material";
import SessionContext from "../session/context";
import generateURL from "../utils/url-generator";
import axios from "axios";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Skill from "./skill";

export default function SkillsPicker({
    selected,
    setSelected,
    error,
}) {
    const { getBearerToken } = useContext(SessionContext);
    const [ skills, setSkills ] = useState([]);

    async function downloadSkills() {
        const url = generateURL('/skills');
        const response = await axios.get(url, {
            headers: getBearerToken(),
        });

        if(response.status === 200) {
            const data = response.data;
            setSkills(data.skills);
        }
    }

    useEffect(() => {
        downloadSkills();
    }, []);

    return (
        <FormControl sx={{
            width: '100%',
        }} error={ error }>
            <InputLabel> Skills </InputLabel>
            <Select
                multiple
                value={ selected }
                onChange={ (e) => {
                    setSelected(e.target.value);
                }}
                renderValue={ (selected) => (
                    <Box sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 0.5
                    }}> { selected.map((id) => {
                        const skill = skills.find(skill => (
                            skill._id === id
                        ));
                        return (
                            <Skill
                                id={ id }
                                key={ id }
                                icon={ skill.icon }
                                name={ skill.name }
                            />
                        );
                    })} </Box>
                )}
                input={
                    <OutlinedInput
                        label="Chip"
                        sx={{
                            width: '100%',
                        }}
                    />
                }
            > { skills.map((skill) => (
                <MenuItem
                    key={ skill._id }
                    value={ skill._id }
                >
                    <Checkbox checked={ selected.indexOf(skill._id) > -1 } />
                    <ListItemText>
                        { skill.icon } { skill.name }
                    </ListItemText>
                </MenuItem>
            ))} </Select>
            <FormHelperText> { error ? 'Error' : '' } </FormHelperText>
        </FormControl>
    );
}