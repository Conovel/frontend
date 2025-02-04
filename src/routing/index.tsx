import { Outlet, Route, Routes } from 'react-router-dom';
import HeaderBar from '../components/header';
import { CompanyPage } from '../pages/company';
import NovelList from '../features/NovelList';
import { Footer } from '../components/footer';
import { NovelViewPresentation } from '../features/NovelView/NovelViewPresentation';
import { TermsPage } from '../pages/terms';
import { Box } from '@mui/material';

// Define the MainPanel type to include sentence_id
interface mainPanel {
  sentence_id: number;
  sentence: string;
  userId: number;
  userName: string;
}

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
                mainPanel={{
                  sentence_id: 0,
                  sentence: '',
                  userId: 0,
                  userName: '',
                }}
                parentPanel={{
                  sentence_id: 0,
                  sentence: '',
                  userId: 0,
                  userName: '',
                }}
                childrenPanel={{
                  sentence_id: 0,
                  sentence: '',
                  userId: 0,
                  userName: '',
                }}
                start_index_parent={0}
                setStart_index_parent={() => {}}
                evaluation_good_count_parent={0}
                setEvaluation_good_count_parent={() => {}}
                comment_count_parent={0}
                setComment_count_parent={() => {}}
                evaluation_stay_count_parent={0}
                setEvaluation_stay_count_parent={() => {}}
                setStart_index_main={() => {}}
                start_index_main={0}
                visibleTextCount={0}
                textCount={0}
                evaluation_good_count_main={0}
                setEvaluation_good_count_main={() => {}}
                comment_count_main={0}
                setComment_count_main={() => {}}
                evaluation_stay_count_main={0}
                setEvaluation_stay_count_main={() => {}}
                start_index_children={0}
                setStart_index_children={() => {}}
                evaluation_good_count_children={0}
                setEvaluation_good_count_children={() => {}}
                comment_count_children={0}
                setComment_count_children={() => {}}
                evaluation_stay_count_children={0}
                setEvaluation_stay_count_children={() => {}}
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
