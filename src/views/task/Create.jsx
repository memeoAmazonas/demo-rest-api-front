import React from "react";
import {Grid, TextField} from '@material-ui/core';
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const Create = ({onSend}) => {
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState(null);
    const [description, setDescripion] = React.useState(null);
    const options = open ? {label: "Cerrar", color: "secondary"} : {label: "Crear", color: "primary"}
    const onClose = () => {
        setOpen(!open)
        setName(null)
        setDescripion(null)
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={3} style={{flexBasis: 0}}>
                <Button variant="contained" color={options.color} onClick={onClose}>
                    {options.label}
                </Button>
            </Grid>
            {open
            && <Grid container xs={12} md={12} style={{
                backgroundColor: "#0aead8",
                padding: 20,
                borderRadius: 10,

            }}>
                    <Typography variant="h6" color="textSecondary">
                        Crear Tarea
                    </Typography>
                <Grid container>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            name="name"
                            label="Nombre"
                            onChange={(e) => setName(e.target.value)}

                        />
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            name="description"
                            label="Descripción"
                            onChange={(e) => setDescripion(e.target.value)}
                        />
                    </Grid>
                </Grid>
                <Grid container style={{marginTop: "20px"}}>
                    <Button
                        variant="contained"
                        color="primary"
                        style={{marginRight: "20px"}}
                        disabled={name == null || name === ""}
                        onClick={() => onSend(name, description, () => setOpen(false))}>
                        Crear
                    </Button>
                </Grid>
            </Grid>}
        </Grid>
    )
}

export default Create;

