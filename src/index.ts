const getUsername = document.querySelector("#user") as HTMLInputElement; // Updated ID reference
const formSubmit = document.querySelector("#form") as HTMLFormElement;
const main_Container = document.querySelector(".main_container") as HTMLElement; // Fixed class name

interface UserData {
    id: number;
    login: string;
    avatar_url: string;
    location: string | null; // Location can be null
    url: string;
}

// Reusable fetch function
async function myCustomeFetcher<T>(url: string, options?: RequestInit): Promise<T> {
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`Network response was not ok - status: ${response.status}`);
    }
    const data = await response.json();
    return data;
}

// Function to display the user card UI
const showResultUI = (singleUser: UserData) => {
    main_Container.insertAdjacentHTML(
        "beforeend",
        `<div class='card'>
            <img src="${singleUser.avatar_url}" alt="${singleUser.login}" />
            <hr />
            <div class="card-footer">
                <img src="${singleUser.avatar_url}" alt="${singleUser.login}" />
                <a href="${singleUser.url}" target="_blank">GitHub</a>
            </div>
        </div>`
    );
};

// Function to fetch user data and display results
async function fetchUserData(url: string) {
    try {
        const userInfo = await myCustomeFetcher<UserData[]>(url, {});
        console.log("Fetched user info:", userInfo); // Log fetched data
        userInfo.forEach(singleUser => showResultUI(singleUser));
    } catch (error) {
        console.error("Error fetching data:", error instanceof Error ? error.message : error);
    }
}

// Default function call
fetchUserData("https://api.github.com/users");

// Perform search functionality
formSubmit.addEventListener('submit', async (e) => {
    e.preventDefault();

    const searchTerm = getUsername.value.toLowerCase();
    
    // Clear previous results
    main_Container.innerHTML = '<p>Loading...</p>'; // Show loading message
    
    try {
        const url = "https://api.github.com/users";
        const allUserData: UserData[] = await myCustomeFetcher<UserData[]>(url, {});
        
        const matchingUsers = allUserData.filter((user: UserData) => {
            return user.login.toLowerCase().includes(searchTerm);
        });

        main_Container.innerHTML = ''; // Clear loading message

        if (matchingUsers.length === 0) {
            main_Container.insertAdjacentHTML(
                "beforeend",
                `<p class="empty-msg"> No Matching user found </p>`
            );
        } else {
            matchingUsers.forEach(singleUser => showResultUI(singleUser));
        }
    } catch (error) {
        main_Container.innerHTML = ''; // Clear loading message
        console.error("Error during search:", error instanceof Error ? error.message : error);
    }
});
