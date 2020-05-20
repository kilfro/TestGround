import {lighten, withStyles} from '@material-ui/core/styles';
import {LinearProgress} from "@material-ui/core";

export const Progress = withStyles({
    root: {
        height: 10,
        backgroundColor: lighten('rgba(0, 0, 0, 0.38)', 0.5),
        borderRadius: 20
    },
    bar: {
        borderRadius: 20,
        backgroundColor: '#3f51b5'
    },
})(LinearProgress);