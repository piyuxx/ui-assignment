import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Input } from "@mui/material";
import { fetchJobs } from "../api/jobAPI";
import JobListings from "../JobCard.jsx/JobListings";
import { debounce } from 'lodash';

const options = [
    {
        label: "Engineering",
        options: [
            { value: "frontend", label: "Frontend Engineer" },
            { value: "backend", label: "Backend Engineer" },
            { value: "ios", label: "iOS Engineer" },
            { value: "flutter", label: "flutter" },
            { value: "react", label: "react" },
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
    { label: "20L", value: "20" },
    { label: "30L", value: "30" },
    { label: "40L", value: "40" },
    { label: "50L", value: "50" },
    { label: "60L", value: "60" },
    { label: "70L", value: "70" },
    { label: "80L", value: "80" },
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
    const [noMoreJobs, setNoMoreJobs] = useState(false);

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
    const handleCompanyNameChange = debounce((event) => {
        const companyNameValue = event.target.value;
        setCompanyName(companyNameValue);
    }, 10); // 300 milliseconds debounce time



    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await fetchJobs(page);

                if (data?.data.jdList.length === 0) {
                    setLoading(false);
                    setNoMoreJobs(true);
                } else {
                    setLoading(false);
                    setJobs((prevJobs) => [...prevJobs, ...data?.data.jdList]);
                    setFilteredJobs((prevJobs) => [...prevJobs, ...data?.data.jdList]);
                }
            } catch (error) {
                console.log(error);
            }

        };

        fetchData();
    }, [page]);
    useEffect(() => {
        const handleScroll = () => {
            const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
            if (!noMoreJobs && !loading) {
                if ((clientHeight + scrollTop + 1 >= scrollHeight)) {
                    setPage((prevPage) => prevPage + 1);
                }
            }
        };

        document.addEventListener("scroll", handleScroll);
        return () => {
            document.removeEventListener("scroll", handleScroll);
        };
    }, [noMoreJobs]);


    useEffect(() => {
        const filteredJobs = jobs.filter((job) => {
            let passesFilter = true;
            if (companyName !== "") {
                passesFilter = passesFilter && job.companyName.toLowerCase().includes(companyName.toLowerCase());
            }
            if (selectedValues.length > 0) {
                const categories = selectedValues.map((option) => option.value);
                passesFilter = passesFilter && categories.includes(job.jobRole);
            }
            if (selectedEmployee.length > 0) {
                const employeeRanges = selectedEmployee.map((option) => option.value);
                passesFilter = passesFilter && employeeRanges.includes(job.employeeCount);
            }
            if (selectedExp.length > 0) {
                const maxExp = Math.max(...selectedExp.map((option) => parseInt(option.value)));
                passesFilter = passesFilter && parseInt(job.minExp) <= maxExp;
            }
            if (selectBasePay.length > 0) {
                const maxPay = Math.max(...selectBasePay.map((option) => parseInt(option.value)));
                passesFilter = passesFilter && parseInt(job.minJdSalary) <= maxPay;
            }
            if (JobPreference.length > 0) {
                const categories = JobPreference.map((option) => option.value);
                if (categories.includes("on-site")) {
                    passesFilter = passesFilter && job.location !== "remote" && !job.location.includes("CityName");
                } else {
                    passesFilter = passesFilter && categories.includes(job.location);
                }
            }

            return passesFilter;
        });
        setFilteredJobs(filteredJobs);
    }, [selectedValues, selectedEmployee, selectedExp, selectBasePay, JobPreference, jobs, companyName]);

    return (
        <>
            <div style={{ display: "flex", gap: "10px", padding: "20px", flexWrap: "wrap", width: "90%" }} >
                <div style={{ flex: "1 1 auto", minWidth: 0 }}>
                    <Select
                        options={options}
                        isMulti
                        value={selectedValues}
                        placeholder="Roles"
                        onChange={handleMultiSelectChange}
                        formatGroupLabel={({ label }) => (
                            <div style={{ fontWeight: "bold" }}>{label}</div>
                        )}
                        styles={{ container: (base) => ({ ...base, flex: 2 }) }}
                    />
                </div>
                <div style={{ flex: "1 1 auto", minWidth: 0 }}>
                    <Select
                        options={Experience}
                        isMulti
                        value={selectedExp}
                        placeholder="Experience"
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
                        placeholder="Remote"
                        formatGroupLabel={({ label }) => (
                            <div style={{ fontWeight: "bold" }}>{label}</div>
                        )}
                        styles={{ container: (base) => ({ ...base, flex: 1 }) }}
                    />
                </div>
                <input
                    onChange={handleCompanyNameChange}

                    placeholder="Company Name"
                />
            </div>

            <JobListings jobListings={filteredJobs} laoding={loading} noMoreJobs={noMoreJobs} />
            {loading && !noMoreJobs && <div>Loading...</div>}
            {!loading && noMoreJobs && <div>No more jobs available</div>}
        </>
    );
};

export default MultiSelectDropdown;
