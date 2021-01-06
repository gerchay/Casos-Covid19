package main

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gorilla/mux"

	"google.golang.org/grpc"
	pb "google.golang.org/grpc/examples/helloworld/helloworld"
)

const (
	address = "localhost:50051"
)

func conexion(w http.ResponseWriter, require *http.Request) {

	//Agregando los cors
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	datos, _ := ioutil.ReadAll(require.Body)

	// Set up a connection to the server.
	conn, err := grpc.Dial(address, grpc.WithInsecure(), grpc.WithBlock())
	if err != nil {
		log.Fatalf("did not connect: %v", err)
	}
	defer conn.Close()
	c := pb.NewGreeterClient(conn)

	// Contact the server and print out its response.
	name := string(datos)
	if len(os.Args) > 1 {
		name = os.Args[1]
	}
	ctx, cancel := context.WithTimeout(context.Background(), time.Minute)
	defer cancel()
	r, err := c.SayHello(ctx, &pb.HelloRequest{Name: name})
	if err != nil {
		log.Fatalf("could not greet: %v", err)
	}
	log.Printf("Greeting: %s", r.GetMessage())

	json.NewEncoder(w).Encode("ok")
}

func main() {
	//Inicio del servidor
	router := mux.NewRouter().StrictSlash(true)
	router.HandleFunc("/", conexion).Methods("POST")
	router.HandleFunc("/prueba", prueba).Methods("GET")
	fmt.Println("Server start in port 4000")
	log.Fatal(http.ListenAndServe(":4000", router))
}

func prueba(w http.ResponseWriter, req *http.Request) {
	json.NewEncoder(w).Encode("run gRCP")
}
