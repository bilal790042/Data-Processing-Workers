// Function to perform specific complex calculations without Web Workers
function performComplexCalculationsWithoutWorkers(data) {
   return data.map(value => Math.sqrt(value)); // Example: calculating the square root of each value in the array
}

// Function to display the result and execution time
function displayResult(result, executionTime) {
    document.getElementById('result').innerText = `Result: ${result}`;
    document.getElementById('executionTime').innerText = `Execution Time: ${executionTime} milliseconds`;
}

function getInputData() {
    const inputString = document.getElementById('dataInput').value;
    return inputString.split(',').map(value => parseFloat(value.trim()));
}

function processDataWithoutWorkers() {
    const data = getInputData();
    const startTime = performance.now();

    const processedData = performComplexCalculationsWithoutWorkers(data);

    const endTime = performance.now();
    const elapsedTime = endTime - startTime;

    displayResult(`Processed without Web Workers`, elapsedTime);
    displayResult(`Result: [${processedData}]`, elapsedTime);
}

// Function to process data with Web Workers
function processDataWithWorkers() {
    const data = getInputData();
    const startTime = performance.now();

    // Create a new Web Worker
    const worker = new Worker('dataProcessingWorker.js');

    // Listen for messages from the Web Worker
    worker.onmessage = function (event) {
        const { processedData, elapsedTime } = event.data;

        displayResult(`Processed with Web Workers`, elapsedTime);
        displayResult(`Result: [${processedData}]`, elapsedTime);
    };

    // Send data to the Web Worker
    worker.postMessage(data);
}
