import React, { useState, useEffect } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Box, Snackbar, Alert } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import NovelCard from '../../components/novelCard/NovelCard';
import {
  Sentence,
  NovelProps,
  CreateSentenceRequest,
  PostSentence,
} from '../../types/types';
import { EditPost } from '../EditPost';
import { SentencesApi } from '../../api/api';
import { axiosConfig } from '../../axiosConfig';

const sentencesApi = new SentencesApi(axiosConfig);
import { useNavigate } from 'react-router';

const carouselNavButtonStyle = {
  backgroundColor: '#BDBDBD',
  opacity: 0.7,
  width: '40px',
  height: '40px',
  color: '#fff',
  borderRadius: '50%',
  '&:hover': {
    opacity: 1,
    backgroundColor: '#9E9E9E',
  },
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
  position: 'relative',
};

const novelCardBoxStyle = {
  justifyContent: 'center',
  margin: '0 1vw',
  width: 'calc(100% - 2vw)',
};

interface ChildrenPanelProps {
  childrenPanel: Sentence[];
  setChildrenPanel: React.Dispatch<React.SetStateAction<Sentence[]>>;
  mainPanel: Sentence[];
  setMainPanel: React.Dispatch<React.SetStateAction<Sentence[]>>;
  setStartIndex: React.Dispatch<React.SetStateAction<number>>;
  visibleTextCount: number;
  evaluationGoodCount: number;
  setEvaluationGoodCount: React.Dispatch<React.SetStateAction<number>>;
  commentCount: number;
  setCommentCount: React.Dispatch<React.SetStateAction<number>>;
  evaluationStayCount: number;
  setEvaluationStayCount: React.Dispatch<React.SetStateAction<number>>;
  novel: NovelProps;
  textIndex: number;
  titleId: string;
}

const ChildrenPanel: React.FC<ChildrenPanelProps> = ({
  childrenPanel,
  mainPanel,
  setMainPanel,
  setStartIndex,
  visibleTextCount,
  evaluationGoodCount,
  setEvaluationGoodCount,
  commentCount,
  setCommentCount,
  evaluationStayCount,
  setEvaluationStayCount,
  novel,
  textIndex,
  titleId,
}) => {
  const [isEditPostOpen, setIsEditPostOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setActiveIndex(0);
  }, [childrenPanel.length]);

  const handleCarouselChange = (now?: number) => {
    if (now !== undefined) {
      setActiveIndex(now);
    }
  };

  const handleClick = (sentenceId: number) => {
    const clickedSentence = childrenPanel.find(
      (sentence: Sentence) => sentence.sentenceId === sentenceId,
    );
    if (clickedSentence) {
      const defaultTitleId = '1';
      const targetTitleId = titleId || defaultTitleId;
      navigate(`/novelView/${targetTitleId}/${clickedSentence.sentenceId}`);
    } else {
      console.error(
        `Sentence with ID ${sentenceId} not found in childrenPanel`,
      );
      setError(`投稿ID ${sentenceId} が見つかりませんでした`);
    }
  };

  const handleCloseError = () => {
    setError(null);
  };

  const renderNovelCard = (panel: Sentence, index: number) => {
    return (
      <Box key={panel.sentenceId} sx={novelCardBoxStyle}>
        <NovelCard
          novel={panel}
          onClick={() => handleClick(panel.sentenceId)}
          key={index}
          index={index}
          textIndex={textIndex}
          evaluation_good_count={evaluationGoodCount}
          setEvaluation_good_count={setEvaluationGoodCount}
          comment_count={commentCount}
          setComment_count={setCommentCount}
          evaluation_stay_count={evaluationStayCount}
          setEvaluation_stay_count={setEvaluationStayCount}
          sentence={panel.sentence}
        />
      </Box>
    );
  };

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
      const response = await sentencesApi.postSentence(postSentence as any);

      if (!response || response.status !== 201 || !response.data?.main) {
        // 認証のためにresponseのチェックを追加
        throw new Error('Failed to create sentence');
      }

      // Convert API response Sentence to application Sentence type
      const apiSentence = response.data.main;
      const newSentence: Sentence = {
        title: '',
        mainCopy: '',
        overview: '',
        popular: false,
        newArrival: false,
        authorUserName: '',
        chips: [],
        tags: [],
        readerCount: 0,
        avatar: {
          src: '',
          alt: '',
          color: '',
          text: '',
        },
        sentenceId: apiSentence.sentenceId || 0,
        titleId: novel.titleId,
        sentenceUserCount: 0,
        sentenceHierarchyCount: 0,
        sentence: apiSentence.sentence || '',
        textIndex: 0,
        userId: 0,
        userName: '',
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

  // カルーセルを表示する条件を追加
  const showCarousel = childrenPanel && childrenPanel.length > 0;
  const showNavigation = childrenPanel.length > 1;

  return (
    <Box sx={mainBoxStyle}>
      <Box sx={innerBoxStyle}>
        {showCarousel ? (
          <Carousel
            autoPlay={false}
            index={activeIndex}
            onChange={handleCarouselChange}
            fullHeightHover={false}
            navButtonsProps={{
              style: carouselNavButtonStyle,
            }}
            navButtonsWrapperProps={{
              style: {
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 10,
              },
            }}
            NextIcon={<KeyboardArrowRightIcon />}
            PrevIcon={<KeyboardArrowLeftIcon />}
            navButtonsAlwaysVisible={showNavigation}
            navButtonsAlwaysInvisible={!showNavigation}
            indicators={showNavigation}
            indicatorIconButtonProps={{
              style: {
                padding: '5px',
                color: '#BDBDBD',
                margin: '0 2px',
              },
            }}
            activeIndicatorIconButtonProps={{
              style: {
                color: '#1976d2',
              },
            }}
            indicatorContainerProps={{
              style: {
                position: 'absolute',
                bottom: '10px',
                zIndex: 15,
                textAlign: 'center',
                width: '100%',
              },
            }}
          >
            {childrenPanel.map(renderNovelCard)}
          </Carousel>
        ) : (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              color: 'text.secondary',
              fontSize: '0.875rem',
            }}
          >
            まだ続きの投稿がありません
          </Box>
        )}
      </Box>

      <EditPost
        open={isEditPostOpen}
        onClose={() => setIsEditPostOpen(false)}
        onSubmit={handleSubmitPost}
        mainText={mainPanel[mainPanel.length - 1]?.sentence || ''}
        sentenceId={mainPanel[mainPanel.length - 1]?.sentenceId || 0}
      />

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={handleCloseError}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseError}
          severity='error'
          sx={{ width: '100%' }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ChildrenPanel;
