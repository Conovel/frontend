export const styles: { [key: string]: React.CSSProperties } = {
  postCard: {
    position: 'absolute',
    border: '1px solid #000',
    margin: '5vw',
    top: '40px',
  },
  contentWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  postBox: {
    border: '1px solid #000',
    flex: '1 1 30%',
    margin: '0 10px',
  },
  reactionWrapper: {
    display: 'flex',
  },
  icon: {
    marginRight: '5px',
  },
  mainText: {
    textAlign: 'left',
    border: '1px solid #000',
    margin: '10px 0',
    alignItems: 'center',
  },
  footer: {
    display: 'flex',
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
