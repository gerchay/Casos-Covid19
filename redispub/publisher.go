package main

import (
"fmt"
"log"
"net/http"
"encoding/json"
"github.com/gorilla/mux"
"github.com/go-redis/redis/v8"
)
// ------------------------------------

type Post struct {
	Name string `json:"name"`
	Location string `json:"location"`
	Age json.Number `json:"age"`
	Infected_type string `json:"infected_type"`
	State string `json:"state"`
  }


func publish(w http.ResponseWriter, r *http.Request ){

	client := redis.NewClient(&redis.Options{
		Addr:     "35.238.130.224:6379",
		Password: "redissopes1",
		DB: 	0,
		})
	defer client.Close()


	err := client.Publish(r.Context(), "canal1", "Conectandome desde golang papu").Err()
	if err != nil {
		panic(err)
	}

}

func publishJSON(w http.ResponseWriter, r *http.Request ){

	client := redis.NewClient(&redis.Options{
		Addr:     "35.238.130.224:6379",
		Password: "redissopes1",
		DB: 	0,
		})
	defer client.Close()

	w.Header().Set("Content-Type", "application/json")
	
	var post Post 

	_ = json.NewDecoder(r.Body).Decode(&post)

	fmt.Println(post)
	// fmt.Println(post.Name)
	// fmt.Println(post.Age)
	json.NewEncoder(w).Encode(&post)
	err := client.Publish(r.Context(), "canal1",
	 `{ "name": "`+ post.Name +`",
	"location": "`+post.Location+`",
	"age": "`+ string(post.Age) +`",
	"infected_type": "`+ post.Infected_type +`",
	"state": "`+ post.State + `"
}`).Err()
	if err != nil {
		panic(err)
	}

}

func homePage( w http.ResponseWriter, r *http.Request ){
	fmt.Fprintf(w, "Homepage Endpoint Hit")
}

func handleRequests(){

	myRouter := mux.NewRouter().StrictSlash(true)


	myRouter.HandleFunc("/", homePage)
	myRouter.HandleFunc("/publish", publish).Methods("GET")
	myRouter.HandleFunc("/publish/json", publishJSON).Methods("POST")
	log.Fatal(http.ListenAndServe(":8080", myRouter))
}

func main(){
	handleRequests()
}