import Auth from './Auth'
import {makeStyles} from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({
    headerContainer: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    authContainer: {
        marginTop: '16px',
        marginLeft: '10px',
        marginRight: '10px'
    }
}))

function HeaderBar(props) {
    const classes = useStyles();

    return(
    <div className={classes.headerContainer}>
        <div className={classes.authContainer}>
            <Auth db={props.db} 
                isSignedIn={props.isSignedIn} setIsSignedIn={props.setIsSignedIn}
            />
        </div>
    </div>
    )
}

export default HeaderBar;