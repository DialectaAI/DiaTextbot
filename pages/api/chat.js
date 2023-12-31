// Make sure to add OPENAI_API_KEY as a secret

import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function(req, res) {
  const completion = await openai.createChatCompletion({
    // You need early access to GPT-4, otherwise use "gpt-3.5-turbo"
    // Downgraded to GPT-4 due to high traffic. Sorry for the inconvenience.
    model: "gpt-3.5-turbo",
    messages: [{ "role": "system", "content": "You are a language teacher helping me learn a new language. Please correct any mistakes or provide suggestions on how to improve my vocabulary and grammar. Limit response to under 100 words. First ask me what language I want to learn and then provide examples of prompts that I can use. Example prompts: 1) Help me practice my [speaking/listening] skills by having a conversation about [topic]. 2) Help me learn how to order food at a restaurant." }].concat(req.body.messages),
    max_tokens: 300
  });
  res.status(200).json({ result: completion.data.choices[0].message })

}