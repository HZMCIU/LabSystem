CREATE TABLE experiment(
    experiment_id INT AUTO_INCREMENT PRIMARY KEY,
    experiment_name VARCHAR(30),
    experiment_creator VARCHAR(30),
    experiment_start DATE,
    experiment_end DATE,
    experiment_latex VARCHAR(200),
    experiment_matlab VARCHAR(1000)
);

CREATE TABLE experiment_data(
    username VARCHAR(30),
    experiment_id INT ,
    time DATE,
    data VARCHAR(4000),
    matlab VARCHAR(300)
);