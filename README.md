You are a professional frontend developer.

Build a complete responsive frontend UI using:
- React.js (functional components + hooks)
- Tailwind CSS / Bootstrap 5 for styling
- Axios for API calls
- React Router for navigation
- Chart.js or Recharts for analytics graphs

Project Name:
Objective Consistency Evaluation Platform (OCEP)

Project Purpose:
This is an AI-driven learning analytics web application where students set learning goals, follow study plans, track progress, submit reflections, and view consistency analytics. The system evaluates whether students are consistently working toward their goals.

Design Requirements:
- Clean modern dashboard style
- Card-based layout
- Fully responsive
- Sidebar navigation
- Light theme with blue accent colors
- Simple and intuitive UI

--------------------------------------------------
PAGES TO IMPLEMENT
--------------------------------------------------

1. Authentication Pages
- Login page
- Register page
- Role selection (Student / Faculty / Admin)
- Form validation
- Bootstrap form design

2. Main Dashboard (Student)
Display:
- Active goals
- Today's study tasks
- Consistency score
- Burnout risk indicator
- Progress summary cards

3. Goal Management Page
- Create new goal form
- Goal list view
- Goal detail page
- Progress percentage bar

Fields:
- goal title
- duration
- start date
- description

4. Study Plan Page
- Daily study plan list
- Mark task completed
- Task status badges
- Calendar style layout (optional)

5. Progress Tracking Page
- Enter completed problems
- Enter time spent
- Completion toggle
- History table

6. Reflection Submission Page
- Text area input
- Submit reflection
- Show NLP analysis results
   - detected difficulty
   - topic
   - sentiment

7. Analytics Dashboard
Charts:
- Consistency score over time
- Task completion rate
- Topic difficulty distribution
- Burnout trend

Use charts:
- Line chart
- Bar chart
- Pie chart

8. Notifications Panel
- Missed tasks alert
- Reminder messages
- Burnout warning

--------------------------------------------------
COMPONENT STRUCTURE
--------------------------------------------------

Create reusable components:
- Sidebar
- Navbar
- GoalCard
- ProgressChart
- TaskList
- ReflectionForm
- StatsCard
- Loader

--------------------------------------------------
API SERVICE LAYER
--------------------------------------------------

Create separate API service file using Axios.

Example endpoints:
- /api/auth/login
- /api/goals
- /api/study-plans
- /api/progress
- /api/reflections
- /api/analytics

--------------------------------------------------
PROJECT STRUCTURE
--------------------------------------------------

src/
  components/
  pages/
  services/
  hooks/
  layouts/
  App.js
  index.js

--------------------------------------------------
OUTPUT REQUIREMENTS
--------------------------------------------------

Generate:
- Complete React project structure
- All pages and components
- Routing setup
- Bootstrap styling
- Dummy sample data for testing
- Clean readable code
- Comments explaining logic

Do NOT skip files.
Generate full working frontend code.
