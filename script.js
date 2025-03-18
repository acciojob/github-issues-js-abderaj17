const issuesList = document.getElementById("issues");
const pageNumber = document.getElementById("page-number");
const nextBtn = document.getElementById("load_next");
const prevBtn = document.getElementById("load_prev");

let currentPage = 1;

const fetchIssues = async ()=>{
	try{
		const response = await fetch(`https://api.github.com/repositories/1296269/issues?page=${currentPage}&per_page=5`);
		const data = await response.json();

		issuesList.innerHTML ="";

		pageNumber.innerText = `Page number ${currentPage}`;

		if(data.length === 0){
			issuesList.innerHTML = "<li>NO issues found on this page.</li>";
			return;
		}

		data.forEach(issues => {
         const li = document.createElement('li');
		 li.textContent = issues.title;
		 issuesList.appendChild(li);			
		});
	}catch(error){
		console.error("Error fetching issues:", error);
		issuesList.innerHTML = "<li>Failed to load issues. Please try again.</li>";
	}
};
nextBtn.addEventListener("click", ()=>{
	currentPage++;
	fetchIssues();
});

prevBtn.addEventListener("click", ()=>{
	if(currentPage > 1){
		currentPage --;
		fetchIssues();
	}
});
fetchIssues();