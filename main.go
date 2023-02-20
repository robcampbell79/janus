package main

import(
	"fmt"
	"net/http"
	"html/template"
)

func indexHandler(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, r.URL.Path[1:])
}

func nextHandler(w http.ResponseWriter, r *http.Request) {
	name := "Robert"
	t, _ := template.ParseFiles("html/next.html")
    t.Execute(w, name)
}

func main() {
	fmt.Println("The server is running")
	http.Handle("/css/", http.StripPrefix("/css/", http.FileServer(http.Dir("css"))))
	http.Handle("/js/", http.StripPrefix("/js/", http.FileServer(http.Dir("js"))))
	http.HandleFunc("/", indexHandler)
	http.HandleFunc("/next", nextHandler)

	http.ListenAndServe(":8080", nil)
}