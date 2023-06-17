document.getElementById('dataForm').addEventListener('submit', postData);

function postData(event) {
  event.preventDefault(); // Prevent the form from submitting and reloading the page

  const name = document.getElementById('name').value;
  const age = document.getElementById('age').value;
  const occupation = document.getElementById('occupation').value;

  // Create a new XMLHttpRequest object
  const xhr = new XMLHttpRequest();
  
  // Configure the request
  xhr.open('POST', '/postdata', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  
  // Define the data to be sent to the server
  const data = {
    name: name,
    age: age,
    occupation: occupation
  };

  // Send the data to the server
  xhr.send(JSON.stringify(data));

  // Handle the response from the server
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        alert('Data posted successfully!');
      } else {
        alert('Failed to post data to Redis.');
      }
    }
  };
}