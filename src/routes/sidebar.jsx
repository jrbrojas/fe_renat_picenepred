/** Icons are imported separatly to reduce build time */
import BellIcon from '@heroicons/react/24/outline/BellIcon'
import DocumentTextIcon from '@heroicons/react/24/outline/DocumentTextIcon'
import Squares2X2Icon from '@heroicons/react/24/outline/Squares2X2Icon'
import TableCellsIcon from '@heroicons/react/24/outline/TableCellsIcon'
import WalletIcon from '@heroicons/react/24/outline/WalletIcon'
import CodeBracketSquareIcon from '@heroicons/react/24/outline/CodeBracketSquareIcon'
import DocumentIcon from '@heroicons/react/24/outline/DocumentIcon'
import ExclamationTriangleIcon from '@heroicons/react/24/outline/ExclamationTriangleIcon'
import CalendarDaysIcon from '@heroicons/react/24/outline/CalendarDaysIcon'
import ArrowRightOnRectangleIcon from '@heroicons/react/24/outline/ArrowRightOnRectangleIcon'
import UserIcon from '@heroicons/react/24/outline/UserIcon'
import Cog6ToothIcon from '@heroicons/react/24/outline/Cog6ToothIcon'
import BoltIcon from '@heroicons/react/24/outline/BoltIcon'
import ChartBarIcon from '@heroicons/react/24/outline/ChartBarIcon'
import CurrencyDollarIcon from '@heroicons/react/24/outline/CurrencyDollarIcon'
import InboxArrowDownIcon from '@heroicons/react/24/outline/InboxArrowDownIcon'
import UsersIcon from '@heroicons/react/24/outline/UsersIcon'
import KeyIcon from '@heroicons/react/24/outline/KeyIcon'
import DocumentDuplicateIcon from '@heroicons/react/24/outline/DocumentDuplicateIcon'

const iconClasses = `h-6 w-6`
const submenuIconClasses = `h-5 w-5`

const routes = [
 {
    
    path: '/tablero/inicio',
    icon: <Squares2X2Icon className={iconClasses}/>, 
    name: 'INICIO',
  },
  {
    path: '', //no url needed as this has submenu
    icon: <DocumentDuplicateIcon className={`${iconClasses} inline` }/>, // icon component
    name: 'FORTALECIMIENTO CAPACIDADES', // name that appear in Sidebar
    submenu : [
      {
        path: '/tablero/cursos', // url
        icon: <DocumentIcon className={submenuIconClasses}/>, // icon component
        name: 'CURSOS FORMACIÓN', // name that appear in Sidebar
      },

      {
        path: '/tablero/evaluadores',
        icon: <UserIcon className={submenuIconClasses}/>, 
        name: 'EVALUADORES ACREDITADOS',
      },
  
      //{
      //  path: '/tablero-renat/users',
      //  icon: <TableCellsIcon className={submenuIconClasses}/>, 
      //  name: 'USUARIOS',
      //},
      //{
      //  path: '/app/features',
      //  icon: <TableCellsIcon className={submenuIconClasses}/>, 
      //  name: 'EVAR',
      //},
      //{
      //  path: '/app/components',
      //  icon: <CodeBracketSquareIcon className={submenuIconClasses}/>, 
      //  name: 'OTROS',
      //},
    ]
  },
  {    path: '', //no url needed as this has submenu
    icon: <CalendarDaysIcon className={`${iconClasses} inline` }/>, // icon component
    name: 'ASISTENCIAS TÉCNICAS', // name that appear in Sidebar
    submenu : [
      /*{
        path: '', // url
        icon: <WalletIcon className={submenuIconClasses}/>, // icon component
        name: 'RESUMEN', // name that appear in Sidebar
      },*/
      {
        path: '/tablero/pprrd', // url
        icon: <WalletIcon className={submenuIconClasses}/>, // icon component
        name: 'PPRRD', // name that appear in Sidebar
      },
      {
        path: '/tablero/paa', // url
        icon: <WalletIcon className={submenuIconClasses}/>, // icon component
        name: 'PAA', // name that appear in Sidebar
      },
      {
        path: '/tablero/evar', // url
        icon: <WalletIcon className={submenuIconClasses}/>, // icon component
        name: 'EVAR', // name that appear in Sidebar
      },
       {
        path: '/tablero/planificacion', // url
        icon: <WalletIcon className={submenuIconClasses}/>, // icon component
        name: 'PTE', // name that appear in Sidebar
      },
      {
        path: '/tablero/otros', // url
        icon: <WalletIcon className={submenuIconClasses}/>, // icon component
        name: 'OTROS', // name that appear in Sidebar
      },
    ]
    },
    {
      path:'',
      icon:<Cog6ToothIcon className={`${iconClasses} inline` }/>,
      name:'BUENAS PRACTICAS',
      submenu:[
        {
          path: '/tablero/buenaspracticas',
          icon: <KeyIcon className={submenuIconClasses}/>, 
          name: 'ENTIDADES',
        }
      ]

    } ,
  //{
  //  //path: '/app/leads', // url
  //  path: '/tablero-renat/users', // url
  //  icon: <InboxArrowDownIcon className={iconClasses}/>, // icon component
  //  name: 'Leads', // name that appear in Sidebar
  //},
  //{
  //  path: '/app/transactions', // url
  //  icon: <CurrencyDollarIcon className={iconClasses}/>, // icon component
  //  name: 'Transactions', // name that appear in Sidebar
  //},
  //{
  //  path: '/app/charts', // url
  //  icon: <ChartBarIcon className={iconClasses}/>, // icon component
  //  name: 'Analytics', // name that appear in Sidebar
  //},
  //{
  //  path: '/app/integration', // url
  //  icon: <BoltIcon className={iconClasses}/>, // icon component
  //  name: 'Integration', // name that appear in Sidebar
  //},
  //{
  //  path: '/app/calendar', // url
  //  icon: <CalendarDaysIcon className={iconClasses}/>, // icon component
  //  name: 'Calendar', // name that appear in Sidebar
  //},
  //{
  //  path: '', //no url needed as this has submenu
  //  icon: <DocumentDuplicateIcon className={`${iconClasses} inline` }/>, // icon component
  //  name: 'Pages', // name that appear in Sidebar
  //  submenu : [
  //    {
  //      path: '/login',
  //      icon: <ArrowRightOnRectangleIcon className={submenuIconClasses}/>,
  //      name: 'Login',
  //    },
  //    {
  //      path: '/register', //url
  //      icon: <UserIcon className={submenuIconClasses}/>, // icon component
  //      name: 'Register', // name that appear in Sidebar
  //    },
  //    {
  //      path: '/forgot-password',
  //      icon: <KeyIcon className={submenuIconClasses}/>,
  //      name: 'Forgot Password',
  //    },
  //    {
  //      path: '/app/blank',
  //      icon: <DocumentIcon className={submenuIconClasses}/>,
  //      name: 'Blank Page',
  //    },
  //    {
  //      path: '/app/404',
  //      icon: <ExclamationTriangleIcon className={submenuIconClasses}/>,
  //      name: '404',
  //    },
  //  ]
  //},
  //{
  //  path: '', //no url needed as this has submenu
  //  icon: <Cog6ToothIcon className={`${iconClasses} inline` }/>, // icon component
  //  name: 'Settings', // name that appear in Sidebar
  //  submenu : [
  //    {
  //      path: '/app/settings-profile', //url
  //      icon: <UserIcon className={submenuIconClasses}/>, // icon component
  //      name: 'Profile', // name that appear in Sidebar
  //    },
  //    {
  //      path: '/app/settings-billing',
  //      icon: <WalletIcon className={submenuIconClasses}/>,
  //      name: 'Billing',
  //    },
  //    {
  //      path: '/app/settings-team', // url
  //      icon: <UsersIcon className={submenuIconClasses}/>, // icon component
  //      name: 'Team Members', // name that appear in Sidebar
  //    },
  //  ]
  //},
  //{
  //  path: '', //no url needed as this has submenu
  //  icon: <DocumentTextIcon className={`${iconClasses} inline` }/>, // icon component
  //  name: 'Documentation', // name that appear in Sidebar
  //  submenu : [
  //    {
  //      path: '/app/getting-started', // url
  //      icon: <DocumentTextIcon className={submenuIconClasses}/>, // icon component
  //      name: 'Getting Started', // name that appear in Sidebar
  //    },
  //    {
  //      path: '/app/features',
  //      icon: <TableCellsIcon className={submenuIconClasses}/>, 
  //      name: 'Features',
  //    },
  //    {
  //      path: '/app/components',
  //      icon: <CodeBracketSquareIcon className={submenuIconClasses}/>, 
  //      name: 'Components',
  //    }
  //  ]
  //},
  
]

export default routes