import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";


const Header = () => (
    <Grid container xs={12} md={12} style={{
        backgroundColor: "#0aead8", padding: "15px 0", borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    }}>
        <Typography variant="h6" color="textSecondary" style={{margin: 10, }}>
            Listado de Tareas
        </Typography>
        <Grid container xs={12} md={12} >
            <Grid item xs={3} md={3} style={{marginLeft: '15px', flexBasis: 0}}>
                <Typography variant="span" color="primary">
                    Estado
                </Typography>
            </Grid>
            <Grid item xs={3} md={3} style={{marginLeft: '15px', flexBasis: 0}}>
                <Typography variant="span" color="primary">
                    Titulo
                </Typography>
            </Grid>
            <Grid container xs={12} md={10} style={{display: 'flex', justifyContent: 'flex-end', paddingRight: '10px'}}>
                <Grid item xs={6} style={{display: 'flex', justifyContent: 'flex-end', paddingRight: '30px'}}>
                    <Typography variant="span" color="primary">
                        Detalles
                    </Typography>
                </Grid>
                <Typography variant="span" color="primary">
                    Eliminar
                </Typography>
            </Grid>
        </Grid>
    </Grid>
)
export default Header;
