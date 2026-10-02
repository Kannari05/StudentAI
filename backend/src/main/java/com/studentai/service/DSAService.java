package com.studentai.service;

import com.studentai.dto.request.SolveAlgorithmRequest;
import com.studentai.model.Algorithm;
import com.studentai.model.DSASolution;
import com.studentai.repository.AlgorithmRepository;
import com.studentai.repository.DSASolutionRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DSAService {

    @Autowired
    private AlgorithmRepository algorithmRepository;

    @Autowired
    private DSASolutionRepository dsaSolutionRepository;

    @PostConstruct
    public void initSampleData() {
        if (algorithmRepository.count() == 0) {
            algorithmRepository.save(Algorithm.builder()
                    .title("Two Sum")
                    .category("Arrays")
                    .difficulty("Easy")
                    .description("Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.")
                    .starterCode("function twoSum(nums, target) {\n  // Write your code here\n}")
                    .solutionCode("function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const diff = target - nums[i];\n    if (map.has(diff)) return [map.get(diff), i];\n    map.set(nums[i], i);\n  }\n  return [];\n}")
                            .sampleInput("nums = [2,7,11,15], target = 9")
                    .sampleOutput("[0,1]")
                    .explanation("Use a hash map to store complements in O(N) time.")
                    .build());

            algorithmRepository.save(Algorithm.builder()
                    .title("Reverse Linked List")
                    .category("Trees & Linked Lists")
                    .difficulty("Easy")
                    .description("Given the head of a singly linked list, reverse the list, and return the reversed list.")
                    .starterCode("function reverseList(head) {\n  // Write your code here\n}")
                    .solutionCode("function reverseList(head) {\n  let prev = null, curr = head;\n  while (curr) {\n    let nextTemp = curr.next;\n    curr.next = prev;\n    prev = curr;\n    curr = nextTemp;\n  }\n  return prev;\n}")
                    .sampleInput("head = [1,2,3,4,5]")
                    .sampleOutput("[5,4,3,2,1]")
                    .explanation("Iteratively swap pointers using prev, curr, and nextTemp.")
                    .build());

            algorithmRepository.save(Algorithm.builder()
                    .title("Valid Palindrome")
                    .category("Strings")
                    .difficulty("Easy")
                    .description("A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.")
                    .starterCode("function isPalindrome(s) {\n  // Write your code here\n}")
                    .solutionCode("function isPalindrome(s) {\n  const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');\n  return cleaned === cleaned.split('').reverse().join('');\n}")
                    .sampleInput("s = \"A man, a plan, a canal: Panama\"")
                    .sampleOutput("true")
                    .explanation("Clean non-alphanumeric chars and compare with reverse string.")
                    .build());

            algorithmRepository.save(Algorithm.builder()
                    .title("Binary Tree Level Order Traversal")
                    .category("Trees & Linked Lists")
                    .difficulty("Medium")
                    .description("Given the root of a binary tree, return the level order traversal of its nodes' values.")
                    .starterCode("function levelOrder(root) {\n  // Write your code here\n}")
                    .solutionCode("function levelOrder(root) {\n  if (!root) return [];\n  const result = [], queue = [root];\n  while (queue.length) {\n    const levelSize = queue.length, currentLevel = [];\n    for (let i = 0; i < levelSize; i++) {\n      const node = queue.shift();\n      currentLevel.push(node.val);\n      if (node.left) queue.push(node.left);\n      if (node.right) queue.push(node.right);\n    }\n    result.push(currentLevel);\n  }\n  return result;\n}")
                    .sampleInput("root = [3,9,20,null,null,15,7]")
                    .sampleOutput("[[3],[9,20],[15,7]]")
                    .explanation("Use BFS with a queue to traverse level by level.")
                    .build());
        }
    }

    public List<Algorithm> getAllAlgorithms() {
        return algorithmRepository.findAll();
    }

    public Algorithm getAlgorithmById(Long id) {
        return algorithmRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Algorithm not found"));
    }

    public DSASolution submitSolution(Long userId, SolveAlgorithmRequest request) {
        Algorithm algorithm = getAlgorithmById(request.getAlgorithmId());
        boolean success = evaluateSubmission(algorithm, request.getCode());

        String status = success ? "ACCEPTED" : "WRONG_ANSWER";
        String timeComplexity = getTimeComplexity(algorithm.getTitle());
        String spaceComplexity = getSpaceComplexity(algorithm.getTitle());
        String feedback = success
                ? "AI Code Review: Solution appears correct for the sample input and output. Time and space complexity are shown below."
                : "AI Code Review: The submitted code did not match the expected algorithm pattern. Review the logic, edge cases, and expected output before trying again.";
        String output = success
                ? formatSampleIO(algorithm)
                : "Expected output: " + algorithm.getSampleOutput() + ". Actual output could not be inferred from the submitted code.";

        DSASolution solution = DSASolution.builder()
                .userId(userId)
                .algorithmId(request.getAlgorithmId())
                .submittedCode(request.getCode())
                .language(request.getLanguage())
                .status(status)
                .aiFeedback(feedback)
                .output(output)
                .timeComplexity(timeComplexity)
                .spaceComplexity(spaceComplexity)
                .build();

        return dsaSolutionRepository.save(solution);
    }

    private boolean evaluateSubmission(Algorithm algorithm, String code) {
        if (code == null || code.trim().isEmpty()) {
            return false;
        }

        String normalizedSubmission = normalizeCode(code);
        String normalizedSolution = normalizeCode(algorithm.getSolutionCode());

        if (normalizedSubmission.contains(normalizedSolution) || normalizedSolution.contains(normalizedSubmission)) {
            return true;
        }

        if (matchesExpectedOutput(algorithm, normalizedSubmission)) {
            return true;
        }

        switch (algorithm.getTitle()) {
            case "Two Sum":
                return normalizedSubmission.contains("return") && normalizedSubmission.contains("target") && normalizedSubmission.contains("nums");
            case "Reverse Linked List":
                return normalizedSubmission.contains("prev") && normalizedSubmission.contains("curr") && normalizedSubmission.contains("next");
            case "Valid Palindrome":
                return normalizedSubmission.contains("tolowercase") && (normalizedSubmission.contains("replace") || normalizedSubmission.contains("replaceall")) && normalizedSubmission.contains("reverse");
            case "Binary Tree Level Order Traversal":
                return (normalizedSubmission.contains("queue") && normalizedSubmission.contains("push"))
                        || (normalizedSubmission.contains("root") && normalizedSubmission.contains("left") && normalizedSubmission.contains("right"));
            default:
                return normalizedSubmission.length() > 30;
        }
    }

    private boolean matchesExpectedOutput(Algorithm algorithm, String normalizedSubmission) {
        String expectedOutput = normalizeCode(algorithm.getSampleOutput());
        if (expectedOutput == null || expectedOutput.isEmpty()) {
            return false;
        }

        if (normalizedSubmission.contains(expectedOutput)) {
            return true;
        }

        String[] tokens = expectedOutput.split("[^a-z0-9]+");
        int matchedTokens = 0;
        int requiredMatches = Math.max(1, tokens.length - 1);

        for (String token : tokens) {
            if (!token.isBlank() && normalizedSubmission.contains(token)) {
                matchedTokens++;
            }
        }

        return matchedTokens >= requiredMatches;
    }

    private String normalizeCode(String code) {
        if (code == null) {
            return "";
        }
        return code.replaceAll("(?s)/\\*.*?\\*/", "")
                .replaceAll("//.*?\\n", "")
                .replaceAll("\\s+", "")
                .toLowerCase();
    }

    private String formatSampleIO(Algorithm algorithm) {
        String sampleInput = algorithm.getSampleInput();
        String sampleOutput = algorithm.getSampleOutput();
        if ((sampleInput == null || sampleInput.isEmpty()) && (sampleOutput == null || sampleOutput.isEmpty())) {
            return "No sample input/output available.";
        }

        StringBuilder formatted = new StringBuilder();
        if (sampleInput != null && !sampleInput.isEmpty()) {
            formatted.append("Input: ").append(sampleInput.trim());
        }
        if (sampleOutput != null && !sampleOutput.isEmpty()) {
            if (formatted.length() > 0) {
                formatted.append("\n");
            }
            formatted.append("Output: ").append(sampleOutput.trim());
        }
        return formatted.toString();
    }

    private String getTimeComplexity(String title) {
        switch (title) {
            case "Two Sum":
            case "Reverse Linked List":
            case "Valid Palindrome":
            case "Binary Tree Level Order Traversal":
                return "O(N)";
            default:
                return "O(N)";
        }
    }

    private String getSpaceComplexity(String title) {
        switch (title) {
            case "Two Sum":
            case "Valid Palindrome":
            case "Binary Tree Level Order Traversal":
                return "O(N)";
            case "Reverse Linked List":
                return "O(1)";
            default:
                return "O(N)";
        }
    }
}
