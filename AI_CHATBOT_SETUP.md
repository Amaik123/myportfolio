# AI Chatbot Setup Guide 🤖

## Overview

Your portfolio now features an **advanced AI chatbot** with the following cutting-edge technologies:

### ✨ Features Implemented

1. **🎭 Live2D-Style Animated Avatar**
   - Real-time mouth movement synchronized with audio
   - Multiple animation states (Idle, Listening, Thinking, Talking)
   - Smooth scaling and transitions based on audio levels
   - Visual feedback for all interactions

2. **🎤 ElevenLabs Voice Synthesis**
   - Natural-sounding voice responses
   - Real-time text-to-speech conversion
   - Customizable voice selection
   - Fallback to text-only mode if API unavailable

3. **🧠 OpenAI GPT-4 Integration**
   - Intelligent, context-aware responses
   - Personalized answers about your portfolio
   - Natural conversation flow
   - Fallback to predefined responses

4. **🎵 Real-Time Audio Visualization**
   - Live audio frequency analysis
   - Lip-sync animation matching speech
   - Visual equalizer bars
   - Smooth WebAudio API integration

5. **⚡ Framer Motion Animations**
   - Smooth enter/exit transitions
   - Micro-interactions on all buttons
   - Fluid avatar state changes
   - Professional UI animations

---

## 🚀 Quick Start

### Option 1: With AI Features (Recommended)

1. **Get API Keys:**

   **OpenAI (GPT-4):**
   - Go to https://platform.openai.com/api-keys
   - Create a new API key
   - Copy the key (starts with `sk-`)

   **ElevenLabs (Voice):**
   - Go to https://elevenlabs.io/
   - Sign up for a free account
   - Navigate to Profile → API Keys
   - Generate and copy your API key

2. **Configure Environment:**

   Create a `.env.local` file in the root directory:

   ```bash
   # Copy the example file
   cp .env.example .env.local
   ```

   Add your API keys:

   ```env
   NEXT_PUBLIC_OPENAI_API_KEY=sk-your-openai-key-here
   NEXT_PUBLIC_ELEVENLABS_API_KEY=your-elevenlabs-key-here
   NEXT_PUBLIC_ELEVENLABS_VOICE_ID=21m00Tcm4TlvDq8ikWAM
   ```

3. **Restart Development Server:**

   ```bash
   npm run dev
   ```

4. **Test the Chatbot:**
   - Click the floating avatar button (bottom-right)
   - Ask a question or select a quick question
   - Enjoy AI-powered responses with voice!

### Option 2: Without API Keys (Fallback Mode)

The chatbot works perfectly **without** API keys! It will:

- Use intelligent predefined responses
- Disable voice synthesis
- Provide accurate information about your portfolio
- Still feature all animations and interactions

Just skip the API key setup and use it as-is!

---

## 🎨 Features Breakdown

### Avatar Animation States

1. **💤 Idle State**
   - Subtle breathing animation
   - Purple rotating ring
   - Waiting for interaction

2. **👂 Listening State**
   - Green glow effect
   - Pulsing animation
   - Indicates message received

3. **🤔 Thinking State**
   - Orange glow
   - Rotating emoji
   - Processing user query

4. **🎤 Talking State** (with voice enabled)
   - Pink glow
   - Mouth animation with lip-sync
   - Real-time audio visualization
   - Scales with voice volume

### Quick Questions

6 predefined questions for instant answers:

- 💼 Professional experience
- ⚡ Technical skills
- 🚀 Best projects
- 🏆 Certifications
- 📧 Contact information
- 🛠️ Technologies

### Voice Controls

- **🔊 Voice Toggle Button** - Enable/disable voice synthesis
- **Visual Indicator** - Shows GPT-4 status and voice state
- **Audio Visualizer** - 5-bar equalizer during speech
- **Automatic Cleanup** - Proper audio context management

---

## 🔧 Technical Implementation

### Technologies Used

| Feature         | Technology         | Purpose                  |
| --------------- | ------------------ | ------------------------ |
| AI Responses    | OpenAI GPT-4       | Intelligent conversation |
| Voice Synthesis | ElevenLabs API     | Natural voice output     |
| Lip-Sync        | WebAudio API       | Real-time audio analysis |
| Animations      | Framer Motion      | Smooth UI transitions    |
| Avatar          | Custom CSS + React | Live2D-style animation   |
| Visualization   | Canvas/CSS         | Audio frequency display  |

### Architecture

```
User Input → GPT-4 API → Text Response
                        ↓
              ElevenLabs API → Audio File
                        ↓
              WebAudio API → Frequency Analysis
                        ↓
              Lip-Sync Animation + Visualizer
```

### Performance Optimizations

- ✅ Lazy loading of audio contexts
- ✅ Proper cleanup on unmount
- ✅ Request animation frame for smooth visuals
- ✅ Fallback responses for instant reply
- ✅ Conditional API calls
- ✅ Optimized re-renders

---

## 💰 API Pricing (as of 2025)

### OpenAI GPT-4

- **Free Tier:** $5 credit for new users
- **Pricing:** ~$0.03 per 1K tokens
- **Typical Chat:** ~$0.001 - $0.003 per message
- **Monthly Estimate:** $5-10 for moderate use

### ElevenLabs

- **Free Tier:** 10,000 characters/month
- **Starter Plan:** $5/month for 30,000 characters
- **Typical Message:** 200-400 characters
- **Monthly Estimate:** Free tier sufficient for demo

**Total Cost:** Can run entirely on free tiers for testing!

---

## 🎯 Customization Options

### Change Voice

Browse voices at https://api.elevenlabs.io/v1/voices

Update in `.env.local`:

```env
NEXT_PUBLIC_ELEVENLABS_VOICE_ID=your-preferred-voice-id
```

### Adjust GPT-4 Personality

Edit the system prompt in `AIChatbotEnhanced.js`:

```javascript
{
  role: "system",
  content: `Your custom personality here...`
}
```

### Modify Quick Questions

Edit the `QUICK_QUESTIONS` array:

```javascript
const QUICK_QUESTIONS = [
  { id: 1, text: "Your question", icon: "🎯" },
  // Add more...
];
```

### Update Fallback Responses

Edit `FALLBACK_RESPONSES` object for no-API mode.

---

## 🐛 Troubleshooting

### Voice Not Playing

- Check browser console for errors
- Ensure HTTPS (required for WebAudio)
- Verify ElevenLabs API key
- Click voice toggle to enable

### GPT-4 Not Responding

- Verify OpenAI API key format
- Check API quota/billing
- Check browser network tab
- Fallback responses will work

### Avatar Not Animating

- Check browser support for Web Animations
- Clear browser cache
- Verify CSS is loading

### Audio Visualization Not Working

- Requires HTTPS in production
- Check AudioContext support
- Verify audio file loads

---

## 📱 Mobile Support

The chatbot is fully responsive:

- Full-screen on mobile devices
- Touch-optimized interactions
- Voice works on iOS Safari (with user gesture)
- Optimized quick question buttons
- Smooth scrolling

---

## 🚀 Deployment Notes

### Vercel/Netlify

- Add environment variables in dashboard
- Ensure API keys are prefixed with `NEXT_PUBLIC_`
- HTTPS enabled by default (required for audio)

### Environment Variables

```bash
# Production
NEXT_PUBLIC_OPENAI_API_KEY=sk-prod-key
NEXT_PUBLIC_ELEVENLABS_API_KEY=prod-key

# Keep voice ID same or customize
NEXT_PUBLIC_ELEVENLABS_VOICE_ID=21m00Tcm4TlvDq8ikWAM
```

---

## ✨ What Makes This Special

1. **🎭 True Lip-Sync** - Avatar mouth moves with audio frequencies
2. **🧠 Real AI** - Actual GPT-4 responses, not canned answers
3. **🎤 Voice Synthesis** - Professional text-to-speech
4. **📊 Live Visualization** - Real-time audio bars
5. **🎨 Beautiful UI** - Glassmorphism, gradients, animations
6. **⚡ Fast Fallback** - Works instantly without APIs
7. **📱 Mobile-First** - Perfect on all devices
8. **🔒 Secure** - API keys stay private

---

## 🎉 Usage Tips

1. **Start with Quick Questions** - Instant, reliable responses
2. **Ask Follow-ups** - GPT-4 maintains context
3. **Enable Voice** - Full experience with audio
4. **Try Complex Questions** - GPT-4 handles nuance
5. **Mobile Testing** - Great on touch devices

---

## 📚 Additional Resources

- [OpenAI API Docs](https://platform.openai.com/docs)
- [ElevenLabs API Docs](https://docs.elevenlabs.io/)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [WebAudio API Guide](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)

---

## 🤝 Support

If you need help:

1. Check the console for errors
2. Verify API keys are correct
3. Test in incognito mode
4. Check browser compatibility
5. Review fallback responses

---

## 🎨 Credits

Built with:

- Next.js 15
- React 18
- Framer Motion
- OpenAI GPT-4
- ElevenLabs
- WebAudio API
- CSS3 Animations

**Enjoy your AI-powered interactive chatbot! 🚀✨**
