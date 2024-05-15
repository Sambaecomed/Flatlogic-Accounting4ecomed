import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/reference_transaction_types/reference_transaction_typesSlice';
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

const Reference_transaction_typesView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { reference_transaction_types } = useAppSelector(
    (state) => state.reference_transaction_types,
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
        <title>{getPageTitle('View reference_transaction_types')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View reference_transaction_types')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Description</p>
            <p>{reference_transaction_types?.description}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Type</p>
            <p>{reference_transaction_types?.type ?? 'No data'}</p>
          </div>

          <>
            <p className={'block font-bold mb-2'}>
              Transactions Transaction Category
            </p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Date</th>

                      <th>Description</th>

                      <th>Amount</th>

                      <th>Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reference_transaction_types.transactions_transaction_category &&
                      Array.isArray(
                        reference_transaction_types.transactions_transaction_category,
                      ) &&
                      reference_transaction_types.transactions_transaction_category.map(
                        (item: any) => (
                          <tr
                            key={item.id}
                            onClick={() =>
                              router.push(
                                `/transactions/transactions-view/?id=${item.id}`,
                              )
                            }
                          >
                            <td data-label='date'>
                              {dataFormatter.dateTimeFormatter(item.date)}
                            </td>

                            <td data-label='description'>{item.description}</td>

                            <td data-label='amount'>{item.amount}</td>

                            <td data-label='type'>{item.type}</td>
                          </tr>
                        ),
                      )}
                  </tbody>
                </table>
              </div>
              {!reference_transaction_types?.transactions_transaction_category
                ?.length && <div className={'text-center py-4'}>No data</div>}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() =>
              router.push(
                '/reference_transaction_types/reference_transaction_types-list',
              )
            }
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

Reference_transaction_typesView.getLayout = function getLayout(
  page: ReactElement,
) {
  return (
    <LayoutAuthenticated permission={'READ_REFERENCE_TRANSACTION_TYPES'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default Reference_transaction_typesView;
