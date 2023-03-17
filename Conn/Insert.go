package Insert

import(
	"janus/Conn"
	"context"
	"log"
	"time"

	_ "github.com/go-sql-driver/mysql"
)

func Into(params []string) {
	db := Conn.Con()

	defer db.Close()

	sql := "INSERT INTO planner(plan_date, start_time, end_time, plan_name, plan_desc) VALUES(?, ?, ?, ?, ?)"

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	stmt, err := db.PrepareContext(ctx, sql)
	if err != nil {
		log.Printf("Error %s", err)
	}

	defer stmt.Close()

	res, err := stmt.ExecContext(ctx, params[0], params[1], params[2], params[3], params[4])
	if err != nil {
		log.Printf("Error %s", err)
	}

	rows, err := res.RowsAffected()
	if err != nil {
		log.Printf("Error %s", err)
	}

	log.Printf("%d rows created ", rows)
}