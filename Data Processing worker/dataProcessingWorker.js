
// its the function to perform specific complex calculations with Web Workers
function performComplexCalculationsWithWorkers(data) {
    return data.map(value => Math.sqrt(value)); 
}

// Listen for messages from the main thread
self.onmessage = function (event) {
    const data = event.data;
    const startTime = performance.now();

    const processedData = performComplexCalculationsWithWorkers(data);

    const endTime = performance.now();
    const elapsedTime = endTime - startTime;

    self.postMessage({ processedData: processedData, elapsedTime: elapsedTime });
};
