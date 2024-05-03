// jobAPI.js

const fetchJobs = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let limit = 50;
    const body = JSON.stringify({
        limit,
        offset: 0,
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body,
    };

    try {
        const response = await fetch(
            "https://api.weekday.technology/adhoc/getSampleJdJSON",
            requestOptions
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching jobs:", error);
        throw error;
    }
};

export { fetchJobs };
