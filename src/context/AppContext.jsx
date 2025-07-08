import React, { createContext, useContext, useReducer, useEffect } from 'react';

const AppContext = createContext();

const initialState = {
  currentUser: null,
  userRole: null,
  isAuthenticated: false,
  orders: [
    {
      id: 'ORD001',
      customerId: 'CUST001',
      partyName: 'Green Valley Farms',
      productType: 'Poultry Feed',
      item: 'Broiler Starter',
      quantity: 500,
      totalAmount: 25000,
      advancePaid: 15000,
      dueAmount: 10000,
      dueDate: '2024-01-15',
      paymentMode: 'UPI',
      status: 'Processing',
      orderDate: '2024-01-01',
      notes: 'Urgent delivery required',
      assignedSalesman: 'EMP003',
      warehouse: 'WH001'
    },
    {
      id: 'ORD002',
      customerId: 'CUST001',
      partyName: 'Green Valley Farms',
      productType: 'Poultry Feed',
      item: 'Broiler Starter',
      quantity: 500,
      totalAmount: 25000,
      advancePaid: 15000,
      dueAmount: 10000,
      dueDate: '2024-01-15',
      paymentMode: 'UPI',
      status: 'Processing',
      orderDate: '2024-01-01',
      notes: 'Urgent delivery required',
      assignedSalesman: 'EMP003',
      warehouse: 'WH001'
    },
    {
      id: 'ORD003',
      customerId: 'CUST001',
      partyName: 'Green Valley Farms',
      productType: 'Poultry Feed',
      item: 'Broiler Starter',
      quantity: 500,
      totalAmount: 25000,
      advancePaid: 15000,
      dueAmount: 10000,
      dueDate: '2024-01-15',
      paymentMode: 'UPI',
      status: 'Processing',
      orderDate: '2024-01-01',
      notes: 'Urgent delivery required',
      assignedSalesman: 'EMP003',
      warehouse: 'WH001'
    },
    {
      id: 'ORD004',
      customerId: 'CUST001',
      partyName: 'Green Valley Farms',
      productType: 'Poultry Feed',
      item: 'Broiler Starter',
      quantity: 500,
      totalAmount: 25000,
      advancePaid: 15000,
      dueAmount: 10000,
      dueDate: '2024-01-15',
      paymentMode: 'UPI',
      status: 'Processing',
      orderDate: '2024-01-01',
      notes: 'Urgent delivery required',
      assignedSalesman: 'EMP003',
      warehouse: 'WH001'
    },
    {
      id: 'ORD005',
      customerId: 'CUST001',
      partyName: 'Green Valley Farms',
      productType: 'Poultry Feed',
      item: 'Broiler Starter',
      quantity: 500,
      totalAmount: 25000,
      advancePaid: 15000,
      dueAmount: 10000,
      dueDate: '2024-01-15',
      paymentMode: 'UPI',
      status: 'Processing',
      orderDate: '2024-01-01',
      notes: 'Urgent delivery required',
      assignedSalesman: 'EMP003',
      warehouse: 'WH001'
    },
  {
    id: 'ORD006',
    customerId: 'CUST006',
    partyName: 'Shiv Dairy',
    productType: 'Cattle Feed',
    item: 'Silage',
    quantity: 1200,
    totalAmount: 72000,
    advancePaid: 40000,
    dueAmount: 32000,
    dueDate: '2024-02-01',
    paymentMode: 'Bank Transfer',
    status: 'Delivered',
    orderDate: '2024-01-10',
    notes: 'Preferred warehouse WH003',
    assignedSalesman: 'EMP005',
    warehouse: 'WH003',
  },
  {
    id: 'ORD007',
    customerId: 'CUST007',
    partyName: 'Organic Poultry Ltd',
    productType: 'Poultry Feed',
    item: 'Grower Mash',
    quantity: 900,
    totalAmount: 45000,
    advancePaid: 25000,
    dueAmount: 20000,
    dueDate: '2024-02-05',
    paymentMode: 'UPI',
    status: 'Processing',
    orderDate: '2024-01-11',
    notes: '',
    assignedSalesman: 'EMP002',
    warehouse: 'WH001',
  },
  {
    id: 'ORD008',
    customerId: 'CUST008',
    partyName: 'Golden Grass Dairy',
    productType: 'Cattle Feed',
    item: 'Fat Booster',
    quantity: 400,
    totalAmount: 24000,
    advancePaid: 12000,
    dueAmount: 12000,
    dueDate: '2024-01-30',
    paymentMode: 'Cash',
    status: 'Confirmed',
    orderDate: '2024-01-12',
    notes: 'Pay before due date',
    assignedSalesman: 'EMP003',
    warehouse: 'WH002',
  },
  {
    id: 'ORD009',
    customerId: 'CUST009',
    partyName: 'Sunbeam Farm',
    productType: 'Poultry Feed',
    item: 'Layer Mash',
    quantity: 600,
    totalAmount: 30000,
    advancePaid: 15000,
    dueAmount: 15000,
    dueDate: '2024-01-18',
    paymentMode: 'Cheque',
    status: 'Processing',
    orderDate: '2024-01-04',
    notes: '',
    assignedSalesman: 'EMP004',
    warehouse: 'WH003',
  },
  {
    id: 'ORD010',
    customerId: 'CUST010',
    partyName: 'Rising Star Farms',
    productType: 'Cattle Feed',
    item: 'Protein Rich Feed',
    quantity: 850,
    totalAmount: 51000,
    advancePaid: 25000,
    dueAmount: 26000,
    dueDate: '2024-02-10',
    paymentMode: 'UPI',
    status: 'Delivered',
    orderDate: '2024-01-13',
    notes: '',
    assignedSalesman: 'EMP005',
    warehouse: 'WH001',
  },

  // 10 more:
  {
    id: 'ORD011',
    customerId: 'CUST011',
    partyName: 'Fresh Fields',
    productType: 'Poultry Feed',
    item: 'Broiler Finisher',
    quantity: 750,
    totalAmount: 37500,
    advancePaid: 15000,
    dueAmount: 22500,
    dueDate: '2024-02-01',
    paymentMode: 'Cash',
    status: 'Processing',
    orderDate: '2024-01-14',
    notes: '',
    assignedSalesman: 'EMP001',
    warehouse: 'WH002',
  },
  {
    id: 'ORD012',
    customerId: 'CUST012',
    partyName: 'Silverline Dairy',
    productType: 'Cattle Feed',
    item: 'Digestive Mix',
    quantity: 450,
    totalAmount: 27000,
    advancePaid: 13000,
    dueAmount: 14000,
    dueDate: '2024-01-27',
    paymentMode: 'Bank Transfer',
    status: 'Confirmed',
    orderDate: '2024-01-09',
    notes: 'Add to CRM pipeline',
    assignedSalesman: 'EMP003',
    warehouse: 'WH003',
  },
  {
    id: 'ORD013',
    customerId: 'CUST013',
    partyName: 'Nature Growers',
    productType: 'Poultry Feed',
    item: 'Pre-Starter',
    quantity: 650,
    totalAmount: 32500,
    advancePaid: 10000,
    dueAmount: 22500,
    dueDate: '2024-01-19',
    paymentMode: 'UPI',
    status: 'Delivered',
    orderDate: '2024-01-15',
    notes: '',
    assignedSalesman: 'EMP004',
    warehouse: 'WH001',
  },
  {
    id: 'ORD014',
    customerId: 'CUST014',
    partyName: 'Happy Hooves Dairy',
    productType: 'Cattle Feed',
    item: 'Balanced Ration',
    quantity: 700,
    totalAmount: 42000,
    advancePaid: 22000,
    dueAmount: 20000,
    dueDate: '2024-01-28',
    paymentMode: 'Cash',
    status: 'Processing',
    orderDate: '2024-01-16',
    notes: '',
    assignedSalesman: 'EMP002',
    warehouse: 'WH002',
  },
  {
    id: 'ORD015',
    customerId: 'CUST015',
    partyName: 'Bharat Poultry',
    productType: 'Poultry Feed',
    item: 'Grower Crumbs',
    quantity: 950,
    totalAmount: 47500,
    advancePaid: 17500,
    dueAmount: 30000,
    dueDate: '2024-02-02',
    paymentMode: 'Bank Transfer',
    status: 'Confirmed',
    orderDate: '2024-01-17',
    notes: '',
    assignedSalesman: 'EMP005',
    warehouse: 'WH003',
  },
  {
    id: 'ORD016',
    customerId: 'CUST016',
    partyName: 'Evergreen Dairy',
    productType: 'Cattle Feed',
    item: 'Energy Booster',
    quantity: 600,
    totalAmount: 36000,
    advancePaid: 15000,
    dueAmount: 21000,
    dueDate: '2024-01-29',
    paymentMode: 'UPI',
    status: 'Delivered',
    orderDate: '2024-01-18',
    notes: '',
    assignedSalesman: 'EMP001',
    warehouse: 'WH001',
  },
  {
    id: 'ORD017',
    customerId: 'CUST017',
    partyName: 'Trikuta Livestock',
    productType: 'Cattle Feed',
    item: 'Dairy Pellet',
    quantity: 1000,
    totalAmount: 60000,
    advancePaid: 30000,
    dueAmount: 30000,
    dueDate: '2024-01-25',
    paymentMode: 'Cheque',
    status: 'Confirmed',
    orderDate: '2024-01-19',
    notes: 'Follow-up in 10 days',
    assignedSalesman: 'EMP004',
    warehouse: 'WH002',
  },
  {
    id: 'ORD018',
    customerId: 'CUST018',
    partyName: 'AgriBoost Poultry',
    productType: 'Poultry Feed',
    item: 'Starter Feed',
    quantity: 700,
    totalAmount: 35000,
    advancePaid: 20000,
    dueAmount: 15000,
    dueDate: '2024-02-04',
    paymentMode: 'Bank Transfer',
    status: 'Processing',
    orderDate: '2024-01-20',
    notes: '',
    assignedSalesman: 'EMP002',
    warehouse: 'WH003',
  },
  {
    id: 'ORD019',
    customerId: 'CUST019',
    partyName: 'Sunshine Farms',
    productType: 'Cattle Feed',
    item: 'Dairy Concentrate',
    quantity: 1100,
    totalAmount: 66000,
    advancePaid: 35000,
    dueAmount: 31000,
    dueDate: '2024-02-08',
    paymentMode: 'Cash',
    status: 'Delivered',
    orderDate: '2024-01-21',
    notes: '',
    assignedSalesman: 'EMP003',
    warehouse: 'WH001',
  },
  {
    id: 'ORD020',
    customerId: 'CUST020',
    partyName: 'Royal Livestock',
    productType: 'Cattle Feed',
    item: 'Complete Ration',
    quantity: 950,
    totalAmount: 57000,
    advancePaid: 27000,
    dueAmount: 30000,
    dueDate: '2024-02-12',
    paymentMode: 'Cheque',
    status: 'Confirmed',
    orderDate: '2024-01-22',
    notes: '',
    assignedSalesman: 'EMP005',
    warehouse: 'WH002',
  }


  ],
  customers: [
    {
      id: 'CUST001',
      name: 'Rajesh Kumar',
      mobile: '9876543210',
      partyName: 'Green Valley Farms',
      address: 'Village Kharkhoda, Sonipat',
      totalOrders: 15,
      totalAdvancePaid: 150000,
      totalDuePending: 50000
    },
    {
      id: 'CUST002',
      name: 'Priya Sharma',
      mobile: '9876543211',
      partyName: 'Sunrise Dairy',
      address: 'Sector 12, Gurgaon',
      totalOrders: 8,
      totalAdvancePaid: 80000,
      totalDuePending: 28000
    }
  ],
  employees: [
    {
      id: 'EMP001',
      name: 'Admin User',
      email: 'admin@feedmanagement.com',
      role: 'admin',
      mobile: '9876543200',
      status: 'active'
    },
    {
      id: 'EMP002',
      name: 'Sales Manager',
      email: 'sales@feedmanagement.com',
      role: 'sales_manager',
      mobile: '9876543201',
      status: 'active'
    },
    {
      id: 'EMP003',
      name: 'Salesman One',
      email: 'salesman@feedmanagement.com',
      role: 'salesman',
      mobile: '9876543202',
      status: 'active',
      assignedParties: ['CUST001', 'CUST002']
    }
  ],
  products: [
    {
      id: 'PROD001',
      type: 'Poultry Feed',
      items: [
        { name: 'Broiler Starter', rate: 50, unit: 'kg' },
        { name: 'Broiler Finisher', rate: 48, unit: 'kg' },
        { name: 'Layer Feed', rate: 45, unit: 'kg' }
      ]
    },
    {
      id: 'PROD002',
      type: 'Cattle Feed',
      items: [
        { name: 'Dairy Concentrate', rate: 60, unit: 'kg' },
        { name: 'Calf Starter', rate: 65, unit: 'kg' },
        { name: 'Buffalo Feed', rate: 55, unit: 'kg' }
      ]
    }
  ],
  production: [
    {
      id: 'PROD_ENTRY001',
      date: '2024-01-01',
      product: 'Broiler Starter',
      quantity: 1000,
      plantHead: 'EMP004'
    },
    {
      id: 'PROD_ENTRY002',
      date: '2024-01-02',
      product: 'Dairy Concentrate',
      quantity: 1200,
      plantHead: 'EMP004'
    }
  ],
  warehouses: [
    {
      id: 'WH001',
      name: 'Main Warehouse',
      location: 'Sonipat',
      capacity: 10000,
      currentStock: 7500
    },
    {
      id: 'WH002',
      name: 'Regional Warehouse',
      location: 'Gurgaon',
      capacity: 5000,
      currentStock: 3200
    }
  ],
  invoices: [
    {
      id: 'INV001',
      orderId: 'ORD001',
      amount: 15000,
      type: 'advance',
      date: '2024-01-01',
      status: 'paid'
    }
  ],
  otpVerification: {
    mobile: null,
    otp: null,
    verified: false
  }
};

function appReducer(state, action) {
  switch (action.type) {
    case 'LOGIN_USER':
      return {
        ...state,
        currentUser: action.payload.user,
        userRole: action.payload.role,
        isAuthenticated: true
      };
    case 'LOGOUT_USER':
      return {
        ...state,
        currentUser: null,
        userRole: null,
        isAuthenticated: false
      };
    case 'SEND_OTP':
      return {
        ...state,
        otpVerification: {
          mobile: action.payload.mobile,
          otp: action.payload.otp,
          verified: false
        }
      };
    case 'VERIFY_OTP':
      return {
        ...state,
        otpVerification: {
          ...state.otpVerification,
          verified: true
        }
      };
    case 'ADD_ORDER':
      return {
        ...state,
        orders: [...state.orders, action.payload]
      };
    case 'UPDATE_ORDER':
      return {
        ...state,
        orders: state.orders.map(order =>
          order.id === action.payload.id ? { ...order, ...action.payload } : order
        )
      };
    case 'ADD_PAYMENT':
      return {
        ...state,
        orders: state.orders.map(order =>
          order.id === action.payload.orderId
            ? {
                ...order,
                advancePaid: order.advancePaid + action.payload.amount,
                dueAmount: order.dueAmount - action.payload.amount
              }
            : order
        )
      };
    case 'UPDATE_PRODUCTION':
      return {
        ...state,
        production: [...state.production, action.payload]
      };
    case 'ADD_EMPLOYEE':
      return {
        ...state,
        employees: [...state.employees, action.payload]
      };
    case 'UPDATE_PRODUCT_RATES':
      return {
        ...state,
        products: state.products.map(product =>
          product.id === action.payload.productId
            ? { ...product, items: action.payload.items }
            : product
        )
      };
    default:
      return state;
  }
}

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const loginUser = (user, role) => {
    dispatch({ type: 'LOGIN_USER', payload: { user, role } });
  };

  const logoutUser = () => {
    dispatch({ type: 'LOGOUT_USER' });
  };

  const sendOTP = (mobile) => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    dispatch({ type: 'SEND_OTP', payload: { mobile, otp } });
    return otp;
  };

  const verifyOTP = (inputOtp) => {
    if (inputOtp === state.otpVerification.otp) {
      dispatch({ type: 'VERIFY_OTP' });
      return true;
    }
    return false;
  };

  const addOrder = (order) => {
    dispatch({ type: 'ADD_ORDER', payload: order });
  };

  const updateOrder = (orderId, updates) => {
    dispatch({ type: 'UPDATE_ORDER', payload: { id: orderId, ...updates } });
  };

  const addPayment = (orderId, amount) => {
    dispatch({ type: 'ADD_PAYMENT', payload: { orderId, amount } });
  };

  const updateProduction = (productionData) => {
    dispatch({ type: 'UPDATE_PRODUCTION', payload: productionData });
  };

  const addEmployee = (employee) => {
    dispatch({ type: 'ADD_EMPLOYEE', payload: employee });
  };

  const updateProductRates = (productId, items) => {
    dispatch({ type: 'UPDATE_PRODUCT_RATES', payload: { productId, items } });
  };

  const value = {
    ...state,
    loginUser,
    logoutUser,
    sendOTP,
    verifyOTP,
    addOrder,
    updateOrder,
    addPayment,
    updateProduction,
    addEmployee,
    updateProductRates
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};