
export const departments = [
  {
    id: 'csit',
    name: 'Computer Science & Information Technology',
    semesters: [
      { id: 1, name: 'Semester 1', subjects: ['Programming Fundamentals', 'Discrete Mathematics', 'Calculus', 'English Communication', 'Physics'] },
      { id: 2, name: 'Semester 2', subjects: ['Object-Oriented Programming', 'Linear Algebra', 'Digital Logic Design', 'Pakistan Studies'] },
      { id: 3, name: 'Semester 3', subjects: ['Data Structures', 'Computer Organization & Assembly Language', 'Differential Equations'] },
      { id: 4, name: 'Semester 4', subjects: ['Algorithms', 'Database Systems', 'Operating Systems', 'Probability & Statistics'] },
      { id: 5, name: 'Semester 5', subjects: ['Computer Networks', 'Software Engineering', 'Theory of Automata'] },
      { id: 6, name: 'Semester 6', subjects: ['Artificial Intelligence', 'Web Technologies', 'Compiler Construction'] },
      { id: 7, name: 'Semester 7', subjects: ['Machine Learning', 'Cybersecurity', 'Final Year Project - I'] },
      { id: 8, name: 'Semester 8', subjects: ['Cloud Computing', 'Big Data Analytics', 'Final Year Project - II'] },
    ],
  },
  {
    id: 'ee',
    name: 'Electrical Engineering',
    semesters: [
      { id: 1, name: 'Semester 1', subjects: ['Circuit Theory', 'Engineering Drawing', 'Applied Mathematics', 'English'] },
      { id: 2, name: 'Semester 2', subjects: ['Electronics-I', 'Electrical Machines-I', 'Calculus', 'Islamic Studies'] },
      { id: 3, name: 'Semester 3', subjects: ['Signals & Systems', 'Power Systems-I', 'Numerical Analysis'] },
      { id: 4, name: 'Semester 4', subjects: ['Control Systems', 'Digital Signal Processing', 'Power Electronics'] },
      { id: 5, name: 'Semester 5', subjects: ['Renewable Energy Systems', 'Microprocessors', 'Power Systems-II'] },
      { id: 6, name: 'Semester 6', subjects: ['Industrial Automation', 'Electrical Machine Design', 'Communication Systems'] },
      { id: 7, name: 'Semester 7', subjects: ['Smart Grid Technologies', 'Thesis-I'] },
      { id: 8, name: 'Semester 8', subjects: ['Advanced Power Systems', 'Thesis-II'] },
    ],
  },
  {
    id: 'ce',
    name: 'Civil Engineering',
    semesters: [
      { id: 1, name: 'Semester 1', subjects: ['Engineering Mechanics', 'Engineering Drawing', 'Basic Civil Engineering'] },
      { id: 2, name: 'Semester 2', subjects: ['Surveying', 'Construction Materials', 'Fluid Mechanics'] },
      { id: 3, name: 'Semester 3', subjects: ['Structural Analysis-I', 'Geotechnical Engineering-I'] },
      { id: 4, name: 'Semester 4', subjects: ['Concrete Technology', 'Transportation Engineering'] },
      { id: 5, name: 'Semester 5', subjects: ['Hydraulics', 'Environmental Engineering'] },
      { id: 6, name: 'Semester 6', subjects: ['Structural Design', 'Project Management'] },
      { id: 7, name: 'Semester 7', subjects: ['Earthquake Engineering', 'Thesis-I'] },
      { id: 8, name: 'Semester 8', subjects: ['Urban Planning', 'Thesis-II'] },
    ],
  },
  {
    id: 'me',
    name: 'Mechanical Engineering',
    semesters: [
        { id: 1, name: 'Semester 1', subjects: ['Thermodynamics', 'Engineering Materials', 'Basic Mechanics'] },
        { id: 2, name: 'Semester 2', subjects: ['Fluid Mechanics', 'Manufacturing Processes'] },
        { id: 3, name: 'Semester 3', subjects: ['Heat Transfer', 'Machine Design-I'] },
        { id: 4, name: 'Semester 4', subjects: ['Dynamics of Machinery', 'Control Engineering'] },
        { id: 5, name: 'Semester 5', subjects: ['CAD/CAM', 'Internal Combustion Engines'] },
        { id: 6, name: 'Semester 6', subjects: ['Robotics', 'Renewable Energy Systems'] },
        { id: 7, name: 'Semester 7', subjects: ['Industrial Engineering', 'Thesis-I'] },
        { id: 8, name: 'Semester 8', subjects: ['Advanced Manufacturing', 'Thesis-II'] },
    ],
  },
  {
    id: 'ai',
    name: 'Artificial Intelligence',
    semesters: [
        { id: 1, name: 'Semester 1', subjects: ['Introduction to AI', 'Programming in Python'] },
        { id: 2, name: 'Semester 2', subjects: ['Data Structures', 'Linear Algebra'] },
        { id: 3, name: 'Semester 3', subjects: ['Machine Learning Fundamentals', 'Probability & Statistics'] },
        { id: 4, name: 'Semester 4', subjects: ['Deep Learning', 'Computer Vision'] },
        { id: 5, name: 'Semester 5', subjects: ['Natural Language Processing', 'Reinforcement Learning'] },
        { id: 6, name: 'Semester 6', subjects: ['AI Ethics', 'Big Data Analytics'] },
        { id: 7, name: 'Semester 7', subjects: ['AI Project-I', 'Advanced Neural Networks'] },
        { id: 8, name: 'Semester 8', subjects: ['AI Project-II', 'Industry Applications'] },
    ],
  },
  {
    id: 'telecom',
    name: 'Telecommunication Engineering',
    semesters: [
        { id: 1, name: 'Semester 1', subjects: ['Basic Electronics', 'Calculus', 'Programming'] },
        { id: 2, name: 'Semester 2', subjects: ['Digital Communication', 'Circuit Analysis'] },
        { id: 3, name: 'Semester 3', subjects: ['Signals & Systems', 'Electromagnetic Theory'] },
        { id: 4, name: 'Semester 4', subjects: ['Wireless Communication', 'Data Networks'] },
        { id: 5, name: 'Semester 5', subjects: ['Optical Communication', 'Antenna Theory'] },
        { id: 6, name: 'Semester 6', subjects: ['Mobile Networks', 'Network Security'] },
        { id: 7, name: 'Semester 7', subjects: ['IoT & 5G', 'Thesis-I'] },
        { id: 8, name: 'Semester 8', subjects: ['Advanced Telecom Systems', 'Thesis-II'] },
    ],
  },
  {
    id: 'se',
    name: 'Software Engineering',
    semesters: [
        { id: 1, name: 'Semester 1', subjects: ['Introduction to SE', 'Programming Fundamentals'] },
        { id: 2, name: 'Semester 2', subjects: ['OOP', 'Database Concepts'] },
        { id: 3, name: 'Semester 3', subjects: ['Software Design & Architecture', 'Web Development'] },
        { id: 4, name: 'Semester 4', subjects: ['Software Testing', 'Human-Computer Interaction'] },
        { id: 5, name: 'Semester 5', subjects: ['Cloud Computing', 'Agile Development'] },
        { id: 6, name: 'Semester 6', subjects: ['DevOps', 'Cybersecurity'] },
        { id: 7, name: 'Semester 7', subjects: ['Capstone Project-I', 'AI in Software Engineering'] },
        { id: 8, name: 'Semester 8', subjects: ['Capstone Project-II', 'Industry Practices'] },
    ],
  },
  {
    id: 'chem',
    name: 'Chemical Engineering',
    semesters: [
        { id: 1, name: 'Semester 1', subjects: ['Basic Chemical Engineering', 'Calculus'] },
        { id: 2, name: 'Semester 2', subjects: ['Fluid Mechanics', 'Thermodynamics'] },
        { id: 3, name: 'Semester 3', subjects: ['Heat Transfer', 'Process Calculations'] },
        { id: 4, name: 'Semester 4', subjects: ['Mass Transfer', 'Chemical Reaction Engineering'] },
        { id: 5, name: 'Semester 5', subjects: ['Process Control', 'Petroleum Refining'] },
        { id: 6, name: 'Semester 6', subjects: ['Polymer Engineering', 'Environmental Chem Eng'] },
        { id: 7, name: 'Semester 7', subjects: ['Plant Design', 'Thesis-I'] },
        { id: 8, name: 'Semester 8', subjects: ['Industrial Safety', 'Thesis-II'] },
    ],
  },
];

// Helper function to get all semesters for dropdowns
export const getAllSemesters = () => {
    const allSemesters = new Map();
    departments.forEach(dept => {
        dept.semesters.forEach(sem => {
            if (!allSemesters.has(sem.id)) {
                allSemesters.set(sem.id, { id: sem.id, name: sem.name });
            }
        });
    });
    return Array.from(allSemesters.values()).sort((a, b) => a.id - b.id);
};

// We keep a simplified list of semesters for filtering, as subjects are now nested
export const semesters = getAllSemesters();

    