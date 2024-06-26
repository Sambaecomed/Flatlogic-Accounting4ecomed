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

import { update, fetch } from '../../stores/transactions/transactionsSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

const EditTransactions = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    date: new Date(),

    description: '',

    amount: '',

    type: '',

    account: '',

    organization: '',

    transaction_category: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { transactions } = useAppSelector((state) => state.transactions);

  const { transactionsId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: transactionsId }));
  }, [transactionsId]);

  useEffect(() => {
    if (typeof transactions === 'object') {
      setInitialValues(transactions);
    }
  }, [transactions]);

  useEffect(() => {
    if (typeof transactions === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = transactions[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [transactions]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: transactionsId, data }));
    await router.push('/transactions/transactions-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit transactions')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit transactions'}
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
              <FormField label='Date'>
                <DatePicker
                  dateFormat='yyyy-MM-dd hh:mm'
                  showTimeSelect
                  selected={
                    initialValues.date
                      ? new Date(
                          dayjs(initialValues.date).format('YYYY-MM-DD hh:mm'),
                        )
                      : null
                  }
                  onChange={(date) =>
                    setInitialValues({ ...initialValues, date: date })
                  }
                />
              </FormField>

              <FormField label='Description' hasTextareaHeight>
                <Field
                  name='description'
                  as='textarea'
                  placeholder='Description'
                />
              </FormField>

              <FormField label='Amount'>
                <Field type='number' name='amount' placeholder='Amount' />
              </FormField>

              <FormField label='Type' labelFor='type'>
                <Field name='Type' id='Type' component='select'>
                  <option value='debit'>debit</option>

                  <option value='credit'>credit</option>
                </Field>
              </FormField>

              <FormField label='Account' labelFor='account'>
                <Field
                  name='account'
                  id='account'
                  component={SelectField}
                  options={initialValues.account}
                  itemRef={'accounts'}
                  showField={'name'}
                ></Field>
              </FormField>

              <FormField label='Organization' labelFor='organization'>
                <Field
                  name='organization'
                  id='organization'
                  component={SelectField}
                  options={initialValues.organization}
                  itemRef={'organizations'}
                  showField={'name'}
                ></Field>
              </FormField>

              <FormField
                label='Transaction Category'
                labelFor='transaction_category'
              >
                <Field
                  name='transaction_category'
                  id='transaction_category'
                  component={SelectField}
                  options={initialValues.transaction_category}
                  itemRef={'reference_transaction_types'}
                  showField={'id'}
                ></Field>
              </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type='submit' color='info' label='Submit' />
                <BaseButton type='reset' color='info' outline label='Reset' />
                <BaseButton
                  type='reset'
                  color='danger'
                  outline
                  label='Cancel'
                  onClick={() => router.push('/transactions/transactions-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditTransactions.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_TRANSACTIONS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditTransactions;
