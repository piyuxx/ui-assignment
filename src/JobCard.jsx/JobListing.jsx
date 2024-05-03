import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Chip, Stack } from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import BoltIcon from '@mui/icons-material/Bolt';
import exampleImage from '../assets/man.png';
import exampleImage2 from '../assets/woman.png';

const JobListing = ({ data }) => {
    const [isVisible, setIsVisible] = useState(false);

    const handleToggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    return (
        <Card variant="outlined" sx={{ marginTop: '20px', width: '80%', borderRadius: "10px" }}>
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
                        Estimated Salary: ₹{data?.minJdSalary || 0} - {data?.maxJdSalary || 0} LPA
                    </Typography>
                    <CheckBoxIcon style={{ color: '#00D26A' }} />
                </Stack>

                <Typography variant="h6" fontWeight="bold" component="div">
                    About Company :
                </Typography>
                <Typography variant="subtitle2" fontWeight="bold">
                    About Us
                </Typography>
                <Typography variant="body2" gutterBottom sx={{ maxHeight: '200px', maxWidth: "400px", overflowY: 'auto' }}>
                    {isVisible ? data.jobDetailsFromCompany : `${data.jobDetailsFromCompany.slice(0, 250)}...`}
                    <Button onClick={handleToggleVisibility} size="small" sx={{ textAlign: "center" }}>
                        {isVisible ? 'Show Less' : 'Show More'}
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
                sx={{ width: "90%", fontWeight: "bold", height: "40px", margin: "20px", marginBottom: "3px", backgroundColor: '#7ff4d3', color: 'black', '&:hover': { backgroundColor: '#4842DA' } }}
            >
                <BoltIcon style={{ marginRight: '0.5rem', color: '#FF822D', }} />
                Easy Apply
            </Button>
            <Button
                href={data.jdLink || '#'}
                variant="contained"
                size="small"
                sx={{ width: "90%", height: "40px", margin: "20px", color: '#FFFF', marginTop: "4px", backgroundColor: '#4842DA', '&:hover': { backgroundColor: '#55EFC4' } }}
            >
                {/* Use the second blurry icon */}
                <img src={exampleImage} alt="Blurry Icon 2" style={{ height: '2rem' }} />

                <img src={exampleImage2} alt="Blurry Icon 2" style={{ marginRight: '0.5rem', height: '2rem' }} />
                Unlock Referral Asks
            </Button>
        </Card>
    );
};

export default JobListing;
