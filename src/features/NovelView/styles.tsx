export const styles = {
  postCard: {
    position: 'absolute',
    border: '1px solid #000',
    margin: '5vw',
    top: '40px',
  },
  contentWrapper: {
    display: 'flex' as const,
    justifyContent: 'space-between' as const,
    width: '100%',
  },
  postBox: {
    border: '1px solid #000',
    flex: '1 1 30%',
    margin: '0 10px',
  },
  reactionWrapper: {
    display: 'flex' as const,
  },
  icon: {
    marginRight: '5px',
  },
  mainText: {
    textAlign: 'center' as const,
    margin: '10px 0',
  },
  footer: {
    display: 'flex' as const,
  },
  button: {
    padding: '5px 10px',
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
  },
  footerReactions: {
    display: 'flex' as const,
    alignItems: 'center' as const,
  },
  commentCount: {
    display: 'flex' as const,
    alignItems: 'center' as const,
  },
};
