export const styles: { [key: string]: React.CSSProperties } = {
  frame: {
    position: 'absolute',
    margin: '5vw',
    top: '40px',
    height: '90vh',
  },
  contentWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  postBox: {
    border: '1px solid #000',
    borderRadius: '10px',
    flex: '1 1 30%',
    margin: '0 5px',
    fontSize: '0.8rem',
    height: '8vh',
  },
  iconWrapper: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
  },
  icon: {
    marginRight: '5px',
  },
  mainPanel: {
    textAlign: 'left',
    border: '1px solid #000',
    margin: '15vh 0',
    height: '30vh',
    alignItems: 'center',
    paddingTop: '50px',
    fontSize: '1.2rem',
  },
  footer: {
    position: 'absolute',
    margin: '5vw',
    top: '80vh',
  },
  button: {
    padding: '5px 10px',
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
  },
  footerReactions: {
    display: 'flex',
    alignItems: 'center',
  },
  commentCount: {
    display: 'flex',
    alignItems: 'center',
  },
};
