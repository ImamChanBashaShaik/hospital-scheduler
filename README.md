Hospital Appointment Scheduler
🌐 Live Demo

👉 [View Deployed App on Vercel](https://hospital-scheduler-kappa.vercel.app/)

🎥 Screencast

🎬 [Watch Project Explanation Video](https://www.loom.com/share/c176701a99ab47bd91e175e98234b590?sid=59b3fcb3-fe66-4e36-9673-9dac3b71ea79)

🧠 About the Project

This project is a Hospital Appointment Scheduling System built for the Frontend Challenge.
It allows hospital staff to view and manage doctor appointments in both day and week views.

The app supports:

Viewing schedules for multiple doctors

Showing appointments in their correct time slots

Color-coded appointment types

Responsive calendar layout

Role-based filtering (Front Desk vs. Doctor view)

⚙️ Tech Stack

Framework: Next.js 14 + TypeScript

Styling: Tailwind CSS

Language: TypeScript

State & Logic: React Hooks

Data: Mock data for doctors, patients, and appointments

Utilities: date-fns for date/time formatting

🧩 Architecture Overview

Layer	Description
UI Components	Presentational components like DoctorSelector, DayView, WeekView, and ScheduleView.
Hooks	useAppointments.ts handles fetching and filtering appointments.
Service Layer	appointmentService.ts provides appointment data from mock JSON.
Types	types/index.ts defines strong TypeScript models for doctors, patients, and appointments.

🧱 Folder Structure

app/
├── page.tsx
├── schedule/
│   └── page.tsx
components/
├── ScheduleView.tsx
├── DayView.tsx
├── WeekView.tsx
├── DoctorSelector.tsx
├── AppointmentCard.tsx
hooks/
└── useAppointments.ts
services/
└── appointmentService.ts
data/
└── mockData.ts
types/
└── index.ts

🎨 Features

✅ Doctor Filter Dropdown – Select a doctor to view their schedule
✅ Day View Calendar – 30-minute slot appointments from 8 AM – 6 PM
✅ Week View Calendar – Displays all days of the week with appointments
✅ Color Coding

Blue → Checkup

Green → Consultation

Orange → Follow-up

Purple → Procedure
✅ Responsive Design – Works across desktop and mobile
✅ Mock Data Integration – Uses pre-defined doctors, patients & appointments

🤖 AI Tools Used

ChatGPT (OpenAI GPT-5) – used for:

Project architecture guidance

Component logic structuring

Bug fixing & code optimization

README and documentation creation

🧭 How to Run Locally
# Clone the repository
git clone https://github.com/ImamChanBashaShaik/hospital-scheduler.git

# Navigate to the project folder
cd hospital-scheduler

# Install dependencies
npm install

# Run the development server
npm run dev


Then open:
👉 http://localhost:3000

🚀 Deployment

This project is deployed using Vercel.
Link: https://hospital-scheduler-kappa.vercel.app/

👤 Author

Imam Chan Basha Shaik
📧 chanbashashaik81660@gmail.com
💼 GitHub Profile: https://github.com/ImamChanBashaShaik/

💬 Notes

This project was built within the challenge timeframe with a focus on clean architecture, readability, and accurate scheduling visualization.

🔗 Submission Links

GitHub Repo: https://github.com/ImamChanBashaShaik/hospital-scheduler

Live Demo (Vercel): https://hospital-scheduler-kappa.vercel.app/

Video (Loom): https://www.loom.com/share/c176701a99ab47bd91e175e98234b590