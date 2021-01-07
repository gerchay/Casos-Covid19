FROM golang:1.15

WORKDIR /go/src/app
COPY . .

RUN go get google.golang.org/grpc
RUN go get .

EXPOSE 50051

CMD ["go", "run", "main.go"]