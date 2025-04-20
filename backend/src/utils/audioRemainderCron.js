import cron from "node-cron";
import { Audio } from "../models/Audio.model.js";
import { User } from "../models/User.model.js";
import {sendEmail} from "../utils/nodemailer.js";

cron.schedule("* * * * *", async () => {
  console.log("Cron is running");

  const now = new Date();

  try {
    const upcomingAudios = await Audio.find({
      unlocksAt: { $lte: now },
      notified: { $ne: true },
    });

    for (let audio of upcomingAudios) {
      const user = await User.findById(audio.userId);

      if (user && user.email) {
        await sendEmail({
          to: user.email,
          subject: "🎧 Your audio is now unlocked!",
          text: `Hi! Your audio "${audio.title}" is now available to listen.`,
        });
      }

      audio.notified = true;
      await audio.save();
    }
  } catch (err) {
    console.error("Error in cron job:", err);
  }
});