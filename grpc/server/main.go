package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net"
	"time"

	"github.com/go-redis/redis"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"

	"google.golang.org/grpc"
	pb "google.golang.org/grpc/examples/helloworld/helloworld"
)

const (
	port = ":50051"
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

var ctx = context.Background()

func conexionMongo(infectado string) {

	//base de redis
	var enviar infect
	json.Unmarshal([]byte(infectado), &enviar)
	//Enviando los datos a la base

	client := redis.NewClient(&redis.Options{
		Addr:     "35.238.130.224:6379",
		Password: "redissopes1",
		DB:       0,
	})
	defer client.Close()

	val, err := client.Do(ctx, "RPUSH", "listaCasos", infectado).Result()
	if err != nil {
		fmt.Println("Error: ", err)
	}
	fmt.Println(val)

	//base de datos de mongo

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	mongoclient, err := mongo.Connect(ctx, options.Client().ApplyURI(
		os.Getenv("MongoDB"),
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
