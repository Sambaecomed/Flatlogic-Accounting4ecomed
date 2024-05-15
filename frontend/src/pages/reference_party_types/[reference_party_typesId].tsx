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
} from '../../stores/reference_party_types/reference_party_typesSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

const EditReference_party_types = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    type: '',

    description: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { reference_party_types } = useAppSelector(
    (state) => state.reference_party_types,
  );

  const { reference_party_typesId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: reference_party_typesId }));
  }, [reference_party_typesId]);

  useEffect(() => {
    if (typeof reference_party_types === 'object') {
      setInitialValues(reference_party_types);
    }
  }, [reference_party_types]);

  useEffect(() => {
    if (typeof reference_party_types === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = reference_party_types[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [reference_party_types]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: reference_party_typesId, data }));
    await router.push('/reference_party_types/reference_party_types-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit reference_party_types')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit reference_party_types'}
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
              <FormField label='Type'>
                <Field name='type' placeholder='Type' />
              </FormField>

              <FormField label='Description'>
                <Field name='description' placeholder='Description' />
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
                      '/reference_party_types/reference_party_types-list',
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

EditReference_party_types.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_REFERENCE_PARTY_TYPES'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditReference_party_types;
