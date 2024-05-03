import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Stack } from '@mui/system';

const AutoComplete = () => {
    const top100Films = [
        { label: 'Backend' },
        { label: 'Ios' },
        { label: 'Android' },
        { label: 'Blockchain' },
        { label: 'Android' },
        { label: 'Blockchain' },
        { label: 'Android' },
        { label: 'Blockchain' }
    ];


    const options = top100Films.map((option) => {
        return {
            firstLetter: 'Engineering',
            ...option,
        };
    });
    const EmployeeOptions = Employees.map((option) => {
        return {
            firstLetter: 'Engineering',
            ...option,
        };
    });
    return (
        <>
            <Stack>
                <Autocomplete
                    id="grouped-demo"
                    multiple // Enable multiple selections
                    limitTags={2}
                    options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                    groupBy={(option) => option.firstLetter}
                    getOptionLabel={(option) => option.label}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Roles" />}
                />
            </Stack>


        </>
    );
};

export default AutoComplete;
