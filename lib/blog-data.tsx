import React from "react";

export const blogPosts = [
  {
    slug: "mastering-react-hooks",
    title: "Mastering React Hooks: A Deep Dive into useEffect",
    description: "Understand the intricacies of the useEffect hook and avoid common pitfalls to write cleaner, more efficient React components.",
    date: "August 10, 2025",
    content: (
      <div className="space-y-6">
        <p>The useEffect hook is one of the most powerful tools in a React developer&apos;s arsenal, but it&apos;s also one of the most misunderstood. In this post, we&apos;ll break down how it works, explore its dependency array, and cover best practices for fetching data, managing subscriptions, and more.</p>
        <h3 className="text-xl font-bold">The Dependency Array: Your Key to Control</h3>
        <p>The second argument to useEffect is the dependency array. This array tells React when to re-run your effect. If you pass an empty array `[]`, the effect will only run once after the initial render. If you omit it entirely, the effect will run after every single render—a recipe for performance issues!</p>
        {/* Add more content here */}
      </div>
    ),
  },
  {
    slug: "devops-on-a-budget",
    title: "DevOps on a Budget: CI/CD with GitHub Actions and Docker",
    description: "Learn how to set up a robust, automated CI/CD pipeline for your projects for free using the powerful combination of Docker and GitHub Actions.",
    date: "July 22, 2025",
    content: (
      <div className="space-y-6">
        <p>Automating your deployment process doesn&apos;t have to be expensive or complicated. With GitHub Actions, you can create powerful workflows that build, test, and deploy your applications automatically whenever you push to your repository. When combined with Docker, you can ensure your application runs in a consistent environment every single time.</p>
        {/* Add more content here */}
      </div>
    ),
  },
  // Add more blog posts here
];
