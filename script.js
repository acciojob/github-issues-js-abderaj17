const contain = document.querySelector(".container");
const issues = document.querySelector("#issues");
const nextBtn = document.querySelector("#load_next");
const prevBtn = document.querySelector("#load_prev");

let currentPage = 1; // Start from Page 1

const displayIssues = async () => {
    try {
        const response = await fetch(`https://api.github.com/repositories/1296269/issues?page=${currentPage}&per_page=5`);
        const data = await response.json();

        issues.innerHTML = ""; // Clear previous issues
        contain.querySelector("h1").innerText = `Page number ${currentPage}`;

        if (data.length === 0) {
            issues.innerHTML = "<li>No issues found on this page.</li>";
            return;
        }

        data.forEach(issue => {
            const li = document.createElement("li");
            li.textContent = issue.title; // Display only issue title
            issues.appendChild(li);
        });
    } catch (error) {
        console.error("Error fetching issues:", error);
        issues.innerHTML = "<li>Failed to load issues. Please try again.</li>";
    }
};

// Load next page
nextBtn.addEventListener("click", () => {
    currentPage++;
    displayIssues();
});

// Load previous page (ensure it doesn’t go below 1)
prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        displayIssues();
    }
});

// Initial Load
contain.innerHTML = "<h1>Page number 1</h1>"; // Set initial heading
displayIssues();
