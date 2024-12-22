// Sarkar-MD
import axios from 'axios';
import config from '../../config.cjs';

const screenshotCommand = async (m, gss) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const validCommands = ['ss'];

  // Check if the command is valid
  if (validCommands.includes(cmd)) {
    const url = m.body.split(" ").slice(1).join(" ");

    // Check if URL is provided
    if (!url) {
      await gss.sendMessage(
        m.from,
        { text: "❌ Please provide a valid URL after the command. Example: *!ss https://google.com*" },
        { quoted: m }
      );
      return;
    }

    const ssApiUrl = `https://api.siputzx.my.id/api/tools/ssweb?url=${encodeURIComponent(url)}`;

    try {
      // Fetch the screenshot
      const response = await axios.get(ssApiUrl, { responseType: "arraybuffer" });

      if (!response || response.status !== 200) {
        await gss.sendMessage(
          m.from,
          { text: "❌ Unable to capture screenshot for the given URL. Please check the link and try again." },
          { quoted: m }
        );
        return;
      }

      // Send the screenshot as an image to the user
      await gss.sendMessage(
        m.from,
        {
          image: Buffer.from(response.data, "binary"),
          caption: `🖼️ Screenshot of ${url}\n\n_Sarkar-MD by Bandaheali_`,
        },
        { quoted: m }
      );
    } catch (error) {
      console.error("Screenshot Command Error:", error.message || error);

      await gss.sendMessage(
        m.from,
        { text: "❌ Failed to capture a screenshot. Please try again later." },
        { quoted: m }
      );
    }
  } else {
    // Inform user if invalid command
    await gss.sendMessage(
      m.from,
      { text: `❌ Invalid command. Use *!ss <URL>* to capture a screenshot.` },
      { quoted: m }
    );
  }
};

export default screenshotCommand;

// Sarkar-MD Screenshot Command POWERED BY BANDAHEALI
