FROM golang:1.14

WORKDIR /go/src/app
COPY . .

RUN go get github.com/gorilla/mux

EXPOSE 8080

CMD ["go", "run", "main.go"]