package main

import (
"fmt"
"github.com/go-redis/redis/v8"
"context"
)

var ctx = context.Background()

func main(){

	client := redis.NewClient(&redis.Options{
		Addr:     "35.238.130.224:6379",
		Password: "redissopes1",
		DB: 	0,
		})
	defer client.Close()

	sub := client.Subscribe(ctx, "canal1")
	for {
		msg, err := sub.ReceiveMessage(ctx)
		if err != nil {
			panic(err)
		}
		//fmt.Println(msg.Channel, msg.Payload)
		val, err := client.Do(ctx, "RPUSH", "listaCasos", msg.Payload).Result()
		if err != nil {
			fmt.Println("Error: ",err)
		}
		fmt.Println(val)
	}
}