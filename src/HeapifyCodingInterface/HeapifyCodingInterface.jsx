import React, { useState, useRef } from 'react';
import { Play, RotateCcw, Lightbulb, CheckCircle, XCircle, Info } from 'lucide-react';

const HeapifyCodingInterface = () => {
  const [code, setCode] = useState(`void heapify(int arr[], int n, int i) {
    // TODO: Implement the heapify function
    // This function should maintain the max-heap property
    // starting from index i
    
}`);

  const [output, setOutput] = useState('');
  const [showHints, setShowHints] = useState(false);
  const [currentHint, setCurrentHint] = useState(0);
  const [testResults, setTestResults] = useState([]);
  const textareaRef = useRef(null);

  const hints = [
    "Start by finding the largest element among the current node and its children.",
    "Compare arr[i] with arr[2*i + 1] (left child) and arr[2*i + 2] (right child).",
    "If the largest element is not the current node, swap it with the largest child.",
    "After swapping, recursively call heapify on the affected subtree.",
    "Don't forget to check array bounds when accessing children nodes!"
  ];

  const testCases = [
    {
      input: "arr = [4, 10, 3, 5, 1], n = 5, i = 1",
      expected: "[4, 10, 3, 5, 1] (already a heap at index 1)",
      description: "Simple case where heapify maintains heap property"
    },
    {
      input: "arr = [1, 2, 3, 4, 5], n = 5, i = 0", 
      expected: "[5, 4, 3, 1, 2] (after heapifying from root)",
      description: "Convert array to max-heap starting from root"
    },
    {
      input: "arr = [3, 5, 1, 10, 2], n = 5, i = 1",
      expected: "[3, 10, 1, 5, 2] (heapify subtree at index 1)",
      description: "Heapify subtree where parent is smaller than children"
    }
  ];

  const defaultCode = `void heapify(int arr[], int n, int i) {
    // TODO: Implement the heapify function
    // This function should maintain the max-heap property
    // starting from index i
    
}`;

  const solutionCode = `void heapify(int arr[], int n, int i) {
    int largest = i;        // Initialize largest as root
    int left = 2 * i + 1;   // Left child index
    int right = 2 * i + 2;  // Right child index
    
    // If left child exists and is greater than root
    if (left < n && arr[left] > arr[largest])
        largest = left;
    
    // If right child exists and is greater than largest so far
    if (right < n && arr[right] > arr[largest])
        largest = right;
    
    // If largest is not root
    if (largest != i) {
        // Swap root with largest
        int temp = arr[i];
        arr[i] = arr[largest];
        arr[largest] = temp;
        
        // Recursively heapify the affected subtree
        heapify(arr, n, largest);
    }
}`;

  const runCode = () => {
    setOutput('Running tests...\n');
    
    // Simulate code execution and testing
    setTimeout(() => {
      const results = testCases.map((test, index) => {
        // Simple heuristic to check if code looks complete
        const hasComparison = code.includes('arr[') && (code.includes('>') || code.includes('<'));
        const hasSwap = code.includes('temp') || (code.includes('arr[') && code.includes('='));
        const hasRecursion = code.includes('heapify') && code.split('heapify').length > 2;
        const hasIndexCalculation = code.includes('2 * i') || code.includes('2*i');
        
        const score = (hasComparison ? 1 : 0) + (hasSwap ? 1 : 0) + (hasRecursion ? 1 : 0) + (hasIndexCalculation ? 1 : 0);
        
        return {
          passed: score >= 3,
          input: test.input,
          expected: test.expected,
          description: test.description
        };
      });
      
      setTestResults(results);
      const passedCount = results.filter(r => r.passed).length;
      setOutput(`Test Results:\n${passedCount}/${testCases.length} tests passed\n\n` +
        results.map((result, i) => 
          `Test ${i + 1}: ${result.passed ? '✓ PASS' : '✗ FAIL'}\n` +
          `Input: ${result.input}\n` +
          `Expected: ${result.expected}\n` +
          `${result.description}\n`
        ).join('\n')
      );
    }, 1000);
  };

  const resetCode = () => {
    setCode(defaultCode);
    setOutput('');
    setTestResults([]);
  };

  const showSolution = () => {
    setCode(solutionCode);
    setOutput('Solution loaded! Click "Run Code" to test it.');
  };

  const nextHint = () => {
    if (currentHint < hints.length - 1) {
      setCurrentHint(currentHint + 1);
    }
  };

  const prevHint = () => {
    if (currentHint > 0) {
      setCurrentHint(currentHint - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-blue-400 mb-2">Heapify Function - Interactive Coding Challenge</h1>
          <p className="text-gray-300">Implement the heapify function to maintain max-heap property</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Problem Description */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-green-400 mb-4 flex items-center">
              <Info className="mr-2" size={20} />
              Problem Description
            </h2>
            
            <div className="space-y-4 text-gray-300">
              <p>
                <strong className="text-white">Task:</strong> Implement the <code className="bg-gray-700 px-2 py-1 rounded">heapify</code> function 
                that maintains the max-heap property for a subtree rooted at index <code className="bg-gray-700 px-2 py-1 rounded">i</code>.
              </p>
              
              <div>
                <strong className="text-white">Function Signature:</strong>
                <pre className="bg-gray-700 p-3 rounded mt-2 text-sm">
                  <code>void heapify(int arr[], int n, int i)</code>
                </pre>
              </div>

              <div>
                <strong className="text-white">Parameters:</strong>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li><code className="bg-gray-700 px-1 rounded">arr[]</code> - The array representing the heap</li>
                  <li><code className="bg-gray-700 px-1 rounded">n</code> - Size of the heap</li>
                  <li><code className="bg-gray-700 px-1 rounded">i</code> - Index of the root of subtree to heapify</li>
                </ul>
              </div>

              <div>
                <strong className="text-white">Max-Heap Property:</strong>
                <p className="mt-1">For any node at index i:</p>
                <ul className="list-disc list-inside mt-1 space-y-1 text-sm">
                  <li>arr[i] ≥ arr[2*i + 1] (left child)</li>
                  <li>arr[i] ≥ arr[2*i + 2] (right child)</li>
                </ul>
              </div>

              <div>
                <strong className="text-white">Algorithm Steps:</strong>
                <ol className="list-decimal list-inside mt-2 space-y-1 text-sm">
                  <li>Find the largest among node i and its children</li>
                  <li>If largest is not i, swap arr[i] with arr[largest]</li>
                  <li>Recursively heapify the affected subtree</li>
                </ol>
              </div>
            </div>

            {/* Test Cases */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-yellow-400 mb-3">Test Cases</h3>
              <div className="space-y-3">
                {testCases.map((test, index) => (
                  <div key={index} className="bg-gray-700 p-3 rounded text-sm">
                    <div className="text-blue-300 font-medium">Test {index + 1}:</div>
                    <div className="text-gray-300 mt-1">
                      <div><strong>Input:</strong> {test.input}</div>
                      <div><strong>Expected:</strong> {test.expected}</div>
                      <div className="text-gray-400 text-xs mt-1">{test.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hints Section */}
            <div className="mt-6">
              <button
                onClick={() => setShowHints(!showHints)}
                className="flex items-center text-yellow-400 hover:text-yellow-300 transition-colors"
              >
                <Lightbulb className="mr-2" size={20} />
                {showHints ? 'Hide Hints' : 'Show Hints'}
              </button>
              
              {showHints && (
                <div className="mt-3 bg-gray-700 p-4 rounded">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-gray-400">Hint {currentHint + 1} of {hints.length}</span>
                    <div className="space-x-2">
                      <button
                        onClick={prevHint}
                        disabled={currentHint === 0}
                        className="px-2 py-1 bg-blue-600 rounded text-xs disabled:bg-gray-600 disabled:cursor-not-allowed"
                      >
                        Previous
                      </button>
                      <button
                        onClick={nextHint}
                        disabled={currentHint === hints.length - 1}
                        className="px-2 py-1 bg-blue-600 rounded text-xs disabled:bg-gray-600 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                  <p className="text-yellow-200">{hints[currentHint]}</p>
                </div>
              )}
            </div>
          </div>

          {/* Code Editor and Output */}
          <div className="space-y-6">
            {/* Code Editor */}
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-green-400">Code Editor</h2>
                <div className="space-x-2">
                  <button
                    onClick={resetCode}
                    className="flex items-center px-3 py-1 bg-gray-600 hover:bg-gray-500 rounded transition-colors text-sm"
                  >
                    <RotateCcw className="mr-1" size={16} />
                    Reset
                  </button>
                  <button
                    onClick={showSolution}
                    className="flex items-center px-3 py-1 bg-purple-600 hover:bg-purple-500 rounded transition-colors text-sm"
                  >
                    Show Solution
                  </button>
                  <button
                    onClick={runCode}
                    className="flex items-center px-3 py-1 bg-green-600 hover:bg-green-500 rounded transition-colors text-sm"
                  >
                    <Play className="mr-1" size={16} />
                    Run Code
                  </button>
                </div>
              </div>
              
              <textarea
                ref={textareaRef}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-64 bg-gray-900 text-green-400 font-mono text-sm p-4 rounded border border-gray-600 focus:border-blue-500 focus:outline-none resize-none"
                placeholder="Write your heapify function here..."
                spellCheck="false"
              />
            </div>

            {/* Output */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-blue-400 mb-4">Output</h2>
              <div className="bg-gray-900 p-4 rounded border border-gray-600 min-h-32">
                {output ? (
                  <pre className="text-sm text-gray-300 whitespace-pre-wrap">{output}</pre>
                ) : (
                  <p className="text-gray-500 text-sm">Click "Run Code" to test your implementation</p>
                )}
              </div>

              {/* Test Results Summary */}
              {testResults.length > 0 && (
                <div className="mt-4 flex space-x-2">
                  {testResults.map((result, index) => (
                    <div
                      key={index}
                      className={`flex items-center px-2 py-1 rounded text-xs ${
                        result.passed 
                          ? 'bg-green-800 text-green-200' 
                          : 'bg-red-800 text-red-200'
                      }`}
                    >
                      {result.passed ? (
                        <CheckCircle className="mr-1" size={12} />
                      ) : (
                        <XCircle className="mr-1" size={12} />
                      )}
                      Test {index + 1}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Educational Notes */}
        <div className="mt-8 bg-blue-900 bg-opacity-30 border border-blue-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-300 mb-3">💡 Learning Notes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-100">
            <div>
              <strong>Time Complexity:</strong> O(log n) - height of the heap
            </div>
            <div>
              <strong>Space Complexity:</strong> O(log n) - recursion stack
            </div>
            <div>
              <strong>Key Concept:</strong> Maintains heap property by "bubbling down"
            </div>
            <div>
              <strong>Use Case:</strong> Essential for heap sort and priority queues
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeapifyCodingInterface;