FROM golang:1.14

WORKDIR /go/src/app
COPY . .

RUN go get go.mongodb.org/mongo-driver
RUN go get github.com/go-redis/redis/v8

CMD ["go", "run", "subscriber.go"]