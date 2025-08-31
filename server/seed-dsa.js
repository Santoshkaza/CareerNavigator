import mongoose from 'mongoose';
import dotenv from 'dotenv';
import DSAProblem from './models/DSAProblem.js';

dotenv.config();

// DSA problems data (same as in frontend)
const dsaProblems = [
  // Arrays
  {
    id: 'two-sum',
    title: 'Two Sum',
    description: 'Find two numbers that add up to a specific target.',
    difficulty: 'easy',
    category: 'arrays',
    url: 'https://leetcode.com/problems/two-sum/',
    companies: ['Amazon', 'Google', 'Facebook', 'Microsoft'],
  },
  {
    id: 'container-with-most-water',
    title: 'Container With Most Water',
    description: 'Find two lines that together with the x-axis form a container that holds the most water.',
    difficulty: 'medium',
    category: 'arrays',
    url: 'https://leetcode.com/problems/container-with-most-water/',
    companies: ['Amazon', 'Google', 'Apple'],
  },
  {
    id: '3sum',
    title: '3Sum',
    description: 'Find all unique triplets in the array which gives the sum of zero.',
    difficulty: 'medium',
    category: 'arrays',
    url: 'https://leetcode.com/problems/3sum/',
    companies: ['Facebook', 'Amazon', 'Microsoft'],
  },
  {
    id: 'maximum-subarray',
    title: 'Maximum Subarray',
    description: 'Find the contiguous subarray which has the largest sum.',
    difficulty: 'medium',
    category: 'arrays',
    url: 'https://leetcode.com/problems/maximum-subarray/',
    companies: ['Amazon', 'Microsoft', 'Apple'],
  },
  {
    id: 'product-of-array-except-self',
    title: 'Product of Array Except Self',
    description: 'Return an array such that each element is the product of all array elements except itself.',
    difficulty: 'medium',
    category: 'arrays',
    url: 'https://leetcode.com/problems/product-of-array-except-self/',
    companies: ['Facebook', 'Amazon', 'Microsoft'],
  },

  // Strings
  {
    id: 'valid-palindrome',
    title: 'Valid Palindrome',
    description: 'Determine if a string is a palindrome, considering only alphanumeric characters.',
    difficulty: 'easy',
    category: 'strings',
    url: 'https://leetcode.com/problems/valid-palindrome/',
    companies: ['Facebook', 'Microsoft', 'Amazon'],
  },
  {
    id: 'longest-substring-without-repeating-characters',
    title: 'Longest Substring Without Repeating Characters',
    description: 'Find the length of the longest substring without repeating characters.',
    difficulty: 'medium',
    category: 'strings',
    url: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/',
    companies: ['Amazon', 'Google', 'Facebook'],
  },
  {
    id: 'longest-palindromic-substring',
    title: 'Longest Palindromic Substring',
    description: 'Find the longest palindromic substring in a string.',
    difficulty: 'medium',
    category: 'strings',
    url: 'https://leetcode.com/problems/longest-palindromic-substring/',
    companies: ['Amazon', 'Microsoft', 'Google'],
  },
  {
    id: 'group-anagrams',
    title: 'Group Anagrams',
    description: 'Group strings that are anagrams of each other.',
    difficulty: 'medium',
    category: 'strings',
    url: 'https://leetcode.com/problems/group-anagrams/',
    companies: ['Amazon', 'Facebook', 'Bloomberg'],
  },
  {
    id: 'minimum-window-substring',
    title: 'Minimum Window Substring',
    description: 'Find the minimum window in a string that contains all characters of another string.',
    difficulty: 'hard',
    category: 'strings',
    url: 'https://leetcode.com/problems/minimum-window-substring/',
    companies: ['Facebook', 'Amazon', 'Google'],
  },

  // Linked Lists
  {
    id: 'reverse-linked-list',
    title: 'Reverse Linked List',
    description: 'Reverse a singly linked list.',
    difficulty: 'easy',
    category: 'linked-lists',
    url: 'https://leetcode.com/problems/reverse-linked-list/',
    companies: ['Amazon', 'Google', 'Microsoft'],
  },
  {
    id: 'linked-list-cycle',
    title: 'Linked List Cycle',
    description: 'Determine if a linked list has a cycle in it.',
    difficulty: 'easy',
    category: 'linked-lists',
    url: 'https://leetcode.com/problems/linked-list-cycle/',
    companies: ['Amazon', 'Microsoft', 'Google'],
  },
  {
    id: 'merge-two-sorted-lists',
    title: 'Merge Two Sorted Lists',
    description: 'Merge two sorted linked lists into a single sorted linked list.',
    difficulty: 'easy',
    category: 'linked-lists',
    url: 'https://leetcode.com/problems/merge-two-sorted-lists/',
    companies: ['Amazon', 'Microsoft', 'Apple'],
  },
  {
    id: 'remove-nth-node-from-end-of-list',
    title: 'Remove Nth Node From End of List',
    description: 'Remove the nth node from the end of a linked list.',
    difficulty: 'medium',
    category: 'linked-lists',
    url: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/',
    companies: ['Amazon', 'Facebook', 'Microsoft'],
  },
  {
    id: 'lru-cache',
    title: 'LRU Cache',
    description: 'Implement a data structure for Least Recently Used (LRU) cache.',
    difficulty: 'medium',
    category: 'linked-lists',
    url: 'https://leetcode.com/problems/lru-cache/',
    companies: ['Amazon', 'Google', 'Microsoft', 'Facebook'],
  },

  // Trees & Graphs
  {
    id: 'maximum-depth-of-binary-tree',
    title: 'Maximum Depth of Binary Tree',
    description: 'Find the maximum depth of a binary tree.',
    difficulty: 'easy',
    category: 'trees-graphs',
    url: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/',
    companies: ['Amazon', 'Google', 'Apple'],
  },
  {
    id: 'same-tree',
    title: 'Same Tree',
    description: 'Check if two binary trees are the same.',
    difficulty: 'easy',
    category: 'trees-graphs',
    url: 'https://leetcode.com/problems/same-tree/',
    companies: ['Amazon', 'Facebook', 'Microsoft'],
  },
  {
    id: 'binary-tree-level-order-traversal',
    title: 'Binary Tree Level Order Traversal',
    description: 'Return the level order traversal of a binary tree nodes values.',
    difficulty: 'medium',
    category: 'trees-graphs',
    url: 'https://leetcode.com/problems/binary-tree-level-order-traversal/',
    companies: ['Amazon', 'Microsoft', 'Facebook'],
  },
  {
    id: 'validate-binary-search-tree',
    title: 'Validate Binary Search Tree',
    description: 'Determine if a binary tree is a valid binary search tree (BST).',
    difficulty: 'medium',
    category: 'trees-graphs',
    url: 'https://leetcode.com/problems/validate-binary-search-tree/',
    companies: ['Amazon', 'Facebook', 'Microsoft'],
  },
  {
    id: 'word-ladder',
    title: 'Word Ladder',
    description: 'Find the length of shortest transformation sequence from beginWord to endWord.',
    difficulty: 'hard',
    category: 'trees-graphs',
    url: 'https://leetcode.com/problems/word-ladder/',
    companies: ['Amazon', 'Facebook', 'Google'],
  },

  // Dynamic Programming
  {
    id: 'climbing-stairs',
    title: 'Climbing Stairs',
    description: 'Count the number of ways to climb to the top of a staircase.',
    difficulty: 'easy',
    category: 'dynamic-programming',
    url: 'https://leetcode.com/problems/climbing-stairs/',
    companies: ['Amazon', 'Apple', 'Microsoft'],
  },
  {
    id: 'house-robber',
    title: 'House Robber',
    description: 'Find the maximum amount of money you can rob without alerting the police.',
    difficulty: 'medium',
    category: 'dynamic-programming',
    url: 'https://leetcode.com/problems/house-robber/',
    companies: ['Google', 'Amazon', 'Airbnb'],
  },
  {
    id: 'coin-change',
    title: 'Coin Change',
    description: 'Find the fewest number of coins to make up a given amount.',
    difficulty: 'medium',
    category: 'dynamic-programming',
    url: 'https://leetcode.com/problems/coin-change/',
    companies: ['Amazon', 'Microsoft', 'Google'],
  },
  {
    id: 'longest-increasing-subsequence',
    title: 'Longest Increasing Subsequence',
    description: 'Find the length of the longest increasing subsequence.',
    difficulty: 'medium',
    category: 'dynamic-programming',
    url: 'https://leetcode.com/problems/longest-increasing-subsequence/',
    companies: ['Microsoft', 'Amazon', 'Google'],
  },
  {
    id: 'regular-expression-matching',
    title: 'Regular Expression Matching',
    description: 'Implement regular expression matching with support for "." and "*".',
    difficulty: 'hard',
    category: 'dynamic-programming',
    url: 'https://leetcode.com/problems/regular-expression-matching/',
    companies: ['Google', 'Facebook', 'Microsoft'],
  },
];

const seedDSAProblems = async () => {
  try {
    console.log('🌱 Seeding DSA problems...');

    // Clear existing problems
    await DSAProblem.deleteMany({});
    console.log('🗑️ Cleared existing DSA problems');

    // Insert new problems
    const insertedProblems = await DSAProblem.insertMany(dsaProblems);
    console.log(`✅ Successfully seeded ${insertedProblems.length} DSA problems`);

    // Get categories for verification
    const categories = await DSAProblem.distinct('category');
    console.log('📂 Categories:', categories);

    // Get count by difficulty
    const easyCount = await DSAProblem.countDocuments({ difficulty: 'easy' });
    const mediumCount = await DSAProblem.countDocuments({ difficulty: 'medium' });
    const hardCount = await DSAProblem.countDocuments({ difficulty: 'hard' });

    console.log(`📊 Problems by difficulty: Easy: ${easyCount}, Medium: ${mediumCount}, Hard: ${hardCount}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding DSA problems:', error);
    process.exit(1);
  }
};

// Connect to MongoDB and seed
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/techcareer')
  .then(() => {
    console.log('✅ Connected to MongoDB for seeding');
    return seedDSAProblems();
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  });
