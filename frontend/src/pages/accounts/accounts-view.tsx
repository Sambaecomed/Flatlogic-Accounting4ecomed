import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/accounts/accountsSlice';
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

const AccountsView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { accounts } = useAppSelector((state) => state.accounts);

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
        <title>{getPageTitle('View accounts')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View accounts')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Code</p>
            <p>{accounts?.code}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Name</p>
            <p>{accounts?.name}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Type</p>
            <p>{accounts?.type ?? 'No data'}</p>
          </div>

          <FormField label='Multi Text' hasTextareaHeight>
            <textarea
              className={'w-full'}
              disabled
              value={accounts?.description}
            />
          </FormField>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>ParentAccount</p>

            <p>{accounts?.parent_account?.name ?? 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Organization</p>

            <p>{accounts?.organization?.name ?? 'No data'}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Account Group</p>

            <p>{accounts?.account_group?.id ?? 'No data'}</p>
          </div>

          <>
            <p className={'block font-bold mb-2'}>Transactions Account</p>
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
                    {accounts.transactions_account &&
                      Array.isArray(accounts.transactions_account) &&
                      accounts.transactions_account.map((item: any) => (
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
                      ))}
                  </tbody>
                </table>
              </div>
              {!accounts?.transactions_account?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/accounts/accounts-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

AccountsView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_ACCOUNTS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default AccountsView;
