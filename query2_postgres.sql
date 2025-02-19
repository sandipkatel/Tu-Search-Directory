-- Insert data into CENTRAL_OFFICE
INSERT INTO CENTRAL_OFFICE (org_id, name, address) 
VALUES (1, 'Tribhuvan University', 'Kirtipur, Kathmandu, Nepal');

-- Insert data into INSTITUTE_FACULTIES
INSERT INTO INSTITUTE_FACULTIES (ORG_ID, NAME) 
VALUES 
(1, 'Institute of Medicine'),
(1, 'Institute of Engineering'),
(1, 'Institute of Forestry'),
(1, 'Institute of Agriculture and Animal Sciences'),
(1, 'Faculty of Management'),
(1, 'Faculty of Humanities and Social Sciences'),
(1, 'Faculty of Education'),
(1, 'Faculty of Law'),
(1, 'Institute of Science and Technology');

-- Insert data into CAMPUS
INSERT INTO CAMPUS (ho_id, name, location, website) 
VALUES 
(102, 'Pulchowk Engineering Campus', 'Pulchowk, Lalitpur', 'https://pcampus.edu.np/'),
(102, 'Thapathali Engineering Campus', 'Thapathali, Kathmandu', 'https://tcioe.edu.np/'),
(101, 'Maharajgunj Medical Campus', 'Maharajgunj, Kathmandu', 'https://mmciom.edu.np/'),
(103, 'Hetauda Forestry Campus', 'Hetauda, Makwanpur', NULL),
(103, 'Pokhara Forestry Campus', 'Pokhara, Kaski', NULL),
(104, 'Paklihawa Agriculture Campus', 'Paklihawa, Rupandehi', NULL),
(104, 'Lamjung Agriculture Campus', 'Sundarbazar, Lamjung', NULL),
(105, 'Public Administration Campus', 'Jamalm, Kathmandu', NULL),
(109, 'Patan Multiple Campus', 'Patan Dhoka, Lalitpur', NULL),
(107, 'Mahendra Ratna Campus', 'Tahachal, Kathmandu', NULL),
(108, 'Nepal Law Campus', 'Exhibition Road, Kathmandu', NULL);

-- Insert data into CENTRAL_DEPARTMENT
INSERT INTO CENTRAL_DEPARTMENT (org_id, name, contact, location, website, isActive) 
VALUES 
(1, 'Central Department of Computer Science and Information Technology', 'info@cdcsit.edu.np', 'Kirtipur, Kathmandu', 'https://cdcsit.tu.edu.np/', TRUE),
(1, 'Central Department of Anthropology', 'info@cda.tu.edu.np', 'Kirtipur, Kathmandu', 'https://cda.tu.edu.np/', TRUE),
(1, 'Central Department of Buddhist Studies', 'info@cdbs.tu.edu.np', 'Kirtipur, Kathmandu', 'https://cdbs.tu.edu.np/', TRUE),
(1, 'Central Department of Fine Arts', 'head@cdfa.tu.edu.np', 'Kirtipur, Kathmandu', 'https://cdfa.tu.edu.np/', TRUE),
(1, 'Central Department of Geography',  'info@cdg.tu.edu.np', 'Kirtipur, Kathmandu', 'https://cdg.tu.edu.np/', TRUE),
(1, 'Central Department of Hindi',  'info@cdh.tu.edu.np',  'Kirtipur, Kathmandu','https://cdh.tu.edu.np/', FALSE),
(1,'Central Department of Home Science','cdhs@admin.com','Kirtipur,Kathmandu','https://cdhs.tu.edu.np/',FALSE),
(1,'Central Department of Journalism and Mass Communication','head@cdjmc.tu.edu.np','Kirtipur,Kathmandu','https://cdjmc.tu.edu.np/',TRUE),
(1,'Central Department of Library and Information Science','info@cdlis.tu.edu.np','Kirtipur,Kathmandu','https://cdlis.tu.edu.np/',TRUE),
(1,'Office of the Controller of Examination','Info@exam.tu.edu.np','Kirtipur,Kathmandu','https://cdlis.tu.edu.np/',TRUE);

-- Insert data into DEPARTMENT
INSERT INTO DEPARTMENT (c_id,name ,contact) 
VALUES 
(1001,'Department of Computer and Electronic Engineering','ece@ioe.edu.np'),
(1001,'Department of Civil Engineering','civil@ioe.edu.np'),
(1001,'Department of Electrical Engineering','doee@pcampus.edu.np'),
(1001,'Department of Mechanical Engineering','mech.aero@pcampus.edu.np'),
(1001,'Department of Architecture','architecture.dept@pcampus.edu.np'),
(1002,'Department of Electronics and Computer Engineering','info@tcioe.edu.np'),
(1003,'Department of Anatomy','maharajgunjcampus@tu.edu.np'),
(1004,'Department of Forestry Science',NULL),
(1005,'Department of Veterinary Science',NULL),
(1006,'Department of Business Administration',NULL);

-- Insert data into PERSONNEL for Central Office
INSERT INTO PERSONNEL (name,email ,position,imageUrl ,org_id) 
VALUES 
('Prof. Keshar Jung Baral','vcoffice@tu.edu.n','Vice-Chancellor','https://portal.tu.edu.np/medias/Authorities_2024_08_05_20_51_35.jpg' , 1),
('Bhim Bahadur Shrestha','014330346' ,'Information Officer' ,'https://portal.tu.edu.np/medias/_MG_1549_2024_05_16_11_55_05.jpg' , 1);

-- Insert data into PERSONNEL for Institute/Faculty
INSERT INTO PERSONNEL (name,email ,position,imageUrl ,faculty_id) 
VALUES 
('Prof. Dr. Mohan Raj Sharma','iomdean@iom.edu.np' ,'Dean' ,'http://nepalspinefoundation.com/wp-content/uploads/2022/01/mohan.jpg' , 101),
('Prof. Dr. Sushil Bahadur Bajracharya' ,NULL ,'Dean' ,'https://i1.rgstatic.net/ii/profile.image/591446495215616-1518023241848_Q128/Sushil-Bajracharya.jpg' , 102),
('Prof. Dr. Suraj Lamichhane' ,NULL ,'Assistant Dean' ,'https://i1.rgstatic.net/ii/profile.image/909474961309696-1593847136371_Q128/Suraj-Lamichhane-2.jpg' , 102);

-- Insert data into PERSONNEL for Campus
INSERT INTO PERSONNEL (name,email ,position,imageUrl ,campus_id) 
VALUES 
('Assoc. Dr. Indra Prasad Acharya' ,'campusadmin@pcampus.edu.np' ,'Campus Chief' ,'https://portal.tu.edu.np/medias/indrasir_2023_01_25_09_23_21.jpg' , 1001);

-- Insert data into PERSONNEL for Central Departments
INSERT INTO PERSONNEL (name,email ,position,imageUrl ,c_dept_id) 
VALUES 
('Prof. Dr. Subarna Shakya' ,'drss@ioe.edu.np' ,'Head,Centre Department of Computer Science and IT' ,'https://cdcsit.edu.np/wp-content/uploads/avatars/13/5f1d1b969cf99-bpfull.jpg' , 201);

-- Insert data into PERSONNEL for Departments
INSERT INTO PERSONNEL (name,email ,position,imageUrl ,dept_id) 
VALUES 
('Asst. Prof. Dr. Jyoti Tandukar' ,'jyoti@tandukar.net' ,'HOD' ,'https://media.licdn.com/dms/image/v2/D5603AQFoSXyeNMlunQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1714129924049?e=1743638400&v=beta&t=pRxsOsrYlNJiAlPjHyX7g-Zkc0Zy3LqW8IiTErOwxxk' , 101),
('Asst. Prof. Santosh Giri' ,'santosh.giri@ioe.edu.np' ,'DHOD' ,'https://i1.rgstatic.net/ii/profile.image/919207885697024-1596167646055_Q128/Santosh-Giri-5.jpg' , 101),
('Asst. Prof. Dr. Aman Shakya' ,'aman.shakya@ioe.edu.np' ,'Assistant Professor' ,'https://lh5.googleusercontent.com/jev9NNgjJj22400sRwtiaNGc5qFEVt5JVE3T8AeM5AxK6Nk-BTKFsKZJNVuaFkd4UmGlvNtqgIlClic9Cb5XrBn5UdFR7z6U67QbZHazkz_x3zJpTCxpES3heOH0Yhp9cw=w1280' , 101);

-- Insert data into PROGRAM
INSERT INTO PROGRAM (name ,about,director_id) 
VALUES 
('Bachelor of Education (B.Ed)' ,'Since 1996 Tribhuvan University (TU) has been implementing three-year Bachelor programs with an annual examination system...' ,NULL ),
('Master of Education (M.Ed)' ,'Master of Education is a two-year programme offered in constitutional and affiliated campuses under FoE scattered in different parts of the country...' ,NULL ),
('LL.B (Bachelor of Laws)' ,'LL.B is a three-year programme for having bachelor’s degree in any discipline...' ,NULL ),
('BE in Computer Engineering' ,'Computer engineering is a discipline that integrates several fields of electrical engineering and computer science...' ,NULL ),
('BE in Electrical Engineering' ,'Electrical engineering is a field of engineering that generally deals with the study and application of electricity,electronics,and electromagnetism...' ,NULL ),
('BE in Civil Engineering' ,'Civil Engineering is a professional engineering discipline that deals with the design construction and maintenance of the physical and naturally built environment...' ,NULL ),
('Bachelor of Medicine,Bachelor of Surgery (MBBS)' ,'The Bachelor of Medicine,Bachelor of Surgery program aims to produce socially responsible and competent medical doctors...' ,NULL ),
('Bachelor of Dental Surgery (BDS)' ,'The Bachelor of Dental Surgery program aims to produce knowledgeable competent skillful and socially committed caring dental surgeons...' ,NULL ),
('Bachelor of Audiology Speech and Language Pathology (BASLP)' ,'The Bachelor of Audiology Speech and Language Pathology program aims to produce competent and compassionate service-oriented audiologists...' ,NULL ),
('M.Sc.Program' ,'The Central Department of Physics (CDP) has been offering M.Sc.(Physics) program since last 50 years...' ,NULL ),
('PH.D.PROGRAM (Physics)' ,'The Central Department of Physics (CDP) also offers a PHD program in physics.' ,NULL ),
('MA Program' ,'The courses on the M.A. English Programme offer the students insight into literature language culture and history...' ,NULL ),
('PH.D.PROGRAM (English)' ,'The Central Department of English (CDE) also offers a PHD program in English.' ,NULL );
