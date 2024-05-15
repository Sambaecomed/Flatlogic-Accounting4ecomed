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
} from '../../stores/reference_transaction_types/reference_transaction_typesSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

const EditReference_transaction_types = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    description: '',

    type: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { reference_transaction_types } = useAppSelector(
    (state) => state.reference_transaction_types,
  );

  const { reference_transaction_typesId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: reference_transaction_typesId }));
  }, [reference_transaction_typesId]);

  useEffect(() => {
    if (typeof reference_transaction_types === 'object') {
      setInitialValues(reference_transaction_types);
    }
  }, [reference_transaction_types]);

  useEffect(() => {
    if (typeof reference_transaction_types === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = reference_transaction_types[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [reference_transaction_types]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: reference_transaction_typesId, data }));
    await router.push(
      '/reference_transaction_types/reference_transaction_types-list',
    );
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit reference_transaction_types')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit reference_transaction_types'}
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
              <FormField label='Description'>
                <Field name='description' placeholder='Description' />
              </FormField>

              <FormField label='Type' labelFor='type'>
                <Field name='Type' id='Type' component='select'>
                  <option value='Transaction Type 1'>Transaction Type 1</option>

                  <option value='Transaction Type 2'>Transaction Type 2</option>

                  <option value='Transaction Type 3'>Transaction Type 3</option>
                </Field>
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
                  onClick={() =>
                    router.push(
                      '/reference_transaction_types/reference_transaction_types-list',
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

EditReference_transaction_types.getLayout = function getLayout(
  page: ReactElement,
) {
  return (
    <LayoutAuthenticated permission={'UPDATE_REFERENCE_TRANSACTION_TYPES'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditReference_transaction_types;
