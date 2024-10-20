export const styles: { [key: string]: React.CSSProperties } = {
  frame: {
    position: 'absolute',
    top: '8vh',
    height: '90vh',
  },
  contentWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    zIndex: 2,
  },
  postBox: {
    display: 'flex',
    alignItems: 'center',
    width: '30vw',
    boxSizing: 'border-box',
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
    fontSize: '20px',
  },
  verticalLine: {
    position: 'absolute',
    top: '8vh',
    bottom: '10vh',
    left: '50%',
    width: '1px',
    backgroundColor: '#000',
    zIndex: 1,
  },
  mainPanel: {
    position: 'relative',
    textAlign: 'left',
    border: '1px solid #000',
    margin: '15vh 0',
    height: '30vh',
    alignItems: 'center',
    fontSize: '1.2rem',
    zIndex: 2,
  },

  dragIndicatorIcon: {
    fontSize: '20px',
    position: 'absolute',
    bottom: '10px',
    right: '10px',
  },

  nextPanel: {
    position: 'absolute',
    top: '80vh',
    zIndex: 2,
  },
  buttonWrapper: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
  },

  button: {
    width: '90%',
    padding: '5px 10px',
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    textAlign: 'left',
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
