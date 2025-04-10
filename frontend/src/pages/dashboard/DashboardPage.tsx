import {
    Box,
    Breadcrumbs,
    Button,
    Link,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Chip,
    alpha,
    useTheme,
    Card,
    CardContent,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
} from '@mui/material'
import {
    NavigateNext as NavigateNextIcon,
    Circle as CircleIcon,
    KeyboardArrowDown as KeyboardArrowDownIcon,
    TrendingUp as TrendingUpIcon,
} from '@mui/icons-material'
import MetricCard from '../../components/MetricCard'
import { Grid } from '../../components/GridPolyfill'
import {
    metricData,
    usersChartData,
    conversionChartData,
    eventChartData,
    sessionsChartData,
    pageViewsChartData,
    tableData,
    productTreeData,
    usersByCountry,
} from '../../data/mockData'
import {
    AreaChart,
    Area,
    ResponsiveContainer,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    BarChart,
    Bar
} from 'recharts'

const CustomTreeItem = ({ item }: { item: typeof productTreeData[0] }) => {
    return (
        <Box key={item.id}>
            <ListItem disablePadding>
                <ListItemButton>
                    <Box sx={{ flex: 1 }}>
                        <Typography component="div" variant="body1">
                            {item.name}
                        </Typography>
                    </Box>
                    {item.children && <KeyboardArrowDownIcon />}
                </ListItemButton>
            </ListItem>
            {item.children && (
                <List component="div" disablePadding>
                    {item.children.map((child) => (
                        <ListItem
                            key={child.id}
                            disablePadding
                            sx={{ pl: 4 }}
                        >
                            <ListItemButton>
                                <Box sx={{ flex: 1 }}>
                                    <Typography component="div" variant="body1">
                                        {child.name}
                                    </Typography>
                                </Box>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            )}
        </Box>
    )
}

// Custom component for country item
const CountryItem = ({ item }: { item: typeof usersByCountry[0] }) => {

    return (
        <ListItem disablePadding sx={{ mb: 2 }}>
            <ListItemIcon sx={{ minWidth: 36 }}>
                <CircleIcon
                    fontSize="small"
                    sx={{
                        color: item.country === 'India'
                            ? '#ff9800'
                            : item.country === 'USA'
                                ? '#2196f3'
                                : item.country === 'Brazil'
                                    ? '#4caf50'
                                    : '#9e9e9e'
                    }}
                />
            </ListItemIcon>
            <Box sx={{ flex: 1 }}>
                <Box component="div" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" component="div">{item.country}</Typography>
                    <Typography variant="body2" component="div" fontWeight="medium">{item.percentage}%</Typography>
                </Box>
                <Box
                    component="div"
                    sx={{
                        width: '100%',
                        bgcolor: 'background.paper',
                        borderRadius: 1,
                        mt: 0.5
                    }}
                >
                    <Box
                        sx={{
                            height: 5,
                            borderRadius: 1,
                            width: `${item.percentage}%`,
                            bgcolor: item.country === 'India'
                                ? '#ff9800'
                                : item.country === 'USA'
                                    ? '#2196f3'
                                    : item.country === 'Brazil'
                                        ? '#4caf50'
                                        : '#9e9e9e',
                        }}
                    />
                </Box>
            </Box>
        </ListItem>
    )
}

export default function DashboardPage() {
    const theme = useTheme()

    return (
        <Box>
            <Box sx={{ mb: 3 }}>
                <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small" />}
                    aria-label="breadcrumb"
                >
                    <Link underline="hover" color="inherit" href="#">
                        Dashboard
                    </Link>
                    <Typography color="text.primary">Trang chủ</Typography>
                </Breadcrumbs>
                <Typography variant="h4" sx={{ mt: 1 }}>
                    Thống kê
                </Typography>
            </Box>

            {/* Metric Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <MetricCard
                        title="Thành viên"
                        value={metricData.users.value}
                        change={metricData.users.change}
                        period={metricData.users.period}
                        chartData={usersChartData}
                        chartColor="#4caf50"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <MetricCard
                        title="Số phim"
                        value={metricData.conversions.value}
                        change={metricData.conversions.change}
                        period={metricData.conversions.period}
                        chartData={conversionChartData}
                        chartColor="#f44336"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <MetricCard
                        title="Mua vé"
                        value={metricData.eventCount.value}
                        change={metricData.eventCount.change}
                        period={metricData.eventCount.period}
                        chartData={eventChartData}
                        chartColor="#2196f3"
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card sx={{ height: '100%', backgroundColor: 'rgba(32, 80, 130, 0.03)' }}>
                        <CardContent sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <TrendingUpIcon color="primary" sx={{ mr: 1 }} />
                                <Typography variant="subtitle1" fontWeight="medium">
                                    Xuất dữ liệu
                                </Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 2 }}>
                                Thống kê chi tiết về doanh số.
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{ mt: 'auto', textTransform: 'none' }}
                                endIcon={<NavigateNextIcon />}
                            >
                                Xuất dữ liệu
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Charts */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3, height: '100%' }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Sessions
                        </Typography>
                        <Typography variant="h4" component="div" fontWeight="medium">
                            {metricData.sessions.value}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5, mb: 3 }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    color: 'success.main',
                                    mr: 1,
                                    typography: 'body2'
                                }}
                            >
                                <TrendingUpIcon fontSize="small" />
                                {metricData.sessions.change}
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                                {metricData.sessions.period}
                            </Typography>
                        </Box>
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart
                                data={sessionsChartData}
                                margin={{
                                    top: 10,
                                    right: 30,
                                    left: 0,
                                    bottom: 0,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Area
                                    type="monotone"
                                    dataKey="users"
                                    name="Users"
                                    stackId="1"
                                    stroke="#8884d8"
                                    fill="#8884d8"
                                    fillOpacity={0.3}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="sessions"
                                    name="Sessions"
                                    stackId="1"
                                    stroke="#82ca9d"
                                    fill="#82ca9d"
                                    fillOpacity={0.3}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="newUsers"
                                    name="New Users"
                                    stackId="1"
                                    stroke="#ffc658"
                                    fill="#ffc658"
                                    fillOpacity={0.3}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3, height: '100%' }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Page views and downloads
                        </Typography>
                        <Typography variant="h4" component="div" fontWeight="medium">
                            {metricData.pageViews.value}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5, mb: 3 }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    color: 'error.main',
                                    mr: 1,
                                    typography: 'body2'
                                }}
                            >
                                <TrendingUpIcon fontSize="small" sx={{ transform: 'rotate(180deg)' }} />
                                {metricData.pageViews.change}
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                                {metricData.pageViews.period}
                            </Typography>
                        </Box>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart
                                data={pageViewsChartData}
                                margin={{
                                    top: 10,
                                    right: 30,
                                    left: 0,
                                    bottom: 0,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="views" name="Views" stackId="a" fill="#8884d8" />
                                <Bar dataKey="downloads" name="Downloads" stackId="a" fill="#3f51b5" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>
            </Grid>

            {/* Details Table */}
            <Paper sx={{ width: '100%', mb: 4 }}>
                <Typography variant="h6" sx={{ p: 3, pb: 0 }}>
                    Details
                </Typography>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell>Page Title</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell align="right">Users</TableCell>
                                <TableCell align="right">Event Count</TableCell>
                                <TableCell align="right">Views per User</TableCell>
                                <TableCell align="right">Average Time</TableCell>
                                <TableCell align="right">Daily Conversions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableData.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">
                                        {row.page}
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={row.status}
                                            size="small"
                                            sx={{
                                                backgroundColor: row.status === 'Online'
                                                    ? alpha(theme.palette.success.main, 0.1)
                                                    : alpha(theme.palette.error.main, 0.1),
                                                color: row.status === 'Online'
                                                    ? theme.palette.success.main
                                                    : theme.palette.error.main,
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell align="right">{row.users}</TableCell>
                                    <TableCell align="right">{row.eventCount}</TableCell>
                                    <TableCell align="right">{row.viewsPerUser}</TableCell>
                                    <TableCell align="right">{row.avgTime}</TableCell>
                                    <TableCell align="right">{row.dailyConversions}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={20}
                    rowsPerPage={5}
                    page={0}
                    onPageChange={() => { }}
                    onRowsPerPageChange={() => { }}
                />
            </Paper>

            {/* Bottom Sections */}
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Product tree
                        </Typography>
                        <List component="nav">

                            {productTreeData.map((item) => (
                                <CustomTreeItem key={item.id} item={item} />
                            ))}
                        </List>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                            Users by country
                        </Typography>
                        <List>
                            {usersByCountry.map((item) => (
                                <CountryItem key={item.country} item={item} />
                            ))}
                        </List>
                    </Paper>
                </Grid>
            </Grid>

            {/* Footer */}
            <Box
                sx={{
                    mt: 4,
                    pt: 2,
                    borderTop: '1px solid',
                    borderColor: 'divider',
                    textAlign: 'center'
                }}
            >
                <Typography variant="body2" color="text.secondary">
                    Copyright © Dez 2025.
                </Typography>
            </Box>
        </Box>
    )
}
