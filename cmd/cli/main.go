package main

import (
	"fmt"
	"os"
	"path/filepath"

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
			Name:   "listen",
			Usage:  "listen for incoming telemetry",
			Action: ActionServer,
			Flags: []cli.Flag{
				&cli.StringFlag{
					Name:        "address",
					Usage:       "address to listen on",
					DefaultText: ":20777",
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
			Name:   "collect",
			Usage:  "collect telemetry",
			Action: ActionCollect,
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
			},
		},
		{
			Name:   "send",
			Usage:  "send telemetry from a collected file",
			Action: ActionSend,
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
			Name:   "query",
			Usage:  "query collected telemetry",
			Action: ActionQuery,
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
					Action: ActionDatabaseIngest,
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
	}

	err := app.Run(os.Args)
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}
