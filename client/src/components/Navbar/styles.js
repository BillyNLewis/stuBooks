import { makeStyles } from '@material-ui/core/styles';
export default makeStyles(() => ({
    header: {
      backgroundColor: "#3f50b5",
      paddingRight: "79px",
      paddingLeft: "118px",
      "@media (max-width: 900px)": {
        paddingLeft: 0,
      },
    },
    logo: {
      fontWeight: 600,
      color: "#FFFEFE",
      textAlign: "left",
      textDecoration: "none",
      display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    menuButton: {
      fontWeight: 700,
      size: "18px",
      marginLeft: "38px",
    },
    toolbar: {
      display: "flex",
      justifyContent: "space-between",
    },
    drawerContainer: {
      padding: "20px 30px",
    },
    wrapIcon: {
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
       }
  }));