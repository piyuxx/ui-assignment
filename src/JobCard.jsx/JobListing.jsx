import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Chip, Stack } from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import BoltIcon from '@mui/icons-material/Bolt';

const JobListing = ({ data }) => {
    const [isVisible, setIsVisible] = useState(false);

    const handleToggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    return (
        <Card variant="outlined" sx={{ marginTop: '20px', width: '80%', borderRadius: "10px" }}>
            <CardContent>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <img src={data.logoUrl || 'https://via.placeholder.com/40'} alt="Company Logo" style={{ width: '40px', height: '40px' }} />
                    <Typography variant="h6" component="div">
                        {data.companyName}
                    </Typography>
                </Stack>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                    {data.jobRole}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                    {data.location}
                </Typography>
                <Typography variant="body2" gutterBottom sx={{ maxHeight: '200px', maxWidth: "400px", overflowY: 'auto' }}>
                    {isVisible ? data.jobDetailsFromCompany : `${data.jobDetailsFromCompany.slice(0, 250)}...`}
                    <Button onClick={handleToggleVisibility} size="small" sx={{ textAlign: "center" }}>
                        {isVisible ? 'Show Less' : 'Show More'}
                    </Button>
                </Typography>

                <Stack direction="row" alignItems="center" marginTop={2}>
                    <Typography variant="body2" color="text.secondary">
                        Estimated Salary: ₹{data.minJdSalary || 0} - {data.maxJdSalary || 0} LPA
                    </Typography>
                    <CheckBoxIcon style={{ color: '#00D26A' }} />
                </Stack>
                <Typography variant="subtitle2" fontWeight="bold" marginTop={2}>
                    Skills
                </Typography>
                <Stack direction="row" spacing={1}>
                    {data.skills ? (
                        data.skills.map((skill, index) => (
                            <Chip key={index} label={skill} variant="outlined" />
                        ))
                    ) : (
                        <Chip label="Not Specified" variant="outlined" />
                    )}
                </Stack>
                <Typography variant="subtitle2" fontWeight="bold" marginTop={2}>
                    Minimum Experience
                </Typography>
                <Typography variant="body2">{(data.minExp || 0) + ' years'}</Typography>
            </CardContent>
            <Button
                href={data.jdLink || '#'}
                variant="contained"
                size="small"
                sx={{ width: "90%", height: "40px", margin: "20px", backgroundColor: '#7ff4d3', color: 'black', '&:hover': { backgroundColor: '#55EFC4' } }}
            >
                <BoltIcon style={{ marginRight: '0.5rem', color: '#FF822D' }} />
                Easy Apply
            </Button>
        </Card>
    );
};

export default JobListing;
