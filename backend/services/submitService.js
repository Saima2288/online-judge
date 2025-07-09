import Problem from '../models/problem.js';
import { generateFile } from "../utils/generateFile.js";
import { executeCode } from "../utils/executeCode.js";

// Function to integrate user code with boilerplate
function integrateUserCodeWithBoilerplate(userCode, boilerplate, language) {
  if (!boilerplate) {
    return userCode; // Fallback to original code if no boilerplate
  }
  
  // Replace the placeholder with user's code
  return boilerplate.replace('{{USER_CODE}}', userCode);
}

async function runCodeOnInput(language, code, input, problem) {
  // Get the boilerplate for this problem and language
  const boilerplate = problem.boilerplate?.get(language);
  
  // Integrate user code with boilerplate
  const completeCode = integrateUserCodeWithBoilerplate(code, boilerplate, language);
  
  const filepath = generateFile(language, completeCode);
  
  const startTime = Date.now();
  const output = await executeCode(language, filepath, input);
  const executionTime = Date.now() - startTime;
  
  return {
    output: output.trim(),
    executionTime
  };
}

async function validateSubmission(problemNumber, code, language = 'cpp') {
  const problem = await Problem.findOne({ problemNumber });
  if (!problem) {
    throw new Error('Problem not found');
  }

  const testCases = problem.testCases;
  const results = [];
  let passedTests = 0;
  let totalExecutionTime = 0;

  // Validate each test case individually
  for (let i = 0; i < testCases.length; i++) {
    const testCase = testCases[i];
    const input = testCase.input;
    const expectedOutput = testCase.output;
    
    try {
      const { output: actualOutput, executionTime } = await runCodeOnInput(language, code, input, problem);
      totalExecutionTime += executionTime;
      
      // Compare outputs (normalize whitespace)
      const normalizedActual = actualOutput.replace(/\s+/g, ' ').trim();
      const normalizedExpected = expectedOutput.replace(/\s+/g, ' ').trim();
      const isCorrect = normalizedActual === normalizedExpected;
      
      const testResult = {
        testCaseIndex: i + 1,
        input: input,
        expectedOutput: expectedOutput,
        actualOutput: actualOutput,
        passed: isCorrect,
        executionTime: executionTime
      };
      
      results.push(testResult);
      
      if (isCorrect) {
        passedTests++;
      }
      
    } catch (error) {
      // Handle compilation or runtime errors
      const testResult = {
        testCaseIndex: i + 1,
        input: input,
        expectedOutput: expectedOutput,
        actualOutput: null,
        passed: false,
        error: error.error || error.message || 'Runtime error',
        executionTime: 0
      };
      
      results.push(testResult);
    }
  }

  const allPassed = passedTests === testCases.length;
  
  return {
    status: allPassed ? 'Accepted' : 'Wrong Answer',
    passedTests: passedTests,
    totalTests: testCases.length,
    executionTime: totalExecutionTime,
    testResults: results,
    message: allPassed 
      ? 'All test cases passed successfully!' 
      : `${passedTests}/${testCases.length} test cases passed. Check the failed test cases for details.`
  };
}

export default { validateSubmission };
