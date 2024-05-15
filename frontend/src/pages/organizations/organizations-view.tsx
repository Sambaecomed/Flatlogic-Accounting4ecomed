import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/organizations/organizationsSlice';
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

const OrganizationsView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { organizations } = useAppSelector((state) => state.organizations);

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
        <title>{getPageTitle('View organizations')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View organizations')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Name</p>
            <p>{organizations?.name}</p>
          </div>

          <FormField label='Multi Text' hasTextareaHeight>
            <textarea
              className={'w-full'}
              disabled
              value={organizations?.description}
            />
          </FormField>

          <>
            <p className={'block font-bold mb-2'}>Accounts Organization</p>
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
                    {organizations.accounts_organization &&
                      Array.isArray(organizations.accounts_organization) &&
                      organizations.accounts_organization.map((item: any) => (
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
              {!organizations?.accounts_organization?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Transactions Organization</p>
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
                    {organizations.transactions_organization &&
                      Array.isArray(organizations.transactions_organization) &&
                      organizations.transactions_organization.map(
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
              {!organizations?.transactions_organization?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>
              General_ledger Organization
            </p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {organizations.general_ledger_organization &&
                      Array.isArray(
                        organizations.general_ledger_organization,
                      ) &&
                      organizations.general_ledger_organization.map(
                        (item: any) => (
                          <tr
                            key={item.id}
                            onClick={() =>
                              router.push(
                                `/general_ledger/general_ledger-view/?id=${item.id}`,
                              )
                            }
                          >
                            <td data-label='name'>{item.name}</td>
                          </tr>
                        ),
                      )}
                  </tbody>
                </table>
              </div>
              {!organizations?.general_ledger_organization?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/organizations/organizations-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

OrganizationsView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_ORGANIZATIONS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default OrganizationsView;
