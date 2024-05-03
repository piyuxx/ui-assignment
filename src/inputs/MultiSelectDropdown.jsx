// MultiSelectDropdown.js

import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Input } from "@mui/material";
import { fetchJobs } from "../api/jobAPI";
import JobListings from "../JobCard.jsx/JobListings";

const options = [
    {
        label: "Engineering",
        options: [
            { value: "frontend", label: "Frontend Engineer" },
            { value: "backend", label: "Mechanical Engineer" },
            { value: "ios", label: "iOS Engineer" },
        ],
    },
    {
        label: "Accounts",
        options: [
            { value: "accountant", label: "Accountant" },
            { value: "auditor", label: "Auditor" },
            { value: "bookkeeper", label: "Bookkeeper" },
        ],
    },
];

const Employees = [
    { label: "1-10", value: "1-10" },
    { label: "11-20", value: "11-20" },
    { label: '21-50' },
    { label: '51-100' },
    { label: '101-200' },
    { label: '201-500' },
];
const Experience = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
    { label: "6", value: "6" },
    { label: "7", value: "7" },
];
const MinimumPay = [
    { label: "0L", value: "0" },
    { label: "10L", value: "10" },
];
const JobPreferences = [
    { label: "remote", value: "remote" },
    { label: "on-site", value: "on-site" },
    { label: "hybrid", value: "hybrid" }
];

const MultiSelectDropdown = () => {
    const [selectedValues, setSelectedValues] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState([]);
    const [selectedExp, setSelectedExp] = useState([]);
    const [selectBasePay, setSelectedBasePay] = useState([]);
    const [JobPreference, setJobPreference] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [companyName, setCompanyName] = useState("");
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);

    const handleMultiSelectChange = (selectedOptions) => {
        setSelectedValues(selectedOptions);
    };
    const handleMultiEmployee = (selectedOptions) => {
        setSelectedEmployee(selectedOptions);
    };
    const handleMultiExp = (selectedOptions) => {
        setSelectedExp(selectedOptions);
    };
    const handleMinPay = (selectedOptions) => {
        setSelectedBasePay(selectedOptions);
    };
    const handleJobPref = (selectedOptions) => {
        setJobPreference(selectedOptions);
    };
    const handleCompanyNameChange = (event) => {
        setCompanyName(event.target.value);
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await fetchJobs(page);
                setJobs((prevJobs) => [...prevJobs, ...data.jdList]);
                setFilteredJobs((prevJobs) => [...prevJobs, ...data.jdList]);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        };

        fetchData();
    }, [page]);

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + document.documentElement.scrollTop >=
                document.documentElement.offsetHeight - 50 // Adjust this value as needed
            ) {
                if (!loading) {
                    setPage((prevPage) => prevPage + 1);
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);



    useEffect(() => {
        const filteredJobs = jobs.filter((job) => {
            let passesFilter = true;
            if (selectedValues.length > 0) {
                const categories = selectedValues.map((option) => option.value)
                passesFilter = passesFilter && categories.includes(job.jobRole)
            }
            if (selectedEmployee.length > 0) {
                const employeeRanges = selectedEmployee.map((option) => option.value)
                // Logic to check if job falls into any selected employee range
                // For example, you might have a field in job data like 'employeeCount' to compare with
                passesFilter = passesFilter && employeeRanges.includes(job.employeeCount)
            }
            if (selectedExp.length > 0) {
                const maxExp = Math.max(...selectedExp.map((option) => parseInt(option.value)))
                passesFilter = passesFilter && parseInt(job.minExp) <= maxExp
            }
            if (selectBasePay.length > 0) {
                const maxExp = Math.max(...selectBasePay.map((option) => parseInt(option.value)))
                passesFilter = passesFilter && parseInt(job.minJdSalary) <= maxExp
            }
            if (JobPreference.length > 0) {
                const categories = JobPreference.map((option) => option.value)
                passesFilter = passesFilter && categories.includes(job.location)
            }
            // if (companyName !== "") {
            //     passesFilter = passesFilter && job.companyName.toLowerCase().includes(companyName.toLowerCase());
            // }
            return passesFilter;
        });
        setFilteredJobs(filteredJobs);
        console.log(filteredJobs);
    }, [selectedValues, selectedEmployee, selectedExp, selectBasePay, JobPreference, companyName, jobs]);


    return (<>
        <div style={{ display: "flex", gap: "10px", padding: "20px", flexWrap: "wrap", width: "90%" }} >

            <div style={{ flex: "1 1 auto", minWidth: 0 }}>

                <Select
                    options={options}
                    isMulti
                    value={selectedValues}
                    onChange={handleMultiSelectChange}
                    formatGroupLabel={({ label }) => (
                        <div style={{ fontWeight: "bold" }}>{label}</div>
                    )}
                    styles={{ container: (base) => ({ ...base, flex: 2 }) }}
                />
            </div>
            <div style={{ flex: "1 1 auto", minWidth: 0 }}>

                <Select
                    options={Employees}
                    isMulti
                    value={selectedEmployee}
                    onChange={handleMultiEmployee}
                    formatGroupLabel={({ label }) => (
                        <div style={{ fontWeight: "bold" }}>{label}</div>
                    )}
                    styles={{ container: (base) => ({ ...base, flex: 1 }) }}
                />
            </div>
            <div style={{ flex: "1 1 auto", minWidth: 0 }}>

                <Select
                    options={Experience}
                    isMulti
                    value={selectedExp}
                    onChange={handleMultiExp}
                    formatGroupLabel={({ label }) => (
                        <div style={{ fontWeight: "bold" }}>{label}</div>
                    )}
                    styles={{ container: (base) => ({ ...base, flex: 1 }) }}
                />
            </div>
            <div style={{ flex: "1 1 auto", minWidth: 0 }}>

                <Select
                    options={MinimumPay}
                    isMulti
                    value={selectBasePay}
                    onChange={handleMinPay}
                    formatGroupLabel={({ label }) => (
                        <div style={{ fontWeight: "bold" }}>{label}</div>
                    )}
                    styles={{ container: (base) => ({ ...base, flex: 1 }) }}
                />
            </div>
            <div style={{ flex: "1 1 auto", minWidth: 0 }}>

                <Select
                    options={JobPreferences}
                    isMulti
                    value={JobPreference}
                    onChange={handleJobPref}
                    formatGroupLabel={({ label }) => (
                        <div style={{ fontWeight: "bold" }}>{label}</div>
                    )}
                    styles={{ container: (base) => ({ ...base, flex: 1 }) }}
                />
            </div>

            <Input
                value={companyName}
                onChange={handleCompanyNameChange}
                placeholder="Company Name"
                styles={{ container: (base) => ({ ...base, flex: 1 }) }}
            />
        </div>

        <JobListings jobListings={filteredJobs} />
    </>
    );
};

export default MultiSelectDropdown;
