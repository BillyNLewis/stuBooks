import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,//adds 64px of height to an element
  content: {
    padding: theme.spacing(3),
  },
  root: {
    flexGrow: 1,
  },
}));
