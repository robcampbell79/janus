package main

import(
	"fmt"
	"net/http"
	"html/template"
	"janus/insert"
	"io/ioutil"
	"encoding/json"
)

type Status struct {
	RespStatus string
}

func indexHandler(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, r.URL.Path[1:])
}

func nextHandler(w http.ResponseWriter, r *http.Request) {
	name := "Robert"
	t, _ := template.ParseFiles("html/next.html")
    t.Execute(w, name)
}

func inputPlan(w http.ResponseWriter, r *http.Request) {
	//fmt.Println(r.Body)
	jsonData, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err.Error())
	}

	plan := Insert.Plan{}
	json.Unmarshal([]byte(jsonData), &plan)

	//fmt.Println(plan)

	Insert.Into(plan)

	status:= Status{RespStatus: "OK"}
	w.Header().Set("Content-type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(status)
}

func trackTime(w http.ResponseWriter, r *http.Request) {
	
}

func main() {
	fmt.Println("The server is running")
	http.Handle("/css/", http.StripPrefix("/css/", http.FileServer(http.Dir("css"))))
	http.Handle("/js/", http.StripPrefix("/js/", http.FileServer(http.Dir("js"))))
	http.HandleFunc("/", indexHandler)
	http.HandleFunc("/next", nextHandler)
	http.HandleFunc("/input", inputPlan)

	http.ListenAndServe(":8080", nil)
}