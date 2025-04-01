import React, { useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Box, Fab } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import NovelCard from '../../components/novelCard/NovelCard';
import {
  Sentence,
  NovelProps,
  CreateSentenceRequest,
  PostSentence,
} from '../../types/types';
import CreateIcon from '@mui/icons-material/Create';
import { EditPost } from '../EditPost';

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
  novel: NovelProps;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  textIndex: number;
}

const handleClick = (sentenceId: number) => {
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
  novel,
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

  const renderNovelCard = (panel: Sentence, index: number) => (
    <Box
      key={panel.sentence_id}
      sx={{
        justifyContent: 'center',
        margin: '0 1vw',
        width: 'calc(100% - 2vw)',
      }}
    >
      <NovelCard
        novel={novel}
        onClick={() => handleClick(panel.sentence_id)}
        key={index}
        index={index}
        textIndex={textIndex}
        evaluation_good_count={evaluation_good_count}
        setEvaluation_good_count={setEvaluation_good_count}
        comment_count={comment_count}
        setComment_count={setComment_count}
        evaluation_stay_count={evaluation_stay_count}
        setEvaluation_stay_count={setEvaluation_stay_count}
        text={panel.sentence}
      />
    </Box>
  );

  const handleSubmitPost = async (sentenceRequest: CreateSentenceRequest) => {
    try {
      // 親投稿のIDと更新日時を取得
      const parentId = mainPanel[mainPanel.length - 1]?.sentence_id || 0;
      const parentUpdatedAt =
        mainPanel[mainPanel.length - 1]?.updated_at || new Date().toISOString();

      // APIに送信するためのPostSentenceオブジェクトを作成
      const postSentence: PostSentence = {
        parent_sentence_id: parentId,
        parent_updated_at: parentUpdatedAt,
        sentence: sentenceRequest.text,
      };

      // モックAPIを使用して新しい文章を投稿
      const response = await fetch(
        `${import.meta.env.VITE_DEVELOPMENT_API_BASE_URL}/sentences`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postSentence),
        },
      );

      if (!response.ok) {
        throw new Error('Failed to create sentence');
      }

      const newSentence: Sentence = await response.json();

      // mainPanelを更新
      setMainPanel((prev) => [...prev, newSentence]);
      const newIndex = Math.max(0, childrenPanel.length + 1 - visibleTextCount);
      setStartIndex(newIndex);

      console.log('投稿されたテキスト:', newSentence.text);
    } catch (error) {
      console.error('Error creating sentence:', error);
      // エラーハンドリングを追加することをお勧めします
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        margin: '5vh auto',
        height: '20vh',
        width: '70vw',
        alignItems: 'center',
        zIndex: 2,
      }}
    >
      <Box
        sx={{
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
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
        sx={{
          color: '#fff',
          backgroundColor: '#467DCC',
          position: 'absolute',
          bottom: '10vh',
          right: '0vw',
          zIndex: 5,
          '&:hover': {
            backgroundColor: '#0E4DC7',
          },
        }}
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
