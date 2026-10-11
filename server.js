const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// In-memory databases
let volunteers = [
  { name: "Rahul Sharma", age: 24, email: "rahul@gmail.com", phone: "+91 98765 43210", city: "Aurangabad", interest: ["plantation", "cleanup"], avail: "Weekends", msg: "I love nature and want to make Aurangabad green!" },
  { name: "Priya Patil", age: 22, email: "priya@gmail.com", phone: "+91 87654 32109", city: "Pune", interest: ["awareness", "education"], avail: "Both", msg: "Educating kids about carbon footprint is very important." }
];

let contacts = [
  { name: "Amit Deshmukh", email: "amit@gmail.com", phone: "+91 99887 76655", subject: "Partnership Inquiry", message: "We want to sponsor your next tree plantation drive." }
];

let members = [
  { 
    id: "PGHF-2026-1082", 
    name: "Prasad Narwade", 
    email: "pnarwade057@gmail.com", 
    phone: "+91 7559281109", 
    bloodGroup: "O+", 
    joinDate: "2026-05-15", 
    role: "Core Organizer",
    avatar: "avatar1"
  },
  { 
    id: "PGHF-2026-1001", 
    name: "Aditya Kulkarni", 
    email: "aditya@gmail.com", 
    phone: "+91 9192709452", 
    bloodGroup: "A+", 
    joinDate: "2026-05-18", 
    role: "Active Member",
    avatar: "avatar3"
  }
];

// VOLUNTEERS API
app.post("/volunteer", (req, res) => {
  const volunteer = req.body;
  if (!volunteer.name || !volunteer.email || !volunteer.phone) {
    return res.status(400).send({ success: false, message: "Missing required fields!" });
  }
  volunteers.push(volunteer);
  console.log("New Volunteer Signed Up:", volunteer);
  res.send({ success: true, message: "Registration successful! Welcome to the green team." });
});

app.get("/api/volunteers", (req, res) => {
  res.json(volunteers);
});

// CONTACT API
app.post("/contact", (req, res) => {
  const contact = req.body;
  if (!contact.name || !contact.email || !contact.subject || !contact.message) {
    return res.status(400).send({ success: false, message: "Missing required fields!" });
  }
  contacts.push(contact);
  console.log("New Contact Form Message:", contact);
  res.send({ success: true, message: "Message sent! We will contact you soon." });
});

app.get("/api/contacts", (req, res) => {
  res.json(contacts);
});

// MEMBERS API
app.post("/member-apply", (req, res) => {
  const { name, email, phone, bloodGroup, avatar, joinDate, role } = req.body;
  if (!name || !email || !phone || !bloodGroup) {
    return res.status(400).send({ success: false, message: "Missing required fields!" });
  }
  
  // Check if member already exists
  const existingMember = members.find(m => m.email.toLowerCase() === email.toLowerCase());
  if (existingMember) {
    return res.send({ success: true, message: "Welcome back! Generating card...", member: existingMember });
  }

  // Generate unique ID
  const randomNum = Math.floor(1000 + Math.random() * 9000); // 4 digit code
  const memberId = `PGHF-2026-${randomNum}`;

  const newMember = {
    id: memberId,
    name,
    email,
    phone,
    bloodGroup,
    joinDate: joinDate || new Date().toISOString().split('T')[0],
    role: role || "Eco Member",
    avatar: avatar || "avatar1"
  };

  members.push(newMember);
  console.log("New Member Registered:", newMember);
  res.send({ success: true, message: "Membership approved!", member: newMember });
});

app.get("/api/members", (req, res) => {
  res.json(members);
});

// Search for member details (via email) to render ID card
app.get("/api/member/search", (req, res) => {
  const email = req.query.email;
  if (!email) {
    return res.status(400).send({ success: false, message: "Email parameter is required!" });
  }

  const member = members.find(m => m.email.toLowerCase() === email.trim().toLowerCase());
  if (member) {
    res.json({ success: true, member });
  } else {
    res.status(404).json({ success: false, message: "Member not found. Please apply first." });
  }
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));