import { Outlet, Route, Routes } from 'react-router-dom';
import HeaderBar from '../components/header';
import { CompanyPage } from '../pages/company';
import NovelList from '../features/NovelList';
import { Footer } from '../components/footer';
import { NovelViewPresentation } from '../features/NovelView/NovelViewPresentation';
import { TermsPage } from '../pages/terms';
import { Box } from '@mui/material';

/**
 * ルーティング
 * TODO：URLは別途定義でも良いかも
 */
export const Routing = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<NovelList />} />
          <Route path='/account' />
          <Route path='/company' element={<CompanyPage />} />
          <Route path='/list' element={<NovelList />} />
          <Route path='/terms' element={<TermsPage />} />
          <Route
            path='/novelView'
            element={
              <NovelViewPresentation
                mainPanels={[]}
                parentPanel={{ sentence_id: 0, sentence: '' }}
                childrenPanel={{ sentence_id: 0, sentence: '' }}
                startIndexPrev={0}
                setStartIndexPrev={() => {}}
                evaluation_good_countPrev={0}
                setEvaluation_good_countPrev={() => {}}
                comment_countPrev={0}
                setComment_countPrev={() => {}}
                evaluation_stay_countPrev={0}
                setEvaluation_stay_countPrev={() => {}}
                startIndexNext={0}
                setStartIndexNext={() => {}}
                evaluation_good_countNext={0}
                setEvaluation_good_countNext={() => {}}
                comment_countNext={0}
                setComment_countNext={() => {}}
                evaluation_stay_countNext={0}
                setEvaluation_stay_countNext={() => {}}
              />
            }
          />
        </Route>
      </Routes>
    </>
  );
};

const Layout = () => {
  return (
    <Box display='flex' flexDirection='column' height='100%'>
      <HeaderBar />

      <main style={{ padding: '8px', flex: 1 }}>
        <Outlet />
      </main>

      <Footer />
    </Box>
  );
};
