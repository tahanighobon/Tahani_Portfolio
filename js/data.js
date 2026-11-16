/* EDIT HERE: all portfolio content lives in this file. */
const SIMS=[
["Friction_on_an_Inclined_Plane","Friction on an Inclined Plane","Physics","Tilt the ramp and watch when the block starts to slide."],
["Projectile_Motion","Projectile Motion","Physics","Launch angle and speed against gravity."],
["Hookes_Law_and_Spring_Systems","Hooke's Law and Springs","Physics","Stretch springs and read force against extension."],
["Graphing_Linear_and_Nonlinear_Functions","Graphing Functions","Math","Plot linear and nonlinear functions and see parameters reshape them."],
["Integrals_as_Area_Explorer","Integrals as Area","Math","Slice a curve into rectangles and watch the area converge."],
["Interactive_Truss_Experiment","Interactive Truss","Engineering","Load a truss and find which members take tension or compression."],
["wind_load_tall_buildings","Wind Load on Tall Buildings","Engineering","How height and wind speed change the load on a tower."],
["hvac_load_estimator","HVAC Load Estimator","Engineering","Estimate heating and cooling load for a room."],
["traffic_intersection_simulator","Traffic Intersection","Engineering","Tune signals and flow at a road junction."],
["elevator-control-simulator","Elevator Control","Engineering","Compare dispatch strategies for a bank of lifts."],
["PID_Controller_Basics","PID Controller Basics","Electrical","Tune P, I and D gains and watch the response settle."],
["Logic_Gates_and_Truth_Tables","Logic Gates and Truth Tables","Electrical","Wire gates and build truth tables."],
["Solar_Panel_Angle_vs_Power","Solar Panel Angle vs Power","Energy","Find the angle that maximises output."],
["Solar_Panel_Tilt_and_Output","Solar Panel Tilt and Output","Energy","Tilt, season and energy yield."],
["Wind_Turbine_Experiment","Wind Turbine Experiment","Energy","Wind speed, blade pitch and power."],
["cpu_scheduling_simulator","CPU Scheduling","Computing and Data","FCFS, SJF, Round Robin and more, side by side."],
["page_replacement_simulator","Page Replacement","Computing and Data","FIFO, LRU and Optimal memory page replacement."],
["knn_simulator","K-Nearest Neighbors","Computing and Data","Move the query point and change k to see the vote shift."],
["linear_regression_simulator","Linear Regression","Computing and Data","Fit a line to your own scatter of points."],
["weather-visualizer","Weather Visualizer","Computing and Data","Explore weather data visually."]
].map(([f,t,c,d])=>({file:"simulations/"+f+".html",title:t,cat:c,desc:d}));

// ---- SAMPLES ----
// Games, in display order. type "video" = YouTube id, type "embed" = local playable game.
const P="assets/images/posters/";
// group = heading in the Games section. type "video" = YouTube id, "embed" = local game (opens full screen).
const GAMES=[
 {group:"Games",title:"Historical Place Game",sub:"3D educational game",type:"video",id:"3YJmAtWx0pc"},
 {group:"Games",title:"Football Game",sub:"3D educational game",type:"video",id:"F2rhlfZOPJU"},
 {group:"Games",title:"3D Educational Game",sub:"Virtual experiment",type:"video",id:"lesSJ7-lgrE"},
 {group:"Games",title:"MathVerse",sub:"Maths arcade, playable",type:"embed",file:"games/mathverse/index.html",poster:P+"mathverse.jpg"},
 {group:"Card games",title:"Match the Gate",sub:"Logic gate matching, playable",type:"embed",file:"games/cards/index1.html",poster:P+"logic-gates.jpg"},
 {group:"Card games",title:"Legends of History",sub:"Historical matching, playable",type:"embed",file:"games/cards/index2.html",poster:P+"legends-of-history.jpg"},
 {group:"Card games",title:"Explore the Solar System",sub:"Planet memory cards, playable",type:"embed",file:"games/cards/index3.html",poster:P+"solar-system.jpg"},
 {group:"Virtual reality",title:"VR Experience",sub:"Virtual reality",type:"video",id:"QX6AD-tporM"}
];
const SCENES=["grww8Nlq-5g","jUFqNFBA2Fk","_tma4of9l-M","2vGZcxmvxZg","E7yzpRI0ysw","L9dRoPzUqKU","gBQyibEhdYg","5uRz0t4OTAM","AFVKJFmvtO0","sxa3nDeaDrQ"].map((id,i)=>({id,title:"3D scene "+(i+1)}));
const VERBS=["touch","play","explore","tinker with","step into"];

// ---- CV ----

const SKILLS={
"Digital twins and virtual labs":["Digital twins","3D games","Virtual labs and simulations","Interactive 3D and 360 CGI environments","VR experiences","Arduino-linked twins","Interactive dashboards"],
"3D, programming and data tools":["Blender","UPBGE","Python","Arduino","MATLAB","SIMULINK","Multisim","Vibe coding","AI tools","Machine learning","Data analytics"],
"Instructional design and teaching":["Instructional design","Course creation","Online and blended learning","Moodle and LMS implementation","Game-based learning and gamification","STEAM education","Higher education","Educational facilitation","Education technology","Assessment planning and QA (IV/LIV)","Teaching","Research"],
"Media and creative production":["Storytelling","Storyboarding","Scriptwriting","Video editing","Video production planning and media supervision","CGI","3D design","Content creation","Design","Canva","Teleprompter","AI-generated images, audio, 3D objects and HDRI"]
};

const JOBS=[
["Oct 2024 – Present","Instructional Designer","D.Learn Center @ HTU",[
 "Collaborate with Subject Matter Experts across computing, engineering, sciences, languages and architecture to design theoretical and practical online and blended courses: identifying course nature, defining learning outcomes, and guiding SMEs through planning, design, development, production, review, implementation and student feedback.",
 "Write scripts, develop storyboards and design interactive content to improve learner engagement; supervise media production to deliver high-quality educational materials.",
 "Create interactive dashboards for analysis and education to support data-driven decisions and continuous improvement; create VR experiences and interactive experiments."]],
["Sep 2018 – Sep 2024","Research and Teaching Assistant","Al-Hussein Technical University",[
 "Role extended beyond teaching to research, academic projects, content creation and extracurricular activities.",
 "Delivered courses and laboratory sessions for Pearson and HTU units: 5 courses and 15 laboratories, and assigned as IV and LIV for several courses."]],
["Apr 2024 – Sep 2024","Research Assistant","Energy Department, HTU",[
 "Worked with Dr. Khalid Al-Zareer on the project “Development of Comprehensive Software for Energy Efficiency and Management: HTU-…”."]],
["Apr 2018 – Aug 2018","Trainer and Teacher","Genius Academy",[
 "Taught Electrical Machines and Drives, Electronics, Power Electronics and Numerical Analysis."]],
["Jan 2017 – Jun 2018","Trainee Designer Engineer (volunteer)","Center of Excellence for Innovation Projects, Jordan University of Science and Technology",[
 "Participated in several projects including a wireless power charger, and fixed-wing and drone controllers."]]
];
const COURSES_TAUGHT=["Electrical Machines","Engineering Mathematics","Further Mathematics","STEM I","STEM II"];
const LABS_TAUGHT=["Introduction to AI and Data Science","Data Analytics, Industrial Electronics and Storage","Power Systems","Electrical Machines","Electrical and Electronic Principles","Further Mathematics","Engineering Mathematics","Digital Principles","VHDL/FPGA","Further Electrical, Electronic and Digital","Electronic Circuits and Devices","Engineering Science","Mechatronics Systems"];

const NON_TEACH=[
["2023 – Present","HTU Film Club, Founder and Supervisor","Founded the club out of a passion for cinema, as a platform for film appreciation, discussion and creative exchange. Organised cultural, scientific and entertainment screenings and built partnerships with organisations and stakeholders that enriched the content, widened the audience and increased the club's impact."],
["Oct 2022 – Oct 2024","Head of SET Newsletter, Media and Website Committee","Managed the SET Newsletter and oversaw media and website content. Designed and directed a series of short educational videos with professors on electrical, mechanical and energy engineering, which also raised the college's visibility and outreach."],
["2021 – Oct 2022","HTU Educational YouTube Channel Supervisor","Created educational content, supervised the scientific content produced by colleagues, and managed and published it on the HTU Educational Channel."],
["2020 – 2024","Eco-Car Project, co-funded by Erasmus+","Developed a multidisciplinary diploma in electrical and hybrid vehicles, fostering collaboration between companies and higher education. Prepared educational materials and documentation and ran workshops. Funded workshops on Electrical and Hybrid Vehicles: National Technical University of Athens, 25–29 September 2023; University of Deusto, 9–13 January 2023."]
];
const JUDGING=["Judge, Sumo Robotics Competition, 2023","ISEF Jordan Projects Supervisor, 2024","Referee, Sumo Robotics Competition, 2024","University Liaison Officer at HTU, Crown Prince Award for Best Government Service Application, 2025–2026","Focal Point and Academic Supervisor, FinTech Rally Hackathon 2026"];
const PROJ=["In data science and machine learning, I led and collaborated on projects with students and colleagues: analysing movie data, predicting success with machine learning, forecasting revenue, and NLP for film review classification and sentiment analysis.","Our work also included real estate prediction, medical diagnosis, search algorithms and classic AI games. In engineering and education: a wireless charger, an electric formula car, a home automation system and robots."];
const ONLINE=["In 2020 and 2021 I taught several online labs, converting experiments into simulations in SIMULINK and Multisim to imitate reality, and running programming labs with MATLAB.","With the Online Learning Center (OLC) at Al-Hussein Technical University I created online courses including Building Services Pathway and Electrical Machines."];

const PAPERS=[
"Ghobon, T. A., Tutunji, T., Al-Sharif, L. Identification of Low-Power Artificial Intelligence Algorithms: Review, Comparison, and Selection. Energy. Under review.",
"Al-Sharif, L., Peters, R., Appleby, M., & Ghaben, T. (2025). Using machine learning in order to estimate the traffic mix in a building from the stops data. 16th Symposium on Lift and Escalator Technologies, 16(1), 7–18.",
"Al-Sharif, L., Peters, R., Appleby, M., & Ghaben, T. (2024). Estimating the Traffic Mix in a Building by Analysing the Stops Data per Round Trip. 15th Symposium on Lift and Escalator Technologies, 15, 7–14.",
"Al Fahoum, A., & Ghobon, T. A. (2023). Performance predictions of Sci-Fi Films via machine learning. Applied Sciences, 13(7), 4312.",
"Al Fahoum, A., & Ghobon, T. A. (2023). Accurate Machine Learning Predictions of Sci-Fi Film Performance. Journal of New Media, 5(1).",
"The Use of Artificial Intelligence and Robotics in Middle School Students to Artificial Intelligence and Robotics (2022), 1(24). Arabic-language publication.",
"Al-Fahoum, A., & Ghobon, T. (2020). An Applied Approach for Speed Estimation of Induction Motors Using Sensorless Flux Observer System with sliding mode field oriented control. Technology, 11(6), 109–122."
];
const EDU=["MicroMasters Degree in Statistics and Data Science – Massachusetts Institute of Technology (MIT) / edX, 2024","BSc in Electrical Engineering / Power – Jordan University of Science and Technology, 2018. GPA: Excellent","Secondary Education, Scientific Stream – Jerash Secondary School, 2013. GPA: 94.1"];
const COURSES=["Data Analysis: Statistical Modeling and Computation in Applications – MITx MicroMasters (edX), Sep 2024","Fundamentals of Statistics – MITx MicroMasters (edX), May 2024","Machine Learning with Python: From Linear Models to Deep Learning – MITx MicroMasters (edX), Dec 2023","Probability: The Science of Uncertainty and Data – MITx MicroMasters (edX), Sep 2023","Keeping Students Engaged: Building Strong Student/Teacher Connections in a Remote Learning Environment – Microsoft, Jun 2020","Staying Connected with Remote Learning through Microsoft Teams and Office 365 – Microsoft, Jun 2020","Assessment Planning and Assignment Writing, Engineering RQF BTEC Higher Nationals – Pearson, Jan 2019","EDIBON Teaching Units, Area of Energy – EDIBON, Jan 2019","The Art of Storytelling – Pixar Animation Studios, 2026"];
