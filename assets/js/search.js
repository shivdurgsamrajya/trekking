var xhr = new XMLHttpRequest();

// Open a GET request to fetch 'blogs.csv' file asynchronously
xhr.open('GET', '../../blogs.csv', true);

// Set up an event handler to process the response
xhr.onreadystatechange = function () {
    // Check if the request is complete (readyState === 4) and successful (status === 200)
    if (xhr.readyState === 4 && xhr.status === 200) {
        // Get the CSV data from the response
        var data = xhr.responseText;
        
        // Split the data into rows
        var rows = data.split('\n');

        // Create an array to store the parsed data
        var searchData = [];

        // Parse the CSV data
        for (var i = 1; i < rows.length; i++) {
            var columns = rows[i].split(',');
            var title = columns[0];
            var url = columns[1];

            // Store the parsed data as objects in the 'searchData' array
            searchData.push({ title: title, url: url });
        }

        // Handle search input
        var searchInput = document.getElementById('searchInput');
        var searchResults = document.getElementById('searchResults');

        // Add an input event listener to the search input field
        searchInput.addEventListener('input', function () {
            // Get the lowercase search query
            var query = searchInput.value.toLowerCase();

            // Clear search results if the input is empty
            if (query === '') {
                searchResults.innerHTML = '';
                return;
            }

            // Filter matching results based on the search query
            var matchingResults = searchData.filter(function (item) {
                return item.title.toLowerCase().includes(query);
            });

            // Display search results with a maximum of 10 results
            searchResults.innerHTML = '';
            for (var index = 0; index < Math.min(matchingResults.length, 10); index++) {
                var result = matchingResults[index];
                var listItem = document.createElement('li');
                var link = document.createElement('a');
                link.href = result.url;
                link.textContent = result.title;
                link.classList.add('show-line-2');
                link.classList.add('a-color');
                listItem.appendChild(link);
                searchResults.appendChild(listItem);

                if (index < Math.min(matchingResults.length, 10) - 1) {
                    // Add <hr> element after <li> for all but the last result
                    var hr = document.createElement('hr');
                    hr.className = 'hr-margin';
                    searchResults.appendChild(hr);
                }
            }
        });
    }
};

// Send the XMLHttpRequest
xhr.send();
