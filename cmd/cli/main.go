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
			Usage:  "sned telemetry from a collected file",
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
	}

	err := app.Run(os.Args)
	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}