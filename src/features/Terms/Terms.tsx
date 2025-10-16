import { TermsPresenter } from './TermsPresenter';
import { OGP } from '../../components/ogp';

export const Terms = () => {
  return (
    <>
      <OGP
        title='利用規約'
        description='Conovelの利用規約です。'
        url='/terms'
      />
      <TermsPresenter />
    </>
  );
};
