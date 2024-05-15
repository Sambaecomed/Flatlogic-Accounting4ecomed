import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/parties_in_transactions/parties_in_transactionsSlice';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';
import LayoutAuthenticated from '../../layouts/Authenticated';
import { getPageTitle } from '../../config';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import SectionMain from '../../components/SectionMain';
import CardBox from '../../components/CardBox';
import BaseButton from '../../components/BaseButton';
import BaseDivider from '../../components/BaseDivider';
import { mdiChartTimelineVariant } from '@mdi/js';
import { SwitchField } from '../../components/SwitchField';
import FormField from '../../components/FormField';

const Parties_in_transactionsView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { parties_in_transactions } = useAppSelector(
    (state) => state.parties_in_transactions,
  );

  const { id } = router.query;

  function removeLastCharacter(str) {
    console.log(str, `str`);
    return str.slice(0, -1);
  }

  useEffect(() => {
    dispatch(fetch({ id }));
  }, [dispatch, id]);

  return (
    <>
      <Head>
        <title>{getPageTitle('View parties_in_transactions')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View parties_in_transactions')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() =>
              router.push(
                '/parties_in_transactions/parties_in_transactions-list',
              )
            }
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

Parties_in_transactionsView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_PARTIES_IN_TRANSACTIONS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default Parties_in_transactionsView;
