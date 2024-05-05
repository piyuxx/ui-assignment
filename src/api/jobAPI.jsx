// jobAPI.js

const fetchJobs = async (page) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let limit = 100;
    const body = JSON.stringify({
        limit,
        offset: page * limit,
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
        return {
            data,
            status: 200
        };
    } catch (error) {
        console.error("Error fetching jobs:", error);
        throw error;
    }
};

export { fetchJobs };
