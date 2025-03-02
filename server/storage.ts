import { type Experiment, type InsertExperiment, type Preferences, type InsertPreferences } from "@shared/schema";

export interface IStorage {
  getExperiments(): Promise<Experiment[]>;
  getExperiment(id: number): Promise<Experiment | undefined>;
  getPreferences(): Promise<Preferences>;
  updatePreferences(prefs: InsertPreferences): Promise<Preferences>;
}

export class MemStorage implements IStorage {
  private experiments: Map<number, Experiment>;
  private preferences: Preferences;

  constructor() {
    this.experiments = new Map();
    this.preferences = {
      id: 1,
      theme: "system",
      fontSize: 16,
      highContrast: false,
      starredExperiments: []
    };

    // Seed initial experiments from the original website
    const initialExperiments: Experiment[] = [
      {
        id: 1,
        title: "Bubble Sort",
        description: "The aim of this experiment is to understand the Bubble Sort algorithm, its time and space complexity. The experiment features interactive demonstrations, simulations, and practice exercises.",
        discipline: "Computer Science and Engineering",
        institute: "IIITH",
        estimatedTime: "1 hour",
        objectives: [
          "Given an unsorted array of numbers, generate a sorted array of numbers by applying Bubble Sort",
          "Optimise the Bubble Sort algorithm to achieve better performance",
          "Demonstrate knowledge of time complexity of Bubble Sort by counting the number of operations involved in each iteration"
        ],
        imageUrl: "https://cdn.vlabs.ac.in/exp-images/exp-bubble-sort-iiith/experiment-image.png",
        rating: 4,
        videoUrl: "https://youtu.be/1WHzXwp5l7g",
        aim: "To understand the Bubble Sort algorithm, its implementation, and analysis of its time complexity.",
        overview: "Bubble Sort is one of the simplest sorting algorithms. The algorithm gets its name from the way smaller elements 'bubble' to the top of the list. It repeatedly steps through the input list element by element, comparing the current element with the one after it, swapping their values if needed.",
        recap: "Before starting this experiment, we should have the following conceptual clarity:\n1. Arrays in programming\n2. Basic programming constructs (loops, conditionals)\n3. Time complexity basics",
        preTest: [
          {
            id: 1,
            question: "Which of the following is an array?",
            options: [
              "a: [1, 4, 3, 10]",
              "b: ['A', 3, 0, 'Hello world']",
              "c: ['Test', False, X, 'hi']",
              "d: [True, False, 6, 2.5]"
            ],
            correctAnswer: 0,
            difficulty: "Beginner",
            explanation: "Option a is a valid array containing numbers in a sequence."
          },
          {
            id: 2,
            question: "Which of the following is an array sorted in ascending order?",
            options: [
              "a: 1, 4, 5, -10",
              "b: -10, -13, 15, 100",
              "c: -1000, 0, 14, 27",
              "d: 100, 50, 10, 0"
            ],
            correctAnswer: 2,
            difficulty: "Beginner",
            explanation: "Option c shows numbers arranged in ascending order from smallest to largest."
          }
        ],
        postTest: [
          {
            id: 1,
            question: "How many iterations of the outer and inner loops will it take to sort the following array using the optimized algorithm?\nA = [-4, -9, -1, 8, -9, 4]",
            options: [
              "a: Outer = 4, Inner = 14",
              "b: Outer = 3, Inner = 12",
              "c: Outer = 5, Inner = 25",
              "d: Outer = 4, Inner = 20"
            ],
            correctAnswer: 0,
            difficulty: "Advanced",
            explanation: "The optimized bubble sort will require 4 outer iterations and 14 inner iterations to sort this array."
          }
        ],
        complexity: {
          timeComplexity: {
            best: "O(n)",
            average: "O(n²)",
            worst: "O(n²)"
          },
          spaceComplexity: "O(1)",
          recurrenceRelation: "T(n) = T(n-1) + O(n)",
          analysis: "Bubble sort has quadratic time complexity in average and worst cases. This makes it inefficient for large datasets. However, it has the advantage of being simple to understand and implement, and it requires only O(1) extra space."
        }
      },
      {
        id: 2,
        title: "Stacks and Queues",
        description: "In this experiment we will gain a basic understanding of Stacks and Queues as an abstract data type and understand applications of Stacks and Queues",
        discipline: "Computer Science and Engineering",
        institute: "IIITH",
        estimatedTime: "45 minutes",
        objectives: [
          "Understand Stack and Queue ADT",
          "Implement basic operations",
          "Explore real-world applications"
        ],
        imageUrl: "https://cdn.vlabs.ac.in/exp-images/exp-stacks-queues-iiith/experiment-image.png",
        rating: 3,
        videoUrl: null,
        aim: null,
        overview: null,
        recap: null,
        preTest: [],
        postTest: [],
        complexity: {
          timeComplexity: {
            best: "O(1)",
            average: "O(1)",
            worst: "O(1)"
          },
          spaceComplexity: "O(n)",
          analysis: "Stack and Queue operations have constant time complexity."
        }
      },
      {
        id: 3,
        title: "Merge Sort",
        description: "The aim of this experiment is to understand the Merge Sort algorithm, its time and space complexity, and how it compares against other sorting algorithms.",
        discipline: "Computer Science and Engineering",
        institute: "IIITH",
        estimatedTime: "1 hour",
        objectives: [
          "Understand divide-and-conquer strategy",
          "Implement Merge Sort algorithm",
          "Analyze time complexity"
        ],
        imageUrl: "https://cdn.vlabs.ac.in/exp-images/exp-merge-sort-iiith/experiment-image.png",
        rating: 4,
        videoUrl: null,
        aim: null,
        overview: null,
        recap: null,
        preTest: [],
        postTest: [],
        complexity: {}
      },
      {
        id: 4,
        title: "Breaking the Shift Cipher",
        description: "This experiment focuses on breaking the shift cipher, a historical encryption scheme with a small key space.",
        discipline: "Computer Science and Engineering",
        institute: "IIITH",
        estimatedTime: "30 minutes",
        objectives: [
          "Understand shift cipher mechanics",
          "Learn cryptanalysis techniques",
          "Practice decryption methods"
        ],
        imageUrl: "https://cdn.vlabs.ac.in/exp-images/exp-shift-cipher-iiith/experiment-image.png",
        rating: 3,
        videoUrl: null,
        aim: null,
        overview: null,
        recap: null,
        preTest: [],
        postTest: [],
        complexity: {}
      },
      {
        id: 5,
        title: "Word Analysis",
        description: "Experiment analyzes word morphology, identifying roots and affixes, highlighting language variations",
        discipline: "Computer Science and Engineering",
        institute: "IIITH",
        estimatedTime: "45 minutes",
        objectives: [
          "Analyze word structure",
          "Identify morphological patterns",
          "Study language variations"
        ],
        imageUrl: "https://cdn.vlabs.ac.in/exp-images/exp-word-analysis-iiith/experiment-image.png",
        rating: 4,
        videoUrl: null,
        aim: null,
        overview: null,
        recap: null,
        preTest: [],
        postTest: [],
        complexity: {}
      },
      {
        id: 6,
        title: "Linked Lists",
        description: "In this experiment we will learn the basics of the linked list",
        discipline: "Computer Science and Engineering",
        institute: "IIITH",
        estimatedTime: "1 hour",
        objectives: [
          "Understand linked list structure",
          "Implement basic operations",
          "Analyze performance characteristics"
        ],
        imageUrl: "https://cdn.vlabs.ac.in/exp-images/exp-linked-lists-iiith/experiment-image.png",
        rating: 4,
        videoUrl: null,
        aim: null,
        overview: null,
        recap: null,
        preTest: [],
        postTest: [],
        complexity: {}
      },
      {
        id: 7,
        title: "Depth First Search",
        description: "The aim of this experiment is to understand the basics of graphs and their representations and to understand the working of Depth First Traversal Algorithm for searching nodes.",
        discipline: "Computer Science and Engineering",
        institute: "IIITH",
        estimatedTime: "1 hour",
        objectives: [
          "Learn graph representations",
          "Implement DFS algorithm",
          "Analyze traversal patterns"
        ],
        imageUrl: "https://cdn.vlabs.ac.in/exp-images/exp-dfs-iiith/experiment-image.png",
        rating: 4,
        videoUrl: null,
        aim: null,
        overview: null,
        recap: null,
        preTest: [],
        postTest: [],
        complexity: {}
      },
      {
        id: 8,
        title: "Symmetric Key Encryption Standards (DES)",
        description: "Design the triple DES (3-DES) cryptosystem using an existing implementation of DES. Explore the steps to enhance DES by applying the triple encryption process in this experiment.",
        discipline: "Computer Science and Engineering",
        institute: "IIITH",
        estimatedTime: "1.5 hours",
        objectives: [
          "Understand DES algorithm",
          "Implement triple DES",
          "Analyze security improvements"
        ],
        imageUrl: "https://cdn.vlabs.ac.in/exp-images/exp-des-iiith/experiment-image.png",
        rating: 4,
        videoUrl: null,
        aim: null,
        overview: null,
        recap: null,
        preTest: [],
        postTest: [],
        complexity: {}
      }
    ];

    initialExperiments.forEach(exp => this.experiments.set(exp.id, exp));
  }

  async getExperiments(): Promise<Experiment[]> {
    return Array.from(this.experiments.values());
  }

  async getExperiment(id: number): Promise<Experiment | undefined> {
    return this.experiments.get(id);
  }

  async getPreferences(): Promise<Preferences> {
    return this.preferences;
  }

  async updatePreferences(prefs: InsertPreferences): Promise<Preferences> {
    this.preferences = { ...this.preferences, ...prefs };
    return this.preferences;
  }
}

export const storage = new MemStorage();