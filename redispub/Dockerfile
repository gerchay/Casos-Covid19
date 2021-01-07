FROM golang:1.14

WORKDIR /go/src/app
COPY . .

RUN go get github.com/gorilla/mux
RUN go get github.com/go-redis/redis/v8

EXPOSE 8080

CMD ["go", "run", "publisher.go"]