CREATE TABLE student(
  student_id INT AUTO_INCREMENT PRIMARY KEY,
  student_account VARCHAR(20),
  student_password VARCHAR(100)
);

CREATE TABLE teacher(
  teacher_id INT AUTO_INCREMENT PRIMARY KEY,
  teacher_account VARCHAR(20),
  teacher_password VARCHAR(100)
);