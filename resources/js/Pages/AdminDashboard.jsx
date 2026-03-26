import DashboardNavigation from '@/Components/DashboardNavigation/DashboardNavigation'
import React from 'react'

export default function AdminDashboard({ auth }) {
    return (
        <div>
            <DashboardNavigation auth={auth} />
        </div>
    )
}
