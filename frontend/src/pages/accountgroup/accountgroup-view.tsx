import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/accountgroup/accountgroupSlice';
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

const AccountgroupView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { accountgroup } = useAppSelector((state) => state.accountgroup);

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
        <title>{getPageTitle('View accountgroup')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View accountgroup')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Name</p>
            <p>{accountgroup?.name}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Description</p>
            <p>{accountgroup?.description}</p>
          </div>

          <>
            <p className={'block font-bold mb-2'}>Accounts Account Group</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Code</th>

                      <th>Name</th>

                      <th>Type</th>

                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {accountgroup.accounts_account_group &&
                      Array.isArray(accountgroup.accounts_account_group) &&
                      accountgroup.accounts_account_group.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/accounts/accounts-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='code'>{item.code}</td>

                          <td data-label='name'>{item.name}</td>

                          <td data-label='type'>{item.type}</td>

                          <td data-label='description'>{item.description}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!accountgroup?.accounts_account_group?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/accountgroup/accountgroup-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

AccountgroupView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_ACCOUNTGROUP'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default AccountgroupView;
