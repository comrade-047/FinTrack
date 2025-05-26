import {
    LuLayoutDashboard,
    LuHandCoins,
    LuWalletMinimal,
    LuArrowRightLeft,
    LuLogOut
} from 'react-icons/lu';

export const SIDE_MENU_DATA =[
    {
        id:"01",
        label:"Dashboard",
        icon: LuLayoutDashboard,
        path:'/dashboard'
    },
    {
        id:"02",
        label:"Income",
        icon: LuWalletMinimal,
        path:'/income'
    },
    {
        id:"03",
        label:"Expense",
        icon:LuHandCoins,
        path:'/expense'
    },
    {
        id:"04",
        label:"Transactions",
        icon:LuArrowRightLeft,
        path:'/transactions'
    },
    {
        id:"05",
        label:"Logout",
        icon:LuLogOut,
        path:'/logout'
    }
]