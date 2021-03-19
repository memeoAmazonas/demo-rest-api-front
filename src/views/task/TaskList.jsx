import React from 'react';

import remove from 'lodash/remove'
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {Delete, GetAll, New, Update} from "./service";
import SkeletoLoading from "./Skeleton";
import FormatIndentDecreaseIcon from '@material-ui/icons/FormatIndentDecrease';
import FormatIndentIncreaseIcon from '@material-ui/icons/FormatIndentIncrease';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Checkbox from "@material-ui/core/Checkbox";
import Create from "./Create";
import Toast from "./Toast";
import Header from "./Header";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        minHeight: '100vh',
        height: '100%',
        maxWidth: 752,
        paddingTop: 50,
        paddingBottom: 50,
        marginLeft: "auto",
        marginRight: "auto",
    },
    demo: {
        backgroundColor: "#0aead8",
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,

        padding: 10,
    },
    title: {
        margin: theme.spacing(2, 0, 2),
        backgroundColor: "#0aead8",
        borderRadius: 5,

    },
}));


const TaskList = () => {
    const classes = useStyles();
    const [dense,] = React.useState(false);
    const [data, setData] = React.useState(null);
    const [add, setAdd] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(false);
    const [openToast, setOpenToast] = React.useState(false);
    const [message, setMessage] = React.useState(null);
    const setDescription = (id) => {
        if (add.includes(id)) {
            const actual = remove(add, (it) => it !== id)
            setAdd(actual)
        } else {
            setAdd([...add, id])
        }
    }
    React.useEffect(() => {
        (async () => {
            if (!data) {
                const response = await GetAll()
                console.log(response);
                if (response.payload_list) {
                    setData(response.payload_list)
                }
                setIsLoading(true)
            }
        })();
    })
    const CreateTask = async (Text, Description, callback) => {
        let body = {Text: Text.toUpperCase()}
        if (Description && Description !== "") {
            body["Description"] = Description
        }
        const data = await New(body);
        if (data) {
            setMessage("Tarea creada con exito");
            setOpenToast(true);
            callback();
            const response = await GetAll()
            setData(response.payload_list)
            setTimeout(() => {
                setOpenToast(false)
            }, 8000)
        }
    }
    const ChangeStatus = async (id) => {
        const response = await Update(id);
        if (response) {
            setMessage("Tarea Actualizada con Exito");
            setOpenToast(true);

            const data = await GetAll()
            setData(data.payload_list)
            setTimeout(() => {
                setOpenToast(false)
            }, 8000)
        }
    }
    const DeleteTask = async (id) => {
        const response = await Delete(id);
        if (response) {
            setMessage("Tarea Eliminada con Exito");
            setOpenToast(true);

            const data = await GetAll()
            if (data.payload_list) {
                setData(data.payload_list)

            } else {
                setData([])
            }
            setTimeout(() => {
                setOpenToast(false)
            }, 8000)
        }
    }
    const setFormatDate = (data) => {
        const [f,d] = data.split("T");
        const [a,]  = d.split(".");
        return `${f}:${a}`;
    }
    const createDescription = (item) => {
        const {Description, CreatedAt, UpdatedAt, Completed} = item;
        const ud = Completed ? <p><b>Completada</b>: {setFormatDate(UpdatedAt)}</p> : "";
        return <div style={{width: '70%'}}>
            <p><b>Descripción</b>: {Description}</p>
            <p> <b>Creada</b>: {setFormatDate(CreatedAt)}</p>
            <>{ud}</>
        </div>
    }
    const dataList = data ? data.map((item) => (
            <ListItem key={item.ID} role={undefined}>
                <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={item.Completed}
                        tabIndex={-1}
                        disableRipple
                        onChange={() => ChangeStatus(item.ID)}
                        inputProps={{'aria-labelledby': item.Text}}
                    />
                </ListItemIcon>
                <ListItemText id={item.Text}
                              primary={item.Text}
                              secondary={add.includes(item.ID) ? createDescription(item) : null}
                />
                {item.Description && <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="comments" onClick={() => setDescription(item.ID)}
                                style={{marginRight: '40px'}}>
                        {!add.includes(item.ID) ? <FormatIndentDecreaseIcon color="primary"/> :
                            <FormatIndentIncreaseIcon color="primary"/>}
                    </IconButton>
                    <IconButton edge="end" disabled={!item.Completed} aria-label="comments"
                                onClick={() => DeleteTask(item.ID)} style={{marginRight: '5px'}}>
                        {item.Completed ? <DeleteForeverIcon color="secondary"/> : <DeleteForeverIcon/>}
                    </IconButton>
                </ListItemSecondaryAction>}
            </ListItem>
        )
    ) : null
    if (!isLoading) return (<div className={classes.root}>
        <SkeletoLoading/>
    </div>)
    return (
        <div className={classes.root}>
            <Typography variant="h4" className={classes.title} color="primary">
                Katara Text List
            </Typography>
            <Toast open={openToast} message={message}/>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    <Create onSend={CreateTask}/>
                </Grid>
                <hr style={{width: '100%', margin: "40px 0"}}/>
                <Grid item xs={12} md={12}>

                    <Header/>
                    <Divider/>
                    <div className={classes.demo}>
                        <List dense={dense}>
                            {dataList}
                        </List>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}
export default TaskList

