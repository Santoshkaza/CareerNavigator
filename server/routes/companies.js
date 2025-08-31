import express from 'express';
const router = express.Router();

// Company data with interview questions
const companies = [
  {
    id: 'google',
    name: 'Google',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png',
    description: 'Google is a multinational technology company specializing in Internet-related services and products.',
    questions: [
      {
        id: 'google-1',
        title: 'String Encoder',
        description: 'Design an algorithm to encode a string such that the encoded string would be a palindrome.',
        difficulty: 'medium',
        category: 'Strings',
      },
      {
        id: 'google-2',
        title: 'LRU Cache Implementation',
        description: 'Implement a data structure for Least Recently Used (LRU) cache with O(1) operations.',
        difficulty: 'medium',
        category: 'System Design',
        url: 'https://leetcode.com/problems/lru-cache/',
      },
      {
        id: 'google-3',
        title: 'Next Greater Element',
        description: 'Find the next greater element for each element in an array.',
        difficulty: 'medium',
        category: 'Arrays',
        url: 'https://leetcode.com/problems/next-greater-element-i/',
      },
      {
        id: 'google-4',
        title: 'Word Ladder',
        description: 'Transform one word into another by changing only one letter at a time.',
        difficulty: 'hard',
        category: 'Graphs',
        url: 'https://leetcode.com/problems/word-ladder/',
      },
      {
        id: 'google-5',
        title: 'Merge K Sorted Lists',
        description: 'Merge k sorted linked lists into a single sorted linked list.',
        difficulty: 'hard',
        category: 'Linked Lists',
        url: 'https://leetcode.com/problems/merge-k-sorted-lists/',
      },
    ],
  },
  {
    id: 'facebook',
    name: 'Meta (Facebook)',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Facebook_f_Logo_%282023%29.svg/2048px-Facebook_f_Logo_%282023%29.svg.png',
    description: 'Meta (formerly Facebook) is a global social media and technology company.',
    questions: [
      {
        id: 'meta-1',
        title: 'Valid Parentheses',
        description: 'Determine if a string of parentheses is valid.',
        difficulty: 'easy',
        category: 'Stacks',
        url: 'https://leetcode.com/problems/valid-parentheses/',
      },
      {
        id: 'meta-2',
        title: 'Clone Graph',
        description: 'Create a deep copy of a given graph.',
        difficulty: 'medium',
        category: 'Graphs',
        url: 'https://leetcode.com/problems/clone-graph/',
      },
      {
        id: 'meta-3',
        title: 'Add Binary',
        description: 'Add two binary strings and return their sum as a binary string.',
        difficulty: 'easy',
        category: 'Strings',
        url: 'https://leetcode.com/problems/add-binary/',
      },
      {
        id: 'meta-4',
        title: 'Merge Intervals',
        description: 'Merge all overlapping intervals and return the non-overlapping intervals.',
        difficulty: 'medium',
        category: 'Arrays',
        url: 'https://leetcode.com/problems/merge-intervals/',
      },
      {
        id: 'meta-5',
        title: 'Minimum Remove to Make Valid Parentheses',
        description: 'Remove the minimum number of parentheses to make a string valid.',
        difficulty: 'medium',
        category: 'Strings',
        url: 'https://leetcode.com/problems/minimum-remove-to-make-valid-parentheses/',
      },
    ],
  },
  {
    id: 'amazon',
    name: 'Amazon',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1200px-Amazon_logo.svg.png',
    description: 'Amazon is a multinational technology company focusing on e-commerce, cloud computing, and digital streaming.',
    questions: [
      {
        id: 'amazon-1',
        title: 'Two Sum',
        description: 'Find indices of two numbers such that they add up to a specific target.',
        difficulty: 'easy',
        category: 'Arrays',
        url: 'https://leetcode.com/problems/two-sum/',
      },
      {
        id: 'amazon-2',
        title: 'Reorder Log Files',
        description: 'Reorder log files so that letter logs come before digit logs.',
        difficulty: 'easy',
        category: 'Strings',
        url: 'https://leetcode.com/problems/reorder-data-in-log-files/',
      },
      {
        id: 'amazon-3',
        title: 'Meeting Rooms II',
        description: 'Find the minimum number of meeting rooms required.',
        difficulty: 'medium',
        category: 'Arrays',
      },
      {
        id: 'amazon-4',
        title: 'Longest Palindromic Substring',
        description: 'Find the longest palindromic substring in a string.',
        difficulty: 'medium',
        category: 'Strings',
        url: 'https://leetcode.com/problems/longest-palindromic-substring/',
      },
      {
        id: 'amazon-5',
        title: 'Copy List with Random Pointer',
        description: 'Create a deep copy of a linked list where each node has a random pointer.',
        difficulty: 'medium',
        category: 'Linked Lists',
        url: 'https://leetcode.com/problems/copy-list-with-random-pointer/',
      },
    ],
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/1200px-Microsoft_logo.svg.png',
    description: 'Microsoft is a multinational technology company that develops and supports software, services, and devices.',
    questions: [
      {
        id: 'microsoft-1',
        title: 'Reverse String',
        description: 'Reverse a string in-place.',
        difficulty: 'easy',
        category: 'Strings',
        url: 'https://leetcode.com/problems/reverse-string/',
      },
      {
        id: 'microsoft-2',
        title: 'Spiral Matrix',
        description: 'Return all elements of a matrix in spiral order.',
        difficulty: 'medium',
        category: 'Arrays',
        url: 'https://leetcode.com/problems/spiral-matrix/',
      },
      {
        id: 'microsoft-3',
        title: 'String to Integer (atoi)',
        description: 'Convert a string to a 32-bit signed integer.',
        difficulty: 'medium',
        category: 'Strings',
        url: 'https://leetcode.com/problems/string-to-integer-atoi/',
      },
      {
        id: 'microsoft-4',
        title: 'Binary Tree Level Order Traversal',
        description: 'Return the level order traversal of a binary tree nodes values.',
        difficulty: 'medium',
        category: 'Trees',
        url: 'https://leetcode.com/problems/binary-tree-level-order-traversal/',
      },
      {
        id: 'microsoft-5',
        title: 'LRU Cache',
        description: 'Design and implement a data structure for Least Recently Used (LRU) cache.',
        difficulty: 'medium',
        category: 'System Design',
        url: 'https://leetcode.com/problems/lru-cache/',
      },
    ],
  },
  {
    id: 'apple',
    name: 'Apple',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Apple-logo.png/600px-Apple-logo.png',
    description: 'Apple Inc. is a multinational technology company that designs and develops consumer electronics, software, and online services.',
    questions: [
      {
        id: 'apple-1',
        title: 'Find Peak Element',
        description: 'Find a peak element in an array where adjacent elements are different.',
        difficulty: 'medium',
        category: 'Arrays',
        url: 'https://leetcode.com/problems/find-peak-element/',
      },
      {
        id: 'apple-2',
        title: 'Product of Array Except Self',
        description: 'Return an array where each element is the product of all elements except itself.',
        difficulty: 'medium',
        category: 'Arrays',
        url: 'https://leetcode.com/problems/product-of-array-except-self/',
      },
      {
        id: 'apple-3',
        title: 'Merge Two Sorted Lists',
        description: 'Merge two sorted linked lists into a single sorted linked list.',
        difficulty: 'easy',
        category: 'Linked Lists',
        url: 'https://leetcode.com/problems/merge-two-sorted-lists/',
      },
      {
        id: 'apple-4',
        title: 'Maximum Subarray',
        description: 'Find the contiguous subarray with the largest sum.',
        difficulty: 'easy',
        category: 'Arrays',
        url: 'https://leetcode.com/problems/maximum-subarray/',
      },
      {
        id: 'apple-5',
        title: 'Trapping Rain Water',
        description: 'Calculate how much water can be trapped after raining.',
        difficulty: 'hard',
        category: 'Arrays',
        url: 'https://leetcode.com/problems/trapping-rain-water/',
      },
    ],
  },
];

router.get('/', (req, res) => {
  const { search } = req.query;
  let filteredCompanies = companies;

  if (search) {
    filteredCompanies = companies.filter(company =>
      company.name.toLowerCase().includes(search.toLowerCase()) ||
      company.description.toLowerCase().includes(search.toLowerCase())
    );
  }

  res.json(filteredCompanies);
});

router.get('/:id', (req, res) => {
  const company = companies.find(c => c.id === req.params.id);
  if (!company) return res.status(404).json({ message: 'Company not found' });
  res.json(company);
});

export default router;
