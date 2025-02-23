import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Box, Button } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Sentence, NovelProps } from '../../types/types';
import NovelCard from '../../components/novelCard/NovelCard';

interface ChildrenPanelProps {
  childrenPanel: Sentence[];
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
  const handleScroll = (direction: 'next' | 'prev') => {
    if (direction === 'next' && startIndex + visibleTextCount < textCount) {
      setStartIndex(startIndex + visibleTextCount);
    } else if (direction === 'prev' && startIndex > 0) {
      setStartIndex(startIndex - visibleTextCount);
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
          next={() => handleScroll('next')}
          prev={() => handleScroll('prev')}
          fullHeightHover={false}
          navButtonsProps={{
            style: {
              backgroundColor: '#BDBDBD',
              opacity: 0.5,
              width: '0.5vw',
              color: '#fff',
              borderRadius: 5,
            },
          }}
          navButtonsWrapperProps={{
            style: {
              position: 'absolute',
              top: '7vh',
              padding: '0 1vw',
            },
          }}
          NavButton={({ onClick, style, next, prev }) => (
            <Button
              onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
              style={style}
            >
              {next && <KeyboardArrowRightIcon />}
              {prev && <KeyboardArrowLeftIcon />}
            </Button>
          )}
        >
          {childrenPanel.map((panel, index) => (
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
          ))}
        </Carousel>
      </Box>
    </Box>
  );
};

export default ChildrenPanel;
