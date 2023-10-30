import { useEffect } from 'react'
import { BsChevronRight } from 'react-icons/bs'
// import { BiLogOut } from 'react-icons/bi'

import HomePage from '../layouts/HomePage'
import profile from '../assets/images/profile1.jpg'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FinancialProfileWizard from './FinancialProfile/FinancialProfileWizard'
import useAuth from '../hooks/useAuth'
import { axiosPrivate } from '../lib/axios/axios'
import UseFetchFinancialProfile from '../hooks/useFetchFinancialProfile'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import Button from '../components/Button'
import { useFinancialProfileData } from '../hooks/useFinancialProfileData'

const UserProfile = () => {
  // const [financialData, setFinancialData] = useState({
  //   income: [],
  //   expenses: [],
  //   savings: [],
  //   goals: [],
  // });
  const { financialData, setFinancialData } = useFinancialProfileData();
  console.log('profff', financialData )
  const navigate = useNavigate()
  const [edit, setEdit] = useState(false)
  const [user, setUser] = useState({
    'location': 'kenya',
    'language': 'english',
    'subscription': 'premium'
  })
const [isEditMode, setEditMode] = useState(false);
const toggleEditMode = () => {
  setEditMode(!isEditMode);
};
  const { auth } = useAuth();
  const {axiosInstance} = useAxiosPrivate();


  // get authenticated user's profile info
  useEffect(() => async() => {
    const res = await axiosPrivate.get(`/api/users/${auth?.user_id}/`, {headers: { Authorization: `Bearer ${auth.accessToken}`}})
    if (res.status === 200) {
      setUser({...user, ...res.data})
      console.log({ user })
    }
  }, [])

  //fetch financial data
  useEffect(() => {
    

    const userId = auth?.user_id;
    const incomeUrl = "api/api/income/"
    const expensesUrl = "api/api/expenses/"
    const savingsUrl = "api/api/savings/"
    const goalsUrl = "api/api/goals/"

    const fetchAndFilterData = async (endpoint, userId) => {
      
          try {
            const response = await axiosPrivate.get(endpoint);
            const data = response.data.results;
        console.log('data', data)
            // Filter the data to get the profile data for the specific user
            const filteredData = data.filter((item) => item.user === userId);
        
            return filteredData;
          } catch (error) {
            console.error("Failed to fetch data: ", error);
          }
        };
      
    // Fetch and update income data for the user
    const fetchIncomeData = async () => {
      try {
        const incomeData = await fetchAndFilterData(incomeUrl, userId);
        setFinancialData((prevData) => ({
          ...prevData,
          income: incomeData,
        }));
      } catch (error) {
        console.error("Failed to fetch income data: ", error);
      }
    };

    // Fetch and update expenses data for the user
    const fetchExpensesData = async () => {
      try {
        const expensesData = await fetchAndFilterData(expensesUrl, userId);
        setFinancialData((prevData) => ({
          ...prevData,
          expenses: expensesData,
        }));
      } catch (error) {
        console.error("Failed to fetch expenses data: ", error);
      }
    };

    // Fetch and update savings data for the user
    const fetchSavingsData = async () => {
      try {
        const savingsData = await fetchAndFilterData(savingsUrl, userId);
        setFinancialData((prevData) => ({
          ...prevData,
          savings: savingsData,
        }));
      } catch (error) {
        console.error("Failed to fetch savings data: ", error);
      }
    };

    // Fetch and update goals data for the user
    const fetchGoalsData = async () => {
      try {
        const goalsData = await fetchAndFilterData(goalsUrl, userId);
        setFinancialData((prevData) => ({
          ...prevData,
          goals: goalsData,
        }));
      } catch (error) {
        console.error("Failed to fetch goals data: ", error);
      }
    };

    // Fetch data only once, after the initial render
    fetchIncomeData();
    fetchExpensesData();
    fetchSavingsData();
    fetchGoalsData();
  }
  , [])


  

    return (
      <div className="dark:text-slate-200 flex flex-col  md:mt-2 h-full">
        <div className="flex flex-col gap-2 items-center rounded-md shadow-md dark:shadow-blue-800  w-full p-2 px-4 pb-8">
          {/* header with name/email, username and edit profile action */}
          <div className="flex flex-col gap-4 w-full">
            <div className="flex justify-between items-center w-full">
              <span className="rotate-180 font-semibold" onClick={() => navigate(-1)}><BsChevronRight className="font-medium text-sm" /></span>
              <span className="font-medium">My profile</span>
              <span className=""></span>
            </div>
            <div className="flex gap-6 items-center px-4">
              <img src={profile} alt="profile" className="w-16 h-16 rounded-full object-cover" />
              <div className="flex flex-col  text-sm items-start">
                <span className="font-medium">{`${user.first_name} ${user.last_name}`}</span>
                <span className="dark:text-slate-400">{user.email || 'email missing, add ...'}</span>
                <span className="mt-2 p-1 bg-blue-800 rounded-md hover:bg-blue-500 text-white cursor-pointer"
                onClick={() => setEdit(!edit)}
                >{edit ? 'save changes' : 'edit profile'}</span>
              </div>
            </div>
          </div>
          {/* body with: location , language and clear history action */}
          <div className="flex flex-col gap-2 w-full mt-4 px-4">
            {['country', 'language', 'subscription'].map((item, id) => 
               <div key={id} className="flex gap-12 md:gap-3 items-center">
               <span className="text-start capitalize font-medium w-1/5">{item}:</span>
               {edit ? 
                <input
                  type="text"
                  disabled={!edit}
                  value={user[item]}
                  onChange={(e) => setUser({...user, [item]: e.target.value})}
                  className={`border focus:outline-none focus:border-slate-300 dark:text-slate-100 text-slate-700 font-semibold rounded-md w-full px-3 py-2 bg-slate-300 dark:bg-slate-500 ${!edit ? 'bg-slate-300':'dark:bg-slate-600'}`}                />
               :
                <span className="col-span-1 text-start capitalize font-semibold">{user[item]}</span>
               } 
             </div>
            )}
          </div>
       
  <div>
    {isEditMode ? (
      // Display the wizard component
      <div className='flex flex-col'>
      <button onClick={toggleEditMode} className='bg-red-600 p-1 self-end rounded-lg font-semibold' >Close</button>
      <FinancialProfileWizard onProfile={true} />
      </div>
    ) : (
      // Display the tabular form
      <div className=' mt-3 w-full'>
        {/* Render the financial data in tabular form */}
        <h4 className='text-xl' >Financial Profile</h4>
        <div className='flex flex-col md:flex-row flex-wrap gap-4'>
        <table className="mb-4">
<h4 className="text-lg font-semibold mb-2">Income</h4>

  <tr className="border border-slate-500 dark:border-slate-200">
    <th className="p-2">Source</th>
    <th className="p-2">Amount</th>
    <th className="p-2">Frequency</th>
  </tr>
  {financialData.income.map((incomeItem) => (
    <tr key={incomeItem.id} className="border border-slate-500 dark:border-slate-200">
      <td className="p-2">{incomeItem.source}</td>
      <td className="p-2">{incomeItem.amount}</td>
      <td className="p-2">{incomeItem.frequency}</td>
    </tr>
  ))}
</table>

<table className="mb-4">
<h4 className="text-lg font-semibold mb-2">Expenses</h4>
  <tr className="border border-slate-500 dark:border-slate-200">
    <th className="p-2">Category</th>
    <th className="p-2">Amount</th>
  </tr>
  {financialData.expenses.map((expenseItem) => (
    <tr key={expenseItem.id} className="border border-slate-500 dark:border-slate-200">
      <td className="p-2">{expenseItem.category}</td>
      <td className="p-2">{expenseItem.amount}</td>
    </tr>
  ))}
</table>

<table className="mb-4">
<h4 className="text-lg font-semibold mb-2">Savings</h4>

  <tr className="border border-slate-500 dark:border-slate-200">
    <th className="p-2">Type</th>
    <th className="p-2">Amount</th>
  </tr>
  {financialData.savings.map((savingsItem) => (
    <tr key={savingsItem.id} className="border border-slate-500 dark:border-slate-200">
      <td className="p-2">{savingsItem.type}</td>
      <td className="p-2">{savingsItem.amount}</td>
    </tr>
  ))}
</table>

<table className="mb-4">
<h4 className="text-lg font-semibold mb-2">Goals</h4>

  <tr className="border border-slate-500 dark:border-slate-200">
    <th className="p-2">Description</th>
    <th className="p-2">Target</th>
  </tr>
  {financialData.goals.map((goalItem) => (
    <tr key={goalItem.id} className="border border-slate-500 dark:border-slate-200">
      <td className="p-2">{goalItem.description}</td>
      <td className="p-2">{goalItem.target}</td>
    </tr>
  ))}
</table>

        </div>


        {/* Edit button to toggle the wizard */}
        <Button onClick={toggleEditMode} label={'Edit'} />
      </div>
    )}
  </div>


        

        </div>
        {/* <FinancialProfileWizard /> */}
      </div>
    )
  }
  
  export default HomePage(UserProfile)
  