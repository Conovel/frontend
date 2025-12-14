import { CompanyPresenter } from './CompanyPresenter';
import { OGP } from '../../components/ogp';

export const Company = () => {
  return (
    <>
      <OGP
        title='運営会社'
        description='Conovelの運営会社情報です。'
        url='/company'
      />
      <CompanyPresenter />
    </>
  );
};
