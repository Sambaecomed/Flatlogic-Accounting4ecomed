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

import { update, fetch } from '../../stores/accounts/accountsSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

const EditAccounts = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    code: '',

    name: '',

    type: '',

    description: '',

    parent_account: '',

    organization: '',

    account_group: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { accounts } = useAppSelector((state) => state.accounts);

  const { accountsId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: accountsId }));
  }, [accountsId]);

  useEffect(() => {
    if (typeof accounts === 'object') {
      setInitialValues(accounts);
    }
  }, [accounts]);

  useEffect(() => {
    if (typeof accounts === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = accounts[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [accounts]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: accountsId, data }));
    await router.push('/accounts/accounts-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit accounts')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit accounts'}
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
              <FormField label='Code'>
                <Field name='code' placeholder='Code' />
              </FormField>

              <FormField label='Name'>
                <Field name='name' placeholder='Name' />
              </FormField>

              <FormField label='Type' labelFor='type'>
                <Field name='Type' id='Type' component='select'>
                  <option value='asset'>asset</option>

                  <option value='liability'>liability</option>

                  <option value='equity'>equity</option>

                  <option value='revenue'>revenue</option>

                  <option value='expense'>expense</option>
                </Field>
              </FormField>

              <FormField label='Description' hasTextareaHeight>
                <Field
                  name='description'
                  as='textarea'
                  placeholder='Description'
                />
              </FormField>

              <FormField label='ParentAccount' labelFor='parent_account'>
                <Field
                  name='parent_account'
                  id='parent_account'
                  component={SelectField}
                  options={initialValues.parent_account}
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

              <FormField label='Account Group' labelFor='account_group'>
                <Field
                  name='account_group'
                  id='account_group'
                  component={SelectField}
                  options={initialValues.account_group}
                  itemRef={'accountgroup'}
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
                  onClick={() => router.push('/accounts/accounts-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditAccounts.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_ACCOUNTS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditAccounts;
