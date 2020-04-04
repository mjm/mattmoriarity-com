package handler

import (
	"log"
	"net/http"
	"os"

	"github.com/gosimple/slug"
	"github.com/mjm/mpsanity"
	"github.com/mjm/mpsanity/block"
	"github.com/mjm/mpsanity/mpapi"
	"go.opentelemetry.io/otel/api/global"
	"go.opentelemetry.io/otel/exporters/trace/stdout"
	sdktrace "go.opentelemetry.io/otel/sdk/trace"
)

var handler *mpapi.MicropubHandler

func init() {
	slug.MaxLength = 40

	projectID := os.Getenv("SANITY_PROJECT_ID")
	dataset := os.Getenv("SANITY_DATASET")
	token := os.Getenv("SANITY_TOKEN")
	baseURL := os.Getenv("BASE_URL")
	webhookURL := os.Getenv("NETLIFY_WEBHOOK_URL")

	exporter, err := stdout.NewExporter(stdout.Options{PrettyPrint: true})
	if err != nil {
		log.Fatal(err)
	}
	tp, err := sdktrace.NewProvider(sdktrace.WithConfig(sdktrace.Config{DefaultSampler: sdktrace.AlwaysSample()}),
		sdktrace.WithSyncer(exporter))
	if err != nil {
		log.Fatal(err)
	}
	global.SetTraceProvider(tp)

	sanity, err := mpsanity.New(projectID,
		mpsanity.WithDataset(dataset),
		mpsanity.WithToken(token))
	if err != nil {
		log.Fatal(err)
	}

	handler = mpapi.New(sanity,
		mpapi.WithDocumentBuilder(&mpapi.DefaultDocumentBuilder{
			MarkdownConverter: block.NewMarkdownConverter(block.WithMarkdownRules(
				block.TweetMarkdownRule,
				block.YouTubeMarkdownRule)),
		}),
		mpapi.WithBaseURL(baseURL),
		mpapi.WithWebhookURL(webhookURL))
}

func Handler(w http.ResponseWriter, r *http.Request) {
	handler.ServeHTTP(w, r)
}
