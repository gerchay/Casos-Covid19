package main

import (
"fmt"
"log"
"net/http"
"encoding/json"
"github.com/gorilla/mux"
"math/rand"
"time"
"bytes"
"io/ioutil"
)
// ------------------------------------

type Post struct {
	Name string `json:"name"`
	Location string `json:"location"`
	Age json.Number `json:"age"`
	Infected_type string `json:"infected_type"`
	State string `json:"state"`
  }

func publishJSON(w http.ResponseWriter, r *http.Request ){

	w.Header().Set("Content-Type", "application/json")
	
	var post Post 

	_ = json.NewDecoder(r.Body).Decode(&post)

	// ---------------------------------------------------------------------------

	data := `{ "name": "`+ post.Name +`",
	"location": "`+post.Location+`",
	"age": "`+ string(post.Age) +`",
	"infected_type": "`+ post.Infected_type +`",
	"state": "`+ post.State + `"}`

	fmt.Println(data)

	url1 := "http://34.69.87.109:4000/"
	url2 := "http://34.68.189.11:8080/publish/json"
	url := ""


	rand.Seed(time.Now().UnixNano())
    min := 1
    max := 2
	random := rand.Intn(max - min + 1) + min

	if random == 2 { //Envio a gRPC
		url = url1
		fmt.Println("gRPC")
	} else { // Envio a Redis
		url = url2
		fmt.Println("Redis")
	}

    var jsonStr = []byte(data)
    req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonStr))
    req.Header.Set("Content-Type", "application/json")

    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil {
        panic(err)
    }
    defer resp.Body.Close()

    fmt.Println("response Status:", resp.Status)
    fmt.Println("response Headers:", resp.Header)
    body, _ := ioutil.ReadAll(resp.Body)
	fmt.Println("response Body:", string(body))
	
	_ = json.NewDecoder(r.Body).Decode(&body)
}


func homePage( w http.ResponseWriter, r *http.Request ){
	fmt.Fprintf(w, "Homepage API Dummy")
}

func handleRequests(){

	myRouter := mux.NewRouter().StrictSlash(true)

	myRouter.HandleFunc("/", homePage)
	myRouter.HandleFunc("/publish", publishJSON).Methods("POST")
	log.Fatal(http.ListenAndServe(":8080", myRouter))
}

func main(){
	handleRequests()
}