const issuesList = document.getElementById("issues");
const pageNumber = document.getElementById("page-number");
const nextBtn = document.getElementById("load_next");
const prevBtn = document.getElementById("load_prev");

let currentPage = 1; // Start from Page 1

const fetchIssues = async () => {
    try {
        console.log(`Fetching page ${currentPage}...`); // Debugging line

        const response = await fetch(`https://api.github.com/repositories/1296269/issues?page=${currentPage}&per_page=5`);

        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log("API Response:", data); // Debugging line

        // Clear previous issues
        issuesList.innerHTML = "";
        
        // Update page number
        pageNumber.innerText = `Page number ${currentPage}`;

        if (data.length === 0) {
            issuesList.innerHTML = "<li>No issues found on this page.</li>";
            return;
        }

        // Display issue titles
        data.forEach(issue => {
            const li = document.createElement("li");
            li.textContent = issue.title;
            issuesList.appendChild(li);
        });

    } catch (error) {
        console.error("Error fetching issues:", error);
        issuesList.innerHTML = `<li>Error: ${error.message}</li>`;
    }
};

// Load next page
nextBtn.addEventListener("click", () => {
    currentPage++;
    fetchIssues();
});

// Load previous page (prevent going below page 1)
prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        fetchIssues();
    }
});

// Initial Load
fetchIssues();
