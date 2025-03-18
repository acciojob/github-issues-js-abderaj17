//your code here
const contain = document.querySelector('.container');
const issues = document.querySelector("#issues");
const nextBtn = document.querySelector("#load_next")
const prevBtn = document.querySelector("#load_prev");

let currentPage = 1;

const displayIssues = async()=>{
try {
    const response = await fetch("https://api.github.com/repositories/1296269/issues?page=$%7BpageNumberHere%7D&per_page=5");
	const data = await response.json();

	issues.innerHTML = "";
	contain.querySelector("h1").innerText = `Page number ${currentPage}`;

	if(data.length === 0){
		issues.innerHTML = "<li>No issues fount on this page.</li>";
		return;
	}

	data.forEach(issues =>{
		const li = document.createElement("li");
		li.textContent = issues.title;
		issues.appendChild(li);
	});
	
} catch (error) {
	console.error("Error fetching issues:",error);
	issues.innerHTML = "<li>Failed to load issues. Please try again.</li>";
}
	
};
nextBtn.addEventListener("click", ()=>{
	if(currentPage>1){
		currentPage--;
		displayIssues();
	}
});

contain.innerHTML = "<h1>Page number 1</h1>";
displayIssues();