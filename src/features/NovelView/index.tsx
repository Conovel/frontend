import { FaThumbsUp, FaComment } from 'react-icons/fa';
import { styles } from './styles';

export const NovelView = function () {
  return (
    <div style={styles.postCard}>
      <div style={styles.contentWrapper}>
        <div style={styles.postBox}>
          <p>ああ、あの若い頃気づいていれば...</p>
          <div style={styles.reactionWrapper}>
            <FaThumbsUp style={styles.icon} />
            <span>120</span>
          </div>
        </div>

        <div style={styles.postBox}>
          <p>ああ、あの若い頃気づいていれば...</p>
        </div>

        <div style={styles.postBox}>
          <p>ああ、あの若い頃気づいていれば...</p>
        </div>
      </div>
      <div style={styles.contentWrapper}>
        <div style={styles.mainText}>
          <p>主人の帰りが何よりも心待ちだったことを思い出す。</p>
          <p>今思えば、なんてちっぽけなことに心躍らせていたのだろう。</p>
        </div>
      </div>

      <div style={styles.footer}>
        <div style={styles.contentWrapper}>
          <div style={styles.postBox}>
            <button style={styles.button}>続きを自分で書く</button>
            <div style={styles.reactionWrapper}>
              <FaThumbsUp style={styles.icon} />
              <span>120</span>
              <FaComment style={styles.icon} />
              <span>120</span>
            </div>
          </div>

          <div style={styles.postBox}>
            <p>ああ、あの若い頃気づいていれば...</p>
          </div>

          <div style={styles.postBox}>
            <p>ああ、あの若い頃気づいていれば...</p>
          </div>
        </div>
      </div>
    </div>
  );
};
