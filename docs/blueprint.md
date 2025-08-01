# **App Name**: QUEST Study Hub

## Core Features:

- User Authentication: User registration and login with Firebase Authentication (email/password, full name, email, contact number, roll no, department, semester, batch, password).
- Role Management: Role-based access control (student/admin) managed in Firestore.
- Material Upload: Material upload functionality with metadata (subject, semester, department, material type, description) and file storage in Firebase Storage. Default state: unapproved.
- Admin Approval Workflow: Admin dashboard to approve or reject uploaded materials; on approval, the status gets updated and the item is viewable by students.
- Material Browsing: Display materials categorized by department, semester, and subject across dedicated pages.
- Material Views: Display different material types (past papers, notes, lab manuals) in separate views.
- Responsive Design: Full responsiveness for all devices (mobile-friendly design).

## Style Guidelines:

- Primary color: A calm yet intellectual blue (#4A80E2). This color fosters trust and promotes a sense of stability, aligning with an academic atmosphere.
- Background color: A very light, desaturated blue (#F0F4FF), offering a clean and uncluttered backdrop that ensures readability and reduces distractions.
- Accent color: A contrasting vibrant purple (#944AE2). Highlighting call-to-action buttons and interactive elements.
- Body font: 'Raleway' (sans-serif), as requested.
- Headline font: 'Poppins' (sans-serif), as requested. Note: currently only Google Fonts are supported.
- Use modern, clear icons to represent material types, departments, and actions.
- Clean and structured layout with a consistent navbar and footer across all pages. Use card-based layouts for material display.