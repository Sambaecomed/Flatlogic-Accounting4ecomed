const db = require('../models');
const Users = db.users;

const Accounts = db.accounts;

const Organizations = db.organizations;

const Transactions = db.transactions;

const ReferenceTransactionTypes = db.reference_transaction_types;

const ReferencePartyTypes = db.reference_party_types;

const Accountgroup = db.accountgroup;

const GeneralLedger = db.general_ledger;

const Journals = db.journals;

const PartiesInTransactions = db.parties_in_transactions;

const AccountsInTransactions = db.accounts_in_transactions;

const AccountsData = [
  {
    code: '1001',

    name: 'Cash',

    type: 'liability',

    description: "Company's cash balance",

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    code: '2001',

    name: 'Accounts Receivable',

    type: 'revenue',

    description: 'Amounts owed by customers',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    code: '3001',

    name: 'Sales Revenue',

    type: 'asset',

    description: 'Income from sales activities',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    code: '4001',

    name: 'Supplies',

    type: 'liability',

    description: 'Cost of supplies',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    code: '5001',

    name: 'Equipment',

    type: 'revenue',

    description: 'Value of owned equipment',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

const OrganizationsData = [
  {
    name: 'Global Tech Innovations',

    description: 'A leading technology solutions provider.',
  },

  {
    name: 'Eco Friendly Manufacturing',

    description: 'Sustainable and eco-conscious manufacturing company.',
  },

  {
    name: 'Health & Wellness Retail',

    description:
      'Retailer specializing in health, wellness, and organic products.',
  },

  {
    name: 'Fast Finance Solutions',

    description:
      'Financial services firm offering quick and reliable solutions.',
  },

  {
    name: 'Creative Media Agency',

    description:
      'A creative agency focused on digital media and marketing solutions.',
  },
];

const TransactionsData = [
  {
    date: new Date('2023-01-01T09:00:00Z'),

    description: 'Laptop purchase',

    amount: 1200,

    type: 'credit',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    date: new Date('2023-02-15T10:00:00Z'),

    description: 'Client payment received',

    amount: 5000,

    type: 'credit',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    date: new Date('2023-03-20T11:30:00Z'),

    description: 'Office rent payment',

    amount: 2000,

    type: 'credit',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    date: new Date('2023-04-05T14:45:00Z'),

    description: 'Sales income',

    amount: 7500,

    type: 'credit',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    date: new Date('2023-05-10T16:00:00Z'),

    description: 'Purchase of marketing materials',

    amount: 1200,

    type: 'credit',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

const ReferenceTransactionTypesData = [
  {
    description: 'Edward O. Wilson',

    type: 'Transaction Type 3',
  },

  {
    description: 'Max Planck',

    type: 'Transaction Type 2',
  },

  {
    description: 'Murray Gell-Mann',

    type: 'Transaction Type 3',
  },

  {
    description: 'John von Neumann',

    type: 'Transaction Type 2',
  },

  {
    description: 'John Bardeen',

    type: 'Transaction Type 2',
  },
];

const ReferencePartyTypesData = [
  {
    type: 'Ernst Mayr',

    description: 'Alexander Fleming',
  },

  {
    type: 'Christiaan Huygens',

    description: 'Lucretius',
  },

  {
    type: 'Leonard Euler',

    description: 'John von Neumann',
  },

  {
    type: 'Lucretius',

    description: 'Marie Curie',
  },

  {
    type: 'Paul Ehrlich',

    description: 'Ernest Rutherford',
  },
];

const AccountgroupData = [
  {
    name: 'Enrico Fermi',

    description: 'Max von Laue',
  },

  {
    name: 'Gustav Kirchhoff',

    description: 'Jean Baptiste Lamarck',
  },

  {
    name: 'Paul Ehrlich',

    description: 'Marcello Malpighi',
  },

  {
    name: 'Alfred Kinsey',

    description: 'Edward O. Wilson',
  },

  {
    name: 'Archimedes',

    description: 'Alfred Kinsey',
  },
];

const GeneralLedgerData = [
  {
    name: 'John von Neumann',

    // type code here for "relation_one" field
  },

  {
    name: 'Neils Bohr',

    // type code here for "relation_one" field
  },

  {
    name: 'Sigmund Freud',

    // type code here for "relation_one" field
  },

  {
    name: 'Enrico Fermi',

    // type code here for "relation_one" field
  },

  {
    name: 'John Bardeen',

    // type code here for "relation_one" field
  },
];

const JournalsData = [
  {
    name: 'John von Neumann',
  },

  {
    name: 'B. F. Skinner',
  },

  {
    name: 'John Bardeen',
  },

  {
    name: 'Karl Landsteiner',
  },

  {
    name: 'Werner Heisenberg',
  },
];

const PartiesInTransactionsData = [{}, {}, {}, {}, {}];

const AccountsInTransactionsData = [{}, {}, {}, {}, {}];

// Similar logic for "relation_many"

async function associateAccountWithParent_account() {
  const relatedParent_account0 = await Accounts.findOne({
    offset: Math.floor(Math.random() * (await Accounts.count())),
  });
  const Account0 = await Accounts.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Account0?.setParent_account) {
    await Account0.setParent_account(relatedParent_account0);
  }

  const relatedParent_account1 = await Accounts.findOne({
    offset: Math.floor(Math.random() * (await Accounts.count())),
  });
  const Account1 = await Accounts.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Account1?.setParent_account) {
    await Account1.setParent_account(relatedParent_account1);
  }

  const relatedParent_account2 = await Accounts.findOne({
    offset: Math.floor(Math.random() * (await Accounts.count())),
  });
  const Account2 = await Accounts.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Account2?.setParent_account) {
    await Account2.setParent_account(relatedParent_account2);
  }

  const relatedParent_account3 = await Accounts.findOne({
    offset: Math.floor(Math.random() * (await Accounts.count())),
  });
  const Account3 = await Accounts.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Account3?.setParent_account) {
    await Account3.setParent_account(relatedParent_account3);
  }

  const relatedParent_account4 = await Accounts.findOne({
    offset: Math.floor(Math.random() * (await Accounts.count())),
  });
  const Account4 = await Accounts.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Account4?.setParent_account) {
    await Account4.setParent_account(relatedParent_account4);
  }
}

async function associateAccountWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Account0 = await Accounts.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Account0?.setOrganization) {
    await Account0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Account1 = await Accounts.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Account1?.setOrganization) {
    await Account1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Account2 = await Accounts.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Account2?.setOrganization) {
    await Account2.setOrganization(relatedOrganization2);
  }

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Account3 = await Accounts.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Account3?.setOrganization) {
    await Account3.setOrganization(relatedOrganization3);
  }

  const relatedOrganization4 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Account4 = await Accounts.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Account4?.setOrganization) {
    await Account4.setOrganization(relatedOrganization4);
  }
}

async function associateAccountWithAccount_group() {
  const relatedAccount_group0 = await Accountgroup.findOne({
    offset: Math.floor(Math.random() * (await Accountgroup.count())),
  });
  const Account0 = await Accounts.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Account0?.setAccount_group) {
    await Account0.setAccount_group(relatedAccount_group0);
  }

  const relatedAccount_group1 = await Accountgroup.findOne({
    offset: Math.floor(Math.random() * (await Accountgroup.count())),
  });
  const Account1 = await Accounts.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Account1?.setAccount_group) {
    await Account1.setAccount_group(relatedAccount_group1);
  }

  const relatedAccount_group2 = await Accountgroup.findOne({
    offset: Math.floor(Math.random() * (await Accountgroup.count())),
  });
  const Account2 = await Accounts.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Account2?.setAccount_group) {
    await Account2.setAccount_group(relatedAccount_group2);
  }

  const relatedAccount_group3 = await Accountgroup.findOne({
    offset: Math.floor(Math.random() * (await Accountgroup.count())),
  });
  const Account3 = await Accounts.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Account3?.setAccount_group) {
    await Account3.setAccount_group(relatedAccount_group3);
  }

  const relatedAccount_group4 = await Accountgroup.findOne({
    offset: Math.floor(Math.random() * (await Accountgroup.count())),
  });
  const Account4 = await Accounts.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Account4?.setAccount_group) {
    await Account4.setAccount_group(relatedAccount_group4);
  }
}

async function associateTransactionWithAccount() {
  const relatedAccount0 = await Accounts.findOne({
    offset: Math.floor(Math.random() * (await Accounts.count())),
  });
  const Transaction0 = await Transactions.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Transaction0?.setAccount) {
    await Transaction0.setAccount(relatedAccount0);
  }

  const relatedAccount1 = await Accounts.findOne({
    offset: Math.floor(Math.random() * (await Accounts.count())),
  });
  const Transaction1 = await Transactions.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Transaction1?.setAccount) {
    await Transaction1.setAccount(relatedAccount1);
  }

  const relatedAccount2 = await Accounts.findOne({
    offset: Math.floor(Math.random() * (await Accounts.count())),
  });
  const Transaction2 = await Transactions.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Transaction2?.setAccount) {
    await Transaction2.setAccount(relatedAccount2);
  }

  const relatedAccount3 = await Accounts.findOne({
    offset: Math.floor(Math.random() * (await Accounts.count())),
  });
  const Transaction3 = await Transactions.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Transaction3?.setAccount) {
    await Transaction3.setAccount(relatedAccount3);
  }

  const relatedAccount4 = await Accounts.findOne({
    offset: Math.floor(Math.random() * (await Accounts.count())),
  });
  const Transaction4 = await Transactions.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Transaction4?.setAccount) {
    await Transaction4.setAccount(relatedAccount4);
  }
}

async function associateTransactionWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Transaction0 = await Transactions.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Transaction0?.setOrganization) {
    await Transaction0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Transaction1 = await Transactions.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Transaction1?.setOrganization) {
    await Transaction1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Transaction2 = await Transactions.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Transaction2?.setOrganization) {
    await Transaction2.setOrganization(relatedOrganization2);
  }

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Transaction3 = await Transactions.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Transaction3?.setOrganization) {
    await Transaction3.setOrganization(relatedOrganization3);
  }

  const relatedOrganization4 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Transaction4 = await Transactions.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Transaction4?.setOrganization) {
    await Transaction4.setOrganization(relatedOrganization4);
  }
}

async function associateTransactionWithTransaction_category() {
  const relatedTransaction_category0 = await ReferenceTransactionTypes.findOne({
    offset: Math.floor(
      Math.random() * (await ReferenceTransactionTypes.count()),
    ),
  });
  const Transaction0 = await Transactions.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Transaction0?.setTransaction_category) {
    await Transaction0.setTransaction_category(relatedTransaction_category0);
  }

  const relatedTransaction_category1 = await ReferenceTransactionTypes.findOne({
    offset: Math.floor(
      Math.random() * (await ReferenceTransactionTypes.count()),
    ),
  });
  const Transaction1 = await Transactions.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Transaction1?.setTransaction_category) {
    await Transaction1.setTransaction_category(relatedTransaction_category1);
  }

  const relatedTransaction_category2 = await ReferenceTransactionTypes.findOne({
    offset: Math.floor(
      Math.random() * (await ReferenceTransactionTypes.count()),
    ),
  });
  const Transaction2 = await Transactions.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Transaction2?.setTransaction_category) {
    await Transaction2.setTransaction_category(relatedTransaction_category2);
  }

  const relatedTransaction_category3 = await ReferenceTransactionTypes.findOne({
    offset: Math.floor(
      Math.random() * (await ReferenceTransactionTypes.count()),
    ),
  });
  const Transaction3 = await Transactions.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Transaction3?.setTransaction_category) {
    await Transaction3.setTransaction_category(relatedTransaction_category3);
  }

  const relatedTransaction_category4 = await ReferenceTransactionTypes.findOne({
    offset: Math.floor(
      Math.random() * (await ReferenceTransactionTypes.count()),
    ),
  });
  const Transaction4 = await Transactions.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Transaction4?.setTransaction_category) {
    await Transaction4.setTransaction_category(relatedTransaction_category4);
  }
}

async function associateGeneralLedgerWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const GeneralLedger0 = await GeneralLedger.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (GeneralLedger0?.setOrganization) {
    await GeneralLedger0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const GeneralLedger1 = await GeneralLedger.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (GeneralLedger1?.setOrganization) {
    await GeneralLedger1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const GeneralLedger2 = await GeneralLedger.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (GeneralLedger2?.setOrganization) {
    await GeneralLedger2.setOrganization(relatedOrganization2);
  }

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const GeneralLedger3 = await GeneralLedger.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (GeneralLedger3?.setOrganization) {
    await GeneralLedger3.setOrganization(relatedOrganization3);
  }

  const relatedOrganization4 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const GeneralLedger4 = await GeneralLedger.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (GeneralLedger4?.setOrganization) {
    await GeneralLedger4.setOrganization(relatedOrganization4);
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Accounts.bulkCreate(AccountsData);

    await Organizations.bulkCreate(OrganizationsData);

    await Transactions.bulkCreate(TransactionsData);

    await ReferenceTransactionTypes.bulkCreate(ReferenceTransactionTypesData);

    await ReferencePartyTypes.bulkCreate(ReferencePartyTypesData);

    await Accountgroup.bulkCreate(AccountgroupData);

    await GeneralLedger.bulkCreate(GeneralLedgerData);

    await Journals.bulkCreate(JournalsData);

    await PartiesInTransactions.bulkCreate(PartiesInTransactionsData);

    await AccountsInTransactions.bulkCreate(AccountsInTransactionsData);

    await Promise.all([
      // Similar logic for "relation_many"

      await associateAccountWithParent_account(),

      await associateAccountWithOrganization(),

      await associateAccountWithAccount_group(),

      await associateTransactionWithAccount(),

      await associateTransactionWithOrganization(),

      await associateTransactionWithTransaction_category(),

      await associateGeneralLedgerWithOrganization(),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('accounts', null, {});

    await queryInterface.bulkDelete('organizations', null, {});

    await queryInterface.bulkDelete('transactions', null, {});

    await queryInterface.bulkDelete('reference_transaction_types', null, {});

    await queryInterface.bulkDelete('reference_party_types', null, {});

    await queryInterface.bulkDelete('accountgroup', null, {});

    await queryInterface.bulkDelete('general_ledger', null, {});

    await queryInterface.bulkDelete('journals', null, {});

    await queryInterface.bulkDelete('parties_in_transactions', null, {});

    await queryInterface.bulkDelete('accounts_in_transactions', null, {});
  },
};
