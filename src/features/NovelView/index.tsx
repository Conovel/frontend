import { FaThumbsUp } from 'react-icons/fa';
import ChatIcon from '@mui/icons-material/Chat';
import { styles } from './styles';

export const NovelView = function () {
  return (
    <div style={styles.frame}>
      <div style={styles.contentWrapper}>
        <div>
          <div style={styles.postBox}>
            <p>ああ、あの若い頃気づいていれば...</p>
          </div>
          <div style={styles.iconWrapper}>
            <div style={styles.reactionWrapper}>
              <FaThumbsUp style={styles.icon} />
              <span>120</span>
            </div>
            <div style={styles.reactionWrapper}>
              <ChatIcon style={styles.icon} />
              <span>120</span>
            </div>
          </div>
        </div>

        <div>
          <div style={styles.postBox}>
            <p>ああ、あの若い頃気づいていれば...</p>
          </div>
          <div style={styles.iconWrapper}>
            <div style={styles.reactionWrapper}>
              <FaThumbsUp style={styles.icon} />
              <span>120</span>
            </div>
            <div style={styles.reactionWrapper}>
              <ChatIcon style={styles.icon} />
              <span>120</span>
            </div>
          </div>
        </div>

        <div>
          <div style={styles.postBox}>
            <p>ああ、あの若い頃気づいていれば...</p>
          </div>
          <div style={styles.iconWrapper}>
            <div style={styles.reactionWrapper}>
              <FaThumbsUp style={styles.icon} />
              <span>120</span>
            </div>
            <div style={styles.reactionWrapper}>
              <ChatIcon style={styles.icon} />
              <span>120</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div style={styles.mainPanel}>
          <p>主人の帰りが何よりも心待ちだったことを思い出す。</p>
          <p>今思えば、なんてちっぽけなことに心躍らせていたのだろう。</p>
        </div>
      </div>

      <div style={styles.footer}>
        <div style={styles.contentWrapper}>
          <div style={styles.postBox}>
            <button style={styles.button}>
              続きを
              <br />
              自分で書く
            </button>
          </div>

          <div>
            <div style={styles.postBox}>
              <p>ああ、あの若い頃気づいていれば...</p>
            </div>
            <div style={styles.iconWrapper}>
              <div style={styles.reactionWrapper}>
                <FaThumbsUp style={styles.icon} />
                <span>120</span>
              </div>
              <div style={styles.reactionWrapper}>
                <ChatIcon style={styles.icon} />
                <span>120</span>
              </div>
            </div>
          </div>

          <div>
            <div style={styles.postBox}>
              <p>ああ、あの若い頃気づいていれば...</p>
            </div>
            <div style={styles.iconWrapper}>
              <div style={styles.reactionWrapper}>
                <FaThumbsUp style={styles.icon} />
                <span>120</span>
              </div>
              <div style={styles.reactionWrapper}>
                <ChatIcon style={styles.icon} />
                <span>120</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
