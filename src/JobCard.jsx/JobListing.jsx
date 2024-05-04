import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Chip, Stack } from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import BoltIcon from '@mui/icons-material/Bolt';
import exampleImage from '../assets/man.jpg';
import exampleImage2 from '../assets/woman.jpg';
import './jobListing.css'
const JobListing = ({ data }) => {

    return (
        <Card variant="outlined" className="job-card">
            <CardContent>
                <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', alignItems: 'center', columnGap: '10px' }}>
                    <img src={data.logoUrl || 'https://via.placeholder.com/40'} alt="Company Logo" style={{ width: '50px', height: '50px' }} />

                    <div style={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}>
                        <Typography variant="h8" component="div" style={{ margin: 0 }}>
                            {data?.companyName}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" style={{ margin: 0 }}>
                            {data?.jobRole}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" style={{ margin: 0 }}>
                            {data?.location}
                        </Typography>
                    </div>
                </div>
                <Stack direction="row" alignItems="center" marginTop={2} fontWeight="bold">
                    <Typography variant="body2" color="text.secondary">
                        <span>Estimated Salary: ₹{data.minJdSalary || 0} - {data.maxJdSalary || 0}</span> LPA
                    </Typography>
                    <CheckBoxIcon style={{ color: '#00D26A' }} />
                </Stack>

                <Typography variant="h6" fontWeight="bold" component="div">
                    About Company :
                </Typography>
                <Typography variant="subtitle2" fontWeight="bold">
                    About Us
                </Typography>
                <Typography variant="body2" gutterBottom sx={{ position: 'relative', maxHeight: '200px', maxWidth: '400px', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
                    {/* {isVisible ? data.jobDetailsFromCompany : (
                        <>
                            <span >{data.jobDetailsFromCompany.slice(0, 115)}
                                <span style={{ opacity: 0.2, backgroundColor: "white", backdropFilter: blur(8) }}>{data.jobDetailsFromCompany.slice(115, 278)}</span>
                            </span>

                        </>
                    )} */}
                    <div >
                        <span style={{ margin: 0 }}>{data.jobDetailsFromCompany.slice(0, 100)}</span>

                        <span class="job-description" style={{ margin: 0 }}>{data.jobDetailsFromCompany.slice(100, 280)}</span>
                    </div>
                    <div class="fog"></div>


                    <Button size="small" sx={{
                        position: 'absolute',
                        color: "rgb(73, 67, 218)",
                        fontSize: "12px",
                        fontWeight: 200,
                        zIndex: '1',
                        // Adjust position to center horizontally and vertically
                        top: '50%',
                        left: '45%',
                        transform: 'translate(-40%, -1%)'
                    }} >
                        View Job
                    </Button>

                </Typography>


                <Typography variant="subtitle2" fontWeight="bold" color="text.secondary" marginTop={2}>
                    Minimum Experience
                </Typography>
                <Typography variant="body2">{data?.minExp ? (data.minExp || 0) + ' years' : "Not Specified"}</Typography>

            </CardContent>
            <Button
                href={data.jdLink || '#'}
                variant="contained"
                size="small"
                sx={{ width: "90%", fontWeight: "bold", height: "40px", margin: "20px", marginTop: "0px", marginBottom: "3px", backgroundColor: '#7ff4d3', color: 'black', '&:hover': { backgroundColor: '#4842DA' } }}
                className="apply-button"

            >
                <BoltIcon style={{ marginRight: '0.5rem', color: '#FF822D', }} />
                Easy Apply
            </Button>
            <Button
                href={data.jdLink || '#'}
                variant="contained"
                size="small"
                className="referral-button"

                sx={{
                    width: "90%",
                    height: "40px",
                    margin: "20px",
                    color: '#FFFF',
                    marginTop: "4px",
                    backgroundColor: '#4842DA', // Rounded corners

                    '&:hover': {
                        backgroundColor: '#55EFC4',
                        marginBottom: '30px'

                    }
                }}
            >
                {/* Use the second blurry icon */}
                <img src={exampleImage} alt="Blurry Icon 1" style={{ height: '2rem', borderRadius: "50%", filter: "blur(2px)", marginRight: "4px" }} />

                <img src={exampleImage2} alt="Blurry Icon 2" style={{ marginRight: '0.5rem', height: '2rem', borderRadius: "50%", filter: "blur(2px)" }} />
                <span style={{ fontSize: "auto" }}>Unlock Referral Asks</span>
            </Button>

        </Card >
    );
};

export default JobListing;
