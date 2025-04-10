// Mock data for the dashboard

// Card metric data
export const metricData = {
    users: {
        value: '14k',
        change: '+25%',
        period: 'Last 30 days'
    },
    conversions: {
        value: '325',
        change: '-25%',
        period: 'Last 30 days'
    },
    eventCount: {
        value: '200k',
        change: '+5%',
        period: 'Last 30 days'
    },
    sessions: {
        value: '13,277',
        change: '+35%',
        period: 'Sessions per day for the last 30 days'
    },
    pageViews: {
        value: '1.3M',
        change: '-8%',
        period: 'Page views and downloads for the last 6 months'
    }
}

// Chart data for users
export const usersChartData = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 5000 },
    { name: 'Apr', value: 4500 },
    { name: 'May', value: 6000 },
    { name: 'Jun', value: 5500 },
    { name: 'Jul', value: 7000 },
    { name: 'Aug', value: 8000 },
    { name: 'Sep', value: 7500 },
    { name: 'Oct', value: 9000 },
    { name: 'Nov', value: 8500 },
    { name: 'Dec', value: 10000 },
]

// Chart data for conversions
export const conversionChartData = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 380 },
    { name: 'Mar', value: 350 },
    { name: 'Apr', value: 340 },
    { name: 'May', value: 320 },
    { name: 'Jun', value: 300 },
    { name: 'Jul', value: 280 },
    { name: 'Aug', value: 270 },
    { name: 'Sep', value: 260 },
    { name: 'Oct', value: 250 },
    { name: 'Nov', value: 240 },
    { name: 'Dec', value: 230 },
]

// Chart data for event count
export const eventChartData = [
    { name: 'Jan', value: 180000 },
    { name: 'Feb', value: 190000 },
    { name: 'Mar', value: 195000 },
    { name: 'Apr', value: 200000 },
    { name: 'May', value: 198000 },
    { name: 'Jun', value: 205000 },
    { name: 'Jul', value: 210000 },
    { name: 'Aug', value: 200000 },
    { name: 'Sep', value: 195000 },
    { name: 'Oct', value: 205000 },
    { name: 'Nov', value: 215000 },
    { name: 'Dec', value: 220000 },
]

// Chart data for sessions
export const sessionsChartData = [
    { name: 'Apr 5', users: 5000, sessions: 3000, newUsers: 1000 },
    { name: 'Apr 10', users: 7000, sessions: 4000, newUsers: 1500 },
    { name: 'Apr 15', users: 9000, sessions: 5000, newUsers: 2000 },
    { name: 'Apr 20', users: 12000, sessions: 6000, newUsers: 2500 },
    { name: 'Apr 25', users: 16000, sessions: 8000, newUsers: 3000 },
    { name: 'Apr 30', users: 20000, sessions: 10000, newUsers: 4000 },
]

// Chart data for page views
export const pageViewsChartData = [
    { name: 'Jan', views: 9000, downloads: 5000 },
    { name: 'Feb', views: 10000, downloads: 6000 },
    { name: 'Mar', views: 9500, downloads: 5000 },
    { name: 'Apr', views: 11000, downloads: 6000 },
    { name: 'May', views: 11500, downloads: 6500 },
    { name: 'Jun', views: 12000, downloads: 7000 },
    { name: 'Jul', views: 11000, downloads: 5500 },
]

// Table data for details
export const tableData = [
    {
        id: 1,
        page: 'Homepage Overview',
        status: 'Online',
        users: 2124,
        eventCount: 2383,
        viewsPerUser: 4.5,
        avgTime: '2m 15s',
        dailyConversions: 18
    },
    {
        id: 2,
        page: 'Product Details - Gadgets',
        status: 'Online',
        users: 1722,
        eventCount: 4056,
        viewsPerUser: 5.3,
        avgTime: '2m 30s',
        dailyConversions: 9
    },
    {
        id: 3,
        page: 'Checkout Process - Step 1',
        status: 'Offline',
        users: 582,
        eventCount: 4034,
        viewsPerUser: 5.5,
        avgTime: '2m 10s',
        dailyConversions: 15
    },
    {
        id: 4,
        page: 'User Profile Dashboard',
        status: 'Online',
        users: 962,
        eventCount: 4011,
        viewsPerUser: 2.5,
        avgTime: '2m 40s',
        dailyConversions: 4
    },
    {
        id: 5,
        page: 'Article Listing - Tech News',
        status: 'Offline',
        users: 142,
        eventCount: 2403,
        viewsPerUser: 6.5,
        avgTime: '2m 55s',
        dailyConversions: 3
    },
]

// Data for product tree
export const productTreeData = [
    {
        id: 'website',
        name: 'Website',
        children: [
            { id: 'home', name: 'Home' },
            { id: 'pricing', name: 'Pricing' },
            { id: 'about', name: 'About us' },
            { id: 'blog', name: 'Blog' },
        ],
    },
    { id: 'store', name: 'Store' },
    { id: 'contact', name: 'Contact' },
    { id: 'help', name: 'Help' },
]

// Data for users by country
export const usersByCountry = [
    { country: 'India', percentage: 50 },
    { country: 'USA', percentage: 35 },
    { country: 'Brazil', percentage: 10 },
    { country: 'Other', percentage: 5 },
]
