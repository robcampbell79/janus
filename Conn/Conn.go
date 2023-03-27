package Conn

import(
	"fmt"
	"log"
	"database/sql"

	_ "github.com/go-sql-driver/mysql"
)

func Con() *sql.DB {
	db, err := sql.Open("mysql", "root:toor@/janus")
	if err != nil {
		log.Print(err.Error())
	}

	fmt.Println("Connected to DB")

	// sql := "SHOW COLUMNS FROM planner"

	// rows, err := db.Exec(sql)
	// if err != nil {
	// 	fmt.Println("fire hawk")
	// 	log.Print(err.Error())
	// }

	// for rows.Next() {
	// 	var col string
	// 	rows.Scan(&col)
	// 	fmt.Println(col)
	// }

	return db
}