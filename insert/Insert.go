package Insert

import(
	"janus/Conn"
	"context"
	"log"
	"time"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
)

type Plan struct {
	Date string		`json:"dateVal"`
	Stime string	`json:"stimeVal"`
	Etime string	`json:"etimeVal"`
	Title string	`json:"titleVal"`
	Desc string		`json:"descVal"`
}

type Timer struct {
	Title string	`json:"eeeeeeeee"`
	Estimate int	`json:"eeeeeeeee"`
	Spent int		`json:"eeeeeeeee"`
	Compare int		`json:"eeeeeeeee"`
}

func Into(plan Plan) {
	db := Conn.Con()

	sql := "INSERT INTO planner(plan_date, start_time, end_time, plan_name, plan_desc) VALUES(?, ?, ?, ?, ?)"

	ctx, cancel := context.WithTimeout(context.Background(), 35*time.Second)
	defer cancel()

	stmt, err := db.PrepareContext(ctx, sql)
	if err != nil {
		log.Printf("Error %s", err)
	}

	fmt.Println(plan)
	fmt.Println("werewolf mouse")

	defer stmt.Close()

	res, err := stmt.ExecContext(ctx, plan.Date, plan.Stime, plan.Etime, plan.Title, plan.Desc)
	if err != nil {
		fmt.Println("jade eagle")
		log.Printf("Error %s", err)
	}

	rows, err := res.RowsAffected()
	if err != nil {
		log.Printf("Error %s", err)
	}

	log.Printf("%d rows created ", rows)

}