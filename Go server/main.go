package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"

	_ "github.com/go-sql-driver/mysql" // Import the MySQL driver
	"github.com/gorilla/mux"
)

// Student struct
type Student struct {
	ID    int    `json:"id"`
	Name  string `json:"name"`
	Email string `json:"email"`
	Gpa   string `json:"gpa"`
}

// DB root password: 12345678
// DB name: students-system
// DB table: students

const DbRoot = "root:12345678@tcp(localhost)/students-system"

func main() {
	// connect to the MySQL database
	db, err := sql.Open("mysql", DbRoot)
	if err != nil {
		panic(err.Error())
	}
	defer db.Close()

	// check if students table exists
	_, err = db.Exec("CREATE TABLE IF NOT EXISTS students(id INT NOT NULL AUTO_INCREMENT, name VARCHAR(255), email VARCHAR(255), gpa VARCHAR(255), PRIMARY KEY (id))")
	if err != nil {
		panic(err.Error())
	}

	r := mux.NewRouter()

	// Handle preflight requests
	r.Methods(http.MethodOptions).HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		w.WriteHeader(http.StatusOK)
	})

	// Enable CORS for all other routes
	r.Use(enableCORS)
	// endpoints
	r.HandleFunc("/students", getStudents).Methods("GET")
	r.HandleFunc("/create", createStudent).Methods("POST")
	r.HandleFunc("/update", updateStudent).Methods("PUT")
	r.HandleFunc("/delete/{id}", deleteStudent).Methods("DELETE")

	// run server
	fmt.Println("Server listening on http://localhost:3001")
	http.ListenAndServe(":3001", r)
}

// get all students
func getStudents(w http.ResponseWriter, r *http.Request) {

	// connect to  mysql the database
	db, err := sql.Open("mysql", DbRoot)
	if err != nil {
		panic(err.Error())
	}
	defer db.Close()

	w.Header().Set("Content-Type", "application/json")

	var students []Student

	result, err := db.Query("SELECT id, name, email, gpa FROM students")
	if err != nil {
		panic(err.Error())
	}
	defer result.Close()

	for result.Next() {
		var student Student
		err := result.Scan(&student.ID, &student.Name, &student.Email, &student.Gpa)
		if err != nil {
			panic(err.Error())
		}
		students = append(students, student)
	}
	json.NewEncoder(w).Encode(students)

}

// create a student
func createStudent(w http.ResponseWriter, r *http.Request) {
	// connect to the MySQL database
	db, err := sql.Open("mysql", DbRoot)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer db.Close()

	w.Header().Set("Content-Type", "application/json")

	// ALLOW CORS
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	var student Student
	err = json.NewDecoder(r.Body).Decode(&student)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// insert student

	result, err := db.Exec("INSERT INTO students(name, email, gpa) VALUES(?, ?, ?)", student.Name, student.Email, student.Gpa)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	lastInsertedID, err := result.LastInsertId()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	json.NewEncoder(w).Encode(lastInsertedID)

}

// update a student
// update a student
func updateStudent(w http.ResponseWriter, r *http.Request) {
	// Handle preflight request
	if r.Method == "OPTIONS" {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "PUT")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		w.WriteHeader(http.StatusOK)
		return
	}

	// connect to the MySQL database
	db, err := sql.Open("mysql", DbRoot)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer db.Close()

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	var student Student
	err = json.NewDecoder(r.Body).Decode(&student)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	result, err := db.Exec("UPDATE students SET name = ?, email = ?, gpa = ? WHERE id = ?", student.Name, student.Email, student.Gpa, student.ID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	rowsUpdated, err := result.RowsAffected()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	fmt.Println("Rows updated:")

	json.NewEncoder(w).Encode(rowsUpdated)
}

// delete a student
func deleteStudent(w http.ResponseWriter, r *http.Request) {

	// connect to  mysql the database
	db, err := sql.Open("mysql", DbRoot)
	if err != nil {
		panic(err.Error())
	}
	defer db.Close()

	w.Header().Set("Content-Type", "application/json")

	// using params to get id
	params := mux.Vars(r)
	id := params["id"]

	result, err := db.Exec("DELETE FROM students WHERE id = ?", id)
	if err != nil {
		panic(err.Error())
	}

	rowsDeleted, err := result.RowsAffected()
	if err != nil {
		panic(err.Error())
	}
	json.NewEncoder(w).Encode(rowsDeleted)

}
func enableCORS(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		next.ServeHTTP(w, r)
	})
}
