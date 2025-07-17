import Box from '@mui/material/Box/Box';
import Typography from '@mui/material/Typography/Typography';
import { useState } from 'react';

export const TermsPresenter = () => {
  const [pdfError, setPdfError] = useState(false);

  const handlePdfError = () => {
    setPdfError(true);
  };

  return (
    <Box
      display='flex'
      flexDirection='column'
      sx={{ width: 1 }}
      gap='16px'
      height='100%'
    >
      <Typography variant='h4'>利用規約</Typography>
      <Box flex={1}>
        {!pdfError ? (
          <iframe
            src='/terms.pdf#toolbar=0&navpanes=0&view=FitH'
            width='100%'
            height='100%'
            style={{ border: 'none' }}
            onError={handlePdfError}
          />
        ) : (
          <Box
            sx={{
              padding: 3,
              border: '1px solid #ccc',
              borderRadius: 1,
              backgroundColor: '#f9f9f9',
              height: '100%',
              overflow: 'auto',
            }}
          >
            <Typography variant='h5' gutterBottom>
              Conovel利用規約
            </Typography>
            <Typography variant='body2' paragraph>
              2024年5月X日制定
            </Typography>
            <Typography variant='body1' paragraph>
              この利用規約(以下、「本規約」といいます。)は、合同会社TechnoKuRo(以下、「当社」といいます。)がウェブサービス「Conovel」上で提供するサービス(以下、「本サービス」といいます。)の利用条件を定めるものです。登録ユーザーの皆さま(以下、「ユーザー」といいます。)には、本規約に従って、本サービスをご利用いただきます。
            </Typography>
            <Typography variant='h6' gutterBottom>
              第1条（適用）
            </Typography>
            <Typography variant='body1' paragraph>
              1.
              本規約は、ユーザーと当社との間の本サービスの利用に関わる一切の関係に適用されるものとします。
            </Typography>
            <Typography variant='body1' paragraph>
              2.
              当社は本サービスに関し、本規約のほか、ご利用にあたってのルール等、各種の定め（以下、「個別規定」といいます。）をすることがあります。これら個別規定はその名称のいかんに関わらず、本規約の一部を構成するものとします。
            </Typography>
            <Typography variant='h6' gutterBottom>
              第2条（利用登録）
            </Typography>
            <Typography variant='body1' paragraph>
              1.
              本サービスにおいては、登録希望者が本規約に同意の上、当社の定める方法によって利用登録を申請し、当社がこれを承認することによって、利用登録が完了するものとします。
            </Typography>
            <Typography variant='body1' paragraph>
              2.
              当社は、利用登録の申請者に以下の事由があると判断した場合、利用登録の申請を承認しないことがあり、その理由については一切の開示義務を負わないものとします。
            </Typography>
            <Typography variant='body1' component='div' sx={{ pl: 2 }}>
              (1) 虚偽の事項を届け出た場合
              <br />
              (2) 本規約に違反したことがある者からの申請である場合
              <br />
              (3) その他、当社が利用登録を相当でないと判断した場合
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};
