import { supabase } from "./supabase";

export const EVENTS_CHANNEL = "events";
export const ACTIVITY_CHANNEL = "activity";

export const broadcast = async (channelName: string, event: string, payload: object) => {
  const channel = supabase.channel(channelName);

  try {
    await channel.httpSend(event, payload);
  } catch (error) {
    console.error(`Failed to broadcast ${event}`, error);
  } finally {
    await supabase.removeChannel(channel);
  }
};
