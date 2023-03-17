package Conn

import(
	"fmt"
	"log"
	"database/sql"

	_ "github.com/go-sql-driver/mysql"
)

func Con() *sql.DB {
	db, err := sql.Open("mysql", "root:toor@/stuff")
	if err != nil {
		log.Print(err.Error())
	}

	fmt.Println("Connected to DB")

	return db
}