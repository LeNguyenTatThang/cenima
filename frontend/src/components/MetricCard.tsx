import { Box, Card, CardContent, Typography, useTheme } from '@mui/material'
import { ArrowUpward, ArrowDownward } from '@mui/icons-material'
import { Area, AreaChart, ResponsiveContainer } from 'recharts'

interface MetricCardProps {
    title: string;
    value: string;
    change: string;
    period: string;
    chartData?: Array<{ name: string; value: number }>;
    chartColor?: string;
}

export default function MetricCard({
    title,
    value,
    change,
    period,
    chartData = [],
    chartColor = '#4caf50'
}: MetricCardProps) {
    const theme = useTheme()
    const isPositive = change.startsWith('+')
    const changeColor = isPositive ? theme.palette.success.main : theme.palette.error.main
    const changeIcon = isPositive ? <ArrowUpward fontSize="small" /> : <ArrowDownward fontSize="small" />

    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1, px: 3, pt: 2, pb: 0 }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    {title}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box>
                        <Typography variant="h4" component="div" fontWeight="medium">
                            {value}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    color: changeColor,
                                    mr: 1,
                                    typography: 'body2'
                                }}
                            >
                                {changeIcon}
                                {change}
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                                {period}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </CardContent>

            {chartData.length > 0 && (
                <Box sx={{ height: 75, px: 0, py: 1 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={chartData}
                            margin={{
                                top: 0,
                                right: 0,
                                left: 0,
                                bottom: 0,
                            }}
                        >
                            <defs>
                                <linearGradient id={`color${title}`} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={chartColor} stopOpacity={0.8} />
                                    <stop offset="95%" stopColor={chartColor} stopOpacity={0.1} />
                                </linearGradient>
                            </defs>
                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke={chartColor}
                                fillOpacity={1}
                                fill={`url(#color${title})`}
                                strokeWidth={2}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </Box>
            )}
        </Card>
    )
}
