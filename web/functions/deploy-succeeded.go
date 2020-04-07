package main

import (
	"bytes"
	"encoding/json"
	"log"
	"net/http"
	"strings"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/divan/gorilla-xmlrpc/xml"
)

var pingURLs = []string{
	"https://courier.blog/ping",
	"https://staging.courier.blog/ping",
}

type EventBody struct {
	Site struct {
		Name string `json:"name"`
		URL  string `json:"url"`
	} `json:"site"`
}

type PingRequest struct {
	Title       string
	HomePageURL string
}

type PingResponse struct {
	Result struct {
		Flerror bool
		Message string
	}
}

func handler(request events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {
	var body EventBody
	if err := json.NewDecoder(strings.NewReader(request.Body)).Decode(&body); err != nil {
		return nil, err
	}

	log.Printf("Deploy succeeded for %s <%s>", body.Site.Name, body.Site.URL)

	pingReq := &PingRequest{
		Title:       body.Site.Name,
		HomePageURL: body.Site.URL,
	}
	reqBody, err := xml.EncodeClientRequest("weblogUpdates.ping", pingReq)
	if err != nil {
		return nil, err
	}

	var lastErr error
	for _, u := range pingURLs {
		log.Printf("Pinging %s", u)
		resp, err := http.Post(u, "text/xml", bytes.NewReader(reqBody))
		if err != nil {
			return nil, err
		}

		var pingResp PingResponse
		if err := xml.DecodeClientResponse(resp.Body, &pingResp); err != nil {
			log.Printf("Error pinging %s: %v", u, err)
			lastErr = err
			continue
		}
	}

	if lastErr != nil {
		return nil, lastErr
	}

	return &events.APIGatewayProxyResponse{
		StatusCode: 200,
		Body:       "Success",
	}, nil
}

func main() {
	// Make the handler available for Remote Procedure Call by AWS Lambda
	lambda.Start(handler)
}
