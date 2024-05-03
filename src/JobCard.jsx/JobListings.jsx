import React from 'react';
import { Grid } from '@mui/material';
import JobListing from './JobListing';
const JobListings = ({ jobListings }) => {
    return (
        <Grid container spacing={2}>
            {jobListings.map((job, index) => (
                <Grid key={index} item xs={12} sm={6} md={4} sx={{
                    display:
                        'flex', justifyContent: 'center',
                    marginBottom: '20px', width: "300px", height: "550px"
                }}>
                    <JobListing data={job} />
                </Grid>
            ))}
        </Grid>
    );
};

export default JobListings;
