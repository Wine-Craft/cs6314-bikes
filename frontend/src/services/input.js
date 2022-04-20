import React from 'react';

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";

import DeleteIcon from "@mui/icons-material/Delete";

export default function ServicesInput({
    services,
    setServices,
    errors,
    addable,
}) {
    function handlePriceChange(index, price) {
        const newServices = [...services];
        newServices[index].tentativePrice = price;
        setServices(newServices);
    }

    function handleTitleChange(index, title) {
        const newServices = [...services];
        newServices[index].title = title;
        setServices(newServices);
    }

    function handleDescriptionChange(index, description) {
        const newServices = [...services];
        newServices[index].description = description;
        setServices(newServices);
    }

    function handleAddService() {
        const newServices = [...services];
        newServices.push({
            title: '',
            description: '',
            tentativePrice: 0.00,
        });
        setServices(newServices);
    }

    function handleRemoveService(index) {
        const newServices = [...services];
        newServices.splice(index, 1);
        setServices(newServices);
    }

    return (
        <React.Fragment>
            <Typography variant="h6" mb={ 1 }> Services </Typography>
            <FormControl> { services.map((service, index) => (
                <Card key={ index } sx={{
                    p: 3,
                    mb: 2,
                }}>
                    <Grid container spacing={ 2 }>
                        <Grid item xs={ 3 }>
                            <TextField
                                label="Price"
                                variant="outlined"
                                error={ errors[index] && errors[index].includes("tentativePrice") }
                                value={ service.tentativePrice }
                                onChange={ (e) => (
                                    handlePriceChange(index, e.target.value)
                                )}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">$</InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={ 8 }>
                            <TextField
                                label="Title"
                                fullWidth
                                error={ errors[index] && errors[index].includes("title") }
                                onChange={ (e) => (
                                    handleTitleChange(index, e.target.value)
                                )}
                                value={ service.title }
                            />
                        </Grid>
                        <> { addable &&
                            <Grid item xs={ 1 }>
                                <IconButton onClick={ () => handleRemoveService(index) }>
                                    <DeleteIcon />
                                </IconButton>
                            </Grid>
                        } </>
                        <Grid item xs={ 11 }>
                            <TextField
                                label="Description"
                                fullWidth
                                error={ errors[index] && errors[index].includes("description") }
                                onChange={ (e) => (
                                    handleDescriptionChange(index, e.target.value)
                                )}
                                multiline
                                value={ service.description }
                            />
                        </Grid>
                    </Grid>
                </Card>
            ))} </FormControl>
            <> { addable && <Button onClick={ handleAddService } variant="outlined" color="success">Add Service</Button> } </>
        </React.Fragment>
    );
}