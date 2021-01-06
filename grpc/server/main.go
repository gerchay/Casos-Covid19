package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"

	"google.golang.org/grpc"
	pb "google.golang.org/grpc/examples/helloworld/helloworld"
)

const (
	port = ":5000"
)

type infect struct {
	Name          string `json:"name"`
	Location      string `json:"location"`
	Age           int    `json:"age"`
	Infected_type string `json:"infected_type"`
	State         string `json:"state"`
}

// server is used to implement helloworld.GreeterServer.
type server struct {
	pb.UnimplementedGreeterServer
}

func conexionMongo(infectado string) {

	//base de redis
	var enviar infect
	json.Unmarshal([]byte(infectado), &enviar)
	//Enviando los datos a la base
	/*client := redis.NewClient(&redis.Options{
		//la db de google
		Addr:     "redis-18582.c12281.us-central1-mz.gcp.cloud.rlrcp.com:18582",
		Password: "WKJeO6VNC7tZX6ae672rbXNJUUXCy3Wm",
		//Addr:     "localhost:6379",
		//Password: "",
		DB: 0,
	})
	send, err := json.Marshal(enviar)
	err = client.LPush("lista", send).Err()
	if err != nil {
		fmt.Println(err)
	}*/

	//base de datos de mongo

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	mongoclient, err := mongo.Connect(ctx, options.Client().ApplyURI(
		"mongodb+srv://covid-chay:admin345@covid19.6yla0.mongodb.net/covid19?retryWrites=true&w=majority",
	))
	if err != nil {
		log.Fatal(err)
	}
	databases, err := mongoclient.ListDatabaseNames(ctx, bson.M{})
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(databases)

	Database := mongoclient.Database("covid19")
	Collection := Database.Collection("infectados")

	var bdoc interface{}
	errb := bson.UnmarshalExtJSON([]byte(infectado), true, &bdoc)
	fmt.Println(errb)

	infectadosResult, err := Collection.InsertOne(ctx, bdoc)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(infectadosResult)
}

// SayHello implements helloworld.GreeterServer
func (s *server) SayHello(ctx context.Context, in *pb.HelloRequest) (*pb.HelloReply, error) {
	conexionMongo(in.GetName())
	fmt.Printf("Recibido: %v", in.GetName())
	return &pb.HelloReply{Message: "Hola" + in.GetName()}, nil
}

func main() {
	lis, err := net.Listen("tcp", port)
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	s := grpc.NewServer()
	pb.RegisterGreeterServer(s, &server{})
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
