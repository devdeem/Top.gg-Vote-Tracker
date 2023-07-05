# Discord Vote Tracker

- This is a Discord bot that tracks user votes using the Top.gg API.
- It sends a notification to a designated channel whenever a user votes for the bot.
- The notification includes the username of the voter and a link to vote again on Top.gg.

## Requirements

Before running the code, make sure you have the following:

- Node.js 16.6.0+
- Top.gg API authentication token
- Discord bot token
- NGINX installed (for setting up reverse proxy)

## Installation

1. Clone the repository or download the code.
2. Open a terminal and navigate to the project directory.
3. Run the following command to install the dependencies:

```bash
npm install
```

4. Open the `.env` file and change things there

Replace `AUTH` with your Top.gg API authentication token, `CHANNEL_ID` with the ID of the Discord channel where you want to send vote notifications, `CLIENT_TOKEN` with your Discord bot token and `PORT` with your port.

5.  Configure NGINX as a reverse proxy to forward requests to the bot. Here's an example NGINX server block configuration:

```nginx
server {
        listen 80;
        server_name yourwebsite.com;

        location / {
            proxy_pass http://localhost:8088/;
        }
    }
```

This example assumes that the bot will be running on `localhost` at port `8088`. Adjust the configuration according to your setup.

## Usage

To start the bot, run the following command:

```bash
npm start
```

The bot will log in using the provided Discord bot token and start listening for vote events. Whenever a user votes for the bot on Top.gg, it will send a notification to the specified Discord channel.

## Customization

You can customize the bot's presence and the content of the vote notification message by modifying the code. Refer to the Discord.js and Top.gg SDK documentation for more information on available options and methods.

## Contributing

Contributions are welcome! If you find any issues or want to add new features, feel free to open a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
