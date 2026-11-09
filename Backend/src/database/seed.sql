INSERT INTO students (
    id,
    name,
    email,
    phone,
    address,
    birthdate,
    semester,
    status
) VALUES
(1001, 'Juan Perez', 'juan.perez@gmail.com', '3001234567', 'Calle 10 # 15-20', '2002-05-15', 3, TRUE),

(1002, 'Maria Gomez', 'maria.gomez@gmail.com', '3012345678', 'Carrera 20 # 10-30', '2001-08-22', 5, TRUE),

(1003, 'Carlos Rodriguez', 'carlos.rodriguez@gmail.com', '3023456789', 'Calle 25 # 12-40', '2003-01-10', 2, TRUE),

(1004, 'Laura Martinez', 'laura.martinez@gmail.com', '3034567890', 'Carrera 15 # 8-25', '2000-11-30', 7, TRUE),

(1005, 'Andres Lopez', 'andres.lopez@gmail.com', '3045678901', 'Calle 30 # 20-15', '2002-03-18', 4, TRUE),

(1006, 'Daniela Ramirez', 'daniela.ramirez@gmail.com', '3056789012', 'Carrera 12 # 5-18', '2001-06-25', 6, TRUE),

(1007, 'Santiago Torres', 'santiago.torres@gmail.com', '3107890123', 'Calle 18 # 22-10', '2003-09-12', 1, TRUE),

(1008, 'Valentina Hernandez', 'valentina.hernandez@gmail.com', '3118901234', 'Carrera 8 # 14-32', '2002-12-05', 8, TRUE),

(1009, 'Sebastian Castro', 'sebastian.castro@gmail.com', '3129012345', 'Calle 40 # 18-22', '2001-04-14', 9, TRUE),

(1010, 'Camila Moreno', 'camila.moreno@gmail.com', '3130123456', 'Carrera 25 # 30-12', '2000-07-20', 10, TRUE);

INSERT INTO courses (
    name,
    description,
    credits,
    semester,
    status
) VALUES
('Programación I', 'Fundamentos de programación, algoritmos y lógica computacional.', 3, 1, TRUE),

('Matemáticas I', 'Fundamentos de álgebra, ecuaciones, funciones y operaciones matemáticas.', 4, 1, TRUE),

('Bases de Datos', 'Modelado de datos, lenguaje SQL y sistemas gestores de bases de datos.', 3, 3, TRUE),

('Programación Web I', 'Desarrollo de aplicaciones web utilizando HTML, CSS, JavaScript y TypeScript.', 3, 4, TRUE),

('Arquitectura de Software', 'Principios, patrones y estilos arquitectónicos para el desarrollo de software.', 3, 6, TRUE),

('Ingeniería de Software', 'Procesos, metodologías ágiles y buenas prácticas para el desarrollo de software.', 3, 5, TRUE),

('Redes de Computadores', 'Fundamentos de redes, protocolos de comunicación y modelos de referencia.', 3, 4, TRUE),

('Sistemas Operativos', 'Administración de procesos, gestión de memoria y sistemas de archivos.', 3, 3, TRUE),

('Desarrollo de Aplicaciones Móviles', 'Fundamentos y desarrollo de aplicaciones para dispositivos móviles.', 3, 7, TRUE),

('Inteligencia Artificial', 'Fundamentos de inteligencia artificial, aprendizaje automático y algoritmos inteligentes.', 4, 8, TRUE);

INSERT INTO teachers (
    name,
    email,
    phone,
    department,
    specialty,
    hiredate,
    status
) VALUES
('Ricardo Mendoza', 'ricardo.mendoza@uceva.edu.co', '3141112233', 'Ingenieria de Sistemas', 'Desarrollo Web', '2015-02-10', TRUE),

('Patricia Salazar', 'patricia.salazar@uceva.edu.co', '3152223344', 'Ingenieria de Sistemas', 'Bases de Datos', '2012-08-01', TRUE),

('Felipe Ocampo', 'felipe.ocampo@uceva.edu.co', '3163334455', 'Ciencias Basicas', 'Matematicas', '2010-01-18', TRUE),

('Natalia Vargas', 'natalia.vargas@uceva.edu.co', '3174445566', 'Ingenieria de Sistemas', 'Inteligencia Artificial', '2018-07-23', TRUE),

('Hector Duque', 'hector.duque@uceva.edu.co', '3185556677', 'Ingenieria de Sistemas', 'Redes de Computadores', '2014-03-05', TRUE),

('Luisa Fernandez', 'luisa.fernandez@uceva.edu.co', '3196667788', 'Ingenieria de Sistemas', 'Ingenieria de Software', '2016-09-12', TRUE),

('Mauricio Rios', 'mauricio.rios@uceva.edu.co', '3207778899', 'Ciencias Basicas', 'Fisica', '2009-06-30', TRUE),

('Sandra Beltran', 'sandra.beltran@uceva.edu.co', '3218889900', 'Ingenieria de Sistemas', 'Arquitectura de Software', '2019-02-04', TRUE),

('Jorge Cardona', 'jorge.cardona@uceva.edu.co', '3229990011', 'Ingenieria de Sistemas', 'Sistemas Operativos', '2013-11-19', TRUE),

('Diana Osorio', 'diana.osorio@uceva.edu.co', '3230001122', 'Ingenieria de Sistemas', 'Desarrollo Movil', '2020-01-27', TRUE);

INSERT INTO classrooms (
    name,
    building,
    capacity,
    type,
    status
) VALUES
('Aula 101', 'Bloque A', 35, 'Aula', TRUE),

('Aula 102', 'Bloque A', 35, 'Aula', TRUE),

('Aula 201', 'Bloque A', 40, 'Aula', TRUE),

('Laboratorio de Sistemas 1', 'Bloque B', 30, 'Laboratorio', TRUE),

('Laboratorio de Sistemas 2', 'Bloque B', 30, 'Laboratorio', TRUE),

('Laboratorio de Redes', 'Bloque B', 25, 'Laboratorio', TRUE),

('Sala de Computo 1', 'Bloque C', 40, 'Sala de Computo', TRUE),

('Sala de Computo 2', 'Bloque C', 40, 'Sala de Computo', TRUE),

('Auditorio Principal', 'Bloque D', 200, 'Auditorio', TRUE),

('Aula 305', 'Bloque C', 45, 'Aula', TRUE);
