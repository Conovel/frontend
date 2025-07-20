import React, { useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Box, Fab } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import NovelCard from '../../components/novelCard/NovelCard';
import CreateIcon from '@mui/icons-material/Create';
import { EditPost } from '../EditPost';
import { PostSentence, Sentence, SentencesApi } from '../../api/api';
import { axiosConfig } from '../../axiosConfig';

const sentencesApi = new SentencesApi(axiosConfig);

const carouselNavButtonStyle = {
  backgroundColor: '#BDBDBD',
  opacity: 0.5,
  width: '0.5vw',
  color: '#fff',
  borderRadius: 5,
};

const carouselNavWrapperStyle = {
  position: 'absolute' as const,
  top: '7vh',
  padding: '0 1vw',
};

const mainBoxStyle = {
  backgroundColor: '#fff',
  justifyContent: 'space-between',
  margin: '5vh auto',
  height: '20vh',
  width: '70vw',
  alignItems: 'center',
  zIndex: 2,
};

const innerBoxStyle = {
  justifyContent: 'center',
  overflow: 'hidden',
};

const novelCardBoxStyle = {
  justifyContent: 'center',
  margin: '0 1vw',
  width: 'calc(100% - 2vw)',
};

const fabStyle = {
  color: '#fff',
  backgroundColor: '#467DCC',
  position: 'absolute',
  bottom: '10vh',
  right: '0vw',
  zIndex: 5,
  '&:hover': {
    backgroundColor: '#0E4DC7',
  },
};

// リクエスト用の新しい型
export interface CreateSentenceRequest {
  text: string;
}

interface ChildrenPanelProps {
  childrenPanel: Sentence[];
  setChildrenPanel: React.Dispatch<React.SetStateAction<Sentence[]>>;
  mainPanel: Sentence[];
  setMainPanel: React.Dispatch<React.SetStateAction<Sentence[]>>;
  startIndex: number;
  setStartIndex: React.Dispatch<React.SetStateAction<number>>;
  visibleTextCount: number;
  textCount: number;
  evaluation_good_count: number;
  setEvaluation_good_count: React.Dispatch<React.SetStateAction<number>>;
  comment_count: number;
  setComment_count: React.Dispatch<React.SetStateAction<number>>;
  evaluation_stay_count: number;
  setEvaluation_stay_count: React.Dispatch<React.SetStateAction<number>>;
  novel: Sentence;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  textIndex: number;
}

const handleClick = (sentenceId: number | undefined) => {
  // Your logic here, using sentenceId
  console.log(sentenceId);
};

const ChildrenPanel: React.FC<ChildrenPanelProps> = ({
  childrenPanel,
  mainPanel,
  setMainPanel,
  startIndex,
  setStartIndex,
  visibleTextCount,
  textCount,
  evaluation_good_count,
  setEvaluation_good_count,
  comment_count,
  setComment_count,
  evaluation_stay_count,
  setEvaluation_stay_count,
  textIndex,
}) => {
  const [isEditPostOpen, setIsEditPostOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (direction: 'next' | 'prev') => {
    if (direction === 'next' && startIndex + visibleTextCount < textCount) {
      setStartIndex(startIndex + visibleTextCount);
    } else if (direction === 'prev' && startIndex > 0) {
      setStartIndex(startIndex - visibleTextCount);
    }
  };

  const handleCarouselChange = (now: number) => {
    setActiveIndex(now);
    if (now > activeIndex) {
      handleScroll('next');
    } else if (now < activeIndex) {
      handleScroll('prev');
    }
  };

  const renderNovelCard = (panel: Sentence, index: number) => (
    <Box key={panel.sentenceId} sx={novelCardBoxStyle}>
      <NovelCard
        novel={panel}
        onClick={() => handleClick(panel.sentenceId)}
        key={index}
        index={index}
        textIndex={textIndex}
        evaluation_good_count={evaluation_good_count}
        setEvaluation_good_count={setEvaluation_good_count}
        comment_count={comment_count}
        setComment_count={setComment_count}
        evaluation_stay_count={evaluation_stay_count}
        setEvaluation_stay_count={setEvaluation_stay_count}
        sentence={panel.sentence || ''}
      />
    </Box>
  );

  const handleSubmitPost = async (sentenceRequest: CreateSentenceRequest) => {
    try {
      // 親投稿のIDと更新日時を取得
      const parentId = mainPanel[mainPanel.length - 1]?.sentenceId || 0;
      const parentUpdatedAt =
        mainPanel[mainPanel.length - 1]?.updatedAt || new Date().toISOString();

      // APIに送信するためのPostSentenceオブジェクトを作成
      const postSentence: PostSentence = {
        parentSentenceId: parentId,
        parentUpdatedAt: parentUpdatedAt,
        sentence: sentenceRequest.text,
      };

      // OpenAPIが生成したAPIクライアントを使用して新しい文章を投稿
      const response = await sentencesApi.postSentence(postSentence);

      if (!response || response.status !== 201 || !response.data?.main) {
        // 認証のためにresponseのチェックを追加
        throw new Error('Failed to create sentence');
      }

      // Convert API response Sentence to application Sentence type
      const apiSentence = response.data.main;
      const newSentence: Sentence = {
        sentenceId: apiSentence.sentenceId || 0,
        sentence: apiSentence.sentence || '',
        sentenceUserId: 0,
        sentenceUserName: '',
        profileIconImage: '',
        evaluationGoodCount: 0,
        evaluationStayCount: 0,
        createdAt: apiSentence.createdAt || '',
        updatedAt: apiSentence.updatedAt || '',
      };

      // mainPanelを更新
      setMainPanel((prev) => [...prev, newSentence]);
      const newIndex = Math.max(0, childrenPanel.length + 1 - visibleTextCount);
      setStartIndex(newIndex);

      console.log('投稿されたテキスト:', newSentence.sentence);
    } catch (error) {
      console.error('Error creating sentence:', error);
      // エラーハンドリングを追加することをお勧めします
    }
  };

  return (
    <Box sx={mainBoxStyle}>
      <Box sx={innerBoxStyle}>
        <Carousel
          autoPlay={false}
          index={activeIndex}
          onChange={handleCarouselChange}
          fullHeightHover={false}
          navButtonsProps={{ style: carouselNavButtonStyle }}
          navButtonsWrapperProps={{ style: carouselNavWrapperStyle }}
          NextIcon={<KeyboardArrowRightIcon />}
          PrevIcon={<KeyboardArrowLeftIcon />}
        >
          {childrenPanel.map(renderNovelCard)}
        </Carousel>
      </Box>
      <Fab
        aria-label='add post'
        sx={fabStyle}
        onClick={() => setIsEditPostOpen(true)}
      >
        <CreateIcon />
      </Fab>

      <EditPost
        open={isEditPostOpen}
        onClose={() => setIsEditPostOpen(false)}
        onSubmit={handleSubmitPost}
        mainText={mainPanel[mainPanel.length - 1]?.sentence || ''}
      />
    </Box>
  );
};

export default ChildrenPanel;
