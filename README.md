# Research Discuss

## Problem Statement

Research students and faculty often rely on fragmented communication channels such as emails, messaging applications, and informal forums to discuss technical questions, share resources, and identify recurring conceptual doubts. This results in:

- Repeated questions without a structured knowledge base  
- Loss of valuable discussions over time  
- Difficulty in discovering relevant prior discussions or related work  
- Absence of a centralized, research-oriented discussion platform  

The objective of this project is to build a **centralized research discussion platform** that supports structured queries, collaborative discussion, and the gradual evolution of frequently asked research questions into a curated FAQ system.

---

## Solution Approach

**Research Discuss** is a web-based platform designed specifically for academic and research-oriented discussions.

The key design principles are:

- **Query-first design**: Users post clearly defined research queries with descriptions and tags  
- **Structured discussions**: Each query has a dedicated discussion page with threaded replies and attachments  
- **FAQ evolution**: Repeated or frequently occurring queries are automatically tracked and promoted as FAQ candidates  
- **Tag-based discovery**: Queries and blogs are organized using research-domain tags  
- **Separation of concerns**: Blogs, queries, FAQs, and user profiles are distinct but interconnected  

The system balances open discussion with long-term knowledge consolidation, making it suitable for a research-focused academic environment.

---

## Tech Stack Used

### Frontend
- Next.js (App Router)
- React
- TypeScript
- Material UI (MUI)
- CSS Modules

### Backend
- Next.js API Routes
- Node.js
- MongoDB
- Mongoose

### Authentication
- JSON Web Tokens (JWT)
- Cookie-based authentication

---

## Key Features

- Posting and browsing research queries  
- Tag-based filtering (e.g., Machine Learning, Systems, VLSI, Theory)  
- Threaded discussions on each query  
- File attachments for queries  
- Blog system with preview and full-content modal  
- FAQ system generated from repeated queries  
- User profiles with “My Queries” and “My Blogs”  
- Delete functionality for user-owned queries  
- Anonymous posting option  
- Fully responsive design for desktop and mobile devices  

---

## Instructions to Run the Code

### 1. Clone the repository
```bash
git clone https://github.com/your-username/research-discuss.git
cd research-discuss
