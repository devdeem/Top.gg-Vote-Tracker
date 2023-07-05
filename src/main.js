// Import necessary modules and libraries
const {
  Client,
  GatewayIntentBits,
  Events,
  EmbedBuilder,
  ActivityType,
  Colors,
} = require("discord.js");
const { TermLogger, Logger } = require("term-logger");
const express = require("express");
require("dotenv").config();
console.clear(); // Clear console

// Create an instance of Express app
const app = express();

// Create an HTTP server using Express app
const server = require("http").createServer(app);

const { Webhook } = require("@top-gg/sdk"); // Top.gg webhook for vote tracking
const dbl = new Webhook(process.env.AUTH); // Create an instance of the webhook

// Create a new Discord client
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent],
});

// Create a logger instance for the client
const logger = new TermLogger(client, {
  enableAntiCrash: true,
  systemMessages: false,
});

// Event handler for when the client is ready
client.on(Events.ClientReady, () => {
  setInterval(async () => {
    // Set the client's presence
    client.user.setPresence({
      status: "online",
      activities: [
        {
          type: ActivityType.Listening,
          name: `Example Code by @deemdev`,
        },
      ],
    });
  }, 60000); // Set the presence every 1 minute

  Logger.ready(`Logged in as ${client.user.username}`);
});

// Middleware to parse JSON requests
app.use(express.json());

// Endpoint for vote tracking
app.post(
  "/vote",
  dbl.listener(async ({ user: id }) => {
    const channel = client.channels.cache.get(process.env.CHANNEL_ID); // Get the channel to send the vote message
    const user = await client.users.fetch(id); // Fetch the user who voted

    try {
      // Create an embed for the vote message
      const embed = new EmbedBuilder()
        .setColor(Colors.Green)
        .setAuthor({
          name: `Thank you for voting for ${client.user.username}!`,
          iconURL: client.user.displayAvatarURL({ size: 4096 }),
        })
        .setDescription(
          [
            `User: **${user.username}** \`(${user.id})\` just voted!`,
            ``,
            `You can vote on top.gg [**here**](https://top.gg/bot/${client.user.id}/vote) every 12 hours!`,
          ].join("\n")
        )
        .setFooter({ text: `Thank you so much for your support!` })
        .setTimestamp();

      await channel.send({ embeds: [embed] }); // Send the vote message to the channel
    } catch (e) {
      Logger.error(e); // Log any errors that occur during vote processing
    }
  })
);

// Start the server and listen on the specified port
server.listen(process.env.PORT, () => {
  Logger.info(`Vote tracker listening on port ${process.env.PORT}`);
});

// Log in the Discord client using the provided client token
client.login(process.env.CLIENT_TOKEN);
