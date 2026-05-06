import exp from 'express'
import Groq from 'groq-sdk'
import { expenseModel } from '../Models/expenseModel.js'
import { verifyToken } from '../Middlewares/verifyToken.js'
import { config } from 'dotenv'
config()

export const insightsApp = exp.Router()

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

insightsApp.get('/getInsights', verifyToken, async (req, res) => {
  try {
    // get user's expenses
    const expenses = await expenseModel.find({ userId: req.user.id })

    if (expenses.length === 0) {
      return res.json({ message: "No expenses found to analyze" })
    }

    // summarize spending by category
    const summary = {}
    for (let exp of expenses) {
      if (!summary[exp.category]) {
        summary[exp.category] = 0
      }
      summary[exp.category] += exp.amount
    }

    // build prompt
    const summaryText = Object.entries(summary)
      .map(([cat, amt]) => `${cat}: ₹${amt}`)
      .join(', ')

    // call Groq API
    const response = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'user',
          content: `A user has the following monthly expenses: ${summaryText}. 
          Give 3 short personalized money saving tips based on their spending pattern. 
          Keep each tip under 2 sentences.`
        }
      ],
      max_tokens: 500
    })

    res.json({
      message: "AI Insights",
      spendingSummary: summary,
      insights: response.choices[0].message.content
    })

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})