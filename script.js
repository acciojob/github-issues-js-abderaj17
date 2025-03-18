//your code here
const contain = document.querySelector('.container');
const issues = document.querySelector("#issues");
const nextBtn = document.querySelector("#load_next")
const prevBtn = document.querySelector("#load_prev");

const displayIssues = async()=>{
try {
    const response = await fetch("https://api.github.com/repositories/1296269/issues?page=$%7BpageNumberHere%7D&per_page=5");
	const data = await response.json();

	const heading = document.createElement('h1');
	heading.innerText = `Page number ${data.number}`;
	contain.append(heading);
	
} catch (error) {
	
}
	
}