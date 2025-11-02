import { useState, useEffect } from 'react'
import { authRequest } from '../../lib/auth'
import { PieChart, Pie, Label } from 'recharts'
import {Card, CardHeader, CardTitle, CardDescription} from '@/components/ui/card'

const URL = import.meta.env.VITE_API_URL

    function UserProgressChart({user}) {

        const [progress, setProgress] = useState({
            total : 0,
            pending: 0,
            in_progress : 0,
            completed : 0,

        })

        async function getUserProgress() {
            

            
        }
        return (
            <div>

            </div>
        )
    }

export default UserProgressChart
