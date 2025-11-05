import { useState, useEffect } from 'react'
import { authRequest } from '../../lib/auth'
import { PieChart, Pie, Label } from 'recharts'
import { TrendingUp } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'

// src: shadnc

const URL = import.meta.env.VITE_API_URL

function UserProgressChart({ user }) {

    const [progress, setProgress] = useState({
        total: 0,
        pending: 0,
        in_progress: 0,
        completed: 0,

    })
    // fetch the user's progress data from the progress view
    async function getUserProgress() {
        try {
            const response = await authRequest({ method: 'get', url: `${URL}/progress/` })
            setProgress(response.data)

        } catch (err) {
            console.error('Error fetching progress data:', err)
        }

    }

    useEffect(() => {
        getUserProgress()
    }, [])

    const chartData = [
        { label: 'Pending', value: progress.pending, fill: 'var(--chart-1)' },
        { label: 'In Progress', value: progress.in_progress, fill: 'var(--chart-2)' },
        { label: 'Completed', value: progress.completed, fill: 'var(--chart-3)' }
    ]

    const total = progress.total

    const chartConfig = {
        pending: { label: 'Pending', color: 'var(--chart-1)' },
        in_progress: { label: 'In Progress', color: 'var(--chart-2)' },
        Completed: { label: 'Completed', color: 'var(--chart-3)' },

    }

    return (
        <Card className='flex flex-col' >
            <CardHeader className='items-center pb-0'>
                <CardTitle>My progress</CardTitle>
                <CardDescription>Challenge Status Overview</CardDescription>
            </CardHeader>

            <CardContent className='flex-1 pb-0'>
                <ChartContainer config={chartConfig} className='mx-auto aspect-square max-h-[250px]'>

                    <PieChart width={300} height={300}>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <Pie data={chartData} dataKey={'value'} nameKey={'label'} innerRadius={60} outerRadius={110} strokeWidth={5} isAnimationActive={true} animationDuration={1500} animationBegin={0} animationEasing='ease-out' cx='50%' cy='50%'>
                            <Label content={({ viewBox }) => {
                                if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                                    return (
                                        <text
                                            x={viewBox.cx}
                                            y={viewBox.cy}
                                            textAnchor='middle'
                                            dominantBaseline='middle'
                                        >
                                            <tspan
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                className='fill-foreground text-3xl'
                                            >
                                                {progress.total}
                                            </tspan>
                                            <tspan
                                                x={viewBox.cx}
                                                y={(viewBox.cy || 0) + 24}
                                                className='fill-muted-foreground'
                                            >
                                                Total challenges
                                            </tspan>
                                        </text>
                                    )
                                }
                            }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>

            <CardFooter className='flex-col gap-2 text-sm'>
                <div className='flex-items-center gap-2 font-medium leading-none'>
                    Trending up by 5.2% this month <TrendingUp className='h-4 w-4' />
                </div>
                <div className='leading-none text-muted-foreground'>
                    Showing total progress for your challenges
                </div>
            </CardFooter>

        </Card>


    )
}

export default UserProgressChart
