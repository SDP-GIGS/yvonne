import React, { useState, useEffect } from 'react';

const Admindashboard = () => {
    const [adminData, setAdminData] = useState(null);

    useEffect(() => {
        // Fetch admin data from the server
        const fetchAdminData = async () => {
            const response = await fetch('/api/admin/data', {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            if (response.ok) setAdminData(await response.json());
        };
        fetchAdminData();
    }, []);

    
    if (!adminData) return <p>Loading Analytics...</p>;

    return (
        <div className='p-6'>
            <h1 className='text-2xl font-bold'>System Administrator Overview </h1>

            {/* Display key metrics and analytics here */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 my-6'>
                <div className='bg-white shadow p-4 rounded-lg border-l-4 border-blue-500'>
                    <h4 className='text-gray-500'>Total Interns</h4>
                    <p className='text-3xl font-bold'>{adminData.totalInterns}</p>
                </div>
                <div className='bg-white shadow p-6 rounded-lg border-l-4 border-green-500'>
                    <h4 className='text-gray-500'>Active Placements</h4>
                    <p className='text-3xl font-bold'>{adminData.activePlacements}</p>
                </div>
                <div className='bg-white shadow p-6 rounded-lg border-l-4 border-yellow-500'>
                    <h4 className='text-gray-500'>Pending Reviews</h4>
                    <p className='text-3xl font-bold'>{adminData.pendingReviews}</p>
                </div>
            </div>

            {/* Additional analytics and charts can be added here */}
        </div>
    );
};


export default Admindashboard;


