document.getElementById('saveBtn').addEventListener('click', function() {
    const date = document.getElementById('date').value;
    const selectedFeelings = document.querySelector('input[name="feelings"]:checked');
    const feelingsId = selectedFeelings ? selectedFeelings.id : "";
    const message = document.getElementById('message').value;

    // Check if all required fields are filled
    if (date && feelingsId) {
        // Save the data to local storage
        localStorage.setItem('date', date);
        localStorage.setItem('feelingsId', feelingsId);
        localStorage.setItem('message', message);

        // Redirect to Insights page
        window.location.href = 'insights.html';
    } else {
        alert('Please fill in all required fields.');
    }
});

// Get all radio buttons with the name "feelings"
const feelingsRadios = document.querySelectorAll('input[name="feelings"]');

// Get the paragraph where the selected feeling ID will be printed
const selectedFeelingIdPrint = document.getElementById('selectedFeelingId');

// Add event listener to each radio button to listen for changes
feelingsRadios.forEach(radio => {
    radio.addEventListener('change', function() {
        // Print the ID of the selected radio button
        selectedFeelingIdPrint.textContent = `${this.id}`;
    });
});

// Clear local storage when navigating back to this page from Insights
window.onload = function() {
    localStorage.removeItem('date');
    localStorage.removeItem('feelingsId');
    localStorage.removeItem('message');
};


// Retrieve existing insights data from local storage
let insights = JSON.parse(localStorage.getItem('insights')) || [];

// Check if new entry data is available
const date = localStorage.getItem('date');
const feelingsId = localStorage.getItem('feelingsId');
const message = localStorage.getItem('message');

// Check if all required data for adding a new entry is available
if (date && feelingsId && message) {
    // Check if the same entry already exists in the insights array
    const isNewEntry = insights.some(entry => entry.date === date && entry.feelingsId === feelingsId && entry.message === message);
    
    if (!isNewEntry) {
        // Add new entry to insights array
        insights.push({ date, feelingsId, message });

        // Save updated insights array back to local storage
        localStorage.setItem('insights', JSON.stringify(insights));
    }
}

//Table appender
// Display insights data
const insightsTableBody = document.querySelector('tbody');

insights.forEach(entry => {
    const row = document.createElement('tr');

    const checkboxCell = document.createElement('td');
    checkboxCell.innerHTML = `
        <div class="flex items-center w-4 px-4 py-3 ">
            <input type="checkbox" class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
            <label class="sr-only">checkbox</label>
        </div>
    `;
    row.appendChild(checkboxCell);

    const dateCell = document.createElement('td');
    dateCell.textContent = entry.date;
    row.appendChild(dateCell);

    const feelingCell = document.createElement('td');
    feelingCell.textContent = entry.feelingsId;
    row.appendChild(feelingCell);

    const emojiCell = document.createElement('td');
    emojiCell.innerHTML = `<img class="h-6 w-6 my-2 justify-center" src="/images/feelings/${entry.feelingsId}.png" alt="Emoji">`;
    row.appendChild(emojiCell);

    const messageCell = document.createElement('td');
    messageCell.textContent = entry.message;
    row.appendChild(messageCell);

    const notesCell = document.createElement('td');
    // Assuming you have a property named "notes" in your entry object
    notesCell.textContent = entry.notes || ''; // Add default value if "notes" is undefined
    row.appendChild(notesCell);

    insightsTableBody.appendChild(row);
});


// Count the total number of entries
const totalEntries = insights.length;

// Display the total number of entries
const totalEntriesElement = document.getElementById('totalEntries');
if (totalEntriesElement) {
    totalEntriesElement.textContent = totalEntries.toString();
}

// Count the number of entries being displayed (assuming each row represents an entry)
const displayedEntries = document.querySelectorAll('tbody tr').length;

// Display the number of entries being displayed
const displayedEntriesElement = document.getElementById('displayedEntries');
if (displayedEntriesElement) {
    displayedEntriesElement.textContent = displayedEntries.toString();
}
