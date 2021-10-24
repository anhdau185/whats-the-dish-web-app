import { makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) => ({
  emptyCategories: {
    color: '#333'
  },
  mainContainer: {
    display: 'flex',
    alignItems: 'flex-start'
  },
  smMargin: {
    margin: theme.spacing(1)
  },
  actionDiv: {
    textAlign: 'center'
  }
}));
