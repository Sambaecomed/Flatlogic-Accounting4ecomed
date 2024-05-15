import { mdiChartTimelineVariant, mdiUpload } from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';

import CardBox from '../../components/CardBox';
import LayoutAuthenticated from '../../layouts/Authenticated';
import SectionMain from '../../components/SectionMain';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import { getPageTitle } from '../../config';

import { Field, Form, Formik } from 'formik';
import FormField from '../../components/FormField';
import BaseDivider from '../../components/BaseDivider';
import BaseButtons from '../../components/BaseButtons';
import BaseButton from '../../components/BaseButton';
import FormCheckRadio from '../../components/FormCheckRadio';
import FormCheckRadioGroup from '../../components/FormCheckRadioGroup';
import FormFilePicker from '../../components/FormFilePicker';
import FormImagePicker from '../../components/FormImagePicker';
import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { SwitchField } from '../../components/SwitchField';
import { RichTextField } from '../../components/RichTextField';

import {
  update,
  fetch,
} from '../../stores/accounts_in_transactions/accounts_in_transactionsSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

const EditAccounts_in_transactions = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {};
  const [initialValues, setInitialValues] = useState(initVals);

  const { accounts_in_transactions } = useAppSelector(
    (state) => state.accounts_in_transactions,
  );

  const { accounts_in_transactionsId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: accounts_in_transactionsId }));
  }, [accounts_in_transactionsId]);

  useEffect(() => {
    if (typeof accounts_in_transactions === 'object') {
      setInitialValues(accounts_in_transactions);
    }
  }, [accounts_in_transactions]);

  useEffect(() => {
    if (typeof accounts_in_transactions === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = accounts_in_transactions[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [accounts_in_transactions]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: accounts_in_transactionsId, data }));
    await router.push(
      '/accounts_in_transactions/accounts_in_transactions-list',
    );
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit accounts_in_transactions')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit accounts_in_transactions'}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <BaseDivider />
              <BaseButtons>
                <BaseButton type='submit' color='info' label='Submit' />
                <BaseButton type='reset' color='info' outline label='Reset' />
                <BaseButton
                  type='reset'
                  color='danger'
                  outline
                  label='Cancel'
                  onClick={() =>
                    router.push(
                      '/accounts_in_transactions/accounts_in_transactions-list',
                    )
                  }
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditAccounts_in_transactions.getLayout = function getLayout(
  page: ReactElement,
) {
  return (
    <LayoutAuthenticated permission={'UPDATE_ACCOUNTS_IN_TRANSACTIONS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditAccounts_in_transactions;
