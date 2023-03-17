package Select

import(
	"fmt"
	"log"
	"janus/Conn"

	_ "github.com/go-sql-driver/mysql"
)

func Sel() {
	db := Conn.Con()

	defer db.Close()

	sql := "SELECT * FROM planner"

	selAll, err := db.Query(sql)
	if err != nil {
		log.Print(err.Error())
	}

	for selAll.Next() {
		var id int
		var date string
		var stime string
		var etime string
		var name string
		var desc string
		var created string

		err = selAll.Scan(&date, &time, &name, &desc)
		if err != nil {
			log.Print(err.Error())
		}

		fmt.Printf("ID: %d Date: %s Start Time: %s End Time %s Name: %s Desc: %s Created at: %s", id, date, stime, etime, name, desc, created)
	}
}