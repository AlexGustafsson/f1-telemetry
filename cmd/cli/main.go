package main

import (
	"fmt"
	"os"
	"path/filepath"

	f1cli "github.com/AlexGustafsson/f1-telemetry/internal/cli"

	"github.com/urfave/cli/v2"
)

var appHelpTemplate = `Usage: {{.Name}} [options] [arguments]
{{.Usage}}
Options:
	{{range .Flags}}{{.}}
	{{end}}
Commands:
	{{range .Commands}}{{.Name}}{{ "\t" }}{{.Usage}}
	{{end}}
`

var commandHelpTemplate = `Usage: f1 {{.Name}} [options] {{if .ArgsUsage}}{{.ArgsUsage}}{{end}}
{{.Usage}}{{if .Description}}
Description:
	{{.Description}}{{end}}{{if .Flags}}
Options:{{range .Flags}}
	{{.}}{{end}}{{end}}
`

func main() {
	cli.AppHelpTemplate = appHelpTemplate
	cli.CommandHelpTemplate = commandHelpTemplate

	app := cli.NewApp()
	app.Name = filepath.Base(os.Args[0])
	app.Usage = "F1 Telemetry"
	app.EnableBashCompletion = true
	app.HideVersion = true
	app.Flags = []cli.Flag{
		&cli.BoolFlag{
			Name:  "verbose",
			Usage: "enable verbose logs",
		},
	}
	app.Commands = []*cli.Command{
		{
			Name:   "start",
			Usage:  "start the telemetry server",
			Action: f1cli.ActionServer,
			Flags: []cli.Flag{
				&cli.StringFlag{
					Name:        "telemetry-address",
					Usage:       "address to listen on for incoming UDP telemetry",
					DefaultText: ":20777",
				},
				&cli.StringFlag{
					Name:        "api-address",
					Usage:       "address to listen on for incoming API requests",
					DefaultText: ":20777",
				},
				&cli.BoolFlag{
					Name:        "web",
					Usage:       "serve the web UI",
					DefaultText: "false",
				},
				&cli.StringFlag{
					Name:      "output",
					Aliases:   []string{"o"},
					Usage:     "path to time series output",
					Required:  true,
					TakesFile: true,
				},
			},
		},
		{
			Name:   "query",
			Usage:  "query collected telemetry",
			Action: f1cli.ActionQuery,
			Flags: []cli.Flag{
				&cli.StringFlag{
					Name:      "input",
					Aliases:   []string{"i"},
					Usage:     "path to time series input",
					Required:  true,
					TakesFile: true,
				},
				&cli.StringFlag{
					Name:     "query",
					Usage:    "query to execute",
					Required: true,
				},
				&cli.DurationFlag{
					Name:     "from",
					Usage:    "start session time",
					Required: true,
				},
				&cli.DurationFlag{
					Name:     "to",
					Usage:    "end session time",
					Required: true,
				},
				&cli.DurationFlag{
					Name:        "interval",
					Usage:       "metric interval",
					DefaultText: "1ms",
				},
				&cli.IntFlag{
					Name:        "samples",
					Usage:       "maximum samples to return",
					DefaultText: "1000",
				},
				&cli.StringFlag{
					Name:        "format",
					Usage:       "specify the output format",
					DefaultText: "json",
				},
			},
		},
		{
			Name: "database",
			Subcommands: []*cli.Command{
				{
					Name:   "ingest",
					Usage:  "ingest a collected file into the time series database",
					Action: f1cli.ActionDatabaseIngest,
					Flags: []cli.Flag{
						&cli.StringFlag{
							Name:      "input",
							Aliases:   []string{"i"},
							Usage:     "path to input",
							Required:  true,
							TakesFile: true,
						},
						&cli.StringFlag{
							Name:      "output",
							Aliases:   []string{"o"},
							Usage:     "path to output",
							Required:  true,
							TakesFile: true,
						},
					},
				},
			},
		},
		{
			Name: "debug",
			Subcommands: []*cli.Command{
				{
					Name:   "collect",
					Usage:  "collect telemetry",
					Action: f1cli.ActionCollect,
					Flags: []cli.Flag{
						&cli.StringFlag{
							Name:        "address",
							Usage:       "address to listen on",
							DefaultText: ":20777",
						},
						&cli.StringFlag{
							Name:      "output",
							Aliases:   []string{"o"},
							Usage:     "path to output",
							Required:  true,
							TakesFile: true,
						},
						&cli.BoolFlag{
							Name:        "print-headers",
							Usage:       "print headers of collected messages",
							DefaultText: "false",
						},
					},
				},
				{
					Name:   "send",
					Usage:  "send telemetry from a collected file",
					Action: f1cli.ActionSend,
					Flags: []cli.Flag{
						&cli.StringFlag{
							Name:        "address",
							Usage:       "address to send to",
							DefaultText: "127.0.0.1:20777",
						},
						&cli.StringFlag{
							Name:      "input",
							Aliases:   []string{"i"},
							Usage:     "path to input",
							Required:  true,
							TakesFile: true,
						},
						&cli.DurationFlag{
							Name:        "interval",
							Usage:       "time between messages",
							DefaultText: "200ms",
						},
					},
				},
				{
					Name:   "parse",
					Usage:  "parse telemetry from a collected file",
					Action: f1cli.ActionParse,
					Flags: []cli.Flag{
						&cli.StringFlag{
							Name:      "input",
							Aliases:   []string{"i"},
							Usage:     "path to input",
							Required:  true,
							TakesFile: true,
						},
					},
				},
			},
		},
	}

	err := app.Run(os.Args)
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}
